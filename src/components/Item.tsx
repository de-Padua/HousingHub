import { useEffect, useState } from "react";
import React from "react";
import Button from "@mui/joy/Button";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import BlockIcon from "@mui/icons-material/Block";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { ContextF } from "../GlobalContext";
import Delete from "./../frags/Delete";
import QuickViewProfile from "./QuickViewProfile";
import Galeria from "./Galeria";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import Divider from "@mui/joy/Divider";
import Map from "./Map"

export function BasicMenu() {
  const context = ContextF();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem className="item-menu-dots" onClick={handleClose}>
          Salvar{" "}
        </MenuItem>
        <MenuItem className="item-menu-dots" onClick={handleClose}>
          Compartilhar{" "}
        </MenuItem>
        <MenuItem className="item-menu-dots" onClick={handleClose}>
          Denunciar{" "}
        </MenuItem>
      </Menu>
    </>
  );
}

type item = {
  bairro: string;
  cep: string;
  desc: string;
  endereço: string;
  estado: string;
  id: string;
  images: string[];
  tamanho: string;
  tipo: string;
  title: string;
  valor: string;
  name:string
};

export default function Item() {
  const context = ContextF();

  const [user,setUserName] = useState<string | null>(null)
  const [images, setImages] = useState<string[]>([]);
  const [type, setType] = useState<string | null>(null);
  const [adress, setAdress] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [bath, setBath] = useState<number | null>(null);
  const [cep, setCep] = useState<number | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [load, setLoad] = useState<boolean>(true);
  const [pageID, setPageID] = useState<string | null>(null);
  const [item, setItem] = useState<item | null>(null);
  const [userpost, setUserPost] = useState<boolean | null>(null);
  const [global_id, setGlobal_Id] = useState<string | null | undefined>(null);
  const [byId,setById] = useState<string | null>(null)
  useEffect(() => {
    const url = new URL(window.location.href).searchParams;
    const id = url.get("id");
    setGlobal_Id(id);

    if (id !== null) {
      context?.getPost(id).then((data:item) => setItem(data));
      setLoad(false);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href).searchParams;
    const by = url.get("by");
    setById(by)

    if (context?.user !== null) {
      if (context?.user.uid === by) {
        setUserPost(true);
      }
    }
  }, [context]);

  useEffect(() => {
    if (context?.userData) {
      const find = context.userData.posts_id.find((currentPost) => {
        return currentPost.id === item?.id;
      });
      if (find) { 
        setUserPost(true);
      } else {
        setUserPost(false);
      }
    }
  }, [item]);

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

  const onNextClick = () => {
    if (item) {
      if (currentPhotoIndex === item.images.length - 1) {
        setCurrentPhotoIndex(0);
      } else {
        setCurrentPhotoIndex(currentPhotoIndex + 1);
      }
    } else {
      return;
    }
  };

  const onPrevClick = () => {
    if (item) {
      if (currentPhotoIndex === 0) {
        setCurrentPhotoIndex(item.images.length - 1);
      } else {
        setCurrentPhotoIndex(currentPhotoIndex - 1);
      }
    } else {
      return;
    }
  };

  return (
    <>
      <div className="div-main-item">
        <div className="title-item">
          {load ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Typography fontSize="30px" fontWeight="lg" sx={{ mt: 1, mb: 0.5 }}>
              {item && item.title}
            </Typography>
          )}

          {load ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Typography
              marginLeft={0.2}
              width={"fit-content"}
              level="body3"
              sx={{ mt: 0.4, mb: 0.5 }}
            >
              Publicado em {item && item.date} - Cód. {item && item.id}
            </Typography>
          )}

          {item && <Galeria images={item.images} />}
          <Typography fontSize="30px" fontWeight="lg" sx={{ mt: 1, mb: 0.5 }}>
            {item &&
              new Intl.NumberFormat("BRL", {
                style: "currency",
                currency: "BRL",
              }).format(JSON.parse(item.valor))}
          </Typography>
          <div className="desc">
            <Typography fontSize="20px" fontWeight="lg" sx={{ mt: 1, mb: 0.5 }}>
              Descrição
            </Typography>
            <Typography
              width={"fit-content"}
              level="body3"
              sx={{ mt: 0.4, mb: 0.5 }}
            >
              {item && item.desc}
            </Typography>
          </div>
          <Stack
            marginTop={3}
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 3, md: 4 }}
          >
            <div className="desc">
              <Typography
                fontSize="15px"
                fontWeight="lg"
                sx={{ mt: 1, mb: 0.5 }}
              >
                CEP
              </Typography>
              <Typography
                width={"fit-content"}
                level="body3"
                sx={{ mt: 0.4, mb: 0.5 }}
              >
                {item && item.cep}
              </Typography>
            </div>
            <div className="desc">
              <Typography
                fontSize="15px"
                fontWeight="lg"
                sx={{ mt: 1, mb: 0.5 }}
              >
                Endereço
              </Typography>
              <Typography
                width={"fit-content"}
                level="body3"
                sx={{ mt: 0.4, mb: 0.5 }}
              >
                {item && item.endereço}
              </Typography>
            </div>
            <div className="desc">
              <Typography
                fontSize="15px"
                fontWeight="lg"
                sx={{ mt: 1, mb: 0.5 }}
              >
                Estado
              </Typography>
              <Typography
                width={"fit-content"}
                level="body3"
                sx={{ mt: 0.4, mb: 0.5 }}
              >
                {item && item.estado}
              </Typography>
            </div>
            <div className="desc">
              <Typography
                fontSize="15px"
                fontWeight="lg"
                sx={{ mt: 1, mb: 0.5 }}
              >
                Tamanho
              </Typography>
              <Typography
                width={"fit-content"}
                level="body3"
                sx={{ mt: 0.4, mb: 0.5 }}
              >
                {item && item.tamanho}m²
              </Typography>
            </div>
            <div className="desc">
              <Typography
                fontSize="15px"
                fontWeight="lg"
                sx={{ mt: 1, mb: 0.5 }}
              >
                Tipo
              </Typography>
              <Typography
                width={"fit-content"}
                level="body3"
                sx={{ mt: 0.4, mb: 0.5 }}
              >
                {item && item.tipo} 
              </Typography>
            </div>
          </Stack>

          <Divider />
         
        </div>

        <div className="profile-side-card">
          {item !== null ? <QuickViewProfile userProfileLink={byId} ownerName={item.userName}  /> : ""}
          {userpost ? <Delete id={global_id} /> : ""}
        </div>
      </div>
    </>
  );
}
