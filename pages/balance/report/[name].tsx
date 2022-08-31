import ContainerWithBottomNav from '../../../components/layout/ContainerWithBottomNav'
import BackHeader from '../../../components/layout/BackHeader'
import { useRouter } from 'next/router'
import IntakeAdequateTag from '../../../components/tag/IntakeAdequateTag'
import { CompareContent } from '../../../utils/functions/CompareContent'

// interface QueryProps extends UserIntakeNutrientType {
//   // query로 왔기 때문에 string으로 온다.
//   state: string
//   excessOrLackContent: string | null
// }

const Report = () => {
  const router = useRouter()
  // query로 넘어오면 string으로 오는 것 때문에 아래와 같이 일일이 정의
  const name: string = router.query.name as string
  const state: number = parseInt(router.query.state as string)
  const content: number = parseInt(router.query.content as string)
  const reqMin: number = parseInt(router.query.reqMin as string)
  const reqAvg: number = parseInt(router.query.reqAvg as string)
  const reqLimit: number = parseInt(router.query.reqLimit as string)
  const unit: string = router.query.unit as string
  const tips: string = router.query.tips as string
  const efficacy: string = router.query.efficacy as string
  // 넘어올 때 null도 string으로 되기 때문에 아래와 같이 처리
  const strExcessOrLackContent: string = router.query.excessOrLackContent as string
  let excessOrLackContent: number | null = null
  if (strExcessOrLackContent !== '') {
    excessOrLackContent = parseInt(strExcessOrLackContent)
  }
  // let {
  //   name,
  //   state,
  //   content,
  //   reqMin,
  //   reqAvg,
  //   reqLimit,
  //   unit,
  //   tips,
  //   efficacy,
  //   excessOrLackContent
  // } = router.query as unknown as QueryProps  // TODO: as unknown 없애고 다른 방법 찾기 (TS 공변성 공부)
  // const parseState = parseInt(state)
  // let parseExcessOrLackContent: number | null = null
  // if (excessOrLackContent !== null) {
  //   parseExcessOrLackContent = parseInt(excessOrLackContent)
  // }

  // reqMin, reqAvg, reqLimit 기준과 비교하는 클래스
  // 해당 클래스에 값을 넣고 클래스의 메서드를 사용해서 비교하면 됨.
  const compare = new CompareContent(content, reqMin, reqAvg, reqLimit)

  if (compare.compareWithMinAndAvg()) {  // 최소에 해당할 경우 충분량까지 얼마나 부족한지 보여주기 위한 것
    excessOrLackContent = reqAvg - content
  }

  return (
    <ContainerWithBottomNav>
      <BackHeader router={router} name='영양제 분석 리포트' />

      <div className='p-6 bg-white text-gray-900'>
        <IntakeAdequateTag state={state} excessOrLackContent={null} unit={null} />
        <h1 className='text-2xl font-bold mt-2'>{name}</h1>

        <StateText state={state} excessOrLackContent={excessOrLackContent} unit={excessOrLackContent === null ? null : unit} />
      </div>
    </ContainerWithBottomNav>
  )
}

interface StateTextProps {
  state: number
  excessOrLackContent: number | null
  unit: string | null
}

function StateText({ state, excessOrLackContent, unit }: StateTextProps) {
  console.log(excessOrLackContent)
  switch (state) {
    case 0:
      return (
        <p className='text-lg font-bold text-primary mt-4'>
          권장량보다 {excessOrLackContent}{unit} 부족해요!
        </p>
      )
    case 1:
      return (
        <>
          <p className='text-lg font-bold text-primary mt-4'>
            충분량보다 {excessOrLackContent}{unit} 부족해요!
          </p>
          <p className='text-base font-bold mt-2'>일일 권장량은 사실 최소량이랍니다 😉<br/>충분한 효능을 보기 위해서는 충분량 이상의 양을 먹어야 해요!</p>
        </>
      )
    case 2:
      return (
        <p className='text-lg font-bold text-primary mt-4'>
          최적의 효능을 볼 수 있는 충분량 이상을 잘 먹고 있어요! 👍
        </p>
      )
    case 3:
      return (
        <>
          <p className='text-lg font-bold text-primary mt-4'>
            상한량보다 {excessOrLackContent}{unit} 많이 먹고 있어요!
          </p>
          <p className='text-base font-bold mt-2'>상한량을 넘으면 영양분 과잉에 따른<br/>부작용이 일어날 수 있어요 😮<br/>복용량을 조절해보세요!</p>
        </>
      )
    default:
      return (
        <p className='text-lg font-bold text-primary mt-4'>오류</p>
      )
  }
}

export default Report