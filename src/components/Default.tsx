import React, { useEffect, useState } from "react";
import Card from "../frags/Card";
import Grid from "@mui/material/Grid"; // Grid version 1
import Menu from "./Menu";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ContextF } from "../GlobalContext";
import LinearProgress from "@mui/material/LinearProgress";
import LoadCard from ".././frags/LoadCard";
import Stack from "@mui/material/Stack";
import AlertWithDecorators from "../frags/Alert";
import Item from './Item';

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
  id_user_owner: string;
};

type alertT = {
  resp: boolean;
  action: string;
};

export default function Default() {
  const [progress, setProgress] = React.useState(0);
  const [load, setLoad] = useState<boolean>(true);
  const [alert, setAlert] = useState<alertT | null>(null)
  const [filtering,setFiltering] = useState<{isFiltering:boolean ,filter:string }>({isFiltering:true,filter:"Página inicial"})

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleAdded = (resp: boolean | undefined) => {
    if (resp !== undefined) {
      if (resp === true) {
        setAlert({ resp: true, action: "success" });
      } else {
        setAlert({ resp: true, action: "fail" });
      }
    }
  };

  const context = ContextF();
  const menuOptions = ["Página inicial", "Casa", "Apartamento", "Outros"];

  const [posts, setPosts] = useState<Inputs[]>([]);
  const [unfilteredPosts,setUnfilteredPosts] = useState<Inputs[]>([]);


  const selectedSize = (data: number): void => {
    console.log(data);
  };
  const handleMenuOptionFiltering = (itemSelected:string):void =>{
    if(itemSelected === "Página inicial"){
      setPosts(unfilteredPosts)
    }
    else{
    
    const filteredPosts:Inputs[] =  unfilteredPosts.filter(x =>{
      return x.tipo === itemSelected
    })
    setPosts(filteredPosts)
    
    }
  }
  useEffect(() => {
    context?.getDocsFromDB().then((data) => {
      const posts_getted: Inputs[] = data.docs.map((doc:any) => doc.data());
      setPosts(posts_getted);
      setUnfilteredPosts(posts_getted)
      setLoad(false);
    });
  }, []);
 const handleClose = () =>{
  setAlert(null);
 }
  return (
    <>
    <>
    {alert && <AlertWithDecorators action={alert.action} handleClose={handleClose} />}
    </>
      {load ? (
        <Stack
          className="LoadBarStack"
          sx={{ width: "100%", color: "grey.500" }}
          spacing={2}
        >
          <LinearProgress color="secondary" />
        </Stack>
      ) : (
        ""
      )}

      <div className="main-home-container">
        <div>
          <Menu
            options={menuOptions}
            handleFilter={handleMenuOptionFiltering}
            handleMenuSizeOptions={selectedSize}
          />
        </div>
        <div className="grid-al-div">
          <div>
            <h2 className="option-h4-item-menu">
              {" "}
              {filtering.filter}
            </h2>
          </div>
          <Grid
            gap={3}
            container
            spacing={{ xs: 2, md: 4 }}
            columns={{ xs: 3, sm: 10, md: 12 }}
          >
          
          {posts.length ? (
              posts.map((post) => (
                <Grid>
                  <Card
                    handleNewFav={handleAdded}
                    title={post.title}
                    adress={`${post.bairro} - ${post.endereço} - ${post.estado}`}
                    images={[post.images[0]]}
                    price={post.valor}
                    id={post.id}
                    imovel={post.tipo}
                    key={post.id}
                    id_user_owner={post.id_user_owner}
                  />
                </Grid>
              ))
            ) :"" }
             {load && <>
                <LoadCard />
                <LoadCard />
                <LoadCard />
                <LoadCard />
                <LoadCard />
                <LoadCard />
              </>}
          </Grid>
        </div>
      </div>
    </>
  );
}
