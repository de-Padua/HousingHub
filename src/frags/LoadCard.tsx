import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

export default function BasicCard() {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{ width: 330, backgroundColor: "rgba(235, 235, 235, 0.24)" }}
    >
      <div>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        <Skeleton variant="rounded" width={"100%"} height={30} />

        </Typography>
        <Typography level="body2">
          {" "}
          <Skeleton variant="rounded" width={"90%"} height={15} />
        </Typography>
        
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
      <Skeleton variant="rounded" width={"100%"} height={"100%"} />

      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography fontSize="lg" fontWeight="lg">
          <Skeleton variant="rounded" width={210} height={30} />

          </Typography>
        </div>
    
      </CardContent>
    </Card>
  );
}
