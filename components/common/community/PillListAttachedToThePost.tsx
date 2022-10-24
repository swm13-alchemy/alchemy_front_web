import Link from 'next/link'
import Image from 'next/image'
import { requestURLs } from '../../../utils/api'
import { Dayjs } from 'dayjs'
import { getTimeDiff } from '../../../utils/functions/getTimeDiff'

type PillViewType = {
  pillId: number
  pillName: string
  startIntakeDate?: Dayjs
}

interface Props {
  mentionedPillList: PillViewType[]
}

function PillListAttachedToThePost({ mentionedPillList }: Props) {

  return (
    <div className='w-full space-y-4'>
      <h1 className='text-base font-bold text-gray-900'>본문에서 언급된 영양제</h1>
      <div className='flex space-x-4 overflow-x-scroll scrollbar-hide'>
        {mentionedPillList.map((pill) =>
          <LinkPillView key={pill.pillId} pillId={pill.pillId} pillName={pill.pillName} startIntakeDate={pill.startIntakeDate} />
        )}
      </div>
    </div>
  )
}

export default PillListAttachedToThePost

// Link로 연결되는 PillView
interface LinkPillViewProps {
  pillId: number
  pillName: string
  startIntakeDate?: Dayjs
}
function LinkPillView({ pillId, pillName, startIntakeDate }: LinkPillViewProps) {
  return (
    <Link href={`/pill-details/${pillId}`}>
      <a>
        <div className='flex flex-col items-center justify-center space-y-1'>
          <div className='relative w-[4.25rem] h-[4.25rem] rounded-full border border-gray-200 overflow-hidden'>
            <Image
              src={requestURLs.getSupplementThumbnailURL(pillId.toString())}
              className='object-cover'
              layout='fill'
            />
          </div>
          <p className='text-xs text-gray-900 truncate w-[4.25rem] text-center'>{pillName}</p>
          {startIntakeDate &&
            <p className='text-xs text-primary text-center'>{getTimeDiff(startIntakeDate, true)}</p>
          }
        </div>
      </a>
    </Link>
  )
}