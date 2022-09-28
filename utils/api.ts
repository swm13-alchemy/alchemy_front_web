import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs'

// const API_KEY = process.env.API_KEY
// const HASURA_BASE_URL = 'http://ec2-3-38-255-41.ap-northeast-2.compute.amazonaws.com:8080/api/rest'
const NEST_BASE_URL = 'https://api-server.beehealer.ml'
const S3_BASE_URL = 'https://healerbee-dev.s3.ap-northeast-2.amazonaws.com'


// const hasura = axios.create({
//   baseURL: HASURA_BASE_URL
// })

const nest = axios.create({
  baseURL: NEST_BASE_URL
})

export const requestURLs = {
  getSupplementThumbnailURL: (id: string) => `${S3_BASE_URL}/pill/${id}/thumbnail.jpeg`,
}

export const pillApi = {
  getSearchResults: (name: any) => nest.get(`/pill/search?name=${name}`),
  getSupplementDetails: (id: any) => nest.get(`/pill/${id}`),
  getSupplementDetailsWithBalance: (age: number, isMale: boolean, pillId: number) => nest.get(`/pill/balance/${pillId}`, {
    params: {
      age: age,
      isMale: isMale
    }
  }),
  getTotalBalance: (age: number, isMale: boolean, pillsId: number[]) => nest.get(`/balance?age=${age}&is_male=${isMale}&${pillsId.map((id) => `pills_id=${id}`).join('&')}`)
}

export const intakeApi = {
  getIntakeHistory: (userId: string, startDate: string, endDate: string) => nest.get(`/intake-log/${userId}?start=${startDate}&end=${endDate}`),
  putIntakeHistory: (userId: string, pillId: number, intakeDate: Dayjs, intakeTime: string, isTake: boolean) => nest.put(`/intake-log/${userId}`, {
    uid: userId,
    pillId: pillId,
    intakeDate: intakeDate,
    intakeTime: intakeTime,
    isTake: isTake,
    createdAt: dayjs()
  })
}