import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { Link } from 'react-router-dom';
import { ContextF } from '../GlobalContext';
type Props = {
    userId:string,

}
export default function BasicMenu({userId}:Props) {

  const context = ContextF()
  const buttonRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='menu-navbar'>
      <Button
        
        ref={buttonRef}
        id="basic-demo-button"
        aria-controls={'basic-menu'}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        color="info"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Minha conta
      </Button>
      <Menu
      color='info'
        id="basic-menu"
        anchorEl={buttonRef.current}
        open={open}
        onClose={handleClose}
        aria-labelledby="basic-demo-button"
      >
        <Link to={`/profile/?user=${userId}`}><MenuItem  color='info' onClick={handleClose}>Perfil</MenuItem> </Link>
        <MenuItem  color='danger'onClick={()=>{
          handleClose();
          context?.logout()
        }}>Sair</MenuItem>
      </Menu>
    </div>
  );
}