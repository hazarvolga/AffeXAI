"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmailPreviewPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const components_1 = require("@react-email/components");
const templatesService_1 = __importDefault(require("@/lib/api/templatesService"));
const react_2 = require("react");
const link_1 = __importDefault(require("next/link"));
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const settingsService_1 = __importDefault(require("@/lib/api/settingsService"));
// Import all email templates
const welcome_1 = require("@/emails/welcome");
const monthly_newsletter_1 = require("@/emails/monthly-newsletter");
const password_reset_1 = require("@/emails/password-reset");
const email_verification_1 = require("@/emails/email-verification");
const order_confirmation_1 = require("@/emails/order-confirmation");
const abandoned_cart_1 = require("@/emails/abandoned-cart");
const account_summary_1 = require("@/emails/account-summary");
const back_in_stock_1 = require("@/emails/back-in-stock");
const event_invitation_1 = require("@/emails/event-invitation");
const feature_update_1 = require("@/emails/feature-update");
const feedback_request_1 = require("@/emails/feedback-request");
const flash_sale_1 = require("@/emails/flash-sale");
const goodbye_1 = require("@/emails/goodbye");
const invoice_1 = require("@/emails/invoice");
const loyalty_program_1 = require("@/emails/loyalty-program");
const milestone_celebration_1 = require("@/emails/milestone-celebration");
const onboarding_series_1 = require("@/emails/onboarding-series");
const price_drop_alert_1 = require("@/emails/price-drop-alert");
const product_launch_1 = require("@/emails/product-launch");
const product_recommendation_1 = require("@/emails/product-recommendation");
const re_engagement_1 = require("@/emails/re-engagement");
const seasonal_campaign_1 = require("@/emails/seasonal-campaign");
const security_alert_1 = require("@/emails/security-alert");
const shipping_updates_1 = require("@/emails/shipping-updates");
const subscription_renewal_1 = require("@/emails/subscription-renewal");
const survey_nps_1 = require("@/emails/survey-nps");
const thank_you_1 = require("@/emails/thank-you");
const test_social_links_1 = require("@/emails/test-social-links");
function EmailPreviewPage({ params }) {
    // Unwrap the params promise using React.use()
    const unwrappedParams = (0, react_2.use)(params);
    const { templateId } = unwrappedParams;
    const searchParams = (0, navigation_1.useSearchParams)();
    const templateType = searchParams.get('type') || 'file';
    const [emailHtml, setEmailHtml] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const hasFetchedTemplate = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        // Prevent multiple fetches
        if (hasFetchedTemplate.current)
            return;
        hasFetchedTemplate.current = true;
        const fetchTemplate = async () => {
            try {
                setLoading(true);
                // Fetch current site settings
                let siteSettings = null;
                try {
                    const fetchedSettings = await settingsService_1.default.getSiteSettings();
                    // Transform the settings to match the expected structure
                    siteSettings = {
                        companyName: fetchedSettings.companyName,
                        logoUrl: fetchedSettings.logoUrl,
                        contact: fetchedSettings.contact,
                        socialMedia: fetchedSettings.socialMedia,
                    };
                }
                catch (settingsError) {
                    console.error('Error fetching site settings:', settingsError);
                }
                if (templateType === 'file') {
                    // Render file-based templates
                    let html = '';
                    // Map template IDs to components
                    const templateComponents = {
                        'welcome': welcome_1.WelcomeEmail,
                        'monthly-newsletter': monthly_newsletter_1.MonthlyNewsletterEmail,
                        'password-reset': password_reset_1.PasswordResetEmail,
                        'email-verification': email_verification_1.EmailVerificationEmail,
                        'order-confirmation': order_confirmation_1.OrderConfirmationEmail,
                        'abandoned-cart': abandoned_cart_1.AbandonedCartEmail,
                        'account-summary': account_summary_1.AccountSummaryEmail,
                        'back-in-stock': back_in_stock_1.BackInStockEmail,
                        'event-invitation': event_invitation_1.EventInvitationEmail,
                        'feature-update': feature_update_1.FeatureUpdateEmail,
                        'feedback-request': feedback_request_1.FeedbackRequestEmail,
                        'flash-sale': flash_sale_1.FlashSaleEmail,
                        'goodbye': goodbye_1.GoodbyeEmail,
                        'invoice': invoice_1.InvoiceEmail,
                        'loyalty-program': loyalty_program_1.LoyaltyProgramEmail,
                        'milestone-celebration': milestone_celebration_1.MilestoneCelebrationEmail,
                        'onboarding-series': onboarding_series_1.OnboardingSeriesEmail,
                        'price-drop-alert': price_drop_alert_1.PriceDropAlertEmail,
                        'product-launch': product_launch_1.ProductLaunchEmail,
                        'product-recommendation': product_recommendation_1.ProductRecommendationEmail,
                        're-engagement': re_engagement_1.ReEngagementEmail,
                        'seasonal-campaign': seasonal_campaign_1.SeasonalCampaignEmail,
                        'security-alert': security_alert_1.SecurityAlertEmail,
                        'shipping-updates': shipping_updates_1.ShippingUpdatesEmail,
                        'subscription-renewal': subscription_renewal_1.SubscriptionRenewalEmail,
                        'survey-nps': survey_nps_1.NpsSurveyEmail,
                        'thank-you': thank_you_1.ThankYouEmail,
                        'test-social-links': test_social_links_1.TestSocialLinksEmail, // Add our test template
                    };
                    const Component = templateComponents[templateId];
                    if (Component) {
                        // Render with sample props and site settings
                        html = (0, components_1.render)(<Component siteSettings={siteSettings}/>);
                    }
                    else {
                        html = `<div>Şablon bulunamadı: ${templateId}</div>`;
                    }
                    setEmailHtml(html);
                }
                else {
                    // For database templates, fetch from API
                    try {
                        // Note: In a real implementation, you would have a preview endpoint
                        // For now, we'll use a placeholder
                        const response = await templatesService_1.default.getTemplateById(templateId);
                        // In a real implementation, you would render the template content
                        setEmailHtml(`<div>Özel şablon önizlemesi: ${response.name}</div>`);
                    }
                    catch (apiError) {
                        // Fallback to file-based template if DB template not found
                        let html = '';
                        const templateComponents = {
                            'welcome': welcome_1.WelcomeEmail,
                            'monthly-newsletter': monthly_newsletter_1.MonthlyNewsletterEmail,
                            'password-reset': password_reset_1.PasswordResetEmail,
                            'email-verification': email_verification_1.EmailVerificationEmail,
                            'order-confirmation': order_confirmation_1.OrderConfirmationEmail,
                            'abandoned-cart': abandoned_cart_1.AbandonedCartEmail,
                            'account-summary': account_summary_1.AccountSummaryEmail,
                            'back-in-stock': back_in_stock_1.BackInStockEmail,
                            'event-invitation': event_invitation_1.EventInvitationEmail,
                            'feature-update': feature_update_1.FeatureUpdateEmail,
                            'feedback-request': feedback_request_1.FeedbackRequestEmail,
                            'flash-sale': flash_sale_1.FlashSaleEmail,
                            'goodbye': goodbye_1.GoodbyeEmail,
                            'invoice': invoice_1.InvoiceEmail,
                            'loyalty-program': loyalty_program_1.LoyaltyProgramEmail,
                            'milestone-celebration': milestone_celebration_1.MilestoneCelebrationEmail,
                            'onboarding-series': onboarding_series_1.OnboardingSeriesEmail,
                            'price-drop-alert': price_drop_alert_1.PriceDropAlertEmail,
                            'product-launch': product_launch_1.ProductLaunchEmail,
                            'product-recommendation': product_recommendation_1.ProductRecommendationEmail,
                            're-engagement': re_engagement_1.ReEngagementEmail,
                            'seasonal-campaign': seasonal_campaign_1.SeasonalCampaignEmail,
                            'security-alert': security_alert_1.SecurityAlertEmail,
                            'shipping-updates': shipping_updates_1.ShippingUpdatesEmail,
                            'subscription-renewal': subscription_renewal_1.SubscriptionRenewalEmail,
                            'survey-nps': survey_nps_1.NpsSurveyEmail,
                            'thank-you': thank_you_1.ThankYouEmail,
                            'test-social-links': test_social_links_1.TestSocialLinksEmail, // Add our test template
                        };
                        const Component = templateComponents[templateId];
                        if (Component) {
                            html = (0, components_1.render)(<Component siteSettings={siteSettings}/>);
                        }
                        else {
                            html = `<div>Şablon bulunamadı: ${templateId}</div>`;
                        }
                        setEmailHtml(html);
                    }
                }
                setError(null);
            }
            catch (err) {
                console.error('Error fetching template:', err);
                setError('Şablon bilgileri yüklenirken bir hata oluştu.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchTemplate();
    }, [templateId, templateType]);
    if (loading) {
        return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-12">{error}</div>;
    }
    return (<div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button_1.Button variant="outline" size="sm" asChild>
            <link_1.default href="/admin/newsletter/templates">
              <lucide_react_1.ArrowLeft className="mr-2 h-4 w-4"/>
              Şablonlara Geri Dön
            </link_1.default>
          </button_1.Button>
          <div className="text-sm text-gray-500">
            Şablon Önizleme: {templateId}
          </div>
        </div>
      </div>
      
      {/* Email Content */}
      <div className="p-4">
        <div dangerouslySetInnerHTML={{ __html: emailHtml }} className="w-full bg-white shadow-sm rounded-lg overflow-hidden mx-auto" style={{ maxWidth: '800px' }}/>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map