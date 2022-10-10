import PillListItem from './PillListItem'
import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import React, { useState } from 'react'

interface Props {
  id: number
  name: string
  maker: string
  deletePillFunc: (id: number) => void
}

function EditMyPillListItem({ maker, name, id, deletePillFunc }: Props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)

  return (
    <div className='w-full flex items-center bg-white shadow-md rounded-lg'>
      <div className='basis-5/6'>
        <PillListItem
          id={id}
          name={name}
          maker={maker}
          prefixDomain='/pill-details'
        />
      </div>
      <button
        className='basis-1/6'
        onClick={() => setIsDeleteDialogOpen(true)}
      >
        <DeleteForeverOutlined className='text-2xl text-red-500' />
      </button>

      {/* 삭제 확인 Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          내 영양제 목록에서 제거
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            복용 관리 중인 영양제 삭제 시, 복용 관리 내용도 함께 삭제됩니다. 내 영양제 목록에서 제거하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>취소</Button>
          <Button onClick={() => deletePillFunc(id)} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    // <div className='flex items-center justify-between w-full h-28 border-[#BABABA] border rounded-3xl px-2'>
    //   <Link href={`/pill-details/${id}`}>
    //     <a className='flex items-center w-4/5 h-full space-x-5'>
    //       <div className='relative w-24 h-24 rounded-3xl border-[#BABABA] border overflow-hidden'>
    //         <Image
    //           src={
    //             requestURLs.getSupplementThumbnailURL(id.toString())
    //               ?? 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
    //           }
    //           className='object-cover'
    //           layout='fill'
    //         />
    //       </div>
    //       <div className='flex flex-col space-y-0.5'>
    //         <p className='text-lg text-[#7A7A7A]'>{maker}</p>
    //         <p className='text-lg'>{name}</p>
    //       </div>
    //     </a>
    //   </Link>
    //   <div className='border-l border-[#BABABA] w-1/5 h-full flex items-center justify-center'>
    //     <FontAwesomeIcon
    //       icon={faTrashCan}
    //       className='text-2xl text-red-600 z-10'
    //       onClick={() => deleteFunc(id)}
    //     />
    //   </div>
    // </div>
  )
}

export default EditMyPillListItem