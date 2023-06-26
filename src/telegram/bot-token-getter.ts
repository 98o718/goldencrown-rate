export function getBotToken(): string {
	if (process.env.BOT_TOKEN === undefined) {
		throw new Error('There is no bot token');
	}

	return process.env.BOT_TOKEN;
}
