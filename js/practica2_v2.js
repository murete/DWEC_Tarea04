// practica2_v2.js
// Versión mejorada aplicando observaciones del profesor
// Uso de generadores, manejo de excepciones y comentarios

import { EntidadFactory, filtrarEntidadesPorTipo } from './entidades_v2.js';

// Colección de entidades (Flyweight) para práctica 2
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

// Ordenar entidades por tipo (sin reconstruir array)
function* entidadesOrdenadasPorTipo() {
    const ordenadas = [...coleccionEntidades].sort((a, b) => a.tipo.localeCompare(b.tipo));
    for (const entidad of ordenadas) {
        yield entidad;
    }
}

// Testeo profundo
function test() {
    console.log('--- Testeo profundo práctica 2 ---');
    add(EntidadFactory.getEntidad('X', 'tipoA'));
    add(EntidadFactory.getEntidad('Y', 'tipoB'));
    add(EntidadFactory.getEntidad('Z', 'tipoA'));
    add(EntidadFactory.getEntidad('W', 'tipoC'));

    console.log('Listado de entidades:');
    for (const e of listarEntidades()) {
        console.log(e);
    }

    console.log('Entidades ordenadas por tipo:');
    for (const e of entidadesOrdenadasPorTipo()) {
        console.log(e);
    }

    console.log('Filtrar por tipoA:');
    for (const e of filtrarEntidadesPorTipo('tipoA')) {
        console.log(e);
    }

    try {
        addAt(EntidadFactory.getEntidad('V', 'tipoD'), 1);
    } catch (err) {
        console.log('Excepción esperada en addAt:', err.message);
    }
}

test();
