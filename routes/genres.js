const Joi = require('joi');
const logger = require('../middlewares/logger');
const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'Terror' },
    { id: 2, name: 'Action' },
    { id: 3, name: 'Science fiction'}
];

// Function evaluate de schema sent from the client
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

// GET /api/genres
router.get('/', logger, (req, res) => {
    res.send(genres);
});

// GET /api/genres/1
router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('El género no se ha encontrado');
    res.send(genre);
});

// POST /api/genres
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("El género con el ID proporcionado no fue encontrado.");

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

// DELETE /api/genres/1
router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("El género con el ID proporcionado no fue encontrado.");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

module.exports = router;