import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class VatfixApi implements ICredentialType {
	name = 'vatfixApi';
	displayName = 'VATFix Plus API';
	properties: INodeProperties[] = [
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
