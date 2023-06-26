interface Dependencies {
	exchangeRateGetter(): Promise<number>;
	messageSender(chatId: number, text: string): Promise<void>;
}

export function createExchangeRateMessageSender(dependencies: Dependencies): (chatId: number) => Promise<void> {
	const {
		exchangeRateGetter: getExchangeRate,
		messageSender: sendMessage,
	} = dependencies;

	return async (chatId: number) => {
		const exchangeRate = await getExchangeRate();

		const exchangeRateMessage = `Курс GEL/USD: **${exchangeRate}₽**`;

		await sendMessage(chatId, exchangeRateMessage);
	};
}
