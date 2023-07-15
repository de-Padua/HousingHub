import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextF } from "../GlobalContext";
import Alert from "./../frags/Alert"

type tProps = {
  title: string;
  price: string;
  adress: string;
  images: string[];
  id: string;
  imovel: string;
  id_user_owner:string
  handleNewFav:(resp:string)=>void;
};

export default function BasicCard({
  title,
  price,
  adress,
  images,
  id,
  imovel,
  id_user_owner,
  handleNewFav

}: tProps) {
  const navigate = useNavigate();
  const context = ContextF()
  let fav
  return (
    
    
    <Card
      variant="outlined"
      sx={{ width:340, backgroundColor: "rgba(235, 235, 235, 0.24)" }}
    >
      <div>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography level="body2">{adress}</Typography>
        <IconButton
          aria-label="item"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        >
          <BookmarkAdd onClick={(()=>{
           const i =  context?.addFavToUserDb(id,fav={fav_id:id,favTitle:title})
           handleNewFav(i)
          })} />
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img src={images[0]} />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography fontSize="lg" fontWeight="lg">
            $
            {new Intl.NumberFormat("BRL", {
              maximumSignificantDigits: 3,
            }).format(price)}
          </Typography>
        </div>
        <Button
          size="sm"
          color="info"
          variant="soft"
          onClick={() => {
            navigate(`/item/?id=${id}&by=${id_user_owner}`);
          }}
          aria-label="Explore Bahamas Islands"
          sx={{ ml: "auto", fontWeight: 600 }}
        >
          Ver detalhes
        </Button>
      </CardContent>
    </Card>
  );
}
