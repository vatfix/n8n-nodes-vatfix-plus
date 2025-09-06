"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vatfix = void 0;
class Vatfix {
    constructor() {
        this.description = {
            displayName: 'VATFix Plus',
            name: 'vatfix',
            icon: 'file:assets/vatfix.svg',
            group: ['transform'],
            version: 1,
            description: 'EU VAT validation via VATFix Plus',
            defaults: {
                name: 'VATFix Plus',
            },
            inputs: ["main" /* NodeConnectionType.Main */],
            outputs: ["main" /* NodeConnectionType.Main */],
            credentials: [
                {
                    name: 'vatfixApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Country Code',
                    name: 'countryCode',
                    type: 'string',
                    default: '',
                    placeholder: 'DE',
                    required: true,
                },
                {
                    displayName: 'VAT Number',
                    name: 'vatNumber',
                    type: 'string',
                    default: '',
                    placeholder: '123456789',
                    required: true,
                },
                {
                    displayName: 'Customer Email',
                    name: 'customerEmail',
                    type: 'string',
                    default: '',
                    placeholder: 'billing@example.com',
                    required: true,
                },
                {
                    displayName: 'Endpoint',
                    name: 'endpoint',
                    type: 'options',
                    options: [
                        { name: 'Lookup (recommended)', value: 'lookup' },
                        { name: 'Validate (alias)', value: 'validate' }
                    ],
                    default: 'lookup',
                }
            ],
        };
    }
    async execute() {
        var _a;
        const items = this.getInputData();
        const returnData = [];
        const creds = await this.getCredentials('vatfixApi'); // expects VatfixApi.credentials.ts -> name = 'vatfixApi'
        const apiKey = String(creds.apiKey || '').trim();
        const baseUrl = String(creds.baseUrl || 'https://plus.vatfix.eu').replace(/\/+$/, '');
        for (let i = 0; i < items.length; i++) {
            const countryCode = this.getNodeParameter('countryCode', i);
            const vatNumber = this.getNodeParameter('vatNumber', i);
            const customerEmail = this.getNodeParameter('customerEmail', i);
            const endpoint = this.getNodeParameter('endpoint', i);
            const url = `${baseUrl}/vat/${endpoint}`;
            const options = {
                method: 'POST',
                url,
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'x-customer-email': customerEmail,
                },
                body: {
                    countryCode,
                    vatNumber,
                },
                json: true,
            };
            try {
                const resp = await this.helpers.httpRequest(options);
                returnData.push({ json: { input: { countryCode, vatNumber }, result: resp } });
            }
            catch (err) {
                const status = (err === null || err === void 0 ? void 0 : err.statusCode) || (err === null || err === void 0 ? void 0 : err.status) || 500;
                const data = ((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.body) || (err === null || err === void 0 ? void 0 : err.message) || 'request_failed';
                returnData.push({
                    json: {
                        input: { countryCode, vatNumber },
                        error: true,
                        status,
                        data,
                    },
                });
            }
        }
        return this.prepareOutputData(returnData);
    }
}
exports.Vatfix = Vatfix;
