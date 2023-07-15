import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ContextF } from "../GlobalContext";
import { useNavigate } from "react-router-dom";



type formData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export default function Form() {
  const navigate = useNavigate()
  const context = ContextF()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  const onSubmit = handleSubmit((data) => {
    if(data){
      context?.loginUser(data).then(resp =>{
        if(resp){
          navigate("/")
        }
      }).catch(err =>{
      console.log(err)
      })
    }
  });

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <h2>Login</h2>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          {...register("email")}
        />{" "}
        <TextField
          {...register("password")}
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
        />
        <Button variant="contained" onClick={()=>{
          onSubmit()
        }}>Login</Button>
        <Link to={"/"} className="forgot-password">
          Esqueci minha senha
        </Link>
        <hr />
        <p>
          Não tem uma conta ?{" "}
          <Link to={"/login/auth/new-account"} className="new-account">
            Criar agora
          </Link>
        </p>
      </Box>
    </>
  );
}
