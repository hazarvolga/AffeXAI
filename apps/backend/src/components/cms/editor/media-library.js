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
exports.MediaLibrary = void 0;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const scroll_area_1 = require("@/components/ui/scroll-area");
const tabs_1 = require("@/components/ui/tabs");
const types_1 = require("@/lib/media/types");
const media_service_1 = require("@/lib/media/media-service");
const lucide_react_1 = require("lucide-react");
const use_toast_1 = require("@/hooks/use-toast");
const MediaLibrary = ({ onMediaSelect }) => {
    const { toast } = (0, use_toast_1.useToast)();
    const [mediaItems, setMediaItems] = (0, react_1.useState)([]);
    const [filteredMedia, setFilteredMedia] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [selectedType, setSelectedType] = (0, react_1.useState)('all');
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [uploading, setUploading] = (0, react_1.useState)(false);
    const fileInputRef = (0, react_1.useRef)(null);
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
            // Ensure the media object has all required properties
            if (!media.url) {
                throw new Error('Uploaded file did not return a valid URL');
            }
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
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Reset input
            }
        }
    };
    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
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
    return (<card_1.Card className="h-full flex flex-col">
      <card_1.CardHeader>
        <card_1.CardTitle>Media Library</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent className="flex-1 p-0 flex flex-col">
        <div className="p-4 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <lucide_react_1.Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
              <input_1.Input placeholder="Search media..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-8"/>
              {searchQuery && (<button_1.Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3" onClick={() => setSearchQuery('')}>
                  <lucide_react_1.X className="h-4 w-4"/>
                </button_1.Button>)}
            </div>
            <button_1.Button variant="outline" disabled={uploading} className="flex items-center gap-2" onClick={triggerFileInput}>
              <lucide_react_1.Upload className="h-4 w-4"/>
              Upload
            </button_1.Button>
            <input_1.Input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} disabled={uploading}/>
          </div>

          <tabs_1.Tabs value={selectedType} onValueChange={(value) => setSelectedType(value)}>
            <tabs_1.TabsList className="grid w-full grid-cols-5">
              <tabs_1.TabsTrigger value="all">All</tabs_1.TabsTrigger>
              <tabs_1.TabsTrigger value={types_1.MediaType.IMAGE}>Images</tabs_1.TabsTrigger>
              <tabs_1.TabsTrigger value={types_1.MediaType.DOCUMENT}>Docs</tabs_1.TabsTrigger>
              <tabs_1.TabsTrigger value={types_1.MediaType.VIDEO}>Videos</tabs_1.TabsTrigger>
              <tabs_1.TabsTrigger value={types_1.MediaType.AUDIO}>Audio</tabs_1.TabsTrigger>
            </tabs_1.TabsList>
          </tabs_1.Tabs>
        </div>

        <scroll_area_1.ScrollArea className="flex-1">
          {loading ? (<div className="p-4 text-center text-muted-foreground">
              Loading media...
            </div>) : filteredMedia.length === 0 ? (<div className="p-4 text-center text-muted-foreground">
              {searchQuery ? 'No media found matching your search' : 'No media items available'}
            </div>) : (<div className="grid grid-cols-3 gap-2 p-4">
              {filteredMedia.map((media) => (<div key={media.id} className="relative group cursor-pointer border rounded-md overflow-hidden hover:border-primary transition-colors" onClick={() => {
                    // Only allow selection if media has a valid URL
                    if (media.url) {
                        onMediaSelect(media);
                    }
                }}>
                  {media.type === types_1.MediaType.IMAGE ? (<div className="aspect-square bg-muted flex items-center justify-center">
                      {media.thumbnailUrl || media.url ? (<img src={media.thumbnailUrl || media.url} alt={media.altText || media.originalName} className="object-cover w-full h-full"/>) : (<lucide_react_1.Image className="h-8 w-8 text-muted-foreground"/>)}
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
                </div>))}
            </div>)}
        </scroll_area_1.ScrollArea>
      </card_1.CardContent>
    </card_1.Card>);
};
exports.MediaLibrary = MediaLibrary;
exports.default = exports.MediaLibrary;
//# sourceMappingURL=media-library.js.map