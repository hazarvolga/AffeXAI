# Self-Learning FAQ System - API Documentation

## Overview

This document provides comprehensive API documentation for the Self-Learning FAQ System. All endpoints require authentication unless otherwise specified.

## Base URL

```
/api/faq-learning
```

## Authentication

All endpoints require JWT authentication via Bearer token:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### FAQ Learning Management

#### Start Learning Pipeline

```http
POST /api/faq-learning/process-batch
```

Start a batch processing job to learn from chat and ticket data.

**Request Body:**
```json
{
  "dateRange": {
    "from": "2024-01-01T00:00:00Z",
    "to": "2024-01-31T23:59:59Z"
  },
  "maxResults": 100,
  "sources": ["chat", "ticket"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "processedItems": 150,
    "newFaqs": 25,
    "updatedPatterns": 45,
    "errors": [],
    "processingTime": 12500,
    "status": "completed"
  }
}
```

#### Get Pipeline Status

```http
GET /api/faq-learning/status
```

Get current status of the learning pipeline.

**Response:**
```json
{
  "success": true,
  "data": {
    "isProcessing": false,
    "dailyProcessingCount": 150,
    "lastRun": "2024-01-15T10:30:00Z",
    "nextScheduledRun": "2024-01-15T11:00:00Z"
  }
}
```

### Review Management

#### Get Review Queue

```http
GET /api/faq-learning/review/queue?status=pending_review&limit=20&offset=0
```

Get FAQs pending review.

**Query Parameters:**
- `status` (optional): Filter by status (pending_review, approved, rejected)
- `limit` (optional): Number of items per page (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "question": "How do I reset my password?",
        "answer": "To reset your password...",
        "confidence": 85,
        "status": "pending_review",
        "source": "chat",
        "category": "account",
        "keywords": ["password", "reset", "account"],
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "total": 45,
    "limit": 20,
    "offset": 0
  }
}
```

#### Approve FAQ

```http
POST /api/faq-learning/review/:id/approve
```

Approve a FAQ entry for publication.

**Request Body:**
```json
{
  "publishImmediately": true,
  "category": "account",
  "notes": "Approved with minor edits"
}
```

**Response:**
```json
{
  "success": true,
  "message": "FAQ approved and published successfully"
}
```

#### Reject FAQ

```http
POST /api/faq-learning/review/:id/reject
```

Reject a FAQ entry.

**Request Body:**
```json
{
  "reason": "Inaccurate information",
  "feedback": "The answer needs to include information about 2FA"
}
```

**Response:**
```json
{
  "success": true,
  "message": "FAQ rejected successfully"
}
```

### AI Provider Management

#### Get Available Providers

```http
GET /api/faq-learning/providers
```

Get list of available AI providers and their models.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "type": "openai",
      "name": "OpenAI",
      "models": ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo"],
      "isActive": true,
      "status": "healthy"
    },
    {
      "type": "anthropic",
      "name": "Anthropic",
      "models": ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"],
      "isActive": false,
      "status": "healthy"
    }
  ]
}
```

#### Switch Provider

```http
PUT /api/faq-learning/providers/switch
```

Switch to a different AI provider.

**Request Body:**
```json
{
  "provider": "anthropic",
  "model": "claude-3-sonnet"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Provider switched successfully",
  "data": {
    "activeProvider": "anthropic",
    "activeModel": "claude-3-sonnet"
  }
}
```

#### Test Provider Connection

```http
POST /api/faq-learning/providers/test
```

Test connection to an AI provider.

**Request Body:**
```json
{
  "provider": "openai",
  "model": "gpt-4"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "connected": true,
    "responseTime": 1250,
    "message": "Connection successful"
  }
}
```

### Public FAQ Endpoints

#### Search FAQs

```http
GET /api/learned-faqs/search?q=password&category=account&limit=10
```

Search published FAQs.

**Query Parameters:**
- `q` (required): Search query
- `category` (optional): Filter by category
- `limit` (optional): Number of results (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "uuid",
        "question": "How do I reset my password?",
        "answer": "To reset your password...",
        "category": "account",
        "confidence": 92,
        "relevanceScore": 0.95
      }
    ],
    "total": 5
  }
}
```

#### Submit Feedback

```http
POST /api/learned-faqs/:id/feedback
```

Submit feedback on a FAQ entry.

**Request Body:**
```json
{
  "helpful": true,
  "comment": "This answered my question perfectly"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Feedback submitted successfully"
}
```

### Analytics

#### Get Learning Effectiveness

```http
GET /api/faq-learning/analytics/effectiveness?period=week
```

Get learning effectiveness metrics.

**Query Parameters:**
- `period` (optional): day, week, month, all (default: week)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalFaqsGenerated": 150,
    "publishedFaqs": 120,
    "pendingReview": 25,
    "rejectedFaqs": 5,
    "approvalRate": 80.0,
    "avgConfidenceScore": 78.5,
    "faqsBySource": {
      "chat": 90,
      "ticket": 60
    },
    "faqsByCategory": [
      { "category": "account", "count": 45 },
      { "category": "billing", "count": 30 }
    ]
  }
}
```

#### Get Provider Performance

```http
GET /api/faq-learning/analytics/provider-performance?period=week
```

Get AI provider performance comparison.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "providerName": "openai",
      "totalRequests": 150,
      "successfulRequests": 145,
      "failedRequests": 5,
      "avgResponseTime": 1250,
      "avgTokensUsed": 850,
      "avgConfidence": 82.5,
      "successRate": 96.7
    }
  ]
}
```

#### Get ROI Metrics

```http
GET /api/faq-learning/analytics/roi?period=month
```

Get ROI and ticket reduction metrics.

**Response:**
```json
{
  "success": true,
  "data": {
    "ticketReductionRate": 15.5,
    "estimatedTicketsSaved": 125,
    "estimatedTimeSaved": 3750,
    "estimatedCostSavings": 1250,
    "chatResolutionRate": 65.0,
    "avgTicketResolutionTime": 4.5
  }
}
```

### Monitoring

#### Get System Health

```http
GET /api/faq-learning/monitoring/health
```

Get system health status.

**Response:**
```json
{
  "success": true,
  "data": {
    "overall": "healthy",
    "components": {
      "learningPipeline": {
        "status": "healthy",
        "message": "Learning pipeline operating normally"
      },
      "aiProviders": {
        "status": "healthy",
        "message": "All AI providers operating normally"
      },
      "database": {
        "status": "healthy",
        "message": "Database connection healthy"
      },
      "queue": {
        "status": "healthy",
        "message": "Processing queue healthy"
      }
    },
    "lastCheck": "2024-01-15T10:30:00Z",
    "alerts": []
  }
}
```

#### Get Active Alerts

```http
GET /api/faq-learning/monitoring/alerts/active
```

Get active system alerts.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "alert-123",
      "type": "performance_degradation",
      "severity": "warning",
      "title": "Slow Response Time",
      "message": "Average response time exceeds threshold",
      "timestamp": "2024-01-15T10:00:00Z",
      "resolved": false
    }
  ]
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

### Common Error Codes

- `UNAUTHORIZED`: Authentication required or invalid token
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid request data
- `PROCESSING_ERROR`: Error during processing
- `PROVIDER_ERROR`: AI provider error
- `RATE_LIMIT_EXCEEDED`: Too many requests

## Rate Limiting

API endpoints are rate limited to:
- 100 requests per minute for authenticated users
- 1000 requests per hour for batch operations

## Webhooks

The system can send webhooks for important events:

### FAQ Approved Event

```json
{
  "event": "faq.approved",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "faqId": "uuid",
    "question": "How do I reset my password?",
    "category": "account",
    "approvedBy": "admin@example.com"
  }
}
```

### High Confidence FAQ Generated

```json
{
  "event": "faq.high_confidence",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "faqId": "uuid",
    "question": "How do I reset my password?",
    "confidence": 95,
    "autoPublished": true
  }
}
```

## SDK Examples

### JavaScript/TypeScript

```typescript
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

// Search FAQs
const searchFaqs = async (query: string) => {
  const response = await client.get('/api/learned-faqs/search', {
    params: { q: query }
  });
  return response.data;
};

// Approve FAQ
const approveFaq = async (faqId: string) => {
  const response = await client.post(`/api/faq-learning/review/${faqId}/approve`, {
    publishImmediately: true
  });
  return response.data;
};
```

### Python

```python
import requests

class FaqLearningClient:
    def __init__(self, base_url, token):
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }
    
    def search_faqs(self, query, category=None):
        params = {'q': query}
        if category:
            params['category'] = category
        
        response = requests.get(
            f'{self.base_url}/api/learned-faqs/search',
            headers=self.headers,
            params=params
        )
        return response.json()
    
    def approve_faq(self, faq_id, publish=True):
        response = requests.post(
            f'{self.base_url}/api/faq-learning/review/{faq_id}/approve',
            headers=self.headers,
            json={'publishImmediately': publish}
        )
        return response.json()
```

## Support

For API support, contact: support@example.com
