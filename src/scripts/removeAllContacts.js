import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs';
import path from 'path';

export const removeAllContacts = async () => {
    try {
        const dbFilePath = path.resolve(PATH_DB);

        if (!fs.existsSync(dbFilePath)) {
            console.error(`Файл бази даних не знайдено за шляхом: ${dbFilePath}`);
            return ;
        }

        await fs.promises.writeFile(dbFilePath, '[]','utf-8');

    } catch (error) {
        console.error('Помилка при отриманні контактів:', error);
    }
};

removeAllContacts().then(() => {
    console.log('Видалення завершено.');
}).catch((error) => {
    console.error('Помилка при виконанні функції removeAllContacts:', error);
});
