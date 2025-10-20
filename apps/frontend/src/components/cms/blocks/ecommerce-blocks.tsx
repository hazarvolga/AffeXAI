'use client';

import React from 'react';
import { ContainerComponent } from '@/components/cms/container-component';
import { TextComponent } from '@/components/cms/text-component';
import { ButtonComponent } from '@/components/cms/button-component';
import { GridComponent } from '@/components/cms/grid-component';
import { CardComponent } from '@/components/cms/card-component';
import { ImageComponent } from '@/components/cms/image-component';

// E-commerce Block 1: Single Product Layout
export const EcommerceSingleProduct: React.FC<{ props?: any }> = ({ props }) => {
  const category = props?.category || "Electronics";
  const categoryVariant = props?.categoryVariant || "body";
  const categoryAlign = props?.categoryAlign || "left";
  const categoryColor = props?.categoryColor || "primary";
  const categoryWeight = props?.categoryWeight || "medium";
  
  const title = props?.title || "Premium Wireless Headphones";
  const titleVariant = props?.titleVariant || "heading2";
  const titleAlign = props?.titleAlign || "left";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";
  
  const description = props?.description || "Experience crystal-clear sound with our premium wireless headphones. Featuring noise cancellation, 30-hour battery life, and comfortable over-ear design.";
  const descriptionVariant = props?.descriptionVariant || "body";
  const descriptionAlign = props?.descriptionAlign || "left";
  const descriptionColor = props?.descriptionColor || "muted";
  const descriptionWeight = props?.descriptionWeight || "normal";
  
  const price = props?.price || "$199.99";
  const priceVariant = props?.priceVariant || "heading3";
  const priceAlign = props?.priceAlign || "left";
  const priceColor = props?.priceColor || "primary";
  const priceWeight = props?.priceWeight || "bold";
  
  const imageUrl = props?.imageUrl || "/placeholder-image.jpg";
  const addToCartText = props?.addToCartText || "Add to Cart";
  const buyNowText = props?.buyNowText || "Buy Now";
  
  return (
    <ContainerComponent 
      id="ecommerce-single-container"
      padding="xl" 
      background="none"
      className="py-16"
    >
      <GridComponent 
        id="ecommerce-single-grid"
        columns={2} 
        gap="xl" 
        className="items-center"
      >
        <div className="flex justify-center">
          <CardComponent 
            id="ecommerce-single-card"
            padding="lg" 
            rounded="lg" 
            shadow="md"
          >
            <ImageComponent 
              id="ecommerce-single-image"
              src={imageUrl} 
              alt="Product" 
              className="rounded-md" 
            />
          </CardComponent>
        </div>
        <div>
          <TextComponent 
            id="ecommerce-single-category"
            content={category}
            variant={categoryVariant}
            align={categoryAlign}
            color={categoryColor}
            weight={categoryWeight}
            className="text-primary font-medium mb-2" 
          />
          <TextComponent 
            id="ecommerce-single-title"
            content={title}
            variant={titleVariant}
            align={titleAlign}
            color={titleColor}
            weight={titleWeight}
            className="mb-4" 
          />
          <TextComponent 
            id="ecommerce-single-desc"
            content={description}
            variant={descriptionVariant}
            align={descriptionAlign}
            color={descriptionColor}
            weight={descriptionWeight}
            className="mb-6 text-muted-foreground" 
          />
          <TextComponent 
            id="ecommerce-single-price"
            content={price}
            variant={priceVariant}
            align={priceAlign}
            color={priceColor}
            weight={priceWeight}
            className="mb-6" 
          />
          <GridComponent 
            id="ecommerce-single-btn-grid"
            columns={2} 
            gap="md" 
            className="mb-6"
          >
            <select className="border rounded-md px-3 py-2">
              <option>Quantity: 1</option>
              <option>Quantity: 2</option>
              <option>Quantity: 3</option>
            </select>
            <ButtonComponent 
              id="ecommerce-single-cart-btn"
              text={addToCartText} 
              variant="default" 
            />
          </GridComponent>
          <ButtonComponent 
            id="ecommerce-single-buy-btn"
            text={buyNowText} 
            variant="outline" 
            className="w-full" 
          />
        </div>
      </GridComponent>
    </ContainerComponent>
  );
};

// E-commerce Block 2: Aligned Product Layout
export const EcommerceAlignedProduct: React.FC<{ props?: any }> = ({ props }) => {
  const title = props?.title || "Smart Watch Series 5";
  const titleVariant = props?.titleVariant || "heading2";
  const titleAlign = props?.titleAlign || "left";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";
  
  const description = props?.description || "The latest in wearable technology with health monitoring, GPS tracking, and 7-day battery life.";
  const descriptionVariant = props?.descriptionVariant || "body";
  const descriptionAlign = props?.descriptionAlign || "left";
  const descriptionColor = props?.descriptionColor || "muted";
  const descriptionWeight = props?.descriptionWeight || "normal";
  
  const price = props?.price || "$299.99";
  const priceVariant = props?.priceVariant || "heading3";
  const priceAlign = props?.priceAlign || "left";
  const priceColor = props?.priceColor || "primary";
  const priceWeight = props?.priceWeight || "bold";
  
  const features = props?.features || [
    "✓ Heart rate monitoring",
    "✓ Water resistant up to 50m",
    "✓ 7-day battery life"
  ];
  
  const imageUrl = props?.imageUrl || "/placeholder-image.jpg";
  const addToCartText = props?.addToCartText || "Add to Cart";
  
  return (
    <ContainerComponent 
      id="ecommerce-aligned-container"
      padding="xl" 
      background="muted"
      className="py-16"
    >
      <GridComponent 
        id="ecommerce-aligned-grid"
        columns={2} 
        gap="xl" 
      >
        <div>
          <TextComponent 
            id="ecommerce-aligned-title"
            content={title}
            variant={titleVariant}
            align={titleAlign}
            color={titleColor}
            weight={titleWeight}
            className="mb-4" 
          />
          <TextComponent 
            id="ecommerce-aligned-desc"
            content={description}
            variant={descriptionVariant}
            align={descriptionAlign}
            color={descriptionColor}
            weight={descriptionWeight}
            className="mb-6 text-muted-foreground" 
          />
          <TextComponent 
            id="ecommerce-aligned-price"
            content={price}
            variant={priceVariant}
            align={priceAlign}
            color={priceColor}
            weight={priceWeight}
            className="mb-6" 
          />
          <GridComponent 
            id="ecommerce-aligned-features-grid"
            columns={1} 
            gap="sm" 
            className="mb-6"
          >
            {features.map((feature: string, index: number) => (
              <TextComponent 
                key={index}
                id={`ecommerce-aligned-feature-${index + 1}`}
                content={feature} 
                variant="body" 
              />
            ))}
          </GridComponent>
          <ButtonComponent 
            id="ecommerce-aligned-btn"
            text="Shop Now" 
            variant="default" 
          />
        </div>
        <div className="flex justify-center">
          <ImageComponent 
            id="ecommerce-aligned-image"
            src="/placeholder-image.jpg" 
            alt="Smart Watch" 
            className="rounded-lg shadow-lg" 
          />
        </div>
      </GridComponent>
    </ContainerComponent>
  );
};

// E-commerce Block 3: Two-Product Grid
export const EcommerceTwoProductGrid: React.FC<{ props?: any }> = ({ props }) => {
  // Use props or fallback to default values
  const title = props?.title || "Featured Products";
  const items = props?.items || [
    {
      image: "/placeholder-image.jpg",
      title: "Premium Headphones",
      description: "High-quality wireless headphones with noise cancellation.",
      price: "$199.99",
      ctaText: "Add to Cart",
    },
    {
      image: "/placeholder-image.jpg",
      title: "Smart Watch",
      description: "Feature-rich smartwatch with health monitoring.",
      price: "$299.99",
      ctaText: "Add to Cart",
    },
  ];

  return (
    <ContainerComponent 
      id="ecommerce-two-container"
      padding="xl" 
      background="none"
      className="py-16"
    >
      <TextComponent 
        id="ecommerce-two-title"
        content={title} 
        variant="heading2" 
        className="text-center mb-12" 
      />
      <GridComponent 
        id="ecommerce-two-grid"
        columns={2} 
        gap="xl" 
      >
        {items.map((item: any, index: number) => (
          <CardComponent 
            id={`ecommerce-two-card-${index + 1}`}
            key={index}
            padding="lg" 
            rounded="lg" 
            shadow="md"
          >
            <ImageComponent 
              id={`ecommerce-two-image-${index + 1}`}
              src={item.image} 
              alt={item.title} 
              className="rounded-md mb-4" 
            />
            <TextComponent 
              id={`ecommerce-two-card-${index + 1}-title`}
              content={item.title} 
              variant="heading3" 
              className="mb-2" 
            />
            <TextComponent 
              id={`ecommerce-two-card-${index + 1}-desc`}
              content={item.description} 
              variant="body" 
              className="mb-4 text-muted-foreground" 
            />
            <TextComponent 
              id={`ecommerce-two-card-${index + 1}-price`}
              content={item.price} 
              variant="heading3" 
              className="mb-4" 
            />
            <ButtonComponent 
              id={`ecommerce-two-card-${index + 1}-btn`}
              text={item.ctaText} 
              variant="default" 
              className="w-full" 
            />
          </CardComponent>
        ))}
      </GridComponent>
    </ContainerComponent>
  );
};

// E-commerce Block 4: Three-Product Grid
export const EcommerceThreeProductGrid: React.FC<{ props?: any }> = ({ props }) => {
  // Use props or fallback to default values
  const title = props?.title || "Featured Products";
  const items = props?.items || [
    {
      image: "/placeholder-image.jpg",
      title: "Premium Headphones",
      description: "High-quality wireless headphones with noise cancellation.",
      price: "$199.99",
      ctaText: "Add to Cart",
    },
    {
      image: "/placeholder-image.jpg",
      title: "Smart Watch",
      description: "Feature-rich smartwatch with health monitoring.",
      price: "$299.99",
      ctaText: "Add to Cart",
    },
    {
      image: "/placeholder-image.jpg",
      title: "Wireless Speaker",
      description: "Portable speaker with 360-degree sound.",
      price: "$149.99",
      ctaText: "Add to Cart",
    },
  ];

  return (
    <ContainerComponent 
      id="ecommerce-three-container"
      padding="xl" 
      background="none"
      className="py-16"
    >
      <TextComponent 
        id="ecommerce-three-title"
        content={title} 
        variant="heading2" 
        className="text-center mb-12" 
      />
      <GridComponent 
        id="ecommerce-three-grid"
        columns={3} 
        gap="xl" 
      >
        {items.map((item: any, index: number) => (
          <CardComponent 
            id={`ecommerce-three-card-${index + 1}`}
            key={index}
            padding="lg" 
            rounded="lg" 
            shadow="md"
          >
            <ImageComponent 
              id={`ecommerce-three-image-${index + 1}`}
              src={item.image} 
              alt={item.title} 
              className="rounded-md mb-4" 
            />
            <TextComponent 
              id={`ecommerce-three-card-${index + 1}-title`}
              content={item.title} 
              variant="heading3" 
              className="mb-2" 
            />
            <TextComponent 
              id={`ecommerce-three-card-${index + 1}-desc`}
              content={item.description} 
              variant="body" 
              className="mb-4 text-muted-foreground" 
            />
            <TextComponent 
              id={`ecommerce-three-card-${index + 1}-price`}
              content={item.price} 
              variant="heading3" 
              className="mb-4" 
            />
            <ButtonComponent 
              id={`ecommerce-three-card-${index + 1}-btn`}
              text={item.ctaText} 
              variant="default" 
              className="w-full" 
            />
          </CardComponent>
        ))}
      </GridComponent>
    </ContainerComponent>
  );
};

// E-commerce Block 5: Three-Product Showcase
export const EcommerceThreeProductShowcase: React.FC = () => {
  return (
    <ContainerComponent 
      id="ecommerce-three-container"
      padding="xl" 
      background="muted"
      className="py-16"
    >
      <TextComponent 
        id="ecommerce-three-title"
        content="Popular Items" 
        variant="heading2" 
        className="text-center mb-12" 
      />
      <GridComponent 
        id="ecommerce-three-grid"
        columns={3} 
        gap="xl" 
      >
        <CardComponent 
          id="ecommerce-three-card-1"
          padding="lg" 
          rounded="lg" 
          shadow="md"
          className="text-center"
        >
          <ImageComponent 
            id="ecommerce-three-image-1"
            src="/placeholder-image.jpg" 
            alt="Product 1" 
            className="rounded-md mx-auto mb-4" 
          />
          <TextComponent 
            id="ecommerce-three-card-1-title"
            content="Smartphone X" 
            variant="heading3" 
            className="mb-2" 
          />
          <TextComponent 
            id="ecommerce-three-card-1-desc"
            content="Latest model with advanced features" 
            variant="body" 
            className="mb-4 text-muted-foreground" 
          />
          <TextComponent 
            id="ecommerce-three-card-1-price"
            content="$699.99" 
            variant="body" 
            className="font-medium mb-4" 
          />
          <ButtonComponent 
            id="ecommerce-three-card-1-btn"
            text="View Details" 
            variant="outline" 
            size="sm" 
          />
        </CardComponent>
        
        <CardComponent 
          id="ecommerce-three-card-2"
          padding="lg" 
          rounded="lg" 
          shadow="md"
          className="text-center"
        >
          <ImageComponent 
            id="ecommerce-three-image-2"
            src="/placeholder-image.jpg" 
            alt="Product 2" 
            className="rounded-md mx-auto mb-4" 
          />
          <TextComponent 
            id="ecommerce-three-card-2-title"
            content="Tablet Pro" 
            variant="heading3" 
            className="mb-2" 
          />
          <TextComponent 
            id="ecommerce-three-card-2-desc"
            content="Powerful tablet for work and play" 
            variant="body" 
            className="mb-4 text-muted-foreground" 
          />
          <TextComponent 
            id="ecommerce-three-card-2-price"
            content="$499.99" 
            variant="body" 
            className="font-medium mb-4" 
          />
          <ButtonComponent 
            id="ecommerce-three-card-2-btn"
            text="View Details" 
            variant="outline" 
            size="sm" 
          />
        </CardComponent>
        
        <CardComponent 
          id="ecommerce-three-card-3"
          padding="lg" 
          rounded="lg" 
          shadow="md"
          className="text-center"
        >
          <ImageComponent 
            id="ecommerce-three-image-3"
            src="/placeholder-image.jpg" 
            alt="Product 3" 
            className="rounded-md mx-auto mb-4" 
          />
          <TextComponent 
            id="ecommerce-three-card-3-title"
            content="Laptop Ultra" 
            variant="heading3" 
            className="mb-2" 
          />
          <TextComponent 
            id="ecommerce-three-card-3-desc"
            content="Lightweight laptop with long battery" 
            variant="body" 
            className="mb-4 text-muted-foreground" 
          />
          <TextComponent 
            id="ecommerce-three-card-3-price"
            content="$1,199.99" 
            variant="body" 
            className="font-medium mb-4" 
          />
          <ButtonComponent 
            id="ecommerce-three-card-3-btn"
            text="View Details" 
            variant="outline" 
            size="sm" 
          />
        </CardComponent>
      </GridComponent>
    </ContainerComponent>
  );
};

// E-commerce Block 6: Discount Banner Block
export const EcommerceDiscountBanner: React.FC = () => {
  return (
    <ContainerComponent 
      id="ecommerce-discount-container"
      padding="xl" 
      background="none"
      className="py-16 relative overflow-hidden rounded-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
      <div className="relative z-10 text-center text-white">
        <TextComponent 
          id="ecommerce-discount-badge"
          content="SALE" 
          variant="body" 
          className="inline-block bg-destructive text-white px-4 py-1 rounded-full mb-4" 
        />
        <TextComponent 
          id="ecommerce-discount-title"
          content="Summer Sale - Up to 50% Off" 
          variant="heading1" 
          className="mb-4" 
        />
        <TextComponent 
          id="ecommerce-discount-desc"
          content="Limited time offer on selected items. Don't miss out!" 
          variant="body" 
          className="mb-8 max-w-2xl mx-auto text-white/80" 
        />
        <ButtonComponent 
          id="ecommerce-discount-btn"
          text="Shop Now" 
          variant="default" 
          size="lg" 
          className="bg-white text-primary hover:bg-white/90" 
        />
      </div>
    </ContainerComponent>
  );
};

// E-commerce Block 7: Horizontal Discount Block
export const EcommerceHorizontalDiscount: React.FC = () => {
  return (
    <ContainerComponent 
      id="ecommerce-horizontal-container"
      padding="none" 
      background="none"
      className="relative rounded-lg overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent"></div>
      <GridComponent 
        id="ecommerce-horizontal-grid"
        columns={2} 
        gap="none" 
      >
        <div className="relative z-10 p-12 text-primary-foreground">
          <TextComponent 
            id="ecommerce-horizontal-badge"
            content="EXCLUSIVE DEAL" 
            variant="body" 
            className="inline-block bg-background text-foreground px-4 py-1 rounded-full mb-4" 
          />
          <TextComponent 
            id="ecommerce-horizontal-title"
            content="Flash Sale" 
            variant="heading2" 
            className="mb-4" 
          />
          <TextComponent 
            id="ecommerce-horizontal-desc"
            content="24 hours only - Save big on our bestsellers" 
            variant="body" 
            className="mb-6 text-primary-foreground/80" 
          />
          <ButtonComponent 
            id="ecommerce-horizontal-btn"
            text="Shop the Sale" 
            variant="default" 
            className="bg-background text-foreground hover:bg-background/90" 
          />
        </div>
        <div className="relative z-10 flex items-center justify-center p-12">
          <TextComponent 
            id="ecommerce-horizontal-discount"
            content="50% OFF" 
            variant="heading1" 
            className="text-primary-foreground font-bold text-6xl" 
          />
        </div>
      </GridComponent>
    </ContainerComponent>
  );
};

// Export all e-commerce blocks
export const ecommerceBlocks = [
  {
    id: 'ecommerce-single-product',
    name: 'Single Product Layout',
    description: 'Showcases one product with image, price, and CTA.',
    category: 'E-commerce',
    component: EcommerceSingleProduct,
  },
  {
    id: 'ecommerce-aligned-product',
    name: 'Aligned Product Layout',
    description: 'Single product aligned to one side with descriptive text.',
    category: 'E-commerce',
    component: EcommerceAlignedProduct,
  },
  {
    id: 'ecommerce-two-product-grid',
    name: 'Two-Product Grid',
    description: 'Balanced grid for comparing or cross-promoting products.',
    category: 'E-commerce',
    component: EcommerceTwoProductGrid,
  },
  {
    id: 'ecommerce-three-product-grid',
    name: 'Three-Product Grid',
    description: 'Displays three related products; ideal for small catalogs.',
    category: 'E-commerce',
    component: EcommerceThreeProductGrid,
  },
  {
    id: 'ecommerce-discount-banner',
    name: 'Discount Banner Block',
    description: 'Promotional area with percentage badge and CTA.',
    category: 'E-commerce',
    component: EcommerceDiscountBanner,
  },
  {
    id: 'ecommerce-horizontal-discount',
    name: 'Horizontal Discount Block',
    description: 'Wide layout with background image; good for homepage sales banners.',
    category: 'E-commerce',
    component: EcommerceHorizontalDiscount,
  },
];