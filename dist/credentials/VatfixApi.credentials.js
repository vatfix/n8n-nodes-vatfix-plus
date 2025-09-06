"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VatfixApi = void 0;
class VatfixApi {
    constructor() {
        this.name = 'vatfixApi';
        this.displayName = 'VATFix Plus account';
        // force-cast string to Icon type
        this.icon = 'file:assets/vatfix.svg';
        this.documentationUrl = 'https://plus.vatfix.eu/plus';
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
                displayName: 'Customer Email',
                name: 'customerEmail',
                type: 'string',
                default: '',
                placeholder: 'store@yourdomain.tld',
                required: true,
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'x-api-key': '={{ $credentials.apiKey }}',
                    'x-customer-email': '={{ $credentials.customerEmail }}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://plus.vatfix.eu',
                url: '/status.json',
            },
        };
    }
}
exports.VatfixApi = VatfixApi;
