// Функция для сортировки массива объектов по заданному ключу
function getSortedArray(array, key) {
    // Создаем копию массива и сортируем его
    return array.slice().sort((a, b) => { //slice-извлекаем элементы не включая начального
        // Получаем значение по ключу для первого объекта
        const valueA = a[key];
        // Получаем значение по ключу для второго объекта
        const valueB = b[key];

        // Проверяем, являются ли оба значения строками
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            // Если да, то сравниваем строки с учетом локали
            return valueA.localeCompare(valueB); // Сравнение строк учитывая их порядок в алфавите
        } else {
            // Если значения не строки, предполагаем, что это числа и сравниваем их
            return valueA - valueB; // Сравнение чисел
        }
    });
}

// Исходный массив данных с объектами
const data = [
    { name: 'Arina', age: 40 }, 
    { name: 'Kirill', age: 20 }, 
    { name: 'Gaya', age: 18 },    
];

// Сортируем массив по имени и сохраняем результат в переменную
const sortedByName = getSortedArray(data, 'name');
// Выводим отсортированный массив
console.log('Отсортировано по имени:');
sortedByName.forEach(item => {
    console.log(`Имя: ${item.name}, Возраст: ${item.age}`); // Выводим имя и возраст каждого объекта
});

// Сортируем массив по возрасту и сохраняем результат в переменную
const sortedByAge = getSortedArray(data, 'age');
// Выводим отсортированный массив по возрасту в виде столбика
console.log('Отсортировано по возрасту:');
sortedByAge.forEach(item => {
    console.log(`Имя: ${item.name}, Возраст: ${item.age}`); // Выводим имя и возраст каждого объекта
});