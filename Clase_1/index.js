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

    addBook(libro) {
        this.libros.push(libro)
    }

    getBookNames() {
        const arrayLibros= this.libros.map(arrayNuevo => arrayNuevo.name)
    }

    showBook() {
      this.libros.forEach((unLibro) => {
        console.log(`El nombre del libro es: "${unLibro.name}" y el autor es "${unLibro.autor}"`);
      })
    }
}

const usuario1 = new Usuario("Sabina", "Etcheverry");

usuario1.addBook({ name: "Encuentros", autor: "Gabriel Rolon"})

usuario1.getFullName();
usuario1.addMascota("perro");
usuario1.addMascota("gato");
usuario1.countMascotas();
let arrayLibros = usuario1.getBookNames()
usuario1.showBook();


