"use strict";
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
exports.buttonContainer = exports.button = exports.paragraph = exports.title = exports.content = exports.container = exports.main = exports.EmailTemplate = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const EmailHeader_1 = require("./EmailHeader");
const EmailFooter_1 = require("./EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const EmailTemplate = ({ preview, children, companyName, logoUrl, contactInfo, socialMediaLinks, showUnsubscribeLink = true, unsubscribeToken, showTagline = false, tagline, locale = 'tr', }) => {
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{preview}</components_1.Preview>
      <components_1.Body style={exports.main}>
        <components_1.Container style={exports.container}>
          <EmailHeader_1.EmailHeader companyName={companyName} logoUrl={logoUrl} baseUrl={baseUrl} showTagline={showTagline} tagline={tagline} locale={locale}/>

          {children}

          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={showUnsubscribeLink} unsubscribeToken={unsubscribeToken} locale={locale}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.EmailTemplate = EmailTemplate;
// Shared Styles
exports.main = {
    backgroundColor: "#f6f9fc",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
exports.container = {
    backgroundColor: "#ffffff",
    margin: "40px auto",
    padding: "0",
    borderRadius: "8px",
    maxWidth: "600px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};
exports.content = {
    padding: "32px",
};
exports.title = {
    color: "#1a1a1a",
    fontSize: "24px",
    fontWeight: "600",
    lineHeight: "32px",
    margin: "0 0 16px",
};
exports.paragraph = {
    color: "#525f7f",
    fontSize: "14px",
    lineHeight: "24px",
    margin: "0 0 16px",
};
exports.button = {
    backgroundColor: "#5e6ad2",
    borderRadius: "4px",
    color: "#fff",
    display: "inline-block",
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "40px",
    padding: "0 24px",
    textAlign: "center",
    textDecoration: "none",
};
exports.buttonContainer = {
    margin: "24px 0",
};
//# sourceMappingURL=EmailTemplate.js.map