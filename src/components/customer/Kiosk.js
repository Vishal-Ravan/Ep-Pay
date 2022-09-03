import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Successmsg from "../partner/success";
import Warningmsg from "../partner/warning";
import { URL } from "../URL/url";
import { CSVLink } from "react-csv";
import { useTranslation } from 'react-i18next';
function Kiosk() {
  const [data, setData] = useState([]);
  // const [sorting, setSorting] = useState({ field: "", order: "" });
  const [isOpen, setisOpen] = useState(false);
  const [isOpenPasswordMOdal, setisOpenPasswordMOdal] = useState(false);
  const [modelCustomerName, setmodelCustomerName] = useState('');
  const [modelTid, setmodelTid] = useState('');
  const [modelModelName, setmodelModelName] = useState('');
  const [modelSerialNo, setmodelSerialNo] = useState('');
  const [modelVersion, setmodelVersion] = useState('');
  const [modelEmplacement, setmodelEmplacement] = useState('');
  const [modeltids, setModeltid] = useState('');
  const [modelsn, setModelsn] = useState('');
  const [modellocation, setModellocation] = useState('');
  const [password, setPassword] = useState('');
  const [cnfpassword, setCnfPassword] = useState('');
  const [isOpensuccessmsg, setisOpensuccessmsg] = useState(false);
  const [isOpensuccessmsgw, setisOpensuccessmsgw] = useState(false);
  const [message, setmessage] = useState('');
  const [warmessage, setwarmessage] = useState('');
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [order, setorder] = useState("ASC");
  const headerss = [(data)];
  const [searchValue, setSearchValue] = useState("")
  const title = [
    { label: "IP", key: "printerip" },
    { label: "Model", key: "printermodel" },
    { label: "Serial", key: "printerserial" },
    { label: "MAC", key: "printermacaddr" },
    { label: "IP", key: "payreaderip" },
    { label: "Port", key: "payreaderport" }

  ];
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(URL);
      const responseData = await response.data.Table;
      console.log(responseData);
      setData(responseData);
    };
    fetchData();
  }, []);
  //language
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');
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
  async function GetKioskList() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    await axios
      .post(URL + "/GetKioskList", { role: role, reseller_id: reseller_id, customer_id: customerseq, }, headers)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }
  useEffect(() => {
    GetKioskList()
  }, []);
  const openPasswordModal = () => {
    if (password == '') {

    } else {
      setisOpenPasswordMOdal(true)
    }
  };
  const closeModalPassword = () => {
    setisOpenPasswordMOdal(false)
  };
  function openModal(resource) {
    setisOpen(true)
    setmodelCustomerName(resource.mcustomer);
    setmodelTid(resource.mtid);
    setmodelModelName(resource.mkiccmodel);
    setmodelSerialNo(resource.mkiccserial);
    setmodelVersion(resource.mkiccver);
    setmodelEmplacement(resource.mlocation);

  };
  const closeModal = () => {
    setisOpen(false)
  };
  const updatelocation = () => {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }

    axios
      .post(URL + "/SetLocation", { tid: modelTid, serialno: modelSerialNo, location: modellocation, }, headers)

      .then((response) => {
        GetKioskList()
        setisOpensuccessmsg(true);
        setmessage("Succeed");
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })

  };

  const updateuserinfo = () => {
    if (password != cnfpassword) {
      setisOpensuccessmsgw(true);
      setwarmessage("Password mismatch");
    } else {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
        }
      }
      axios
        .post(URL + "/SaveUserInfo", { seq: seq, userid: user_id, userpass: password, displayname: display_name, role: role, reseller_id: reseller_id, customer_id: customerseq, }, headers)
        .then((response) => {
          GetKioskList()
          setisOpensuccessmsg(true);
          setmessage("Succeed");
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    }
  };
  const showhideMODAL = () => {
    setisOpensuccessmsg(false);
    setisOpenPasswordMOdal(false);
    setisOpen(false);
  };
  const showhideMODALw = () => {
    setisOpensuccessmsgw(false);
  };
  //Pagination
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
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("DSC");

    }
    if (order === "DSC") {
      const sorted = [...data].sort((b, a) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
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
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">{t('Home')}</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{t('Management')}</li>
              </ol>
              <h6 className="font-weight-bolder mb-0">{t('Kiosk Management')}</h6>
            </nav>
          </div>
        </nav>

        <div className="container-fluid pt-1 py-4 px-0">


          <div className="row">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card p-4">
                <div className="databaseTableSection pt-0">
                  <div className="grayBgColor p-4 pt-2 pb-2">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="font-weight-bolder mb-0 pt-2"><i className="mdi mdi-view-headline"></i> {t('KioskInformation')}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 d-flex " >
                    <div className='col-md-6 d-flex mt-3' >
                      <div class="input-group input-group-sm tsearch ">

                        <input type="text" class="form-control form-control-sm rounded " placeholder="Search"
                          aria-label="Search" aria-describedby="basic-addon2"
                          onChange={e => setSearchValue(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-6 mt-3 " style={{ display: 'flex', justifyContent: 'right', paddingRight: '70px' }}>
                      <div className="d-flex ">
                        {data && data.length > 0 && (
                          <CSVLink headers={title} data={data} filename="CustomerKioskList.csv">
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
                              <tr role="row">
                                {/* <th className="text-center sorting_asc tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-sort="ascending" aria-label="Order: activate to sort column descending"><span className="">Partner</span></th>
                                            <th className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">Client</span></th> */}

                                <th className="text-center" colSpan="4" rowSpan="1">{t('Printer')}</th>
                                <th className="text-center" colSpan="2" rowSpan="1">{t('PaymentTerminal')}</th>

                              </tr>
                              <tr role="row">
                                <th className="text-center sorting" onClick={() => sorting("printerip")} tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Print&amp;nbsp;Total: activate to sort column ascending">{t('IP')}</th>

                                <th className="text-center sorting" onClick={() => sorting("printermodel")} tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Color: activate to sort column ascending">{t('Model')}</th>

                                <th className="text-center sorting" onClick={() => sorting("printerserial")} tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Mono: activate to sort column ascending">{t('Serial')}</th>
                                <th className="text-center sorting" onClick={() => sorting("printermacaddr")} tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('MAC')}</th>

                                <th className="text-center sorting" onClick={() => sorting("payreaderip")} tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Color: activate to sort column ascending">{t('IP')}</th>
                                <th className="text-center sorting" onClick={() => sorting("payreaderport")} tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Mono: activate to sort column ascending">{t('Port')}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems.length > 0 ? data.filter(val => {
                                if (searchValue === '') {
                                  return val;
                                }
                                else if (
                                  val.printerip.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                                  val.printermodel.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                                  val.printerserial.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                                  val.printermacaddr.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                                  val.payreaderip.toLowerCase().includes(searchValue.toLocaleLowerCase())
                                ) {
                                  return val
                                }
                              }).map((item, i) => {
                                return <tr key={i} className="odd show-modal">
                                  {/* <td>{item.resellername}</td>  
                                            <td>{item.customername}</td> */}
                                  <td>{item.printerip}</td>
                                  <td>{item.printermodel}</td>
                                  <td>{item.printerserial}</td>
                                  <td>{item.printermacaddr}</td>
                                  <td>{item.payreaderip}</td>
                                  <td>{item.payreaderport}</td>

                                </tr>
                              }) : <tr className="odd"><td valign="top" colSpan="6" className="dataTables_empty">{t('NoDataAvailable')}</td></tr>}

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
                                <form onSubmit={(e) => e.preventDefault()}>
                                  <input type="hidden" name="modelTid" onChange={(e) => { setModeltid(e.target.value) }} value={modelTid} />
                                  <input type="hidden" name="modelSerialNo" onChange={(e) => { setModelsn(e.target.value) }} value={modelSerialNo} />
                                  <div className="formProgress manForm pt-2">
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('TID')}</span></div>
                                      <div className='col-md-8'><span className='tid'>{modelTid}</span></div>
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
                                      <div className='col-md-4'><span>{t('Version')}</span></div>
                                      <div className='col-md-8'><span className='tid'>{modelVersion}</span></div>
                                    </div>
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('Emplacement')} </span></div>
                                      <div className='col-md-8'><input type="text" className='form-control' onChange={(e) => { setModellocation(e.target.value) }} defaultValue={modelEmplacement} /></div>
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
                                <form onSubmit={(e) => e.preventDefault()}>

                                  <div className="formProgress manForm pt-2">
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('ConfirmPassword')} </span></div>
                                      <div className='col-md-8'><input type="text" className='form-control' onChange={(e) => { setCnfPassword(e.target.value) }} default="" required /></div>
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


export default Kiosk;
