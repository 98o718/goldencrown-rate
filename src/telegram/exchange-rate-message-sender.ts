interface Dependencies {
	exchangeRateGetter(): Promise<number>;
	messageSender(chatId: number, text: string): Promise<void>;
	mdStringEscaper(value: string): string;
}

export function createExchangeRateMessageSender(dependencies: Dependencies): (chatId: number) => Promise<void> {
	const {
		exchangeRateGetter: getExchangeRate,
		messageSender: sendMessage,
		mdStringEscaper: escapeMDString,
	} = dependencies;

	return async (chatId: number) => {
		const exchangeRate = await getExchangeRate();

		const exchangeRateMessage = `GEL/RUB: *${escapeMDString(exchangeRate.toString())}₽*`;

		await sendMessage(chatId, exchangeRateMessage);
	};
}
