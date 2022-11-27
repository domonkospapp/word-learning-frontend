import axios from 'axios'
import { Word } from './word'

const BASE_URL_WORDS = process.env.BACKEND_BASE_URL + '/words'

const withHeader = (token: string | undefined) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }
}

export const getWords = (
  originalLanguage: string | undefined | string[],
  foreignLanguage: string | undefined | string[],
  token: string | undefined
) =>
  axios
    .get(BASE_URL_WORDS, {
      ...withHeader(token),
      params: {
        originalLanguage: originalLanguage,
        foreignLanguage: foreignLanguage,
      },
    })
    .then((res) => res.data)

export const getLanguages = (token: string | undefined) =>
  axios
    .get(`${process.env.BACKEND_BASE_URL}/languages`, withHeader(token))
    .then((res) => res.data)

export const createWord = (word: Word, token: string | undefined) =>
  axios.post(BASE_URL_WORDS, word, withHeader(token)).then((res) => res.data)

export const updateWord = (word: Word, token: string | undefined) =>
  axios
    .put(`${BASE_URL_WORDS}/${word.id}`, word, withHeader(token))
    .then((res) => res.data)

export const importWords = (wordCsv: string, token: string | undefined) => {
  const body = JSON.stringify({
    content: wordCsv,
  })
  axios
    .post(`${BASE_URL_WORDS}/import`, body, withHeader(token))
    .then((res) => res.data)
}
