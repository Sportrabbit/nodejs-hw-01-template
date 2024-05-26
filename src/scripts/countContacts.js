import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs';
import path from 'path';

export const countContacts = async () => {
    try {
        const dbFilePath = path.resolve(PATH_DB);

        if (!fs.existsSync(dbFilePath)) {
            console.error(`Файл бази даних не знайдено за шляхом: ${dbFilePath}`);
            return 0;
        }

        const data = await fs.promises.readFile(dbFilePath, 'utf-8');
        const contacts = JSON.parse(data);

        return contacts.length;
    } catch (error) {
        console.error('Помилка при отриманні контактів:', error);
        return 0;
    }
};

countContacts().then((count) => {
    console.log(`Кількість контактів: ${count}`);
}).catch((error) => {
    console.error('Помилка при виконанні функції countContacts:', error);
});
