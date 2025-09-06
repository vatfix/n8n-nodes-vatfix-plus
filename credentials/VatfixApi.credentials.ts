import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class VatfixApi implements ICredentialType {
	name = 'vatfixApi';
	displayName = 'VATFix Plus account';

	// force-cast string to Icon type
	icon: any = 'file:assets/vatfix.svg';

	documentationUrl = 'https://plus.vatfix.eu/plus';

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
			displayName: 'Customer Email',
			name: 'customerEmail',
			type: 'string',
			default: '',
			placeholder: 'store@yourdomain.tld',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{ $credentials.apiKey }}',
				'x-customer-email': '={{ $credentials.customerEmail }}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://plus.vatfix.eu',
			url: '/status.json',
		},
	};
}
