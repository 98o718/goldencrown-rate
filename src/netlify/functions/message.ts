import { Handler, HandlerEvent } from '@netlify/functions';

import { getGoldenCrownExchangeRate } from '../../exchange-rate/golden-crown-exchange-rate-handler';
import { createExchangeRateGetter } from '../../exchange-rate/exchange-rate-getter';
import { createMessageSender } from '../../telegram/message-sender';
import { createExchangeRateMessageSender } from '../../telegram/exchange-rate-message-sender';
import { extractChatId } from '../../telegram/chat-id-extractor';
import { getBotToken } from '../../telegram/bot-token-getter';
import { escapeMDString } from '../../telegram/md-string-escaper';

const messageHandler: Handler = async (event: HandlerEvent) => {
	console.log('event', JSON.stringify(event, undefined, 4));

	try {
		const exchangeRateGetter = createExchangeRateGetter({
			goldenCrownExchangeRateGetter: getGoldenCrownExchangeRate,
		});

		console.log('created exchangeRateGetter');

		const messageSender = createMessageSender({
			botToken: getBotToken(),
			chatId: extractChatId(event),
		});

		console.log('created messageSender')

		const sendExchangeRateMessage = createExchangeRateMessageSender({
			messageSender,
			exchangeRateGetter,
			mdStringEscaper: escapeMDString,
		});

		console.log('created sendExchangeRateMessage')
	
		await sendExchangeRateMessage();

		console.log('message was sent');

		return { statusCode: 200 };
	} catch (error: unknown) {
		console.log('error', JSON.stringify(error, undefined, 4));

		const errorMessage = error instanceof Error
			? error.message
			: undefined;

		return {
			statusCode: 500,
			body: JSON.stringify({
				message: errorMessage || 'Unknown error',
			}),
		};
	}
};

export { messageHandler as handler };
