const SUPABASE_URL = "https://ifwhsngotivshkzzmflu.supabase.co";
const SUPABASE_KEY = "sb_publishable_-A-NxajIZ2IfxSD7jfzEtg_ieL3y87Q";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// animação existente
const cards = document.querySelectorAll(".glass");

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

// CONTADOR DE VISUALIZAÇÕES
async function atualizarContador() {
  const { data, error } = await supabase
    .from("views")
    .select("total")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Erro ao buscar:", error);
    return;
  }

  const totalAtual = data.total + 1;

  const { error: updateError } = await supabase
    .from("views")
    .update({ total: totalAtual })
    .eq("id", 1);

  if (updateError) {
    console.error("Erro ao atualizar:", updateError);
    return;
  }

  document.getElementById("viewCounter").textContent = totalAtual;
}

atualizarContador();
