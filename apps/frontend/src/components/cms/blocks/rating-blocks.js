"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingBlocks = exports.ReviewGridThree = exports.ReviewCardSingle = exports.RatingStarsInline = void 0;
const react_1 = __importDefault(require("react"));
const container_component_1 = require("@/components/cms/container-component");
const text_component_1 = require("@/components/cms/text-component");
const grid_component_1 = require("@/components/cms/grid-component");
const card_component_1 = require("@/components/cms/card-component");
const image_component_1 = require("@/components/cms/image-component");
const lucide_react_1 = require("lucide-react");
// Rating Stars Component (Reusable)
const RatingStars = ({ rating, size = 'md' }) => {
    const sizeClasses = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5'
    };
    return (<div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (<lucide_react_1.Star key={star} className={`${sizeClasses[size]} ${star <= rating ? 'fill-warning text-warning' : 'text-muted-foreground/30'}`}/>))}
    </div>);
};
// Rating Block 1: Inline Stars with Count
const RatingStarsInline = ({ props }) => {
    const rating = props?.rating || 4.5;
    const totalReviews = props?.totalReviews || 1234;
    const showReviewCount = props?.showReviewCount !== false;
    const size = props?.size || 'md';
    return (<div className="flex items-center gap-2">
      {/* Stars */}
      <RatingStars rating={Math.round(rating)} size={size}/>
      
      {/* Rating Number */}
      <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
      
      {/* Review Count */}
      {showReviewCount && (<span className="text-sm text-muted-foreground">
          ({totalReviews.toLocaleString()} reviews)
        </span>)}
    </div>);
};
exports.RatingStarsInline = RatingStarsInline;
// Rating Block 2: Single Review Card
const ReviewCardSingle = ({ props }) => {
    const review = props?.review || {
        author: "Sarah Johnson",
        avatar: "/api/placeholder/64/64",
        role: "Marketing Manager",
        rating: 5,
        date: "2 weeks ago",
        title: "Excellent product, highly recommended!",
        content: "This product has completely transformed how we work. The interface is intuitive, customer support is fantastic, and the results speak for themselves. We've seen a 40% increase in productivity since implementing it.",
        helpful: 24,
        verified: true
    };
    return (<card_component_1.CardComponent id="review-card-single" padding="lg" className="max-w-2xl">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <image_component_1.ImageComponent id="review-avatar" src={review.avatar} alt={review.author} className="rounded-full w-12 h-12 object-cover flex-shrink-0"/>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <text_component_1.TextComponent id="review-author" content={review.author} variant="body" className="font-semibold"/>
              {review.verified && (<span className="inline-flex items-center gap-1 text-xs text-primary ml-2">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Verified Purchase
                </span>)}
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap">{review.date}</span>
          </div>
          <text_component_1.TextComponent id="review-role" content={review.role} variant="body" className="text-sm text-muted-foreground"/>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-3">
        <RatingStars rating={review.rating} size="md"/>
      </div>

      {/* Review Title */}
      <text_component_1.TextComponent id="review-title" content={review.title} variant="heading3" className="mb-2"/>

      {/* Review Content */}
      <text_component_1.TextComponent id="review-content" content={review.content} variant="body" className="text-muted-foreground mb-4"/>

      {/* Footer */}
      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
          </svg>
          Helpful ({review.helpful})
        </button>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Report
        </button>
      </div>
    </card_component_1.CardComponent>);
};
exports.ReviewCardSingle = ReviewCardSingle;
// Rating Block 3: Review Grid (3 Cards)
const ReviewGridThree = ({ props }) => {
    const title = props?.title || "What Our Customers Say";
    const subtitle = props?.subtitle || "Join thousands of satisfied customers";
    const reviews = props?.reviews || [
        {
            author: "Alex Martinez",
            avatar: "/api/placeholder/64/64",
            role: "CEO, TechStart",
            rating: 5,
            date: "1 week ago",
            content: "Outstanding service! The team went above and beyond to ensure our success. Highly recommended for anyone looking to scale their business.",
            verified: true
        },
        {
            author: "Emily Chen",
            avatar: "/api/placeholder/64/64",
            role: "Product Designer",
            rating: 5,
            date: "2 weeks ago",
            content: "The best investment we've made this year. Clean interface, powerful features, and excellent support. It's everything we needed and more.",
            verified: true
        },
        {
            author: "Michael Brown",
            avatar: "/api/placeholder/64/64",
            role: "Marketing Director",
            rating: 4,
            date: "3 weeks ago",
            content: "Great product with room for improvement. The core functionality is solid, but some advanced features could be more intuitive. Still, highly satisfied overall.",
            verified: false
        }
    ];
    const averageRating = props?.averageRating || 4.8;
    const totalReviews = props?.totalReviews || 2847;
    return (<container_component_1.ContainerComponent id="review-grid-container" padding="xl" background="muted" className="py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <text_component_1.TextComponent id="review-grid-title" content={title} variant="heading2" className="mb-3"/>
        <text_component_1.TextComponent id="review-grid-subtitle" content={subtitle} variant="body" className="text-muted-foreground mb-6"/>

        {/* Overall Rating */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="flex items-center gap-3">
            <span className="text-5xl font-bold text-primary">{averageRating}</span>
            <div className="text-left">
              <RatingStars rating={Math.round(averageRating)} size="lg"/>
              <p className="text-sm text-muted-foreground mt-1">
                Based on {totalReviews.toLocaleString()} reviews
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Cards Grid */}
      <grid_component_1.GridComponent id="review-grid" columns={3} gap="lg">
        {reviews.map((review, index) => (<card_component_1.CardComponent key={index} id={`review-card-${index}`} padding="lg" className="h-full flex flex-col">
            {/* Rating Stars */}
            <div className="mb-4">
              <RatingStars rating={review.rating} size="md"/>
            </div>

            {/* Review Content */}
            <text_component_1.TextComponent id={`review-content-${index}`} content={review.content} variant="body" className="text-muted-foreground mb-6 flex-1"/>

            {/* Author Info */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <image_component_1.ImageComponent id={`review-avatar-${index}`} src={review.avatar} alt={review.author} className="rounded-full w-10 h-10 object-cover flex-shrink-0"/>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <text_component_1.TextComponent id={`review-author-${index}`} content={review.author} variant="body" className="font-semibold text-sm"/>
                  {review.verified && (<svg className="h-3 w-3 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>)}
                </div>
                <text_component_1.TextComponent id={`review-role-${index}`} content={review.role} variant="body" className="text-xs text-muted-foreground"/>
              </div>
            </div>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.ReviewGridThree = ReviewGridThree;
// Export array for registry
exports.ratingBlocks = [
    {
        id: 'rating-stars-inline',
        component: exports.RatingStarsInline,
        name: 'Rating Stars (Inline)',
        category: 'Rating',
        defaultProps: {
            rating: 4.5,
            totalReviews: 1234,
            showReviewCount: true,
            size: 'md'
        }
    },
    {
        id: 'review-card-single',
        component: exports.ReviewCardSingle,
        name: 'Review Card (Single)',
        category: 'Rating',
        defaultProps: {
            review: {
                author: "Sarah Johnson",
                avatar: "/api/placeholder/64/64",
                role: "Marketing Manager",
                rating: 5,
                date: "2 weeks ago",
                title: "Excellent product, highly recommended!",
                content: "This product has completely transformed how we work. The interface is intuitive, customer support is fantastic, and the results speak for themselves. We've seen a 40% increase in productivity since implementing it.",
                helpful: 24,
                verified: true
            }
        }
    },
    {
        id: 'review-grid-three',
        component: exports.ReviewGridThree,
        name: 'Review Grid (3 Cards)',
        category: 'Rating',
        defaultProps: {
            title: "What Our Customers Say",
            subtitle: "Join thousands of satisfied customers",
            averageRating: 4.8,
            totalReviews: 2847,
            reviews: [
                {
                    author: "Alex Martinez",
                    avatar: "/api/placeholder/64/64",
                    role: "CEO, TechStart",
                    rating: 5,
                    date: "1 week ago",
                    content: "Outstanding service! The team went above and beyond to ensure our success. Highly recommended for anyone looking to scale their business.",
                    verified: true
                },
                {
                    author: "Emily Chen",
                    avatar: "/api/placeholder/64/64",
                    role: "Product Designer",
                    rating: 5,
                    date: "2 weeks ago",
                    content: "The best investment we've made this year. Clean interface, powerful features, and excellent support. It's everything we needed and more.",
                    verified: true
                },
                {
                    author: "Michael Brown",
                    avatar: "/api/placeholder/64/64",
                    role: "Marketing Director",
                    rating: 4,
                    date: "3 weeks ago",
                    content: "Great product with room for improvement. The core functionality is solid, but some advanced features could be more intuitive. Still, highly satisfied overall.",
                    verified: false
                }
            ]
        }
    }
];
//# sourceMappingURL=rating-blocks.js.map