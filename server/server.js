var _ = require('underscore');
var express = require('express');
var http = require('http');
// var uuid = require('node-uuid');
var cors = require('./cors');
var app = express();
var server = http.createServer(app);

var conf = require('./server.json');

var products = loadProduct();
var basket = [];
var orderNumber = 0;

var sessions = {};

var context = '/rest';
var authHeader = 'Auth-Token';

app.use(express.bodyParser());
app.use(cors);

app.get(context + '/products', function (req, res) {
  res.send(products);
});

function loadProduct() {
  return require(conf.products).map(product => ({...product}));
}

var createHandler = function (req, res) {
  basket.push(req.body);

  currentProduct = {};
  products = products
    .map(product => {
    if (product.title.toUpperCase() === req.body.title.toUpperCase()) {
        product.stock--;
        currentProduct = product;
      }
      return product;
    })
    .filter(product => product.stock > 0)

  res.send(201, currentProduct);
}

app.post(context + '/basket', createHandler);

app.post(context + '/basket/confirm', (req, res) => {
  console.log(`Commande n°${++orderNumber} : ${basket.reduce((total, item)=>total+item.price, 0)}€ ${req.body.name} ${req.body.address} ${req.body.creditCard}`);
  basket = [];
  res.send(200, {orderNumber: orderNumber});
});

app.get(context + '/basket', function (req, res) {
  res.send(basket);
});
app.del(context + '/reset', (req, res) => {
    console.log('RAZ des produits et du panier sur le serveur')
    basket = [];
    products = loadProduct();
    res.send(204);
});

server.listen(conf.port);
console.log('Express server listening on port', server.address());
