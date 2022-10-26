import axios from 'axios'

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
  getTotalBalance: (age: number, isMale: boolean, pillsId: number[]) => nest.get(`/balance?age=${age}&isMale=${isMale}&${pillsId.map((id) => `pillsId=${id}`).join('&')}`)
}

export interface PutIntakeHistoryType {
  userId: string
  pillId: number
  intakeDate: string
  intakeTime: string
  isTake: boolean
}
export const intakeApi = {
  getIntakeHistory: (userId: string, startDate: string, endDate: string) => nest.get(`/intake-log/${userId}?start=${startDate}&end=${endDate}`),
  putIntakeHistory: (historyArray: PutIntakeHistoryType[]) => nest.put(`/intake-log`, {
    intakeData: historyArray
  }),
  deleteIntakeHistory: (userId: string, pillId: number) => nest.delete('/user-pill', {
    data: {
      userId: userId,
      pillId: pillId
    }
  })
}

export const userApi = {
  getUserInformationByOauthId: (oauthId: string) => nest.get(`/user/oauth/${oauthId}`),
  postUserInformation: (oauthId: string, nickName: string, email: string | null | undefined, birth: string, isMale: boolean, interestTopicIds: number[], oauthRefreshToken: string) => nest.post('/user', {
    userData: {
      oauthId: oauthId,
      nickname: nickName,
      email: email,
      birth: birth,
      isMale: isMale,
      oauthRefreshToken: oauthRefreshToken
    },
    topicIds: interestTopicIds
  }),
  deleteUserAccount: (userId: string) => nest.delete('/user', {
    data: {
      userId: userId
    }
  })
}

export const topicApi = {
  patchUserInterestTopics: (userId: string, topicIds: number[]) => nest.patch('/topic/user-topic', {
    userId: userId,
    topicIds: topicIds
  })
}

export const postApi = {
  getAllPost: () => nest.get('/post'),
  getPostWithTopicIds: (topicIds: number[]) => nest.get(`/post?${topicIds.map((id) => `topicIds=${id}`).join('&')}`),
  getPostDetails: (postId: number) => nest.get(`/post/${postId}`),
  searchPostWithContent: (content: string) => nest.get(`/post?content=${content}`),
  postNewPost: (userId: string, title: string, content: string, tags: string[], topicIds: number[]) => nest.post('/post', {
    postData: {
      userId: userId,
      title: title,
      content: content,
      tags: tags,
      topicIds: topicIds
    }
  }),
  deletePost: (postId: number) => nest.delete(`/post/${postId}`)
}