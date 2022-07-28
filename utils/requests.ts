// const API_KEY = process.env.API_KEY
const BASE_URL = 'http://ec2-3-38-255-41.ap-northeast-2.compute.amazonaws.com:8080/api/rest'

const requests = {
  fetchSearchResults: `${BASE_URL}/pill/search`,
  fetchSupplementDetails: `${BASE_URL}/pill-detail`
}

export default requests