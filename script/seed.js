'use strict'

const db = require('../server/db')
const {User, Product, Cart} = require('../server/db/models')
const nerdAssets = require('../server/db/nerdAssets')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'admin@admin.com', password: '123', admin: true})
  ])

  // const products = await Promise.all([
  //   Product.create({
  //     name: 'item_0',
  //     price: nerdAssets[0].price,
  //     quantity: 1,
  //     category: 'nerdyThing',
  //     imageUrlOne: nerdAssets[0].imageUrl
  //   }),
  //   Product.create({
  //     name: 'item_1',
  //     price: nerdAssets[1].price,
  //     quantity: 2,
  //     category: 'nerdyThing',
  //     imageUrlOne: nerdAssets[1].imageUrl
  //   })
  // ])

  const products = await Promise.all(
    Object.values(nerdAssets).map(asset =>
      Product.create({
        name: asset.name,
        price: asset.price,
        imageUrlOne: asset.imageUrl,
        description: asset.desctiption
      })
    )
  )

  const carts = await Promise.all([
    Cart.create({
      date: new Date(),
      totalPrice: 40,
      status: 'open'
    })
  ])

  await carts[0].addProduct(products[0])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
