import IntakeReportListItem from './IntakeReportListItem'
import { useState } from 'react'

function IntakeReport() {
  const [activeTab, setActiveTab] = useState<number>(-1)  // 전체 탭: -1, 부족 탭: 0, 최소 탭: 1, 최적 탭: 2, 과다 탭: 3

  const changeTab = (tabNum: number) => {
    setActiveTab(tabNum)
  }

  return (
    <section className='bg-white px-4 pt-6 pb-4 space-y-4'>
      <p className='text-base font-bold text-gray-900'>필수 영양분 리포트</p>

      {/* 탭 부분 */}
      <div className='flex items-center space-x-2'>
        <StateTab tabNum={-1} active={activeTab === -1} tabName='전체' count={14} changeTabFunc={changeTab} />
        <StateTab tabNum={0} active={activeTab === 0} tabName='부족' count={4} changeTabFunc={changeTab} />
        <StateTab tabNum={1} active={activeTab === 1} tabName='최소' count={2} changeTabFunc={changeTab} />
        <StateTab tabNum={2} active={activeTab === 2} tabName='최적' count={6} changeTabFunc={changeTab} />
        <StateTab tabNum={3} active={activeTab === 3} tabName='과다' count={2} changeTabFunc={changeTab} />
      </div>

      {/* 영양분 리스트 쭉 */}
      {activeTab === -1 && (
        <div className='flex flex-col space-y-2'>
          <IntakeReportListItem nutrientName='VitaminC' state={0} content={100} unit='mg' />
          <IntakeReportListItem nutrientName='VitaminC' state={2} content={null} unit={null} />
          <IntakeReportListItem nutrientName='VitaminC' state={1} content={null} unit={null} />
          <IntakeReportListItem nutrientName='VitaminC' state={3} content={300} unit='mg' />
          <IntakeReportListItem nutrientName='VitaminC' state={0} content={100} unit='mg' />
          <IntakeReportListItem nutrientName='VitaminC' state={2} content={null} unit={null} />
          <IntakeReportListItem nutrientName='VitaminC' state={2} content={null} unit={null} />
          <IntakeReportListItem nutrientName='VitaminC' state={2} content={null} unit={null} />
          <IntakeReportListItem nutrientName='VitaminC' state={3} content={300} unit='mg' />
          <IntakeReportListItem nutrientName='VitaminC' state={2} content={null} unit={null} />
          <IntakeReportListItem nutrientName='VitaminC' state={2} content={null} unit={null} />
          <IntakeReportListItem nutrientName='VitaminC' state={0} content={100} unit='mg' />
          <IntakeReportListItem nutrientName='VitaminC' state={1} content={null} unit={null} />
          <IntakeReportListItem nutrientName='VitaminC' state={0} content={300} unit='mg' />
        </div>
      )}

      {activeTab === 0 && (
        <div className='flex flex-col space-y-2'>
          <IntakeReportListItem nutrientName='VitaminC' state={0} content={100} unit='mg' />
          <IntakeReportListItem nutrientName='VitaminC' state={0} content={100} unit='mg' />
          <IntakeReportListItem nutrientName='VitaminC' state={0} content={100} unit='mg' />
          <IntakeReportListItem nutrientName='VitaminC' state={0} content={300} unit='mg' />
        </div>
      )}

      {activeTab === 1 && (
        <div className='flex flex-col space-y-2'>
          <IntakeReportListItem nutrientName='VitaminC' state={1} content={null} unit={null} />
          <IntakeReportListItem nutrientName='VitaminC' state={1} content={null} unit={null} />
        </div>
      )}

      {activeTab === 2 && (
        <div className='flex flex-col space-y-2'>
          <IntakeReportListItem nutrientName='VitaminC' state={2} content={null} unit={null} />
          <IntakeReportListItem nutrientName='VitaminC' state={2} content={null} unit={null} />
          <IntakeReportListItem nutrientName='VitaminC' state={2} content={null} unit={null} />
          <IntakeReportListItem nutrientName='VitaminC' state={2} content={null} unit={null} />
          <IntakeReportListItem nutrientName='VitaminC' state={2} content={null} unit={null} />
          <IntakeReportListItem nutrientName='VitaminC' state={2} content={null} unit={null} />
        </div>
      )}

      {activeTab === 3 && (
        <div className='flex flex-col space-y-2'>
          <IntakeReportListItem nutrientName='VitaminC' state={3} content={300} unit='mg' />
          <IntakeReportListItem nutrientName='VitaminC' state={3} content={300} unit='mg' />
        </div>
      )}

    </section>
  )
}

interface StateTabProps {
  tabNum: number
  tabName: string
  active: boolean
  count: number
  changeTabFunc: (tabNum: number) => void
}

function StateTab({ tabNum, tabName, active, count, changeTabFunc }: StateTabProps) {
  if (active) {
    return (
      <button
        className='px-2 py-1.5 rounded-lg bg-primary flex items-center justify-center'
        onClick={() => changeTabFunc(tabNum)}
      >
        <p className='text-sm font-bold text-white text-center'>{tabName} {count}</p>
      </button>
    )
  } else {
    return (
      <button
        className='px-2 py-1.5 rounded-lg bg-gray-300 flex items-center justify-center'
        onClick={() => changeTabFunc(tabNum)}
      >
        <p className='text-sm text-white text-center'>{tabName} {count}</p>
      </button>
    )
  }
}

export default IntakeReport