const playleBackendURL = "http://localhost:3000/api/games";
window.addEventListener("DOMContentLoaded", () => {
  fetch("components/tabs.html")
    .then(response => response.text())
    .then(html => {
      document.getElementById("tabs-container").innerHTML = html;

      // Marcar el tab activo basado en la URL actual
      const currentPage = location.pathname.split("/").pop();
      const links = document.querySelectorAll(".tabs a");

      links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
          link.parentElement.classList.add("is-active");
        }
      });
    })
    .catch(error => console.error("Error al cargar los tabs:", error));
});


