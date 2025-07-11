// <button id="boton_hola" onclick="test_function()" class="button">boton</button>
// <table id="tabla"></table>

// const test_function = async () => {
//     console.log("test");
//     try {
//         fetch(playleBackendURL).then((response) => {
//             return response.json();
//         }).then((data) => {
//             console.log(data)
//             const table = document.getElementById("tabla")
//             Object.values(data).forEach(games => {
//                 const newRow = document.createElement("tr");
//                 const newNombre = document.createElement("td");
//                 newNombre.innerHTML = games.nombre;
//                 newRow.appendChild(newNombre);
//                 table.appendChild(newRow)
//             });
//         })
//     } catch (e) {
//         console.log("Error: ", e);
//     }
// }
//test_function();