import React,{useState,useEffect} from 'react';
import axios from "axios";
import { Modal} from "react-bootstrap";
import { CSVLink } from "react-csv";
import Successmsg from "./success";
import Warningmsg from "./warning";
import {URL} from "../URL/url";
import {useTranslation} from 'react-i18next';
function Information() {
    //language
    const {t, i18n} = useTranslation();  
    const [currentLanguage,setLanguage] =useState('en');
    let user_name = localStorage.getItem("user_name");
    let display_name = localStorage.getItem("display_name");
    let auth = localStorage.getItem("auth");
    let token = localStorage.getItem("token");
    let reseller_id = localStorage.getItem("reseller_id");
    let customerseq = localStorage.getItem("customerseq");
    let reseller_name = localStorage.getItem("reseller_name");
    let customer_name = localStorage.getItem("customer_name");
    let gmissionid = localStorage.getItem("gmissionid");
    let role = localStorage.getItem("role");
    let seq = localStorage.getItem("seq");
    let user_id = localStorage.getItem("user_id");
    const [data, setData] = useState([]);
    const headerss = [(data)];
    const [searchValues, setSearchValues] = useState("")
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(URL);
        const responseData = await response.data.Table;
        console.log(responseData);
        setData(responseData);
      };
      fetchData();
    }, []);
    const [datacal, setDatacal] = useState([]);
    //const [sorting, setSorting] = useState({ field: "", order: "" });
    const [isOpen, setisOpen] = useState(false);
    const [isOpenPasswordMOdal, setisOpenPasswordMOdal] = useState(false);
    const [modelCustomerName,setmodelCustomerName] = useState('');
    const [modelTid,setmodelTid] = useState('');
    const [modelModelName,setmodelModelName] = useState('');
    const [modelSerialNo,setmodelSerialNo] = useState('');
    const [modelVersion,setmodelVersion] = useState('');
    const [modelEmplacement,setmodelEmplacement] = useState('');
    const [modeltids,setModeltid] = useState('');
    const [modelsn,setModelsn] = useState('');
    const [modellocation,setModellocation] = useState('');
    const [password,setPassword] = useState('');
    const [cnfpassword,setCnfPassword] = useState('');
    const [isOpensuccessmsg, setisOpensuccessmsg] = useState(false);
    const [isOpensuccessmsgw, setisOpensuccessmsgw] = useState(false);
    const [message, setmessage] = useState('');
    const [warmessage, setwarmessage] = useState('');
    const [username, setUsername] = useState(display_name);
    const[order,setorder] = useState("ASC");

    const title = [
      { label: "Customer", key: "customer" },
      { label: "Location", key: "location" },
      { label: "TID", key: "tid" },
      { label: "Model Name", key: "kiccmodel" },
      { label: "Version", key: "kiccver" },    
      { label: "Serial No.", key: "kiccserial" },
      { label: "Last modification date", key: "lastupdate" },
      { label: "Last used date", key: "activetime" },
    ];
    //const cors = require('cors');
    async function searchbalance(){
      const headers = {
        headers:{ 
            'Content-Type': 'application/json',                
            'auth':'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
        }
      }
    
      await axios.post(URL+"/getdataurl",{ gmissionid:""},headers) 
           
        .then((response) => {            
            setDatacal(response.data);
            console.log(response)
          }) 
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          })
    }
    

    async function GetPayReaderList(){
      const headers = {
        headers:{ 
            'Content-Type': 'application/json',                
            'auth':'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
        }
      }
    
      await axios.post(URL+"/GetPayReaderList",{ role:role,reseller_id:reseller_id,customer_name:'' },headers) 
           
        .then((response) => {            
            setData(response.data.data);
          }) 
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          })
    }
    
    
    useEffect(() => { 
        
      GetPayReaderList()
      searchbalance()
         
    }, []);
    const openPasswordModal=()=>{
        if(password===''){
           
        }else{
            setisOpenPasswordMOdal(true)
        }
    };
    const closeModalPassword=()=>{
        setisOpenPasswordMOdal(false)
    };

    function openModal(resource){
        
        setisOpen(true)
        setmodelCustomerName(resource.mcustomer);
        setmodelTid(resource.mtid);
        setmodelModelName(resource.mkiccmodel);
        setmodelSerialNo(resource.mkiccserial);
        setmodelVersion(resource.mkiccver);
        setmodelEmplacement(resource.mlocation);
        
    };
    const closeModal = ()=>{
        setisOpen(false)
    };

    const updatelocation=()=>{
       
        const headers = {
            headers:{ 
                'Content-Type': 'application/json',                
                'auth':'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
            }
        }
        
        axios  
            .post(URL+"/SetLocation",{ tid:modelTid,serialno:modelSerialNo,location:modellocation, },headers) 
               
            .then((response) => {
                setisOpensuccessmsg(true);
                setmessage("Succeed");
                GetPayReaderList();
              }) 
              .catch((err) => {
                console.log("AXIOS ERROR: ", err);
              })
         
    };

    const updateuserinfo = ()=>{
        
        if(password!=cnfpassword){
            setisOpensuccessmsgw(true);
            setwarmessage("Password mismatch");
        }else{
        
        const headers = {
            headers:{ 
                'Content-Type': 'application/json',                
                'auth':'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
            }
        }
        
        axios  
            .post(URL+"/SaveUserInfo",{ seq:seq,userid:user_id,userpass:password,displayname:username,role:role,reseller_id:reseller_id,customer_id:customerseq, },headers) 
               
            .then((response) => {
                setisOpensuccessmsg(true);
                setmessage("Succeed");
                GetPayReaderList();
               
                
              }) 
              .catch((err) => {
                console.log("AXIOS ERROR: ", err);
              }) 
        }
    };
 
    
        const showhideMODAL=() =>
        {
            setisOpensuccessmsg(false);
            setisOpenPasswordMOdal(false);
            setisOpen(false); 
        };
        const showhideMODALw=() =>
        {
            setisOpensuccessmsgw(false);
        };
        
        //Pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }
  
  
  const sorting = (col)=>{
    if(order==="ASC"){
      const sorted =[...data].sort((a,b)=>
        a[col].toLowerCase()>b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("DSC");

    }
    if(order==="DSC"){
      const sorted =[...data].sort((a,b)=>
        a[col].toLowerCase()>b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("ASC");

    }
  };
        
    
    return (
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <Successmsg msg={message} modal={isOpensuccessmsg} showhide={showhideMODAL}></Successmsg>
            <Warningmsg msg={warmessage} modal={isOpensuccessmsgw} showhide={showhideMODALw}></Warningmsg>
            <div className="container-fluid">
                <nav className="navbar navbar-main navbar-expand-lg px-0 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
                    <div className="container-fluid py-1 px-0">
                        <nav aria-label="breadcrumb">
                        <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                            <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark">{t('Home')}</a></li>
                            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{t('Management')}</li>
                        </ol>
                        <h6 className="font-weight-bolder mb-0">{t('CustomerInformation')}</h6>
                        </nav>
                        
                    </div>
                </nav>
           
                <div className="container-fluid pt-1 py-4 px-0">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 mb-4">
                        <div className="card p-4">
                            <form className="information_form" onSubmit={(e)=>e.preventDefault()}>
                            
                            <div className="row">
                                <div className="col-md-3">
                                <label>{t('IDBusinessRegistrationNumber')}</label>
                                </div>
                                <div className="col-md-7">
                                <div className="input-group">
                                    <span><strong>{user_name}</strong></span>
                                </div>
                                </div>
                            </div>
                            <div className="row mt-1">
                                <div className="col-md-3">
                                <label className="input_label_padding_top">{t('NameBusinessName')}</label>
                                </div>
                                <div className="col-md-7">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="admin" onChange={(e)=>{setUsername(e.target.value)}} defaultValue={display_name}/>
                                </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-3">
                                <label className="input_label_padding_top">{t('LoginPassword')}</label>
                                </div>
                                <div className="col-md-5">
                                <div className="input-group">
                                    <input type="text" className="form-control" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Please enter only if you want to change it." required/>
                                </div>
                                </div>
                                <div className="col-md-2">
                                <div className="input-group">
                                    <button className="btn btn-outline-success allBtnsize" onClick={openPasswordModal}>{t('Save')}</button>
                                </div>
                                </div>
                            </div>
                            </form>
                            <div className="row">
                                <div className="col-md-3">
                                <label>{t('fax link')}</label>
                                </div>
                                <div className="col-md-7">
                                <span className="linkedtothemission">
                                    {
                                       (gmissionid!=='')?'Linked to the mission' :'does not exist' 

                                       
                                    }
                                </span>
                                <div className="table-responsive">
                                    <table id="" className="table table-bordered fixlinktable mt-3 text-center">
                                    <thead>
                                    <tr>
                                        <th>{t('TotalAmountOfCharge')}</th>
                                        <th>{t('TotalAmountUsed')}</th>
                                        <th>{t('RemainingAmount')}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {datacal.length > 0? datacal.map((item,i) => { 
                                    return <tr key={i}className="odd show-modal" >  
                                        <td>{(item.sum_deposit!=='')?item.sum_deposit:0}</td>
                                        <td>{(item.balance!=='')?item.balance:0}</td>
                                        <td>{(item.sum_fee!=='')?item.sum_fee:0}</td> 
                                    </tr>  
                                }):<tr className="odd"><td valign="top" colSpan="3" className="dataTables_empty">{t('NoDataAvailable')}</td></tr>}
                                    
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                            </div>
                            
                        </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-lg-12 col-md-12 mb-4">
                        <div className="card p-4">
                            <div className="databaseTableSection pt-0">
                            <div className="grayBgColor p-4 pt-2 pb-2">
                                <div className="row">
                                <div className="col-md-6">
                                    <h6 className="font-weight-bolder mb-0 pt-2"><i className="mdi mdi-view-headline"></i> {t('ReaderManagement')}</h6>
                                </div>
                                
                                </div>
                            </div>
                            <div className="col-md-12 d-flex " >
                    <div className='col-md-6 d-flex mt-3' >
                      <div class="input-group input-group-sm tsearch ">

                        <input type="text" class="form-control form-control-sm rounded " placeholder="Search"
                          aria-label="Search" aria-describedby="basic-addon2"
                          onChange={e => setSearchValues(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-6 mt-3 " style={{
                      display: 'flex',
                      justifyContent: 'right', paddingRight: '70px'
                    }}>
                      <div className="d-flex ">
                        {data && data.length > 0 && (
                     <CSVLink headers={title} data={data} filename="PartnerInformationList.csv">
                            <button className="btn btn-info">Export</button>
                          </CSVLink>)}
                      </div>
                    </div>
                  </div>
                            <div className="top-space-search-reslute">
                                <div className="tab-content p-4 pt-0">
                                <div className="tab-pane active" id="header" role="tabpanel">
                                    <div id="datatable_wrapper" className="information_dataTables dataTables_wrapper dt-bootstrap4 table-responsive">
                                    <table className="display table-bordered dataTable no-footer mt-0">
                                <thead>
                                    <tr>
                                        <th onClick={() => sorting("customer")} className="text-center sorting">{t('Customer')}</th>
                                        <th onClick={() => sorting("location")} className="text-center sorting">{t('Location')}</th>
                                        <th onClick={() => sorting("tid")} className="text-center sorting">{t('TID')}</th>
                                        <th onClick={() => sorting("kiccmodel")} className="text-center sorting">{t('ModelName')}</th>
                                        <th onClick={() => sorting("kiccver")} className="text-center sorting">{t('Version')} </th>
                                        <th onClick={() => sorting("kiccserial")} className="text-center sorting">{t('SerialNo')}</th>
                                        <th onClick={() => sorting("lastupdate")} className="text-center sorting">{t('LastModifiedDate')}  </th>
                                        <th onClick={() => sorting("activetime")} className="text-center sorting">{t('LastUsedDate')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {currentItems.length > 0 ? currentItems.filter(val => {
                                  if (searchValues === '') {
                                    return val;
                                  }
                                  else if (
                                    val.customer.toLowerCase().includes(searchValues.toLocaleLowerCase()) ||
                                    val.location.toLowerCase().includes(searchValues.toLocaleLowerCase()) ||
                                    val.tid.toLowerCase().includes(searchValues.toLocaleLowerCase()) ||
                                    val.kiccmodel.toLowerCase().includes(searchValues.toLocaleLowerCase()) ||
                                    val.kiccver.toLowerCase().includes(searchValues.toLocaleLowerCase()) ||
                                    val.kiccserial.toLowerCase().includes(searchValues.toLocaleLowerCase()) ||
                                    val.lastupdate.toLowerCase().includes(searchValues.toLocaleLowerCase()) ||
                                    val.activetime.toLowerCase().includes(searchValues.toLocaleLowerCase()) 
                                                                 ) {
                                    return val
                                  }
                                }).map((item,i) => { 
                                    return <tr key={i} onClick={() => openModal({mcustomer:item.customer,mlocation:item.location,mtid:item.tid,mkiccmodel:item.kiccmodel,mkiccver:item.kiccver,mkiccserial:item.kiccserial})} className="odd show-modal" >  
                                        <td>{item.customer}</td>  
                                        <td>{item.location}</td>  
                                        <td>{item.tid}</td>  
                                        <td>{item.kiccmodel}</td>  
                                        <td>{item.kiccver}</td>  
                                        <td>{item.kiccserial}</td>  
                                        <td>{item.lastupdate}</td>  
                                        <td>{item.activetime}</td>  
                                    </tr>  
                                }):<tr className="odd"><td valign="top" colSpan="8" className="dataTables_empty">{t('NoDataAvailable')}</td></tr>}
                                   
                                </tbody>
                            </table>
                            <div>
                                  <ul className="pageNumbers">
                                    <li>
                                      <button
                                        onClick={handlePrevbtn}
                                        disabled={currentPage == pages[0] ? true : false}
                                      >
                                        {t('Prev')}
                                      </button>
                                    </li>
                                    {pageDecrementBtn}
                                    {renderPageNumbers}
                                    {pageIncrementBtn}

                                    <li>
                                      <button
                                        onClick={handleNextbtn}
                                        disabled={currentPage == pages[pages.length - 1] ? true : false}
                                      >
                                        {t('Next')}
                                      </button>
                                    </li>
                                  </ul>
                                </div>                                 
                                     
                                        
                                    <Modal className='modal-box modalPopupCenter' show={isOpen}>
                                            <Modal.Header>

                                            <h4 className="modal-title">{t('Information')}</h4>
                                                <button type="button" className="btn-close" onClick={closeModal}>×</button>
                                            </Modal.Header>
                                            
                                            <Modal.Body>
                                            <div className="formProgress"> 
                                                  <div className="formtopcont">
                                                    <p>{t('LoremIpsumisaplaceholdertextcommonlyused')}</p>
                                                  </div> 
                                                </div>

                                                <div className="formBgcolor">
                                                  <form  onSubmit={(e)=>e.preventDefault()}>
                                                    <input type="hidden" name="modelTid" onChange={(e)=>{setModeltid(e.target.value)}} value={modelTid}/>
                                                    <input type="hidden" name="modelSerialNo" onChange={(e)=>{setModelsn(e.target.value)}} value={modelSerialNo}/>
                                                    <div className="formProgress manForm pt-2">
                                                    <div className='row mb-3'>
                                                    <div className='col-md-4'><span>{t('TID')}</span></div>
                                                    <div className='col-md-8'><span className='tid'>{modelTid}</span></div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <div className='col-md-4'><span>{t('Customer')}</span></div>
                                                    <div className='col-md-8'><span className='customer'>{modelCustomerName}</span></div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <div className='col-md-4'><span>{t('SerialNo')}</span></div>
                                                    <div className='col-md-8'><span className='tid'>{modelSerialNo}</span></div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <div className='col-md-4'><span>{t('ModelName')}</span></div>
                                                    <div className='col-md-8'><span className='tid'>{modelModelName}</span></div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <div className='col-md-4'><span>{t('Support')}Version</span></div>
                                                    <div className='col-md-8'><span className='tid'>{modelVersion}</span></div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <div className='col-md-4'><span>{t('Emplacement')} </span></div>
                                                    <div className='col-md-8'><input type="text" className='form-control' onChange={(e)=>{setModellocation(e.target.value)}} defaultValue={modelEmplacement}/></div>
                                                </div>
                                                      
                                                    </div>
                                                      <div className="formProgressBtn">
                                                        <div className="row">
                                                            <div className="col-md-5">
                                                              <button type="button" className="btn btn-sm" onClick={closeModal}>{t('Cancel')}</button>
                                                            </div>
                                                            <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                                              <button type="submit" className="btn btn-sm savepopupbtn" onClick={updatelocation}>{t('Save')}</button>
                                                            </div>
                                                        </div>
                                                      </div>
                                                    </form>
                                                  </div>

                                            </Modal.Body>
                                            
                                            
                                        </Modal>
                                        {/* password model */}
                                        <Modal className='modal-box modalPopupCenter' show={isOpenPasswordMOdal}>
                                            <Modal.Header>

                                            <h4 className="modal-title">{t('Password')}</h4>
                                                <button type="button" className="btn-close" onClick={closeModalPassword}>×</button>
                                            </Modal.Header>
                                            
                                            <Modal.Body>
                                            <div className="formProgress"> 
                                                  <div className="formtopcont">
                                                    <p>{t('LoremIpsumisaplaceholdertextcommonlyused')}</p>
                                                  </div> 
                                                </div>

                                                <div className="formBgcolor">
                                                  <form  onSubmit={(e)=>e.preventDefault()}>
                                                    
                                                    <div className="formProgress manForm pt-2">
                                                        <div className='row mb-3'>
                                                            <div className='col-md-4'><span>{t('ConfirmPassword')} </span></div>
                                                            <div className='col-md-8'><input type="text" className='form-control' onChange={(e)=>{setCnfPassword(e.target.value)}} default="" required /></div>
                                                        </div>
                                                    </div>
                                                      <div className="formProgressBtn">
                                                        <div className="row">
                                                            <div className="col-md-5">
                                                              <button type="button" className="btn btn-sm" onClick={closeModalPassword}>{t('Cancel')}</button>
                                                            </div>
                                                            <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                                              <button type="submit" className="btn btn-sm savepopupbtn" onClick={updateuserinfo}>{t('Save')}</button>
                                                            </div>
                                                        </div>
                                                      </div>
                                                    </form>
                                                  </div>

                                            </Modal.Body>
                                            
                                            
                                        </Modal>
                                        {/* password model */}
                                       
                                        
                                        
                                        
                                        

                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
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
  
  
  export default Information;
  