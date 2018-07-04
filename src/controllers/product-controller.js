'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

// utilizando rspository
exports.get = async(req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message : 'Falha ao processar sua requisição'
    });
  }

};


//metodo simples
// exports.get = (req, res, next) => {
//   Product
//       .find({
//         // filtros (where)
//         active: true
//       }, 'title price slug') //campos que vão ser trazidos do banco
//       .then(data => {
//           res.status(200).send({data});
//       }).catch(e => {
//           res.status(400).send(e);
//       });
// };

exports.getBySlug = async(req, res, next) => {
  try {
    var data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message : 'Falha ao processar sua requisição'
    });
  }
};

exports.getById = async(req, res, next) => {
  try {
    var data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message : 'Falha ao processar sua requisição'
    });
  }
};

exports.getByTag = async(req, res, next) => {
  try {
    var data = await repository.getByTag(req.params.tag);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message : 'Falha ao processar sua requisição'
    });
  }
};

exports.post = async(req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.slug, 3, 'O Slug deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

  // Caso os dados sejam invalidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create(req.body);
    res.status(201).send({
      message: 'Produto Cadastrado com Sucesso!'
    });
  } catch (e) {
    res.status(500).send({
      message : 'Falha ao processar sua requisição'
    });
  }
};


//metodo simples
// exports.post = (req, res, next) => {
//   let contract = new ValidationContract();
//   contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
//   contract.hasMinLen(req.body.slug, 3, 'O Slug deve conter pelo menos 3 caracteres');
//   contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');
//
//   // Caso os dados sejam invalidos
//   if (!contract.isValid()) {
//     res.status(400).send(contract.errors()).end();
//     return;
//   }
//
//   var product = new Product(req.body);
//   product
//       .save()
//       .then(x => {
//           res.status(201).send({
//             message: 'Produto Cadastrado com Sucesso!'
//           });
//       }).catch(e => {
//           res.status(400).send({
//              message: 'Falha ao Cadastrar o produto!',
//              data: e
//            });
//       });
// };

exports.put = async(req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({
      message: 'Produto Atualizado com Sucesso!'
    });
  } catch (e) {
    res.status(500).send({
      message : 'Falha ao processar sua requisição'
    });
  }
};

exports.delete = async(req, res, next) => {
  try {
    await repository.delete(req.body.id);
    res.status(200).send({
      message: 'Produto Removido com Sucesso!'
    });
  } catch (e) {
    res.status(500).send({
      message : 'Falha ao processar sua requisição'
    });
  }
};
