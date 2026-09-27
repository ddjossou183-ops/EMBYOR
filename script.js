const menu = document.querySelector(".menu-toggle"), nav = document.querySelector(".nav");
menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", open ? "true" : "false");
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menu?.setAttribute("aria-expanded", "false");
}));

const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible") }), { threshold: .1 });
document.querySelectorAll(".reveal").forEach(e => obs.observe(e));

document.getElementById("year").textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  document.getElementById("progress").style.width = (scrollY / h * 100) + "%";
});

const form = document.getElementById("contactForm"), toast = document.getElementById("toast");
const submitBtn = form?.querySelector("button[type=submit]");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4500);
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Envoi en cours…"; }
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    });
    if (res.ok) {
      showToast("Merci ! Votre demande a bien été envoyée.");
      form.reset();
    } else {
      showToast("Une erreur est survenue. Réessayez ou écrivez-nous directement par email.");
    }
  } catch (err) {
    showToast("Connexion impossible. Vérifiez votre réseau et réessayez.");
  } finally {
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Envoyer ma demande →"; }
  }
});
