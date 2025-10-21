"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCustomFields = useCustomFields;
const react_1 = require("react");
const http_client_1 = require("@/lib/api/http-client");
function useCustomFields() {
    const [customFields, setCustomFields] = (0, react_1.useState)([]);
    const [mappingFields, setMappingFields] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const fetchCustomFields = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await http_client_1.httpClient.getWrapped('/email-marketing/custom-fields?activeOnly=true');
            setCustomFields(result || []);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        }
        finally {
            setLoading(false);
        }
    };
    const fetchMappingFields = async () => {
        try {
            const result = await http_client_1.httpClient.getWrapped('/email-marketing/custom-fields/mapping-options');
            setMappingFields(result || []);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        }
    };
    const createCustomField = async (fieldData) => {
        try {
            const result = await http_client_1.httpClient.postWrapped('/email-marketing/custom-fields', fieldData);
            await fetchCustomFields(); // Refresh the list
            await fetchMappingFields(); // Refresh mapping options
            return result;
        }
        catch (err) {
            throw new Error(err instanceof Error ? err.message : 'Unknown error occurred');
        }
    };
    const updateCustomField = async (id, fieldData) => {
        try {
            const result = await http_client_1.httpClient.putWrapped(`/email-marketing/custom-fields/${id}`, fieldData);
            await fetchCustomFields(); // Refresh the list
            await fetchMappingFields(); // Refresh mapping options
            return result;
        }
        catch (err) {
            throw new Error(err instanceof Error ? err.message : 'Unknown error occurred');
        }
    };
    const deleteCustomField = async (id) => {
        try {
            await http_client_1.httpClient.delete(`/email-marketing/custom-fields/${id}`);
            await fetchCustomFields(); // Refresh the list
            await fetchMappingFields(); // Refresh mapping options
        }
        catch (err) {
            throw new Error(err instanceof Error ? err.message : 'Unknown error occurred');
        }
    };
    const reorderCustomFields = async (fieldIds) => {
        try {
            await http_client_1.httpClient.put('/email-marketing/custom-fields/reorder', { fieldIds });
            await fetchCustomFields(); // Refresh the list
        }
        catch (err) {
            throw new Error(err instanceof Error ? err.message : 'Unknown error occurred');
        }
    };
    (0, react_1.useEffect)(() => {
        fetchCustomFields();
        fetchMappingFields();
    }, []);
    return {
        customFields,
        mappingFields,
        loading,
        error,
        refetch: () => {
            fetchCustomFields();
            fetchMappingFields();
        },
        createCustomField,
        updateCustomField,
        deleteCustomField,
        reorderCustomFields,
    };
}
//# sourceMappingURL=useCustomFields.js.map