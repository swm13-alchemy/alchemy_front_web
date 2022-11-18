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
    <div>
      <div className='flex items-center space-x-2'>
        <span className='text-xs text-amber-400 font-medium'>
          <HorizontalRule className='text-xs'/>최소량
        </span>
        <span className='text-xs text-emerald-400 font-medium'>
          <HorizontalRule className='text-xs'/>충분량
        </span>
        <span className='text-xs text-red-400 font-medium'>
          <HorizontalRule className='text-xs'/>상한량
        </span>
      </div>

      {/* 그래프 바 들 */}
      <section className='mt-4 space-y-6'>
        {/* 더보기 누르기 전 보여지는 바 들 */}
        {arrayIsNotEmpty(firstDisplayedData) &&
          firstDisplayedData.map((data, idx) => (
            <ContentBar key={idx} {...data} />
          ))
        }
        {/* 더보기 누르면 추가로 보여지는 바 들 */}
        {isOpenGraph && arrayIsNotEmpty(secondDisplayedData) &&
          secondDisplayedData.map((data, idx) => (
            <ContentBar key={idx} {...data} />
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
    </div>
  )
}

export default ContentGraph
