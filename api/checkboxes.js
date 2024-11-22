import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'checkboxes.json'); // Ajuste o caminho

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const data = await readFile(filePath, 'utf8');
            res.status(200).json(JSON.parse(data));
        } catch (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).json({ error: 'Erro ao ler o arquivo' });
        }
    } else if (req.method === 'POST') {
        const newState = req.body;

        try {
            await writeFile(filePath, JSON.stringify(newState, null, 2));
            res.status(200).json({ message: 'Estado atualizado com sucesso' });
        } catch (err) {
            console.error('Erro ao escrever no arquivo:', err);
            res.status(500).json({ error: 'Erro ao escrever no arquivo' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}