import React,{useState} from 'react';
import axios from "axios";
import { useNavigate  } from "react-router-dom";
//import '../../assets/css/material-dashboard.css';
import logo from  '../../assets/img/logo.png';
import './login.css';


function Login() {
    

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errMsg,setErrormsg] = useState('');
    const navigate = useNavigate();
    const loginUser = () =>
    {
        //console.log(username);
        const headers = {
            headers:{ 
                'Content-Type': 'application/json',
                //'Authorization': 'jairsjhkgasjhdgahjsfgdjhasdfhafsdjhajgsdhafsdjh',
                'auth':'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
            }
          }

        axios.post("https://itdevelopmentservices.com/eppay/api/login", {
        user_id: username,
        password: password,       
      },headers).then((response) => {
        console.log(response)
        if(response.data.success===true){
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("token",response.data.data.token);
            localStorage.setItem("display_name", response.data.data.display_name);
            localStorage.setItem("role", response.data.data.role);
            localStorage.setItem("reseller_id", response.data.data.reseller_id);
            localStorage.setItem("customerseq", response.data.data.customerseq);
            localStorage.setItem("user_name", username);
            localStorage.setItem("reseller_name", response.data.data.reseller_name);
            localStorage.setItem("customer_name",response.data.data.customer_name);
            localStorage.setItem("gmissionid", response.data.data.gmissionid);
            localStorage.setItem("seq", response.data.data.seq);
            localStorage.setItem("user_id", response.data.data.user_id);
            localStorage.setItem("userData", JSON.stringify(response.data.data));
            localStorage.setItem("auth", "ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQwMDFVVEM=");
            //alert();
            if(response.data.data.role===2){
                navigate("/dashboard", { replace: true });
                window.location.reload();
            }else if(response.data.data.role===3){
                navigate("/Customer_Dashboard", { replace: true });
                window.location.reload();
            }
            else if(response.data.data.role===1){
                navigate("/Admin_Dashboard", { replace: true });
                window.location.reload();
            }

            
        }else{
            //errMsg: response.data.message
            setErrormsg( response.data.data.error) 
            
        }

      })
    }
    
    return (
        
        <div>
            <div id="main-wrapper">

                <div className="wrapper_login">
                    <div className="logo"> <img src={logo} alt="logo"/> </div>
                    <div className="text-center mt-4 name"> EP Pay </div>
                    <p className="text-danger">{errMsg}</p>
                    <form className="p-3 mt-3" onSubmit={(e)=>e.preventDefault()}>
                        <div className="form-field d-flex align-items-center"> 
                            <span className="mdi mdi-account-outline"></span> 
                            <input type="text" name="username" value={username} id="username" onChange={(e)=>{setUsername(e.target.value)}} placeholder="Username"/> 
                        </div>
                        <div className="form-field d-flex align-items-center"> 
                            <span className="mdi mdi-key-variant"></span> 
                            <input type="password" value={password} name="password" onChange={(e)=>{setPassword(e.target.value)}} id="pwd" placeholder="Password"/> 
                        </div> 

                        <button className="btn mt-3" onClick={loginUser}>Login</button>
                    </form>

                    
                </div>

            </div>
        </div>
    );
  }
  
  export default Login;
  