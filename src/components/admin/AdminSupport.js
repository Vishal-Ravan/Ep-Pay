import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Modal } from "react-bootstrap";
import Successmsg from "../partner/success";
import Warningmsg from "../partner/warning";
import { URL } from "../URL/url";
import { Header } from "../Header/headers";
import { useTranslation } from 'react-i18next';
function AdminSupport() {
  //language
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');
  const [isOpensuccessmsg, setisOpensuccessmsg] = useState(false);
  const [isOpensuccessmsgw, setisOpensuccessmsgw] = useState(false);
  const [message, setmessage] = useState('');
  const [warmessage, setwarmessage] = useState('');
  const [data, setData] = useState([]);
  const [dataf, setDataf] = useState([]);
  const [order, setorder] = useState("ASC");
  //Pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  //pagination2
  const [currentPagef, setcurrentPagef] = useState(1);
  const [itemsPerPagef, setitemsPerPagef] = useState(10);
  const [pageNumberLimitf, setpageNumberLimitf] = useState(5);
  const [maxPageNumberLimitf, setmaxPageNumberLimitf] = useState(5);
  const [minPageNumberLimitf, setminPageNumberLimitf] = useState(0);
  // modal
  const [isOpen, setisOpen] = useState(false);
  const [isOpenfaq, setisOpenfaq] = useState(false);
  const [mseq, setmodelurlid] = useState('');
  const [murl, setmodelurlname] = useState('');
  const [modelfaqid, setmodelfaqid] = useState('');
  const [modelfaqquestion, setmodelfaqquestion] = useState('');
  const [modelfaqanswer, setmodelfaqanswer] = useState('');
  let user_id = localStorage.getItem("user_id");

  const showhideMODAL = () => {
    setisOpensuccessmsg(false)
    setisOpen(false)
    setisOpenfaq(false)
  }
  const showhideMODALw = () => {
    setisOpensuccessmsgw(false)
    setisOpenfaq(false)
  }

  async function urllinks() {
    await axios
      .post(URL + "/urllinks", { user_id: user_id, }, Header)
      .then((response) => {
        setData(response.data.data)
        //console.log(response)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err)
      })
  }

  async function faq() {
    await axios
      .post(URL + "/faq", { user_id: user_id, }, Header)
      .then((response) => {
        setDataf(response.data.data)
        console.log(response)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err)
      })
  }

  useEffect(() => {
    urllinks()
    faq()

  }, [])
  //model
  const closeModal = () => {
    setisOpen(false)
  }

  const closeModalfaq = () => {
    setisOpenfaq(false)
  }

  function openRegistrationmodal(resource) {
    setmodelurlid(resource.mseq)
    setmodelurlname(resource.murl)
    setisOpen(true)

  }

  function openfaqmodal(resource) {
    setmodelfaqid(resource.mseq)
    setmodelfaqquestion(resource.mquest)
    setmodelfaqanswer(resource.mans)
    setisOpenfaq(true)

  }

  // modal
  // save data    
  const addurl = (e) => {
    e.preventDefault()
    if (murl == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("The URL is mandatory.")
      return
    }

    axios
      .post(URL + "/addurl", { seq: mseq, name: murl }, Header)
      .then((response) => {
        setisOpensuccessmsg(true)
        setmessage("Succeed")
        urllinks()
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err)
      })
  };

  // save data
  const addfaq = (e) => {
    e.preventDefault();
    if (modelfaqquestion == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("The Question is mandatory.");
      return
    }
    if (modelfaqanswer == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("The Answer is mandatory.");
      return
    }

    axios
      .post(URL + "/addfaq", { seq: modelfaqid, question: modelfaqquestion, answer: modelfaqanswer }, Header)
      .then((response) => {
        setisOpensuccessmsg(true);
        setmessage("Succeed");
        faq()
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  };

  //pagination
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

  //pagination
  const handleClickf = (event) => {
    setcurrentPagef(Number(event.target.id));
  };

  const pagesf = [];
  for (let i = 1; i <= Math.ceil(dataf.length / itemsPerPagef); i++) {
    pagesf.push(i);
  }

  const indexOfLastItemf = currentPagef * itemsPerPagef;
  const indexOfFirstItemf = indexOfLastItemf - itemsPerPagef;
  const currentItemsf = dataf.slice(indexOfFirstItemf, indexOfLastItemf);
  const renderPageNumbersf = pagesf.map((number) => {
    if (number < maxPageNumberLimitf + 1 && number > minPageNumberLimitf) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPagef == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtnf = () => {
    setcurrentPagef(currentPagef + 1);
    if (currentPagef + 1 > maxPageNumberLimitf) {
      setmaxPageNumberLimitf(maxPageNumberLimitf + pageNumberLimitf);
      setminPageNumberLimitf(minPageNumberLimitf + pageNumberLimitf);
    }
  };

  const handlePrevbtnf = () => {
    setcurrentPagef(currentPagef - 1);
    if ((currentPagef - 1) % pageNumberLimitf == 0) {
      setmaxPageNumberLimitf(maxPageNumberLimitf - pageNumberLimitf);
      setminPageNumberLimitf(minPageNumberLimitf - pageNumberLimitf);
    }
  };

  let pageIncrementBtnf = null;
  if (pagesf.length > maxPageNumberLimitf) {
    pageIncrementBtnf = <li onClick={handleNextbtnf}> &hellip; </li>;
  }

  let pageDecrementBtnf = null;
  if (minPageNumberLimitf >= 1) {
    pageDecrementBtnf = <li onClick={handlePrevbtnf}> &hellip; </li>;
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
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{t('Admin')}</li>
              </ol>
              <h6 className="font-weight-bolder mb-0">{t('Support')}</h6>
            </nav>
          </div>
        </nav>
        <div className="container-fluid pt-1 py-4 px-0">
          <div className="row">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card p-4">
                <div className="appdownTitle text-center">
                  <h4>{t('AddOurApplicationUrlToday')}</h4>
                  <p className="mt-2">{t('Excepteur.sint.occaecat.cupidatat.non.proident.sunt.in.culpa.qui.officia.deserunt.mollit.lorem.ipsum.anim.id.est.laborum.perspiciatis.under.')}</p>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <a className="btn button btn-info" onClick={() => openRegistrationmodal({ mseq: '0', murl: '' })}>{t('AddUrl')}</a>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <table className="display table-bordered dataTable no-footer mt-3">
                      <thead>
                        <tr>
                          <th onClick={() => sorting("url_name")}>{t('AddUrl')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map(item => {
                          return <tr className="rowCursorPointer" onClick={() => openRegistrationmodal({ mseq: item.seq, murl: item.url_name })}>
                            <td><a href="{item.url_name}" target="_blank" className="app-btn">
                              {item.url_name}
                            </a></td>
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
                              <div className="mb-3">
                                <div className="row">
                                  <div className="col-md-12">
                                    <label className="lablePapding" for="email">{t('AddNewUrl.')}</label>
                                  </div>
                                  <div className="col-md-12">
                                    <input type="text" className="form-control" id="email" placeholder="" name="email" onChange={(e) => { setmodelurlname(e.target.value) }} defaultValue={murl} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="formProgressBtn">
                              <div className="row">
                                <div className="col-md-5">
                                  <button type="submit" className="btn btn-sm" onClick={closeModal}>{t('Cancel')}</button>
                                </div>
                                <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                  <button type="submit" className="btn btn-sm savepopupbtn" onClick={addurl} >{t('Save')}</button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </Modal.Body>
                    </Modal>
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
                        <h6 className="font-weight-bolder mb-0 pt-2"><i className="mdi mdi-view-headline"></i> {t('SupportFaq')}</h6>
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
                            <a onClick={() => openfaqmodal({ mseq: '0', mquest: '', mans: '' })} className="btn button btn-info" >{t('AddFaq')}</a>
                          </div>
                          <table className="display table-bordered dataTable no-footer mt-6">
                            <thead>
                              <tr>
                                <th onClick={() => sorting("question")}>{t('Question')}</th>
                                <th onClick={() => sorting("answer")}>{t('Answer')}</th>
                                <th onClick={() => sorting("updated_at")}>{t('DateTime')}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItemsf.map(items => {
                                return <tr className="rowCursorPointer questionstyle" onClick={() => openfaqmodal({ mseq: items.seq, mquest: items.question, mans: items.answer })}>
                                  <td><strong>{items.question}</strong></td>
                                  <td>{items.answer}</td>
                                  <td>{items.updated_at}</td>
                                </tr>
                              })}
                            </tbody>
                          </table>
                          <div>
                            <ul className="pageNumbers">
                              <li>
                                <button
                                  onClick={handlePrevbtnf}
                                  disabled={currentPagef == pagesf[0] ? true : false}
                                >
                                  {t('Prev')}
                                </button>
                              </li>
                              {pageDecrementBtnf}
                              {renderPageNumbersf}
                              {pageIncrementBtnf}
                              <li>
                                <button
                                  onClick={handleNextbtnf}
                                  disabled={currentPagef == pagesf[pagesf.length - 1] ? true : false}
                                >
                                  {t('Next')}
                                </button>
                              </li>
                            </ul>
                          </div>
                          <Modal className='modal-box modalPopupCenter' show={isOpenfaq}>
                            <Modal.Header>
                              <h4 className="modal-title">{t('TerminalInformation')}</h4>
                              <button type="button" className="btn-close" onClick={closeModalfaq}>×</button>
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
                                    <div className="mb-3">
                                      <div className="row">
                                        <div className="col-md-12">
                                          <label className="lablePapding" for="email">{t('AddYourQuestion')}</label>
                                        </div>
                                        <div className="col-md-12">
                                          <input type="text" className="form-control" id="email" placeholder="" name="email" onChange={(e) => { setmodelfaqquestion(e.target.value) }} defaultValue={modelfaqquestion} />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-12">
                                          <label className="lablePapding" for="email">{t('AddYourAnswre')}</label>
                                        </div>
                                        <div className="col-md-12">
                                          <textarea className="form-control" onChange={(e) => { setmodelfaqanswer(e.target.value) }} defaultValue={modelfaqanswer}></textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="formProgressBtn">
                                    <div className="row">
                                      <div className="col-md-5">
                                        <button className="btn btn-sm" onClick={closeModalfaq}>{t('Cancel')}</button>
                                      </div>
                                      <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                        <button type="submit" className="btn btn-sm savepopupbtn" onClick={addfaq}>{t('Save')}</button>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </Modal.Body>
                          </Modal>
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
export default AdminSupport;