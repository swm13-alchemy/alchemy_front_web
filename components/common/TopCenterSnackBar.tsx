import Snackbar from '@mui/material/Snackbar'
import { AlertColor } from '@mui/material'
import Alert from '@mui/material/Alert'

interface Props {
  isSnackBarOpen: boolean
  setIsSnackBarOpen: (isSnackBarOpen: boolean) => void
  severity : AlertColor // "error", "warning", "info", "success"
  content : string
}

function TopCenterSnackBar({ isSnackBarOpen, setIsSnackBarOpen, severity, content }: Props) {
  return (
    <Snackbar
      open={isSnackBarOpen} autoHideDuration={2000}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      onClose={() => setIsSnackBarOpen(false)}
    >
      <Alert severity={severity} sx={{width: '100%'}}>
        {content}
      </Alert>
    </Snackbar>
  );
}

export default TopCenterSnackBar;