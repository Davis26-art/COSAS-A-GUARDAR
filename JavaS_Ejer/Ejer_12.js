let fruta = ['Manzana', 'Piña', 'Durazno', 'Pera', 'Uva', 'Mora', 'Abano', 'Naranja', 'Mandarina'];

for (let i = 0; i < fruta.length; i++) {
    console.log(fruta[i])
}

while (fruta.length > 0) {
    const frutas = fruta.shift();
    console.log(frutas)
}

fruta.forEach(frutas => {
    console.log(frutas)
});