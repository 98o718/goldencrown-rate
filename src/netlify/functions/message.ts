import fetch from 'node-fetch';
import { Handler, HandlerEvent } from '@netlify/functions';

import { createExchangeRateHandler } from '../../exchange-rate/exchange-rate-handler';
import { getGoldenCrownExchangeRate } from '../../exchange-rate/golden-crown-exchange-rate-handler';

const messageHandler: Handler = async (event: HandlerEvent) => {
	if (event.body === null) {
		return { statusCode: 200 };
	}

	const exchangeRateHandler = createExchangeRateHandler({ getGoldenCrownExchangeRate });

	const { value } = await exchangeRateHandler();

	console.log('token', process.env.BOT_TOKEN)

	const messageResponse = await fetch('https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			chat_id: JSON.parse(event.body).message.chat.id,
			text: `Курс GEL/USD: ${value}₽`,
		})
	});

	const message = await messageResponse.json();
	console.log('message', message)

	return { statusCode: 200 };
};

export { messageHandler as handler };
