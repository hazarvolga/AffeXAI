"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRssBlocks = exports.BlogRssList = exports.BlogRssFeaturedArticle = exports.BlogAuthorBioCentered = exports.BlogAuthorBioLeft = exports.BlogMiniHighlight = exports.BlogDoublePostHighlight = exports.BlogBasicList = exports.BlogExtendedFeature = void 0;
const react_1 = __importDefault(require("react"));
const container_component_1 = require("@/components/cms/container-component");
const text_component_1 = require("@/components/cms/text-component");
const button_component_1 = require("@/components/cms/button-component");
const grid_component_1 = require("@/components/cms/grid-component");
const card_component_1 = require("@/components/cms/card-component");
const image_component_1 = require("@/components/cms/image-component");
// Blog/RSS Block 1: Extended Blog Feature
const BlogExtendedFeature = ({ props }) => {
    const category = props?.category || "Technology";
    const categoryVariant = props?.categoryVariant || "body";
    const categoryAlign = props?.categoryAlign || "left";
    const categoryColor = props?.categoryColor || "primary";
    const categoryWeight = props?.categoryWeight || "medium";
    const date = props?.date || "October 5, 2023";
    const dateVariant = props?.dateVariant || "body";
    const dateAlign = props?.dateAlign || "left";
    const dateColor = props?.dateColor || "muted";
    const dateWeight = props?.dateWeight || "normal";
    const title = props?.title || "The Future of Web Development: Trends to Watch in 2023";
    const titleVariant = props?.titleVariant || "heading1";
    const titleAlign = props?.titleAlign || "left";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const excerpt = props?.excerpt || "Explore the latest trends shaping the web development landscape, from AI-powered tools to progressive web apps and beyond.";
    const excerptVariant = props?.excerptVariant || "body";
    const excerptAlign = props?.excerptAlign || "left";
    const excerptColor = props?.excerptColor || "muted";
    const excerptWeight = props?.excerptWeight || "normal";
    const authorName = props?.authorName || "John Doe";
    const authorNameVariant = props?.authorNameVariant || "body";
    const authorNameAlign = props?.authorNameAlign || "left";
    const authorNameColor = props?.authorNameColor || "primary";
    const authorNameWeight = props?.authorNameWeight || "medium";
    const authorInitials = props?.authorInitials || "JD";
    const imageUrl = props?.imageUrl || "/placeholder-image.jpg";
    return (<container_component_1.ContainerComponent id="blog-extended-container" padding="xl" background="none" className="py-16">
      <card_component_1.CardComponent id="blog-extended-card" padding="none" rounded="lg" shadow="md">
        <image_component_1.ImageComponent id="blog-extended-image" src={imageUrl} alt="Featured Post" className="rounded-t-lg w-full h-96 object-cover"/>
        <div className="p-8">
          <div className="flex items-center mb-4">
            <text_component_1.TextComponent id="blog-extended-category" content={category} variant={categoryVariant} align={categoryAlign} color={categoryColor} weight={categoryWeight} className="text-primary font-medium mr-4"/>
            <text_component_1.TextComponent id="blog-extended-date" content={date} variant={dateVariant} align={dateAlign} color={dateColor} weight={dateWeight} className="text-muted-foreground"/>
          </div>
          <text_component_1.TextComponent id="blog-extended-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-4"/>
          <text_component_1.TextComponent id="blog-extended-excerpt" content={excerpt} variant={excerptVariant} align={excerptAlign} color={excerptColor} weight={excerptWeight} className="mb-6 text-muted-foreground text-lg"/>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <text_component_1.TextComponent id="blog-extended-author-initial" content={authorInitials} variant="body" className="font-medium"/>
            </div>
            <text_component_1.TextComponent id="blog-extended-author" content={authorName} variant={authorNameVariant} align={authorNameAlign} color={authorNameColor} weight={authorNameWeight} className="font-medium"/>
          </div>
        </div>
      </card_component_1.CardComponent>
    </container_component_1.ContainerComponent>);
};
exports.BlogExtendedFeature = BlogExtendedFeature;
// Blog/RSS Block 2: Basic Blog List
const BlogBasicList = ({ props }) => {
    const title = props?.title || "Latest Articles";
    const titleVariant = props?.titleVariant || "heading2";
    const titleAlign = props?.titleAlign || "left";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const posts = props?.posts || [
        {
            id: '1',
            title: "Blog Post Title 1",
            excerpt: "Brief excerpt of the blog post content to entice readers to click through...",
            date: "October 5, 2023",
            imageUrl: "/placeholder-image.jpg"
        },
        {
            id: '2',
            title: "Blog Post Title 2",
            excerpt: "Another brief excerpt of blog content to showcase what readers will find...",
            date: "October 4, 2023",
            imageUrl: "/placeholder-image.jpg"
        },
        {
            id: '3',
            title: "Blog Post Title 3",
            excerpt: "Yet another excerpt to demonstrate the repeating pattern of blog posts...",
            date: "October 3, 2023",
            imageUrl: "/placeholder-image.jpg"
        }
    ];
    return (<container_component_1.ContainerComponent id="blog-basic-container" padding="xl" background="muted" className="py-16">
      <text_component_1.TextComponent id="blog-basic-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-12"/>
      <grid_component_1.GridComponent id="blog-basic-grid" columns={1} gap="lg">
        {posts.map((post, index) => (<card_component_1.CardComponent id={`blog-basic-card-${index + 1}`} key={post.id || index} padding="md" rounded="lg" shadow="sm" className="flex items-center">
            <image_component_1.ImageComponent id={`blog-basic-image-${index + 1}`} src={post.imageUrl} alt={post.title} className="rounded-md w-24 h-24 object-cover mr-6"/>
            <div className="flex-1">
              <text_component_1.TextComponent id={`blog-basic-post-title-${index + 1}`} content={post.title} variant="heading3" className="mb-2"/>
              <text_component_1.TextComponent id={`blog-basic-post-excerpt-${index + 1}`} content={post.excerpt} variant="body" className="text-muted-foreground mb-3"/>
              <text_component_1.TextComponent id={`blog-basic-post-date-${index + 1}`} content={post.date} variant="body" className="text-sm text-muted-foreground"/>
            </div>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.BlogBasicList = BlogBasicList;
// Blog/RSS Block 3: Double Post Highlight
const BlogDoublePostHighlight = ({ props }) => {
    const title = props?.title || "Featured Stories";
    const titleVariant = props?.titleVariant || "heading2";
    const titleAlign = props?.titleAlign || "center";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const posts = props?.posts || [
        {
            id: '1',
            title: "Innovative Design Techniques",
            excerpt: "Discover cutting-edge design techniques that are revolutionizing the industry.",
            buttonText: "Read More",
            imageUrl: "/placeholder-image.jpg"
        },
        {
            id: '2',
            title: "The Power of Minimalism",
            excerpt: "How minimalist approaches are creating more impactful user experiences.",
            buttonText: "Read More",
            imageUrl: "/placeholder-image.jpg"
        }
    ];
    return (<container_component_1.ContainerComponent id="blog-double-container" padding="xl" background="none" className="py-16">
      <text_component_1.TextComponent id="blog-double-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="text-center mb-12"/>
      <grid_component_1.GridComponent id="blog-double-grid" columns={2} gap="xl">
        {posts.map((post, index) => (<card_component_1.CardComponent id={`blog-double-card-${index + 1}`} key={post.id || index} padding="none" rounded="lg" shadow="md">
            <image_component_1.ImageComponent id={`blog-double-image-${index + 1}`} src={post.imageUrl} alt={post.title} className="rounded-t-lg w-full h-48 object-cover"/>
            <div className="p-6">
              <text_component_1.TextComponent id={`blog-double-card-${index + 1}-title`} content={post.title} variant="heading3" className="mb-3"/>
              <text_component_1.TextComponent id={`blog-double-card-${index + 1}-excerpt`} content={post.excerpt} variant="body" className="text-muted-foreground mb-4"/>
              <button_component_1.ButtonComponent id={`blog-double-card-${index + 1}-btn`} text={post.buttonText} variant="outline" size="sm"/>
            </div>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.BlogDoublePostHighlight = BlogDoublePostHighlight;
// Blog/RSS Block 4: Mini Blog Highlight
const BlogMiniHighlight = ({ props }) => {
    const title = props?.title || "Latest from the Blog";
    const titleVariant = props?.titleVariant || "heading3";
    const titleAlign = props?.titleAlign || "left";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const posts = props?.posts || [
        {
            id: '1',
            title: "Quick Insight #1",
            date: "Oct 5"
        },
        {
            id: '2',
            title: "Quick Insight #2",
            date: "Oct 4"
        },
        {
            id: '3',
            title: "Quick Insight #3",
            date: "Oct 3"
        }
    ];
    const buttonText = props?.buttonText || "View All Posts";
    return (<container_component_1.ContainerComponent id="blog-mini-container" padding="md" background="none">
      <card_component_1.CardComponent id="blog-mini-card" padding="lg" rounded="lg" shadow="md">
        <text_component_1.TextComponent id="blog-mini-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-4"/>
        <grid_component_1.GridComponent id="blog-mini-grid" columns={1} gap="sm">
          {posts.map((post, index) => (<div key={post.id || index} className="flex items-start py-2 border-b last:border-b-0">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3"></div>
              <div>
                <text_component_1.TextComponent id={`blog-mini-post-title-${index + 1}`} content={post.title} variant="body" className="font-medium mb-1"/>
                <text_component_1.TextComponent id={`blog-mini-post-date-${index + 1}`} content={post.date} variant="body" className="text-xs text-muted-foreground"/>
              </div>
            </div>))}
        </grid_component_1.GridComponent>
        <button_component_1.ButtonComponent id="blog-mini-btn" text={buttonText} variant="link" className="mt-4 p-0 h-auto"/>
      </card_component_1.CardComponent>
    </container_component_1.ContainerComponent>);
};
exports.BlogMiniHighlight = BlogMiniHighlight;
// Blog/RSS Block 5: Author Bio Variant 1 (Profile Left)
const BlogAuthorBioLeft = ({ props }) => {
    const authorName = props?.authorName || "Jane Doe";
    const authorNameVariant = props?.authorNameVariant || "heading2";
    const authorNameAlign = props?.authorNameAlign || "left";
    const authorNameColor = props?.authorNameColor || "primary";
    const authorNameWeight = props?.authorNameWeight || "bold";
    const authorTitle = props?.authorTitle || "Senior Content Writer";
    const authorTitleVariant = props?.authorTitleVariant || "body";
    const authorTitleAlign = props?.authorTitleAlign || "left";
    const authorTitleColor = props?.authorTitleColor || "primary";
    const authorTitleWeight = props?.authorTitleWeight || "medium";
    const authorBio = props?.authorBio || "Jane is a seasoned content creator with over 10 years of experience in digital marketing and brand storytelling. She specializes in creating engaging content that drives results.";
    const authorBioVariant = props?.authorBioVariant || "body";
    const authorBioAlign = props?.authorBioAlign || "left";
    const authorBioColor = props?.authorBioColor || "muted";
    const authorBioWeight = props?.authorBioWeight || "normal";
    const authorInitials = props?.authorInitials || "JD";
    const socialLinks = props?.socialLinks || [
        { id: '1', text: "Twitter", url: "#" },
        { id: '2', text: "LinkedIn", url: "#" },
        { id: '3', text: "Website", url: "#" }
    ];
    return (<container_component_1.ContainerComponent id="blog-author-left-container" padding="xl" background="muted" className="py-16">
      <card_component_1.CardComponent id="blog-author-left-card" padding="lg" rounded="lg" shadow="md">
        <grid_component_1.GridComponent id="blog-author-left-grid" columns={2} gap="xl" className="items-center">
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <text_component_1.TextComponent id="blog-author-left-initial" content={authorInitials} variant="heading1" className="text-white"/>
            </div>
          </div>
          <div>
            <text_component_1.TextComponent id="blog-author-left-name" content={authorName} variant={authorNameVariant} align={authorNameAlign} color={authorNameColor} weight={authorNameWeight} className="mb-2"/>
            <text_component_1.TextComponent id="blog-author-left-title" content={authorTitle} variant={authorTitleVariant} align={authorTitleAlign} color={authorTitleColor} weight={authorTitleWeight} className="text-primary font-medium mb-4"/>
            <text_component_1.TextComponent id="blog-author-left-bio" content={authorBio} variant={authorBioVariant} align={authorBioAlign} color={authorBioColor} weight={authorBioWeight} className="text-muted-foreground mb-6"/>
            <grid_component_1.GridComponent id="blog-author-left-social-grid" columns={socialLinks.length} gap="md" className="space-x-2">
              {socialLinks.map((link, index) => (<button_component_1.ButtonComponent id={`blog-author-left-social-${index}`} key={link.id || index} text={link.text} variant="outline" size="sm"/>))}
            </grid_component_1.GridComponent>
          </div>
        </grid_component_1.GridComponent>
      </card_component_1.CardComponent>
    </container_component_1.ContainerComponent>);
};
exports.BlogAuthorBioLeft = BlogAuthorBioLeft;
// Blog/RSS Block 6: Author Bio Variant 2 (Centered)
const BlogAuthorBioCentered = ({ props }) => {
    const authorName = props?.authorName || "Jane Doe";
    const authorNameVariant = props?.authorNameVariant || "heading2";
    const authorNameAlign = props?.authorNameAlign || "center";
    const authorNameColor = props?.authorNameColor || "primary";
    const authorNameWeight = props?.authorNameWeight || "bold";
    const authorTitle = props?.authorTitle || "Senior Content Writer";
    const authorTitleVariant = props?.authorTitleVariant || "body";
    const authorTitleAlign = props?.authorTitleAlign || "center";
    const authorTitleColor = props?.authorTitleColor || "primary";
    const authorTitleWeight = props?.authorTitleWeight || "medium";
    const authorBio = props?.authorBio || "Jane is a seasoned content creator with over 10 years of experience in digital marketing and brand storytelling. She specializes in creating engaging content that drives results.";
    const authorBioVariant = props?.authorBioVariant || "body";
    const authorBioAlign = props?.authorBioAlign || "center";
    const authorBioColor = props?.authorBioColor || "muted";
    const authorBioWeight = props?.authorBioWeight || "normal";
    const authorInitials = props?.authorInitials || "JD";
    const socialLinks = props?.socialLinks || [
        { id: '1', text: "Twitter", url: "#" },
        { id: '2', text: "LinkedIn", url: "#" },
        { id: '3', text: "Website", url: "#" }
    ];
    return (<container_component_1.ContainerComponent id="blog-author-centered-container" padding="xl" background="none" className="py-16">
      <card_component_1.CardComponent id="blog-author-centered-card" padding="lg" rounded="lg" shadow="md" className="text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto">
            <text_component_1.TextComponent id="blog-author-centered-initial" content={authorInitials} variant="heading2" className="text-white"/>
          </div>
        </div>
        <text_component_1.TextComponent id="blog-author-centered-name" content={authorName} variant={authorNameVariant} align={authorNameAlign} color={authorNameColor} weight={authorNameWeight} className="mb-2"/>
        <text_component_1.TextComponent id="blog-author-centered-title" content={authorTitle} variant={authorTitleVariant} align={authorTitleAlign} color={authorTitleColor} weight={authorTitleWeight} className="text-primary font-medium mb-4"/>
        <text_component_1.TextComponent id="blog-author-centered-bio" content={authorBio} variant={authorBioVariant} align={authorBioAlign} color={authorBioColor} weight={authorBioWeight} className="text-muted-foreground mb-6"/>
        <grid_component_1.GridComponent id="blog-author-centered-social-grid" columns={socialLinks.length} gap="md" className="justify-center space-x-2">
          {socialLinks.map((link, index) => (<button_component_1.ButtonComponent id={`blog-author-centered-social-${index}`} key={link.id || index} text={link.text} variant="outline" size="sm"/>))}
        </grid_component_1.GridComponent>
      </card_component_1.CardComponent>
    </container_component_1.ContainerComponent>);
};
exports.BlogAuthorBioCentered = BlogAuthorBioCentered;
// Blog/RSS Block 7: RSS Featured Article
const BlogRssFeaturedArticle = ({ props }) => {
    const source = props?.source || "RSS FEED";
    const sourceVariant = props?.sourceVariant || "body";
    const sourceAlign = props?.sourceAlign || "left";
    const sourceColor = props?.sourceColor || "primary";
    const sourceWeight = props?.sourceWeight || "medium";
    const date = props?.date || "October 5, 2023";
    const dateVariant = props?.dateVariant || "body";
    const dateAlign = props?.dateAlign || "left";
    const dateColor = props?.dateColor || "muted";
    const dateWeight = props?.dateWeight || "normal";
    const title = props?.title || "Industry Insights: The Rise of AI in Content Creation";
    const titleVariant = props?.titleVariant || "heading2";
    const titleAlign = props?.titleAlign || "left";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const excerpt = props?.excerpt || "Exploring how artificial intelligence is transforming the landscape of content creation and what it means for creators and businesses.";
    const excerptVariant = props?.excerptVariant || "body";
    const excerptAlign = props?.excerptAlign || "left";
    const excerptColor = props?.excerptColor || "muted";
    const excerptWeight = props?.excerptWeight || "normal";
    const author = props?.author || "By Industry Watch Team";
    const authorVariant = props?.authorVariant || "body";
    const authorAlign = props?.authorAlign || "left";
    const authorColor = props?.authorColor || "primary";
    const authorWeight = props?.authorWeight || "medium";
    const buttonText = props?.buttonText || "Read Full Article";
    return (<container_component_1.ContainerComponent id="blog-rss-featured-container" padding="xl" background="muted" className="py-16">
      <div className="flex items-center mb-4">
        <text_component_1.TextComponent id="blog-rss-featured-source" content={source} variant={sourceVariant} align={sourceAlign} color={sourceColor} weight={sourceWeight} className="text-primary font-medium mr-4"/>
        <text_component_1.TextComponent id="blog-rss-featured-date" content={date} variant={dateVariant} align={dateAlign} color={dateColor} weight={dateWeight} className="text-muted-foreground"/>
      </div>
      <card_component_1.CardComponent id="blog-rss-featured-card" padding="lg" rounded="lg" shadow="md">
        <text_component_1.TextComponent id="blog-rss-featured-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-4"/>
        <text_component_1.TextComponent id="blog-rss-featured-excerpt" content={excerpt} variant={excerptVariant} align={excerptAlign} color={excerptColor} weight={excerptWeight} className="mb-6 text-muted-foreground"/>
        <div className="flex items-center justify-between">
          <text_component_1.TextComponent id="blog-rss-featured-author" content={author} variant={authorVariant} align={authorAlign} color={authorColor} weight={authorWeight} className="font-medium"/>
          <button_component_1.ButtonComponent id="blog-rss-featured-btn" text={buttonText} variant="outline"/>
        </div>
      </card_component_1.CardComponent>
    </container_component_1.ContainerComponent>);
};
exports.BlogRssFeaturedArticle = BlogRssFeaturedArticle;
// Blog/RSS Block 8: RSS List
const BlogRssList = ({ props }) => {
    const source = props?.source || "RSS FEED";
    const sourceVariant = props?.sourceVariant || "body";
    const sourceAlign = props?.sourceAlign || "left";
    const sourceColor = props?.sourceColor || "primary";
    const sourceWeight = props?.sourceWeight || "medium";
    const title = props?.title || "Latest Industry News";
    const titleVariant = props?.titleVariant || "heading2";
    const titleAlign = props?.titleAlign || "left";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const buttonText = props?.buttonText || "Refresh";
    const items = props?.items || [
        {
            id: '1',
            headline: "Industry News Headline 1: Brief summary of the news item",
            source: "Industry Source",
            time: "2 hours ago"
        },
        {
            id: '2',
            headline: "Industry News Headline 2: Another important industry update",
            source: "Tech News",
            time: "4 hours ago"
        },
        {
            id: '3',
            headline: "Industry News Headline 3: Latest developments in the field",
            source: "Business Daily",
            time: "6 hours ago"
        },
        {
            id: '4',
            headline: "Industry News Headline 4: Breaking news in our sector",
            source: "Market Watch",
            time: "1 day ago"
        }
    ];
    return (<container_component_1.ContainerComponent id="blog-rss-list-container" padding="xl" background="none" className="py-16">
      <div className="flex items-center mb-6">
        <text_component_1.TextComponent id="blog-rss-list-source" content={source} variant={sourceVariant} align={sourceAlign} color={sourceColor} weight={sourceWeight} className="text-primary font-medium mr-4"/>
        <text_component_1.TextComponent id="blog-rss-list-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="flex-1"/>
        <button_component_1.ButtonComponent id="blog-rss-list-refresh" text={buttonText} variant="outline" size="sm"/>
      </div>
      <grid_component_1.GridComponent id="blog-rss-list-grid" columns={1} gap="md">
        {items.map((item, index) => (<card_component_1.CardComponent id={`blog-rss-list-card-${index + 1}`} key={item.id || index} padding="md" rounded="md" shadow="sm">
            <text_component_1.TextComponent id={`blog-rss-list-item-title-${index + 1}`} content={item.headline} variant="body" className="font-medium mb-2"/>
            <div className="flex items-center">
              <text_component_1.TextComponent id={`blog-rss-list-item-source-${index + 1}`} content={item.source} variant="body" className="text-sm text-muted-foreground mr-4"/>
              <text_component_1.TextComponent id={`blog-rss-list-item-date-${index + 1}`} content={item.time} variant="body" className="text-sm text-muted-foreground"/>
            </div>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.BlogRssList = BlogRssList;
// Export all blog/RSS blocks
exports.blogRssBlocks = [
    {
        id: 'blog-extended-feature',
        name: 'Extended Blog Feature',
        description: 'Large featured post with image and excerpt.',
        category: 'Blog/RSS',
        component: exports.BlogExtendedFeature,
    },
    {
        id: 'blog-basic-list',
        name: 'Basic Blog List',
        description: 'Standard blog index layout with small thumbnails.',
        category: 'Blog/RSS',
        component: exports.BlogBasicList,
    },
    {
        id: 'blog-double-post-highlight',
        name: 'Double Post Highlight',
        description: 'Two featured posts side-by-side; great for homepages.',
        category: 'Blog/RSS',
        component: exports.BlogDoublePostHighlight,
    },
    {
        id: 'blog-mini-highlight',
        name: 'Mini Blog Highlight',
        description: 'Compact post previews; ideal for sidebars.',
        category: 'Blog/RSS',
        component: exports.BlogMiniHighlight,
    },
    {
        id: 'blog-author-bio-left',
        name: 'Author Bio Variant 1 (Profile Left)',
        description: 'Avatar on left, text on right; personal tone.',
        category: 'Blog/RSS',
        component: exports.BlogAuthorBioLeft,
    },
    {
        id: 'blog-author-bio-centered',
        name: 'Author Bio Variant 2 (Centered)',
        description: 'Centered layout; minimalist and elegant.',
        category: 'Blog/RSS',
        component: exports.BlogAuthorBioCentered,
    },
    {
        id: 'blog-rss-featured-article',
        name: 'RSS Featured Article',
        description: 'Large highlight block pulling from RSS feed.',
        category: 'Blog/RSS',
        component: exports.BlogRssFeaturedArticle,
    },
    {
        id: 'blog-rss-list',
        name: 'RSS List',
        description: 'List view of latest RSS items.',
        category: 'Blog/RSS',
        component: exports.BlogRssList,
    },
];
//# sourceMappingURL=blog-rss-blocks.js.map