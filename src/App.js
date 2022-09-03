import React, { Component,useState } from "react";
//import logo from './logo.svg';
import './App.css';
import './assets/css/nucleo-icons.css';
import './assets/css/nucleo-svg.css';
import './assets/i18n/i18n';
import {useTranslation} from 'react-i18next';
//import 'bootstrap/dist/css/bootstrap.min.css';



import Signin from "./components/login/Login";
import Dashboard from "./components/partner/Dashboard";
import ErrorPage from "./components/ErrorPage";
import Header from "./components/partner/Header";
import Information from "./components/partner/Information";
import Membershipcard from "./components/partner/Membershipcard";
import Kioskmanagement from "./components/partner/Kioskmanagement";
import Bydate from "./components/partner/Bydate";
import Byjob from "./components/partner/Byjob";
import ByMFCard from "./components/partner/ByMFCard";
import Printer from "./components/partner/Printer";
import Support from "./components/partner/Support";
import SetPassword from "./components/partner/SetPassword";
// customer
import Customer_Dashboard from "./components/customer/CustomerDashboard";
import CustomerInformation from "./components/customer/CustomerInformation";
import Kiosk from "./components/customer/Kiosk";
import Salesinformationbydate from "./components/customer/Salesinformationbydate";
import Detailsbyperiod from "./components/customer/Detailsbyperiod";
import Customerprinter from "./components/customer/Customerprinter";
//admin
import AdminDashboard from "./components/admin/AdminDashboard";
import Partner from "./components/admin/Partner";
import Customer from "./components/admin/Customer";
import PayReader from "./components/admin/PayReader";
import Kiosks from "./components/admin/Kiosks";
import Managementmembershipcard from "./components/admin/Managementmembershipcard";
import Loginuser from "./components/admin/Loginuser";
import Sales_by_day from "./components/admin/Sales_by_day";
import Details_by_case from "./components/admin/Details_by_case";
import Membership_card from "./components/admin/Membership_card";
import Adminprinter from "./components/admin/Adminprinter";
import SetReader from "./components/admin/SetReader";
import AdminSupport from "./components/admin/AdminSupport";


import { HashRouter as Router, Route, Routes, NavLink } from "react-router-dom";


function App() {
  const {t, i18n} = useTranslation();  
  const [currentLanguage,setLanguage] =useState('en');
  //var userLang = navigator.language || navigator.userLanguage; 
  //alert ("The language is: " + userLang);
  let navLink = (
    <Header/>
  );
  const login = localStorage.getItem("isLoggedIn");
  let role = localStorage.getItem("role");
  return (
    <div>
      {login ? (
        
        <Router>
          {navLink}
          <Routes>
          {role==1 &&
            <Route exact path="/" element={<AdminDashboard/>}></Route>
          }
          {role==2 &&
            <Route exact path="/" element={<Dashboard/>}></Route>
          } 
          {role==3 &&
            <Route exact path="/" element={<Customer_Dashboard/>}></Route>
          }  
            <Route path="/dashboard" exact element={<Dashboard/>}></Route>
            <Route path="/information" exact element={<Information/>} title="Information"></Route>
            <Route path="/membership-card" exact element={<Membershipcard/>}></Route>
            <Route path="/Kiosk-management" exact element={<Kioskmanagement/>}></Route>
            <Route path="/Byday" exact element={<Bydate/>}></Route>
            <Route path="/Byjob" exact element={<Byjob/>}></Route>
            <Route path="/ByMFCard" exact element={<ByMFCard/>}></Route>
            <Route path="/Printer" exact element={<Printer/>}></Route>
            <Route path="/Support" exact element={<Support/>}></Route>
            <Route path="/SetPassword" exact element={<SetPassword/>}></Route>
            {/* customer */}
            <Route path="/Customer_Dashboard" exact element={<Customer_Dashboard/>}></Route>
            <Route path="/CustomerInformation" exact element={<CustomerInformation/>}></Route>
            <Route path="/Kiosk" exact element={<Kiosk/>}></Route>
            <Route path="/Salesinformationbydate" exact element={<Salesinformationbydate/>}></Route>
            <Route path="/Detailsbyperiod" exact element={<Detailsbyperiod/>}></Route>
            <Route path="/Customerprinter" exact element={<Customerprinter/>}></Route>
            {/* Admin */}
            <Route path="/Admin_Dashboard" exact element={<AdminDashboard/>}></Route>
            <Route path="/Partner" exact element={<Partner/>}></Route>
            <Route path="/Customer" exact element={<Customer/>}></Route>
            <Route path="/PayReader" exact element={<PayReader/>}></Route>
            <Route path="/Kiosks" exact element={<Kiosks/>}></Route>
            <Route path="/Managementmembershipcard" exact element={<Managementmembershipcard/>}></Route>
            <Route path="/Loginuser" exact element={<Loginuser/>}></Route>
            <Route path="/Sales_by_day" exact element={<Sales_by_day/>}></Route>
            <Route path="/Details_by_case" exact element={<Details_by_case/>}></Route>
            <Route path="/Membership_card" exact element={<Membership_card/>}></Route>
            <Route path="/Adminprinter" exact element={<Adminprinter/>}></Route>
            <Route path="/SetReader" exact element={<SetReader/>}></Route>
            <Route path="/AdminSupport" exact element={<AdminSupport/>}></Route>
            <Route path="*" element={<ErrorPage/>}></Route>
          </Routes>
        </Router>
      ):(
        <Router>
          {/* {navLink} */}
          <Routes>
            <Route exact path="/" element={<Signin/>}></Route>        
            {/* <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/information" element={<Information/>}></Route>
            <Route path="*" element={<ErrorPage/>}></Route> */}
          </Routes>
        </Router>

      )}     
    </div>
  );
}

export default App;
