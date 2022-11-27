import { GetServerSideProps } from 'next'
import { createWord } from '../../wordApi'
import { parseBody } from 'next/dist/server/api-utils/node'
import { getToken } from 'next-auth/jwt'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.method == 'POST') {
    const body = await parseBody(req, '1mb')
    const token = await getToken({ req })
    createWord(body, token?.idToken)
  }
  return { props: {} }
}

const CreateWord = () => {
  return (
    <div>
      <form action="/words/create" method="POST">
        Original word: <input type="text" name="original" />
        <br />
        Original language: <input type="text" name="originalLanguage" />
        <br />
        Foreign word: <input type="text" name="foreign" />
        <br />
        Foreign language: <input type="text" name="foreignLanguage" />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
export default CreateWord
