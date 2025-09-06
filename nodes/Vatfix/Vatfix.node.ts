import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { vatfixNodeDescription } from './VatfixDescription';
import { ValidateInput } from './Vatfix.interface';

export class Vatfix implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'VATFix Plus',
		name: 'vatfix',
		icon: 'file:vatfix.svg',
		group: ['transform'],
		version: 1,
		description: 'Real-time EU VAT Validation numbers with VATFix Plus',
		defaults: {
			name: 'VATFix Plus',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'vatfixApi', required: true }],
		properties: vatfixNodeDescription,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const creds = await this.getCredentials('vatfixApi');
		const apiKey = String(creds.apiKey || '');
		const email  = String(creds.customerEmail || '');

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as string;

			if (operation === 'validate') {
				const body: ValidateInput = {
					countryCode: String(this.getNodeParameter('countryCode', i)),
					vatNumber:   String(this.getNodeParameter('vatNumber', i)),
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
