import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getQuestions from "app/questions/queries/getQuestions"
import getActionItems from "app/users/queries/getActionItems"

const ITEMS_PER_PAGE = 100

export const QuestionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ActionItem, hasMore }] = usePaginatedQuery(getActionItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

 

  return (
    <div>
      <ul>
        {ActionItem.map((ActionItem) => (
          <li key={ActionItem.id}>
            <Link href={Routes.ShowQuestionPage({ actionitemId: ActionItem.id })}>
              <a>{ActionItem.name}</a>
            </Link>
          </li>
        ))}
      </ul>

    
    </div>
  )
}

const QuestionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Action</title>
      </Head>

      <div>
        <p>
         <strong>All Action Item</strong>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <QuestionsList />
        </Suspense>
      </div>
    </>
  )
}

QuestionsPage.authenticate = true
QuestionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default QuestionsPage
