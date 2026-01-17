// --- EXCEPCIONES ESPECÍFICAS ---
class ListException {
  constructor(message) {
    this.name = "ListException";
    this.message = message;
  }
}

class CapacityException extends ListException {
  constructor() {
    super("La lista está llena.");
    this.name = "CapacityException";
  }
}

class EmptyListException extends ListException {
  constructor() {
    super("La lista está vacía.");
    this.name = "EmptyListException";
  }
}

class IndexOutOfBoundsException extends ListException {
  constructor() {
    super("El índice está fuera de los límites.");
    this.name = "IndexOutOfBoundsException";
  }
}

class TypeMismatchException extends ListException {
  constructor(expectedType) {
    super(`El elemento no es del tipo esperado: ${expectedType}`);
    this.name = "TypeMismatchException";
  }
}

// --- CLASE BASE LIST ---
class List {
  #elements; // campo privado

  constructor(maxCapacity = 5) {
    this.maxCapacity = maxCapacity;
    this.#elements = [];
  }

  // Métodos básicos
  isEmpty() {
    return this.#elements.length === 0;
  }
  isFull() {
    return this.#elements.length === this.maxCapacity;
  }
  size() {
    return this.#elements.length;
  }
  capacity() {
    return this.maxCapacity;
  }

  // Añadir elementos
  add(elem) {
    if (this.isFull()) throw new CapacityException();
    this.#elements.push(elem);
    return this.size();
  }

  addAt(elem, index) {
    if (this.isFull()) throw new CapacityException();
    if (index < 0 || index > this.size()) throw new IndexOutOfBoundsException();
    this.#elements.splice(index, 0, elem);
    return this.size();
  }

  // Acceso y búsqueda
  get(index) {
    if (index < 0 || index >= this.size())
      throw new IndexOutOfBoundsException();
    return this.#elements[index];
  }

  toString() {
    return this.#elements.join(" - ");
  }
  indexOf(elem) {
    return this.#elements.indexOf(elem);
  }
  lastIndexOf(elem) {
    return this.#elements.lastIndexOf(elem);
  }

  // Limpieza y extremos
  clear() {
    this.#elements.length = 0;
  }
  firstElement() {
    if (this.isEmpty()) throw new EmptyListException();
    return this.#elements[0];
  }
  lastElement() {
    if (this.isEmpty()) throw new EmptyListException();
    return this.#elements[this.size() - 1];
  }

  // Eliminación y sustitución
  remove(index) {
    if (index < 0 || index >= this.size())
      throw new IndexOutOfBoundsException();
    return this.#elements.splice(index, 1)[0];
  }

  removeElement(elem) {
    let index = this.indexOf(elem);
    if (index !== -1) {
      this.#elements.splice(index, 1);
      return true;
    }
    return false;
  }

  set(elem, index) {
    if (index < 0 || index >= this.size())
      throw new IndexOutOfBoundsException();
    let old = this.#elements[index];
    this.#elements[index] = elem;
    return old;
  }
}

// --- SUBCLASE OBJECTLIST ---
class ObjectList extends List {
  constructor(type, maxCapacity = 5) {
    super(maxCapacity);
    this.type = type; // tipo esperado, ej: Book
  }

  #validateType(elem) {
    if (!(elem instanceof this.type)) {
      throw new TypeMismatchException(this.type.name);
    }
  }

  add(elem) {
    this.#validateType(elem);
    return super.add(elem);
  }
  addAt(elem, index) {
    this.#validateType(elem);
    return super.addAt(elem, index);
  }
  set(elem, index) {
    this.#validateType(elem);
    return super.set(elem, index);
  }
}

// --- SUBCLASE ORDEREDOBJECTLIST ---
class OrderedObjectList extends ObjectList {
  constructor(type, orderFn, maxCapacity = 5) {
    super(type, maxCapacity);
    this.order = orderFn;
  }

  add(elem) {
    super.add(elem);
    this.#sort();
    return this.size();
  }
  addAt(elem, index) {
    super.addAt(elem, index);
    this.#sort();
    return this.size();
  }
  set(elem, index) {
    super.set(elem, index);
    this.#sort();
    return this.size();
  }

  #sort() {
    let temp = [];
    for (let i = 0; i < this.size(); i++) {
      temp.push(this.get(i));
    }
    temp.sort(this.order);
    this.clear();
    temp.forEach((e) => super.add(e));
  }
}

// --- CLASE BOOK ---
class Book {
  constructor(ISBN, title, author, publicationDate, price) {
    this.ISBN = ISBN;
    this.title = title;
    this.author = author;
    this.publicationDate = publicationDate;
    this.price = price;
  }

  toString() {
    return `${this.title} (${this.ISBN})`;
  }
}

function testLists() {
  console.log("=== TESTEO COMPLETO DE LISTAS ===");

  // --- LISTA GENÉRICA ---
  console.log("\n--- Pruebas con List ---");
  let lista = new List(3);

  console.log("¿Lista vacía?", lista.isEmpty());
  console.log("Capacidad máxima:", lista.capacity());

  lista.add("A");
  lista.add("B");
  console.log("Contenido tras añadir A y B:", lista.toString());
  console.log("Tamaño actual:", lista.size());

  lista.addAt("C", 1); // Inserta en posición 1
  console.log("Contenido tras addAt(C,1):", lista.toString());

  console.log("Elemento en índice 0:", lista.get(0));
  console.log("Primer elemento:", lista.firstElement());
  console.log("Último elemento:", lista.lastElement());

  console.log("Índice de 'B':", lista.indexOf("B"));
  console.log("Último índice de 'B':", lista.lastIndexOf("B"));

  console.log("Eliminando índice 1:", lista.remove(1));
  console.log("Contenido tras remove:", lista.toString());

  console.log("Eliminando elemento 'A':", lista.removeElement("A"));
  console.log("Contenido tras removeElement:", lista.toString());

  lista.set("Z", 0);
  console.log("Contenido tras set(Z,0):", lista.toString());

  lista.clear();
  console.log(
    "Contenido tras clear:",
    lista.toString(),
    "¿Vacía?",
    lista.isEmpty()
  );

  // --- OBJECTLIST ---
  console.log("\n--- Pruebas con ObjectList ---");
  let objList = new ObjectList(Book, 3);

  let b1 = new Book(
    "978-84-9804-654-0",
    "Quijote",
    "Cervantes",
    new Date(1605, 0, 1),
    20
  );
  let b2 = new Book(
    "978-84-9804-654-1",
    "Hamlet",
    "Shakespeare",
    new Date(1601, 0, 1),
    15
  );
  let b3 = new Book(
    "978-84-9804-654-2",
    "Zafón",
    "Ruiz Zafón",
    new Date(2004, 0, 1),
    25
  );

  objList.add(b1);
  objList.addAt(b2, 1);
  console.log("Contenido ObjectList:", objList.toString());

  console.log("Primer libro:", objList.firstElement());
  console.log("Último libro:", objList.lastElement());

  console.log("Índice de Hamlet:", objList.indexOf(b2));
  console.log("Eliminando Hamlet:", objList.removeElement(b2));
  console.log("Contenido tras eliminar Hamlet:", objList.toString());

  objList.set(b3, 0);
  console.log("Contenido tras set(Zafón,0):", objList.toString());

  try {
    objList.add("Texto"); // Error: no es Book
  } catch (e) {
    console.error("Error esperado:", e.message);
  }

  // --- ORDEREDOBJECTLIST ---
  console.log("\n--- Pruebas con OrderedObjectList ---");
  let ordList = new OrderedObjectList(Book, (a, b) => a.price - b.price, 5);

  ordList.add(b1);
  ordList.add(b2);
  ordList.add(b3);
  console.log("Contenido ordenado por precio:", ordList.toString());

  let b4 = new Book(
    "978-84-9804-654-3",
    "Libro Caro",
    "Autor",
    new Date(2020, 0, 1),
    100
  );
  ordList.addAt(b4, 0); // Se reordena automáticamente
  console.log("Contenido tras añadir Libro Caro:", ordList.toString());

  ordList.set(
    new Book(
      "978-84-9804-654-4",
      "Libro Barato",
      "Autor",
      new Date(2021, 0, 1),
      5
    ),
    2
  );
  console.log("Contenido tras set(Libro Barato,2):", ordList.toString());

  console.log("Primer libro (más barato):", ordList.firstElement());
  console.log("Último libro (más caro):", ordList.lastElement());

  console.log("Eliminando índice 1:", ordList.remove(1));
  console.log("Contenido tras remove:", ordList.toString());

  ordList.clear();
  console.log(
    "Contenido tras clear:",
    ordList.toString(),
    "¿Vacía?",
    ordList.isEmpty()
  );
}

testLists();
