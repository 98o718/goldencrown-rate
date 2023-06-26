import { Handler, HandlerEvent } from '@netlify/functions';

import { getGoldenCrownExchangeRate } from '../../exchange-rate/golden-crown-exchange-rate-handler';
import { createExchangeRateGetter } from '../../exchange-rate/exchange-rate-getter';
import { createMessageSender } from '../../telegram/message-sender';
import { createExchangeRateMessageSender } from '../../telegram/exchange-rate-message-sender';
import { extractChatId } from '../../telegram/chat-id-extractor';
import { getBotToken } from '../../telegram/bot-token-getter';
import { escapeMDString } from '../../telegram/md-string-escaper';

const messageHandler: Handler = async (event: HandlerEvent) => {
	try {
		const exchangeRateGetter = createExchangeRateGetter({
			goldenCrownExchangeRateGetter: getGoldenCrownExchangeRate,
		});

		const messageSender = createMessageSender(getBotToken());

		const sendExchangeRateMessage = createExchangeRateMessageSender({
			messageSender,
			exchangeRateGetter,
			mdStringEscaper: escapeMDString,
		});
	
		await sendExchangeRateMessage(extractChatId(event));

		return { statusCode: 200 };
	} catch (error: unknown) {
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
