"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeProfile = void 0;
const http_client_1 = require("./http-client");
const completeProfile = async (data) => {
    const response = await http_client_1.httpClient.patch('/users/complete-profile', data);
    return response;
};
exports.completeProfile = completeProfile;
//# sourceMappingURL=profileService.js.map