// Функция pow, которая возводит x в степень n
function pow(x, n) {
    // Проверяем, является ли n натуральным числом
    if (n < 1 || !Number.isInteger(n)) { //!Number.isInteger возвращает true, если переданное значение не является целым числом
        throw new Error("n должно быть натуральным числом.");
    }

    let result = 1; // Начальное значение результата

    // Умножаем x на себя n раз
    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result; // Возвращаем результат
}

// Примеры использования функции
console.log(pow(7, 2)); 
console.log(pow(6, 3)); 
console.log(pow(5, 5)); 