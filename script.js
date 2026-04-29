document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".glass");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    cards.forEach(card => observer.observe(card));
  } else {
    cards.forEach(card => card.classList.add("show"));
  }

  atualizarContador();
});

const SUPABASE_URL = "COLE_AQUI_SUA_URL";
const SUPABASE_KEY = "COLE_AQUI_SUA_KEY";

async function atualizarContador() {
  const contador = document.getElementById("viewCounter");

  if (!contador) return;

  if (
    !SUPABASE_URL ||
    !SUPABASE_KEY ||
    SUPABASE_URL.includes("COLE_AQUI") ||
    SUPABASE_KEY.includes("COLE_AQUI") ||
    !window.supabase
  ) {
    contador.textContent = "351";
    return;
  }

  try {
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const { data, error } = await supabaseClient
      .from("views")
      .select("total")
      .eq("id", 1)
      .single();

    if (error || !data) {
      console.error("Erro ao buscar contador:", error);
      contador.textContent = "351";
      return;
    }

    const novoTotal = Number(data.total) + 1;

    const { error: updateError } = await supabaseClient
      .from("views")
      .update({ total: novoTotal })
      .eq("id", 1);

    if (updateError) {
      console.error("Erro ao atualizar contador:", updateError);
      contador.textContent = data.total;
      return;
    }

    contador.textContent = novoTotal;
  } catch (erro) {
    console.error("Erro geral no contador:", erro);
    contador.textContent = "351";
  }
}
