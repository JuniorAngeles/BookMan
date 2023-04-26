function parsePrompt(prompt) {
  if (typeof prompt !== "string") {
    return "";
  }
  const lower = prompt.toLowerCase();
  const noSpaces = lower.replace(/\s/g, "");
  const noCharacters = noSpaces.replace(/[!@#$%%^&*()_+=-]/g, "");

  return noCharacters;
}

// Algoritmos
export function Busqueda(data, query) {
  // const filteredData = data.map((item) => {
  //   if (item.firstName === query) {
  //     return item;
  //   }
  // });
  const parsedQuery = parsePrompt(query);

  const filteredData = data.filter((item) => {
    const nombre = parsePrompt(item.nombre);
    const apellido = parsePrompt(item.apellido);

    const buscar = nombre + apellido;
    const match = buscar.includes(parsedQuery);

    return match;
  });

  return filteredData;
}
