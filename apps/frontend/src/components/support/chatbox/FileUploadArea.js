"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadArea = FileUploadArea;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const progress_1 = require("@/components/ui/progress");
const badge_1 = require("@/components/ui/badge");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const SUPPORTED_TYPES = {
    'application/pdf': { icon: lucide_react_1.FileText, label: 'PDF' },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { icon: lucide_react_1.FileText, label: 'DOCX' },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { icon: lucide_react_1.FileSpreadsheet, label: 'XLSX' },
    'text/plain': { icon: lucide_react_1.FileText, label: 'TXT' },
    'text/markdown': { icon: lucide_react_1.FileText, label: 'MD' },
    'image/jpeg': { icon: lucide_react_1.FileImage, label: 'JPEG' },
    'image/png': { icon: lucide_react_1.FileImage, label: 'PNG' },
    'image/gif': { icon: lucide_react_1.FileImage, label: 'GIF' }
};
const DEFAULT_ACCEPTED_TYPES = Object.keys(SUPPORTED_TYPES);
const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const DEFAULT_MAX_FILES = 5;
function FileUploadArea({ onFilesSelected, onCancel, maxFiles = DEFAULT_MAX_FILES, maxFileSize = DEFAULT_MAX_FILE_SIZE, acceptedTypes = DEFAULT_ACCEPTED_TYPES, className }) {
    const [isDragOver, setIsDragOver] = (0, react_1.useState)(false);
    const [uploadedFiles, setUploadedFiles] = (0, react_1.useState)([]);
    const [errors, setErrors] = (0, react_1.useState)([]);
    const fileInputRef = (0, react_1.useRef)(null);
    const validateFile = (file) => {
        // Check file type
        if (!acceptedTypes.includes(file.type)) {
            return `Desteklenmeyen dosya türü: ${file.type}`;
        }
        // Check file size
        if (file.size > maxFileSize) {
            return `Dosya boyutu çok büyük: ${formatFileSize(file.size)} (maksimum: ${formatFileSize(maxFileSize)})`;
        }
        return null;
    };
    const formatFileSize = (bytes) => {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    const getFileIcon = (fileType) => {
        const typeInfo = SUPPORTED_TYPES[fileType];
        return typeInfo ? typeInfo.icon : lucide_react_1.File;
    };
    const getFileLabel = (fileType) => {
        const typeInfo = SUPPORTED_TYPES[fileType];
        return typeInfo ? typeInfo.label : 'Unknown';
    };
    const generateFileId = () => {
        return Math.random().toString(36).substr(2, 9);
    };
    const handleFiles = (0, react_1.useCallback)((files) => {
        const fileArray = Array.from(files);
        const newErrors = [];
        const validFiles = [];
        // Check total file count
        if (uploadedFiles.length + fileArray.length > maxFiles) {
            newErrors.push(`Maksimum ${maxFiles} dosya yükleyebilirsiniz`);
            setErrors(newErrors);
            return;
        }
        // Validate each file
        fileArray.forEach(file => {
            const error = validateFile(file);
            if (error) {
                newErrors.push(`${file.name}: ${error}`);
            }
            else {
                validFiles.push(file);
            }
        });
        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }
        // Clear errors and add files
        setErrors([]);
        const newFileStatuses = validFiles.map(file => ({
            file,
            status: 'pending',
            progress: 0,
            id: generateFileId()
        }));
        setUploadedFiles(prev => [...prev, ...newFileStatuses]);
        // Simulate upload progress for each file
        newFileStatuses.forEach(fileStatus => {
            simulateUpload(fileStatus.id);
        });
    }, [uploadedFiles.length, maxFiles, maxFileSize, acceptedTypes]);
    const simulateUpload = (fileId) => {
        setUploadedFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'uploading' } : f));
        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setUploadedFiles(prev => prev.map(f => f.id === fileId ? {
                    ...f,
                    status: 'processing',
                    progress: 100
                } : f));
                // Simulate processing
                setTimeout(() => {
                    setUploadedFiles(prev => prev.map(f => f.id === fileId ? {
                        ...f,
                        status: 'completed'
                    } : f));
                }, 1000);
            }
            else {
                setUploadedFiles(prev => prev.map(f => f.id === fileId ? { ...f, progress } : f));
            }
        }, 200);
    };
    const handleDragOver = (0, react_1.useCallback)((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    }, []);
    const handleDragLeave = (0, react_1.useCallback)((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    }, []);
    const handleDrop = (0, react_1.useCallback)((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFiles(files);
        }
    }, [handleFiles]);
    const handleFileInputChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFiles(files);
        }
        // Reset input value to allow selecting the same file again
        e.target.value = '';
    };
    const handleRemoveFile = (fileId) => {
        setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    };
    const handleUploadFiles = () => {
        const completedFiles = uploadedFiles
            .filter(f => f.status === 'completed')
            .map(f => f.file);
        if (completedFiles.length > 0) {
            onFilesSelected(completedFiles);
        }
    };
    const allFilesCompleted = uploadedFiles.length > 0 &&
        uploadedFiles.every(f => f.status === 'completed');
    const hasErrors = errors.length > 0;
    return (<div className={(0, utils_1.cn)("space-y-4", className)}>
      {/* Drag & Drop Area */}
      <card_1.Card className={(0, utils_1.cn)("border-2 border-dashed transition-colors cursor-pointer", isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25", hasErrors && "border-destructive")} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}>
        <card_1.CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <lucide_react_1.Upload className={(0, utils_1.cn)("h-12 w-12 mb-4", isDragOver ? "text-primary" : "text-muted-foreground")}/>
          <h3 className="text-lg font-semibold mb-2">
            Dosyaları buraya sürükleyin
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            veya dosya seçmek için tıklayın
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(SUPPORTED_TYPES).map(([type, info]) => (<badge_1.Badge key={type} variant="secondary" className="text-xs">
                {info.label}
              </badge_1.Badge>))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Maksimum {maxFiles} dosya, her biri {formatFileSize(maxFileSize)} boyutunda
          </p>
        </card_1.CardContent>
      </card_1.Card>

      {/* Hidden File Input */}
      <input ref={fileInputRef} type="file" multiple accept={acceptedTypes.join(',')} onChange={handleFileInputChange} className="hidden"/>

      {/* Error Messages */}
      {hasErrors && (<alert_1.Alert variant="destructive">
          <lucide_react_1.AlertCircle className="h-4 w-4"/>
          <alert_1.AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (<li key={index} className="text-sm">{error}</li>))}
            </ul>
          </alert_1.AlertDescription>
        </alert_1.Alert>)}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (<div className="space-y-2">
          <h4 className="text-sm font-medium">Yüklenen Dosyalar</h4>
          {uploadedFiles.map((fileStatus) => {
                const FileIcon = getFileIcon(fileStatus.file.type);
                return (<card_1.Card key={fileStatus.id} className="p-3">
                <div className="flex items-center space-x-3">
                  <FileIcon className="h-5 w-5 text-muted-foreground flex-shrink-0"/>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium truncate">
                        {fileStatus.file.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <badge_1.Badge variant="outline" className="text-xs">
                          {getFileLabel(fileStatus.file.type)}
                        </badge_1.Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(fileStatus.file.size)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    {(fileStatus.status === 'uploading' || fileStatus.status === 'processing') && (<div className="space-y-1">
                        <progress_1.Progress value={fileStatus.progress} className="h-2"/>
                        <p className="text-xs text-muted-foreground">
                          {fileStatus.status === 'uploading' ? 'Yükleniyor...' : 'İşleniyor...'}
                          {fileStatus.status === 'uploading' && ` ${Math.round(fileStatus.progress)}%`}
                        </p>
                      </div>)}
                    
                    {/* Status */}
                    {fileStatus.status === 'completed' && (<div className="flex items-center space-x-1 text-green-600">
                        <lucide_react_1.Check className="h-3 w-3"/>
                        <span className="text-xs">Tamamlandı</span>
                      </div>)}
                    
                    {fileStatus.status === 'error' && (<div className="flex items-center space-x-1 text-destructive">
                        <lucide_react_1.AlertCircle className="h-3 w-3"/>
                        <span className="text-xs">{fileStatus.error || 'Hata oluştu'}</span>
                      </div>)}
                  </div>
                  
                  {/* Remove Button */}
                  <button_1.Button variant="ghost" size="icon" onClick={() => handleRemoveFile(fileStatus.id)} className="h-8 w-8 flex-shrink-0">
                    <lucide_react_1.X className="h-4 w-4"/>
                  </button_1.Button>
                </div>
              </card_1.Card>);
            })}
        </div>)}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <button_1.Button variant="outline" onClick={onCancel}>
          İptal
        </button_1.Button>
        <button_1.Button onClick={handleUploadFiles} disabled={!allFilesCompleted}>
          {uploadedFiles.some(f => f.status === 'uploading' || f.status === 'processing') ? (<>
              <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              İşleniyor...
            </>) : (`Dosyaları Gönder (${uploadedFiles.filter(f => f.status === 'completed').length})`)}
        </button_1.Button>
      </div>
    </div>);
}
//# sourceMappingURL=FileUploadArea.js.map