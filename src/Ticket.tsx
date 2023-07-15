import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';

type tProps = {
  title:string,
  adress:string,
  id:string,
  estado:string
  images:string[]
}
export default function InteractiveCard({title,adress,id,estado,images}:tProps) {
  const url_id =  new URL(window.location.href).searchParams
  const string_id = url_id.get("user")


  return (
    <Card
    
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 400,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
    >
      <AspectRatio ratio="1" sx={{ width: 100 ,height:"100%" }}>
        <img
          src={images[0]}
          srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <Link className='link-to-add' to={`/item/?id=${id}&by=${string_id}`}>
       
      <CardContent>
        <Typography level="body2" fontSize="sm" id="card-description" mb={0.5}>
          {title}
        </Typography>
        <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
          
          
            {adress},{estado}
         
        </Typography>
        <Chip
          variant="outlined"
          color="primary"
          size="sm"
          sx={{ pointerEvents: 'none' }}
        >
          {id}
        </Chip>
      </CardContent>
      </Link>
    </Card>
  );
}