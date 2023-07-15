import React, { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ContextF } from "../GlobalContext";
import { v4 as uuidv4 } from "uuid";


type formData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export default function NewAccountForm() {
  const context = ContextF()
  const navigate = useNavigate();

  const newAccountErrorPopUp = (error: string) => {
    toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  const onSubmit = handleSubmit((data) => {
   const newData = {...data,id:uuidv4()}

    if (data.password === data.confirmPassword) {
      context?.createUser(newData)
      setTimeout(() => {
        navigate("/")
      }, 500);
    }
    if (data.confirmPassword != data.password) {
      newAccountErrorPopUp("Senha inválida");
    }
  });

  return (
    <>
      <ToastContainer />
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <h2>Nova conta</h2>
        <TextField
          id="standard-basic"
          label="Nome completo"
          variant="outlined"
          {...register("name", {
            required: true,
          })}
        />
        <TextField
          id="standard-basic"
          label="Email"
          variant="outlined"
          {...register("email", {
            required: true,
          })}
        />

        <TextField
          id="standard-basic"
          label="Nova senha"
          variant="outlined"
          type="password"
          {...register("password", { required: true })}
        />
        <TextField
          id="standard-basic"
          label="Confirmar senha"
          variant="outlined"
          type="password"
          {...register("confirmPassword", { required: true })}
        />

        <Button
          variant="contained"
          onClick={() => {
            onSubmit();
          }}
        >
          Criar conta
        </Button>
      </Box>
    </>
  );
}
