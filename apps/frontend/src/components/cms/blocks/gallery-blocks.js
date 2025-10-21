"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.galleryBlocks = exports.GalleryCarousel = exports.GalleryFiveImageShowcase = exports.GalleryFourImageMosaic = exports.GalleryThreeImageGrid = exports.GalleryTwoImageSplit = exports.GallerySingleImage = void 0;
const react_1 = __importDefault(require("react"));
const container_component_1 = require("@/components/cms/container-component");
const text_component_1 = require("@/components/cms/text-component");
const grid_component_1 = require("@/components/cms/grid-component");
const card_component_1 = require("@/components/cms/card-component");
const image_component_1 = require("@/components/cms/image-component");
// Gallery Block 1: Single Image Display
const GallerySingleImage = ({ props }) => {
    const title = props?.title || "Featured Project";
    const titleVariant = props?.titleVariant || "heading3";
    const titleAlign = props?.titleAlign || "left";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const caption = props?.caption || "Brief description of this featured project or image.";
    const captionVariant = props?.captionVariant || "body";
    const captionAlign = props?.captionAlign || "left";
    const captionColor = props?.captionColor || "muted";
    const captionWeight = props?.captionWeight || "normal";
    const imageUrl = props?.imageUrl || "/placeholder-image.jpg";
    return (<container_component_1.ContainerComponent id="gallery-single-container" padding="xl" background="none" className="py-16">
      <card_component_1.CardComponent id="gallery-single-card" padding="none" rounded="lg" shadow="md">
        <image_component_1.ImageComponent id="gallery-single-image" src={imageUrl} alt="Featured Image" className="rounded-lg w-full h-auto"/>
        <div className="p-6">
          <text_component_1.TextComponent id="gallery-single-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-2"/>
          <text_component_1.TextComponent id="gallery-single-caption" content={caption} variant={captionVariant} align={captionAlign} color={captionColor} weight={captionWeight} className="text-muted-foreground"/>
        </div>
      </card_component_1.CardComponent>
    </container_component_1.ContainerComponent>);
};
exports.GallerySingleImage = GallerySingleImage;
// Gallery Block 2: Two-Image Split Gallery
const GalleryTwoImageSplit = ({ props }) => {
    const title = props?.title || "Our Work";
    const titleVariant = props?.titleVariant || "heading2";
    const titleAlign = props?.titleAlign || "center";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const items = props?.items || [
        {
            id: '1',
            title: "Project Alpha",
            caption: "Web design and development for a tech startup.",
            imageUrl: "/placeholder-image.jpg"
        },
        {
            id: '2',
            title: "Project Beta",
            caption: "Branding and marketing campaign for a retail brand.",
            imageUrl: "/placeholder-image.jpg"
        }
    ];
    return (<container_component_1.ContainerComponent id="gallery-two-container" padding="xl" background="muted" className="py-16">
      <text_component_1.TextComponent id="gallery-two-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="text-center mb-12"/>
      <grid_component_1.GridComponent id="gallery-two-grid" columns={2} gap="xl">
        {items.map((item, index) => (<card_component_1.CardComponent id={`gallery-two-card-${index + 1}`} key={item.id || index} padding="none" rounded="lg" shadow="md">
            <image_component_1.ImageComponent id={`gallery-two-image-${index + 1}`} src={item.imageUrl} alt={item.title} className="rounded-t-lg w-full h-auto"/>
            <div className="p-6">
              <text_component_1.TextComponent id={`gallery-two-card-${index + 1}-title`} content={item.title} variant="heading3" className="mb-2"/>
              <text_component_1.TextComponent id={`gallery-two-card-${index + 1}-caption`} content={item.caption} variant="body" className="text-muted-foreground"/>
            </div>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.GalleryTwoImageSplit = GalleryTwoImageSplit;
// Gallery Block 3: Three-Image Grid
const GalleryThreeImageGrid = ({ props }) => {
    // Use props or fallback to default values
    const title = props?.title || "Featured Highlights";
    const items = props?.items || [
        {
            image: "/placeholder-image.jpg",
            title: "Design Excellence",
        },
        {
            image: "/placeholder-image.jpg",
            title: "Innovation",
        },
        {
            image: "/placeholder-image.jpg",
            title: "Quality",
        },
    ];
    return (<container_component_1.ContainerComponent id="gallery-three-container" padding="xl" background="none" className="py-16">
      <text_component_1.TextComponent id="gallery-three-title" content={title} variant="heading2" className="text-center mb-12"/>
      <grid_component_1.GridComponent id="gallery-three-grid" columns={3} gap="lg">
        {items.map((item, index) => (<card_component_1.CardComponent id={`gallery-three-card-${index + 1}`} key={index} padding="none" rounded="lg" shadow="md">
            <image_component_1.ImageComponent id={`gallery-three-image-${index + 1}`} src={item.image} alt={item.title} className="rounded-lg w-full h-auto"/>
            <div className="p-4">
              <text_component_1.TextComponent id={`gallery-three-card-${index + 1}-title`} content={item.title} variant="body" className="font-medium"/>
            </div>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.GalleryThreeImageGrid = GalleryThreeImageGrid;
// Gallery Block 4: Four-Image Mosaic
const GalleryFourImageMosaic = ({ props }) => {
    // Use props or fallback to default values
    const title = props?.title || "Our Portfolio";
    const items = props?.items || [
        {
            image: "/placeholder-image.jpg",
            title: "Project Alpha",
            description: "Web design project for a tech startup.",
        },
        {
            image: "/placeholder-image.jpg",
            title: "Project Beta",
            description: "Branding campaign for a retail company.",
        },
        {
            image: "/placeholder-image.jpg",
            title: "Project Gamma",
            description: "Mobile app design and development.",
        },
        {
            image: "/placeholder-image.jpg",
            title: "Project Delta",
            description: "E-commerce website implementation.",
        },
    ];
    return (<container_component_1.ContainerComponent id="gallery-four-container" padding="xl" background="muted" className="py-16">
      <text_component_1.TextComponent id="gallery-four-title" content={title} variant="heading2" className="text-center mb-12"/>
      <grid_component_1.GridComponent id="gallery-four-grid" columns={4} gap="sm" className="grid grid-cols-2 md:grid-cols-4 auto-rows-auto">
        {items.map((item, index) => (<card_component_1.CardComponent id={`gallery-four-card-${index + 1}`} key={index} padding="none" rounded="lg" shadow="sm" className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}>
            <image_component_1.ImageComponent id={`gallery-four-image-${index + 1}`} src={item.image} alt={item.title} className="rounded-lg w-full h-full object-cover"/>
            <div className="p-3">
              <text_component_1.TextComponent id={`gallery-four-card-${index + 1}-title`} content={item.title} variant="body" className="font-medium mb-1"/>
              <text_component_1.TextComponent id={`gallery-four-card-${index + 1}-desc`} content={item.description} variant="caption" className="text-muted-foreground"/>
            </div>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.GalleryFourImageMosaic = GalleryFourImageMosaic;
// Gallery Block 5: Five-Image Showcase
const GalleryFiveImageShowcase = () => {
    return (<container_component_1.ContainerComponent id="gallery-five-container" padding="xl" background="none" className="py-16">
      <text_component_1.TextComponent id="gallery-five-title" content="Recent Work" variant="heading2" className="text-center mb-12"/>
      <grid_component_1.GridComponent id="gallery-five-grid" columns={5} gap="md">
        <card_component_1.CardComponent id="gallery-five-card-1" padding="none" rounded="lg" shadow="md">
          <image_component_1.ImageComponent id="gallery-five-image-1" src="/placeholder-image.jpg" alt="Work 1" className="rounded-lg w-full h-auto"/>
        </card_component_1.CardComponent>
        
        <card_component_1.CardComponent id="gallery-five-card-2" padding="none" rounded="lg" shadow="md">
          <image_component_1.ImageComponent id="gallery-five-image-2" src="/placeholder-image.jpg" alt="Work 2" className="rounded-lg w-full h-auto"/>
        </card_component_1.CardComponent>
        
        <card_component_1.CardComponent id="gallery-five-card-3" padding="none" rounded="lg" shadow="md">
          <image_component_1.ImageComponent id="gallery-five-image-3" src="/placeholder-image.jpg" alt="Work 3" className="rounded-lg w-full h-auto"/>
        </card_component_1.CardComponent>
        
        <card_component_1.CardComponent id="gallery-five-card-4" padding="none" rounded="lg" shadow="md">
          <image_component_1.ImageComponent id="gallery-five-image-4" src="/placeholder-image.jpg" alt="Work 4" className="rounded-lg w-full h-auto"/>
        </card_component_1.CardComponent>
        
        <card_component_1.CardComponent id="gallery-five-card-5" padding="none" rounded="lg" shadow="md">
          <image_component_1.ImageComponent id="gallery-five-image-5" src="/placeholder-image.jpg" alt="Work 5" className="rounded-lg w-full h-auto"/>
        </card_component_1.CardComponent>
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.GalleryFiveImageShowcase = GalleryFiveImageShowcase;
// Gallery Block 6: Carousel Gallery
const GalleryCarousel = () => {
    return (<container_component_1.ContainerComponent id="gallery-carousel-container" padding="xl" background="muted" className="py-16">
      <text_component_1.TextComponent id="gallery-carousel-title" content="Image Gallery" variant="heading2" className="text-center mb-12"/>
      <card_component_1.CardComponent id="gallery-carousel-card" padding="none" rounded="lg" shadow="md">
        <div className="relative">
          <image_component_1.ImageComponent id="gallery-carousel-image" src="/placeholder-image.jpg" alt="Gallery Image" className="rounded-t-lg w-full h-96 object-cover"/>
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button className="bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center">
              ‹
            </button>
            <button className="bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center">
              ›
            </button>
          </div>
        </div>
        <div className="p-6">
          <text_component_1.TextComponent id="gallery-carousel-caption" content="Image 1 of 5: Description of this image in the carousel." variant="body" className="text-muted-foreground text-center"/>
        </div>
        <div className="flex justify-center p-4 space-x-2">
          {[1, 2, 3, 4, 5].map((index) => (<button key={index} className={`w-3 h-3 rounded-full ${index === 1 ? 'bg-primary' : 'bg-muted'}`}/>))}
        </div>
      </card_component_1.CardComponent>
    </container_component_1.ContainerComponent>);
};
exports.GalleryCarousel = GalleryCarousel;
// Export all gallery blocks
exports.galleryBlocks = [
    {
        id: 'gallery-single-image',
        name: 'Single Image Display',
        description: 'Full-width spotlight image with caption.',
        category: 'Gallery',
        component: exports.GallerySingleImage,
    },
    {
        id: 'gallery-two-image-split',
        name: 'Two-Image Split Gallery',
        description: 'Side-by-side layout for visual storytelling.',
        category: 'Gallery',
        component: exports.GalleryTwoImageSplit,
    },
    {
        id: 'gallery-three-image-grid',
        name: 'Three-Image Grid',
        description: 'Balanced gallery for feature highlights.',
        category: 'Gallery',
        component: exports.GalleryThreeImageGrid,
    },
    {
        id: 'gallery-four-image-mosaic',
        name: 'Four-Image Mosaic',
        description: 'Compact mosaic layout; great for portfolios.',
        category: 'Gallery',
        component: exports.GalleryFourImageMosaic,
    },
    {
        id: 'gallery-five-image-showcase',
        name: 'Five-Image Showcase',
        description: 'Extended grid for editorial layouts.',
        category: 'Gallery',
        component: exports.GalleryFiveImageShowcase,
    },
    {
        id: 'gallery-carousel',
        name: 'Carousel Gallery',
        description: 'Scrollable gallery for dynamic presentations.',
        category: 'Gallery',
        component: exports.GalleryCarousel,
    },
];
//# sourceMappingURL=gallery-blocks.js.map