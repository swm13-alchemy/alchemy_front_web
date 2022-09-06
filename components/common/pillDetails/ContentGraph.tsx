import ContentBar from './ContentBar'
import { MergedNutrientDataType } from '../../../utils/types'
import HorizontalRule from '@mui/icons-material/HorizontalRule'
import { useEffect, useState } from 'react'
import { arrayIsNotEmpty } from '../../../utils/functions/arrayIsNotEmpty'

interface Props {
  mergedNutrientData: MergedNutrientDataType[]
}

function ContentGraph({ mergedNutrientData }: Props) {
  const [firstDisplayedData, setFirstDisplayedData] = useState<MergedNutrientDataType[]>([])
  const [secondDisplayedData, setSecondDisplayedData] = useState<MergedNutrientDataType[]>([])
  const [isOpenGraph, setIsOpenGraph] = useState<boolean>(false)

  // 들어온 데이터가 4개 이상이면 자르기
  useEffect(() => {
    if (arrayIsNotEmpty(mergedNutrientData)) {
      if (mergedNutrientData.length > 4) {
        setFirstDisplayedData(mergedNutrientData.slice(0, 4))
        setSecondDisplayedData(mergedNutrientData.slice(4))
      } else {
        setFirstDisplayedData(mergedNutrientData)
      }
    }
  }, [])

  return (
    <>
      <span className='text-xs text-gray-300 font-medium'>
        <HorizontalRule className='text-xs'/>기존 섭취량
      </span>
      <span className='ml-2 text-xs text-emerald-500 font-medium'>
        <HorizontalRule className='text-xs'/>추가 섭취량
      </span>

      {/* 그래프 바 들 */}
      <section className='mt-4 space-y-6'>
        {/* 더보기 누르기 전 보여지는 바 들 */}
        {
          arrayIsNotEmpty(firstDisplayedData) &&
          firstDisplayedData.map((data) => (
            <ContentBar key={data.name} {...data} />
          ))
        }
        {/* 더보기 누르면 추가로 보여지는 바 들 */}
        {
          isOpenGraph && arrayIsNotEmpty(secondDisplayedData) &&
          secondDisplayedData.map((data) => (
            <ContentBar key={data.name} {...data} />
          ))
        }
      </section>

      {arrayIsNotEmpty(secondDisplayedData) &&
        <button
          className='mt-6 w-full h-10 rounded-[0.625rem] bg-gray-200 text-gray-900'
          onClick={() => setIsOpenGraph(!isOpenGraph)}
        >
          {isOpenGraph ? '닫기' : '전체 변화량 그래프 보기'}
        </button>
      }
    </>
    // <div className='flex flex-col border-[#D8D8D8] w-full rounded-xl border p-2 gap-1 items-center space-y-2'>
    //   <div className='flex w-full items-center justify-between px-2'>
    //     <p className='text-sm font-bold text-[#525252] text-center'>종류</p>
    //     <p className='text-sm font-bold text-[#525252] text-center'>함량</p>
    //     <p className='text-sm font-bold text-[#525252] text-center'>과부족량</p>
    //   </div>
    //   <ContentBar content={200} unit='mg' nutrient={예시} />
    //   <ContentBar content={200} unit='mg' nutrient={예시} />
    //   <ContentBar content={200} unit='mg' nutrient={예시} />
    //   <ContentBar content={10} unit='mg' nutrient={예시} />
    //   <ContentBar content={200} unit='mg' nutrient={예시} />
    // </div>
  )
}

export default ContentGraph
