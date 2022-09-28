class Usuario {
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    
    getFullName() {
        return console.log(`El nombre del usuario es: ${this.nombre} ${this.apellido}`);
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return console.log(`Tiene ${this.mascotas.length} mascotas`)
    }

    addBook() {
        this.libros.push({nombre: "Encuentros", autor: "Gabriel Rolon"})
    }

    getBookNames() {
        let arrayLibros = []
        this.libros.forEach((e) => arrayLibros.push(e.nombre, e.autor));
        return arrayLibros;
    }

    showBook(name) {
        name.forEach((nombre) => console.log(`El nombre del libro es: ${nombre}`));
    }

    showAuthorBook (author) {
        author.forEach((autor) => console.log(`Del autor ${autor}`))
    }
}

const usuario1 = new Usuario("Sabina", "Etcheverry");

usuario1.getFullName();
usuario1.addMascota("perro", "gato");
usuario1.countMascotas();
usuario1.addBook();
let arrayLibros = usuario1.getBookNames()
usuario1.showBook(arrayLibros);
usuario1.showAuthorBook(arrayLibros);


