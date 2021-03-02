import React, {useState} from 'react';
import { Button,Row,Card, Col, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import  { clubeRegister } from '../services/api';
import toast from 'react-hot-toast';
import CustomToast from '../components/Toast';
// import styles from './App.css'; 

export default function Clube() {
    const [inputClube, setInputClube] = useState("");
    

    return (
        <Card className='main'>
            <div className='card-main'>
                <p>Cadastro de clube</p>

                <Input placeholder='digite seu clube' onChange={evt => setInputClube(evt.target.value)}/>
                {/* <div className='row-buttons'> */}
                <Row>
                    
                    <Col className="mt-3">
                            <Button  color="secondary" onClick={ ()=> {
                                
                                if(inputClube ==='') {
                                    toast.error('clube não pode ser nulo');
                                    return
                                }
                                const socio = clubeRegister(inputClube)
                                toast.promise(socio, {
                                    loading: 'Loading',
                                    success: 'clube cadastrado com sucesso',
                                    error: `clube ${inputClube} já cadastrado`,
                                },);
                                // console.log(socios)
                            }}>
                                Cadastrar 
                            </Button> 
                    </Col>
                    <Col className="mt-3">
                        <Link to="/cadastrar-socio">
                            <Button color="secondary" >
                                Socios
                            </Button> 
                        </Link>
                    </Col>
                    <Col className="mt-3">
                        <Link to='/associados'>
                            <Button color="secondary" s>
                                Associados
                            </Button> 
                        </Link>
                    </Col>
                </Row>
               <CustomToast />
                {/* <Alert severity="success">This is a success message!</Alert> */}
                {/* </div> */}
            </div>

        </Card>
    );

}
