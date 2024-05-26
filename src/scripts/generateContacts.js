import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs';
import path from 'path';
import {createFakeContact} from '../utils/createFakeContact.js';

const generateContacts = async (number) => {
    try {
        const dbFilePath = path.resolve(PATH_DB);

        const data = await fs.promises.readFile(dbFilePath, 'utf-8');
        const contacts = JSON.parse(data);

        const newContacts = [];
        for (let i = 0; i < number; i++) {
            newContacts.push(createFakeContact());
        }

        const updatedContacts = contacts.concat(newContacts);

        await fs.promises.writeFile(dbFilePath, JSON.stringify(updatedContacts, null, 2), 'utf-8');

        console.log(`${number} контактів було успішно згенеровано і додано до бази даних.`);
    } catch (error) {
        console.error('Помилка при генерації контактів:', error);
    }
};

export {generateContacts};

generateContacts(5).then(() => {
    console.log('Генерація завершена.');
}).catch((error) => {
    console.error('Помилка при виконанні функції generateContacts:', error);
});
