"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigationBlocks = exports.NavigationSplit = exports.NavigationStickyTransparent = exports.NavigationSocialLinks = exports.NavigationLogoCta = exports.NavigationCenteredLogo = exports.NavigationMinimalLogoLeft = void 0;
const react_1 = __importDefault(require("react"));
const container_component_1 = require("@/components/cms/container-component");
const text_component_1 = require("@/components/cms/text-component");
const button_component_1 = require("@/components/cms/button-component");
const grid_component_1 = require("@/components/cms/grid-component");
const image_component_1 = require("@/components/cms/image-component");
// Helper component for Logo rendering (Text or Image)
const LogoComponent = ({ props, idPrefix }) => {
    const logoType = props?.logoType || 'text';
    const logoText = props?.logoText || 'Company';
    const logoMediaId = props?.logoMediaId || null;
    const logoUrl = props?.logoUrl || '';
    const logoAlt = props?.logoAlt || 'Company Logo';
    const logoWidth = props?.logoWidth || 120;
    const logoHeight = props?.logoHeight || 40;
    const className = props?.logoClassName || 'font-bold';
    if (logoType === 'image') {
        // Use mediaId if available, otherwise fallback to logoUrl
        if (logoMediaId || logoUrl) {
            return (<image_component_1.ImageComponent id={`${idPrefix}-logo-image`} mediaId={logoMediaId} src={logoUrl} // Only use logoUrl as src (will be fetched via mediaId if provided)
             alt={logoAlt} width={logoWidth} height={logoHeight} className="object-contain"/>);
        }
    }
    return (<text_component_1.TextComponent id={`${idPrefix}-logo`} content={logoText} variant="heading3" className={className}/>);
};
// Navigation Block 1: Minimal Navigation with Logo Left
const NavigationMinimalLogoLeft = ({ props }) => {
    const navItems = props?.navItems || [
        {
            id: '1',
            text: "Home",
            url: "#"
        },
        {
            id: '2',
            text: "About",
            url: "#"
        },
        {
            id: '3',
            text: "Services",
            url: "#"
        },
        {
            id: '4',
            text: "Contact",
            url: "#"
        }
    ];
    return (<container_component_1.ContainerComponent id="nav-minimal-container" padding="md" background="none" className="flex items-center justify-between border-b">
      <LogoComponent props={props} idPrefix="nav-minimal"/>
      
      <grid_component_1.GridComponent id="nav-minimal-grid" columns={navItems.length} gap="md" className="flex items-center space-x-6">
        {navItems.map((item, index) => (<button_component_1.ButtonComponent id={`nav-item-${index + 1}`} key={item.id || index} text={item.text} href={item.url} variant="ghost"/>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.NavigationMinimalLogoLeft = NavigationMinimalLogoLeft;
// Navigation Block 2: Centered Navigation with Logo in Middle
const NavigationCenteredLogo = ({ props }) => {
    const leftNavItems = props?.leftNavItems || [
        {
            id: '1',
            text: "Home",
            url: "#"
        },
        {
            id: '2',
            text: "About",
            url: "#"
        }
    ];
    const rightNavItems = props?.rightNavItems || [
        {
            id: '1',
            text: "Services",
            url: "#"
        },
        {
            id: '2',
            text: "Contact",
            url: "#"
        }
    ];
    return (<container_component_1.ContainerComponent id="nav-centered-container" padding="md" background="none" className="flex items-center justify-between border-b">
      <grid_component_1.GridComponent id="nav-left-grid" columns={leftNavItems.length} gap="md" className="flex items-center space-x-6">
        {leftNavItems.map((item, index) => (<button_component_1.ButtonComponent id={`nav-left-item-${index + 1}`} key={item.id || index} text={item.text} href={item.url} variant="ghost"/>))}
      </grid_component_1.GridComponent>
      
      <div className="mx-8">
        <LogoComponent props={props} idPrefix="nav-centered"/>
      </div>
      
      <grid_component_1.GridComponent id="nav-right-grid" columns={rightNavItems.length} gap="md" className="flex items-center space-x-6">
        {rightNavItems.map((item, index) => (<button_component_1.ButtonComponent id={`nav-right-item-${index + 1}`} key={item.id || index} text={item.text} href={item.url} variant="ghost"/>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.NavigationCenteredLogo = NavigationCenteredLogo;
// Navigation Block 3: Navigation with Logo + CTA Button
const NavigationLogoCta = ({ props }) => {
    const navItems = props?.navItems || [
        {
            id: '1',
            text: "Home",
            url: "#"
        },
        {
            id: '2',
            text: "About",
            url: "#"
        },
        {
            id: '3',
            text: "Services",
            url: "#"
        }
    ];
    const ctaButtonText = props?.ctaButtonText || "Sign Up";
    return (<container_component_1.ContainerComponent id="nav-cta-container" padding="md" background="none" className="flex items-center justify-between border-b">
      <LogoComponent props={props} idPrefix="nav-cta"/>
      
      <grid_component_1.GridComponent id="nav-cta-grid" columns={navItems.length} gap="md" className="flex items-center space-x-6">
        {navItems.map((item, index) => (<button_component_1.ButtonComponent id={`nav-item-${index + 1}`} key={item.id || index} text={item.text} href={item.url} variant="ghost"/>))}
      </grid_component_1.GridComponent>
      <button_component_1.ButtonComponent id="nav-signup-btn" text={ctaButtonText} variant="default"/>
    </container_component_1.ContainerComponent>);
};
exports.NavigationLogoCta = NavigationLogoCta;
// Navigation Block 4: Navigation with Social Links
const NavigationSocialLinks = ({ props }) => {
    const navItems = props?.navItems || [
        {
            id: '1',
            text: "Home",
            url: "#"
        },
        {
            id: '2',
            text: "About",
            url: "#"
        },
        {
            id: '3',
            text: "Services",
            url: "#"
        },
        {
            id: '4',
            text: "Contact",
            url: "#"
        }
    ];
    const socialLinks = props?.socialLinks || [
        {
            id: '1',
            text: "f",
            url: "#"
        },
        {
            id: '2',
            text: "t",
            url: "#"
        },
        {
            id: '3',
            text: "in",
            url: "#"
        }
    ];
    return (<container_component_1.ContainerComponent id="nav-social-container" padding="md" background="none" className="flex items-center justify-between border-b">
      <LogoComponent props={props} idPrefix="nav-social"/>
      
      <grid_component_1.GridComponent id="nav-social-links-grid" columns={navItems.length} gap="md" className="flex items-center space-x-6">
        {navItems.map((item, index) => (<button_component_1.ButtonComponent id={`nav-item-${index + 1}`} key={item.id || index} text={item.text} href={item.url} variant="ghost"/>))}
      </grid_component_1.GridComponent>
      <grid_component_1.GridComponent id="nav-social-icons-grid" columns={socialLinks.length} gap="sm" className="flex items-center space-x-2">
        {socialLinks.map((link, index) => (<button_component_1.ButtonComponent id={`nav-social-${index + 1}`} key={link.id || index} text={link.text} href={link.url} variant="outline" size="sm" className="w-8 h-8 p-0"/>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.NavigationSocialLinks = NavigationSocialLinks;
// Navigation Block 5: Sticky Navigation with Transparent Background
const NavigationStickyTransparent = ({ props }) => {
    const navItems = props?.navItems || [
        {
            id: '1',
            text: "Home",
            url: "#"
        },
        {
            id: '2',
            text: "About",
            url: "#"
        },
        {
            id: '3',
            text: "Services",
            url: "#"
        },
        {
            id: '4',
            text: "Contact",
            url: "#"
        }
    ];
    return (<container_component_1.ContainerComponent id="nav-sticky-container" padding="md" background="none" className="flex items-center justify-between absolute top-0 w-full bg-transparent">
      <LogoComponent props={{ ...props, logoClassName: 'font-bold text-white' }} idPrefix="nav-sticky"/>
      
      <grid_component_1.GridComponent id="nav-sticky-grid" columns={navItems.length} gap="md" className="flex items-center space-x-6">
        {navItems.map((item, index) => (<button_component_1.ButtonComponent id={`nav-item-${index + 1}`} key={item.id || index} text={item.text} href={item.url} variant="ghost" className="text-white hover:text-white"/>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.NavigationStickyTransparent = NavigationStickyTransparent;
// Navigation Block 6: Split Navigation (Logo Center, Nav Left & Right)
const NavigationSplit = ({ props }) => {
    const leftNavItems = props?.leftNavItems || [
        {
            id: '1',
            text: "Products",
            url: "#"
        },
        {
            id: '2',
            text: "Solutions",
            url: "#"
        }
    ];
    const rightNavItems = props?.rightNavItems || [
        {
            id: '1',
            text: "Resources",
            url: "#"
        },
        {
            id: '2',
            text: "Contact",
            url: "#"
        }
    ];
    return (<container_component_1.ContainerComponent id="nav-split-container" padding="md" background="none" className="flex items-center justify-between border-b">
      <grid_component_1.GridComponent id="nav-split-left-grid" columns={leftNavItems.length} gap="md" className="flex items-center space-x-6">
        {leftNavItems.map((item, index) => (<button_component_1.ButtonComponent id={`nav-left-item-${index + 1}`} key={item.id || index} text={item.text} href={item.url} variant="ghost"/>))}
      </grid_component_1.GridComponent>
      
      <div className="mx-8">
        <LogoComponent props={props} idPrefix="nav-split"/>
      </div>
      
      <grid_component_1.GridComponent id="nav-split-right-grid" columns={rightNavItems.length} gap="md" className="flex items-center space-x-6">
        {rightNavItems.map((item, index) => (<button_component_1.ButtonComponent id={`nav-right-item-${index + 1}`} key={item.id || index} text={item.text} href={item.url} variant="ghost"/>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.NavigationSplit = NavigationSplit;
// Export all navigation blocks
exports.navigationBlocks = [
    {
        id: 'nav-minimal-logo-left',
        name: 'Minimal Navigation with Logo Left',
        description: 'A clean header layout featuring the logo on the left and compact horizontal navigation on the right; best for content-focused websites and blogs.',
        category: 'Navigation',
        component: exports.NavigationMinimalLogoLeft,
    },
    {
        id: 'nav-centered-logo',
        name: 'Centered Navigation with Logo in Middle',
        description: 'Logo is centered between symmetrical navigation items; great for branding-focused or luxury product sites.',
        category: 'Navigation',
        component: exports.NavigationCenteredLogo,
    },
    {
        id: 'nav-logo-cta',
        name: 'Navigation with Logo + CTA Button',
        description: 'Includes a right-aligned call-to-action button (e.g., "Sign Up"); optimized for marketing and SaaS landing pages.',
        category: 'Navigation',
        component: exports.NavigationLogoCta,
    },
    {
        id: 'nav-social-links',
        name: 'Navigation with Social Links',
        description: 'Displays social media icons beside the navigation links; ideal for portfolio or community sites.',
        category: 'Navigation',
        component: exports.NavigationSocialLinks,
    },
    {
        id: 'nav-sticky-transparent',
        name: 'Sticky Navigation with Transparent Background',
        description: 'A header that becomes solid on scroll; perfect for immersive hero designs.',
        category: 'Navigation',
        component: exports.NavigationStickyTransparent,
    },
    {
        id: 'nav-split',
        name: 'Split Navigation (Logo Center, Nav Left & Right)',
        description: 'Balanced layout placing the logo at the center, with menus divided on both sides; ideal for corporate or agency sites.',
        category: 'Navigation',
        component: exports.NavigationSplit,
    },
];
//# sourceMappingURL=navigation-blocks.js.map