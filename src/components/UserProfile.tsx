import React, { useState, useEffect } from "react";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/joy/CircularProgress";
import DoneIcon from "@mui/icons-material/Done";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import { ContextF } from "../GlobalContext";
import Item from "./Item";
import Tooltip from "@mui/joy/Tooltip";
import Fav from "./Fav.tsx";
import TabsVariants from "../frags/Tabs.tsx";
import PostsComponent from "./An.tsx";
import Ticket from "../Ticket.tsx";
type Inputs = {
  title: string;
  description: string;
  images: string[];
  cep: string;
  bairro: string;
  endereço: string;
  estado: string;
  tamanho: number;
  tipo: string;
  valor: string;
  desc: string;
  id: string;
};
type userId = string | null;

type tProps = {
  name: string;
  photoURL?: string;
  locale?: string;
  isCurrentUser: boolean;
  posts_id: Inputs[];
  telefone:string
}

type Favorites = {
  fav_id: string;
  favTitle: string;
}

export default function UserProfile({
  name,
  photoURL,
  locale,
  isCurrentUser,
  posts_id,
  telefone
}: tProps) {
  const [load, setLoad] = useState<boolean | null>(false);
  const [post, setPost] = useState<Inputs[] | null>(null);
  const [favorites,setFavorites] = useState<Favorites | null>(null)
  const [tabsRender,setTabsRender] = useState<string>("an")
  const context = ContextF();

  useEffect(() => {
    const userIdToGetData = new URL(window.location.href).searchParams.get(
      "user"
    );

    if (context && userIdToGetData) {
      context
        .getUserProfile(userIdToGetData)
        .then((data) => 
        {setFavorites(data.favorites)
        setPost(data.posts_id)});
    }
  }, [context?.userData]);

  const handlePage = (page: string) => {
    if(page === "an"){
      setTabsRender("an")
    }
    else if(page === "fav"){
      setTabsRender("fav")
    }
  };

  return (
    <>
      <div className="main-container-profile">
        <div className="inner-div-container">
          <div className="profile-1">
            <div className="profile-1-1">
              <img
                src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                loading="lazy"
                className="img-profile"
              />
              <div className="profile-1-1-1">
                <div className="profile-1-1-1-1">
                  <Typography level="h5">{name}</Typography>
                  <Typography level="body4">Contato : {telefone}</Typography>
                </div>

                {isCurrentUser ? (
                  <Button size="sm" color="danger" variant="outlined">
                    Excluir perfil
                  </Button>
                ) : (
                  <Button size="sm" color="primary">
                    Enviar mensagem
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="anu-1">
            <div className="anu-1-1">
              <TabsVariants handlePage={handlePage} />
            </div>
            <div className="anu-1-1-scroll">
             {tabsRender === "an" ? <PostsComponent posts={post}/> : <Fav favorites={favorites}/>}

              {post && post.length === 0 ? (
                <Typography mb={2} lineHeight="lg" level="body3">
                  Sem anúncios
                </Typography>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
