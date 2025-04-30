import express from 'express';
import fs from 'fs'
import path from 'path';
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Leer las notas desde el archivo
const readNotas = () => {
    if (!fs.existsSync('notas.json')) fs.writeFileSync('notas.json', '[]');
    const data = fs.readFileSync('notas.json', 'utf8');
    return JSON.parse(data);
};

// Guardar las notas en el archivo
const saveNotas = (notas) => {
    fs.writeFileSync('notas.json', JSON.stringify(notas, null, 2));
};

// Ruta para obtener todas las notas
app.get('/notas', (req, res) => {
    const notas = readNotas();
    res.json(notas);
});

// Ruta para agregar una nota
app.post('/notas', (req, res) => {
    const { contenido } = req.body;
    const notas = readNotas();
    const nuevaNota = {
        id: Date.now(),
        contenido
    };
    notas.push(nuevaNota);
    saveNotas(notas);
    res.status(201).json(nuevaNota);
});

// Ruta para eliminar una nota
app.delete('/notas/:id', (req, res) => {
    const { id } = req.params;
    let notas = readNotas();
    notas = notas.filter(n => n.id != id);
    saveNotas(notas);
    res.status(204).send();
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});