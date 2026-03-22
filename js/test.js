console.log("==============================================");
console.log("      TEST COMPLETO DEL SISTEMA DE VIDEO");
console.log("==============================================\n");

/* ============================================================
   CREACIÓN DE OBJETOS BASE
============================================================ */

const vs = VideoSystem.getInstance("MiSistema");

console.log("Nombre del sistema:", vs.name);

/* ============================================================
   TEST: createCategory / createUser / createPerson / createProduction
============================================================ */

console.log(
  "\n--- TEST: createCategory / createUser / createPerson / createProduction ---",
);

const catA = vs.createCategory("Acción", "Películas de acción");
const catB = vs.createCategory("Drama", "Películas dramáticas");

const userA = vs.createUser("ana", "ana@example.com", "123456");
const userB = vs.createUser("luis", "luis@example.com", "abcdef");

const actorA = vs.createPerson("Keanu", "Reeves", "", "1964-09-02");
const actorB = vs.createPerson("Bryan", "Cranston", "", "1956-03-07");

const directorA = vs.createPerson("Lana", "Wachowski", "", "1965-06-21");
const directorB = vs.createPerson("Vince", "Gilligan", "", "1967-02-10");

const prodMovie = vs.createProduction(
  "movie",
  "Matrix",
  "USA",
  "1999-03-31",
  "Sci-fi",
  "matrix.jpg",
  null,
  [{ latitude: 40.4, longitude: -3.7 }],
);

const prodSerie = vs.createProduction(
  "serie",
  "Breaking Bad",
  "USA",
  "2008-01-20",
  "Drama",
  "bb.jpg",
  [{ duration: 45, link: "ep1.mp4" }],
  [{ latitude: 35.0844, longitude: -106.6504 }],
  5,
);

console.log("createCategory OK:", catA, catB);
console.log("createUser OK:", userA, userB);
console.log("createPerson OK:", actorA, actorB, directorA, directorB);
console.log("createProduction OK:", prodMovie.title, prodSerie.title);

/* ============================================================
   TEST: addCategory / addUser / addActor / addDirector / addProduction
============================================================ */

console.log(
  "\n--- TEST: addCategory / addUser / addActor / addDirector / addProduction ---",
);

vs.addCategory(catA, catB);
vs.addUser(userA, userB);
vs.addActor(actorA, actorB);
vs.addDirector(directorA, directorB);
vs.addProduction(prodMovie, prodSerie);

console.log(
  "Categorías:",
  [...vs.categories].map((c) => c.name),
);
console.log(
  "Usuarios:",
  [...vs.users].map((u) => u.username),
);
console.log(
  "Actores:",
  [...vs.actors].map((a) => a.name),
);
console.log(
  "Directores:",
  [...vs.directors].map((d) => d.name),
);
console.log(
  "Producciones:",
  [...vs.productions].map((p) => p.title),
);

/* ============================================================
   TEST: assignCategory / deassignCategory
============================================================ */

console.log("\n--- TEST: assignCategory / deassignCategory ---");

vs.assignCategory(catA, prodMovie);
vs.assignCategory(catB, prodSerie);

console.log(
  "Producciones en Acción:",
  [...vs.getProductionsCategory(catA)].map((p) => p.title),
);
console.log(
  "Producciones en Drama:",
  [...vs.getProductionsCategory(catB)].map((p) => p.title),
);

vs.deassignCategory(catA, prodMovie);
console.log(
  "Tras deassignCategory Acción:",
  [...vs.getProductionsCategory(catA)].map((p) => p.title),
);

/* ============================================================
   TEST: assignDirector / deassignDirector
============================================================ */

console.log("\n--- TEST: assignDirector / deassignDirector ---");

vs.assignDirector(directorA, prodMovie);
vs.assignDirector(directorB, prodSerie);

console.log(
  "Producciones dirigidas por Wachowski:",
  [...vs.getProductionsDirector(directorA)].map((p) => p.title),
);

vs.deassignDirector(directorA, prodMovie);
console.log(
  "Tras deassignDirector Wachowski:",
  [...vs.getProductionsDirector(directorA)].map((p) => p.title),
);

/* ============================================================
   TEST: assignActor / deassignActor / getCast / getProductionsActor
============================================================ */

console.log(
  "\n--- TEST: assignActor / deassignActor / getCast / getProductionsActor ---",
);

vs.assignActor(actorA, "Neo", prodMovie);
vs.assignActor(actorB, "Walter White", prodSerie);

console.log("Reparto de Matrix:", [...vs.getCast(prodMovie)]);
console.log("Reparto de Breaking Bad:", [...vs.getCast(prodSerie)]);

console.log(
  "Producciones de Keanu Reeves:",
  [...vs.getProductionsActor(actorA)].map(
    (o) => `${o.production.title} (${o.role})`,
  ),
);

vs.deassignActor(actorA, prodMovie);
console.log("Tras deassignActor Keanu:", [...vs.getProductionsActor(actorA)]);

/* ============================================================
   TEST: findProductions
============================================================ */

console.log("\n--- TEST: findProductions ---");

const longTitles = vs.findProductions(
  (p) => p.title.length > 5,
  (a, b) => a.title.localeCompare(b.title),
);

console.log(
  "Producciones con título largo:",
  [...longTitles].map((p) => p.title),
);

/* ============================================================
   TEST: filterProductionsInCategory
============================================================ */

console.log("\n--- TEST: filterProductionsInCategory ---");

vs.assignCategory(catA, prodMovie);
vs.assignCategory(catA, prodSerie);

const filtered = vs.filterProductionsInCategory(
  catA,
  (p) => p.title.includes("a"),
  (a, b) => a.title.localeCompare(b.title),
);

console.log(
  "Producciones en Acción filtradas:",
  [...filtered].map((p) => p.title),
);

/* ============================================================
   TEST: removeCategory / removeUser / removeActor / removeDirector / removeProduction
============================================================ */

console.log(
  "\n--- TEST: removeCategory / removeUser / removeActor / removeDirector / removeProduction ---",
);

vs.removeUser(userA);
vs.removeActor(actorB);
vs.removeDirector(directorB);
vs.removeProduction(prodSerie);
vs.removeCategory(catB);

console.log(
  "Usuarios restantes:",
  [...vs.users].map((u) => u.username),
);
console.log(
  "Actores restantes:",
  [...vs.actors].map((a) => a.name),
);
console.log(
  "Directores restantes:",
  [...vs.directors].map((d) => d.name),
);
console.log(
  "Producciones restantes:",
  [...vs.productions].map((p) => p.title),
);
console.log(
  "Categorías restantes:",
  [...vs.categories].map((c) => c.name),
);

/* ============================================================
   FIN DEL SCRIPT
============================================================ */

console.log("\n==============================================");
console.log("      FIN DEL SCRIPT DE PRUEBAS COMPLETO");
console.log("==============================================\n");