import fetch from 'node-fetch';

interface GoldenCrownExchangeRateResponse {
	exchangeRate: number;
}

export async function createGoldenCrownExchangeRateHandler(): Promise<GoldenCrownExchangeRateResponse> {
	const response = await fetch('https://koronapay.com/transfers/online/api/transfers/tariffs?sendingCountryId=RUS&sendingCurrencyId=810&receivingCountryId=GEO&receivingCurrencyId=981&paymentMethod=debitCard&receivingAmount=100&receivingMethod=cash&paidNotificationEnabled=false');

	return (await response.json()) as GoldenCrownExchangeRateResponse;
}
