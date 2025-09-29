document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("#tabla-compras tbody");

    // Recuperar compras desde localStorage
    const compras = JSON.parse(localStorage.getItem("compras")) || [];

    compras.forEach(c => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${c.foto}" alt="${c.nombre}" width="80"></td>
            <td>${c.nombre}</td>
            <td>${c.marca}</td>
            <td>${c.modelo}</td>
            <td>${c.kilometraje}</td>
            <td>${c.precio}</td>
        `;

        tbody.appendChild(row);
    });
});

document.getElementById("vaciar-compras").addEventListener("click", () => {
    localStorage.removeItem("compras"); 
    location.reload();
});

