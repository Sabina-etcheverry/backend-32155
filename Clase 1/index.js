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

    addMascota() {
        this.mascotas.push("perro", "gato");
    }

    countMascotas() {
        return console.log(this.mascotas.length)
    }

    addBook() {
        this.libros.push({nombre: "Encuentros", autor: "Gabriel Rolon"})
    }

    getBookNames() {
        this.libros.forEach((e) => this.libros)
    }


}

const usuario1 = new Usuario("Sabina", "Etcheverry");

usuario1.getFullName();
usuario1.addMascota();
usuario1.countMascotas();
usuario1.addBook();
usuario1.getBookNames();


