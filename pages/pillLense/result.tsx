// import { NextPage } from 'next'
// import { useRouter, withRouter } from 'next/router'
// import BackHeader from '../../components/layout/BackHeader'
// import TaskAltIcon from '@mui/icons-material/TaskAlt'
// import CancelIcon from '@mui/icons-material/Cancel'
// import Link from 'next/link'
//
import React from 'react'

const Result = () => {
  return (
    <div>

    </div>
  )
}

export default Result
// TODO: 웹 배포용 임시 주석처리
// const PillLense: NextPage = (props) => {
//   const router = useRouter()
//
//   const capturedImage = props.router.query.image
//
//   return (
//     <div>
//       <BackHeader router={router} name='가이드 안내' />
//
//       <div className='px-8 flex flex-col bg-white'>
//         <span className='block mt-16 text-center text-xl leading-7'>
//           영양제의 상표가 잘 보이도록
//           <br />
//           <strong className='font-bold'>가이드라인에 맞춰</strong> 다시 찍어주세요!
//         </span>
//
//         <div className='mt-8 h-[250px] flex justify-around'>
//           <ImageContainer type='captured' imgSrc={capturedImage} />
//
//           <ImageContainer type='example' />
//         </div>
//
//         <div className='my-10 h-12'>
//           <TryAgain router={router} />
//         </div>
//       </div>
//
//       <div className='px-4 flex flex-col'>
//         <span className='block my-4 text-center text-sm leading-5 font-normal'>
//           또는 직접 검색하기
//         </span>
//
//         <Link href='/search'>
//           <a>
//             <div className='h-12 bg-white shadow rounded-2xl mx-4 flex items-center px-[1em]'>
//               <p className='text-gray-500 text-sm'>제품명이나 브랜드 명으로 검색</p>
//             </div>
//           </a>
//         </Link>
//       </div>
//     </div>
//   )
// }
//
// const ImageContainer = (props) => {
//   const {
//     type,
//     imgSrc = 'https://media.discordapp.net/attachments/802076592825827332/1022181065474985984/unknown.png',
//   } = props
//
//   const isExample = type === 'example'
//
//   const imgBoxStyle = `w-32 h-48 bg-black rounded-xl ${isExample && ' border-4 border-[#1C65D1]'}`
//
//   const textStyle = `block mt-2 text-center text-sm leading-5 font-normal ${
//     isExample && 'text-[#1C65D1]'
//   }`
//
//   return (
//     <div className='flex flex-col'>
//       <div className='w-full h-6 my-1 flex items-center justify-center'>
//         {/* <div className='w-6 h-6 bg-black rounded-full' /> */}
//         {isExample ? (
//           <TaskAltIcon className='w-6 h-6 rounded-full text-[#67A973]' />
//         ) : (
//           <CancelIcon className='w-6 h-6 rounded-full text-red-600' />
//         )}
//       </div>
//
//       <img className={imgBoxStyle} src={imgSrc} alt='' />
//
//       <span className={textStyle}>{isExample ? '정확히 찍은 예시' : '방금 찍은 사진'}</span>
//     </div>
//   )
// }
//
// const TryAgain = ({ router }) => {
//   return (
//     <div className='w-full h-full bg-[#1C65D1] rounded-xl flex items-center justify-center drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]'>
//       <span
//         className='block text-center text-white text-sm leading-5 font-bold'
//         onClick={() => router.back()}
//       >
//         사진 다시 찍기
//       </span>
//     </div>
//   )
// }
//
// export default withRouter(PillLense)
