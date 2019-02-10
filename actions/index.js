import axios from 'axios'
import Cookies from 'js-cookie'

import { getCookieFromReq } from '../helpers/utils'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 3000,
})

const setAuthHeader = (req) => {
  const token = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON('jwt')

  if (token) {
    return { headers: {
      'Authorization': `Bearer ${token}`
    }}
  }

  return undefined
}

const rejectPromise = (resError) => {
  let error = {}
  if (resError && resError.response && resError.response.data) {
    error = resError.response.data
  } else {
    error = resError
  }

  return Promise.reject(error)
}

export const getSecretData = async (req) => {
  const url = '/secret'
  return await axiosInstance.get(url, setAuthHeader(req)).then(res => res.data)
}

// export const getSecretData = async () => {
//   return await axios.get('/api/v1/secret', setAuthHeader()).then(res => res.data)
// }

// export const getSecretDataServer = async (req) => {
//   return await axios.get('http://localhost:3000/api/v1/secret', setAuthHeader(req)).then(res => res.data)
// }

export const getPortfolios = async (req) => {
  const url = `/portfolios`
  return await axiosInstance.get(url, setAuthHeader(req)).then(res => res.data)
}

export const createPortfolio = async (portfolio) => {
  return await axiosInstance.post('/portfolios', portfolio, setAuthHeader())
              .then(res => res.data)
              .catch(error => rejectPromise(error))
}

export const getPortfolioById = async (id, req) => {
  return await axiosInstance.get(`/portfolios/${id}`)
              .then(response => response.data)
}

export const updatePortfolio = async (portfolio) => {
  return await axiosInstance.patch(`/portfolios/${portfolio._id}`, portfolio, setAuthHeader())
              .then(res => res.data)
              .catch(error => rejectPromise(error))
}