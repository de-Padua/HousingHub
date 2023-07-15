import React from "react";
import Form from "../frags/Form";
import NewAccountForm from "../frags/NewAccountForm";
import { Routes, Route, useNavigate } from "react-router-dom";
import IconButton from "@mui/joy/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="main-container-login">
      <div className="container-login">
        <IconButton
          color="primary"
          variant="outlined"
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowBackIcon />{" "}
        </IconButton>
        <div className="form-side-login">
          <Routes>
            <Route path="/auth/user" element={<Form />} />
            <Route path="/auth/new-account" element={<NewAccountForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
