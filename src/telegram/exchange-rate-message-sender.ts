interface Dependencies {
	exchangeRateGetter(): Promise<number>;
	messageSender(text: string): Promise<void>;
	mdStringEscaper(value: string): string;
}

export function createExchangeRateMessageSender(dependencies: Dependencies): () => Promise<void> {
	const {
		exchangeRateGetter: getExchangeRate,
		messageSender: sendMessage,
		mdStringEscaper: escapeMDString,
	} = dependencies;

	return async () => {
		const exchangeRate = await getExchangeRate();

		console.log('got rate', exchangeRate);

		const exchangeRateMessage = `GEL/RUB: *${escapeMDString(exchangeRate.toString())}₽*`;

		await sendMessage(exchangeRateMessage);
	};
}
