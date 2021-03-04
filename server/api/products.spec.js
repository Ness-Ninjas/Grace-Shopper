const {expect} = require('chai')
const supertest = require('supertest')
const sinon = require('sinon')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('SingleProduct routes', () => {
  const product = {
    description:
      'Handmade Vinyl Record Clock:: With over 50 differe…nd Crafts, Scroll Saw, Vinyl Art, Projects To Try',
    imageUrl:
      'https://i.pinimg.com/236x/af/e1/0a/999438f31d1e066c6f358c6c1a795--rocking-horses-hand-carved.jpg',
    name: 'rocking horses hand carved',
    price: 0.99
  }

  describe('/api/products/:productId', () => {
    const {findAll: productFindAll} = Product
    beforeEach(() => {
      Product.findAll = sinon.spy(() => Promise.resolve(product))
    })
    afterEach(() => {
      Product.findAll = productFindAll
    })
    it('GET/api/products/:productId', async () => {
      const response = await supertest(app).get(`/api/products/${product.id}`)
      expect(response.body).to.deep.equal(product)
    })
  })
})
