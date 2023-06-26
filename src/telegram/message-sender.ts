import fetch from 'node-fetch';

export function createMessageSender(botToken: string): (chatId: number, text: string) => Promise<void> {
	return async (chatId: number, text: string) => {
		const result = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text,
				parse_mode: 'MarkdownV2',
			}),
		});

		const a = await result.json();
		console.log('Result:', a)
	};
}