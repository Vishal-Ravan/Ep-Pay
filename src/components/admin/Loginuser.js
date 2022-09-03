import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Modal } from "react-bootstrap";
import Successmsg from "../partner/success";
import Warningmsg from "../partner/warning";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { URL } from "../URL/url";
import { useTranslation } from 'react-i18next';
import { CSVLink } from "react-csv";
function Loginuser() {
  //language
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');
  const [data, setData] = useState([]);
  const [datar, setDatar] = useState([]);
  const [datacus, setDatacus] = useState([]);
  const [isOpensuccessmsg, setisOpensuccessmsg] = useState(false);
  const [isOpensuccessmsgw, setisOpensuccessmsgw] = useState(false);
  const [message, setmessage] = useState('');
  const [warmessage, setwarmessage] = useState('');
  const [order, setorder] = useState("ASC");
  const [searchLogin, setSearchLogin] = useState('');
  const title = [
    { label: "Turn", key: "seq" },
    { label: "ID", key: "userid" },
    { label: "Name", key: "displayname" },
    { label: "Role", key: "role" },
    { label: "	Partner", key: "resellername" },
    { label: "Customer", key: "customername" }
  ];


  const showhideMODAL = () => {
    setisOpensuccessmsg(false);
    setisOpen(false);
  };

  const showhideMODALw = () => {
    setisOpensuccessmsgw(false);
  };

  async function GetUserList() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    await axios
      .post(URL + "/GetUserList", { search_type: '', keyboard: '' }, headers)
      .then((response) => {
        setData(response.data.data);
        setCopyData(response.data.data)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  useEffect(() => {
    GetUserList();
  }, []);

  // modal
  const [isOpen, setisOpen] = useState(false);
  const [mseq, setmseq] = useState('');
  const [muserid, setmuserid] = useState('');
  const [mdisplayname, setDisplayName] = useState('');
  const [mrole, setRole] = useState('');
  const [mpartnerid, setPartnerid] = useState('');
  const [mcustomerid, setCustomerid] = useState('');
  const [mpassword, setPassword] = useState('');
  const [mcustomer, setmcustomer] = useState('');
  const [mlocation, setmlocation] = useState('');
  const [mtid, setmtid] = useState('');
  const [mkiccmodel, setmkiccmodel] = useState('');
  const [mkiccver, setmkiccver] = useState('');
  const [mkiccserial, setmkiccserial] = useState('');
  const [mlastupdate, setmlastupdate] = useState('');
  const [mactivetime, setmactivetime] = useState('');
  const [mcustomerseq, setmcustomerseq] = useState('');
  const [mresellerid, setmresellerid] = useState('');
  const [mreseller, setmreseller] = useState('');
  const [copyData, setCopyData] = useState([]);

  const closeModal = () => {
    setisOpen(false)
  };

  const headerss = [(data)];
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(URL);
      const responseData = await response.data.Table;
      console.log(responseData);
      setData(responseData);
    };
    fetchData();
  }, []);

  function openRegistrationmodal(resource) {
    setmseq(resource.mseq)
    setmuserid(resource.muserid)
    //console.log(resource.mseq)           
    //console.log(resource.muserid)           
    if (resource.mseq !== '') {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
        }
      }
      axios.post(URL + "/GetUserInfo", { user_id: 'eppay' }, headers).then((response) => {
        //console.log(response)          
        var SetUserInfo = response.data.data
        setDisplayName(SetUserInfo.displayname)
        setRole(SetUserInfo.role)
        setPartnerid(SetUserInfo.resellerid)
        setCustomerid(SetUserInfo.customerseq)
        setisOpen(true)
      })
    } else {
      setisOpen(true)
    }
  };

  // modal
  // save data    
  const SaveUserInfo = () => {
    if (mdisplayname == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Name is a required input.");
      return;
    }
    if (mrole == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Please select role.");
      return;
    }
    if (mseq !== '') {
      var seq = mseq
    } else {
      var seq = '-1'
    }
    if (mcustomerid !== '') {
      var customerseq = mcustomerid
    } else {
      var customerseq = '-1'
    }
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    axios
      .post(URL + "/SaveUserInfo", {
        seq: seq,
        userid: muserid,
        userpass: mpassword,
        displayname: mdisplayname,
        role: mrole,
        reseller_id: mpartnerid,
        customer_id: customerseq,
      }, headers)
      .then((response) => {
        setisOpensuccessmsg(true);
        setmessage("Succeed");
        GetUserList();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  };

  // save data
  //reseller list
  useEffect(() => {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    axios
      .post(URL + "/GetResellerList", { resellerid: '', }, headers)
      .then((response) => {
        setDatar(response.data.data);
        //console.log(response)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }, []);

  //customer list on reseller id
  const getCustomerRecord = (e) => {
    setmresellerid(e.target.value)
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    axios.post(URL + "/GetCustomerList", {
      resellerid: e.target.value, customerid: '-1'
    }, headers).then((response) => {
      setDatacus(response.data.data);
    })
  };

  const rolechange = (e) => {
    setRole(e.target.value)
  };

  // search    
  const handelSubmit = (e) => {
    e.preventDefault();
    var form = new FormData(e.target);
    var rec = [];
    var searchtype = form.get('searchtype');
    var keyword = form.get('keyword');
    if (searchtype == 1) {
      copyData.filter(item => item.userid === keyword).map(items => (
        rec.push(items)
      ))
    }
    if (searchtype == 2) {
      copyData.filter(item => item.displayname === keyword).map(items => (
        rec.push(items)
      ))
    }
    if (searchtype == 3) {
      copyData.filter(item => item.resellername === keyword).map(items => (
        rec.push(items)
      ))
    }
    if (searchtype == 4) {
      copyData.filter(item => item.customername === keyword).map(items => (
        rec.push(items)
      ))
    }
    setData(rec)
    //console.log(rec);
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

  const sorting = (col) => {
    console.log(col)
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        col === 'seq' ?
          parseInt(a[col]) > parseInt(b[col]) ? 1 : -1
          :
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((b, a) =>
        col === 'seq' ?
          parseInt(a[col]) > parseInt(b[col]) ? 1 : -1
          :
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("ASC");
    }
  };

  const eventCall = (e) => {
    setSearchLogin(e.target.value);
    if (e.target.value === '') { GetUserList(); }
  }

  const setFirstPage = () => {
    setcurrentPage(1);
    setpageNumberLimit(5)
    setmaxPageNumberLimit(5);
    setminPageNumberLimit(0);
  }

  return (
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      <Successmsg msg={message} modal={isOpensuccessmsg} showhide={showhideMODAL}></Successmsg>
      <Warningmsg msg={warmessage} modal={isOpensuccessmsgw} showhide={showhideMODALw}></Warningmsg>
      <div className="container-fluid">
        <nav className="navbar navbar-main navbar-expand-lg px-0 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
          <div className="container-fluid py-1 px-0">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">{t('Home')}</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{t('Management')}</li>
              </ol>
              <h6 className="font-weight-bolder mb-0">{t('TerminalManagement')}</h6>
            </nav>
          </div>
        </nav>
        <div className="container-fluid pt-1 py-4 px-0">
          <div className="row">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card p-2 px-4">
                <form className="information_form" onSubmit={handelSubmit}>
                  <div className="row mt-3">
                    <div className="col-md-2">
                      <label className="input_label_padding_top">{t('Search')}</label>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <select className="classNameic form-select select_options align-left" name='searchtype'>
                          <option value="">{t('PleaseSelectAnItem')}</option>
                          <option value="1">{t('ID')}</option>
                          <option value="2">{t('Name')}</option>
                          <option value="3">{t('Partner')}</option>
                          <option value="4">{t('Customer')}</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <input type="text" className="form-control" name='keyword' onChange={(e) => { eventCall(e) }} />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <button type="submit" className="btn btn-outline-success allBtnsize" onClick={() => { setFirstPage() }} disabled={searchLogin.length ? false : true}>{t('Search')}</button>
                      </div>
                    </div>
                  </div>
                </form>
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
                        <h6 className="font-weight-bolder mb-0 pt-2"><i className="mdi mdi-view-headline"></i> {t('SalesInformation')}</h6>
                      </div>
                      <div className="col-md-6">
                        <div className="">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="top-space-search-reslute">
                    <div className="tab-content p-4 pt-0 pb-0">
                      <div className="tab-pane active" id="header" role="tabpanel">
                        <div id="datatable_wrapper" className="information_dataTables dataTables_wrapper dt-bootstrap4 table-responsive">
                          <div className="d-flex exportPopupBtn">
                            <CSVLink headers={title} data={data} filename="AdminLoginUser.csv">
                              <button className="btn button btn-info mx-2" >{t('Export')}</button>
                            </CSVLink>
                            <a className="btn button btn-info" onClick={() => openRegistrationmodal({ mseq: '', muserid: '' })}>{t('Registration')}</a>
                          </div>
                          <table className="display table-bordered dataTable no-footer mt-6">
                            <thead>
                              <tr>
                                <th onClick={() => sorting("seq")} className="text-center sorting">{t('Turn')}</th>
                                <th onClick={() => sorting("userid")} className="text-center sorting">{t('ID')}</th>
                                <th onClick={() => sorting("displayname")} className="text-center sorting">{t('Name')}</th>
                                <th onClick={() => sorting("role")} className="text-center sorting">{t('Role')}</th>
                                <th onClick={() => sorting("resellername")} className="text-center sorting">{t('Partner')}</th>
                                <th onClick={() => sorting("customername")} className="text-center sorting">{t('Customer')}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems.map(item => {
                                return <tr className="odd show-modal" onClick={() => openRegistrationmodal({ mseq: item.seq, muserid: item.userid })}>
                                  <td>{item.seq}</td>
                                  <td>{item.userid}</td>
                                  <td>{item.displayname}</td>
                                  <td>{item.role}</td>
                                  <td>{item.resellername}</td>
                                  <td>{item.customername}</td>
                                </tr>
                              })}
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
                          {/* registration */}
                          <Modal className='modal-box modalPopupCenter' show={isOpen}>
                            <Modal.Header>
                              <h4 className="modal-title">{t('LoginUserInformation')}</h4>
                              <button type="button" className="btn-close" onClick={closeModal}>×</button>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="formProgress">
                                <div className="formtopcont">
                                  <p>{t('LoremIpsumisaplaceholdertextcommonlyused.')}</p>
                                </div>
                              </div>
                              <div className="formBgcolor">
                                <form onSubmit={(e) => e.preventDefault()}>
                                  <div className="formProgress manForm pt-2">
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('ID')}</span></div>
                                      <div className='col-md-8'>
                                        <input type="text" className="form-control" onChange={(e) => { setmuserid(e.target.value) }} defaultValue={muserid} />
                                      </div>
                                    </div>
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('Password')}</span></div>
                                      <div className='col-md-8'>
                                        <input type="password" className="form-control" onChange={(e) => { setPassword(e.target.value) }} />
                                      </div>
                                    </div>
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('Name')}</span></div>
                                      <div className='col-md-8'>
                                        <input type="text" className="form-control" onChange={(e) => { setDisplayName(e.target.value) }} defaultValue={mdisplayname} />
                                      </div>
                                    </div>
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('Role')}</span></div>
                                      <div className='col-md-8'>
                                        <select className='form-select' onChange={rolechange} value={mrole}>
                                          <option value=''>{t('Role')}</option>
                                          <option value='1'>{t('Manager')}</option>
                                          <option value='2'>{t('Partner')}</option>
                                          <option value='3'>{t('Customer')}</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('Partner')}</span></div>
                                      <div className='col-md-8'>
                                        <select className='form-select' value={mpartnerid} onChange={getCustomerRecord}>
                                          <option value="">{t('partner')}</option>
                                          {datar.map((item, i) => {
                                            return <option value={item.resellerid}>{item.displayname}</option>
                                          })}
                                        </select>
                                      </div>
                                    </div>
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('Customer')}</span></div>
                                      <div className='col-md-8'>
                                        <select className="form-select" onChange={(e) => { setCustomerid(e.target.value) }} value={mcustomerid} >
                                          <option value="">{t('customer')}</option>
                                          {
                                            datacus.map((item, i) =>
                                              <option value={item.seq}>{item.display_name}</option>
                                            )
                                          }
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="formProgressBtn">
                                    <div className="row">
                                      <div className="col-md-5">
                                        <button type="button" className="btn btn-sm" onClick={closeModal}>{t('Cancel')}</button>
                                      </div>
                                      <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                        <button type="submit" className="btn btn-sm savepopupbtn" onClick={SaveUserInfo} >{t('Save')}</button>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </Modal.Body>
                          </Modal>
                          {/* registration */}
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
                <a href="#!" className="font-weight-bold" target="_blank">EP Pay</a> {t('All rights reserved')}.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
export default Loginuser;