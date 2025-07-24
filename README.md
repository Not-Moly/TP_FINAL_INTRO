<p align="center">
  <img src="./PlayleTitleBanner.gif" alt="Banner animado del juego" width="75%" />
</p>

#  <p align="center"><strong>🎮 Playle 🎮</strong></p>
#### <p align="center">por</p>
### <p align="center"><italic>Manuel Martinez Almada y Federico Germán Molina </italica></p>

---
<p align="center"><strong>Un juego de adivinanza de videojuegos inspirado en el famoso Wordle, donde podrás poner a prueba tus conocimientos gamer para descubrir el título oculto. 🕹️💡</strong></p>

---
Este proyecto es presentado como trabajo final para **Introducción al Desarrollo de Software**, combinando todos los conocimientos vistos a lo largo del cuatrimestre:
- Linux
- Bash
- Regex
- Ingeniería de Software
- Docker
- HTML y CSS
- JavaScript
- HTTP
- API REST
- Node y Express
- SQL (postgresql)
- Git y GitHub

---

## 🛠️ Tecnologías usadas

- Backend: [Node + Express + Nodemon] ⚙️  
- Base de datos: [PostgreSQL] 🗄️  
- Frontend: HTML, CSS, JavaScript 🌐  
- Contenedores: Docker 🐳

---

  ## 🗂️ Tablas de entidades

| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Entidad&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;            | Descripción                     | Campos principales                  |
|-----------------|----------------------------------------|-----------------------------------------------------|
| 🏢 **Desarrolladores**   | Empresas/personas que crean videojuegos | Nombre, Año de fundación, Cantidad de juegos desarrollados, País de origen, Tipo de entidad |
| 🎮 **Videojuegos**        | Juegos individuales                     | Título, Fecha de lanzamiento, Modos de juego, Géneros, Perspectivas, Imagen, Id de franquicia, Id de saga, Id de desarrollador |
| 🙍🏻‍♂️ **Personajes**             | Personajes de videojuegos           | Nombre, Imagen, Género, Especie, Descripción, Habilidad principal |
| 📚 **Franquicias**         | Colección de videojuegos relacionados por una marca   | Título |
| 📖 **Sagas**               | Series o continuaciones de videojuegos que comparten una historia | Título, Id de franquicia |

## Diagrama de base de datos
![Db-Diagram](https://github.com/user-attachments/assets/d6fd5e95-dfd1-40c4-9e43-91419cfbe9a1)



---

## 🚀 Funcionalidades principales
⚡ Interfaz web moderna con diseño original y varias referencias

🎮 Sistema de adivinanza por turnos con pistas progresivas

📚 Base de datos con información de videojuegos

🔄 CRUD completo para todas las entidades

🔐 API RESTful para todas las operaciones

---

## 📦 Cómo instalar y levantar el proyecto

### Prerrequisitos

- Tener instalado Docker y Docker Compose 🐳

### Pasos para correrlo en tu máquina

```bash
# Clonar el repositorio
git clone https://github.com/Not-Moly/TP_FINAL_INTRO.git
cd TP_FINAL_INTRO

# Levantar todos los servicios (backend, frontend y DB) por primera vez (Talvez requieras de permisos extras)
docker compose up --build
# Luego se puede levantar con
docker compose up

# Acceder al frontend:
http://localhost:3000/api
# Acceder al backend:
http://localhost:8080/
