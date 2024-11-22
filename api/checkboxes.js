const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'checkboxes.json');

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Lê o arquivo JSON e retorna o estado dos checkboxes
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao ler o arquivo' });
            }
            res.status(200).json(JSON.parse(data));
        });
    } else if (req.method === 'POST') {
        // Atualiza o arquivo JSON com o novo estado
        const newState = req.body;

        fs.writeFile(filePath, JSON.stringify(newState, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao escrever no arquivo' });
            }
            res.status(200).json({ message: 'Estado atualizado com sucesso' });
        });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}