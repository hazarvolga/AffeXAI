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
exports.EmailFooter = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const EmailFooter = ({ companyName, contactInfo, socialMediaLinks, showUnsubscribeLink = true, unsubscribeToken, baseUrl, locale = 'tr', }) => {
    const t = {
        unsubscribe: locale === 'tr' ? 'Abonelikten çık' : 'Unsubscribe',
        unsubscribeMessage: locale === 'tr'
            ? 'Bu e-postayı almak istemiyorsanız, lütfen abonelikten çıkın.'
            : 'If you don\'t want to receive this email, please unsubscribe.',
        contactSeparator: locale === 'tr' ? ' | ' : ' | ',
        emailLabel: locale === 'tr' ? 'Email: ' : 'Email: ',
        phoneLabel: locale === 'tr' ? 'Telefon: ' : 'Phone: ',
    };
    return (<>
      <components_1.Hr style={hr}/>
      <components_1.Section style={footer}>
        {/* Social Media Links */}
        {Object.keys(socialMediaLinks).length > 0 && (<components_1.Section style={socialContainer}>
            <components_1.Row>
              {Object.entries(socialMediaLinks)
                .filter(([_, url]) => url)
                .map(([platform, url]) => (<components_1.Column key={platform} align="center" style={socialIconColumn}>
                    <components_1.Link href={url}>
                      <components_1.Img src={`https://static.cdn.person.io/images/social/${platform.toLowerCase()}-logo-2x.png`} width="24" height="24" alt={platform} style={socialIcon}/>
                    </components_1.Link>
                  </components_1.Column>))}
            </components_1.Row>
          </components_1.Section>)}

        {/* Contact Information */}
        <components_1.Text style={footerText}>
          {companyName} - {contactInfo.address}
        </components_1.Text>
        <components_1.Text style={footerText}>
          {t.emailLabel}
          <components_1.Link href={`mailto:${contactInfo.email}`} style={footerLink}>
            {contactInfo.email}
          </components_1.Link>
          {t.contactSeparator}
          {t.phoneLabel}
          {contactInfo.phone}
        </components_1.Text>

        {/* Unsubscribe Link */}
        {showUnsubscribeLink && (<components_1.Text style={footerText}>
            <components_1.Link href={unsubscribeToken
                ? `${baseUrl}/unsubscribe?token=${unsubscribeToken}`
                : `${baseUrl}/preferences`} style={footerLink}>
              {t.unsubscribe}
            </components_1.Link>
          </components_1.Text>)}
      </components_1.Section>
    </>);
};
exports.EmailFooter = EmailFooter;
// Styles
const hr = {
    borderColor: "#e5e5e5",
    margin: "30px 0",
};
const footer = {
    padding: '0 32px',
    textAlign: 'center',
};
const socialContainer = {
    padding: '0 32px',
    textAlign: 'center',
    marginBottom: '16px',
};
const socialIconColumn = {
    padding: '0 8px',
};
const socialIcon = {
    display: 'block',
};
const footerText = {
    color: "#6a7380",
    fontSize: "12px",
    lineHeight: '18px',
    margin: '4px 0',
};
const footerLink = {
    color: '#6a7380',
    textDecoration: 'underline',
    fontSize: "12px",
};
//# sourceMappingURL=EmailFooter.js.map