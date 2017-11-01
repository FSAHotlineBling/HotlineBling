/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

let product;
beforeEach(() => {
  return Product.create({
    name: 'Awesome Phone 8000',
    quantityAvailable: 1
  })
    .then(newProduct => {
      product = newProduct
    })
})

it('requires integer for `quantity`', function () {

  product.quantityAvailable = 'one'

  return product.validate()
    .then(function () {
      throw new Error('validation should fail when content is not an integer');
    },
    function (result) {
      expect(result).to.be.an.instanceOf(Error);
    });

});

})
