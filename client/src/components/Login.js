import React from 'react';
import $ from "jquery";
//import axios from 'axios'
import users from './user.json'

import { BrowserRouter as Router, Switch, Route, Link,Redirect,useHistory  } from 'react-router-dom';

import  {useLogin} from './context/LoginContext';

function Login(props) {
  const {handleLogin,handleUsername}=useLogin()

  console.log(props)
  let history = useHistory();
  //isLogin
  //setisLogin

 // userName
  //setuserName

  function userLogin(e){
      e.preventDefault();
    let username= document.getElementById('username').value
    let pasword= document.getElementById('password').value
 
      let strinDt=validateUserCredential(username,pasword)

      if(strinDt===true){
       alert('logged In')
                handleUsername(username)
                handleLogin()
                //$.noConflict();
                //props.setVisible(false)  
                
                history.push('/Dashboard')
      }else{
        $("#checker").fadeIn(100).delay(3000).fadeOut(2000)
      }  

  }

  function validateUserCredential(username,password){

   // let users= JSON.parse(localStorage.getItem('users'));
          let checker= users.some((arrVal)=> { 
              return username === arrVal.username && password ===arrVal.password; 
          });
          return checker;
   
  }

  return (
 
    
      <div style={{backgroundColor:'#f4f3ef'}}>

      <div  style={{backgroundImage: `url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&w=1000&q=80)`, backgroundSize: "cover",backgroundPosition: "top center",height: "100vh",}}>

            <div className="col-md-4" ></div>
      
            <div className="col-md-4 card" style={{ top: "8em",padding:38, backgroundColor:'#ffffffdb'}}>
              <div style={{backgroundColor:'#2f2e2e'}}><img src="images/logo.png" alt="Homepage" className="img-responsive center-block" style={{width: 400,height: 76}}/></div>
                <hr/>
              <div className="">
                


                      <form  onSubmit={userLogin}>

                            <div className="">
                            <div id="checker"  style={{display:'none'}} >
                                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                  <span aria-hidden="true">Username or password mismatch</span>
                                </button>
                            </div>
                            <label>Username</label>
                              <input type="text" className="form-control" id="username" placeholder="Enter Username here"/>
                              
                            </div>
                            <div className="">
                              <label >Password</label>
                              <input type="password" className="form-control" id="password" placeholder="Enter Password here"/>
                            </div>
                          
                            <div className="form-group" style={{marginTop:10,marginBottom:'3em'}}>
                              <input type="submit" value="Login" className="col-md-12 btn float-right login_btn"/>
                            </div>
                          </form>

              </div>
            </div>
            <div className="col-md-4" ></div>
      </div>
      </div>
  );
}

export default Login;
