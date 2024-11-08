function cesar(str, shift, action) {
    // Определяем русский алфавит
    const alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    
    // Получаем длину алфавита
    const alphabetLength = alphabet.length;

    // Приводим сдвиг к диапазону длины алфавита
    shift = shift % alphabetLength;

    // Разбиваем строку на массив символов и обрабатываем каждый символ
    const result = str.split('').map(char => {
        // Находим индекс текущего символа в алфавите (в нижнем регистре)
        const index = alphabet.indexOf(char.toLowerCase());
        
        // Если символ не найден в алфавите, возвращаем его без изменений
        if (index === -1) {
            return char;
        }

        let newIndex; // Переменная для хранения нового индекса символа

        // Проверяем, какое действие нужно выполнить (шифрование или расшифровка)
        if (action === 'encode') {
            // Для шифрования: сдвигаем индекс вправо
            newIndex = (index + shift) % alphabetLength;
        } else if (action === 'decode') {
            // Для расшифровки: сдвигаем индекс влево
            newIndex = (index - shift + alphabetLength) % alphabetLength;
        } else {
            // Если действие неверное, выбрасываем ошибку
            throw new Error("Неверное действие. Используй 'encode' или 'decode'.");
        }

        // Получаем новый символ из алфавита по новому индексу
        const newChar = alphabet[newIndex];

        // Возвращаем новый символ с сохранением регистра исходного символа
        return char === char.toUpperCase() ? newChar.toUpperCase() : newChar;
    });

    // Объединяем массив символов обратно в строку и возвращаем результат
    return result.join('');
}

// Пример использования функции для дешифровки сообщения
const encodedMessage = cesar("эзтыхз фзъзъз", 3, 'decode'); // Дешифруем сообщение
console.log(encodedMessage); 