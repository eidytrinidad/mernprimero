import React from "react";
import { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import clienteAxios from './config/axios'

//Componentes
import  Cita  from "./components/Cita";
import  NuevaCita  from "./components/NuevaCita";
import { Pacientes } from "./components/Pacientes";

function App() {

  const [citas, setCitas] = useState([])
  const [consulta, setConsulta] = useState(true)

  const consultarAPI=()=>{
     clienteAxios.get('/pacientes')
                  .then(res=>{
                    setCitas(res.data)
                    setConsulta(false)
                  })
                  .catch(err=>console.log(err))
  }

  useEffect(() => {

   if (consulta) {
    consultarAPI()
   } 
  

  }, [consulta])


  return (
    <Router>
      <Switch>
        <Route exact path="/" component={()=><Pacientes citas={citas}/>} />
        <Route exact path="/nueva" component={()=><NuevaCita setConsulta={setConsulta}/>} />
        <Route exact path="/cita/:id" component={()=><Cita setConsulta={setConsulta}/>} />
        {/* <Redirect to="/"/> */}
      </Switch>
    </Router>
  );
}

export default App;
