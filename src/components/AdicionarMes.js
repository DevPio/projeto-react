import React from 'react'
import {useState} from 'react';
import {Redirect} from 'react-router-dom';
import 
{
 
  Container,
  FormGroup,
  Label,
  Button,
  Input
}
from 'reactstrap';
import {toast} from 'react-toastify';




const minYear = 2000;
const maxYear = 2021;

const minMonth = 1;
const maxMonth = 12;




const generationYear = () => {
    const optionsYear = [];

    for (let year = minYear; year <= maxYear; year++) {
        optionsYear.push(<option key={year} value={year}>{year}</option>)
    }
  
    return (
        optionsYear
    )
}

const generationMonth = ()=> {
    const optionsMonth = [];

    for (let month = minMonth; month <= maxMonth; month++) {
        optionsMonth.push(<option key={zeroPad(month)} value={zeroPad(month)}>{zeroPad(month)}</option>)
    }
    return (
        optionsMonth
    )
}

const zeroPad = num => num < 10 ?  num : num;


toast.configure()
export default function AdicionarMes() {
    
    const [inputSelect, setInputSelect] = useState({
        mes:'',
        ano:'',
        
    
      })

    const [redirect, setRedirect] = useState({
        mes:'',
        ano:'',
        
    })

      const sendData =  ()=>{
        if(!inputSelect.mes && !inputSelect.ano){
            toast.error('Preencha o mes e o ano.',{position:toast.POSITION.TOP_CENTER})
            return
        }
     
        setRedirect(inputSelect)
         
      }

      const setInput = name => (event)=> 
                        setInputSelect({...inputSelect,[name]:event.target.value})
    if(redirect.mes && redirect.ano){
        return <Redirect  to={`/movimentacoes/${inputSelect.ano}-${inputSelect.mes}`} ></Redirect>
    }
                        
                      
    return (
        <React.Fragment>
            <Container style={{marginTop:'60px'}} >
                <FormGroup>
                    <Label>Mes</Label>
                
                    <Input  type="select" invalid={!inputSelect.mes} 
                    onChange={setInput('mes')} >
                        <option ></option>
                       {generationMonth()}
                    </Input>
                   
                </FormGroup>
                <FormGroup >
                    <Label >Ano</Label>
                
                    <Input type="select"
                    
                    onChange={setInput('ano')}
                    invalid={!inputSelect.ano}
                    >
                        <option ></option>
                        {generationYear()}
                        
                    </Input>
                    <Button color="primary" onClick={sendData} style={{marginTop:'10px'}} size="lg" block>Redirecionar</Button>
                </FormGroup>
            
            </Container>
        </React.Fragment>
    )
}
