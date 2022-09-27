import CircularProgress from '@mui/material/CircularProgress'

function LoadingCircular() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <CircularProgress />
    </div>
  )
}

export default LoadingCircular