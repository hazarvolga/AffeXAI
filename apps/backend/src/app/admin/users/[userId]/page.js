"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditUserPage;
const user_form_1 = require("@/components/admin/user-form");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_2 = require("react");
const usersService_1 = __importDefault(require("@/lib/api/usersService"));
function EditUserPage({ params }) {
    // Unwrap the params promise using React.use()
    const unwrappedParams = (0, react_2.use)(params);
    const { userId } = unwrappedParams;
    const [user, setUser] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const hasFetchedUser = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        // Prevent multiple fetches
        if (hasFetchedUser.current)
            return;
        hasFetchedUser.current = true;
        const fetchUser = async () => {
            try {
                setLoading(true);
                // Fetch user from backend
                const userData = await usersService_1.default.getUserById(userId);
                setUser(userData);
                setError(null);
            }
            catch (err) {
                console.error('Error fetching user:', err);
                if (err.response?.status === 404) {
                    (0, navigation_1.notFound)();
                }
                else {
                    setError('Kullanıcı bilgileri yüklenirken bir hata oluştu.');
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);
    if (loading) {
        return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-12">{error}</div>;
    }
    if (!user) {
        (0, navigation_1.notFound)();
        return null;
    }
    return (<div className="max-w-2xl mx-auto">
            <user_form_1.UserForm user={user}/>
        </div>);
}
//# sourceMappingURL=page.js.map