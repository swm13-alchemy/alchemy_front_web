// const API_KEY = process.env.API_KEY
const BASE_URL = 'http://ec2-3-38-255-41.ap-northeast-2.compute.amazonaws.com:8080/api/rest'
const S3_BASE_URL = 'https://healerbee-dev.s3.ap-northeast-2.amazonaws.com'

const requests = {
  fetchSearchResults: `${BASE_URL}/pill/search`,
  fetchSupplementDetails: `${BASE_URL}/pill`,
  fetchSupplementThumbnail: (id: string) => (`${S3_BASE_URL}/pill/${id}/thumbnail.jpeg`)
}

export default requests