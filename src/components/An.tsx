import React from "react";
import Ticket from "../Ticket.tsx";
import CircularProgress from "@mui/joy/CircularProgress";

type props = {
  posts: item[] | null;
};
interface item{
  images:string[]
  bairro:string
  title:string
  id:string
  estado:string
}

export default function PostsComponent ({ posts }: props) {
  return (
    <>
      {" "}
      {posts !== null ? (
        posts.map((item) => {
          return (
            <Ticket
              fav={false}
              images={item.images}
              title={item.title}
              adress={item.bairro}
              id={item.id}
              estado={item.estado}
            />
          );
        })
      ) : (
        <CircularProgress color="info" />
      )}
    </>
  );
}
