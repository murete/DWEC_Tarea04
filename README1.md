UT04 Práctica 1: Objetos listas
1. Listas
Dada la práctica de la UT03.1 para la implementación de Listas y Listas Ordenadas tendrás que
rediseñar el código para implementarlas mediante objetos, es decir, deberás mantener la
funcionalidad, pero implementarlas utilizando objetos.
La implementación debe ser una estructura jerárquica de clases
tal y como se muestra en la imagen. La clase List debe permitir
trabajar con cualquier tipo de valor, ya sea valores primitivos u
objetos, lo único que debemos tener en cuenta es la capacidad
total del número de elemento que admite el objeto List .
El tipo ObjectList es una subclase de List. Debemos
heredar toda la funcionalidad del tipo List y sobrescribir la
especifica que necesitemos. Para el tipo ObjetctList
tenemos una propiedad type que nos indica el tipo de objetos
que admite la lista.
Por último, el tipo OrderedObjectList recibe como
propiedad la una función que permitirá ordenar la lista en base a ella, quedando almacenada en
la propiedad order.
Deberás implementar un conjunto de excepciones en forma de objeto para comunicar errores.
Los objetos para representar las excepciones deben ser específicos de la práctica, no errores
genéricos.
El array que alberga los objetos para implementar la lista deberá ser un campo privado para
prevenir que pueda ser alterado desde fuera del objeto.
2. Rúbrica y recursos solicitados
Para verificar el funcionamiento de los tres tipos de objetos deberás implementar una función
de testeo donde verifiques todos los métodos. No será necesario implementar interfaz gráfica,
tan solo validar el funcionamiento utilizando la consola. Si no se implementa esta función de
testeo, la nota del ejercicio será un 0, independientemente de que las funciones estén bien
implementadas.
Ejercicio Nota
Implementación de función de testeo completa de toda la funcionalidad
requerida.
1
Jerarquía de objetos 2
Array como campo privado 1
Sobrescribir únicamente métodos necesarios en ObjectList 2
Sobrescribir únicamente métodos necesarios en OrderedObjectList 2
Excepciones 1
Código comentado 1
Tabla 1 Rúbrica
