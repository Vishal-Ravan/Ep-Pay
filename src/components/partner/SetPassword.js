import React,{useState,useEffect} from 'react';
import axios from "axios";
import {URL} from "../URL/url";
import {useTranslation} from 'react-i18next'; 
function SetPassword(){
  //language
  const {t, i18n} = useTranslation();  
  const [currentLanguage,setLanguage] =useState('en')
  let user_name = localStorage.getItem("user_name");
  let display_name = localStorage.getItem("display_name");
  let auth = localStorage.getItem("auth");
  let token = localStorage.getItem("token");
  let reseller_id = localStorage.getItem("reseller_id");
  let customerseq = localStorage.getItem("customerseq");
  let role = localStorage.getItem("role");
  let user_id = localStorage.getItem("user_id");
  const [newpassword,setNewPassword] = useState('');
  const [password,setPassword] = useState('');
  const [errMsg,setErrormsg] = useState('');
  const [sucMsg,setSucmsg] = useState('');
  

  const changepassword=()=>{
    //console.log(username);
    const headers = {
        headers:{ 
            'Content-Type': 'application/json',
            //'Authorization': 'jairsjhkgasjhdgahjsfgdjhasdfhafsdjhajgsdhafsdjh',
            'auth':'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
        }
      }

        axios.post(URL+"/change_password", {
        user_id: user_id,
        old_password: password,       
        new_password: newpassword,       
    },headers).then((response) => {
        console.log(response)
        if(response.data.success===true){
            setSucmsg( "Password Changed Successfully");
            
        }else{
            //errMsg: response.data.message
            setErrormsg( response.data.data.error) 
            
        }

    })
  };
    return(
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    

    <div className="container-fluid">
    <nav className="navbar navbar-main navbar-expand-lg px-0 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
      <div className="container-fluid py-1 px-0">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">{t('Home')}</a></li>
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{t('Admin')}</li>
          </ol>
          <h6 className="font-weight-bolder mb-0">{t('SetPassword')}</h6>
        </nav>
      </div>
    </nav>
    
        <div className="container-fluid pt-1 py-4 px-0">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-12 mb-4">
                <div className="card p-5">
                  <form  className="information_form"  onSubmit={(e)=>e.preventDefault()} >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input-group d-flex justify-content-center">
                        <h5><strong>{t('SetPassword')}</strong></h5>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-md-12">
                      <label className="input_label_padding_top">{t('Old Password')}</label>
                    </div>
                    <div className="col-md-12">
                      <div className="input-group">
                        <input type="text" className="form-control"  placeholder="admin" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="input_label_padding_top">{t('NewPassword')}</label>
                    </div>
                    <div className="col-md-12">
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="Please enter only if you want to change it." value={newpassword} onChange={(e)=>{setNewPassword(e.target.value)}}/>
                      </div>
                    </div>
                    <div className="col-md-12 mt-4">
                      <div className="input-group d-flex justify-content-center">
                        <button type="button" className="btn btn-outline-success allBtnsize"  onClick={changepassword}>{t('Save')}</button>
                      </div>
                    </div>
                    <p className="text-danger text-center">{errMsg}</p>
                    <p className="text-success text-center">{sucMsg}</p>
                  </div>
                </form>
                </div>
            </div>
          </div>       
        </div>
        </div>
      


     <footer className="card footer py-4">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-lg-12 mb-lg-0 mb-4">
              <div className="copyright text-center text-sm text-muted text-lg-center">
              {t('Copyright')} © 2021 <i className="fa fa-heart"></i>
                <a href="#!" className="font-weight-bold" target="_blank">EP Pay</a> {t('AllRightsReserved')}. 
              </div>
            </div>
       
          </div>
        </div>
      </footer>
  </main>
        
    );
}
export default SetPassword;