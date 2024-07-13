import fetch from 'node-fetch';

interface GoldenCrownExchangeRateResponse {
	exchangeRate: number;
}

export async function getGoldenCrownExchangeRate(): Promise<GoldenCrownExchangeRateResponse> {
	console.log('make GC request');

	const response = await fetch('https://koronapay.com/transfers/online/api/transfers/tariffs?sendingCountryId=RUS&sendingCurrencyId=810&receivingCountryId=GEO&receivingCurrencyId=981&paymentMethod=debitCard&receivingAmount=100&receivingMethod=cash&paidNotificationEnabled=false');

	console.log('got GC response with status', response.status);

	console.log(await response.clone().text())

	const currencyRates = (await response.json()) as GoldenCrownExchangeRateResponse[];

	console.log('response parsed');

	return currencyRates[0];
}
