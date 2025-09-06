"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VatfixApi = void 0;
class VatfixApi {
    constructor() {
        this.name = 'vatfixApi';
        this.displayName = 'VATFix API';
        this.documentationUrl = 'https://plus.vatfix.eu/docs';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
            },
            {
                displayName: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'https://plus.vatfix.eu',
            },
            {
                displayName: 'Customer Email',
                name: 'customerEmail',
                type: 'string',
                default: '',
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
                baseURL: '={{ $credentials.baseUrl }}',
                url: '/status.json',
            },
        };
    }
}
exports.VatfixApi = VatfixApi;
