import ContentBar from './ContentBar'
import { IngredientType, NutrientType } from '../../utils/types'

// remove
const 예시: NutrientType = { name: '비타민C', tips: '피부에 좋음', efficacy: '혈액 순환' }

interface Props {
  ingredients: IngredientType[]
}

function ContentGraph({ ingredients }: Props) {
  return (
    <div className='flex flex-col border-[#D8D8D8] w-full rounded-xl border p-2 gap-1 items-center space-y-2'>
      <div className='flex w-full items-center justify-between px-2'>
        <p className='text-sm font-bold text-[#525252] text-center'>종류</p>
        <p className='text-sm font-bold text-[#525252] text-center'>함량</p>
        <p className='text-sm font-bold text-[#525252] text-center'>과부족량</p>
      </div>
      <ContentBar content={200} unit='mg' nutrient={예시} />
      <ContentBar content={200} unit='mg' nutrient={예시} />
      <ContentBar content={200} unit='mg' nutrient={예시} />
      <ContentBar content={10} unit='mg' nutrient={예시} />
      <ContentBar content={200} unit='mg' nutrient={예시} />
    </div>
  )
}

export default ContentGraph
