"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.footerBlocks = exports.FooterExtendedCta = exports.FooterCompactCentered = exports.FooterSocialHeavy = exports.FooterNewsletterSignup = exports.FooterMultiColumn = exports.FooterBasic = void 0;
const react_1 = __importDefault(require("react"));
const container_component_1 = require("@/components/cms/container-component");
const text_component_1 = require("@/components/cms/text-component");
const button_component_1 = require("@/components/cms/button-component");
const grid_component_1 = require("@/components/cms/grid-component");
// Footer Block 1: Basic Footer
const FooterBasic = ({ props }) => {
    const companyName = props?.companyName || "Company Name";
    const companyDescription = props?.companyDescription || "Building amazing products for amazing people.";
    const links = Array.isArray(props?.links) ? props.links : [
        {
            id: '1',
            title: "Links",
            items: [
                { id: '1-1', text: "Home", url: "#" },
                { id: '1-2', text: "About", url: "#" },
                { id: '1-3', text: "Services", url: "#" },
                { id: '1-4', text: "Contact", url: "#" }
            ]
        }
    ];
    // Ensure each link section has a valid items array
    const validatedLinks = links.map((linkSection) => ({
        ...linkSection,
        items: Array.isArray(linkSection?.items) ? linkSection.items : []
    }));
    const contactInfo = props?.contactInfo && Array.isArray(props.contactInfo) && props.contactInfo.length > 0
        ? props.contactInfo[0]
        : {
            title: "Contact",
            email: "info@company.com",
            phone: "+1 (555) 123-4567"
        };
    const copyrightText = props?.copyrightText || "© 2023 Company Name. All rights reserved.";
    return (<container_component_1.ContainerComponent id="footer-basic-container" padding="lg" background="none" className="border-t py-8">
      <grid_component_1.GridComponent id="footer-basic-grid" columns={3} gap="xl">
        <div>
          <text_component_1.TextComponent id="footer-basic-company" content={companyName} variant="heading3" align="left" color="primary" weight="bold" className="mb-4"/>
          <text_component_1.TextComponent id="footer-basic-desc" content={companyDescription} variant="body" align="left" color="muted" className="text-muted-foreground"/>
        </div>
        
        {validatedLinks.map((linkSection, sectionIndex) => (<div key={linkSection.id || sectionIndex}>
            <text_component_1.TextComponent id={`footer-basic-links-${sectionIndex}`} content={linkSection.title} variant="heading3" align="left" color="primary" weight="bold" className="mb-4"/>
            <grid_component_1.GridComponent id={`footer-basic-links-grid-${sectionIndex}`} columns={1} gap="sm">
              {linkSection.items.map((item, itemIndex) => (<button_component_1.ButtonComponent id={`footer-basic-link-${sectionIndex}-${itemIndex}`} key={item.id || itemIndex} text={item.text} variant="link" className="block text-left p-0 h-auto"/>))}
            </grid_component_1.GridComponent>
          </div>))}
        
        <div>
          <text_component_1.TextComponent id="footer-basic-contact" content={contactInfo.title} variant="heading3" align="left" color="primary" weight="bold" className="mb-4"/>
          <text_component_1.TextComponent id="footer-basic-email" content={contactInfo.email} variant="body" align="left" color="primary" className="block mb-2"/>
          <text_component_1.TextComponent id="footer-basic-phone" content={contactInfo.phone} variant="body" align="left" color="primary" className="block"/>
        </div>
      </grid_component_1.GridComponent>
      
      <div className="border-t mt-8 pt-8 text-center">
        <text_component_1.TextComponent id="footer-basic-copyright" content={copyrightText} variant="body" align="center" color="muted" className="text-muted-foreground"/>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.FooterBasic = FooterBasic;
// Footer Block 2: Multi-Column Footer
const FooterMultiColumn = ({ props }) => {
    const companyName = props?.companyName || "Company Name";
    const companyNameVariant = props?.companyNameVariant || "heading3";
    const companyNameAlign = props?.companyNameAlign || "left";
    const companyNameColor = props?.companyNameColor || "primary";
    const companyNameWeight = props?.companyNameWeight || "bold";
    const companyDescription = props?.companyDescription || "Creating innovative solutions for modern businesses.";
    const companyDescriptionVariant = props?.companyDescriptionVariant || "body";
    const companyDescriptionAlign = props?.companyDescriptionAlign || "left";
    const companyDescriptionColor = props?.companyDescriptionColor || "muted";
    const companyDescriptionWeight = props?.companyDescriptionWeight || "normal";
    const copyrightText = props?.copyrightText || "© 2023 Company Name. All rights reserved.";
    const copyrightVariant = props?.copyrightVariant || "body";
    const copyrightAlign = props?.copyrightAlign || "left";
    const copyrightColor = props?.copyrightColor || "muted";
    const copyrightWeight = props?.copyrightWeight || "normal";
    const socialLinks = Array.isArray(props?.socialLinks) ? props.socialLinks : [
        { id: '1', text: "FB", url: "#" },
        { id: '2', text: "TW", url: "#" },
        { id: '3', text: "IG", url: "#" },
        { id: '4', text: "LI", url: "#" }
    ];
    const columns = Array.isArray(props?.columns) ? props.columns : [
        {
            id: '1',
            title: "Products",
            items: [
                { id: '1-1', text: "Features", url: "#" },
                { id: '1-2', text: "Solutions", url: "#" },
                { id: '1-3', text: "Pricing", url: "#" }
            ]
        },
        {
            id: '2',
            title: "Resources",
            items: [
                { id: '2-1', text: "Blog", url: "#" },
                { id: '2-2', text: "Documentation", url: "#" },
                { id: '2-3', text: "Support", url: "#" }
            ]
        },
        {
            id: '3',
            title: "Contact",
            items: [
                { id: '3-1', text: "info@company.com", url: "mailto:info@company.com" },
                { id: '3-2', text: "+1 (555) 123-4567", url: "tel:+15551234567" }
            ]
        }
    ];
    // Ensure each column has a valid items array
    const validatedColumns = columns.map((column) => ({
        ...column,
        items: Array.isArray(column?.items) ? column.items : []
    }));
    const legalLinks = Array.isArray(props?.legalLinks) ? props.legalLinks : [
        { id: '1', text: "Privacy Policy", url: "#" },
        { id: '2', text: "Terms of Service", url: "#" },
        { id: '3', text: "Cookie Policy", url: "#" }
    ];
    return (<container_component_1.ContainerComponent id="footer-multicol-container" padding="lg" background="muted" className="py-12">
      <grid_component_1.GridComponent id="footer-multicol-grid" columns={5} gap="xl">
        <div className="col-span-2">
          <text_component_1.TextComponent id="footer-multicol-company" content={companyName} variant={companyNameVariant} align={companyNameAlign} color={companyNameColor} weight={companyNameWeight} className="mb-4"/>
          <text_component_1.TextComponent id="footer-multicol-desc" content={companyDescription} variant={companyDescriptionVariant} align={companyDescriptionAlign} color={companyDescriptionColor} weight={companyDescriptionWeight} className="text-muted-foreground mb-4"/>
          <grid_component_1.GridComponent id="footer-multicol-social-grid" columns={socialLinks.length} gap="md" className="space-x-2">
            {socialLinks.map((link, index) => (<button_component_1.ButtonComponent id={`footer-multicol-social-${index}`} key={link.id || index} text={link.text} variant="outline" size="sm"/>))}
          </grid_component_1.GridComponent>
        </div>
        
        {validatedColumns.map((column, columnIndex) => (<div key={column.id || columnIndex}>
            <text_component_1.TextComponent id={`footer-multicol-column-${columnIndex}`} content={column.title} variant="heading3" className="mb-4"/>
            <grid_component_1.GridComponent id={`footer-multicol-column-grid-${columnIndex}`} columns={1} gap="sm">
              {column.items.map((item, itemIndex) => (<button_component_1.ButtonComponent id={`footer-multicol-column-item-${columnIndex}-${itemIndex}`} key={item.id || itemIndex} text={item.text} variant="link" className="block text-left p-0 h-auto"/>))}
            </grid_component_1.GridComponent>
          </div>))}
      </grid_component_1.GridComponent>
      
      <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <text_component_1.TextComponent id="footer-multicol-copyright" content={copyrightText} variant={copyrightVariant} align={copyrightAlign} color={copyrightColor} weight={copyrightWeight} className="text-muted-foreground mb-4 md:mb-0"/>
        <grid_component_1.GridComponent id="footer-multicol-legal-grid" columns={legalLinks.length} gap="md" className="space-x-4">
          {legalLinks.map((link, index) => (<button_component_1.ButtonComponent id={`footer-multicol-legal-${index}`} key={link.id || index} text={link.text} variant="link" className="p-0 h-auto"/>))}
        </grid_component_1.GridComponent>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.FooterMultiColumn = FooterMultiColumn;
// Footer Block 3: Newsletter Signup Footer
const FooterNewsletterSignup = ({ props }) => {
    const newsletterTitle = props?.newsletterTitle || "Subscribe to our newsletter";
    const newsletterTitleVariant = props?.newsletterTitleVariant || "heading3";
    const newsletterTitleAlign = props?.newsletterTitleAlign || "left";
    const newsletterTitleColor = props?.newsletterTitleColor || "primary";
    const newsletterTitleWeight = props?.newsletterTitleWeight || "bold";
    const newsletterDescription = props?.newsletterDescription || "Stay updated with our latest news and offers.";
    const newsletterDescriptionVariant = props?.newsletterDescriptionVariant || "body";
    const newsletterDescriptionAlign = props?.newsletterDescriptionAlign || "left";
    const newsletterDescriptionColor = props?.newsletterDescriptionColor || "muted";
    const newsletterDescriptionWeight = props?.newsletterDescriptionWeight || "normal";
    const copyrightText = props?.copyrightText || "© 2023 Company Name. All rights reserved.";
    const copyrightVariant = props?.copyrightVariant || "body";
    const copyrightAlign = props?.copyrightAlign || "left";
    const copyrightColor = props?.copyrightColor || "muted";
    const copyrightWeight = props?.copyrightWeight || "normal";
    const legalLinks = Array.isArray(props?.legalLinks) ? props.legalLinks : [
        { id: '1', text: "Privacy", url: "#" },
        { id: '2', text: "Terms", url: "#" },
        { id: '3', text: "Contact", url: "#" }
    ];
    const socialLinks = Array.isArray(props?.socialLinks) ? props.socialLinks : [
        { id: '1', text: "f", url: "#" },
        { id: '2', text: "t", url: "#" },
        { id: '3', text: "ig", url: "#" },
        { id: '4', text: "in", url: "#" }
    ];
    return (<container_component_1.ContainerComponent id="footer-newsletter-container" padding="lg" background="none" className="border-t py-12">
      <grid_component_1.GridComponent id="footer-newsletter-grid" columns={2} gap="xl" className="items-center">
        <div>
          <text_component_1.TextComponent id="footer-newsletter-title" content={newsletterTitle} variant={newsletterTitleVariant} align={newsletterTitleAlign} color={newsletterTitleColor} weight={newsletterTitleWeight} className="mb-2"/>
          <text_component_1.TextComponent id="footer-newsletter-desc" content={newsletterDescription} variant={newsletterDescriptionVariant} align={newsletterDescriptionAlign} color={newsletterDescriptionColor} weight={newsletterDescriptionWeight} className="text-muted-foreground"/>
        </div>
        <div className="flex">
          <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 border border-r-0 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"/>
          <button_component_1.ButtonComponent id="footer-newsletter-btn" text="Subscribe" variant="default" className="rounded-l-none"/>
        </div>
      </grid_component_1.GridComponent>
      
      <div className="border-t mt-12 pt-8">
        <grid_component_1.GridComponent id="footer-newsletter-bottom-grid" columns={3} gap="xl">
          <text_component_1.TextComponent id="footer-newsletter-copyright" content={copyrightText} variant={copyrightVariant} align={copyrightAlign} color={copyrightColor} weight={copyrightWeight} className="text-muted-foreground"/>
          <grid_component_1.GridComponent id="footer-newsletter-links-grid" columns={legalLinks.length} gap="md" className="justify-center space-x-6">
            {legalLinks.map((link, index) => (<button_component_1.ButtonComponent id={`footer-newsletter-link-${index}`} key={link.id || index} text={link.text} variant="link" className="p-0 h-auto"/>))}
          </grid_component_1.GridComponent>
          <grid_component_1.GridComponent id="footer-newsletter-social-grid" columns={socialLinks.length} gap="md" className="justify-end space-x-2">
            {socialLinks.map((link, index) => (<button_component_1.ButtonComponent id={`footer-newsletter-social-${index}`} key={link.id || index} text={link.text} variant="outline" size="sm" className="w-8 h-8 p-0"/>))}
          </grid_component_1.GridComponent>
        </grid_component_1.GridComponent>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.FooterNewsletterSignup = FooterNewsletterSignup;
// Footer Block 4: Social-Heavy Footer
const FooterSocialHeavy = ({ props }) => {
    const companyName = props?.companyName || "Company Name";
    const companyNameVariant = props?.companyNameVariant || "heading3";
    const companyNameAlign = props?.companyNameAlign || "left";
    const companyNameColor = props?.companyNameColor || "primary";
    const companyNameWeight = props?.companyNameWeight || "bold";
    const companyDescription = props?.companyDescription || "Connect with us on social media for updates and community.";
    const companyDescriptionVariant = props?.companyDescriptionVariant || "body";
    const companyDescriptionAlign = props?.companyDescriptionAlign || "left";
    const companyDescriptionColor = props?.companyDescriptionColor || "muted";
    const companyDescriptionWeight = props?.companyDescriptionWeight || "normal";
    const socialTitle = props?.socialTitle || "Follow Us";
    const socialTitleVariant = props?.socialTitleVariant || "heading3";
    const socialTitleAlign = props?.socialTitleAlign || "left";
    const socialTitleColor = props?.socialTitleColor || "primary";
    const socialTitleWeight = props?.socialTitleWeight || "bold";
    const copyrightText = props?.copyrightText || "© 2023 Company Name. All rights reserved.";
    const copyrightVariant = props?.copyrightVariant || "body";
    const copyrightAlign = props?.copyrightAlign || "left";
    const copyrightColor = props?.copyrightColor || "muted";
    const copyrightWeight = props?.copyrightWeight || "normal";
    const socialPlatforms = Array.isArray(props?.socialPlatforms) ? props.socialPlatforms : [
        { id: '1', text: "Facebook", url: "#" },
        { id: '2', text: "Twitter", url: "#" },
        { id: '3', text: "Instagram", url: "#" },
        { id: '4', text: "LinkedIn", url: "#" },
        { id: '5', text: "YouTube", url: "#" },
        { id: '6', text: "Pinterest", url: "#" },
        { id: '7', text: "TikTok", url: "#" },
        { id: '8', text: "Discord", url: "#" }
    ];
    const legalLinks = Array.isArray(props?.legalLinks) ? props.legalLinks : [
        { id: '1', text: "Privacy", url: "#" },
        { id: '2', text: "Terms", url: "#" },
        { id: '3', text: "Contact", url: "#" }
    ];
    return (<container_component_1.ContainerComponent id="footer-social-container" padding="lg" background="muted" className="py-12">
      <grid_component_1.GridComponent id="footer-social-grid" columns={3} gap="xl">
        <div>
          <text_component_1.TextComponent id="footer-social-company" content={companyName} variant={companyNameVariant} align={companyNameAlign} color={companyNameColor} weight={companyNameWeight} className="mb-4"/>
          <text_component_1.TextComponent id="footer-social-desc" content={companyDescription} variant={companyDescriptionVariant} align={companyDescriptionAlign} color={companyDescriptionColor} weight={companyDescriptionWeight} className="text-muted-foreground mb-6"/>
        </div>
        
        <div className="col-span-2">
          <text_component_1.TextComponent id="footer-social-title" content={socialTitle} variant={socialTitleVariant} align={socialTitleAlign} color={socialTitleColor} weight={socialTitleWeight} className="mb-6"/>
          <grid_component_1.GridComponent id="footer-social-icons-grid" columns={socialPlatforms.length} gap="md" className="space-x-4">
            {socialPlatforms.map((platform, index) => (<button_component_1.ButtonComponent id={`footer-social-platform-${index}`} key={platform.id || index} text={platform.text} variant="outline" className="flex items-center"/>))}
          </grid_component_1.GridComponent>
        </div>
      </grid_component_1.GridComponent>
      
      <div className="border-t mt-12 pt-8">
        <grid_component_1.GridComponent id="footer-social-bottom-grid" columns={3} gap="xl">
          <text_component_1.TextComponent id="footer-social-copyright" content={copyrightText} variant={copyrightVariant} align={copyrightAlign} color={copyrightColor} weight={copyrightWeight} className="text-muted-foreground"/>
          <grid_component_1.GridComponent id="footer-social-links-grid" columns={legalLinks.length} gap="md" className="justify-center space-x-6">
            {legalLinks.map((link, index) => (<button_component_1.ButtonComponent id={`footer-social-link-${index}`} key={link.id || index} text={link.text} variant="link" className="p-0 h-auto"/>))}
          </grid_component_1.GridComponent>
        </grid_component_1.GridComponent>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.FooterSocialHeavy = FooterSocialHeavy;
// Footer Block 5: Compact Centered Footer
const FooterCompactCentered = ({ props }) => {
    const companyName = props?.companyName || "Company Name";
    const companyNameVariant = props?.companyNameVariant || "heading3";
    const companyNameAlign = props?.companyNameAlign || "center";
    const companyNameColor = props?.companyNameColor || "primary";
    const companyNameWeight = props?.companyNameWeight || "bold";
    const copyrightText = props?.copyrightText || "© 2023 Company Name. All rights reserved.";
    const copyrightVariant = props?.copyrightVariant || "body";
    const copyrightAlign = props?.copyrightAlign || "center";
    const copyrightColor = props?.copyrightColor || "muted";
    const copyrightWeight = props?.copyrightWeight || "normal";
    const links = Array.isArray(props?.links) ? props.links : [
        { id: '1', text: "Home", url: "#" },
        { id: '2', text: "About", url: "#" },
        { id: '3', text: "Services", url: "#" },
        { id: '4', text: "Privacy", url: "#" },
        { id: '5', text: "Contact", url: "#" }
    ];
    return (<container_component_1.ContainerComponent id="footer-compact-container" padding="md" background="none" className="border-t py-6">
      <div className="flex flex-col items-center">
        <text_component_1.TextComponent id="footer-compact-company" content={companyName} variant={companyNameVariant} align={companyNameAlign} color={companyNameColor} weight={companyNameWeight} className="mb-4"/>
        <grid_component_1.GridComponent id="footer-compact-links-grid" columns={links.length} gap="md" className="space-x-6 mb-4">
          {links.map((link, index) => (<button_component_1.ButtonComponent id={`footer-compact-link-${index}`} key={link.id || index} text={link.text} variant="link" className="p-0 h-auto"/>))}
        </grid_component_1.GridComponent>
        <text_component_1.TextComponent id="footer-compact-copyright" content={copyrightText} variant={copyrightVariant} align={copyrightAlign} color={copyrightColor} weight={copyrightWeight} className="text-muted-foreground text-sm"/>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.FooterCompactCentered = FooterCompactCentered;
// Footer Block 6: Extended Footer with CTA
const FooterExtendedCta = ({ props }) => {
    const ctaTitle = props?.ctaTitle || "Ready to get started?";
    const ctaTitleVariant = props?.ctaTitleVariant || "heading2";
    const ctaTitleAlign = props?.ctaTitleAlign || "center";
    const ctaTitleColor = props?.ctaTitleColor || "primary";
    const ctaTitleWeight = props?.ctaTitleWeight || "bold";
    const ctaDescription = props?.ctaDescription || "Join thousands of satisfied customers today.";
    const ctaDescriptionVariant = props?.ctaDescriptionVariant || "body";
    const ctaDescriptionAlign = props?.ctaDescriptionAlign || "center";
    const ctaDescriptionColor = props?.ctaDescriptionColor || "muted";
    const ctaDescriptionWeight = props?.ctaDescriptionWeight || "normal";
    const ctaButtonText = props?.ctaButtonText || "Start Free Trial";
    const companyName = props?.companyName || "Company Name";
    const companyNameVariant = props?.companyNameVariant || "heading3";
    const companyNameAlign = props?.companyNameAlign || "left";
    const companyNameColor = props?.companyNameColor || "primary";
    const companyNameWeight = props?.companyNameWeight || "bold";
    const companyDescription = props?.companyDescription || "Creating innovative solutions for modern businesses.";
    const companyDescriptionVariant = props?.companyDescriptionVariant || "body";
    const companyDescriptionAlign = props?.companyDescriptionAlign || "left";
    const companyDescriptionColor = props?.companyDescriptionColor || "muted";
    const companyDescriptionWeight = props?.companyDescriptionWeight || "normal";
    const copyrightText = props?.copyrightText || "© 2023 Company Name. All rights reserved.";
    const copyrightVariant = props?.copyrightVariant || "body";
    const copyrightAlign = props?.copyrightAlign || "center";
    const copyrightColor = props?.copyrightColor || "muted";
    const copyrightWeight = props?.copyrightWeight || "normal";
    const columns = Array.isArray(props?.columns) ? props.columns : [
        {
            id: '1',
            title: "Products",
            items: [
                { id: '1-1', text: "Features", url: "#" },
                { id: '1-2', text: "Solutions", url: "#" },
                { id: '1-3', text: "Pricing", url: "#" }
            ]
        },
        {
            id: '2',
            title: "Resources",
            items: [
                { id: '2-1', text: "Blog", url: "#" },
                { id: '2-2', text: "Documentation", url: "#" },
                { id: '2-3', text: "Support", url: "#" }
            ]
        },
        {
            id: '3',
            title: "Contact",
            items: [
                { id: '3-1', text: "info@company.com", url: "mailto:info@company.com" },
                { id: '3-2', text: "+1 (555) 123-4567", url: "tel:+15551234567" }
            ]
        }
    ];
    // Ensure each column has a valid items array
    const validatedColumns = columns.map((column) => ({
        ...column,
        items: Array.isArray(column?.items) ? column.items : []
    }));
    const legalLinks = Array.isArray(props?.legalLinks) ? props.legalLinks : [
        { id: '1', text: "Privacy Policy", url: "#" },
        { id: '2', text: "Terms of Service", url: "#" },
        { id: '3', text: "Cookie Policy", url: "#" }
    ];
    const socialLinks = Array.isArray(props?.socialLinks) ? props.socialLinks : [
        { id: '1', text: "f", url: "#" },
        { id: '2', text: "t", url: "#" },
        { id: '3', text: "ig", url: "#" },
        { id: '4', text: "in", url: "#" }
    ];
    return (<container_component_1.ContainerComponent id="footer-extended-container" padding="none" background="none">
      <container_component_1.ContainerComponent id="footer-extended-cta-container" padding="xl" background="primary" className="text-center text-white py-12">
        <text_component_1.TextComponent id="footer-extended-cta-title" content={ctaTitle} variant={ctaTitleVariant} align={ctaTitleAlign} color={ctaTitleColor} weight={ctaTitleWeight} className="mb-4"/>
        <text_component_1.TextComponent id="footer-extended-cta-desc" content={ctaDescription} variant={ctaDescriptionVariant} align={ctaDescriptionAlign} color={ctaDescriptionColor} weight={ctaDescriptionWeight} className="mb-8 max-w-2xl mx-auto text-white/80"/>
        <button_component_1.ButtonComponent id="footer-extended-cta-btn" text={ctaButtonText} variant="default" size="lg" className="bg-white text-primary hover:bg-white/90"/>
      </container_component_1.ContainerComponent>
      
      <container_component_1.ContainerComponent id="footer-extended-main-container" padding="lg" background="muted" className="py-12">
        <grid_component_1.GridComponent id="footer-extended-grid" columns={4} gap="xl">
          <div>
            <text_component_1.TextComponent id="footer-extended-company" content={companyName} variant={companyNameVariant} align={companyNameAlign} color={companyNameColor} weight={companyNameWeight} className="mb-4"/>
            <text_component_1.TextComponent id="footer-extended-desc" content={companyDescription} variant={companyDescriptionVariant} align={companyDescriptionAlign} color={companyDescriptionColor} weight={companyDescriptionWeight} className="text-muted-foreground mb-4"/>
          </div>
          
          {validatedColumns.map((column, columnIndex) => (<div key={column.id || columnIndex}>
              <text_component_1.TextComponent id={`footer-extended-column-${columnIndex}`} content={column.title} variant="heading3" className="mb-4"/>
              <grid_component_1.GridComponent id={`footer-extended-column-grid-${columnIndex}`} columns={1} gap="sm">
                {column.items.map((item, itemIndex) => (<button_component_1.ButtonComponent id={`footer-extended-column-item-${columnIndex}-${itemIndex}`} key={item.id || itemIndex} text={item.text} variant="link" className="block text-left p-0 h-auto"/>))}
              </grid_component_1.GridComponent>
            </div>))}
        </grid_component_1.GridComponent>
        
        <div className="border-t mt-12 pt-8">
          <grid_component_1.GridComponent id="footer-extended-bottom-grid" columns={3} gap="xl">
            <text_component_1.TextComponent id="footer-extended-copyright" content={copyrightText} variant={copyrightVariant} align={copyrightAlign} color={copyrightColor} weight={copyrightWeight} className="text-muted-foreground"/>
            <grid_component_1.GridComponent id="footer-extended-legal-grid" columns={legalLinks.length} gap="md" className="justify-center space-x-6">
              {legalLinks.map((link, index) => (<button_component_1.ButtonComponent id={`footer-extended-legal-${index}`} key={link.id || index} text={link.text} variant="link" className="p-0 h-auto"/>))}
            </grid_component_1.GridComponent>
            <grid_component_1.GridComponent id="footer-extended-social-grid" columns={socialLinks.length} gap="md" className="justify-end space-x-2">
              {socialLinks.map((link, index) => (<button_component_1.ButtonComponent id={`footer-extended-social-${index}`} key={link.id || index} text={link.text} variant="outline" size="sm" className="w-8 h-8 p-0"/>))}
            </grid_component_1.GridComponent>
          </grid_component_1.GridComponent>
        </div>
      </container_component_1.ContainerComponent>
    </container_component_1.ContainerComponent>);
};
exports.FooterExtendedCta = FooterExtendedCta;
// Export all footer blocks
exports.footerBlocks = [
    {
        id: 'footer-basic',
        name: 'Basic Footer',
        description: 'Simple copyright line with minimal links; good for small sites.',
        category: 'Footer',
        component: exports.FooterBasic,
    },
    {
        id: 'footer-multi-column',
        name: 'Multi-Column Footer',
        description: 'Organized layout for navigation, contact, and social; for enterprise sites.',
        category: 'Footer',
        component: exports.FooterMultiColumn,
    },
    {
        id: 'footer-newsletter-signup',
        name: 'Newsletter Signup Footer',
        description: 'Integrates an email form; ideal for SaaS or marketing.',
        category: 'Footer',
        component: exports.FooterNewsletterSignup,
    },
    {
        id: 'footer-social-heavy',
        name: 'Social-Heavy Footer',
        description: 'Focused on community links and profiles.',
        category: 'Footer',
        component: exports.FooterSocialHeavy,
    },
    {
        id: 'footer-compact-centered',
        name: 'Compact Centered Footer',
        description: 'Minimalist design for landing pages or one-pagers.',
        category: 'Footer',
        component: exports.FooterCompactCentered,
    },
    {
        id: 'footer-extended-cta',
        name: 'Extended Footer with CTA',
        description: 'Adds a top CTA bar above footer; for conversions.',
        category: 'Footer',
        component: exports.FooterExtendedCta,
    },
];
//# sourceMappingURL=footer-blocks.js.map