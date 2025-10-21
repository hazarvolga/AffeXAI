"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHero = PageHero;
const utils_1 = require("@/lib/utils");
function PageHero({ title, subtitle, backgroundImage, className }) {
    const bgStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};
    return (<section className={(0, utils_1.cn)("relative py-20 md:py-28 text-center bg-secondary/30 border-b", backgroundImage && "bg-cover bg-center", className)} style={bgStyle}>
            {backgroundImage && <div className="absolute inset-0 bg-black/50"/>}
            <div className={(0, utils_1.cn)("container mx-auto px-4 relative z-10", backgroundImage && "text-white")}>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl font-headline">
                    {title}
                </h1>
                {subtitle && (<p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
                        {subtitle}
                    </p>)}
            </div>
        </section>);
}
//# sourceMappingURL=page-hero.js.map