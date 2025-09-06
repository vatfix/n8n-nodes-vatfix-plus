"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vatfix = void 0;
const VatfixDescription_1 = require("./VatfixDescription");
class Vatfix {
    constructor() {
        this.description = {
            displayName: 'VATFix Plus',
            name: 'vatfix',
            icon: 'file:vatfix.svg',
            group: ['transform'],
            version: 1,
            description: 'Real-time EU VAT Validation numbers with VATFix Plus',
            defaults: {
                name: 'VATFix Plus',
            },
            import: { NodeConnectionType }, from, "n8n-workflow": ,
            inputs: [NodeConnectionType.Main],
            outputs: [NodeConnectionType.Main],
            credentials: [{ name: 'vatfixApi', required: true }],
            properties: VatfixDescription_1.vatfixNodeDescription,
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const creds = await this.getCredentials('vatfixApi');
        const apiKey = String(creds.apiKey || '');
        const email = String(creds.customerEmail || '');
        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i);
            if (operation === 'validate') {
                const body = {
                    countryCode: String(this.getNodeParameter('countryCode', i)),
                    vatNumber: String(this.getNodeParameter('vatNumber', i)),
                };
                const res = await this.helpers.httpRequest({
                    method: 'POST',
                    url: 'https://plus.vatfix.eu/vat/lookup',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey,
                        'x-customer-email': email,
                    },
                    body,
                    json: true,
                });
                returnData.push({ json: res });
            }
            if (operation === 'reset') {
                const res = await this.helpers.httpRequest({
                    method: 'POST',
                    url: 'https://plus.vatfix.eu/reset',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey,
                        'x-customer-email': email,
                    },
                    json: true,
                });
                returnData.push({ json: res });
            }
        }
        return [returnData];
    }
}
exports.Vatfix = Vatfix;
