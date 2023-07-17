import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import Badge from "@mui/joy/Badge";
import { Link } from "react-router-dom";
import LaunchIcon from '@mui/icons-material/Launch';
type tProps = {
  userProfileLink: string | null
  ownerName:string | null
};

export default function BioCard({ userProfileLink, ownerName }: tProps) {
  return (
    <Card
      sx={{
        width: 320,
        maxWidth: "100%",
        boxShadow: "md",
      }}
    >
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Avatar
          src="https://img.freepik.com/free-icon/user_318-159711.jpg"
          sx={{ "--Avatar-size": "4rem" }}
        />
        <Chip
          size="sm"
          variant="soft"
          color="info"
          sx={{
            mt: -1,
            border: "3px solid",
            borderColor: "background.surface",
          }}
        >
          Anunciante
        </Chip>

        <Typography fontSize="lg" fontWeight="lg" sx={{ mt: 1, mb: 0.5 }}>
          <Link className="linkToProfile" to={`/profile/?user=${userProfileLink}`}>{ownerName} <LaunchIcon className="icon-profile" /> </Link>
        </Typography>
      </CardContent>

      <CardOverflow sx={{ bgcolor: "background.level1" }}>
        <CardActions buttonFlex="1">
          <Button color="info" variant="outlined" onClick={()=>{
            
            window.open( "https://wa.me/+5582981509558")
          }}>
            Enviar mensagem
          </Button>
        </CardActions>
      </CardOverflow>
    </Card>
  );
}
