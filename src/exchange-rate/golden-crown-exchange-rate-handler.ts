interface GoldenCrownExchangeRateResponse {
	exchangeRate: number;
}

export async function getGoldenCrownExchangeRate(): Promise<GoldenCrownExchangeRateResponse> {
	console.log('make GC request');

	const url = new URL('https://koronapay.com/transfers/online/api/transfers/tariffs');

	url.searchParams.append('sendingCountryId', 'RUS');
	url.searchParams.append('sendingCurrencyId', '810');
	url.searchParams.append('receivingCountryId', 'GEO');
	url.searchParams.append('receivingCurrencyId', '981');
	url.searchParams.append('paymentMethod', 'debitCard');
	url.searchParams.append('receivingAmount', '100');
	url.searchParams.append('receivingMethod', 'cash');
	url.searchParams.append('paidNotificationEnabled', 'false');

	const response = await fetch(url);

	console.log('url', url.href)

	console.log('got GC response with status', response.status);

	console.log(await response.clone().text())

	const currencyRates = (await response.json()) as GoldenCrownExchangeRateResponse[];

	console.log('response parsed');

	return currencyRates[0];
}
