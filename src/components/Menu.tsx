import React,{useState} from "react";
import Divider from '@mui/joy/Divider';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';










export  function InputDecorators() {
  const [currency, setCurrency] = React.useState('real');
  return (
    <Input
    type="number"
      placeholder="Valor máximo"
      startDecorator={{ real: 'R$'}[currency]}
      endDecorator={
        <React.Fragment>
          <Divider orientation="vertical" />
          <Select
            variant="plain"
            
            value={currency}
            onChange={(_, value) => setCurrency(value!)}
            sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent', } }}
          >
            <Option value="real">Real</Option>
         
          </Select>
        </React.Fragment>
      }
      sx={{ width: 300 }}
    />
  );
}









type Props = {
  options: string[];
  handleMenuOptionIndex:(data:number)=>void,
  handleMenuSizeOptions:(data:number)=>void
};







export default function Menu({ options,handleMenuOptionIndex }:
  
  
  Props) {

    const [clickedButton,seClickedButton] = useState<number>(0)

  return (
    <div className="menu">
      {options && options.map((option,index) => 
       <p key={index} style={clickedButton === index ? {backgroundColor:"#9772dc",color:"white"} : {backgroundColor:"transparent"}} onClick={()=>{
          handleMenuOptionIndex(index)
          seClickedButton(index)
          
         }}>{option}</p>

      )}
      <h3>Por valor máximo</h3>
      <InputDecorators />
    </div>
  );
}
