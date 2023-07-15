import React from 'react'

import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Badge from '@mui/material/Badge/Badge';
import Chip from '@mui/joy/Chip';


type tProps = {
    title:string,
    desc:string,
    chip?:string
    tipe:string
}

export default function Notification({title,desc,chip,tipe}:tProps) {
  return (
   
    <Card
   
    sx={{
      boxShadow: 'none',
      width: 400,
      margin:.7,
      '&:hover': { boxShadow: 'none', borderColor: 'neutral.outlinedHoverBorder' },

    }}
  >
    <Badge> 
    <CardContent>
      <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
       {title}
      </Typography>
      <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
        <Link
          overlay
          underline="none"
          href="#interactive-card"
          sx={{ color: 'text.tertiary' }}
        >
         {desc}
        </Link>
      </Typography>
     {chip &&  <Chip  
        onClick={function(){ return}}
        size="sm"
        variant="soft">{chip}</Chip>}
    </CardContent>
    </Badge>
  </Card>
  
  )
}
