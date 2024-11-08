function pluralizeRecords(n) {
    let word;
    
    if (n % 10 === 1 && n % 100 !== 11) {
        word = "запись"; 
    } else if ((n % 10 >= 2 && n % 10 <= 4) && (n % 100 < 12 || n % 100 > 14)) {
        word = "записи"; 
    } else {
        word = "записей"; 
    }
    
    
    return `В результате выполнения запроса было найдено ${n} ${word}`;
}


console.log(pluralizeRecords(1));   
console.log(pluralizeRecords(4));   
console.log(pluralizeRecords(7));   
console.log(pluralizeRecords(101));  
