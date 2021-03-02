import React, {useState, useEffect} from 'react';
import { Card, Badge, Row, Col,Button , Table } from 'reactstrap';
import { getAssociados, deleteSocioClube } from '../services/api';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import CustomToast from '../components/Toast';


export default function Associados() {
    const [associadosData, setAssociadosData] = useState([])


    useEffect(()=>{
        (async ()=>{
            const items = await getAssociados()
            items.data.sort((a, b)=> {
                var clubeA = a.nome_completo.toLowerCase(), clubeb = b.nome_completo.toLowerCase()
                if(clubeA < clubeb) {
                    return -1;
                }
                if(clubeA > clubeb) {
                    return 1;
                }
                return 0;
                // return a.nome_do_clube - b.nome_do_clube;
            })
            items.data.sort((a, b)=> {
                var clubeA = a.nome_do_clube.toLowerCase(), clubeb = b.nome_do_clube.toLowerCase()
                if(clubeA < clubeb) {
                    return -1;
                }
                if(clubeA > clubeb) {
                    return 1;
                }
                return 0;
                // return a.nome_do_clube - b.nome_do_clube;
            })


            setAssociadosData(items.data)
            console.log(items.data)
        })()
        
    },[]);

    return (
        <Card className='main'>
            <CustomToast />
            <div className='card-table'>
            <p>Associados</p>
            <div className="table">
            <Scrollbars autoHide >
                <Table borderless striped>
                <thead>
                    <tr>
                        <th>Socio</th>
                        <th>Clube</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody >
                {associadosData.map(associado => {
                    console.log(associado)
                    return <tr>
                        <td>{associado.nome_completo}</td>
                        <td>{associado.nome_do_clube}</td>
                        <td><Badge className="badge" key={associado.id}
                            onClick={(evt)=>{
                                console.log('clicado');
                                toast((e)=>(
                                    
                                    <span>
                                    <span className="dialog-text">
                                        <h4 className="text-md-left">
                                            Quer mesmo deletar o associado {associado.nome_completo}?

                                        </h4>
                                    </span>
                                    <div className='flex-dialog'>
                                    <Button 
                                        size="sm" 
                                        className="dialog-button flex-item" 
                                        color="danger"
                                        onClick={() => {
                                            const newAssociados = associadosData.filter((item)=>{ return item !== associado });
                                            setAssociadosData(newAssociados);
                                            let result = deleteSocioClube(associado.id_clube, associado.id_socio);
                                            toast.dismiss()
                                        
                                            toast.promise(result, {
                                                loading: 'carregando',
                                                success: 'socio deletado com sucesso',
                                                error: `clube ${associado.nome_completo} não existe já cadastrado`,
                                            },);
                                        }}>
                                        Sim
                                        </Button>

                                    <Button color="danger" size="sm" onClick={() => toast.dismiss()}>Não</Button>

                                    </div>
                                </span>
                                ))
                            }}
                            color="danger" 
                            pill> Delete </Badge></td>
                    </tr>
                    
                })}
                </tbody>
                </Table>
            </Scrollbars>
            </div>
            <Row>
                <Col className="mt-3">
                    <Link to='/cadastrar-socio'>
                            <Button>Socios</Button>
                        
                    </Link>
                </Col>
                <Col className="mt-3">
                    <Link to='/cadastrar-clube'>
                            <Button>Clubes</Button>
                        
                    </Link>
                </Col>

            </Row>
            </div>

        </Card>
    )
}