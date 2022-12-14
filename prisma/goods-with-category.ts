import { PrismaClient, Prisma } from '@prisma/client'
import { CATEGORY_MAP } from 'constants/goods'
import { now } from 'next-auth/client/_utils'

const prisma = new PrismaClient()

const qnaData: Prisma.QnAsCreateInput[] = Array.apply(null, Array(100)).map(
  (_, index) => ({
    userId: `userId${index}`,
    writer: `writer${index}`,
    title: `test${index}`,
    email: `email${index}`,
    contents: `{"blocks":[{"key":"9g027","text":"꽃잎을 닮은 베이직한 램프",
    "type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    status: 0,
    viewCount: 0,
    updatedAt: new Date(now()),
    createdAt: new Date(now()),
  })
)

async function main() {
  for (const qna of qnaData) {
    const qnaa = await prisma.qnAs.create({
      data: {
        userId: qna.userId,
        writer: qna.writer,
        title: qna.title,
        email: qna.email,
        contents: qna.contents,
        status: qna.status,
        viewCount: qna.viewCount,
        updatedAt: qna.updatedAt,
        createdAt: qna.createdAt,
      },
    })
    console.log(`Created Id : ${qnaa.id}`)
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
