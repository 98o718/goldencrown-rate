import { builder, Handler } from '@netlify/functions';

const messageHandler: Handler = async () => {
	return {
		statusCode: 200,
		body: JSON.stringify({ message: 'Hello World' }),
	}
};

export const handler = builder(messageHandler);
