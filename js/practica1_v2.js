// practica1_v2.js
// Versión mejorada aplicando observaciones del profesor
// Uso de generadores, manejo de excepciones y comentarios

import { EntidadFactory, filtrarEntidadesPorTipo } from './entidades_v2.js';

// Colección de entidades (Flyweight)
const coleccionEntidades = [];

// Añadir entidad al final
function add(entidad) {
    coleccionEntidades.push(entidad);
}

// Añadir entidad en una posición específica (no permitido)
function addAt(entidad, index) {
    throw new Error('La operación addAt no está permitida.');
}

// Listar entidades usando generador
function* listarEntidades() {
    for (const entidad of coleccionEntidades) {
        yield entidad;
    }
}

// Ordenar entidades por nombre (sin reconstruir array)
function* entidadesOrdenadasPorNombre() {
    // Creamos un array de referencias ordenadas, pero devolvemos con yield
    const ordenadas = [...coleccionEntidades].sort((a, b) => a.nombre.localeCompare(b.nombre));
    for (const entidad of ordenadas) {
        yield entidad;
    }
}

// Testeo profundo
function test() {
    console.log('--- Testeo profundo ---');
    add(EntidadFactory.getEntidad('A', 'tipo1'));
    add(EntidadFactory.getEntidad('B', 'tipo2'));
    add(EntidadFactory.getEntidad('C', 'tipo1'));
    add(EntidadFactory.getEntidad('D', 'tipo3'));

    console.log('Listado de entidades:');
    for (const e of listarEntidades()) {
        console.log(e);
    }

    console.log('Entidades ordenadas por nombre:');
    for (const e of entidadesOrdenadasPorNombre()) {
        console.log(e);
    }

    console.log('Filtrar por tipo1:');
    for (const e of filtrarEntidadesPorTipo('tipo1')) {
        console.log(e);
    }

    try {
        addAt(EntidadFactory.getEntidad('E', 'tipo4'), 1);
    } catch (err) {
        console.log('Excepción esperada en addAt:', err.message);
    }
}

test();
