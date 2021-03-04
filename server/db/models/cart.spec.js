const {expect} = require('chai')
const db = require('../db')
const Cart = db.model('cart')

describe('Cart Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  let newCart
  let pastOrder
  it('cart status - keeps a persistent cart ', async () => {
    newCart = await Cart.create({
      status: 'open'
    })
    expect(newCart.status).to.be.equal('open')
  })
  it('displays past order history', async () => {
    pastOrder = await Cart.create({
      status: 'closed'
    })
    expect(pastOrder.status).to.be.equal('closed')
  })
})
