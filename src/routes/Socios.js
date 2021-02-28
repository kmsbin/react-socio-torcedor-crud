import React, {useEffect, useState} from 'react';
import { Input,Col, Row,Button ,Card, InputGroup, InputGroupButtonDropdown, DropdownToggle,DropdownMenu,DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { getClubes, registeSocioClube } from '../services/api';
import { Link } from 'react-router-dom';
import CustomToast from '../components/Toast';
import toast from 'react-hot-toast';

// import api from '../services/api';
// import axios from 'axios';
// import styles from './App.css'; 

export default function Socios() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [clubeItems, setClubeItems] = useState();
    const [dropDownTitle, setDropDomnTitle] = useState('clube')
    const [nomeSocio, setNomeSocio] = useState('')

    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
    
    useEffect(()=>{
        (async ()=>{
            const items = await getClubes()
            if(items){
                setClubeItems(items.data)
                setDropDomnTitle(items.data[0].nome_do_clube);   
                console.log(items.data)
            }
        })()
        
    },[]);

// const [count, setCount] = useState(0);

    return (
        <Card className='main'>
            <div className='card-main'>
                <p>Cadastrar sócio</p>
                <InputGroup>
                    <Input onChange={evt => setNomeSocio(evt.target.value)} />
                    <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                    <DropdownToggle caret>
                    {dropDownTitle}
                    </DropdownToggle>

                    <DropdownMenu modifiers={{
                        setMaxHeight: {
                            enabled: true,
                            order: 890,
                            fn: (data) => {
                                return {
                                    ...data,
                                    styles: {
                                        ...data.styles,
                                        overflow: 'auto',
                                        maxHeight: '300px',
                                    },
                                };
                            },
                        },
                        }}>
                        <DropdownItem header>Header</DropdownItem>
                        {clubeItems?.map(clube => {
                            return <DropdownItem 
                            key={clube.id.toString()} 
                            onClick={(nome) => 
                                setDropDomnTitle(clube.nome_do_clube)} 
                                >{clube.nome_do_clube}</DropdownItem>
                        })}

                    </DropdownMenu>
                    </InputGroupButtonDropdown>
                </InputGroup>
                <Row>
                    <Col className="mt-3">
                        <Button onClick={()=>{
                            if(nomeSocio ==='') {
                                toast.error('nome não pode estar vazio');
                                return;
                            }
                            const response = registeSocioClube(dropDownTitle, nomeSocio);
                            toast.promise(response, {
                                loading: 'carregando',
                                success: 'socio cadastrado com sucesso',
                                error: `clube ${nomeSocio} não existe já cadastrado`,
                            },);
                        }}>Cadastrar</Button>
                    
                    </Col>
                    <Col className="mt-3">
                        <Link to='cadastrar-clube'>
                            <Button>Clubes</Button>
                        </Link>
                    
                    </Col>
                    <Col className="mt-3">
                        <Link to='associados'>
                            <Button>Associados</Button>
                        </Link>
                    
                    </Col>
                </Row>
            </div>
            <CustomToast />
        </Card>
    );

}
