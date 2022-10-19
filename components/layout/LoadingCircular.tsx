import CircularProgress from '@mui/material/CircularProgress'

function LoadingCircular() {
  return (
    <div className='w-full h-screen pb-14 flex items-center justify-center'>
      <CircularProgress />
    </div>
  )
}

export default LoadingCircular