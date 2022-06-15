import Backdrop from '@mui/material/Backdrop';

export const Errors = ({setError, error, setErrorMessage, errorMessage}) => {

  const handleClose = () =>{
    setError(false)
  }

  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={error}
      >
        <div className='menu-login'>
          <span onClick={handleClose}>X</span>
          <h2 style={{color: 'red', marginBottom: '0px'}}>ERROR</h2>
          <p>{errorMessage}</p>

        </div>
    </Backdrop>
  )
}
