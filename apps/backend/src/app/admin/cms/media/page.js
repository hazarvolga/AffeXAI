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
const react_1 = __importStar(require("react"));
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const select_1 = require("@/components/ui/select");
const types_1 = require("@/lib/media/types");
const media_service_1 = require("@/lib/media/media-service");
const lucide_react_1 = require("lucide-react");
const use_toast_1 = require("@/hooks/use-toast");
const MediaManagementPage = () => {
    const { toast } = (0, use_toast_1.useToast)();
    const [mediaItems, setMediaItems] = (0, react_1.useState)([]);
    const [filteredMedia, setFilteredMedia] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [selectedType, setSelectedType] = (0, react_1.useState)('all');
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [uploading, setUploading] = (0, react_1.useState)(false);
    const [selectedMedia, setSelectedMedia] = (0, react_1.useState)(null);
    const [editingMedia, setEditingMedia] = (0, react_1.useState)(null);
    const fetchMedia = (0, react_1.useCallback)(async () => {
        try {
            setLoading(true);
            const media = await media_service_1.mediaService.getAllMedia();
            setMediaItems(media);
            setFilteredMedia(media);
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch media items",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    }, [toast]);
    (0, react_1.useEffect)(() => {
        fetchMedia();
    }, [fetchMedia]);
    (0, react_1.useEffect)(() => {
        let result = mediaItems;
        // Filter by type
        if (selectedType !== 'all') {
            result = result.filter(item => item.type === selectedType);
        }
        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(item => item.originalName.toLowerCase().includes(query) ||
                item.title?.toLowerCase().includes(query) ||
                item.description?.toLowerCase().includes(query));
        }
        setFilteredMedia(result);
    }, [mediaItems, selectedType, searchQuery]);
    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        try {
            setUploading(true);
            const media = await media_service_1.mediaService.uploadFile(file);
            setMediaItems([media, ...mediaItems]);
            toast({
                title: "Success",
                description: "File uploaded successfully",
            });
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to upload file",
                variant: "destructive",
            });
        }
        finally {
            setUploading(false);
            e.target.value = ''; // Reset input
        }
    };
    const handleDeleteMedia = async (id) => {
        if (!confirm('Are you sure you want to delete this media item?')) {
            return;
        }
        try {
            await media_service_1.mediaService.deleteMedia(id);
            setMediaItems(mediaItems.filter(item => item.id !== id));
            if (selectedMedia?.id === id) {
                setSelectedMedia(null);
            }
            toast({
                title: "Success",
                description: "Media item deleted successfully",
            });
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete media item",
                variant: "destructive",
            });
        }
    };
    const handleEditMedia = (media) => {
        setEditingMedia({
            title: media.title,
            altText: media.altText,
            description: media.description,
        });
        setSelectedMedia(media);
    };
    const handleSaveEdit = async () => {
        if (!selectedMedia || !editingMedia)
            return;
        try {
            const updatedMedia = await media_service_1.mediaService.updateMedia(selectedMedia.id, editingMedia);
            setMediaItems(mediaItems.map(item => item.id === selectedMedia.id ? updatedMedia : item));
            setSelectedMedia(updatedMedia);
            setEditingMedia(null);
            toast({
                title: "Success",
                description: "Media item updated successfully",
            });
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to update media item",
                variant: "destructive",
            });
        }
    };
    const getMediaTypeIcon = (type) => {
        switch (type) {
            case types_1.MediaType.IMAGE:
                return <lucide_react_1.Image className="h-4 w-4"/>;
            case types_1.MediaType.DOCUMENT:
                return <lucide_react_1.FileText className="h-4 w-4"/>;
            case types_1.MediaType.VIDEO:
                return <lucide_react_1.Video className="h-4 w-4"/>;
            case types_1.MediaType.AUDIO:
                return <lucide_react_1.Music className="h-4 w-4"/>;
            default:
                return <lucide_react_1.FileText className="h-4 w-4"/>;
        }
    };
    const getMediaTypeLabel = (type) => {
        switch (type) {
            case types_1.MediaType.IMAGE:
                return 'Image';
            case types_1.MediaType.DOCUMENT:
                return 'Document';
            case types_1.MediaType.VIDEO:
                return 'Video';
            case types_1.MediaType.AUDIO:
                return 'Audio';
            default:
                return 'File';
        }
    };
    return (<div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Media Management</h1>
        <p className="text-muted-foreground">Manage your media library</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <card_1.Card>
            <card_1.CardHeader>
              <div className="flex justify-between items-center">
                <card_1.CardTitle>Media Library</card_1.CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <lucide_react_1.Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <input_1.Input placeholder="Search media..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-8 w-64"/>
                    {searchQuery && (<button_1.Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3" onClick={() => setSearchQuery('')}>
                        <lucide_react_1.X className="h-4 w-4"/>
                      </button_1.Button>)}
                  </div>
                  <select_1.Select value={selectedType} onValueChange={(value) => setSelectedType(value)}>
                    <select_1.SelectTrigger className="w-32">
                      <select_1.SelectValue placeholder="Filter by type"/>
                    </select_1.SelectTrigger>
                    <select_1.SelectContent>
                      <select_1.SelectItem value="all">All Types</select_1.SelectItem>
                      <select_1.SelectItem value={types_1.MediaType.IMAGE}>Images</select_1.SelectItem>
                      <select_1.SelectItem value={types_1.MediaType.DOCUMENT}>Documents</select_1.SelectItem>
                      <select_1.SelectItem value={types_1.MediaType.VIDEO}>Videos</select_1.SelectItem>
                      <select_1.SelectItem value={types_1.MediaType.AUDIO}>Audio</select_1.SelectItem>
                    </select_1.SelectContent>
                  </select_1.Select>
                  <label_1.Label className="cursor-pointer">
                    <button_1.Button variant="default" disabled={uploading} className="flex items-center gap-2">
                      <lucide_react_1.Upload className="h-4 w-4"/>
                      Upload
                    </button_1.Button>
                    <input_1.Input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading}/>
                  </label_1.Label>
                </div>
              </div>
            </card_1.CardHeader>
            <card_1.CardContent>
              {loading ? (<p>Loading media...</p>) : filteredMedia.length === 0 ? (<p className="text-center text-muted-foreground py-8">
                  {searchQuery ? 'No media found matching your search' : 'No media items available'}
                </p>) : (<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredMedia.map((media) => (<div key={media.id} className={`relative group cursor-pointer border rounded-md overflow-hidden hover:border-primary transition-colors ${selectedMedia?.id === media.id ? 'border-primary ring-2 ring-primary/20' : ''}`} onClick={() => setSelectedMedia(media)}>
                      {media.type === types_1.MediaType.IMAGE ? (<div className="aspect-square bg-muted flex items-center justify-center">
                          {media.thumbnailUrl ? (<img src={media.thumbnailUrl} alt={media.altText || media.originalName} className="object-cover w-full h-full"/>) : (<lucide_react_1.Image className="h-8 w-8 text-muted-foreground"/>)}
                        </div>) : (<div className="aspect-square bg-muted flex flex-col items-center justify-center p-2 text-center">
                          <div className="mb-2">
                            {getMediaTypeIcon(media.type)}
                          </div>
                          <span className="text-xs font-medium truncate w-full">
                            {getMediaTypeLabel(media.type)}
                          </span>
                        </div>)}
                      <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-1 text-xs truncate opacity-0 group-hover:opacity-100 transition-opacity">
                        {media.originalName}
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button_1.Button size="sm" variant="secondary" className="h-6 w-6 p-0" onClick={(e) => {
                    e.stopPropagation();
                    handleEditMedia(media);
                }}>
                          <lucide_react_1.Edit className="h-3 w-3"/>
                        </button_1.Button>
                        <button_1.Button size="sm" variant="destructive" className="h-6 w-6 p-0" onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMedia(media.id);
                }}>
                          <lucide_react_1.Trash2 className="h-3 w-3"/>
                        </button_1.Button>
                      </div>
                    </div>))}
                </div>)}
            </card_1.CardContent>
          </card_1.Card>
        </div>

        <div>
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>
                {selectedMedia ? 'Media Details' : 'Select Media'}
              </card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
              {selectedMedia ? (<div className="space-y-4">
                  {selectedMedia.type === types_1.MediaType.IMAGE ? (<div className="aspect-square bg-muted rounded-md overflow-hidden">
                      {selectedMedia.thumbnailUrl ? (<img src={selectedMedia.thumbnailUrl} alt={selectedMedia.altText || selectedMedia.originalName} className="object-cover w-full h-full"/>) : (<div className="w-full h-full flex items-center justify-center">
                          <lucide_react_1.Image className="h-12 w-12 text-muted-foreground"/>
                        </div>)}
                    </div>) : (<div className="aspect-square bg-muted rounded-md flex flex-col items-center justify-center">
                      <div className="mb-2">
                        {getMediaTypeIcon(selectedMedia.type)}
                      </div>
                      <span className="text-sm font-medium">
                        {getMediaTypeLabel(selectedMedia.type)}
                      </span>
                    </div>)}
                  
                  {editingMedia ? (<div className="space-y-4">
                      <div>
                        <label_1.Label htmlFor="title">Title</label_1.Label>
                        <input_1.Input id="title" value={editingMedia.title || ''} onChange={(e) => setEditingMedia({ ...editingMedia, title: e.target.value })}/>
                      </div>
                      
                      <div>
                        <label_1.Label htmlFor="altText">Alt Text</label_1.Label>
                        <input_1.Input id="altText" value={editingMedia.altText || ''} onChange={(e) => setEditingMedia({ ...editingMedia, altText: e.target.value })}/>
                      </div>
                      
                      <div>
                        <label_1.Label htmlFor="description">Description</label_1.Label>
                        <textarea_1.Textarea id="description" value={editingMedia.description || ''} onChange={(e) => setEditingMedia({ ...editingMedia, description: e.target.value })}/>
                      </div>
                      
                      <div className="flex gap-2">
                        <button_1.Button onClick={handleSaveEdit}>Save</button_1.Button>
                        <button_1.Button variant="outline" onClick={() => setEditingMedia(null)}>Cancel</button_1.Button>
                      </div>
                    </div>) : (<div className="space-y-4">
                      <div>
                        <label_1.Label className="text-xs text-muted-foreground">File Name</label_1.Label>
                        <p className="font-medium">{selectedMedia.originalName}</p>
                      </div>
                      
                      <div>
                        <label_1.Label className="text-xs text-muted-foreground">Title</label_1.Label>
                        <p className="font-medium">{selectedMedia.title || 'No title'}</p>
                      </div>
                      
                      <div>
                        <label_1.Label className="text-xs text-muted-foreground">Alt Text</label_1.Label>
                        <p className="font-medium">{selectedMedia.altText || 'No alt text'}</p>
                      </div>
                      
                      <div>
                        <label_1.Label className="text-xs text-muted-foreground">Description</label_1.Label>
                        <p className="font-medium">{selectedMedia.description || 'No description'}</p>
                      </div>
                      
                      <div>
                        <label_1.Label className="text-xs text-muted-foreground">Type</label_1.Label>
                        <p className="font-medium capitalize">{selectedMedia.type}</p>
                      </div>
                      
                      <div>
                        <label_1.Label className="text-xs text-muted-foreground">Size</label_1.Label>
                        <p className="font-medium">{(selectedMedia.size / 1024).toFixed(2)} KB</p>
                      </div>
                      
                      <div>
                        <label_1.Label className="text-xs text-muted-foreground">URL</label_1.Label>
                        <p className="font-mono text-xs break-all">{selectedMedia.url}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button_1.Button onClick={() => handleEditMedia(selectedMedia)}>Edit</button_1.Button>
                        <button_1.Button variant="destructive" onClick={() => handleDeleteMedia(selectedMedia.id)}>Delete</button_1.Button>
                      </div>
                    </div>)}
                </div>) : (<p className="text-muted-foreground text-center py-8">
                  Select a media item to view details
                </p>)}
            </card_1.CardContent>
          </card_1.Card>
        </div>
      </div>
    </div>);
};
exports.default = MediaManagementPage;
//# sourceMappingURL=page.js.map