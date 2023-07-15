import React,{useState,useEffect} from 'react'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CircularProgress from '@mui/joy/CircularProgress';

type Tprops = {
    images:string[] | null
}
export default function Galeria({images}:Tprops) {

    const [currentIndex,setCurrentIndex] = useState<number>(0)
    


    const onNextClick = () => {
       if(images){
        if (currentIndex === images.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex(currentIndex + 1);
          }
       }
      };
    
      const onPrevClick = () => {
        if(images){
            if (currentIndex === 0) {
                setCurrentIndex(images.length - 1);
              } else {
                setCurrentIndex(currentIndex - 1);
              }
        }
      };

  return (
    <div className='galeria'> 
     <ArrowCircleLeftIcon color="action" className='arrow-icon-padding' sx={{ fontSize: 30 }} onClick={()=>{
        onPrevClick()
     }} />
        <div className='images-row'>
           
          {images ? <img src={images[currentIndex]} key={currentIndex} /> : <CircularProgress variant="outlined" />
}
          {images ? images.map((image,index)=>{
            return <>  
              <p className='images-lenght'>{currentIndex + 1}/{images.length}</p>
               </> 
          }) : "Load..."}
        </div>
        <ArrowCircleRightIcon sx={{ fontSize: 30 }}  color="action" className='arrow-icon-padding' onClick={()=>{
        onNextClick()
     }}/>

    </div>
  )
    }
