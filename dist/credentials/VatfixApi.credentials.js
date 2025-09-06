"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VatfixApi = void 0;
class VatfixApi {
    constructor() {
        this.name = 'vatfixApi';
        this.displayName = 'VATFix Plus API';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
            },
            {
                displayName: 'Billing Email',
                name: 'customerEmail',
                type: 'string',
                default: '',
                required: true,
                description: 'Email used for your VATFix Plus subscription',
            },
        ];
    }
}
exports.VatfixApi = VatfixApi;
