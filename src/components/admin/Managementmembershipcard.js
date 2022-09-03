
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Modal, Tabs, Tab } from "react-bootstrap";
//import DataTable from "react-data-table-component";
import Successmsg from "../partner/success";
import Warningmsg from "../partner/warning";
import { URL } from "../URL/url";
import { Header } from "../Header/headers";
import XLSX from 'xlsx'
import { useTranslation } from 'react-i18next';

function Managementmembershipcard() {
  //language
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');
  let user_name = localStorage.getItem("user_name");
  let display_name = localStorage.getItem("display_name");
  let auth = localStorage.getItem("auth");
  let token = localStorage.getItem("token");
  let reseller_id = localStorage.getItem("reseller_id");
  let customerseq = localStorage.getItem("customerseq");
  let user_id = localStorage.getItem("user_id");
  let role = localStorage.getItem("role");
  const [data, setData] = useState([]);
  const [datar, setDatar] = useState([]);
  const [datareseller, setDatareseller] = useState([]);
  const [selectcard, setSelectcard] = useState('');
  const [selectpartner, setSelectpartner] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isOpen, setisOpen] = useState(false);
  const [isOpenc, setisOpenc] = useState(false);
  const [isOpenu, setisOpenu] = useState(false);
  const [modelResellername, setmodelResellername] = useState('');
  const [modelTCardnum, setmodelTCardnum] = useState('');
  const [modelBalance, setmodelBalance] = useState('');
  const [modelSeq, setmodelSeq] = useState('');
  const [modelComment, setmodelComment] = useState('');
  const [modelDescription, setmodelDescription] = useState('');
  const [modelupdatern, setModelupdatern] = useState('');
  const [modelupdatecomment, setModelupdatecomment] = useState('');
  const [modelupdatecardnum, setModelupdatecardnum] = useState('');
  const [modelupdatebalance, setModelupdatebalance] = useState('');
  const [modelupdatedescription, setModelupdatedescription] = useState('');
  const [modelupdateseq, setModelupdateseq] = useState('');
  const [modelinsdescription, setModelinsdescription] = useState('');
  const [isOpensuccessmsg, setisOpensuccessmsg] = useState(false);
  const [isOpensuccessmsgw, setisOpensuccessmsgw] = useState(false);
  const [message, setmessage] = useState('');
  const [warmessage, setwarmessage] = useState('');
  const [mtopupcardnum, setMtopupcardnum] = useState('');
  const [mtopupcost, setMtopupcost] = useState('');
  const [mtopupcomment, setMtopupcomment] = useState('');
  const [checkcardnum, setCheckcardnum] = useState('');
  const [order, setorder] = useState("ASC");
  const [searchMembershipCard, setSearchMembershipCard] = useState('');
  const [copyData, setCopyData] = useState([]);

  useEffect(() => {
    
    axios
      .post(URL + "/GetResellerList", { resellerid: '', }, Header)
      .then((response) => {
        setDatareseller(response.data.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }, []);

  const savemfcard = () => {
    if (modelupdatern == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Please select a partner.");
    } else if (modelupdatecardnum.length < 10 ) {
      setisOpensuccessmsgw(true);
      setwarmessage("The card number is invalid.");
    } else if (modelupdatecomment.length != 8) {
      setisOpensuccessmsgw(true);
      setwarmessage("The internal number is invalid.");
    } else if (modelupdatebalance == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Please enter the amount as a number.");
    } else {
      
      axios
        .post(URL + "/SetMFCard", { seq: -1, resellerid: modelupdatern, cardnum: modelupdatecomment, balance: modelupdatebalance, comment: modelupdatecardnum, description: modelinsdescription, }, Header)
        .then((response) => {
          setisOpensuccessmsg(true);
          setmessage("Succeed");
          GetMFcardList()
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    }
  };

  const TopupMFCard = async () => {
    if (mtopupcardnum == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Please enter card number.");
    } else if (mtopupcost == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Please enter Amount.");
    } else {
      let checkcardres = '';
      
      await axios
        .post(URL + "/GetMFCardInfoFromComment", { comment: mtopupcardnum, }, Header)
        .then((response) => {
          setCheckcardnum(response.data.data);
          checkcardres = response.data.data;
          //console.log(response)
        })
      if (checkcardres == '') {
        setisOpensuccessmsgw(true);
        setwarmessage("This is not a registered card number.");
      } else {
        if (reseller_id == checkcardres[0].resellerid) {
          setisOpensuccessmsgw(true);
          setwarmessage("Another partner's card number.");
        } else {
          
          await axios.post(URL + "/TopupMFCard", { operatorid: user_id, resellerid: reseller_id, cardnum: mtopupcardnum, cost: mtopupcost, comment: mtopupcomment }, Header).then((response) => {
            setisOpensuccessmsg(true);
            setmessage("Succeed");
            GetMFcardList();
          })
        }
      }
    }
  };

  const SetMFCard = (e) => {
    e.preventDefault();
    console.log(modelSeq,modelResellername,modelTCardnum,modelBalance,modelComment,modelDescription); 
    if (modelResellername == '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Please select a partner.");
    } else if (modelTCardnum.length < 10) {
      setisOpensuccessmsgw(true);
      setwarmessage("The card number is invalid.");
    } else if (modelComment.length !=8) {
      setisOpensuccessmsgw(true);
      setwarmessage("The internal number is invalid.");
    } else if (modelBalance === '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Please enter the amount as a number.");
    } else {
           
      
      axios
        .post(URL + "/SetMFCard", { seq: modelSeq, resellerid: modelResellername, cardnum:modelComment , balance: modelBalance, comment: modelTCardnum, description: modelDescription }, Header)
        .then((response) => {
          setisOpensuccessmsg(true);
          setmessage("Succeed");
          GetMFcardList();
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    }
  };

  function openModal(resource) {
    // console.log(resource.id+" jai sro ram")
    setisOpen(true)
    // setmodelCustomerName(resource.mcustomer);
    // setmodelTid(resource.mtid);
    // setmodelModelName(resource.mkiccmodel);
    // setmodelSerialNo(resource.mkiccserial);
    // setmodelVersion(resource.mkiccver);
    // setmodelEmplacement(resource.mlocation);
  };

  const closeModal = () => {
    setisOpen(false)
  };

  function openModalc(resource) {
    setisOpenc(true)
  };

  const closeModalc = () => {
    setisOpenc(false)
  };

  function openModalu(resource) {
    // console.log(resource.id+" jai sro ram")
    setisOpenu(true)
    setmodelResellername(resource.mresellername);
    setmodelTCardnum(resource.mcardnum);
    setmodelBalance(resource.mbalance);
    setmodelSeq(resource.mseq);
    setmodelComment(resource.mcomment);
    setmodelDescription(resource.mdescription);
  };

  const closeModalu = () => {
    setisOpenu(false)
  };
  async function GetMFcardList() {
    
    await axios
      .post(URL + "/GetMFcardList", { role: role, reseller_id: '', }, Header)
      .then((response) => {
        setData(response.data.data);
        setCopyData(response.data.data);
        console.log(response.data.data)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  useEffect(() => {
    GetMFcardList()
  }, []);

  // search    
  const handelSubmit = (e) => {
    e.preventDefault();
    var form = new FormData(e.target);
    var rec = [];
    var partner = form.get('partner');
    var searchtype = form.get('searchtype');
    var keyword = form.get('keyword');
    if (searchtype == "comment") {
      copyData.filter(item => item.resellername === partner && item.cardnum.includes(keyword)).map(items => (
        rec.push(items)
      ))
    }
    if (searchtype == "internal") {
      copyData.filter(item => item.resellername === partner && item.comment.includes(keyword)).map(items => (
        rec.push(items)
      ))
    }
    if (searchtype == "description") {
      copyData.filter(item => item.resellername === partner && item.description.toLowerCase().includes(keyword.toLocaleLowerCase())).map(items => (
        rec.push(items)
      ))
    }
    setData(rec)
  };

  const showhideMODAL = () => {
    setisOpensuccessmsg(false);
    setisOpenu(false);
    setisOpen(false);
    setisOpenc(false);
  };

  const showhideMODALw = () => {
    setisOpensuccessmsgw(false);
  };

  //import
  const EXTENSIONS = ['xlsx', 'xls', 'csv']
  const [file, setModelimportmfcard] = useState('');
  const [colDefs, setColDefs] = useState()
  const [dataim, setDataim] = useState()
  const getExention = (file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) // return boolean
  }

  const convertToJson = (data) => {
    const rows = []
    data.forEach(row => {
      let rowData = {}
      row.forEach((element, index) => {
        rowData[index] = element
      })
      let comment = rowData[0]
      let cardnum = rowData[1]
      let resellerid = rowData[2]
      let balance
      if (rowData[3]) {
        balance = rowData[3]
      } else {
        balance = '0'
      }
      let description
      if (rowData[4]) {
        description = rowData[4]
      } else {
        description = ''
      }
      //console.log(description)
      //insert
      
      axios
        .post(URL + "/SetMFCard", { seq: '-1', resellerid: resellerid, cardnum: cardnum, balance: balance, comment: comment, description: description, }, Header)
        .then((response) => {
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
      rows.push(rowData)
    });
    return rows
  }

  const ImportMFCard = () => {
    const reader = new FileReader()
    reader.onload = (event) => {
      //parse data
      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: "binary" })
      //get first sheet
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
      //console.log(fileData)
      //const headers = fileData[0]
      //const heads = headers.map(head => ({ title: head, field: head }))
      //setColDefs(heads)
      //removing header
      //fileData.splice(0, 0)
      setDataim(convertToJson(fileData))
    }
    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      }
      else {
        //alert("Invalid file input, Select Excel, CSV file")
        setisOpensuccessmsgw(true);
        setwarmessage("Invalid file input, Select Excel, CSV file");
      }
    } else {
      setisOpensuccessmsg(true);
      setmessage("Succeed");
      setDataim([])
      setColDefs([])
    }
    //console.log(dataim.length);
  }

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
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        col === 'balance' ?
          parseInt(a[col]) > parseInt(b[col]) ? 1 : -1
          :
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((b, a) =>
        col === 'balance' ?
          parseInt(a[col]) > parseInt(b[col]) ? 1 : -1
          :
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("ASC");
    }
  };

  const eventCall = (e) => {
    setSearchMembershipCard(e.target.value);
    if (e.target.value === '') { GetMFcardList() }
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
              <h6 className="font-weight-bolder mb-0">{t('MembershipCardManagement')}</h6>
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
                        <select className="classic form-select select_options align-left" name='partner'>
                          <option value="">{t('Partner')}</option>
                          {datareseller.map((item, i) => {
                            return <option key={i} value={item.displayname}>{item.displayname}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <select className="classic form-select select_options align-left" name='searchtype'>
                          <option value="comment">{t('CardNumber')}</option>
                          <option value="internal">{t('InternalNumber')}</option>
                          <option value="description">{t('CardDescription')}</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <input type="text" className="form-control padingtop" name='keyword' placeholder="" onChange={(e) => { eventCall(e) }} />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <button type="submit" className="btn btn-outline-success allBtnsize" onClick={() => { setFirstPage() }} disabled={searchMembershipCard === '' ? true : false}>{t('Search')}</button>
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
                  <div className="grayBgColor p-2">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="font-weight-bolder mb-0 pt-2"><i className="mdi mdi-view-headline"></i> {t('MembershipCardList')}</h6>
                      </div>
                      <div className="col-md-6">
                        <div className="">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="top-space-search-reslute">
                    <div className="tab-content p-4 pt-0">
                      <div className="tab-pane active" id="header" role="tabpanel">
                        <div id="datatable_wrapper" className="information_dataTables dataTables_wrapper dt-bootstrap4 table-responsive">
                          <div className="d-flex exportPopupBtn">
                            <a className="btn button btn-info mx-2" onClick={openModal}>{t('Enrollment')}</a>
                            <a className="btn button btn-info" onClick={openModalc}>{t('Charge')}</a>
                          </div>
                          <table className="display table-bordered dataTable no-footer mt-6">
                            <thead>
                              <tr>
                                <th onClick={() => sorting("resellername")} className="text-center sorting">{t('Partner')}</th>
                                <th onClick={() => sorting("cardnum")} className="text-center sorting">{t('CardNumber')}</th>
                                <th onClick={() => sorting("balance")} className="text-center sorting">{t('Balance')}</th>
                                <th onClick={() => sorting("comment")} className="text-center sorting">{t('InternalNumber')}</th>
                                <th onClick={() => sorting("lastupdate")} className="text-center sorting">{t('LastUsedDate')}</th>
                                <th onClick={() => sorting("description")} className="text-center sorting">{t('CardDescription')} </th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems.length > 0 ? currentItems.map((item, i) => {
                                return <tr key={i} className="odd show-modal" onClick={() => openModalu({ mresellername: item.resellerid, mcardnum: item.cardnum, mbalance: item.balance, mseq: item.seq, mcomment: item.comment, mdescription: item.description })}>
                                  <td>{item.resellername}</td>
                                  <td>{item.cardnum}</td>
                                  <td>{item.balance}</td>
                                  <td>{item.comment}</td>
                                  <td>{item.lastupdate}</td>
                                  <td>{item.description}</td>
                                </tr>
                              }) : <tr className="odd"><td valign="top" colSpan="6" className="dataTables_empty">{t('No data available')}</td></tr>}
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
                          {/* model1 Add */}
                          <Modal className='modal-box modalPopupCenter add' show={isOpen}>
                            <Modal.Header>
                              <h4 className="modal-title">{t('MembershipCardInformation')}</h4>
                              <button type="button" className="btn-close" onClick={closeModal}>×</button>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="formProgress">
                                <div className="formtopcont">
                                  <p>{t('LoremIpsumisaplaceholdertextcommonlyused.')}</p>
                                </div>
                              </div>
                              <div className="formBgcolor">
                                {/*  */}
                                <Tabs
                                  defaultActiveKey="home"
                                  transition={false}
                                  id="noanim-tab-example"
                                  className="mb-3"
                                >
                                  <Tab eventKey="home" title={t('IndividualRegistration&EditingIndividualCharge')}>
                                    <form className="pb-0" onSubmit={(e) => e.preventDefault()}>
                                      <div className="formProgress manForm pt-2">
                                        <div className="mb-3 mt-3">
                                          <div className="row">
                                            <div className="col-md-4">
                                              <label className="lablePapding" for="email">{t('Partner')}</label>
                                            </div>
                                            <div className="col-md-8">
                                              <select className="form-select padingtop" onChange={(e) => { setModelupdatern(e.target.value) }}>
                                                <option value="">{t('SelectPartner')}</option>
                                                {datareseller.map((item,i) => {
                                                  return <option key={i} value={item.resellerid}>{item.displayname}</option>
                                                })}
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3 mt-3">
                                          <div className="row">
                                            <div className="col-md-4">
                                              <label className="lablePapding" for="email">{t('CardNumber')}</label>
                                            </div>
                                            <div className="col-md-8">
                                              <input type="text" className="form-control" id="updatecardnum" onChange={(e) => { setModelupdatecardnum(e.target.value) }} />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3 mt-3">
                                          <div className="row">
                                            <div className="col-md-4">
                                              <label className="lablePapding" for="email">{t('InternalNumber')}</label>
                                            </div>
                                            <div className="col-md-8">
                                              <input type="text" className="form-control" id="updatecomment" onChange={(e) => { setModelupdatecomment(e.target.value) }} />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3">
                                          <div className="row">
                                            <div className="col-md-4">
                                              <label className="lablePapding" for="email">{t('Balance')}</label>
                                            </div>
                                            <div className="col-md-8">
                                              <input type="text" className="form-control" id="updatebalance" onChange={(e) => { setModelupdatebalance(e.target.value) }} />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3">
                                          <div className="row">
                                            <div className="col-md-4">
                                              <label className="lablePapding" for="email">{t('CardDescription')}</label>
                                            </div>
                                            <div className="col-md-8">
                                              <input type="text" className="form-control" id="insdescription" onChange={(e) => { setModelinsdescription(e.target.value) }} />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="formProgressBtn">
                                        <div className="row">
                                          <div className="col-md-5">
                                            <button type="button" className="btn btn-sm" onClick={closeModal}>{t('Cancel')}</button>
                                          </div>
                                          <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                            <button type="submit" className="btn btn-sm savepopupbtn" on onClick={savemfcard}>{t('Save')}</button>
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  </Tab>
                                  <Tab eventKey="profile" title={t('RegisterAsFile')}>
                                    <form onSubmit={(e) => e.preventDefault()}>
                                      <div className="formProgress manForm pt-2">
                                        <div className="input-group mb-3">
                                          <input type="file" className="form-control" onChange={(e) => { setModelimportmfcard(e.target.files[0]) }} />
                                        </div>
                                        <div className="input-group mb-3">
                                          ※ {t('For.Excel.items.please.enter.the.card.number.amount.and.reason.for.recharging.from.the.first.line')}.
                                        </div>
                                        <div className="formProgressBtn">
                                          <div className="row">
                                            <div className="col-md-5">
                                              <button type="submit" className="btn btn-sm" onClick={closeModal}>{t('Cancel')}</button>
                                            </div>
                                            <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                              <button type="submit" className="btn btn-sm savepopupbtn" onClick={ImportMFCard}>{t('Save')}</button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  </Tab>
                                </Tabs>
                                {/*  */}
                              </div>
                            </Modal.Body>
                          </Modal>
                          {/* model1 */}
                          {/* model2 charge*/}
                          <Modal className='modal-box modalPopupCenter' show={isOpenc}>
                            <Modal.Header>
                              <h4 className="modal-title">{t('MembershipCardRecharge')}</h4>
                              <button type="button" className="btn-close" onClick={closeModalc}>×</button>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="formProgress">
                                <div className="formtopcont">
                                  <p>{t('LoremIpsumisaplaceholdertextcommonlyused.')}</p>
                                </div>
                              </div>
                              <div className="formBgcolor">
                                {/*  */}
                                <Tabs
                                  defaultActiveKey="home"
                                  transition={false}
                                  id="noanim-tab-example"
                                  className="mb-3"
                                >
                                  <Tab eventKey="home" title={t('IndividualCharge')}>
                                    <form className="pb-0" onSubmit={(e) => e.preventDefault()}>
                                      <div className="formProgress manForm pt-2">
                                        <div className="mb-3 mt-3">
                                          <div className="row">
                                            <div className="col-md-4">
                                              <label className="lablePapding" for="email">{t('CardNumber')}</label>
                                            </div>
                                            <div className="col-md-8">
                                              <input type="text" className="form-control" id="m_topupcardnum" placeholder="" name="m_topupcardnum" onChange={(e) => { setMtopupcardnum(e.target.value) }} />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3">
                                          <div className="row">
                                            <div className="col-md-4">
                                              <label className="lablePapding" for="m_topupcost">{t('Balance')}</label>
                                            </div>
                                            <div className="col-md-8">
                                              <input type="text" className="form-control" id="m_topupcost" placeholder="" name="m_topupcost" onChange={(e) => { setMtopupcost(e.target.value) }} />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3">
                                          <div className="row">
                                            <div className="col-md-4">
                                              <label className="lablePapding" for="m_topupcomment">{t('ReasonForCharging')}</label>
                                            </div>
                                            <div className="col-md-8">
                                              <input type="text" className="form-control" id="m_topupcomment" placeholder="" name="m_topupcomment" onChange={(e) => { setMtopupcomment(e.target.value) }} />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="formProgressBtn">
                                        <div className="row">
                                          <div className="col-md-5">
                                            <button type="button" className="btn btn-sm" onClick={closeModalc}>{t('Cancel')}</button>
                                          </div>
                                          <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                            <button type="submit" className="btn btn-sm savepopupbtn" onClick={TopupMFCard}>{t('Save')}</button>
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  </Tab>
                                  <Tab eventKey="profile" title={t('BatchFileCharging')}>
                                    <form>
                                      <div className="formProgress manForm pt-2">
                                        <div className="input-group mb-3">
                                          <input type="file" className="form-control" placeholder="Search" />
                                        </div>
                                        <div className="input-group mb-3">
                                          ※ {t('For.Excel.items.please.enter.the.card.number.amount.and.reason.for.recharging.from.the.first.line')}.
                                        </div>
                                        <div className="formProgressBtn">
                                          <div className="row">
                                            <div className="col-md-5">
                                              <button type="submit" className="btn btn-sm" onClick={closeModalc}>{t('Cancel')}</button>
                                            </div>
                                            <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                              <button type="submit" className="btn btn-sm savepopupbtn">{t('Save')}</button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  </Tab>
                                </Tabs>
                                {/*  */}
                              </div>
                            </Modal.Body>
                          </Modal>
                          {/* model2 */}
                          {/* model3 update card */}
                          <Modal className='modal-box modalPopupCenter' show={isOpenu}>
                            <Modal.Header>
                              <h4 className="modal-title">{t('MembershipCardInformation')}</h4>
                              <button type="button" className="btn-close" onClick={closeModalu}>×</button>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="formProgress">
                                <div className="formtopcont">
                                  <p>{t('LoremIpsumisaplaceholdertextcommonlyused.')}</p>
                                </div>
                              </div>
                              <div className="formBgcolor">
                                {/*  */}
                                <Tabs
                                  defaultActiveKey="home"
                                  transition={false}
                                  id="noanim-tab-example"
                                  className="mb-3"
                                >
                                  <Tab eventKey="home" title={t('IndividualRegistration&EditingIndividualCharge')}>
                                    <form className="pb-0" onSubmit={(e) => e.preventDefault()}>
                                      <div className="formProgress manForm pt-2">
                                        <div className="mb-3 mt-3">
                                          <div className="row">
                                            <div className="col-md-4">
                                              <label className="lablePapding" for="email">{t('Partner')}</label>
                                            </div>
                                            <div className="col-md-8">
                                              {/* <span>{modelResellername}</span> */}
                                              <select className="form-select padingtop" onChange={(e) => { setmodelResellername(e.target.value) }} value={modelResellername}>
                                                {datareseller.map((item,i) => {
                                                  return <option key={i} value={item.resellerid}>{item.displayname}</option>
                                                })}
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3 mt-3">
                                          <div className="row">
                                            <div className="col-md-4">
                                              <label className="lablePapding" for="email">{t('CardNumber')}</label>
                                            </div>
                                            <div className="col-md-8">
                                              {/* <span>{modelComment}</span> */}
                                              <input type="text" className="form-control" onChange={(e) => { setmodelTCardnum(e.target.value) }} defaultValue={modelTCardnum} />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3 mt-3">
                                          <div className="row">
                                            <div className="col-md-4">
                                              <label className="lablePapding" for="email">{t('InternalNumber')}</label>
                                            </div>
                                            <div className="col-md-8">
                                              {/* <span>{modelTCardnum}</span> */}
                                              <input type="text" className="form-control" onChange={(e) => { setmodelComment(e.target.value) }} defaultValue={modelComment} />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3">
                                          <div className="row">
                                            <div className="col-md-4">
                                              <label className="lablePapding" for="email">{t('Balance')}</label>
                                            </div>
                                            <div className="col-md-8">
                                              <span>{modelBalance}</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mb-3">
                                          <div className="row">
                                            <div className="col-md-4">
                                              <label className="lablePapding" for="email">{t('CardDescription')}</label>
                                            </div>
                                            <div className="col-md-8">
                                              <input type="text" className="form-control" onChange={(e) => { setmodelDescription(e.target.value) }} defaultValue={modelDescription} />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="formProgressBtn">
                                        <div className="row">
                                          <div className="col-md-5">
                                            <button type="button" className="btn btn-sm" onClick={closeModalu}>{t('Cancel')}</button>
                                          </div>
                                          <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                            <button type="submit" className="btn btn-sm savepopupbtn" onClick={SetMFCard}>{t('Save')}</button>
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  </Tab>
                                  <Tab eventKey="profile" title={t('RegisterAsFile')}>
                                    <form>
                                      <div className="formProgress manForm pt-2">
                                        <div className="input-group mb-3">
                                          <input type="file" className="form-control" placeholder="Search" />
                                        </div>
                                        <div className="input-group mb-3">
                                          ※ {t('For.Excel.items.please.enter.the.card.number.amount.and.reason.for.recharging.from.the.first.line')}.
                                        </div>
                                        <div className="formProgressBtn">
                                          <div className="row">
                                            <div className="col-md-5">
                                              <button type="submit" className="btn btn-sm" onClick={closeModalu}>{t('Cancel')}</button>
                                            </div>
                                            <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                              <button type="submit" className="btn btn-sm savepopupbtn">{t('Save')}</button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  </Tab>
                                </Tabs>
                                {/*  */}
                              </div>
                            </Modal.Body>
                          </Modal>
                          {/* model3 */}
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
export default Managementmembershipcard;