import axios from 'axios'

// const API_KEY = process.env.API_KEY
const BASE_URL = 'http://ec2-3-38-255-41.ap-northeast-2.compute.amazonaws.com:8080/api/rest'
const S3_BASE_URL = 'https://healerbee-dev.s3.ap-northeast-2.amazonaws.com'


const ec2 = axios.create({
  baseURL: BASE_URL
})

export const requestURLs = {
  getSupplementThumbnailURL: (id: string) => `${S3_BASE_URL}/pill/${id}/thumbnail.jpeg`,
}

export const pillApi = {
  getSearchResults: (name: any) => ec2.get(`${BASE_URL}/pill/search?name=%${name}%`),
  getSupplementDetails: (id: any) => ec2.get(`${BASE_URL}/pill?id=${id}`),
  getTotalBalance: () => ec2.get(`${BASE_URL}/balance/total`)
}