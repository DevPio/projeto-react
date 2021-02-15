import React,{ useState} from 'react';
import {init} from '../Hooks/rest';
import {toast} from 'react-toastify';
import 
{
 
    Container,
    Table,
    Input,
    Button,
    Card, 
    CardTitle, 
    CardText,
    Col,
    Row,
    Label,
    Form,
    FormGroup,
    Spinner
}
from 'reactstrap';

import {usePost} from '../Hooks/UsePost';
import {useDelete} from '../Hooks/UseDelete';
import 'react-toastify/dist/ReactToastify.css';
import {usePatch} from '../Hooks/Usepatch';

const {useGet} = init('https://my-money-44b2b-default-rtdb.firebaseio.com/movimentacoes/');
const {useGet : useGetMes} = init('https://my-money-44b2b-default-rtdb.firebaseio.com/meses/');



toast.configure()
export default function MovimentacoesData({match}) {
    const data =  useGet(match.params.data)
    const [inputValue, setInputValue] = useState({
        descricao:'',
        valor:''
    });

    const [alterarPrevisao, setalterarPrevisao] = useState(false);

    const [pacthChange, setpacthChange] = useState(null);
    
    const getMes = useGetMes(match.params.data)

    const pacth = usePatch(`https://my-money-44b2b-default-rtdb.firebaseio.com/meses/`)
    
    const postSend = usePost(`https://my-money-44b2b-default-rtdb.firebaseio.com/movimentacoes/${match.params.data}.json`)
    
    const deleteData = useDelete(`https://my-money-44b2b-default-rtdb.firebaseio.com/movimentacoes/${match.params.data}/`)

    




   const sendData = async () => {

        if(!inputValue.descricao && !inputValue.valor){
            toast.error('Preencha todos os dados',{position:  toast.POSITION.TOP_CENTER})
            return
        }

      const post = await postSend.sendData(inputValue)
        setInputValue({
            descricao:'',
            valor:''
        })

       const result = await  data.refetch()

        setTimeout(() => {
            getMes.refetch()
        }, 2000);
   }

   const changeField = async ()=>{
       if(!pacthChange){
           toast.error('Preencha o campo para alteracao',{position:toast.POSITION.TOP_RIGHT})
           return
       }

      await pacth.patch({urlParse:[match.params.data],data:{
        previsao_entrada:[pacthChange]
       }})

        setTimeout(()=>{
            data.refetch()
        },8000)
   }
    
    const deleteId = async id => {

       await deleteData.deleteSend(id)

       await  data.refetch()

       setTimeout(() => {
        getMes.refetch()
    }, 2000);
    }
       
  
    if(!getMes.data){

        return (
            <Container style={{marginTop:'40px',textAlign:'center'}}>
                <Spinner></Spinner>
            </Container>
        )
    }
           
    
    
    return (
        <React.Fragment>
            <Container style={{marginTop:'40px'}} >
                <Row>
                    <Col>
                        <Card body inverse color="success" >
                            <CardTitle tag="h5">Previsao de entradas.</CardTitle>
                            <CardText>{getMes && getMes.data.entradas}</CardText>
                            
                            <CardTitle tag="h5">Entradas.</CardTitle>
                            <CardText>{getMes && 'R$ ' + getMes.data.previsao_entrada}</CardText>
                        </Card>
                    </Col>
                    <Col>
                        <Card body inverse color="danger" >
                            <CardTitle tag="h5">Previsao de saída.</CardTitle>
                            <CardText>{getMes && getMes.data.saidas}</CardText>

                            <CardTitle tag="h5">Saída.</CardTitle>
                            <CardText>{getMes && 'R$ ' + getMes.data.previsao_saida}</CardText>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container style={{marginTop:'40px'}} >
                <Button onClick={()=> setalterarPrevisao(!alterarPrevisao)}>Alterar Previsao de entradas.</Button>


                {alterarPrevisao &&
                    <Form style={{marginTop:'40px'}}>
                        <FormGroup>
                            <Label>Alterar Preivao de entrada.</Label>
                            <input onBlur={event => setpacthChange(event.target.value) } className="form-control" placeholder='Altere a previsao de entrada' />
                        </FormGroup>
                        <FormGroup>
                            <Button onClick={changeField}>Enviar alteracoes</Button>
                        </FormGroup>
                    </Form>
                }
            </Container>
            <Container style={{marginBottom:'80px'}}>
                <Table striped style={{marginTop:'60px'}}>
                <thead>
                    <tr>
                    <th>Descricao</th>
                    <th>Valor</th>
                    <th>Deletar</th>
                   
                    </tr>
                </thead>
                    <tbody>
                    {data.data  ?
                    
                    Object.keys(data.data).map(item=>{
                        
                        return (
                            <tr key={item}>
                                <th scope="row">{data.data[item].descricao}</th>
                                <td>{data.data[item].valor}</td>
                                <td><Button color="danger" onClick={()=> deleteId(item)}>Deletar</Button></td>
                            </tr>
                        )
                    }): ''}

                    <tr>
                        <th>
                            <Input 
                                type='text' 
                                placeholder='Adicione uma nova descricao'  
                                value={inputValue.descricao}
                                onChange={event=> setInputValue({...inputValue,['descricao']:event.target.value})}
                                />
                        </th>
                        <td style={{position:'relative'}} >
                            <Input 
                                type='text' 
                                placeholder='Adicione um novo valor'  
                                value={inputValue.valor}
                                onChange={event=> setInputValue({...inputValue,['valor']:event.target.value})}
                                />
                           
                        </td>
                        <td>
                        <Button 
                           color='success'
                            onClick={sendData}
                            >Adicionar</Button>
                        </td>
                    </tr>
                    </tbody>
                    
                </Table>
            </Container>
        </React.Fragment>
    );
}
