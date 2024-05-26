import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs';
import path from 'path';

export const getAllContacts = async () => {
    try {
        const dbFilePath = path.resolve(PATH_DB);

        if (!fs.existsSync(dbFilePath)) {
            console.error(`Файл бази даних не знайдено за шляхом: ${dbFilePath}`);
            return [];
        }

        const data = await fs.promises.readFile(dbFilePath, 'utf-8');
        const contacts = JSON.parse(data);

        return contacts;
    } catch (error) {
        console.error('Помилка при отриманні контактів:', error);
        return [];
    }
};

getAllContacts().then((contacts) => {
    console.log('Усі контакти:');
    console.log(contacts);
}).catch((error) => {
    console.error('Помилка при виконанні функції getAllContacts:', error);
});
