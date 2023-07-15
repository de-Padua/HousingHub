import * as React from "react";
import Alert from "@mui/joy/Alert";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  action: string;
  handleClose:() => void;
};
export default function AlertWithDecorators({ action,handleClose }: Props) {
  return (
    <Box
      sx={{
        right: 20,
        bottom: 50,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 500,
        position: "fixed",
      }}
    >
      {action === "success" ? (
        <Alert
          variant="soft"
          color="success"
          startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
          endDecorator={
            <React.Fragment>
              
              <Button
                size="sm"
                variant="outlined"
                color="success"
                sx={{
                  textTransform: "uppercase",
                  fontSize: "xs",
                  fontWeight: "xl",
                }}
              >
                Ver favoritos
              </Button>
              <IconButton variant="soft" size="sm" color="success" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          }
        >
          Item adicionado aos favoritos
        </Alert>
      ) : (
        <Alert
          variant="soft"
          color="danger"
          startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
          endDecorator={
            <React.Fragment>
              
              <Button
                size="sm"
                variant="outlined"
                color="danger"
                sx={{
                  textTransform: "uppercase",
                  fontSize: "xs",
                  fontWeight: "xl",
                }}
              >
                Ver favoritos
              </Button>
              <IconButton variant="soft" size="sm" color="danger" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          }
        >
          Anúncio já está nos favoritos
        </Alert>
      )}
    </Box>
  );
}
