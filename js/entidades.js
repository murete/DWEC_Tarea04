// CONSTRUCTOR PERSON
class Person {
  constructor(name, lastName1, lastName2 = "", born, picture = "") {
    if (!name || typeof name !== "string")
      throw new TypeError("name es obligatorio y debe ser String");
    if (!lastName1 || typeof lastName1 !== "string")
      throw new TypeError("lastName1 es obligatorio y debe ser String");
    if (born === undefined || born === null)
      throw new TypeError("born es obligatorio");

    this._name = name;
    this._lastName1 = lastName1;
    this._lastName2 = lastName2 || "";
    this.born = born;
    this._picture = picture || "";
  }

  /* Getters */
  get name() {
    return this._name;
  }
  get lastName1() {
    return this._lastName1;
  }
  get lastName2() {
    return this._lastName2;
  }
  get born() {
    return this._born;
  } // devuelve un objeto Date
  get picture() {
    return this._picture;
  }

  /* Setters */
  set name(v) {
    if (!v || typeof v !== "string")
      throw new TypeError("name debe ser String no vacío");
    this._name = v;
  }

  set lastName1(v) {
    if (!v || typeof v !== "string")
      throw new TypeError("lastName1 debe ser String no vacío");
    this._lastName1 = v;
  }

  set lastName2(v) {
    this._lastName2 = v == null ? "" : String(v);
  }

  set born(v) {
    this._born = v;
  }

  set picture(v) {
    this._picture = v == null ? "" : String(v);
  }

  toString() {
    return `${this._name} ${this._lastName1} ${this._lastName2} ${this._born}`;
  }
}

console.log("==============================================");
console.log("      TEST INICIALES DEL LAS CLASSES          ");
console.log("==============================================\n");
const p1 = new Person("Tony", "Peret", "Alonso", "1980-01-01", "img1.jpg");
console.log(p1);
console.log(p1.name);
console.log(p1.born);
console.log(p1.toString());
console.log(p1.__proto__);

// CONSTRUCTOR CATEGORY
class Category {
  constructor(name, description = "") {
    if (!name || typeof name !== "string") {
      throw new TypeError("name es obligatorio y debe ser una cadena no vacía");
    }
    this._name = name;
    this._description = description == null ? "" : String(description);
  }

  /* Getters */
  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  /* Setters */
  set name(value) {
    if (!value || typeof value !== "string") {
      throw new TypeError("name debe ser una cadena no vacía");
    }
    this._name = value;
  }

  set description(value) {
    this._description = value == null ? "" : String(value);
  }

  /* Métodos útiles */
  toString() {
    return `${this._name}${this._description ? " — " + this._description : ""}`;
  }
}
// TEST
const c1 = new Category("JavaScript", "Lenguaje de programación");
console.log(c1);
console.log(c1.name);
console.log(c1.toString());
console.log(c1.__proto__);

// CONSTRUCTOR RESOURCE
class Resource {
  constructor(duration, link) {
    if (duration === undefined || duration === null) {
      throw new TypeError("duration es obligatorio");
    }
    if (
      typeof duration !== "number" ||
      !Number.isFinite(duration) ||
      duration <= 0
    ) {
      throw new TypeError("duration debe ser un número positivo");
    }
    if (!link || typeof link !== "string") {
      throw new TypeError("link es obligatorio y debe ser una cadena");
    }

    this._duration = duration;
    this._link = link;
  }

  /* Getters */
  get duration() {
    return this._duration;
  }

  get link() {
    return this._link;
  }

  /* Setters */
  set duration(value) {
    if (value === undefined || value === null)
      throw new TypeError("duration es obligatorio");
    const n = Number(value);
    if (!Number.isFinite(n) || n <= 0)
      throw new TypeError("duration debe ser un número positivo");
    this._duration = n;
  }

  set link(value) {
    if (!value || typeof value !== "string")
      throw new TypeError("link es obligatorio y debe ser una cadena");
    this._link = value;
  }

  /* Métodos útiles */
  toString() {
    return `Resource(duration: ${this._duration} min, link: ${this._link})`;
  }
}
// TEST
const r1 = new Resource(120, "https://cdn.example/movie1.mp4");
console.log(r1.duration);
console.log(r1.link);
console.log(r1.toString());


// CONSTRUCTOR PRODUCTION (abstracta)
class Production {
  constructor(title, nationality = "", publication, synopsis = "", image = "") {
    // Evitar instanciación directa (clase abstracta)
    if (new.target === Production) {
      throw new TypeError(
        "Production es abstracta y no puede instanciarse directamente",
      );
    }

    if (!title || typeof title !== "string") {
      throw new TypeError(
        "title es obligatorio y debe ser una cadena no vacía",
      );
    }
    if (publication === undefined || publication === null) {
      throw new TypeError("publication es obligatorio");
    }

    this._title = title;
    this._nationality = nationality == null ? "" : String(nationality);
    this.publication = publication; // usa el setter para validar/convertir
    this._synopsis = synopsis == null ? "" : String(synopsis);
    this._image = image == null ? "" : String(image);

    // relaciones auxiliares (opcional, útiles para herencias)
    this._categories = new Set();
    this._actors = new Map(); // actor -> role
    this._directors = new Set();
  }

  /* Getters */
  get title() {
    return this._title;
  }
  get nationality() {
    return this._nationality;
  }
  get publication() {
    return this._publication;
  } // devuelve Date
  get synopsis() {
    return this._synopsis;
  }
  get image() {
    return this._image;
  }

  /* Setters */
  set title(v) {
    if (!v || typeof v !== "string")
      throw new TypeError("title debe ser una cadena no vacía");
    this._title = v;
  }

  set nationality(v) {
    this._nationality = v == null ? "" : String(v);
  }

  set publication(v) {
    // Acepta Date, string ISO o número (año)
    let d = null;
    if (v instanceof Date) d = v;
    else if (typeof v === "number") d = new Date(v, 0, 1);
    else if (typeof v === "string") d = new Date(v);

    if (!(d instanceof Date) || Number.isNaN(d.getTime())) {
      throw new TypeError(
        "publication debe ser una fecha válida (Date, string ISO o año number)",
      );
    }
    this._publication = d;
  }

  set synopsis(v) {
    this._synopsis = v == null ? "" : String(v);
  }

  set image(v) {
    this._image = v == null ? "" : String(v);
  }

  /* Métodos para relaciones (útiles en herencias) */
  addCategory(category) {
    this._categories.add(category);
  }
  removeCategory(category) {
    this._categories.delete(category);
  }
  categories() {
    return Array.from(this._categories);
  }

  assignActor(person, role = "") {
    this._actors.set(person, role);
  }
  deassignActor(person) {
    this._actors.delete(person);
  }
  getCast() {
    return Array.from(this._actors.entries()).map(([actor, role]) => ({
      actor,
      role,
    }));
  }

  assignDirector(person) {
    this._directors.add(person);
  }
  deassignDirector(person) {
    this._directors.delete(person);
  }
  getDirectors() {
    return Array.from(this._directors);
  }

  /* Representaciones */
  toString() {
    const year = this._publication ? this._publication.getFullYear() : "n/a";
    return `${this._title} (${year})`;
  }
}

// TEST


// CONSTRUCTOR MOVIE (hereda de Production)
class Movie extends Production {
  constructor(
    title,
    nationality = "",
    publication,
    synopsis = "",
    image = "",
    resource = null,
    locations = [],
  ) {
    super(title, nationality, publication, synopsis, image);
    this.resource = resource;
    this.locations = locations;
  }

  /* Normaliza un literal {latitude, longitude} */
  static _normalizeLocation(item) {
    if (!item || typeof item !== "object") {
      throw new TypeError(
        "Cada location debe ser un objeto literal con { latitude, longitude }",
      );
    }
    const lat = Number(item.latitude);
    const lon = Number(item.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      throw new TypeError("latitude y longitude deben ser números válidos");
    }
    return { latitude: lat, longitude: lon };
  }

  /* RESOURCE */
  get resource() {
    return this._resource || null;
  }

  set resource(value) {
    if (value == null) {
      this._resource = null;
      return;
    }
    if (!(value instanceof Resource)) {
      throw new TypeError("resource debe ser instancia de Resource o null");
    }
    this._resource = value;
  }

  /* LOCATIONS */
  get locations() {
    return Array.isArray(this._locations)
      ? this._locations.map((l) => ({
          latitude: l.latitude,
          longitude: l.longitude,
        }))
      : [];
  }

  set locations(value) {
    if (!Array.isArray(value)) {
      throw new TypeError(
        "locations debe ser un array de objetos literales { latitude, longitude }",
      );
    }
    this._locations = value.map((item) => Movie._normalizeLocation(item));
  }

  addLocation(loc) {
    const c = Movie._normalizeLocation(loc);
    if (!Array.isArray(this._locations)) this._locations = [];
    this._locations.push(c);
    return this._locations.length;
  }

  removeLocation(loc) {
    const c = Movie._normalizeLocation(loc);
    if (!Array.isArray(this._locations)) return 0;
    const idx = this._locations.findIndex(
      (x) => x.latitude === c.latitude && x.longitude === c.longitude,
    );
    if (idx === -1) return this._locations.length;
    this._locations.splice(idx, 1);
    return this._locations.length;
  }

  toString() {
    const base = super.toString();
    const res = this._resource ? `, ${this._resource.toString()}` : "";
    const locCount = Array.isArray(this._locations)
      ? this._locations.length
      : 0;
    return `Movie: ${base}${res} [locations: ${locCount}]`;
  }
}

// TEST

// CONSTRUCTOR SERIE (hereda de Production)
// Se asume que Production y Resource ya están definidos en el entorno.
class Serie extends Production {
  constructor(
    title,
    nationality = "",
    publication,
    synopsis = "",
    image = "",
    resources = [],
    locations = [],
    seasons = 0,
  ) {
    super(title, nationality, publication, synopsis, image);
    this.resources = resources; // usa el setter
    this.locations = locations; // usa el setter
    this.seasons = seasons; // usa el setter
  }

  /* ---------- Helpers de normalización ---------- */
  static _normalizeResource(item) {
    if (item == null) throw new TypeError("resource inválido");
    if (item instanceof Resource) return item;
    if (typeof item === "object") {
      const duration = Number(item.duration);
      const link = item.link;
      if (!Number.isFinite(duration) || duration <= 0)
        throw new TypeError("duration debe ser número positivo");
      if (!link || typeof link !== "string")
        throw new TypeError("link debe ser cadena no vacía");
      return new Resource(duration, link);
    }
    throw new TypeError("resource debe ser Resource o {duration, link}");
  }

  static _normalizeLocation(item) {
    if (!item || typeof item !== "object") {
      throw new TypeError(
        "Cada location debe ser un objeto literal con { latitude, longitude }",
      );
    }
    const lat = Number(item.latitude);
    const lon = Number(item.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      throw new TypeError("latitude y longitude deben ser números válidos");
    }
    return { latitude: lat, longitude: lon };
  }

  /* ---------- resources (array) ---------- */
  get resources() {
    return Array.isArray(this._resources) ? this._resources.slice() : [];
  }

  set resources(value) {
    if (!Array.isArray(value))
      throw new TypeError("resources debe ser un array");
    this._resources = value.map((item) => Serie._normalizeResource(item));
  }

  addResource(resource) {
    const r = Serie._normalizeResource(resource);
    if (!Array.isArray(this._resources)) this._resources = [];
    this._resources.push(r);
    return this._resources.length;
  }

  removeResource(resource) {
    const r = Serie._normalizeResource(resource);
    if (!Array.isArray(this._resources)) return 0;
    const idx = this._resources.findIndex(
      (x) => x.link === r.link && x.duration === r.duration,
    );
    if (idx === -1) return this._resources.length;
    this._resources.splice(idx, 1);
    return this._resources.length;
  }

  /* ---------- locations (array de literales) ---------- */
  get locations() {
    return Array.isArray(this._locations)
      ? this._locations.map((l) => ({
          latitude: l.latitude,
          longitude: l.longitude,
        }))
      : [];
  }

  set locations(value) {
    if (!Array.isArray(value))
      throw new TypeError("locations debe ser un array");
    this._locations = value.map((item) => Serie._normalizeLocation(item));
  }

  addLocation(loc) {
    const c = Serie._normalizeLocation(loc);
    if (!Array.isArray(this._locations)) this._locations = [];
    this._locations.push(c);
    return this._locations.length;
  }

  removeLocation(loc) {
    const c = Serie._normalizeLocation(loc);
    if (!Array.isArray(this._locations)) return 0;
    const idx = this._locations.findIndex(
      (x) => x.latitude === c.latitude && x.longitude === c.longitude,
    );
    if (idx === -1) return this._locations.length;
    this._locations.splice(idx, 1);
    return this._locations.length;
  }

  /* ---------- seasons (number) ---------- */
  get seasons() {
    return this._seasons || 0;
  }

  set seasons(value) {
    if (value === null || value === undefined) {
      this._seasons = 0;
      return;
    }
    const n = Number(value);
    if (!Number.isInteger(n) || n < 0)
      throw new TypeError("seasons debe ser un entero no negativo");
    this._seasons = n;
  }

  /* ---------- Representaciones ---------- */
  toString() {
    const base = super.toString();
    const resCount = Array.isArray(this._resources)
      ? this._resources.length
      : 0;
    const locCount = Array.isArray(this._locations)
      ? this._locations.length
      : 0;
    return `Serie: ${base} [resources: ${resCount}, locations: ${locCount}, seasons: ${this.seasons}]`;
  }
}
// TEST
// resources como literales o instancias
const serie = new Serie(
  "Miniserie",
  "UK",
  "2021-01-01",
  "Sinopsis",
  "img.jpg",
  [
    { duration: 45, link: "https://cdn.example/ep1.mp4" },
    new Resource(50, "https://cdn.example/ep2.mp4"),
  ],
  [{ latitude: 40.4, longitude: -3.7 }],
  1,
);

serie.addResource({ duration: 42, link: "https://cdn.example/ep3.mp4" });
serie.addLocation({ latitude: 48.85, longitude: 2.35 });
console.log(serie.toString());

// CONSTRUCTOR USER
class User {
  constructor(username, email, password) {
    if (!username || typeof username !== "string")
      throw new TypeError("username es obligatorio y debe ser String");
    if (!email || typeof email !== "string")
      throw new TypeError("email es obligatorio y debe ser String");
    if (!password || typeof password !== "string")
      throw new TypeError("password es obligatorio y debe ser String");

    this._username = username;
    this.email = email; // usa el setter para validar
    this.password = password; // usa el setter para validar
  }

  /* Getters */
  get username() {
    return this._username;
  }
  get email() {
    return this._email;
  }
  get password() {
    return this._password;
  } // en producción no exponer la contraseña en claro

  /* Setters */
  set username(v) {
    if (!v || typeof v !== "string")
      throw new TypeError("username debe ser una cadena no vacía");
    this._username = v;
  }

  set email(v) {
    if (!v || typeof v !== "string")
      throw new TypeError("email debe ser una cadena no vacía");
    if (!User._isValidEmail(v))
      throw new TypeError("email no tiene un formato válido");
    this._email = v.toLowerCase();
  }

  set password(v) {
    if (!v || typeof v !== "string")
      throw new TypeError("password debe ser una cadena no vacía");
    if (v.length < 6)
      throw new TypeError("password debe tener al menos 6 caracteres");
    this._password = v;
  }

  /* Métodos auxiliares */
  toString() {
    return `User(${this._username}, ${this._email})`;
  }

  toJSON() {
    return {
      username: this._username,
      email: this._email,
      // no incluir password en JSON por seguridad; si se necesita, quitar la línea siguiente
      password: undefined,
    };
  }

  /* Helper estático para validar email (expresión regular simple) */
  static _isValidEmail(email) {
    // Validación razonable para la mayoría de casos; no es exhaustiva
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}
// TEST
try {
  const u = new User("juan", "juan@example.com", "secreto123");
  console.log(u.toString()); // User(juan, juan@example.com)
  console.log(u.username); // 'juan'
  console.log(u.email); // 'juan@example.com'
  u.password = "nuevoPass"; // valida longitud mínima
} catch (err) {
  console.error(err.message);
}

// CONSTRUCTOR COORDINATE
class Coordinate {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  /* Getters */
  get latitude() {
    return this._latitude;
  }

  get longitude() {
    return this._longitude;
  }

  /* Setters */
  set latitude(value) {
    const n = Number(value);
    if (!Number.isFinite(n) || n < -90 || n > 90) {
      throw new TypeError("latitude debe ser un número entre -90 y 90");
    }
    this._latitude = n;
  }

  set longitude(value) {
    const n = Number(value);
    if (!Number.isFinite(n) || n < -180 || n > 180) {
      throw new TypeError("longitude debe ser un número entre -180 y 180");
    }
    this._longitude = n;
  }

  /* Representaciones */
  toString() {
    return `(${this._latitude}, ${this._longitude})`;
  }
}
// TEST
const coord1 = new Coordinate(40.4168, -3.7038); // Madrid
console.log(coord1.latitude); // 40.4168
console.log(coord1.longitude); // -3.7038
console.log(coord1.toString()); // "(40.4168, -3.7038)"
console.log(JSON.stringify(coord1)); // {"latitude":40.4168,"longitude":-3.7038}

/*********************************
VideoSystem: Singleton + Flyweight 
**********************************/

class VideoSystemError extends Error {}
class InvalidArgumentError extends VideoSystemError {}
class AlreadyExistsError extends VideoSystemError {}
class NotFoundError extends VideoSystemError {}

class VideoSystem {
  /* ---------- SINGLETON ---------- */
  static getInstance(name = "VideoSystem") {
    if (!VideoSystem._instance) {
      VideoSystem._instance = new VideoSystem(name);
    }
    return VideoSystem._instance;
  }

  constructor(name) {
    if (VideoSystem._instance) {
      throw new Error(
        "Use VideoSystem.getInstance() para obtener la instancia",
      );
    }
    if (!name || typeof name !== "string") {
      throw new InvalidArgumentError("El nombre no puede ser vacío");
    }

    this._name = name;

    this._categories = new Map(); // name → Category
    this._users = new Map(); // username → User
    this._productions = new Map(); // title → Production
    this._actors = new Map(); // key → Person
    this._directors = new Map(); // key → Person

    this._personCache = new Map(); // key → Person
    this._categoryCache = new Map(); // name → Category
    this._resourceCache = new Map(); // link → Resource

    this._defaultCategory = new Category("Default", "Categoría por defecto");
    this._categories.set(this._defaultCategory.name, this._defaultCategory);
  }

//      NAME
  get name() {
    return this._name;
  }
  set name(value) {
    if (!value || typeof value !== "string") {
      throw new InvalidArgumentError("El nombre no puede ser vacío");
    }
    this._name = value;
  }

//      CATEGORIES
  get categories() {
    return this._categories.values();
  }

  addCategory(...cats) {
    for (const cat of cats) {
      if (!(cat instanceof Category)) {
        throw new InvalidArgumentError(
          "La categoría no puede ser null o no es un objeto Category.",
        );
      }
      if (this._categories.has(cat.name)) {
        throw new AlreadyExistsError(`La categoría "${cat.name}" ya existe.`);
      }
      this._categories.set(cat.name, cat);
      this._categoryCache.set(cat.name, cat);
    }
    return this._categories.size;
  }

  removeCategory(cat) {
    if (!(cat instanceof Category)) {
      throw new InvalidArgumentError("La categoría no es un objeto Category.");
    }
    if (!this._categories.has(cat.name)) {
      throw new NotFoundError("La categoría no está registrada.");
    }
    if (cat === this._defaultCategory) {
      throw new InvalidArgumentError(
        "No se puede eliminar la categoría por defecto.",
      );
    }

    for (const prod of this._productions.values()) {
      if (
        typeof prod.categories === "function" &&
        prod.categories().includes(cat)
      ) {
        prod.removeCategory(cat);
        prod.addCategory(this._defaultCategory);
      }
    }

    this._categories.delete(cat.name);
    this._categoryCache.delete(cat.name);
    return this._categories.size;
  }

//      USERS
  get users() {
    return this._users.values();
  }

  addUser(...users) {
    for (const user of users) {
      if (!(user instanceof User)) {
        throw new InvalidArgumentError(
          "El usuario no puede ser null o no es un objeto User.",
        );
      }
      if (this._users.has(user.username)) {
        throw new AlreadyExistsError("El username ya existe.");
      }
      for (const u of this._users.values()) {
        if (u.email === user.email) {
          throw new AlreadyExistsError("El email ya existe.");
        }
      }
      this._users.set(user.username, user);
    }
    return this._users.size;
  }

  removeUser(user) {
    if (!(user instanceof User)) {
      throw new InvalidArgumentError(
        "El usuario no puede ser null o no es un objeto User.",
      );
    }
    if (!this._users.has(user.username)) {
      throw new NotFoundError("El usuario no existe en el sistema.");
    }
    this._users.delete(user.username);
    return this._users.size;
  }

//      PRODUCTIONS
  get productions() {
    return this._productions.values();
  }

  addProduction(...prods) {
    for (const prod of prods) {
      if (!(prod instanceof Production)) {
        throw new InvalidArgumentError(
          "La producción no puede ser null o no es un objeto Production.",
        );
      }
      if (this._productions.has(prod.title)) {
        throw new AlreadyExistsError("La producción ya existe.");
      }
      this._productions.set(prod.title, prod);
    }
    return this._productions.size;
  }

  removeProduction(prod) {
    if (!(prod instanceof Production)) {
      throw new InvalidArgumentError(
        "La producción no puede ser null o no es un objeto Production.",
      );
    }
    if (!this._productions.has(prod.title)) {
      throw new NotFoundError("La producción no está registrada.");
    }
    this._productions.delete(prod.title);
    return this._productions.size;
  }

//      ACTORS
  get actors() {
    return this._actors.values();
  }

  addActor(...persons) {
    for (const p of persons) {
      if (!(p instanceof Person)) {
        throw new InvalidArgumentError(
          "El actor no puede ser null o no es un objeto Person.",
        );
      }
      const key = this._personKey(p);
      if (this._actors.has(key)) {
        throw new AlreadyExistsError("El actor ya existe.");
      }
      this._actors.set(key, p);
      this._personCache.set(key, p);
    }
    return this._actors.size;
  }

  removeActor(p) {
    if (!(p instanceof Person)) {
      throw new InvalidArgumentError(
        "El actor no puede ser null o no es un objeto Person.",
      );
    }
    const key = this._personKey(p);
    if (!this._actors.has(key)) {
      throw new NotFoundError("El actor no existe en el sistema.");
    }
    this._actors.delete(key);
    this._personCache.delete(key);
    return this._actors.size;
  }

//      DIRECTORS
  get directors() {
    return this._directors.values();
  }

  addDirector(...persons) {
    for (const p of persons) {
      if (!(p instanceof Person)) {
        throw new InvalidArgumentError(
          "El director no puede ser null o no es un objeto Person.",
        );
      }
      const key = this._personKey(p);
      if (this._directors.has(key)) {
        throw new AlreadyExistsError("El director ya existe.");
      }
      this._directors.set(key, p);
      this._personCache.set(key, p);
    }
    return this._directors.size;
  }

  removeDirector(p) {
    if (!(p instanceof Person)) {
      throw new InvalidArgumentError(
        "El director no puede ser null o no es un objeto Person.",
      );
    }
    const key = this._personKey(p);
    if (!this._directors.has(key)) {
      throw new NotFoundError("El director no existe en el sistema.");
    }
    this._directors.delete(key);
    this._personCache.delete(key);
    return this._directors.size;
  }

//      ASSIGN / DEASSIGN CATEGORY
  assignCategory(category, ...productions) {
    if (!(category instanceof Category)) {
      throw new InvalidArgumentError(
        "Category es null o no es un objeto Category.",
      );
    }
    if (!this._categories.has(category.name)) {
      this.addCategory(category);
    }

    for (const prod of productions) {
      if (!(prod instanceof Production)) {
        throw new InvalidArgumentError(
          "Production es null o no es un objeto Production.",
        );
      }
      if (!this._productions.has(prod.title)) {
        this.addProduction(prod);
      }
      prod.addCategory(category);
    }

    return this.getProductionsCategory(category).length;
  }

  deassignCategory(category, ...productions) {
    if (!(category instanceof Category)) {
      throw new InvalidArgumentError(
        "Category es null o no es un objeto Category.",
      );
    }

    for (const prod of productions) {
      if (!(prod instanceof Production)) {
        throw new InvalidArgumentError(
          "Production es null o no es un objeto Production.",
        );
      }
      prod.removeCategory(category);
    }

    return this.getProductionsCategory(category).length;
  }

//      ASSIGN / DEASSIGN DIRECTOR
  assignDirector(person, ...productions) {
    if (!(person instanceof Person)) {
      throw new InvalidArgumentError(
        "Person es null o no es un objeto Person.",
      );
    }

    const key = this._personKey(person);
    if (!this._directors.has(key)) {
      this.addDirector(person);
    }

    for (const prod of productions) {
      if (!(prod instanceof Production)) {
        throw new InvalidArgumentError(
          "Production es null o no es un objeto Production.",
        );
      }
      if (!this._productions.has(prod.title)) {
        this.addProduction(prod);
      }
      prod.assignDirector(person);
    }

    return this.getProductionsDirector(person).length;
  }

  deassignDirector(person, ...productions) {
    if (!(person instanceof Person)) {
      throw new InvalidArgumentError(
        "Person es null o no es un objeto Person.",
      );
    }

    for (const prod of productions) {
      if (!(prod instanceof Production)) {
        throw new InvalidArgumentError(
          "Production es null o no es un objeto Production.",
        );
      }
      prod.deassignDirector(person);
    }

    return this.getProductionsDirector(person).length;
  }

//      ASSIGN / DEASSIGN ACTOR
  assignActor(person, role, ...productions) {
    if (!(person instanceof Person)) {
      throw new InvalidArgumentError(
        "Person es null o no es un objeto Person.",
      );
    }

    const key = this._personKey(person);
    if (!this._actors.has(key)) {
      this.addActor(person);
    }

    for (const prod of productions) {
      if (!(prod instanceof Production)) {
        throw new InvalidArgumentError(
          "Production es null o no es un objeto Production.",
        );
      }
      if (!this._productions.has(prod.title)) {
        this.addProduction(prod);
      }
      prod.assignActor(person, role);
    }

    return this.getProductionsActor(person).length;
  }

  deassignActor(person, ...productions) {
    if (!(person instanceof Person)) {
      throw new InvalidArgumentError(
        "Person es null o no es un objeto Person.",
      );
    }

    for (const prod of productions) {
      if (!(prod instanceof Production)) {
        throw new InvalidArgumentError(
          "Production es null o no es un objeto Production.",
        );
      }
      prod.deassignActor(person);
    }

    return this.getProductionsActor(person).length;
  }

//      GETTERS ESPECIALES
  getCast(production) {
    if (!(production instanceof Production)) {
      throw new InvalidArgumentError(
        "Production es null o no es un objeto Production.",
      );
    }
    if (typeof production.getCast !== "function") {
      return [][Symbol.iterator]();
    }
    const cast = production.getCast(); // array de { actor, role }
    return cast[Symbol.iterator]();
  }

  getProductionsDirector(person) {
    if (!(person instanceof Person)) {
      throw new InvalidArgumentError(
        "Person es null o no es un objeto Person.",
      );
    }
    const result = [];
    for (const prod of this._productions.values()) {
      if (
        typeof prod.getDirectors === "function" &&
        prod.getDirectors().includes(person)
      ) {
        result.push(prod);
      }
    }
    return result[Symbol.iterator]();
  }

  getProductionsActor(person) {
    if (!(person instanceof Person)) {
      throw new InvalidArgumentError(
        "Person es null o no es un objeto Person.",
      );
    }
    const result = [];
    for (const prod of this._productions.values()) {
      if (typeof prod.getCast === "function") {
        const cast = prod.getCast(); // [{actor, role}]
        for (const c of cast) {
          if (c.actor === person) {
            result.push({ production: prod, role: c.role });
          }
        }
      }
    }
    return result[Symbol.iterator]();
  }

  getProductionsCategory(category) {
    if (!(category instanceof Category)) {
      throw new InvalidArgumentError(
        "Category es null o no es un objeto Category.",
      );
    }
    const result = [];
    for (const prod of this._productions.values()) {
      if (
        typeof prod.categories === "function" &&
        prod.categories().includes(category)
      ) {
        result.push(prod);
      }
    }
    return result[Symbol.iterator]();
  }

//      CREATE (Flyweight helpers)
  createPerson(name, lastname1, lastname2 = "", born, picture = "") {
    if (!name || !lastname1) {
      throw new InvalidArgumentError("name y lastname1 son obligatorios.");
    }
    const bornKey = born ? new Date(born).toISOString().slice(0, 10) : "";
    const key = `${name}|${lastname1}|${bornKey}`;
    if (this._personCache.has(key)) return this._personCache.get(key);

    const p = new Person(
      name,
      lastname1,
      lastname2,
      born ? new Date(born) : null,
      picture,
    );
    this._personCache.set(key, p);
    return p; // NO se añade al manager
  }

  createProduction(type, ...args) {
    // type: Movie o Serie (constructor), o string 'movie'/'serie'
    let title = args[0];
    if (this._productions.has(title)) {
      return this._productions.get(title);
    }

    let prod;
    if (typeof type === "function") {
      prod = new type(...args);
    } else if (type === "movie") {
      const [
        t,
        nationality,
        publication,
        synopsis,
        image,
        resource,
        locations,
      ] = args;
      prod = new Movie(
        t,
        nationality,
        publication,
        synopsis,
        image,
        resource,
        locations,
      );
    } else if (type === "serie") {
      const [
        t,
        nationality,
        publication,
        synopsis,
        image,
        resources,
        locations,
        seasons,
      ] = args;
      prod = new Serie(
        t,
        nationality,
        publication,
        synopsis,
        image,
        resources,
        locations,
        seasons,
      );
    } else {
      throw new InvalidArgumentError("Tipo de producción desconocido.");
    }
    return prod; // NO se añade al manager
  }

  createUser(username, email, password) {
    if (!username || !email || !password) {
      throw new InvalidArgumentError(
        "username, email y password son obligatorios.",
      );
    }
    if (this._users.has(username)) {
      return this._users.get(username);
    }
    return new User(username, email, password); // NO se añade al manager
  }

  createCategory(name, description = "") {
    if (!name) {
      throw new InvalidArgumentError("name es obligatorio.");
    }
    if (this._categories.has(name)) {
      return this._categories.get(name);
    }
    if (this._categoryCache.has(name)) {
      return this._categoryCache.get(name);
    }
    const c = new Category(name, description);
    this._categoryCache.set(name, c);
    return c; // NO se añade al manager
  }

//      FIND / FILTER PRODUCTIONS
  findProductions(filterFn, sortFn) {
    if (typeof filterFn !== "function") {
      throw new InvalidArgumentError("filterFn debe ser una función.");
    }
    let arr = Array.from(this._productions.values()).filter(filterFn);
    if (typeof sortFn === "function") {
      arr.sort(sortFn);
    }
    return arr[Symbol.iterator]();
  }

  filterProductionsInCategory(category, filterFn, sortFn) {
    if (!(category instanceof Category)) {
      throw new InvalidArgumentError("Category es null o no está registrada.");
    }
    if (!this._categories.has(category.name)) {
      throw new InvalidArgumentError("Category no está registrada.");
    }

    let arr = Array.from(this.getProductionsCategory(category));
    if (typeof filterFn === "function") {
      arr = arr.filter(filterFn);
    }
    if (typeof sortFn === "function") {
      arr.sort(sortFn);
    }
    return arr[Symbol.iterator]();
  }

//      UTILIDAD INTERNA
  _personKey(p) {
    const bornStr =
      p.born instanceof Date
        ? p.born.toISOString().slice(0, 10)
        : p.born
          ? String(p.born)
          : "";
    return `${p.name}|${p.lastname1 || ""}|${bornStr}`;
  }
}