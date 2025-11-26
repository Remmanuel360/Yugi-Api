import { db } from '../firebaseConfig.js';
import { collection, setDoc, doc } from 'firebase/firestore';

export default function mostrarOriginal() {
  const contenedor = document.getElementById("app");
  contenedor.innerHTML = "";

  // Título
  const titulo = document.createElement("h2");
  titulo.textContent = "Buscar cartas por tipo y guardar 3 favoritas";
  contenedor.appendChild(titulo);

  // Dropdown de tipos
  const select = document.createElement("select");
  select.innerHTML = `
    <option value="">-- Selecciona un tipo --</option>
    <option value="Normal Monster">Normal Monster</option>
    <option value="Effect Monster">Effect Monster</option>
    <option value="Spell Card">Spell Card</option>
    <option value="Trap Card">Trap Card</option>
    <option value="Fusion Monster">Fusion Monster</option>
    <option value="Ritual Monster">Ritual Monster</option>
    <option value="Link Monster">Link Monster</option>
    <option value="XYZ Monster">XYZ Monster</option>
    <option value="Synchro Monster">Synchro Monster</option>
  `;
  contenedor.appendChild(select);

  // Contenedor de resultados de cartas
  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(150px, 1fr))";
  grid.style.gap = "15px";
  grid.style.marginTop = "20px";
  contenedor.appendChild(grid);

  // Array para guardar las favoritas
  let favoritas = [];

  // Mostrar cartas según el tipo
  select.onchange = async () => {
    const tipo = select.value;
    grid.innerHTML = "";
    favoritas = [];

    if (!tipo) return;

    const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?type=${encodeURIComponent(tipo)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      data.data.slice(0, 50).forEach(carta => {
        const cardDiv = document.createElement("div");
        cardDiv.style.border = "2px solid #aaa";
        cardDiv.style.padding = "5px";
        cardDiv.style.textAlign = "center";
        cardDiv.style.cursor = "pointer";
        cardDiv.style.borderRadius = "6px";
        cardDiv.style.background = "#fff";

        const img = document.createElement("img");
        img.src = carta.card_images[0].image_url;
        img.style.width = "100%";

        const nombre = document.createElement("p");
        nombre.textContent = carta.name;
        nombre.style.fontSize = "14px";

        // Selección de favoritas
        cardDiv.onclick = () => {
          const yaEsta = favoritas.find(c => c.id === carta.id);

          if (yaEsta) {
            favoritas = favoritas.filter(c => c.id !== carta.id);
            cardDiv.style.border = "2px solid #aaa";
          } else {
            if (favoritas.length >= 3) {
              alert("Solo puedes elegir 3 favoritas");
              return;
            }
            favoritas.push({
              id: carta.id,
              name: carta.name,
              image: carta.card_images[0].image_url
            });
            cardDiv.style.border = "3px solid gold";
          }
          console.log("Favoritas:", favoritas);
        };

        cardDiv.appendChild(img);
        cardDiv.appendChild(nombre);
        grid.appendChild(cardDiv);
      });

    } catch (error) {
      console.error("Error cargando cartas:", error);
      alert("No se pudieron cargar las cartas.");
    }
  };

  // Botón para guardar
  const btnGuardar = document.createElement("button");
  btnGuardar.textContent = "Guardar 3 favoritas en Firebase";
  btnGuardar.style.marginTop = "20px";
  btnGuardar.style.padding = "10px";
  btnGuardar.style.fontSize = "16px";
  contenedor.appendChild(btnGuardar);

  // Guardar en Firebase
  btnGuardar.onclick = async () => {
    if (favoritas.length !== 3) {
      alert("Debes seleccionar exactamente 3 favoritas.");
      return;
    }

    try {
      await setDoc(doc(db, "favoritos", "usuario01"), {
        cartasFavoritas: favoritas
      });

      alert("⭐ Tus 3 cartas fueron guardadas en Firebase!");
    } catch (err) {
      console.error(err);
      alert("Error al guardar en Firebase");
    }
  };
}
