"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateVerificationSection = CertificateVerificationSection;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const button_1 = require("./ui/button");
const link_1 = __importDefault(require("next/link"));
const certificateService = {
    icon: lucide_react_1.Award,
    title: 'Instantly Verify Your Allplan Certificate',
    description: 'Quickly check the validity of your Allplan certificates in real-time.',
    ctaText: 'Check Now',
    ctaLink: 'https://sertifikasorgulama.aluplan.com.tr/',
};
function CertificateVerificationSection() {
    return (<section className="py-8 bg-secondary/30 border-y">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-foreground font-headline">
                            {certificateService.title}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                            {certificateService.description}
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                         <button_1.Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 transition-transform duration-300 hover:scale-105" size="lg">
                            <link_1.default href={certificateService.ctaLink}>
                                <certificateService.icon className="mr-2 h-5 w-5"/>
                                {certificateService.ctaText}
                            </link_1.default>
                        </button_1.Button>
                    </div>
                </div>
            </div>
        </section>);
}
//# sourceMappingURL=certificate-verification-section.js.map