"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGroupsAndSegments = useGroupsAndSegments;
const react_1 = require("react");
const http_client_1 = require("@/lib/api/http-client");
function useGroupsAndSegments() {
    const [groups, setGroups] = (0, react_1.useState)([]);
    const [segments, setSegments] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const fetchGroups = async () => {
        try {
            const result = await http_client_1.httpClient.getWrapped('/email-marketing/groups/import/options');
            setGroups(result || []);
        }
        catch (err) {
            console.error('Error fetching groups:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        }
    };
    const fetchSegments = async () => {
        try {
            const result = await http_client_1.httpClient.getWrapped('/email-marketing/segments/import/options');
            setSegments(result || []);
        }
        catch (err) {
            console.error('Error fetching segments:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        }
    };
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            await Promise.all([fetchGroups(), fetchSegments()]);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        }
        finally {
            setLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchData();
    }, []);
    return {
        groups,
        segments,
        loading,
        error,
        refetch: fetchData,
    };
}
//# sourceMappingURL=useGroupsAndSegments.js.map