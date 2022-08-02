import { IngredientType } from '../../utils/types'

function ContentBar({ content, unit, nutrient }: IngredientType) {
  const { name, tips, efficacy } = nutrient
  return (
    <div className='w-full flex items-center justify-between'>
      <div className='flex items-center w-[54%]'>
        <p className='text-base font-bold w-[55%]'>{name}</p>

        <figure className='w-[45%] bg-[#D9D9D9] h-3 relative border-r border-[#AE0303]'>
          <div className='absolute left-0 top-0 bottom-0 bg-[#D9D9D9] w-4/5 border-r border-[#00B137]'></div>
          <div className={'absolute left-0 top-0 bottom-0 bg-[#2FAD56] w-3/5'}></div>
        </figure>
      </div>
      <p className={'text-base' + ' text-[#8F8F8F]'}>{content + unit}</p>

      <div className={'w-[18%] bg-[#D5E3B1] h-full flex items-center justify-center' + ' text-[#8F8F8F]'}>
        -150
      </div>
    </div>
  )
}

export default ContentBar