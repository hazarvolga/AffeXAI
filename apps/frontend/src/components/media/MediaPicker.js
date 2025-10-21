"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MediaPicker;
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const dialog_1 = require("@/components/ui/dialog");
const input_1 = require("@/components/ui/input");
const lucide_react_1 = require("lucide-react");
const mediaService_1 = __importDefault(require("@/lib/api/mediaService"));
const badge_1 = require("@/components/ui/badge");
const select_1 = require("@/components/ui/select");
const image_1 = __importDefault(require("next/image"));
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const use_toast_1 = require("@/hooks/use-toast");
function MediaPicker({ value, onChange, placeholder = "Medya seçin", filterType: initialFilterType = 'all' }) {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [mediaItems, setMediaItems] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [filterType, setFilterType] = (0, react_1.useState)(initialFilterType);
    const [selectedMediaId, setSelectedMediaId] = (0, react_1.useState)(value || null);
    const [uploading, setUploading] = (0, react_1.useState)(false);
    const [selectedFile, setSelectedFile] = (0, react_1.useState)(null);
    const fileInputRef = (0, react_1.useRef)(null);
    const { toast } = (0, use_toast_1.useToast)();
    (0, react_1.useEffect)(() => {
        if (isOpen) {
            fetchMedia();
        }
    }, [isOpen]);
    (0, react_1.useEffect)(() => {
        setSelectedMediaId(value || null);
    }, [value]);
    const fetchMedia = async () => {
        try {
            setLoading(true);
            const data = await mediaService_1.default.getAllMedia();
            setMediaItems(Array.isArray(data) ? data : []);
        }
        catch (err) {
            console.error('Error fetching media:', err);
            setMediaItems([]); // Set to empty array on error
            toast({
                title: "Hata",
                description: "Medya dosyaları yüklenirken bir hata oluştu.",
                variant: "destructive"
            });
        }
        finally {
            setLoading(false);
        }
    };
    const filteredMedia = Array.isArray(mediaItems) ? mediaItems.filter(media => {
        const matchesSearch = media.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (media.title && media.title.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = filterType === 'all' || media.type === filterType;
        return matchesSearch && matchesType;
    }) : [];
    const handleSelect = (mediaId) => {
        setSelectedMediaId(mediaId);
        onChange(mediaId);
        setIsOpen(false);
    };
    const handleClear = () => {
        setSelectedMediaId(null);
        onChange(null);
    };
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };
    const handleUpload = async () => {
        if (!selectedFile)
            return;
        try {
            setUploading(true);
            const media = await mediaService_1.default.uploadFile(selectedFile);
            // Refresh the media list
            await fetchMedia();
            // Select the newly uploaded file
            setSelectedMediaId(media.id);
            onChange(media.id);
            // Clear the file input
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            toast({
                title: "Başarılı",
                description: "Dosya başarıyla yüklendi."
            });
        }
        catch (err) {
            console.error('Error uploading file:', err);
            toast({
                title: "Hata",
                description: "Dosya yüklenirken bir hata oluştu.",
                variant: "destructive"
            });
        }
        finally {
            setUploading(false);
        }
    };
    const formatFileSize = (bytes) => {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    const getMediaTypeIcon = (type) => {
        switch (type) {
            case 'image':
                return <lucide_react_1.Image className="h-4 w-4"/>;
            case 'document':
                return <lucide_react_1.FileText className="h-4 w-4"/>;
            case 'video':
                return <lucide_react_1.Video className="h-4 w-4"/>;
            case 'audio':
                return <lucide_react_1.Music className="h-4 w-4"/>;
            default:
                return <lucide_react_1.FileText className="h-4 w-4"/>;
        }
    };
    const getMediaTypeLabel = (type) => {
        switch (type) {
            case 'image':
                return 'Resim';
            case 'document':
                return 'Belge';
            case 'video':
                return 'Video';
            case 'audio':
                return 'Ses';
            default:
                return type;
        }
    };
    const selectedMedia = mediaItems.find(media => media.id === selectedMediaId);
    return (<div className="space-y-2">
      <div className="flex gap-2">
        <dialog_1.Dialog open={isOpen} onOpenChange={setIsOpen}>
          <dialog_1.DialogTrigger asChild>
            <button_1.Button variant="outline" className="w-full justify-start">
              {selectedMedia ? (<div className="flex items-center gap-2">
                  {selectedMedia?.type === 'image' && selectedMedia?.url ? (<div className="relative h-6 w-6 rounded overflow-hidden">
                      <image_1.default src={selectedMedia.url.startsWith('/uploads/')
                    ? `http://localhost:9006${selectedMedia.url}`
                    : selectedMedia.url} alt={selectedMedia.altText || selectedMedia.originalName} width={24} height={24} className="object-cover"/>
                    </div>) : selectedMedia?.type ? (<div className="flex items-center justify-center h-6 w-6">
                      {getMediaTypeIcon(selectedMedia.type)}
                    </div>) : null}
                  <span className="truncate">{selectedMedia?.title || selectedMedia?.originalName}</span>
                </div>) : (<span className="text-muted-foreground">{placeholder}</span>)}
            </button_1.Button>
          </dialog_1.DialogTrigger>
          <dialog_1.DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <dialog_1.DialogHeader>
              <dialog_1.DialogTitle>Medya Seç</dialog_1.DialogTitle>
            </dialog_1.DialogHeader>
            
            <div className="space-y-4">
              {/* Upload Section */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Yeni Medya Yükle</h3>
                <div className="flex gap-2">
                  <input_1.Input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef}/>
                  <button_1.Button onClick={handleUpload} disabled={!selectedFile || uploading}>
                    {uploading ? (<>
                        <lucide_react_1.Upload className="mr-2 h-4 w-4 animate-spin"/>
                        Yükleniyor...
                      </>) : (<>
                        <lucide_react_1.Upload className="mr-2 h-4 w-4"/>
                        Yükle
                      </>)}
                  </button_1.Button>
                </div>
                {selectedFile && (<div className="mt-2 text-sm text-muted-foreground">
                    Seçilen dosya: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                  </div>)}
              </div>
              
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <lucide_react_1.Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                  <input_1.Input placeholder="Ara..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
                <select_1.Select value={filterType} onValueChange={setFilterType}>
                  <select_1.SelectTrigger className="w-32">
                    <select_1.SelectValue placeholder="Tümü"/>
                  </select_1.SelectTrigger>
                  <select_1.SelectContent>
                    <select_1.SelectItem value="all">Tümü</select_1.SelectItem>
                    <select_1.SelectItem value="image">Resim</select_1.SelectItem>
                    <select_1.SelectItem value="document">Belge</select_1.SelectItem>
                    <select_1.SelectItem value="video">Video</select_1.SelectItem>
                    <select_1.SelectItem value="audio">Ses</select_1.SelectItem>
                  </select_1.SelectContent>
                </select_1.Select>
              </div>
              
              {/* Media Grid */}
              {loading ? (<div className="flex items-center justify-center py-12">
                  <div className="text-muted-foreground">Medya dosyaları yükleniyor...</div>
                </div>) : (<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredMedia.map((media) => (<div key={media.id} className={`border rounded-lg overflow-hidden cursor-pointer transition-colors ${selectedMediaId === media.id
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-muted hover:border-primary/50'}`} onClick={() => handleSelect(media.id)}>
                      <div className="relative aspect-square">
                        {media.type === 'image' && media.url ? (<image_1.default src={media.url.startsWith('/uploads/')
                        ? `http://localhost:9006${media.url}`
                        : media.url} alt={media.altText || media.originalName} width={200} height={200} className="object-cover w-full h-full"/>) : (<div className="flex flex-col items-center justify-center h-full bg-muted">
                            <div className="mb-2">
                              {getMediaTypeIcon(media.type)}
                            </div>
                            <span className="text-xs text-center px-1">
                              {getMediaTypeLabel(media.type)}
                            </span>
                          </div>)}
                      </div>
                      <div className="p-2">
                        <div className="text-xs font-medium truncate">
                          {media.title || media.originalName}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <badge_1.Badge variant="secondary" className="text-xs px-1 py-0">
                            {getMediaTypeLabel(media.type)}
                          </badge_1.Badge>
                          <span>{formatFileSize(media.size)}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {(0, date_fns_1.format)(new Date(media.createdAt), 'dd.MM.yyyy', { locale: locale_1.tr })}
                        </div>
                      </div>
                    </div>))}
                </div>)}
            </div>
          </dialog_1.DialogContent>
        </dialog_1.Dialog>
        
        {selectedMediaId && (<button_1.Button variant="outline" onClick={handleClear}>
            <lucide_react_1.X className="h-4 w-4"/>
          </button_1.Button>)}
      </div>
      
      {selectedMedia && (<div className="text-sm text-muted-foreground">
          Seçilen: {selectedMedia.title || selectedMedia.originalName}
        </div>)}
    </div>);
}
//# sourceMappingURL=MediaPicker.js.map