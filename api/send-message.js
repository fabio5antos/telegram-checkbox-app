import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token, chatId, message } = req.body;

        try {
            const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                return res.status(response.status).json(data);
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao enviar mensagem.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}