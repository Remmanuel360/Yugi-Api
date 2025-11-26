import mostrarLogin from "./login.js";
import mostrarRegistro from "./registro.js";
import mostrarOriginal from "./original.js";

export default async function mostrarHome() {
    const app = document.getElementById("app");

    // Menú superior + contenedor
    app.innerHTML = `
        <div style="text-align:center; margin-bottom: 20px;">
            <button id="btnLogin" class="btnMenu">Login</button>
            <button id="btnRegistro" class="btnMenu">Registro</button>
            <button id="btnTop3" class="btnMenu">Top 3</button>
        </div>

        <h2 style="text-align:center; margin-bottom: 20px;">Listado de Cartas Yu-Gi-Oh!</h2>

        <div id="cardsContainer" style="
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
        "></div>

        <div style="text-align:center; margin: 20px 0;">
            <button id="btnMostrarMas" class="btnMenu">Mostrar más</button>
        </div>
    `;

    // Eventos menú
    document.getElementById("btnLogin").addEventListener("click", () => mostrarLogin());
    document.getElementById("btnRegistro").addEventListener("click", () => mostrarRegistro());
    document.getElementById("btnTop3").addEventListener("click", () => mostrarOriginal());

    // --- CARGA DE CARTAS ---

    const cardsContainer = document.getElementById("cardsContainer");
    const btnMostrarMas = document.getElementById("btnMostrarMas");

    let cartas = [];
    let index = 0;
    const cantidadPorCarga = 20; // cuántas cartas mostrar por batch

    try {
        // Obtener cartas
        const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
        const data = await response.json();
        cartas = data.data;

        cargarMásCartas();

    } catch (error) {
        cardsContainer.innerHTML = "<p>Error al cargar las cartas 😢</p>";
        console.error("Error:", error);
    }

    function cargarMásCartas() {
        const fin = index + cantidadPorCarga;
        const lote = cartas.slice(index, fin);

        lote.forEach(card => {
            const cartaDiv = document.createElement("div");
            cartaDiv.style.width = "120px";
            cartaDiv.style.textAlign = "center";

            cartaDiv.innerHTML = `
                <img src="${card.card_images[0].image_url_small}" 
                     alt="${card.name}" 
                     style="width: 100%; border-radius: 8px;">
                <p style="font-size: 12px; margin-top: 5px;">${card.name}</p>
            `;

            cardsContainer.appendChild(cartaDiv);
        });

        index = fin;

        if (index >= cartas.length) {
            btnMostrarMas.style.display = "none"; // ocultar botón si no hay más
        }
    }

    btnMostrarMas.addEventListener("click", cargarMásCartas);
}
