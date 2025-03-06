// Preludio
const alumno = {nombre: "Francisco", apellido: "Moreno", curso: "web"};

// Ejercicio 1
console.log("---- Ejer 1 ----");
console.log(alumno.nombre);
console.log(alumno.apellido);
console.log(alumno.curso);

// Ejercicio 2
console.log("---- Ejer 2 ----");
const {nombre, apellido, curso} = alumno;
console.log(nombre);
console.log(apellido);
console.log(curso);

// Ejerciio 3
console.log("---- Ejer 3 ----");
alumno.print = function(){
    console.log(this.nombre + " " + this.apellido);
}
alumno.print()

// Ejercicio 4
console.log(" ---- Ejer 4 ----");
const ul = document.getElementById('list');
const li = document.createElement('li)');
li.innerHTML = `${alumno.nombre} ${alumno.apellido} (${alumno.curso})`;
ul.appendChild(li);
