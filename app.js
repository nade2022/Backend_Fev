var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const port = 5000;


var app = express();

let products = [
  { id: 1, name: 'Produit A', description: 'Description du produit A' },
  { id: 2, name: 'Produit B', description: 'Description du produit B' },
  { id: 3, name: 'Produit C', description: 'Description du produit C' }
];

app.get('/get-product/:id', (req, res) => {
  const productId = parseInt(req.params.id); // Récupérer l'ID depuis l'URL

  // Chercher le produit dans le tableau
  const product = products.find(p => p.id === productId);

  // Si le produit existe, on le retourne, sinon on renvoie une erreur
  if (product) {
    return res.status(200).json({
      message: 'Produit trouvé!',
      product: product
    });
  } else {
    return res.status(404).json({ message: 'Produit non trouvé!' });
  }
});

// Définir des routes
app.get('/produits', (req, res) => {
  res.status(200).json(produits);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
const server = http.createServer(app); //2
server.listen(port, () => {
  console.log("running server 5000");
})