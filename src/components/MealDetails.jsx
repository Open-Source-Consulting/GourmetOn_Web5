import { useEffect, useRef } from "react";

export default function MealDetails({ meal, onClose }) {
  // -----------------------------
  // 1. ABERTURA DO MODAL
  // -----------------------------
  const dialogRef = useRef(null);

  useEffect(() => {
    // A referência permite acessar o elemento dialog do HTML.
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();

    // A lista de ingredientes rola dentro do modal; o fundo fica parado.
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, []);

  // -----------------------------
  // 2. LISTA DE INGREDIENTES
  // -----------------------------
  const ingredients = [];

  // Lê os 20 campos possíveis, sem modificar o objeto recebido da API.
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(<li key={i}>{ingredient}</li>);
    }
  }

  // -----------------------------
  // 3. INTERFACE DOS DETALHES
  // -----------------------------
  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="titulo-prato"
      className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border border-white/20 bg-[#2b211c] p-6 text-white shadow-xl backdrop:bg-black/70 sm:p-8"
    >
      {/* O botão e a tecla Esc fecham o dialog e acionam onClose. */}
      <button
        autoFocus
        type="button"
        onClick={() => dialogRef.current.close()}
        className="rounded-lg border border-white/30 px-4 py-2 font-bold hover:bg-white/10"
      >
        Fechar
      </button>
      <h3 id="titulo-prato" className="mt-6 text-3xl font-bold">{meal.strMeal}</h3>
      <p className="mt-4 text-[#ffe16a]">Categoria: {meal.strCategory || "Não informada"}</p>
      <p className="mt-2 text-white/80">Origem: {meal.strArea || "Não informada"}</p>
      <h4 className="mt-6 text-xl font-bold">Ingredientes</h4>
      {ingredients.length > 0 ? (
        <ul className="mt-3 list-disc space-y-2 pl-6 text-white/80">{ingredients}</ul>
      ) : (
        <p className="mt-3 text-white/80">Ingredientes não informados.</p>
      )}
    </dialog>
  );
}