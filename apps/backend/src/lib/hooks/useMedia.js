"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMedia = useMedia;
exports.useMediaById = useMediaById;
const react_1 = require("react");
const mediaService_1 = __importDefault(require("@/lib/api/mediaService"));
function useMedia(options = {}) {
    const [mediaItems, setMediaItems] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const { type, enabled = true } = options;
    (0, react_1.useEffect)(() => {
        if (!enabled)
            return;
        const fetchMedia = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await mediaService_1.default.getAllMedia(type);
                setMediaItems(data);
            }
            catch (err) {
                console.error('Error fetching media:', err);
                setError('Medya dosyaları yüklenirken bir hata oluştu.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchMedia();
    }, [type, enabled]);
    const refresh = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await mediaService_1.default.getAllMedia(type);
            setMediaItems(data);
        }
        catch (err) {
            console.error('Error refreshing media:', err);
            setError('Medya dosyaları yenilenirken bir hata oluştu.');
        }
        finally {
            setLoading(false);
        }
    };
    return {
        mediaItems,
        loading,
        error,
        refresh,
    };
}
function useMediaById(id) {
    const [media, setMedia] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (!id) {
            setMedia(null);
            setLoading(false);
            return;
        }
        const fetchMedia = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await mediaService_1.default.getMediaById(id);
                setMedia(data);
            }
            catch (err) {
                console.error('Error fetching media:', err);
                setError('Medya dosyası yüklenirken bir hata oluştu.');
                setMedia(null);
            }
            finally {
                setLoading(false);
            }
        };
        fetchMedia();
    }, [id]);
    return {
        media,
        loading,
        error,
    };
}
//# sourceMappingURL=useMedia.js.map