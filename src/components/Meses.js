import React from 'react';
import {Link} from 'react-router-dom';
import 
{
 
  Container,
  Spinner,
  Table
}
from 'reactstrap';
import {init} from '../Hooks/rest';
function Meses() {
    const {useGet} = init('https://my-money-44b2b-default-rtdb.firebaseio.com/')
  
  
  const data = useGet('meses')

 
    const percorre = ()=>  {

      return Object.keys(data.data).map(item=>(
        <tr key={item}>
            <th scope="row"><Link to={`/movimentacoes/${item}`}>{item}</Link></th>
            <td>{data.data[item].previsao_entrada}</td>
            <td>{data.data[item].previsao_saida}</td>
            
          </tr>
      ))

    }
          
      
      

      

      if(Object.keys(data.data).length > 0){
        return (
            <React.Fragment>
                <Container style={{marginBottom:'80px'}}>
                    <Table striped style={{marginTop:'60px'}}>
                    <thead>
                        <tr>
                        <th>Mes/Ano</th>
                        <th>Previsao de Entrada</th>
                        <th>Previsao de Saída</th>
                        </tr>
                    </thead>
                        <tbody>
                        {percorre()}
                        </tbody>
                    </Table>
                </Container>
            </React.Fragment>
        )

      }
      else{
        return <Container style={{textAlign:'center'}}><Spinner style={{marginTop:'60px'}} color='primary' /></Container> 
      }

      
   
}



export default Meses

