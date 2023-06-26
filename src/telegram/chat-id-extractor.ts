import { HandlerEvent } from '@netlify/functions';

export function extractChatId(event: HandlerEvent): number {
	if (event.body === null) {
		throw new Error('There is no event body');
	}

	return JSON.parse(event.body).message.chat.id;
}
