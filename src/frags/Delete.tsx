import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Typography from '@mui/joy/Typography';
import { ContextF } from '../GlobalContext';
import { useNavigate } from 'react-router-dom';

type tProps = {
    id: string | null | undefined
}

export default function AlertDialogModal({id}:tProps) {
    const context = ContextF()
    const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button
      className='button-delete'
        variant="outlined"
        color="danger"
        endDecorator={<DeleteForever />}
        onClick={() => setOpen(true)}
        fullWidth
      >
        Deletar anúncio
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<WarningRoundedIcon />}
          >
            Confirmar
          </Typography>
          <Divider />
          <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
            Você tem certeza que quer deletar esse anúncio ? Todas as informações serão excluidas
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="plain" color="neutral" onClick={() => 
            setOpen(false)
            }>
              Cancelar
            </Button>
            <Button variant="solid" color="danger" onClick={() => 
            context?.deletePostFromDB(id).then(()=>{
                navigate("/")
            })
            }>
            Eu confirmo que quero deletar esse anúncio
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}