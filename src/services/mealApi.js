const API_URL = "https://www.themealdb.com/api/json/v1/1";

async function request(endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  return response.json();
}

// Busca os nomes de todas as categorias disponíveis na API.
export async function getCategories() {
  const data = await request("list.php?c=list");
  return (data.meals ?? []).map((item) => item.strCategory);
}

// Busca os pratos de uma categoria e limita a quantidade exibida.
export async function getMealsByCategory(category, limit = 5) {
  const data = await request(`filter.php?c=${encodeURIComponent(category)}`);

  return (data.meals ?? []).slice(0, limit).map((meal) => ({
    ...meal,
    strCategory: category,
  }));
}

// Monta a lista usada na página com até cinco pratos por categoria.
export async function getMealsGroupedByCategory(limit = 5) {
  const categories = await getCategories();

  return Promise.all(
    categories.map(async (category) => ({
      category,
      meals: await getMealsByCategory(category, limit),
    }))
  );
}

// A busca por categoria traz dados resumidos; esta busca completa o modal.
export async function getMealById(id) {
  const data = await request(`lookup.php?i=${encodeURIComponent(id)}`);
  return data.meals?.[0] ?? null;
}
