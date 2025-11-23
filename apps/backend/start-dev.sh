#!/bin/bash

# Function to check if a port is in use
is_port_in_use() {
    lsof -i :$1 >/dev/null 2>&1
}

# Function to get PIDs using a port
get_pids_on_port() {
    lsof -ti :$1 2>/dev/null
}

# Function to kill process on a port
kill_port() {
    local port=$1
    local pids=$(get_pids_on_port $port)
    
    if [ -n "$pids" ]; then
        echo "Killing process(es) on port $port (PID(s): $pids)"
        kill -TERM $pids 2>/dev/null
        sleep 3
        
        # Force kill if still running
        pids=$(get_pids_on_port $port)
        if [ -n "$pids" ]; then
            echo "Force killing remaining process(es) on port $port"
            kill -KILL $pids 2>/dev/null
            sleep 2
        fi
    fi
}

# Function to wait for port to be free
wait_for_port_free() {
    local port=$1
    local timeout=${2:-30}
    local count=0
    
    while is_port_in_use $port && [ $count -lt $timeout ]; do
        echo "Waiting for port $port to be free... ($count/$timeout)"
        sleep 1
        count=$((count + 1))
    done
    
    if is_port_in_use $port; then
        echo "Timeout waiting for port $port to be free"
        return 1
    fi
    
    echo "Port $port is now free"
    return 0
}

# Function to wait for port to be in use (process started)
wait_for_port_in_use() {
    local port=$1
    local timeout=${2:-30}
    local count=0
    
    while ! is_port_in_use $port && [ $count -lt $timeout ]; do
        echo "Waiting for process to start on port $port... ($count/$timeout)"
        sleep 1
        count=$((count + 1))
    done
    
    if ! is_port_in_use $port; then
        echo "Timeout waiting for process to start on port $port"
        return 1
    fi
    
    echo "Process is now running on port $port"
    return 0
}

# Set fixed ports
FRONTEND_PORT=9002
BACKEND_PORT=9005

echo "=== Aluplan Development Environment Startup ==="
echo "Frontend port: $FRONTEND_PORT"
echo "Backend port: $BACKEND_PORT"
echo

# Kill any existing processes on these ports
echo "Checking for existing processes on required ports..."
if is_port_in_use $FRONTEND_PORT; then
    echo "Frontend port $FRONTEND_PORT is in use"
    kill_port $FRONTEND_PORT
    if ! wait_for_port_free $FRONTEND_PORT 15; then
        echo "Failed to free frontend port $FRONTEND_PORT"
        exit 1
    fi
fi

if is_port_in_use $BACKEND_PORT; then
    echo "Backend port $BACKEND_PORT is in use"
    kill_port $BACKEND_PORT
    if ! wait_for_port_free $BACKEND_PORT 15; then
        echo "Failed to free backend port $BACKEND_PORT"
        exit 1
    fi
fi

echo "All required ports are now free"
echo

# Ensure backend uses the correct port
echo "Setting backend port to $BACKEND_PORT..."
cd backend/aluplan-backend
# Update main.ts to use our fixed port and binding
sed -i '' "s/await app.listen([0-9]*)/await app.listen($BACKEND_PORT, '0.0.0.0')/" src/main.ts 2>/dev/null || true

# Start backend server
echo "Starting backend server on port $BACKEND_PORT..."
# Start backend in background
npm run start:dev > /tmp/aluplan-backend.log 2>&1 &
BACKEND_PID=$!

# Return to root directory
cd ../..

echo "Backend process started with PID: $BACKEND_PID"
echo "Backend logs: /tmp/aluplan-backend.log"
echo

# Wait a moment for backend to start initializing
sleep 3

# Start frontend server
echo "Starting frontend server on port $FRONTEND_PORT..."
cd src
# Start frontend in background
npm run dev > /tmp/aluplan-frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo "Frontend process started with PID: $FRONTEND_PID"
echo "Frontend logs: /tmp/aluplan-frontend.log"
echo

# Wait for both processes to be ready
echo "Waiting for servers to be ready..."
if wait_for_port_in_use $BACKEND_PORT 45; then
    echo "Backend server is ready"
else
    echo "Backend server failed to start in time"
    echo "Check logs at /tmp/aluplan-backend.log"
fi

if wait_for_port_in_use $FRONTEND_PORT 45; then
    echo "Frontend server is ready"
else
    echo "Frontend server failed to start in time"
    echo "Check logs at /tmp/aluplan-frontend.log"
fi

echo
echo "=== Development Environment Ready ==="
echo "Frontend: http://localhost:$FRONTEND_PORT"
echo "Backend API: http://localhost:$BACKEND_PORT/api"
echo "Backend API Docs: http://localhost:$BACKEND_PORT/api/docs"
echo
echo "Press Ctrl+C to stop both servers"
echo

# Cleanup function to kill child processes on exit
cleanup() {
    echo
    echo "Shutting down development environment..."
    if ps -p $BACKEND_PID > /dev/null 2>&1; then
        echo "Stopping backend (PID: $BACKEND_PID)..."
        kill -TERM $BACKEND_PID 2>/dev/null
    fi
    
    if ps -p $FRONTEND_PID > /dev/null 2>&1; then
        echo "Stopping frontend (PID: $FRONTEND_PID)..."
        kill -TERM $FRONTEND_PID 2>/dev/null
    fi
    
    # Wait a moment for graceful shutdown
    sleep 2
    
    # Force kill if still running
    if ps -p $BACKEND_PID > /dev/null 2>&1; then
        echo "Force stopping backend..."
        kill -KILL $BACKEND_PID 2>/dev/null
    fi
    
    if ps -p $FRONTEND_PID > /dev/null 2>&1; then
        echo "Force stopping frontend..."
        kill -KILL $FRONTEND_PID 2>/dev/null
    fi
    
    echo "Development environment stopped."
    exit 0
}

# Trap exit signals to cleanup properly
trap cleanup EXIT INT TERM

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID