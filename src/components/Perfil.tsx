import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import UserProfile from "./UserProfile";
import { ContextF } from "../GlobalContext";
import Avatar from "@mui/joy/Avatar";

type userT = {
  confirmPassword: string;
  email: string;
  id: string;
  name: string;
  notifications: string[];
  password: string;
  posts_id: string[];
};
export default function Perfil() {
  const context = ContextF();
  const userId = ContextF() as unknown as string;

  const [userProfile, setUserProfile] = useState<JSX.Element | null>(null);
  const [load, setLoad] = useState<boolean | null>(true);
  const url = new URL(window.location.href).searchParams;

  useEffect(() => {
    const user = url.get("user");

    if (context?.userId) {
      if (user) {
        context.getUserProfile(user).then((data: userT) => {
          setLoad(false);
          if (data.id === context.userId) {
            setUserProfile(
              <UserProfile
              
                name={data.name}
                isCurrentUser={true}
                posts_id={data.posts_id}
                key={"1"}
              />
            );
          } else {
            setUserProfile(
              <UserProfile
              key={"2"}
                name={data.name}
                isCurrentUser={false}
                
                posts_id={data.posts_id}
              />
            );
          }
        });
      }
    }

  }, [context?.userId,url]);

 


  return (
    <>
      {load && (
        <div className="load-modal">
          <CircularProgress variant="solid" size="lg" color="info" />
        </div>
      )}
      {userProfile !== null ? userProfile : ""}
    </>
  );
}
