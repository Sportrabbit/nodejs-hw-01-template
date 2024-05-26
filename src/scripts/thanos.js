import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs';
import path from 'path';

export const thanos = async () => {
    try {
        const dbFilePath = path.resolve(PATH_DB);

        if (!fs.existsSync(dbFilePath)) {
            console.error(`Файл бази даних не знайдено за шляхом: ${dbFilePath}`);
            return ;
        }

        const data = await fs.promises.readFile(dbFilePath,'utf-8');
        let contacts = JSON.parse(data);

        for (let i = 0; i < contacts.length; i++) {
            if (Math.random() < 0.5) {
                contacts.splice(i, 1);
                i--;
            }
        }

        await fs.promises.writeFile(dbFilePath, JSON.stringify(contacts, null, 2),'utf-8');
        
        console.log('Половина контактів було успішно видалено.');
    } catch (error) {
        console.error('Помилка при отриманні контактів:', error);
    }
};

thanos().then(() => {
    console.log('Виконання завершено.');
}).catch ((error) => {
    console.error('Помилка при виконанні функції thanos:', error);
});
