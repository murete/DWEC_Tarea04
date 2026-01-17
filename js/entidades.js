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

// TEST
const p1 = new Person("Tony", "Peret", "Alonso", "1980-01-01", "img1.jpg");
console.log(p1);
console.log(p1.name);
console.log(p1.born);
console.log(p1.toString());
console.log(p1.__proto__);

// Constructor Category
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

// Constructor Resource
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

// Constructor Producción
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

// Constructor Movie (hereda de Production)
// Asume que Production, Resource y Coordinate ya están definidos como en las implementaciones previas.

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

    // inicializar usando setters para validar
    this.resource = resource;
    this.locations = locations;
  }

  /* Getter / Setter resource */
  get resource() {
    return this._resource || null;
  }

  set resource(value) {
    if (value === null || value === undefined) {
      this._resource = null;
      return;
    }
    // Validar que sea instancia de Resource
    if (!(value instanceof Resource)) {
      throw new TypeError("resource debe ser una instancia de Resource o null");
    }
    this._resource = value;
  }

  /* Getter / Setter locations */
  get locations() {
    // devolver copia para evitar mutaciones externas directas
    return Array.isArray(this._locations) ? [...this._locations] : [];
  }

  set locations(value) {
    if (!Array.isArray(value)) {
      throw new TypeError("locations debe ser un array de Coordinate");
    }
    // validar cada elemento
    for (const item of value) {
      if (!(item instanceof Coordinate)) {
        throw new TypeError(
          "Cada elemento de locations debe ser una instancia de Coordinate",
        );
      }
    }
    // almacenar copia para encapsulación
    this._locations = [...value];
  }

  /* Métodos auxiliares para manipular locations */
  addLocation(coord) {
    if (!(coord instanceof Coordinate))
      throw new TypeError("coord debe ser Coordinate");
    if (!Array.isArray(this._locations)) this._locations = [];
    this._locations.push(coord);
    return this._locations.length;
  }

  removeLocation(coord) {
    if (!Array.isArray(this._locations)) return 0;
    const idx = this._locations.indexOf(coord);
    if (idx === -1) return this._locations.length;
    this._locations.splice(idx, 1);
    return this._locations.length;
  }

  /* Representaciones */
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

// Constructor Series (hereda de Production)
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

// Consturctor User
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

// Constructor Coordinate
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

