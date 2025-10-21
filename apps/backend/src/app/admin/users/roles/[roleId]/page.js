"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditRolePage;
const role_form_1 = require("@/components/admin/role-form");
const roles_data_1 = require("@/lib/roles-data");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_2 = require("react");
function EditRolePage({ params }) {
    // Unwrap the params promise using React.use()
    const unwrappedParams = (0, react_2.use)(params);
    const { roleId } = unwrappedParams;
    const [role, setRole] = (0, react_1.useState)(undefined);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const hasFetchedRole = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        // Prevent multiple fetches
        if (hasFetchedRole.current)
            return;
        hasFetchedRole.current = true;
        const fetchRole = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch the role data from an API
                // For now, we're using mock data
                const roleData = roles_data_1.roles.find(r => r.id === roleId);
                if (!roleData) {
                    (0, navigation_1.notFound)();
                    return;
                }
                setRole(roleData);
                setError(null);
            }
            catch (err) {
                console.error('Error fetching role:', err);
                setError('Rol bilgileri yüklenirken bir hata oluştu.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchRole();
    }, [roleId]);
    if (loading) {
        return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-12">{error}</div>;
    }
    if (!role) {
        (0, navigation_1.notFound)();
        return null;
    }
    return <role_form_1.RoleForm role={role}/>;
}
//# sourceMappingURL=page.js.map