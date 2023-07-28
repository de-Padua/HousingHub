import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { NumericFormat, NumericFormatProps } from "react-number-format";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ClearIcon from "@mui/icons-material/Clear";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler, set } from "react-hook-form";
import Textarea from "@mui/joy/Textarea";
import Alert from "@mui/joy/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { ContextF } from "../GlobalContext";
import { v4 as uuidv4 } from "uuid";

import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

export function BasicModal() {
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Seu anúncio está sendo processado
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Seu anúncio está sendo processado e logo estará disponível
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="$"
      />
    );
  }
);
interface State {
  numberformat: string;
}

type UserT = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  notifications: object[] | never[];
  posts_id: string[] | never[];
  id: string;
};
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
  userInfo: UserT;
  date:string
};

export default function CreateNewSalesAd() {
  const context = ContextF();

  const [userInfo, setUserInfo] = useState<UserT | null>(null);
  const [testOpen, setTestOpen] = useState<boolean>(false);

  useEffect(() => {
    if (context?.postSend === true) {
      setOpen(false);
      context?.setPostToFalse();
      navigate("/");
    }
  }, [context?.postSend]);

  useEffect(() => {
    if (context?.userData) {
      setUserInfo(context.userData);
    }
  }, [context?.userData]);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [images, setImages] = useState<string[]>([]);
  const [imagesUpload, setImagesUpload] = useState<Blob[]>([]);
  const [values, setValues] = React.useState<State>({
    numberformat: "1000",
  });
  const [cep, setCep] = React.useState<string | null>(null);
  const [imovel, setImovel] = React.useState("");
  const [logradouro, setLogradouro] = useState<string | null>(null);
  const [bairro, setBairro] = useState<string | null>(null);
  const [uf, setUF] = useState<string | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setImovel(event.target.value as string);
  };

  const handleChange_Value_Formated = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const deleteImageSet = (id: number) => {
    const filteredNewArrayOfImages = images.filter((image, index) => {
      return index !== id;
    });
    setImages(filteredNewArrayOfImages);
  };

  useEffect(() => {
    if (cep != null) {
      setLogradouro(null);
      setBairro(null);
      setUF(null);

      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => {
          if (!res.ok) {
            throw Error("error");
          }
          return res.json();
        })
        .then((data) => {
          setLogradouro(data.logradouro);
          setBairro(data.bairro);
          setUF(data.uf);
          console.log(data);
        });
    }
  }, [cep]);

  const onSubmit = handleSubmit((data) => {
    let today  = new Date()
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy as unknown 

    if (userInfo) {
      data.endereço = logradouro || "";
      data.bairro = bairro || "";
      data.estado = uf || "";
      data.valor = values.numberformat;
      data.id = uuidv4();
      data.id_user_owner = userInfo.id;
      data.userName = userInfo.name;


      const newData = { ...data, ownerData:userInfo.name,date:today};

      //check if any field is empty

      if (data.desc === "") {
        alert("Todos os campos precisam ser preenchidos");
      } else {
        handleOpen();

        imagesUpload.map((item) => {
          context
            ?.uploadImages(item, data.id, newData, imagesUpload.length)
            .catch((err) => console.log(err));
        });
      }
    }


    






  });
  return (
    <>
      <div className="top-side-new-ad-title">
        <div>
          <h2>Novo anúncio</h2>
        </div>
      </div>

      <div className="new-item-form">
        <div className="form-input-new-item">
          <Box sx={{ width: "100%", marginBottom: "2em" }}>
            <TextField
              color="success"
              id="outlined-basic"
              fullWidth
              label="Título do anúncio"
              margin="dense"
              variant="outlined"
              {...register("title", { required: true })}
            />
          </Box>
          <Box sx={{ width: "100%", marginBottom: "2em" }}>
            <TextField
              id="outlined-basic"
              fullWidth
              label="CEP"
              margin="dense"
              variant="outlined"
              type="number"
              {...register("cep", { pattern: /^\d{8}$/g })}
              onChange={(e) => {
                if (e.target.value.length === 8) {
                  setCep(e.target.value);
                } else if (e.target.value.length < 8) {
                  setCep(null);
                  setLogradouro(null);
                  setBairro(null);
                  setUF(null);
                }
              }}
            />
          </Box>
          <Box sx={{ width: "100%", marginBottom: "2em" }}>
            {bairro && (
              <TextField
                id="outlined-basic"
                fullWidth
                label="Bairo"
                margin="dense"
                variant="outlined"
                disabled
                defaultValue={bairro}
                {...register("bairro")}
              />
            )}
          </Box>
          <Box sx={{ width: "100%", marginBottom: "2em" }}>
            {logradouro !== null
              ? logradouro && (
                  <TextField
                    id="outlined-basic"
                    fullWidth
                    label="Endereço"
                    margin="dense"
                    variant="outlined"
                    disabled
                    defaultValue={logradouro}
                    {...register("endereço")}
                  />
                )
              : ""}
          </Box>
          <Box sx={{ width: "100%", marginBottom: "2em" }}>
            {uf && (
              <TextField
                id="outlined-basic"
                fullWidth
                label="Estado"
                margin="dense"
                variant="outlined"
                disabled
                defaultValue={uf}
                {...register("estado")}
              />
            )}
          </Box>
          <Box sx={{ width: "100%", marginBottom: "2em" }}>
            <TextField
              id="outlined-basic"
              fullWidth
              label="Tamanho em m²"
              margin="dense"
              variant="outlined"
              type="number"
              {...register("tamanho", { required: true })}
            />
          </Box>
          <Box sx={{ width: "100%", marginBottom: "2em" }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-label">
                Tipo de imóvel
              </InputLabel>
              <Select
                {...register("tipo")}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={imovel}
                label="Tipo de imóvel"
                onChange={handleChange}
              >
                <MenuItem value={"Casa"}>Casa</MenuItem>
                <MenuItem value={"Apartamento"}>Apartamento</MenuItem>
                <MenuItem value={"Outro"}>Outro</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: "100%", marginBottom: "2em" }}>
            <FormControl fullWidth sx={{ width: "100%" }}>
              <TextField
                {...register("valor", { required: true })}
                label="Valor"
                value={values.numberformat}
                onChange={handleChange_Value_Formated}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
                variant="outlined"
              />
            </FormControl>
          </Box>
          <Button
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            Criar novo anúncio
          </Button>
        </div>
        <div className="right-div">
          <Box sx={{ width: 500, marginBottom: "2em" }}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Descreva seu anúncio"
              multiline
              rows={4}
              variant="outlined"
              {...register("desc")}
            />
          </Box>
          <Box sx={{ width: 500, marginBottom: "2em" }}>
            <input
              type="file"
              name="files[]"
              accept="image/jpeg, image/png"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const url = URL.createObjectURL(e.target.files![0]);
                setImages((oldValue) => [...oldValue, url]);
                setImagesUpload((oldValue) => [
                  ...oldValue,
                  e.target.files![0],
                ]);
              }}
            />
          </Box>
          {images.length > 0 ? (
            <Box sx={{ width: 500, height: 450, overflowY: "scroll" }}>
              <ImageList
                variant="masonry"
                cols={2}
                gap={4}
                sx={{ padding: ".3em" }}
              >
                {images.map((item, id) => (
                  <ImageListItem key={item}>
                    <HighlightOffIcon
                      className="delete-image"
                      onClick={() => {
                        deleteImageSet(id);
                      }}
                    />
                    <img
                      src={item}
                      srcSet={item}
                      className="image-size"
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          ) : (
            <h2 style={{ fontFamily: "Roboto" }}>Nenhuma imagem selecionada</h2>
          )}
        </div>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
