import { PrismaClient, Prisma } from '@prisma/client'
import { CATEGORY_MAP } from 'constants/goods'

const prisma = new PrismaClient()

const productData: Prisma.ProductsCreateInput[] = Array.apply(
  null,
  Array(100)
).map((_, index) => ({
  name: `gray hoodies ${index + 1}`,
  contents: `{"blocks":[{"key":"9g027","text":"gray hoodies ${
    index + 1
  }","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
  category_id: 5,
  image_url: `https://picsum.photos/id/${index + 401}/1000/600/`,
  price: Math.floor(Math.random() * (100000 - 20000)),
}))

async function main() {
  CATEGORY_MAP.forEach(async (category, index) => {
    const product = await prisma.categories.upsert({
      where: {
        id: index + 1,
      },
      update: {
        name: category,
      },
      create: {
        name: category,
      },
    })
    console.log(`Created Category : ${product.id}`)
  })

  for (const p of productData) {
    const product = await prisma.products.create({
      data: {
        name: p.name,
        image_url: p.image_url,
        category_id: p.category_id,
        contents: p.contents,
        price: p.price,
      },
    })
    console.log(`Created Id : ${product.id}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
  })
