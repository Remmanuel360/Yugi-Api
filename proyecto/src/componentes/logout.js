import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';
import mostrarLogin from './login.js';

export default function mostrarLogout() {
  const app = document.getElementById("app");

  // Mensaje temporal
  app.innerHTML = `
    <div style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-size: 20px;
      font-weight: bold;
    ">
      Cerrando sesión...
    </div>
  `;

  // Cerrar sesión
  signOut(auth)
    .then(() => {
      mostrarLogin();
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
      alert("Error al cerrar sesión: " + error.message);
      mostrarLogin(); // Redirige igual al login
    });
}
