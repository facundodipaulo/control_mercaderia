document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const resultadosTableBody = document.querySelector("#resultados tbody");
  const showAllButton = document.getElementById("showAllButton");
  const clearAllButton = document.getElementById("clearAllButton");
  const clearSearchButton = document.getElementById("clearSearchButton");

  searchInput.addEventListener("input", search);
  showAllButton.addEventListener("click", showAll);
  clearAllButton.addEventListener("click", clearAll);
  clearSearchButton.addEventListener("click", clearSearch);

  function search() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    resultadosTableBody.innerHTML = "";

    const resultadosFiltrados = window.data.filter(item => {
      return (
        item.PLU.includes(searchTerm) ||
        item.codigo.toLowerCase().includes(searchTerm) ||
        item.nombre.toLowerCase().includes(searchTerm)
      );
    });

    mostrarResultados(resultadosFiltrados);
  }

  function showAll() {
    resultadosTableBody.innerHTML = "";
    mostrarResultados(window.data);
  }

  function clearAll() {
    resultadosTableBody.innerHTML = "";
  }
  function clearSearch() {
    searchInput.value = ""; 
  }

  function mostrarResultados(resultados) {
    resultados.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.PLU}</td>
        <td>${item.nombre}</td>
        <td>${item.codigo}</td>
      `;
      resultadosTableBody.appendChild(row);
    });
  }

  fetch("datos.json")
    .then(response => response.json())
    .then(data => {
      window.data = data;
    })
    .catch(error => console.error("Error al cargar el archivo JSON:", error));
});
