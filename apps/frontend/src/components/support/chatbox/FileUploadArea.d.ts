import React from 'react';
interface FileUploadAreaProps {
    onFilesSelected: (files: File[]) => void;
    onCancel: () => void;
    maxFiles?: number;
    maxFileSize?: number;
    acceptedTypes?: string[];
    className?: string;
}
export declare function FileUploadArea({ onFilesSelected, onCancel, maxFiles, maxFileSize, acceptedTypes, className }: FileUploadAreaProps): React.JSX.Element;
export {};
//# sourceMappingURL=FileUploadArea.d.ts.map