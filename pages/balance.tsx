import React from 'react'
import { NextPage } from 'next'
import BottomNavBar from '../components/layout/BottomNavBar'

const Balance: NextPage = () => {
  return (
    <div>
      <BottomNavBar />
    </div>
  )
}

export default Balance

// SSR
// export const getServerSideProps: GetServerSideProps = async () => {
//   const res = await axios.get(requestURLs.fetchTotalBalance + `?age=`)
//   const details = res.data.pill[0]
//
//   return {
//     props: {
//       details,
//     },
//   }
// }