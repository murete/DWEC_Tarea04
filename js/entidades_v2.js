// entidades_v2.js
// Versión mejorada aplicando observaciones del profesor
// Implementación ligera (Flyweight), uso de generadores y comentarios

class EntidadFlyweight {
    constructor(nombre, tipo) {
        this.nombre = nombre;
        this.tipo = tipo;
    }
}

// Factoría para entidades (Flyweight)
const EntidadFactory = (function () {
    const entidades = new Map();
    return {
        getEntidad: function (nombre, tipo) {
            const key = nombre + '-' + tipo;
            if (!entidades.has(key)) {
                entidades.set(key, new EntidadFlyweight(nombre, tipo));
            }
            return entidades.get(key);
        },
        getAll: function* () {
            for (const entidad of entidades.values()) {
                yield entidad;
            }
        }
    };
})();

// Ejemplo de uso de generadores para filtrar entidades
function* filtrarEntidadesPorTipo(tipo) {
    for (const entidad of EntidadFactory.getAll()) {
        if (entidad.tipo === tipo) {
            yield entidad;
        }
    }
}

// Exportación para uso en otros módulos
export { EntidadFlyweight, EntidadFactory, filtrarEntidadesPorTipo };