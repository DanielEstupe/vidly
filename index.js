const startupDebugger = require('debug')('vidly:startup');
const dbDebugger = require('debug')('vidly:db');
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const app = express();

const home = require('./routes/home');
const genres = require('./routes/genres');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', home);
app.use('/api/genres', genres);

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

// Port configuration
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));