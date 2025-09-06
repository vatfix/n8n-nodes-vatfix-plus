import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class Vatfix implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'VATFix Plus',
    name: 'vatfix',
    icon: 'file:vatfix.svg',
    group: ['transform'],
    version: 1,
    description: 'EU VAT validation via VATFix Plus',
    defaults: {
      name: 'VATFix Plus',
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
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

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const creds = await this.getCredentials('vatfixApi'); // expects VatfixApi.credentials.ts -> name = 'vatfixApi'
    const apiKey = String((creds as any).apiKey || '').trim();
    const baseUrl = String((creds as any).baseUrl || 'https://plus.vatfix.eu').replace(/\/+$/, '');

    for (let i = 0; i < items.length; i++) {
      const countryCode = this.getNodeParameter('countryCode', i) as string;
      const vatNumber = this.getNodeParameter('vatNumber', i) as string;
      const customerEmail = this.getNodeParameter('customerEmail', i) as string;
      const endpoint = this.getNodeParameter('endpoint', i) as string;

      const url = `${baseUrl}/vat/${endpoint}`;
      const options = {
        method: 'POST',
        url,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'x-customer-email': customerEmail,
        } as Record<string, string>,
        body: {
          countryCode,
          vatNumber,
        },
        json: true,
      };

      try {
        const resp = await this.helpers.httpRequest(options as any);
        returnData.push({ json: { input: { countryCode, vatNumber }, result: resp } });
      } catch (err: any) {
        const status = err?.statusCode || err?.status || 500;
        const data = err?.response?.body || err?.message || 'request_failed';
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
