import React from "react";
import Ticket from "../Ticket.tsx";
import CircularProgress from "@mui/joy/CircularProgress";

type props = {
  posts: object[] | null;
};
export default function PostsComponent ({ posts }: props) {
  return (
    <>
      {" "}
      {posts !== null ? (
        posts.map((item) => {
          return (
            <Ticket
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
