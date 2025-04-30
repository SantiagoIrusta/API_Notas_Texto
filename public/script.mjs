const apiUrl = "http://localhost:3000/notas";

// Cargar las notas al cargar la página
window.onload = cargarNotas;

function cargarNotas() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(notas => {
            const lista = document.getElementById('notasList');
            lista.innerHTML = '';
            notas.forEach(nota => {
                const li = document.createElement('li');
                li.innerHTML = `
          ${nota.contenido}
          <button onclick="eliminarNota(${nota.id})">Eliminar</button>
        `;
                lista.appendChild(li);
            });
        });
}

function agregarNota() {
    const input = document.getElementById('notaInput');
    const contenido = input.value.trim();

    if (contenido) {
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contenido })
        })
            .then(() => {
                input.value = '';
                cargarNotas();
            });
    } else {
        alert('Por favor escribí una nota.');
    }
}

function eliminarNota(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
        .then(() => cargarNotas());
}