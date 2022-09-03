import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Modal } from "react-bootstrap";
import Successmsg from "../partner/success";
import Warningmsg from "../partner/warning";
import { CSVLink } from "react-csv";
import { URL } from "../URL/url";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useTranslation } from 'react-i18next';
function PayReader() {
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
  const [searchPayReader, setSearchPayReader] = useState('');
  const [copyData, setCopyData] = useState([]);
  const title = [
    { label: "Turn", key: "seq" },
    { label: "Partner", key: "reseller" },
    { label: "Customer", key: "customer" },
    { label: "	Location", key: "location" },
    { label: "TID", key: "tid" },
    { label: "Model Name", key: "kiccmodel" },
    { label: "Version", key: "kiccver" },
    { label: " Serial No.", key: "kiccserial" },
    { label: " Last modified date ", key: "lastupdate" },
    { label: " Last used date", key: "activetime" }
  ];
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

  const showhideMODAL = () => {
    setisOpensuccessmsg(false);
    setisOpen(false);
  };

  const showhideMODALw = () => {
    setisOpensuccessmsgw(false);
  };

  async function getpayreaderdata() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    await axios
      .post(URL + "/GetPayReaderList", { role: 1, reseller_id: '', customer_name: '' }, headers)

      .then((response) => {
        setData(response.data.data);
        setCopyData(response.data.data)
        //console.log(response.data.data)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  useEffect(() => {
    getpayreaderdata()
  }, []);

  // modal
  const [isOpen, setisOpen] = useState(false);
  const [mseq, setmseq] = useState('');
  const [mreseller, setmreseller] = useState('');
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

  const closeModal = () => {
    setisOpen(false)
  };

  function openRegistrationmodal(resource) {
    setmseq(resource.mseq)
    setmreseller(resource.mreseller)
    setmcustomer(resource.mcustomer)
    setmlocation(resource.mlocation)
    setmtid(resource.mtid)
    setmkiccmodel(resource.mkiccmodel)
    setmkiccver(resource.mkiccver)
    setmkiccserial(resource.mkiccserial)
    setmlastupdate(resource.mlastupdate)
    setmactivetime(resource.mactivetime)
    setmcustomerseq(resource.mcustomerseq)
    setmresellerid(resource.mresellerid)
    setisOpen(true)
    if (resource.mresellerid !== '') {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
        }
      }
      axios.post(URL + "/GetCustomerList", {
        resellerid: resource.mresellerid, customerid: '-1'
      }, headers).then((response) => {
        setDatacus(response.data.data);
      })
    }
  }

  // modal
  // save data    
  const savepayreader = () => {
    if (mkiccserial == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Serial No. is a required input.");
      return;
    }
    if (mkiccmodel == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("The model name is mandatory.");
      return;
    }
    if (mkiccver == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Version is required.");
      return;
    }
    if (mtid == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("TID is required.");
      return;
    }
    if (mresellerid == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Please select a partner.");
      return;
    }
    if (mcustomerseq == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Please select a customer.");
      return;
    }

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    axios
      .post(URL + "/ExistsPayReader", {
        tid: mtid,
        kiccserial: mkiccserial,
        readerseq: mseq,
      }, headers)
      .then((response) => {
        if (response.data.success === true) {
          setisOpensuccessmsgw(true);
          setwarmessage("The same TID and serial number exist.");
        } else {
          //new
          axios
            .post(URL + "/SetPayReaderInfo", {
              seq: mseq,
              kiccserial: mkiccserial,
              kiccmodel: mkiccmodel,
              kiccver: mkiccver,
              tid: mtid,
              resellerid: mresellerid,
              customerseq: mcustomerseq,
              location: mlocation
            }, headers)
            .then((response) => {
              setisOpensuccessmsg(true);
              setmessage("Succeed");
              getpayreaderdata()
            })
            .catch((err) => {
              console.log("AXIOS ERROR: ", err);
            })
          //new
        }
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  };

  // save data
  // search    
  const handelSubmit = (e) => {
    e.preventDefault();
    var form = new FormData(e.target);
    var rec = [];
    var searchtype = form.get('searchtype');
    var keyword = form.get('keyword');
    if (searchtype == 1) {
      //var row = 'reseller';
      copyData.filter(item => item.reseller.toLowerCase().includes(keyword.toLowerCase())).map(items => (
        rec.push(items)
      ))
    }
    if (searchtype == 2) {
      //var row = 'customer';
      copyData.filter(item => item.customer.toLowerCase().includes(keyword.toLowerCase())).map(items => (
        rec.push(items)
      ))
    }
    if (searchtype == 3) {
      //var row = 'tid';
      copyData.filter(item => item.tid.toLowerCase().includes(keyword.toLowerCase())).map(items => (
        rec.push(items)
      ))
    }
    if (searchtype == 4) {
      //var row = 'kiccmodel';
      copyData.filter(item => item.kiccmodel.toLowerCase().includes(keyword.toLowerCase())).map(items => (
        rec.push(items)
      ))
    }
    if (searchtype == 5) {
      //var row = 'kiccserial';
      copyData.filter(item => item.kiccserial.toLowerCase().includes(keyword.toLowerCase())).map(items => (
        rec.push(items)
      ))
    }
    if (searchtype == 6) {
      //var row = 'location';
      copyData.filter(item => item.location.toLowerCase().includes(keyword.toLowerCase())).map(items => (
        rec.push(items)
      ))
    }
    setData(rec)
    //console.log(rec);
  };
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

  //sorting
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
    setSearchPayReader(e.target.value);
    if (e.target.value === '') { getpayreaderdata() }
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
                          <option value="1">{t('Partner')}</option>
                          <option value="2">{t('Customer')}</option>
                          <option value="3">{t('TID')}</option>
                          <option value="4">{t('ModelName')}</option>
                          <option value="5">{t('SerialNo')}</option>
                          <option value="6">{t('Location')}</option>
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
                        <button type="submit" className="btn btn-outline-success allBtnsize" onClick={() => { setFirstPage() }} disabled={searchPayReader.length ? false : true}>{t('Search')}</button>
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
                            <CSVLink headers={title} data={data} filename="AdminPayReader.csv">
                              <button className="btn button btn-info mx-2" >{t('Export')}</button>
                            </CSVLink>
                            <a className="btn button btn-info" onClick={() => openRegistrationmodal({ mseq: '-1', mreseller: '', mcustomer: '', mlocation: '', mtid: '', mkiccmodel: '', mkiccver: '', mkiccserial: '', mlastupdate: '', mactivetime: '', mcustomerseq: '', mresellerid: '' })}>{t('Registration')}</a>
                          </div>
                          <table className="display table-bordered dataTable no-footer mt-6">
                            <thead>
                              <tr>
                                <th onClick={() => sorting("seq")} className="text-center sorting">{t('Turn')}</th>
                                <th onClick={() => sorting("reseller")} className="text-center sorting">{t('Partner')}</th>
                                <th onClick={() => sorting("customer")} className="text-center sorting">{t('Customer')}</th>
                                <th onClick={() => sorting("location")} className="text-center sorting">{t('Location')}</th>
                                <th onClick={() => sorting("tid")} className="text-center sorting">{t('TID')}</th>
                                <th onClick={() => sorting("kiccmodel")} className="text-center sorting">{t('ModelName')}</th>
                                <th onClick={() => sorting("kiccver")} className="text-center sorting">{t('Version')}</th>
                                <th onClick={() => sorting("kiccserial")} className="text-center sorting">{t('SerialNo')}</th>
                                <th onClick={() => sorting("lastupdate")} className="text-center sorting">{t('LastModifiedDate')}</th>
                                <th onClick={() => sorting("activetime")} className="text-center sorting">{t('LastUsedDate')}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems.length > 0 ? currentItems.map((item, i) => {
                                return <tr key={i} className="odd show-modal" onClick={() => openRegistrationmodal({ mseq: item.seq, mreseller: item.reseller, mcustomer: item.customer, mlocation: item.location, mtid: item.tid, mkiccmodel: item.kiccmodel, mkiccver: item.kiccver, mkiccserial: item.kiccserial, mlastupdate: item.lastupdate, mactivetime: item.activetime, mcustomerseq: item.customerseq, mresellerid: item.resellerid })} >
                                  <td>{item.seq}</td>
                                  <td>{item.reseller}</td>
                                  <td>{item.customer}</td>
                                  <td>{item.location}</td>
                                  <td>{item.tid}</td>
                                  <td>{item.kiccmodel}</td>
                                  <td>{item.kiccver}</td>
                                  <td>{item.kiccserial}</td>
                                  <td>{item.lastupdate}</td>
                                  <td>{item.activetime}</td>
                                </tr>
                              }) : <tr className="odd"><td valign="top" colSpan="10" className="dataTables_empty">{t('No data available')}</td></tr>}
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
                              <h4 className="modal-title">{t('TerminalInformation')}</h4>
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
                                      <div className='col-md-4'><span>{t('SerialNo')}</span></div>
                                      <div className='col-md-8'>
                                        <input type="text" className="form-control" onChange={(e) => { setmkiccserial(e.target.value) }} defaultValue={mkiccserial} />
                                      </div>
                                    </div>
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('ModelName')}</span></div>
                                      <div className='col-md-8'>
                                        <input type="text" className="form-control" onChange={(e) => { setmkiccmodel(e.target.value) }} defaultValue={(mkiccmodel !== '') ? mkiccmodel : '0349'} />
                                      </div>
                                    </div>
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('Version')}</span></div>
                                      <div className='col-md-8'>
                                        <input type="text" className="form-control" onChange={(e) => { setmkiccver(e.target.value) }} defaultValue={(mkiccver !== '') ? mkiccver : '4108'} />
                                      </div>
                                    </div>
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('TID')}</span></div>
                                      <div className='col-md-8'>
                                        <input type="text" className="form-control" onChange={(e) => { setmtid(e.target.value) }} defaultValue={mtid} />
                                      </div>
                                    </div>
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('Partner')}</span></div>
                                      <div className='col-md-8'>
                                        <select className='form-select' value={mresellerid} onChange={getCustomerRecord}>
                                          <option value="">{t('Please select an item')}</option>
                                          {datar.map((item, i) => {
                                            return <option key={i} value={item.resellerid}>{item.displayname}</option>
                                          })}
                                        </select>
                                      </div>
                                    </div>
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('Customer')}</span></div>
                                      <div className='col-md-8'>
                                        <select className="form-select" onChange={(e) => { setmcustomerseq(e.target.value) }} value={mcustomerseq} placeholder='Please select an item.'>
                                          <option value="">{t('Please select an item')}</option>
                                          {
                                            datacus.map((item, i) =>
                                              <option key={i} value={item.seq}>{item.display_name}</option>
                                            )
                                          }
                                        </select>
                                      </div>
                                    </div>
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('Location')}</span></div>
                                      <div className='col-md-8'>
                                        <input type="text" className="form-control" onChange={(e) => { setmlocation(e.target.value) }} defaultValue={mlocation} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="formProgressBtn">
                                    <div className="row">
                                      <div className="col-md-5">
                                        <button type="button" className="btn btn-sm" onClick={closeModal}>{t('Cancel')}</button>
                                      </div>
                                      <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                        <button type="submit" className="btn btn-sm savepopupbtn" onClick={savepayreader} >{t('Save')}</button>
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
export default PayReader;