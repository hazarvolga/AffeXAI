"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breadcrumb = Breadcrumb;
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const react_1 = __importDefault(require("react"));
function Breadcrumb({ items }) {
    return (<nav aria-label="Breadcrumb" className="bg-secondary/20">
            <div className="container mx-auto px-4">
                <ol className="flex items-center space-x-2 py-3 text-sm text-muted-foreground">
                    <li>
                        <link_1.default href="/" className="hover:text-primary">Ana Sayfa</link_1.default>
                    </li>
                    {items.map((item, index) => (<li key={item.name} className="flex items-center">
                            <lucide_react_1.ChevronRight className="h-4 w-4 flex-shrink-0"/>
                            <link_1.default href={item.href} className={`ml-2 ${index === items.length - 1 ? 'font-medium text-foreground' : 'hover:text-primary'}`} aria-current={index === items.length - 1 ? 'page' : undefined}>
                                {item.name}
                            </link_1.default>
                        </li>))}
                </ol>
            </div>
        </nav>);
}
//# sourceMappingURL=breadcrumb.js.map