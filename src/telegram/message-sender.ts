import fetch from 'node-fetch';

interface Dependencies {
	botToken: string;
	chatId: number;
}

export function createMessageSender(dependencies: Dependencies): (text: string) => Promise<void> {
	const {
		botToken,
		chatId,
	} = dependencies;

	return async (text: string) => {
		console.log('sending message');

		await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text,
				parse_mode: 'MarkdownV2',
			}),
		});

		console.log('message sent');
	};
}