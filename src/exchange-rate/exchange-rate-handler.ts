
interface ExchangeRate {
	value: number;
}

interface GoldenCrownExchangeRateResponse {
	exchangeRate: number;
}

interface Dependencies {
	getGoldenCrownExchangeRate(): Promise<GoldenCrownExchangeRateResponse>;
}

export function createExchangeRateHandler(dependencies: Dependencies): () => Promise<ExchangeRate> {
	const { getGoldenCrownExchangeRate } = dependencies;

	return async () => {
		const { exchangeRate } = await getGoldenCrownExchangeRate();
	
		return {
			value: exchangeRate,
		};
	}
}
