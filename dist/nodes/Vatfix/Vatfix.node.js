"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vatfix = void 0;
class Vatfix {
    constructor() {
        this.description = {
            displayName: 'VATFix Plus',
            name: 'vatfix',
            icon: 'file:assets/vatfix.svg',
            documentationUrl: 'https://plus.vatfix.eu/plus',
            group: ['transform'],
            version: 1,
            description: 'EU VAT validation via VATFix Plus',
            defaults: { name: 'VATFix Plus' },
            inputs: ["main" /* NodeConnectionType.Main */],
            outputs: ["main" /* NodeConnectionType.Main */],
            credentials: [{ name: 'vatfixApi', required: true }],
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
                    displayName: 'Endpoint',
                    name: 'endpoint',
                    type: 'options',
                    options: [
                        { name: 'Lookup (recommended)', value: 'lookup' },
                        { name: 'Validate (alias)', value: 'validate' },
                    ],
                    default: 'lookup',
                },
            ],
        };
    }
    async execute() {
        var _a, _b, _c, _d, _e;
        const items = this.getInputData();
        const out = [];
        // single source of truth: credentials
        const creds = (await this.getCredentials('vatfixApi'));
        const apiKey = String(creds.apiKey || '').trim();
        const customerEmail = String(creds.customerEmail || '').trim();
        // opaque host
        const baseUrl = 'https://plus.vatfix.eu';
        for (let i = 0; i < items.length; i++) {
            const countryCode = this.getNodeParameter('countryCode', i);
            const vatNumber = this.getNodeParameter('vatNumber', i);
            const endpoint = this.getNodeParameter('endpoint', i);
            const options = {
                method: 'POST',
                url: `${baseUrl}/vat/${endpoint}`,
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'x-customer-email': customerEmail,
                },
                body: { countryCode, vatNumber },
                json: true,
            };
            try {
                const resp = await this.helpers.httpRequest(options);
                out.push({ json: { input: { countryCode, vatNumber }, result: resp } });
            }
            catch (err) {
                out.push({
                    json: {
                        input: { countryCode, vatNumber },
                        error: true,
                        status: (_b = (_a = err === null || err === void 0 ? void 0 : err.statusCode) !== null && _a !== void 0 ? _a : err === null || err === void 0 ? void 0 : err.status) !== null && _b !== void 0 ? _b : 500,
                        data: (_e = (_d = (_c = err === null || err === void 0 ? void 0 : err.response) === null || _c === void 0 ? void 0 : _c.body) !== null && _d !== void 0 ? _d : err === null || err === void 0 ? void 0 : err.message) !== null && _e !== void 0 ? _e : 'request_failed',
                    },
                });
            }
        }
        return this.prepareOutputData(out);
    }
}
exports.Vatfix = Vatfix;
