"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditCertificatePage;
const certificate_form_1 = require("@/components/admin/certificate-form");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_2 = require("react");
const certificatesService_1 = __importDefault(require("@/lib/api/certificatesService"));
function EditCertificatePage({ params }) {
    // Unwrap the params promise using React.use()
    const unwrappedParams = (0, react_2.use)(params);
    const { certificateId } = unwrappedParams;
    const [certificate, setCertificate] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const hasFetchedCertificate = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        // Prevent multiple fetches
        if (hasFetchedCertificate.current)
            return;
        hasFetchedCertificate.current = true;
        const fetchCertificate = async () => {
            try {
                setLoading(true);
                // Fetch certificate from backend
                const cert = await certificatesService_1.default.getCertificateById(certificateId);
                setCertificate(cert);
                setError(null);
            }
            catch (err) {
                console.error('Error fetching certificate:', err);
                if (err.response?.status === 404) {
                    (0, navigation_1.notFound)();
                }
                else {
                    setError('Sertifika bilgileri yüklenirken bir hata oluştu.');
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchCertificate();
    }, []);
    if (loading) {
        return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-12">{error}</div>;
    }
    if (!certificate) {
        (0, navigation_1.notFound)();
        return null;
    }
    return <certificate_form_1.CertificateForm certificate={certificate}/>;
}
//# sourceMappingURL=page.js.map