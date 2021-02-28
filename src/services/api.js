import axios from "axios";

const api = axios.create({
    baseURL: "https://teste-dataclick-api.herokuapp.com/"
});

const getClubes = ()=>{
    const options = {
        url: 'https://teste-dataclick-api.herokuapp.com/list-clubes',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin' : '*'
        },
      };
    
    return axios(options).then((data)=>{

        return data; 
    }).catch((erro)=>{ console.error(erro) })
}


const clubeRegister = (newClube)=>{
    const options = {
        url: 'https://teste-dataclick-api.herokuapp.com/create-clube',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin' : '*'
        },
        data: {
            nome_clube: newClube
        }
      };
      return axios(options).then((data)=>{
        if(data.data.status === "0") {
          
          throw new Error("Clube já cadastrado")
        }
        return data; 
    }).catch((e)=>{
      console.log(e)
      throw new Error(e)
    })

}
const registeSocioClube = (clube, socio)=>{
    const options = {
        url: 'https://teste-dataclick-api.herokuapp.com/create-usuario-clube',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin' : '*'
        },
        data: {
            nome_do_clube: clube,
            nome: socio
        }
      };
      return axios(options).then((data)=>{
         if(data.data.status === "0"){
          throw new Error('clube não existe')
        }
        
        return data; 
      }).catch((erro)=>{
        throw new Error('clube não existe')
        console.error(erro) 
      })
}

const deleteSocioClube = (clube, socio)=>{
  console.log(`clube ${typeof clube} socio ${typeof socio}`)

  const options = {
      url: 'https://teste-dataclick-api.herokuapp.com/delete-usuario-clube',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin' : '*'
      },
      data: {
          id_clube: clube,
          id_socio: socio
      }
    };
    return axios(options).then((data)=>{
      // console.log(data.data)

      return data; 
  }).catch((erro)=>{ console.error(erro) })
}

const getAssociados = ()=>{
    const options = {
        url: 'https://teste-dataclick-api.herokuapp.com/list-usuarios-clubes',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin' : '*'
        },
      };
    
    return axios(options).then((data)=>{

        return data; 
    }).catch((erro)=>{ console.error(erro) })
}


export {getClubes, api, deleteSocioClube, clubeRegister, registeSocioClube, getAssociados};