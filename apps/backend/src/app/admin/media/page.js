"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MediaManagementPage;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const lucide_react_1 = require("lucide-react");
const mediaService_1 = __importDefault(require("@/lib/api/mediaService"));
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const image_1 = __importDefault(require("next/image"));
const select_1 = require("@/components/ui/select");
const dialog_1 = require("@/components/ui/dialog");
const use_toast_1 = require("@/hooks/use-toast");
function MediaManagementPage() {
    const [mediaItems, setMediaItems] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [uploading, setUploading] = (0, react_1.useState)(false);
    const [selectedFile, setSelectedFile] = (0, react_1.useState)(null);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [filterType, setFilterType] = (0, react_1.useState)('all');
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    const [selectedMedia, setSelectedMedia] = (0, react_1.useState)(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = (0, react_1.useState)(false);
    const fileInputRef = (0, react_1.useRef)(null);
    const { toast } = (0, use_toast_1.useToast)();
    const fetchMedia = (0, react_1.useCallback)(async () => {
        try {
            setLoading(true);
            const data = await mediaService_1.default.getAllMedia();
            setMediaItems(data);
        }
        catch (err) {
            console.error('Error fetching media:', err);
            toast({
                title: "Hata",
                description: "Medya dosyaları yüklenirken bir hata oluştu.",
                variant: "destructive"
            });
        }
        finally {
            setLoading(false);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        fetchMedia();
    }, [fetchMedia]);
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = () => {
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            // Check if file is an image
            if (!file.type.match('image.*')) {
                toast({
                    title: "Geçersiz Dosya Türü",
                    description: "Sadece resim dosyaları yüklenebilir (JPG, PNG, GIF, SVG, WEBP).",
                    variant: "destructive"
                });
                return;
            }
            setSelectedFile(file);
        }
    };
    const handleUpload = async () => {
        if (!selectedFile)
            return;
        try {
            setUploading(true);
            await mediaService_1.default.uploadFile(selectedFile);
            setSelectedFile(null);
            fetchMedia(); // Refresh the media list
            toast({
                title: "Başarılı",
                description: "Dosya başarıyla yüklendi."
            });
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
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
    const handleDelete = async (id, fileName) => {
        if (!confirm(`"${fileName}" adlı dosyayı silmek istediğinize emin misiniz?`)) {
            return;
        }
        try {
            await mediaService_1.default.deleteMedia(id);
            fetchMedia(); // Refresh the media list
            toast({
                title: "Başarılı",
                description: "Dosya başarıyla silindi."
            });
        }
        catch (err) {
            console.error('Error deleting media:', err);
            toast({
                title: "Hata",
                description: "Dosya silinirken bir hata oluştu.",
                variant: "destructive"
            });
        }
    };
    const handleEdit = (media) => {
        setSelectedMedia(media);
        setIsEditDialogOpen(true);
    };
    const handleSaveEdit = async () => {
        if (!selectedMedia)
            return;
        try {
            await mediaService_1.default.updateMedia(selectedMedia.id, {
                title: selectedMedia.title,
                description: selectedMedia.description,
                altText: selectedMedia.altText
            });
            fetchMedia(); // Refresh the media list
            setIsEditDialogOpen(false);
            setSelectedMedia(null);
            toast({
                title: "Başarılı",
                description: "Dosya bilgileri güncellendi."
            });
        }
        catch (err) {
            console.error('Error updating media:', err);
            toast({
                title: "Hata",
                description: "Dosya bilgileri güncellenirken bir hata oluştu.",
                variant: "destructive"
            });
        }
    };
    const filteredMedia = mediaItems.filter(media => {
        const matchesSearch = media.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (media.title && media.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (media.description && media.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = filterType === 'all' || media.type === filterType;
        return matchesSearch && matchesType;
    });
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
    if (loading) {
        return (<div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medya Yönetimi</h1>
          <p className="text-muted-foreground">Tüm medya dosyalarınızı buradan yönetin.</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Medya dosyaları yükleniyor...</div>
        </div>
      </div>);
    }
    return (<div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Medya Yönetimi</h1>
        <p className="text-muted-foreground">Tüm medya dosyalarınızı buradan yönetin.</p>
      </div>

      {/* Upload Section */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Yeni Medya Yükle</card_1.CardTitle>
          <card_1.CardDescription>
            Yeni medya dosyaları yükleyin. Desteklenen formatlar: JPG, PNG, GIF, SVG, WEBP (Maksimum 5MB)
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/25 hover:border-primary/50'}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}>
            <lucide_react_1.Upload className="mx-auto h-12 w-12 text-muted-foreground"/>
            <p className="mt-2 text-sm text-muted-foreground">
              {isDragging ? 'Dosyayı bırakın' : 'Dosya sürükleyip bırakın ya da tıklayın'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG, GIF, SVG, WEBP (Maksimum 5MB)
            </p>
            <input ref={fileInputRef} id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden"/>
          </div>
          
          {selectedFile && (<div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10">
                  <lucide_react_1.Image className="h-5 w-5 text-primary"/>
                </div>
                <div>
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button_1.Button onClick={handleUpload} disabled={uploading} size="sm">
                  <lucide_react_1.Upload className="mr-2 h-4 w-4"/>
                  {uploading ? 'Yükleniyor...' : 'Yükle'}
                </button_1.Button>
                <button_1.Button variant="ghost" size="icon" onClick={() => {
                setSelectedFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }}>
                  <lucide_react_1.X className="h-4 w-4"/>
                </button_1.Button>
              </div>
            </div>)}
        </card_1.CardContent>
      </card_1.Card>

      {/* Media List */}
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <card_1.CardTitle>Medya Dosyaları</card_1.CardTitle>
              <card_1.CardDescription>
                {mediaItems.length} medya dosyası
              </card_1.CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <lucide_react_1.Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                <input_1.Input placeholder="Ara..." className="pl-8 w-40" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
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
          </div>
        </card_1.CardHeader>
        <card_1.CardContent>
          {filteredMedia.length === 0 ? (<div className="flex flex-col items-center justify-center py-12 gap-4">
              <lucide_react_1.Image className="h-12 w-12 text-muted-foreground"/>
              <div className="text-center">
                <h3 className="text-lg font-semibold">Henüz medya dosyası yok</h3>
                <p className="text-muted-foreground">
                  Yeni medya dosyaları yükleyerek kütüphanenizi oluşturun.
                </p>
              </div>
            </div>) : (<table_1.Table>
              <table_1.TableHeader>
                <table_1.TableRow>
                  <table_1.TableHead className="w-[100px]">Önizleme</table_1.TableHead>
                  <table_1.TableHead>Dosya Adı</table_1.TableHead>
                  <table_1.TableHead>Tür</table_1.TableHead>
                  <table_1.TableHead>Boyut</table_1.TableHead>
                  <table_1.TableHead>Oluşturulma Tarihi</table_1.TableHead>
                  <table_1.TableHead className="text-right">Eylemler</table_1.TableHead>
                </table_1.TableRow>
              </table_1.TableHeader>
              <table_1.TableBody>
                {filteredMedia.map((media) => (<table_1.TableRow key={media.id}>
                    <table_1.TableCell>
                      {media.type === 'image' ? (<div className="relative h-16 w-16 rounded-md overflow-hidden">
                          <image_1.default src={`http://localhost:9005${media.url}`} alt={media.altText || media.originalName} fill className="object-cover"/>
                        </div>) : (<div className="flex items-center justify-center h-16 w-16 rounded-md bg-muted">
                          {getMediaTypeIcon(media.type)}
                        </div>)}
                    </table_1.TableCell>
                    <table_1.TableCell className="font-medium">
                      <div>{media.originalName}</div>
                      {media.title && (<div className="text-sm text-muted-foreground">{media.title}</div>)}
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <badge_1.Badge variant="secondary" className="flex items-center gap-1">
                        {getMediaTypeIcon(media.type)}
                        {getMediaTypeLabel(media.type)}
                      </badge_1.Badge>
                    </table_1.TableCell>
                    <table_1.TableCell>{formatFileSize(media.size)}</table_1.TableCell>
                    <table_1.TableCell>
                      {new Date(media.createdAt).toLocaleDateString('tr-TR')}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <button_1.Button variant="outline" size="sm" onClick={() => handleEdit(media)}>
                          <lucide_react_1.Edit className="h-4 w-4"/>
                        </button_1.Button>
                        <button_1.Button variant="destructive" size="sm" onClick={() => handleDelete(media.id, media.originalName)}>
                          <lucide_react_1.Trash2 className="h-4 w-4"/>
                        </button_1.Button>
                      </div>
                    </table_1.TableCell>
                  </table_1.TableRow>))}
              </table_1.TableBody>
            </table_1.Table>)}
        </card_1.CardContent>
      </card_1.Card>

      {/* Edit Media Dialog */}
      <dialog_1.Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <dialog_1.DialogContent>
          <dialog_1.DialogHeader>
            <dialog_1.DialogTitle>Medya Bilgilerini Düzenle</dialog_1.DialogTitle>
          </dialog_1.DialogHeader>
          {selectedMedia && (<div className="space-y-4">
              <div className="flex justify-center">
                {selectedMedia.type === 'image' ? (<div className="relative h-32 w-32 rounded-md overflow-hidden">
                    <image_1.default src={`http://localhost:9005${selectedMedia.url}`} alt={selectedMedia.altText || selectedMedia.originalName} fill className="object-cover"/>
                  </div>) : (<div className="flex items-center justify-center h-32 w-32 rounded-md bg-muted">
                    {getMediaTypeIcon(selectedMedia.type)}
                  </div>)}
              </div>
              
              <div className="space-y-2">
                <label_1.Label htmlFor="title">Başlık</label_1.Label>
                <input_1.Input id="title" value={selectedMedia.title || ''} onChange={(e) => setSelectedMedia({ ...selectedMedia, title: e.target.value })}/>
              </div>
              
              <div className="space-y-2">
                <label_1.Label htmlFor="altText">Alternatif Metin</label_1.Label>
                <input_1.Input id="altText" value={selectedMedia.altText || ''} onChange={(e) => setSelectedMedia({ ...selectedMedia, altText: e.target.value })}/>
              </div>
              
              <div className="space-y-2">
                <label_1.Label htmlFor="description">Açıklama</label_1.Label>
                <textarea_1.Textarea id="description" value={selectedMedia.description || ''} onChange={(e) => setSelectedMedia({ ...selectedMedia, description: e.target.value })}/>
              </div>
              
              <div className="flex justify-end gap-2">
                <button_1.Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  İptal
                </button_1.Button>
                <button_1.Button onClick={handleSaveEdit}>
                  Kaydet
                </button_1.Button>
              </div>
            </div>)}
        </dialog_1.DialogContent>
      </dialog_1.Dialog>
    </div>);
}
//# sourceMappingURL=page.js.map