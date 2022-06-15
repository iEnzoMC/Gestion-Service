import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
//import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function LoginComponent() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={handleToggle} sx={{color: '#fff', margin: '10px'}}>Menu</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <div className='menu-login'>
          <span onClick={handleClose}>X</span>
          <button>Login</button>
          <button>Soporte</button>

        </div>
      </Backdrop>

    </div>

  );
}
