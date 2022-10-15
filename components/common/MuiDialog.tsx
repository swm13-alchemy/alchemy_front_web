import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import React from 'react'

interface Props {
  isDialogOpen: boolean
  setIsDialogOpen: (isDialogOpen: boolean) => void
  dialogTitle: string
  dialogContent: string
  executedBtnName: string
  funcToBeExecuted: (funcParameter: any) => void
  funcParameter: any
}

function MuiDialog({ isDialogOpen, setIsDialogOpen, dialogTitle, dialogContent, executedBtnName, funcToBeExecuted, funcParameter }: Props) {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {dialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsDialogOpen(false)}>취소</Button>
        {funcParameter === null ? (
          <Button onClick={funcToBeExecuted} autoFocus>
            {executedBtnName}
          </Button>
        ) : (
          <Button onClick={() => funcToBeExecuted(funcParameter)} autoFocus>
            {executedBtnName}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default MuiDialog