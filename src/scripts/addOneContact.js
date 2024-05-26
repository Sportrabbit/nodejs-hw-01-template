import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs';
import path from 'path';
import {createFakeContact} from '../utils/createFakeContact.js';

export const addOneContact = async () => {
    try {

        const dbFilePath = path.resolve(PATH_DB);
        
        if (!fs.existsSync(dbFilePath)) {
            console.log(`Файл бази даних не знайдено. Створення нового файлу за шляхом: ${dbFilePath}`);
        await fs.promises.writeFile(dbFilePath, JSON.stringify(contacts, null, 2), 'utf-8');
    }
    
    const newContact = createFakeContact();
    
    const data = await fs.promises.readFile(dbFilePath, 'utf-8');
    const contacts = JSON.parse(data);
    
    contacts.push(newContact);
    
    await fs.promises.writeFile(dbFilePath, JSON.stringify(contacts, null, 2), 'utf-8');
    
        console.log('Один контакт було успішно додано до бази даних.');
    } catch (error) {
        console.error('Помилка при додаванні контакту:', error);
    }
};

addOneContact().then(() => {
    console.log('Додавання завершено.');
}).catch((error) => {
    console.error('Помилка при виконанні функції addOneContact:', error);
});
