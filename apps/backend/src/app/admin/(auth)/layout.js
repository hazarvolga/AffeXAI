"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthLayout;
const link_1 = __importDefault(require("next/link"));
function AuthLayout({ children }) {
    return (<div className="flex min-h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
           <div className="absolute top-8 left-8">
                <link_1.default href="/" className="text-2xl font-bold text-primary">
                    Aluplan Digital
                </link_1.default>
           </div>
           {children}
        </div>);
}
//# sourceMappingURL=layout.js.map