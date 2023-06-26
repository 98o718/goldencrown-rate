
interface ExchangeRate {
	value: number;
}

interface GoldenCrownExchangeRateResponse {
	exchangeRate: number;
}

interface Dependencies {
	getGoldenCrownExchangeRate(amount?: number): Promise<GoldenCrownExchangeRateResponse>;
}

export function createExchangeRateHandler(dependencies: Dependencies): (amount?: number) => Promise<ExchangeRate> {
	const { getGoldenCrownExchangeRate } = dependencies;

	return async (amount?: number) => {
		const { exchangeRate } = await getGoldenCrownExchangeRate(amount);
	
		return {
			value: exchangeRate,
		};
	}
}
