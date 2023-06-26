interface GoldenCrownExchangeRateResponse {
	exchangeRate: number;
}

interface Dependencies {
	goldenCrownExchangeRateGetter(): Promise<GoldenCrownExchangeRateResponse>;
}

export function createExchangeRateGetter(dependencies: Dependencies): () => Promise<number> {
	const {
		goldenCrownExchangeRateGetter: getGoldenCrownExchangeRate,
	} = dependencies;

	return async () => {
		const { exchangeRate } = await getGoldenCrownExchangeRate();
	
		return exchangeRate;
	}
}
