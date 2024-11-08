function gcd(a, b) {
    if (a < 0 || b < 0) {
        throw new Error("Оба числа должны быть неотрицательными.");
    }

    // алгоритм евклида
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}

console.log(gcd(2442, 52432)); 
console.log(gcd(22, 44)); 
console.log(gcd(354238645, 234618)); 