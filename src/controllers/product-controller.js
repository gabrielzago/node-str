'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.post = (req, res, next) => {
  var product = new Product(req.body);
  product
      .save()
      .then(x => {
          res.status(201).send({
            message: 'Produto Cadastrado com Sucesso!'
          });
      }).catch(e => {
          res.status(400).send({
             message: 'Falha ao Cadastrar o produto!',
             data: e
           });
      });
  // product.title = req.body.title;

};

exports.put = (req, res, next) => {
  const id = req.params.id;
  res.status(201).send({
    id:id,
    item: req.body
  });
};

exports.delete = (req, res, next) => {
  res.status(200).send(req.body);
};
