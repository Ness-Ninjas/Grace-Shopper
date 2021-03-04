const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  it('includes all the fields', async () => {
    let item = await Product.create({
      name: 'John Doe',
      price: 100,
      quantity: 2,
      description: 'Working...',
      category: 'item category',
      imageUrlOne: 'www.image.com/image1',
      imageUrlTwo: 'www.image.com/image2',
      imageUrlThree: 'www.image.com/image3'
    })

    expect(item.name).to.equal('John Doe')
    expect(item.price).to.equal(100)
    expect(item.quantity).to.equal(2)
    expect(item.description).to.equal('Working...')
    expect(item.category).to.equal('item category')
    expect(item.imageUrlOne).to.equal('www.image.com/image1')
    expect(item.imageUrlTwo).to.equal('www.image.com/image2')
    expect(item.imageUrlThree).to.equal('www.image.com/image3')
  })
})
