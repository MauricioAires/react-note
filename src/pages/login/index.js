import React, { Component } from 'react';
import { Form,Input} from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import firebase from '../../Firebase';
import { BodyLogin, DivForm } from './styles.js';
class login extends Component {
  constructor(props){
    super(props);
    this.state ={
      userData:[]
    }
  }
  
  componentDidMount(){
    if(localStorage.getItem('@token')){
      const id = localStorage.getItem('@token');
      this.props.history.push(`/dashboard/${id}`)
    }
    
  }

  handleClickLogin = (data) => {
    const email = data.email;
    const pass = data.senha;
    
    firebase.auth().signInWithEmailAndPassword(email,pass)
    .then((userData) => this.setState({ userData },()=>{
      localStorage.setItem("@token",this.state.userData.user.uid)
      localStorage.setItem("@email",this.state.userData.user.email)
      localStorage.setItem("@name",this.state.userData.user.displayName)
      
      this.props.history.push(`/dashboard/${this.state.userData.user.uid}`)
    }) )
    .catch((erro) => {
      console.error("Erro ao autentica",erro);
    })
  }

  render() {
    return(
        <BodyLogin>
          
            <Link to="/">
              <header>
                <h1>React Note</h1>
                <img src={logo} alt="logo" />
              </header>
            </Link>
         
          
           
              <DivForm>
                <h2>Acessar conta</h2>
                <Form onSubmit={this.handleClickLogin} className="form">
                    <Input  type="email" name="email" placeholder="Email" />
                    <Input security="true" type="password" name="senha" placeholder="Senha" />
                    <Input type="submit" name="login" value="ENTRAR"/>
                    <Link to="/register">
                      <Input type="submit" name="register" value="CADRASTRE-SE" />
                    </Link>
                </Form>
              </DivForm>
          
          
        </BodyLogin>
    );
  }
}
export default login;