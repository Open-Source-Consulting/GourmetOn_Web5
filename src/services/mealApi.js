// -----------------------------
// 1. BUSCA DOS PRATOS NA API
// -----------------------------
// A resposta já contém categoria, origem e ingredientes.
export async function getMeals() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  const data = await response.json();
  return data.meals ?? [];
}