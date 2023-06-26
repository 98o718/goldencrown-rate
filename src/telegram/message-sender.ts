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
		await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text,
				parse_mode: 'MarkdownV2',
			}),
		});
	};
}