import * as React from "react";
import { ContextF } from "./GlobalContext";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
type tProps = {
  title: string;
  adress?: string;
  id: string;
  estado?: string;
  images?: string[];
  fav: boolean;
};
export default function InteractiveCard({
  title,
  adress,
  id,
  estado,
  images,
  fav,
}: tProps) {
  const url_id = new URL(window.location.href).searchParams;
  const string_id = url_id.get("user");
  const context = ContextF();
  const deleteThisFav = (id: string): void => {
    if (context?.userData) {
      context.deleteFav(id);
    }
  };
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: images ? 400 : 350,
      }}
    >
      {fav ? (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <IconButton
            variant="outlined"
            color="danger"
            onClick={() => {
              deleteThisFav(id);
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      ) : (
        ""
      )}
      {images && (
        <AspectRatio ratio="1" sx={{ width: 100, height: "100%" }}>
          <img
            src={images[0]}
            srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      )}
      <Link className="link-to-add" to={`/item/?id=${id}&by=${string_id}`}>
        <CardContent>
          <Typography
            level="body2"
            fontSize="sm"
            id="card-description"
            mb={0.5}
          >
            {title}
          </Typography>
          <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
            {adress && `${adress},${estado}`}
          </Typography>
          <Chip
            variant="outlined"
            color="primary"
            size="md"
            sx={{ pointerEvents: "none" }}
          >
            {id}
          </Chip>
        </CardContent>
      </Link>
    </Card>
  );
}
