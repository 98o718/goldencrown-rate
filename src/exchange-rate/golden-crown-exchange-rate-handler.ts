import fetch from 'node-fetch';

interface GoldenCrownExchangeRateResponse {
	exchangeRate: number;
}

export async function getGoldenCrownExchangeRate(): Promise<GoldenCrownExchangeRateResponse> {
	const response = await fetch('https://koronapay.com/transfers/online/api/transfers/tariffs?sendingCountryId=RUS&sendingCurrencyId=810&receivingCountryId=GEO&receivingCurrencyId=981&paymentMethod=debitCard&receivingAmount=100&receivingMethod=cash&paidNotificationEnabled=false');

	const currencyRates = (await response.json()) as GoldenCrownExchangeRateResponse[];

	return currencyRates[0];
}
