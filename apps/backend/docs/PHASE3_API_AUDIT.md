# Phase 3: API Standardization - Audit Report

**Date:** October 9, 2025  
**Status:** In Progress  
**Previous Phases:** Phase 1 ✅ (Type Safety), Phase 2 ✅ (Data Migration)

---

## Executive Summary

This document audits all event-related API endpoints to identify inconsistencies and define standardization requirements.

### Current State Analysis

**Positive Findings ✅:**
1. Most endpoints use PATCH correctly (partial updates)
2. Shared types exist: `ApiResponse<T>`, `ListResponse<T>`, `ApiError`
3. BaseApiService provides consistent client-side interface
4. Frontend has `useWrappedResponses` flag for migration path

**Issues Found ⚠️:**
1. Backend NOT using ApiResponse wrapper consistently
2. Mixed PUT/PATCH usage in certificates module
3. No standardized error response format
4. Missing pagination on some endpoints
5. No OpenAPI/Swagger documentation

---

## 1. Events Module Endpoints

### Current API Structure

| Method | Endpoint | Current Response | Issues |
|--------|----------|-----------------|--------|
| POST | `/events` | `Event` | ❌ No wrapper, no validation response |
| GET | `/events` | `Event[]` | ❌ No wrapper, no pagination |
| GET | `/events/stats` | `EventDashboardStats` | ❌ No wrapper |
| GET | `/events/:id` | `Event \| null` | ❌ Returns null instead of 404 |
| PATCH | `/events/:id` | `Event \| null` | ✅ Correct method, ❌ null handling |
| DELETE | `/events/:id` | `void` | ❌ No confirmation response |

### Certificate Sub-Endpoints

| Method | Endpoint | Current Response | Issues |
|--------|----------|-----------------|--------|
| POST | `/events/:id/certificates/generate` | `{ message, count, certificates }` | ✅ Custom response OK |
| GET | `/events/:id/certificates/stats` | `CertificateStats` | ❌ No wrapper |
| GET | `/events/:id/certificates` | `Certificate[]` | ❌ No wrapper, no pagination |

---

## 2. Other Modules Analysis

### Certificates Module (Mixed PUT/PATCH)

```typescript
@Put('v2/:id')      // ⚠️ Should be PATCH if partial
@Put('templates/:id') // ⚠️ Should be PATCH if partial  
@Put(':id')          // ⚠️ Should be PATCH if partial
```

**Problem:** PUT implies full replacement, but these may allow partial updates.

### Settings Module (Correct PUT Usage)

```typescript
@Put('individual/:id')  // ✅ Full replacement OK
@Put('site')            // ✅ Full replacement OK
```

### CMS, Email Marketing (Correct PATCH Usage)

```typescript
@Patch(':id')  // ✅ Partial updates
```

---

## 3. Response Format Standards

### Current Shared Types (Available but Unused)

```typescript
// types-shared/src/common.types.ts

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: {
    pagination?: PaginationMeta;
    timestamp: string;
  };
}

interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  statusCode?: number;
}

interface ListResponse<T> {
  items: T[];
  meta: PaginationMeta;
}
```

### Proposed Standardized Responses

#### 1. Success Response (Single Entity)
```json
{
  "success": true,
  "data": { /* entity */ },
  "meta": {
    "timestamp": "2025-10-09T10:30:00Z"
  }
}
```

#### 2. Success Response (List with Pagination)
```json
{
  "success": true,
  "data": {
    "items": [ /* entities */ ],
    "meta": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  },
  "meta": {
    "timestamp": "2025-10-09T10:30:00Z"
  }
}
```

#### 3. Error Response
```json
{
  "success": false,
  "error": {
    "code": "EVENT_NOT_FOUND",
    "message": "Event with ID xyz not found",
    "statusCode": 404,
    "details": {
      "eventId": "xyz"
    }
  },
  "meta": {
    "timestamp": "2025-10-09T10:30:00Z"
  }
}
```

#### 4. Delete Response
```json
{
  "success": true,
  "data": {
    "deleted": true,
    "id": "event-id"
  },
  "meta": {
    "timestamp": "2025-10-09T10:30:00Z"
  }
}
```

---

## 4. HTTP Method Compliance

### REST Best Practices

| Method | Use Case | Idempotent | Request Body | Success Code |
|--------|----------|------------|--------------|--------------|
| GET | Retrieve resource(s) | ✅ Yes | ❌ No | 200 |
| POST | Create resource | ❌ No | ✅ Yes | 201 |
| PUT | Full replacement | ✅ Yes | ✅ Yes | 200 |
| PATCH | Partial update | ❌ No | ✅ Yes | 200 |
| DELETE | Remove resource | ✅ Yes | ❌ No | 200/204 |

### Current Compliance Status

**Events Module:**
- ✅ POST for create
- ✅ GET for retrieve
- ✅ PATCH for partial update
- ✅ DELETE for remove

**Certificates Module:**
- ⚠️ PUT usage needs audit (should most be PATCH?)

**Settings Module:**
- ✅ PUT for full replacement (correct)

---

## 5. Error Handling Audit

### Current Error Handling

**Controller Level:**
```typescript
// events.controller.ts
if (!event) {
  throw new BadRequestException('Event not found'); // ❌ Should be NotFoundException
}

if (!event.certificateConfig?.enabled) {
  throw new BadRequestException('Certificates are not enabled'); // ✅ Correct
}
```

**Service Level:**
```typescript
// events.service.ts
async findOne(id: string): Promise<Event | null> {
  return this.eventsRepository.findOne({ where: { id } }) || null;
}
// ❌ Returns null instead of throwing NotFoundException
```

### Required Error Handling Improvements

1. **Use Correct HTTP Exceptions:**
   - `NotFoundException` (404) for missing resources
   - `BadRequestException` (400) for validation errors
   - `ConflictException` (409) for duplicate resources
   - `UnauthorizedException` (401) for auth failures

2. **Consistent Error Codes:**
   ```typescript
   enum ErrorCode {
     EVENT_NOT_FOUND = 'EVENT_NOT_FOUND',
     EVENT_VALIDATION_FAILED = 'EVENT_VALIDATION_FAILED',
     CERTIFICATE_DISABLED = 'CERTIFICATE_DISABLED',
     // ...
   }
   ```

3. **Global Exception Filter:**
   ```typescript
   @Catch()
   export class GlobalExceptionFilter implements ExceptionFilter {
     catch(exception: unknown, host: ArgumentsHost) {
       // Format all errors as ApiResponse<never>
     }
   }
   ```

---

## 6. Implementation Plan

### Phase 3.1: Audit Complete ✅

**Findings:**
- 6 event endpoints need response wrappers
- 3 certificate endpoints need wrappers
- PUT/PATCH usage in certificates needs clarification
- Error handling needs standardization
- No pagination on list endpoints

### Phase 3.2: HTTP Method Standardization

**Tasks:**
1. Audit certificates module PUT endpoints
2. Convert to PATCH if partial updates
3. Document full replacement vs partial update intent
4. Update DTOs accordingly

**Estimated Time:** 30 minutes

### Phase 3.3: Response Format Standardization

**Tasks:**
1. Create `ResponseInterceptor` to wrap all responses
2. Create `GlobalExceptionFilter` for error formatting
3. Update all controllers to use standardized responses
4. Test with frontend `useWrappedResponses: true`

**Estimated Time:** 1 hour

**Files to Create:**
- `src/common/interceptors/response.interceptor.ts`
- `src/common/filters/global-exception.filter.ts`
- `src/common/decorators/api-response.decorator.ts`

**Files to Modify:**
- `src/main.ts` (register global interceptor/filter)
- `src/modules/events/events.controller.ts` (add decorators)
- `src/modules/events/events.service.ts` (throw exceptions instead of null)

### Phase 3.4: API Documentation

**Tasks:**
1. Install @nestjs/swagger
2. Add SwaggerModule configuration
3. Add API decorators to all endpoints
4. Generate OpenAPI spec
5. Serve Swagger UI at `/api/docs`

**Estimated Time:** 45 minutes

### Phase 3.5: Testing & Validation

**Tasks:**
1. Update frontend eventsService to use `useWrappedResponses: true`
2. Test all event endpoints
3. Verify error responses
4. Check pagination works
5. Validate OpenAPI spec

**Estimated Time:** 30 minutes

---

## 7. Success Criteria

**Phase 3 Complete When:**

- ✅ All endpoints return `ApiResponse<T>` wrapper
- ✅ HTTP methods follow REST best practices
- ✅ Errors return standardized `ApiError` format
- ✅ List endpoints support pagination
- ✅ OpenAPI/Swagger documentation available
- ✅ Frontend works with wrapped responses
- ✅ Zero breaking changes for existing clients

**Backward Compatibility:**
- Keep unwrapped responses available via query param: `?raw=true`
- Or version endpoints: `/v1/events` (unwrapped) vs `/v2/events` (wrapped)

---

## 8. Migration Strategy

### Option 1: Big Bang (Recommended for Internal API)

**Pros:**
- Clean break, consistent immediately
- Easier to maintain one format

**Cons:**
- Requires coordinated frontend/backend deploy

**Implementation:**
1. Add response wrapper globally
2. Update all frontends at once
3. Remove old response handling

### Option 2: Gradual Migration

**Pros:**
- No breaking changes
- Clients migrate at own pace

**Cons:**
- Maintains two response formats
- More complex code

**Implementation:**
1. Add `?wrapped=true` query param support
2. Frontend services opt-in via `useWrappedResponses`
3. Deprecation period (e.g., 2 sprints)
4. Remove unwrapped support

### Recommendation: Option 1 (Big Bang)

Since this is an internal API and we have full control over frontend, we can coordinate the release.

---

## 9. Next Steps

1. **Review & Approve:** Get stakeholder sign-off on standards
2. **Implement Phase 3.2:** HTTP method standardization (30 min)
3. **Implement Phase 3.3:** Response formatting (1 hour)
4. **Implement Phase 3.4:** API documentation (45 min)
5. **Implement Phase 3.5:** Testing & validation (30 min)
6. **Commit:** Detailed commit with all changes

**Total Estimated Time:** ~3 hours

**Dependencies:**
- None (can proceed immediately)

**Risks:**
- Frontend may need updates to handle wrapped responses
- Existing API clients (mobile app?) may break

**Mitigation:**
- Test thoroughly before release
- Keep backward compatibility option ready
- Update all known clients simultaneously

---

## Appendix A: Code Examples

### Response Interceptor Example

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '@aluplan/shared-types';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        meta: {
          timestamp: new Date().toISOString(),
        },
      })),
    );
  }
}
```

### Global Exception Filter Example

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiError } from '@aluplan/shared-types';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error: ApiError = {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
      statusCode: status,
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      error = {
        code: this.getErrorCode(exception),
        message: typeof exceptionResponse === 'string' 
          ? exceptionResponse 
          : (exceptionResponse as any).message || exception.message,
        statusCode: status,
        details: typeof exceptionResponse === 'object' ? exceptionResponse : undefined,
      };
    }

    const apiResponse: ApiResponse<never> = {
      success: false,
      error,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    response.status(status).json(apiResponse);
  }

  private getErrorCode(exception: HttpException): string {
    const status = exception.getStatus();
    const name = exception.constructor.name;
    
    return name.replace('Exception', '').toUpperCase();
  }
}
```

---

**End of Audit Report**
