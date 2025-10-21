"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
require("./globals.css");
const toaster_1 = require("@/components/ui/toaster");
const theme_provider_1 = require("@/components/common/theme-provider");
exports.metadata = {
    title: 'Aluplan Digital',
    description: 'The digital gateway to advanced AEC solutions from Aluplan.',
};
function RootLayout({ children, }) {
    return (<html lang="tr" className="!scroll-smooth" suppressHydrationWarning>
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-body antialiased">
        <theme_provider_1.ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <toaster_1.Toaster />
        </theme_provider_1.ThemeProvider>
      </body>
    </html>);
}
//# sourceMappingURL=layout.js.map