const startupDebugger = require('debug')('vidly:startup');
const dbDebugger = require('debug')('vidly:db');
const config = require('config');
const express = require('express');
const Joi = require('joi');
const logger = require('./middlewares/logger');
const morgan = require('morgan');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuration
console.log('Application name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

// Db work...
dbDebugger('Connected to the database...');
const genres = [
    { id: 1, name: 'Terror' }
];

// Principal view
app.get('/', (req, res) => {
    res.render('index', {
        title: "Vidly API",
        message: "This a simple API written in NodeJS"
    });
});

// GET /api/genres
app.get('/api/genres', logger, (req, res) => {
    res.send(genres);
});

// GET /api/genres/1
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('El género no se ha encontrado');
    res.send(genre);
});

// POST /api/genres
app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

// PUT /api/genres/1
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("El género con el ID proporcionado no fue encontrado.");

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

// DELETE /api/genres/1
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("El género con el ID proporcionado no fue encontrado.");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

// Function evaluate de schema sent from the client
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

// Port configuration
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));