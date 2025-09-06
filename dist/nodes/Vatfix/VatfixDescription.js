"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vatfixNodeDescription = void 0;
exports.vatfixNodeDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
            { name: 'Validate VAT', value: 'validate', description: 'Validate EU VAT number via VIES' },
            { name: 'Reset API Key', value: 'reset', description: 'Rotate your VATFix Plus API key' },
        ],
        default: 'validate',
    },
    {
        displayName: 'Country Code',
        name: 'countryCode',
        type: 'string',
        default: 'DE',
        displayOptions: { show: { operation: ['validate'] } },
    },
    {
        displayName: 'VAT Number',
        name: 'vatNumber',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { operation: ['validate'] } },
    },
];
