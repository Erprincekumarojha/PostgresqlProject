import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetQuestionsInput
  extends Pick<Prisma.QuestionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetQuestionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: ActionItem,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.ActionItem.count({ where }),
      query: (paginateArgs) => db.ActionItem.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
     ActionItem,
      nextPage,
      hasMore,
      count,
    }
  }
)
