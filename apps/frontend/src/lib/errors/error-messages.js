"use strict";
/**
 * HTTP Error Messages
 *
 * User-friendly error messages for HTTP status codes and error codes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_CODE_MESSAGES = exports.HTTP_ERROR_MESSAGES = void 0;
exports.getHttpErrorMessage = getHttpErrorMessage;
exports.getErrorCodeMessage = getErrorCodeMessage;
exports.getErrorMessage = getErrorMessage;
exports.isNetworkError = isNetworkError;
exports.isTimeoutError = isTimeoutError;
exports.isAuthError = isAuthError;
exports.isPermissionError = isPermissionError;
exports.isValidationError = isValidationError;
exports.isNotFoundError = isNotFoundError;
exports.isServerError = isServerError;
// ============================================================================
// HTTP Status Code Messages
// ============================================================================
exports.HTTP_ERROR_MESSAGES = {
    // Client Errors (4xx)
    400: 'Geçersiz istek. Lütfen girdiğiniz bilgileri kontrol edin.',
    401: 'Oturum süreniz doldu. Lütfen tekrar giriş yapın.',
    403: 'Bu işlem için yetkiniz bulunmuyor.',
    404: 'Aradığınız kayıt bulunamadı.',
    405: 'Bu işlem desteklenmiyor.',
    408: 'İstek zaman aşımına uğradı. Lütfen tekrar deneyin.',
    409: 'Bu kayıt zaten mevcut.',
    410: 'Bu kayıt artık mevcut değil.',
    422: 'Girdiğiniz bilgiler geçersiz. Lütfen kontrol edin.',
    429: 'Çok fazla istek gönderdiniz. Lütfen biraz bekleyin.',
    // Server Errors (5xx)
    500: 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.',
    501: 'Bu özellik henüz desteklenmiyor.',
    502: 'Sunucu geçici olarak kullanılamıyor.',
    503: 'Servis şu anda bakımda. Lütfen daha sonra tekrar deneyin.',
    504: 'Sunucu yanıt vermedi. Lütfen daha sonra tekrar deneyin.',
};
// ============================================================================
// Application Error Code Messages
// ============================================================================
exports.ERROR_CODE_MESSAGES = {
    // Authentication Errors
    INVALID_CREDENTIALS: 'E-posta veya şifre hatalı.',
    ACCOUNT_LOCKED: 'Hesabınız kilitlenmiş. Lütfen destek ile iletişime geçin.',
    ACCOUNT_DISABLED: 'Hesabınız devre dışı bırakılmış.',
    EMAIL_NOT_VERIFIED: 'E-posta adresinizi doğrulamanız gerekiyor.',
    TOKEN_EXPIRED: 'Oturum süreniz doldu. Lütfen tekrar giriş yapın.',
    INVALID_TOKEN: 'Geçersiz oturum. Lütfen tekrar giriş yapın.',
    REFRESH_TOKEN_EXPIRED: 'Oturum süreniz doldu. Lütfen tekrar giriş yapın.',
    // User Errors
    USER_NOT_FOUND: 'Kullanıcı bulunamadı.',
    USER_ALREADY_EXISTS: 'Bu e-posta adresi zaten kullanımda.',
    EMAIL_ALREADY_EXISTS: 'Bu e-posta adresi zaten kayıtlı.',
    INVALID_EMAIL: 'Geçersiz e-posta adresi.',
    WEAK_PASSWORD: 'Şifreniz çok zayıf. Daha güçlü bir şifre seçin.',
    PASSWORD_MISMATCH: 'Şifreler eşleşmiyor.',
    CURRENT_PASSWORD_INCORRECT: 'Mevcut şifreniz hatalı.',
    // CMS Errors
    PAGE_NOT_FOUND: 'Sayfa bulunamadı.',
    COMPONENT_NOT_FOUND: 'Bileşen bulunamadı.',
    PAGE_SLUG_EXISTS: 'Bu URL adresi zaten kullanımda.',
    INVALID_PAGE_STATUS: 'Geçersiz sayfa durumu.',
    CANNOT_DELETE_PUBLISHED_PAGE: 'Yayınlanmış sayfa silinemez.',
    // Media Errors
    MEDIA_NOT_FOUND: 'Medya bulunamadı.',
    FILE_TOO_LARGE: 'Dosya boyutu çok büyük.',
    INVALID_FILE_TYPE: 'Geçersiz dosya türü.',
    UPLOAD_FAILED: 'Dosya yüklenemedi. Lütfen tekrar deneyin.',
    STORAGE_QUOTA_EXCEEDED: 'Depolama alanı doldu.',
    // Validation Errors
    VALIDATION_ERROR: 'Girdiğiniz bilgiler geçersiz.',
    REQUIRED_FIELD: 'Bu alan zorunludur.',
    INVALID_FORMAT: 'Geçersiz format.',
    VALUE_TOO_SHORT: 'Değer çok kısa.',
    VALUE_TOO_LONG: 'Değer çok uzun.',
    INVALID_RANGE: 'Değer geçerli aralıkta değil.',
    // Permission Errors
    INSUFFICIENT_PERMISSIONS: 'Bu işlem için yetkiniz bulunmuyor.',
    ADMIN_ONLY: 'Bu işlem sadece yöneticiler tarafından yapılabilir.',
    OWNER_ONLY: 'Bu işlem sadece kayıt sahibi tarafından yapılabilir.',
    // Network Errors
    NETWORK_ERROR: 'Bağlantı hatası. İnternet bağlantınızı kontrol edin.',
    TIMEOUT_ERROR: 'İstek zaman aşımına uğradı. Lütfen tekrar deneyin.',
    CONNECTION_LOST: 'Bağlantı kesildi. Lütfen tekrar deneyin.',
    // Generic Errors
    UNKNOWN_ERROR: 'Bilinmeyen bir hata oluştu.',
    INTERNAL_ERROR: 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.',
    SERVICE_UNAVAILABLE: 'Servis şu anda kullanılamıyor.',
    MAINTENANCE: 'Sistem bakımda. Lütfen daha sonra tekrar deneyin.',
};
// ============================================================================
// Helper Functions
// ============================================================================
/**
 * Get user-friendly error message from HTTP status code
 */
function getHttpErrorMessage(statusCode) {
    return exports.HTTP_ERROR_MESSAGES[statusCode] || 'Bir hata oluştu. Lütfen tekrar deneyin.';
}
/**
 * Get user-friendly error message from error code
 */
function getErrorCodeMessage(errorCode) {
    return exports.ERROR_CODE_MESSAGES[errorCode] || 'Bir hata oluştu. Lütfen tekrar deneyin.';
}
/**
 * Get combined error message (tries error code first, then status code)
 */
function getErrorMessage(errorCode, statusCode) {
    if (errorCode && exports.ERROR_CODE_MESSAGES[errorCode]) {
        return exports.ERROR_CODE_MESSAGES[errorCode];
    }
    if (statusCode && exports.HTTP_ERROR_MESSAGES[statusCode]) {
        return exports.HTTP_ERROR_MESSAGES[statusCode];
    }
    return 'Bir hata oluştu. Lütfen tekrar deneyin.';
}
/**
 * Check if error is a network error
 */
function isNetworkError(error) {
    return (error?.isNetworkError === true ||
        error?.code === 'ERR_NETWORK' ||
        error?.message?.includes('Network Error') ||
        error?.message?.includes('Failed to fetch'));
}
/**
 * Check if error is a timeout error
 */
function isTimeoutError(error) {
    return (error?.isTimeoutError === true ||
        error?.code === 'ECONNABORTED' ||
        error?.message?.includes('timeout'));
}
/**
 * Check if error is an authentication error
 */
function isAuthError(error) {
    return error?.status === 401 || error?.statusCode === 401 || error?.code === 'UNAUTHORIZED';
}
/**
 * Check if error is a permission error
 */
function isPermissionError(error) {
    return error?.status === 403 || error?.statusCode === 403 || error?.code === 'FORBIDDEN';
}
/**
 * Check if error is a validation error
 */
function isValidationError(error) {
    return (error?.status === 422 ||
        error?.statusCode === 422 ||
        error?.code === 'VALIDATION_ERROR' ||
        error?.name === 'ValidationError');
}
/**
 * Check if error is a not found error
 */
function isNotFoundError(error) {
    return error?.status === 404 || error?.statusCode === 404 || error?.code === 'NOT_FOUND';
}
/**
 * Check if error is a server error
 */
function isServerError(error) {
    const status = error?.status || error?.statusCode;
    return status >= 500 && status < 600;
}
// ============================================================================
// Exports
// ============================================================================
exports.default = {
    HTTP_ERROR_MESSAGES: exports.HTTP_ERROR_MESSAGES,
    ERROR_CODE_MESSAGES: exports.ERROR_CODE_MESSAGES,
    getHttpErrorMessage,
    getErrorCodeMessage,
    getErrorMessage,
    isNetworkError,
    isTimeoutError,
    isAuthError,
    isPermissionError,
    isValidationError,
    isNotFoundError,
    isServerError,
};
//# sourceMappingURL=error-messages.js.map