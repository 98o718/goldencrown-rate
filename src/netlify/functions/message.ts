import { builder, Handler, HandlerEvent } from '@netlify/functions';

const messageHandler: Handler = async (event: HandlerEvent) => {
	console.log(event);

	return {
		statusCode: 200,
		body: JSON.stringify({ message: 'Hello World' }),
	}
};

export const handler = builder(messageHandler);
