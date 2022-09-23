import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import React from 'react'
import { Dayjs } from 'dayjs'
import { replaceValueInArray } from '../../../utils/functions/replaceValueInArray'

interface Props {
  idx: number
  isTimePickerOpen: boolean[]
  onOffModal: (isTurnOnModal: boolean, index: number) => void
  intakeTimesDayjs: Dayjs[]
  setIntakeTimesDayjs: (dayjs: Dayjs[]) => void
}

const TimePickerModal = ({ idx, isTimePickerOpen, onOffModal, intakeTimesDayjs, setIntakeTimesDayjs }: Props) => {
  return (
    <Modal open={isTimePickerOpen[idx]} onClose={() => onOffModal(false, idx)}>
      <div className='absolute left-0 bottom-0 right-0 p-6 bg-white rounded-t-xl'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticTimePicker
            displayStaticWrapperAs="mobile"
            componentsProps={{actionBar:{actions: []}}}
            value={intakeTimesDayjs[idx]}
            onChange={(newValue: any) => {
              setIntakeTimesDayjs(replaceValueInArray(intakeTimesDayjs, idx, newValue))
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <button
          className='mt-4 w-full py-3.5 bg-primary shadow-md rounded-[0.625rem] text-gray-50 text-sm font-bold'
          onClick={() => onOffModal(false, idx)}
        >
          확인
        </button>
        <button
          className='w-full py-3.5 bg-transparent text-gray-400 text-sm'
          onClick={() => onOffModal(false, idx)}
        >
          취소
        </button>
      </div>
    </Modal>
  )
}

export default TimePickerModal