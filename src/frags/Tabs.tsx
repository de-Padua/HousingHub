import * as React from "react";
import {useEffect } from "react"; 
import Box from "@mui/joy/Box";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import Button from '@mui/joy/Button';


type props = {
  handlePage: (page: string) => void;
};
export default function TabsVariants({ handlePage }: props) {
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    if(index === 0) {
      handlePage("an");
    }
    else if(index === 1){
      handlePage("fav");
    }
  
  }, [index])
  
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        marginBottom: "1em",
      }}
    >
      <Tabs
        variant="soft"
        color="info"
        aria-label="Plain tabs"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
        sx={{ borderRadius: "sm" }}
      >
        <TabList variant="soft">
          <Tab
            
            variant={index === 0 ? "outlined" : "plain"}
          >
            Anúncios
          </Tab>
          <Tab
           
            variant={index === 1 ? "outlined" : "plain"}
          >
            Favoritos
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}
