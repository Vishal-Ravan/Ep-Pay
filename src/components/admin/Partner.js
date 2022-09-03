import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Modal } from "react-bootstrap";
import Successmsg from "../partner/success";
import Warningmsg from "../partner/warning";
import { URL } from "../URL/url";
import { Header } from "../Header/headers";
import { useTranslation } from 'react-i18next';

function Partner() {
  const [isOpen, setisOpen] = useState(false);
  const [modelmresellerid, setmodelresellerid] = useState('');
  const [resellerid, setresellerid] = useState('');
  const [mdisplayname, setmodelmdisplayname] = useState('');
  const [mgmissionid, setmodelmgmissionid] = useState('');
  const [mcomment, setmodelmcomment] = useState('');

  //Pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  //language
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [isOpensuccessmsg, setisOpensuccessmsg] = useState(false);
  const [isOpensuccessmsgw, setisOpensuccessmsgw] = useState(false);
  const [message, setmessage] = useState('');
  const [warmessage, setwarmessage] = useState('');
  const [order, setorder] = useState("ASC");
  const [searchPartner, setSearchPartner] = useState('');
  const showhideMODAL = () => {
    setisOpensuccessmsg(false);
    setisOpen(false);
  };

  const showhideMODALw = () => {
    setisOpensuccessmsgw(false);
  };

  async function getpartnerdata() {
    await axios.post(URL + "/GetResellerList", { reseller_id: '' }, Header)
      .then((response) => {
        setData(response.data.data);
        setCopyData(response.data.data);
        //console.log(response.data.data)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  useEffect(() => {
    getpartnerdata();
  }, []);

  // modal

  const closeModal = () => {
    setisOpen(false)
  };

  function openRegistrationmodal(resource) {
    setmodelresellerid(resource.mresellerid)
    setresellerid(resource.mresellerid)
    setmodelmdisplayname(resource.mdisplayname)
    setmodelmgmissionid(resource.mgmissionid)
    setmodelmcomment(resource.mcomment)
    setisOpen(true)
  }

  // modal
  // save data  

  const savepartner = () => {
    if (modelmresellerid == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("The business number (ID) is mandatory.");
      return;
    }
    if (mdisplayname == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Partner name is required.");
      return;
    }
    if (resellerid != '') {
      axios
        .post(URL + "/SaveResellerInfo", { resellerid: modelmresellerid, displayname: mdisplayname, comment: mcomment, gmissionid: mgmissionid }, Header)
        .then((response) => {
          setisOpensuccessmsg(true);
          setmessage("Succeed");
          getpartnerdata()
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    } else {
      axios
        .post(URL + "/SetReseller", { resellerid: modelmresellerid, displayname: mdisplayname, comment: mcomment, gmissionid: mgmissionid }, Header)
        .then((response) => {
          if (response.data.success === true) {
            setisOpensuccessmsg(true);
            setmessage("Succeed");
            getpartnerdata();
          } else {
            setisOpensuccessmsgw(true);
            setwarmessage("The business number you entered has already been registered.");
          }
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    }
  };

  // save data    
  const handelSubmit = (e) => {
    e.preventDefault();
    var rec = [];
    var form = new FormData(e.target);
    //console.log(form.get('searchtype'))
    //console.log(form.get('keyword'))
    if (form.get('searchtype') === '1') {
      copyData.filter(item =>
        item.displayname.toLowerCase().includes(form.get('keyword').toLowerCase())
      ).map(items => (
        rec.push(items)
      ))


    } else {
      copyData.filter(item =>
        item.resellerid.includes(form.get('keyword'))
      ).map(items => (
        rec.push(items)
      ))
    }
    //console.log(rec)
    setData(rec)
    // setData([])
    // axios
    //   .post(URL + "/partner_search", { reseller_id: '', search_type: form.get('searchtype'), keyboard: form.get('keyword') }, Header)
    //   .then((response) => {
    //     setData(response.data.data);
    //   })
    //   .catch((err) => {
    //     console.log("AXIOS ERROR: ", err);
    //   })

  };

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

  const eventCall = (e) => {
    setSearchPartner(e.target.value);
    if (e.target.value === '') { getpartnerdata(); }
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
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark">{t('Home')}</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{t('Management')}</li>
              </ol>
              <h6 className="font-weight-bolder mb-0">{t('Partner')}</h6>
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
                        <select className="classNameic form-select select_options align-left" name='searchtype' >
                          <option value="1">{t('Name')}</option>
                          <option value="2">{t('BusinessNumberID')}</option>
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
                        <button type="submit" className="btn btn-outline-success allBtnsize" onClick={() => { setFirstPage(); }} disabled={searchPartner.length ? false : true}>{t('Search')}</button>
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
                        <h6 className="font-weight-bolder mb-0 pt-2"><i className="mdi mdi-view-headline"></i> {t('ManagementPartner')}</h6>
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
                            <a className="btn button btn-info" onClick={() => openRegistrationmodal({ mresellerid: '', mdisplayname: '', mgmissionid: '', mcomment: '' })}>{t('Registration')}</a>
                          </div>
                          <table className="display table-bordered dataTable no-footer mt-6">
                            <thead>
                              <tr>
                                <th onClick={() => sorting("resellerid")} className="text-center sorting">{t('BusinessNumberID')}</th>
                                <th onClick={() => sorting("displayname")} className="text-center sorting"  >{t('PartnerName')}</th>
                                <th onClick={() => sorting("gmissionid")} className="text-center sorting ">{t('MissionID')}</th>
                                <th onClick={() => sorting("comment")} className="text-center sorting">{t('Memo')}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems.length > 0 ? currentItems.map((item, i) => {
                                return <tr key={i} className="odd show-modal" onClick={() => openRegistrationmodal({ mresellerid: item.resellerid, mdisplayname: item.displayname, mgmissionid: item.gmissionid, mcomment: item.comment })} >
                                  <td>{item.resellerid}</td>
                                  <td>{item.displayname}</td>
                                  <td>{item.gmissionid}</td>
                                  <td>{item.comment}</td>
                                </tr>
                              }) : <tr className="odd"><td valign="top" colSpan="10" className="dataTables_empty">{t('NoDataAvailable')}</td></tr>}
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
                              <h4 className="modal-title">{t('PartnerInformation')}</h4>
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
                                      <div className='col-md-4'><span>{t('BusinessNumberID')}</span></div>
                                      <div className='col-md-8'>
                                        {(resellerid != '') ?
                                          <input type="text" className="form-control" onChange={(e) => { setmodelresellerid(e.target.value) }} defaultValue={resellerid} readOnly /> :
                                          <input type="text" className="form-control" onChange={(e) => { setmodelresellerid(e.target.value) }} defaultValue="" />
                                        }
                                      </div>
                                    </div>
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('PartnerName')}</span></div>
                                      <div className='col-md-8'>
                                        <input type="text" className="form-control" onChange={(e) => { setmodelmdisplayname(e.target.value) }} defaultValue={mdisplayname} />
                                      </div>
                                    </div>
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('MissionID')}</span></div>
                                      <div className='col-md-8'>
                                        <input type="text" className="form-control" onChange={(e) => { setmodelmgmissionid(e.target.value) }} defaultValue={mgmissionid} />
                                      </div>
                                    </div>
                                    <div className='row mb-3'>
                                      <div className='col-md-4'><span>{t('Memo')}</span></div>
                                      <div className='col-md-8'>
                                        <input type="text" className="form-control" onChange={(e) => { setmodelmcomment(e.target.value) }} defaultValue={mcomment} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="formProgressBtn">
                                    <div className="row">
                                      <div className="col-md-5">
                                        <button type="button" className="btn btn-sm" onClick={closeModal}>{t('Cancel')}</button>
                                      </div>
                                      <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                        <button type="submit" className="btn btn-sm savepopupbtn" onClick={savepartner} >{t('Save')}</button>
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
export default Partner;