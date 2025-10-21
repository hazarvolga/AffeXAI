"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient_1 = __importDefault(require("./httpClient"));
class CertificatesService {
    async getAllCertificates(userId) {
        const url = userId ? `/certificates?userId=${userId}` : '/certificates';
        return httpClient_1.default.get(url);
    }
    async getCertificateById(id) {
        return httpClient_1.default.get(`/certificates/${id}`);
    }
    async createCertificate(certificateData, file) {
        const formData = new FormData();
        // Append file if provided
        if (file) {
            formData.append('file', file);
        }
        // Append certificate data as JSON string
        formData.append('certificateData', JSON.stringify(certificateData));
        // For simplicity, we're sending data as form fields
        Object.keys(certificateData).forEach(key => {
            formData.append(key, certificateData[key]);
        });
        return httpClient_1.default.post('/certificates', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    async updateCertificate(id, certificateData, file) {
        const formData = new FormData();
        // Append file if provided
        if (file) {
            formData.append('file', file);
        }
        // Append certificate data as JSON string
        Object.keys(certificateData).forEach(key => {
            formData.append(key, certificateData[key]);
        });
        return httpClient_1.default.put(`/certificates/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    async deleteCertificate(id) {
        return httpClient_1.default.delete(`/certificates/${id}`);
    }
    async bulkImportCertificates(certificates) {
        return httpClient_1.default.post('/certificates/bulk-import', certificates);
    }
    // PDF Generation method
    async generateCertificatePdf(id) {
        const response = await httpClient_1.default.get(`/certificates/${id}/pdf`);
        return response.fileUrl;
    }
    // CSV parsing utility
    parseCSVFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const text = e.target?.result;
                    const lines = text.split('\n');
                    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
                    const certificates = [];
                    for (let i = 1; i < lines.length; i++) {
                        const line = lines[i].trim();
                        if (!line)
                            continue;
                        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
                        const cert = {};
                        headers.forEach((header, index) => {
                            const value = values[index] || '';
                            switch (header) {
                                case 'user_email':
                                    cert.userEmail = value;
                                    break;
                                case 'certificate_name':
                                    cert.certificateName = value;
                                    break;
                                case 'issue_date':
                                    cert.issueDate = value;
                                    break;
                                case 'expiry_date':
                                    cert.expiryDate = value || undefined;
                                    break;
                                case 'description':
                                    cert.description = value || undefined;
                                    break;
                                case 'file_path':
                                    cert.filePath = value || undefined;
                                    break;
                            }
                        });
                        if (cert.userEmail && cert.certificateName && cert.issueDate) {
                            certificates.push(cert);
                        }
                    }
                    resolve(certificates);
                }
                catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }
}
exports.default = new CertificatesService();
//# sourceMappingURL=certificatesService.js.map