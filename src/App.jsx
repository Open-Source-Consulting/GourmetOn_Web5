import { useEffect, useState } from "react";

import { getMeals } from "./services/mealApi.js";
import MealDetails from "./components/MealDetails.jsx";

function App() {
  // -----------------------------
  // 1. ESTADOS DO COMPONENTE
  // -----------------------------
  const [menuAberto, setMenuAberto] = useState(false);
  const [menuComFundo, setMenuComFundo] = useState(false);
  const [pratos, setPratos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroApi, setErroApi] = useState(false);
  const [categoria, setCategoria] = useState("Todos");
  const [pratoSelecionado, setPratoSelecionado] = useState(null);
  const [email, setEmail] = useState("");
  const [emailEnviado, setEmailEnviado] = useState(false);

  // -----------------------------
  // 2. MENU FIXO DURANTE A ROLAGEM
  // -----------------------------
  useEffect(() => {
    const verificarRolagem = () => {
      setMenuComFundo(window.scrollY > 30);
    };

    verificarRolagem();
    window.addEventListener("scroll", verificarRolagem);

    return () => window.removeEventListener("scroll", verificarRolagem);
  }, []);

  // -----------------------------
  // 3. BUSCA DOS PRATOS NA API
  // -----------------------------
  useEffect(() => {
    let ativo = true;
    const buscarPratos = async () => {
      setCarregando(true);

      try {
        const dados = await getMeals();
        if (ativo) setPratos(dados);
      } catch (erro) {
        console.error("Erro ao buscar os pratos:", erro);
        if (ativo) setErroApi(true);
      } finally {
        if (ativo) setCarregando(false);
      }
    };

    buscarPratos();
    // Ignora respostas que chegarem depois da limpeza deste efeito.
    return () => { ativo = false; };
  }, []);

  // -----------------------------
  // 4. CATEGORIAS E FILTRO
  // -----------------------------
  const categorias = [
    "Todos",
    ...new Set(pratos.map((prato) => prato.strCategory)),
  ];

  const pratosFiltrados =
    categoria === "Todos"
      ? pratos
      : pratos.filter((prato) => prato.strCategory === categoria);

  // -----------------------------
  // 5. FORMULÁRIO DE CONTATO
  // -----------------------------
  const enviarEmail = (evento) => {
    evento.preventDefault();

    if (email === "") {
      return;
    }

    setEmailEnviado(true);
  };

  // -----------------------------
  // 6. INTERFACE DA PÁGINA
  // -----------------------------
  return (
    <div className="min-h-screen bg-[#fffaf3] text-[#211813]">
      {/* MENU */}
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          menuComFundo
            ? "bg-[#17110d]/95 shadow-lg backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
          <a href="#inicio" className="flex items-center gap-3 text-xl font-bold text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff5c35]">
              GO
            </span>
            <span>
              Gourmet<span className="text-[#ff7051]">On</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-bold text-white/80 md:flex">
            <a href="#beneficios" className="hover:text-[#ffe16a]">Benefícios</a>
            <a href="#cardapio" className="hover:text-[#ffe16a]">Cardápio</a>
            <a href="#depoimentos" className="hover:text-[#ffe16a]">Depoimentos</a>
            <a href="#contato" className="hover:text-[#ffe16a]">Contato</a>
          </div>

          <a
            href="#cardapio"
            className="hidden rounded-xl bg-[#ffe16a] px-5 py-3 text-sm font-bold md:block"
          >
            Explorar sabores
          </a>

          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="rounded-lg border border-white/30 px-3 py-2 text-2xl text-white md:hidden"
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
          >
            {menuAberto ? "×" : "☰"}
          </button>
        </nav>

        {menuAberto && (
          <div className="grid gap-2 bg-[#17110d] px-5 pb-6 text-white md:hidden">
            <a href="#beneficios" onClick={() => setMenuAberto(false)} className="rounded-lg p-3 hover:bg-white/10">Benefícios</a>
            <a href="#cardapio" onClick={() => setMenuAberto(false)} className="rounded-lg p-3 hover:bg-white/10">Cardápio</a>
            <a href="#depoimentos" onClick={() => setMenuAberto(false)} className="rounded-lg p-3 hover:bg-white/10">Depoimentos</a>
            <a href="#contato" onClick={() => setMenuAberto(false)} className="rounded-lg p-3 hover:bg-white/10">Contato</a>
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section id="inicio" className="relative min-h-[760px] overflow-hidden bg-[#17110d] text-white">
          <img
            src="/gourmet-hero.png"
            alt="Mesa com pizza, poke e massa artesanal"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#17110d] via-[#17110d]/90 to-transparent"></div>

          <div className="relative mx-auto flex min-h-[760px] max-w-6xl items-center px-5 pt-20">
            <div className="max-w-2xl py-16">
              <p className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#ffe16a]">
                Sabores da sua cidade
              </p>

              <h1 className="max-w-xl text-5xl font-black leading-tight sm:text-6xl">
                Seu próximo prato começa aqui.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
                Restaurantes selecionados, escolhas para todos os gostos e uma entrega que cabe na sua rotina.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#cardapio" className="rounded-xl bg-[#ff5c35] px-6 py-4 text-center font-bold hover:bg-[#ff704e]">
                  Ver cardápio
                </a>
                <button type="button" onClick={() => window.alert("O GourmetOn estará disponível em breve!")} className="rounded-xl bg-[#ffe16a] px-6 py-4 text-center font-bold text-[#211813]">
                  Baixar o app
                </button>
                <a href="#beneficios" className="rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-center font-bold hover:bg-white/20">
                  Como funciona
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section id="beneficios" className="mx-auto max-w-6xl px-5 py-24">
          <p className="text-sm font-bold uppercase tracking-widest text-[#e74725]">GourmetOn por perto</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black sm:text-5xl">Da escolha à porta, sem complicar.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#756960]">
            Encontre o que combina com o momento, filtre o cardápio e acompanhe cada etapa do pedido.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["Entrega no seu ritmo", "Acompanhe o pedido em cada etapa e receba estimativas claras."],
              ["Restaurantes escolhidos", "Descubra cozinhas locais para diferentes momentos."],
              ["Pagamento simples", "Finalize o pedido com uma experiência direta e segura."],
            ].map((beneficio, indice) => (
              <div key={indice} className="rounded-2xl border border-[#e7ded3] bg-white p-8 shadow-sm">
                <span className="text-sm font-bold text-[#ff5c35]">0{indice + 1}</span>
                <h3 className="mt-6 text-xl font-bold">{beneficio[0]}</h3>
                <p className="mt-3 leading-7 text-[#756960]">{beneficio[1]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CARDÁPIO */}
        <section id="cardapio" className="bg-[#211813] py-24 text-white">
          <div className="mx-auto max-w-6xl px-5">
            <p className="text-sm font-bold uppercase tracking-widest text-[#ffe16a]">Inspiração para hoje</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black sm:text-5xl">Um cardápio que sempre traz algo novo.</h2>

            <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
              {categorias.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategoria(item)}
                  aria-pressed={categoria === item}
                  className={`rounded-full border px-4 py-2 text-sm font-bold ${
                    categoria === item
                      ? "border-[#ffe16a] bg-[#ffe16a] text-[#211813]"
                      : "border-white/30 text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {erroApi && (
              <p className="mt-6 rounded-xl bg-[#ffe16a]/10 p-4 text-sm text-[#ffe16a]">
                Não foi possível carregar os pratos. Atualize a página para tentar novamente.
              </p>
            )}

            {carregando ? (
              <p className="mt-12 text-lg text-white/70">Carregando pratos...</p>
            ) : !erroApi && pratosFiltrados.length === 0 ? (
              <p className="mt-10 text-white/70">Nenhum prato encontrado.</p>
            ) : (
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pratosFiltrados.map((prato) => (
                  <div key={prato.idMeal} className="overflow-hidden rounded-2xl bg-[#2b211c]">
                    <img
                      src={prato.strMealThumb}
                      alt={prato.strMeal}
                      className="h-56 w-full object-cover"
                    />
                    <div className="p-6">
                      <span className="text-sm font-bold text-[#ffe16a]">{prato.strCategory}</span>
                      <h3 className="mt-2 text-xl font-bold">{prato.strMeal}</h3>
                      <p className="mt-3 text-sm text-white/60">Culinária: {prato.strArea || "Internacional"}</p>
                      <button onClick={() => setPratoSelecionado(prato)} className="mt-5 rounded-lg bg-[#ffe16a] px-4 py-2 font-bold text-[#211813]" aria-label={`Ver detalhes de ${prato.strMeal}`}>
                        Ver detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* MODAL DE DETALHES */}
        {pratoSelecionado && (
          <MealDetails
            meal={pratoSelecionado}
            onClose={() => setPratoSelecionado(null)}
          />
        )}

        {/* FUNCIONALIDADES */}
        <section className="mx-auto max-w-6xl px-5 py-24">
          <div className="rounded-3xl bg-[#ff5c35] p-8 text-white sm:p-12">
            <h2 className="text-4xl font-black sm:text-5xl">Encontre rápido. Peça tranquilo.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Conheça os pratos", "Confira a origem e os ingredientes de cada prato."],
                ["Filtros", "Separe as opções por categoria."],
                ["Restaurantes próximos", "Encontre opções na sua região."],
                ["Acompanhamento", "Veja o andamento da entrega."],
              ].map((item, indice) => (
                <div key={indice} className="rounded-2xl border border-white/30 bg-white/10 p-6">
                  <h3 className="font-bold">{item[0]}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/80">{item[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section id="depoimentos" className="bg-white py-24">
          <div className="mx-auto max-w-6xl px-5">
            <p className="text-sm font-bold uppercase tracking-widest text-[#e74725]">Quem já pediu</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black sm:text-5xl">Boas escolhas viram bons encontros.</h2>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                ["O cardápio é fácil de explorar e o pedido chegou antes do previsto.", "Marina Costa"],
                ["Encontrei opções novas perto de casa sem perder tempo.", "Rafael Lima"],
                ["Os filtros ajudam quando preciso decidir rápido no almoço.", "Camila Nunes"],
              ].map((depoimento, indice) => (
                <div key={indice} className="rounded-2xl border border-[#e7ded3] bg-[#fffaf3] p-8">
                  <p className="text-lg font-bold leading-8">“{depoimento[0]}”</p>
                  <p className="mt-6 text-sm font-bold text-[#ff5c35]">{depoimento[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="bg-[#ffe16a] py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#c33b20]">Novidades GourmetOn</p>
              <h2 className="mt-4 text-4xl font-black sm:text-5xl">Receba novos sabores no seu e-mail.</h2>
            </div>

            {emailEnviado ? (
              <div className="rounded-2xl bg-[#211813] p-6 text-white">
                <h3 className="text-xl font-bold">Cadastro recebido!</h3>
                <p className="mt-2 text-white/70">Avisaremos quando houver novidades para {email}.</p>
              </div>
            ) : (
              <form onSubmit={enviarEmail} className="rounded-2xl bg-white p-4 shadow-lg">
                <label htmlFor="email" className="font-bold">Seu melhor e-mail</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(evento) => setEmail(evento.target.value)}
                  placeholder="voce@email.com"
                  className="mt-3 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#ff5c35]"
                />
                <button className="mt-3 w-full rounded-lg bg-[#211813] px-5 py-3 font-bold text-white hover:bg-[#ff5c35]">
                  Quero receber
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* RODAPÉ */}
      <footer className="bg-[#17110d] py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between">
          <div className="text-xl font-bold">
            Gourmet<span className="text-[#ff7051]">On</span>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-white/70">
            <a href="#beneficios">Benefícios</a>
            <a href="#cardapio">Cardápio</a>
            <a href="#depoimentos">Depoimentos</a>
            <a href="#contato">Contato</a>
          </div>
          <p className="text-sm text-white/50">© 2026 GourmetOn. Projeto acadêmico.</p>
        </div>
        <div className="mx-auto mt-8 max-w-6xl space-y-4 px-5 text-sm text-white/70">
          <p>Contato: use o formulário acima para deixar seu e-mail.</p>
          <div className="flex gap-5">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
          </div>
          <details>
            <summary className="cursor-pointer">Termos de uso</summary>
            <p className="mt-3">As informações dos pratos são fornecidas pela TheMealDB. Antes de consumir, confirme os ingredientes e possíveis alérgenos com o restaurante.</p>
          </details>
        </div>
      </footer>
    </div>
  );
}

export default App;
