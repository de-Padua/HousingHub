import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "./../assets/logo.png";
import { BsHouseHeart } from "react-icons/bs";
import { ContextF } from "../GlobalContext";
import Cookies from "universal-cookie";
import Badge from "@mui/joy/Badge";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Button from "@mui/joy/Button";
import Notification from "./Notification";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import Divider from "@mui/joy/Divider";
import NavbarMenu from ".././components/NavBarMenu";
import Add from "@mui/icons-material/Add";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItemButton from "@mui/joy/ListItemButton";
import Sheet from "@mui/joy/Sheet";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

type User = {
  email: string;
  name: string;
  password: string;
  id: string;
  confirmPassword: string;
  notifications: object[] | never[];
  posts_id: string[] | never[];
};

export default function Navbar() {
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const cookies = new Cookies();

  const context = ContextF();

  const [userOptions, setShowUserOptions] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<object[] | null>(null);
  const [user, setUser] = useState<null | User>(null);
  useEffect(() => {
    const user_section_pass = cookies.get("userSection");
    if (user_section_pass !== undefined) {
      setShowUserOptions(user_section_pass);
    }
  }, [cookies]);
  useEffect(() => {
    if (context?.userData) {
      setUser(context.userData);
    }
  }, [context?.userData]);

  const handleClose = () => {
    setOpenMenu(false);
  };
  return (
    <div className="navbar">
      <div className="logo-container">
        <h2 className="logo">
          <BsHouseHeart className="icon-logo" /> HOUSING HUB
        </h2>
      </div>

      <div className="links">
        {user === null ? (
          <Button
            variant="outlined"
            color="info"
            onClick={() => {
              navigate("login/user/auth/user");
            }}
          >
            Entrar
          </Button>
        ) : (
          ""
        )}
        {user && (
          <Button
            className="button-tester"
            color="info"
            variant="outlined"
            onClick={() => {
              navigate("/");
            }}
          >
            <HomeIcon />
          </Button>
        )}
        {user && (
          <Button
            className="god-help"
            color="info"
            startDecorator={<Add />}
            onClick={() => {
              navigate("/criar/anuncio");
            }}
          >
            Criar novo anúncio
          </Button>
        )}
        {user !== null ? <NavbarMenu userId={user.id} /> : ""}

        {user !== null ? (
          <>
            {" "}
            <Badge color="info">
              <Button
                key={"20"}
                color="info"
                ref={buttonRef}
                onClick={() => {
                  setOpenMenu((oldValue) => !oldValue);
                }}
              >
                <NotificationsNoneIcon />
              </Button>
            </Badge>
            <Menu
              key={"4040"}
              id="basic-menu"
              anchorEl={buttonRef.current}
              open={openMenu}
              onClose={handleClose}
              aria-labelledby="basic-demo-button"
            >
              <Sheet
                sx={{
                  width: 420,
                  maxHeight: 300,
                  overflow: "auto",
                  borderRadius: "sm",
                }}
              >
                {user
                ? user.notifications.map((not) => {
                    return (
                      <>
                        <MenuItem
                          key={not.id}
                          className="menu-item-no-hover"
                          onClick={() => {
                            setOpenMenu(false);
                          }}
                        >
                          <Notification
                            key={not.title}
                            title={not.title}
                            desc={not.desc}
                            chip={not.id}
                            tipe={not.tipe}
                          />
                        </MenuItem>

                        <Divider />
                      </>
                    );
                  })
                : ""}
              </Sheet>
              
            </Menu>{" "}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
