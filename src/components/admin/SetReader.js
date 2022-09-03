import React, { useState, useEffect } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "react-bootstrap";
import Successmsg from "../partner/success";
import Warningmsg from "../partner/warning";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { URL } from "../URL/url";
import { Header } from "../Header/headers";
import { CSVLink } from "react-csv";
import { useTranslation } from 'react-i18next';
function SetReader() {
  //language
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');
  let user_name = localStorage.getItem("user_name");
  let display_name = localStorage.getItem("display_name");
  let auth = localStorage.getItem("auth");
  let token = localStorage.getItem("token");
  let reseller_id = localStorage.getItem("reseller_id");
  let customerseq = localStorage.getItem("customerseq");
  let role = localStorage.getItem("role");
  const [data, setData] = useState([]);
  const [copyDate, setCopyDate] = useState([]);
  const [datas, setDatas] = useState([]);
  const [datal, setDatal] = useState([]);
  const [LocationLists, setLocationLists] = useState([]);
  const [selectpartner, setselectpartner] = useState('');
  const [selectcustomer, setselectcustomer] = useState('');
  const [selectlocation, setSelectlocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isOpensuccessmsg, setisOpensuccessmsg] = useState(false);
  const [isOpensuccessmsgw, setisOpensuccessmsgw] = useState(false);
  const [message, setmessage] = useState('');
  const [warmessage, setwarmessage] = useState('');
  const [datar, setDatar] = useState([]);
  const [datacus, setDatacus] = useState([]);
  const [datacusm, setDatacusm] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [m_ReaderSeq, setm_ReaderSeq] = useState('0');
  const [m_Reseller, setm_Reseller] = useState('');
  const [m_ReaderSerial, setm_ReaderSerial] = useState('');
  const [m_TID, setm_TID] = useState('');
  const [m_ReaderLocation, setm_ReaderLocation] = useState('');
  const [m_ReaderRegistered, setm_ReaderRegistered] = useState('');
  const [m_FreePeriod, setm_FreePeriod] = useState('');
  const [m_PayStarted, setm_PayStarted] = useState('');
  const [m_PayType, setm_PayType] = useState('');
  const [m_Status, setm_Status] = useState('');
  const [m_UnitCost, setm_UnitCost] = useState('');
  const [firstregidate, setFirstregidate] = useState(new Date());
  const [paiddate, setPaiddate] = useState(new Date());
  const headerss = [(data)];
  const [order, setorder] = useState("ASC");
  //Pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  // date format  
  let years = startDate.getFullYear();
  let months = startDate.getMonth() + 1;
  let dts = startDate.getDate();
  if (dts < 10) {
    dts = '0' + dts;
  }
  if (months < 10) {
    months = '0' + months;
  }
  let startDates = years + '-' + months + '-' + dts;
  let yeare = endDate.getFullYear();
  let monthe = endDate.getMonth() + 1;
  let dte = endDate.getDate();
  if (dte < 10) {
    dte = '0' + dte;
  }
  if (monthe < 10) {
    monthe = '0' + monthe;
  }

  let endDates = yeare + '-' + monthe + '-' + dte;
  // date format
  // date format  
  let yearsr = firstregidate.getFullYear();
  let monthsr = firstregidate.getMonth() + 1;
  let dtsr = firstregidate.getDate();
  if (dtsr < 10) {
    dtsr = '0' + dtsr;
  }
  if (monthsr < 10) {
    monthsr = '0' + monthsr;
  }
  let firstregidates = yearsr + '-' + monthsr + '-' + dtsr;
  let yearep = paiddate.getFullYear();
  let monthep = paiddate.getMonth() + 1;
  let dtep = paiddate.getDate();
  if (dtep < 10) {
    dtep = '0' + dtep;
  }
  if (monthep < 10) {
    monthep = '0' + monthep;
  }

  let paiddates = yearep + '-' + monthep + '-' + dtep;
  const showhideMODAL = () => {
    setisOpensuccessmsg(false);
    setisOpen(false);
  };

  const showhideMODALw = () => {
    setisOpensuccessmsgw(false);
  };

  // const searchpayday = (e) => {
  //   e.preventDefault();
  //   axios.post(URL + "/GetTransactionListDetail", {
  //     reseller_id: selectpartner,
  //     customer_id: selectcustomer,
  //     fromdate: startDates,
  //     todate: endDates,
  //     location: selectlocation,
  //   }, Header).then((response) => {
  //     setData(response.data.data);
  //   })
  // }

  //GetUsingPayReaderList
  async function GetUsingPayReaderList() {
    await axios.post(URL + "/GetUsingPayReaderList", {
      seq: 0
    }, Header).then((response) => {
      setData(response.data.data);
      setCopyDate(response.data.data);
      
      //console.log(response.data.data);
    })
  }

  //GetResellerList
  async function GetResellerList() {
    await axios
      .post(URL + "/GetResellerList", { resellerid: '', }, Header)
      .then((response) => {
        setDatar(response.data.data);
        // console.log(response.data.data)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //location list on reseller id on form
  const getloctaionRecord = (e) => {
    setselectpartner(e.target.value)
    axios.post(URL + "/GetReaderLocationList", {
      resellerid: e.target.value,
    }, Header).then((response) => {
      setDatal(response.data.data)
    })
  }

  function openRegistrationmodal(resource) {
    setm_ReaderSeq(resource.mseq)
    if (resource.mseq !== '') {
      axios.post(URL + "/GetUsingPayReaderList", {
        seq: resource.mseq
      }, Header).then((response) => {
        var reader = response.data.data
        console.log("payreader list");
        console.log(reader[0].seq)
        setm_ReaderSeq(reader[0].seq)
        setm_Reseller(reader[0].resellerid)
        setm_ReaderSerial(reader[0].serial)
        setm_TID(reader[0].tid)
        setm_ReaderLocation(reader[0].location)
        //setFirstregidate(reader[0].registered)
        setm_FreePeriod(reader[0].freeperiod)
        //setPaiddate(reader[0].paystartdate)
        setm_PayType(reader[0].paytype)
        setm_Status(reader[0].status)
        setm_UnitCost(reader[0].unitcost)
        //location list on form

        axios.post(URL + "/total_location_by_resellerid", {
          resellerid: reader[0].resellerid,
        }, Header).then((response) => {
          setLocationLists(response.data.data);
        })
      })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })

    }
    setisOpen(true)
  }

  const closeModal = () => {
    setisOpen(false)
  }

  const savetrans = (e) => {
    e.preventDefault();

    if (m_Reseller === '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Please select Partner");
    } else if (m_ReaderSerial === '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Please enter Serial Number");
    } else if (m_TID === '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Please enter TID");
    } else if (m_ReaderLocation === '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Please select Location");
    } else if (m_FreePeriod === '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Please enter Period");
    } else if (m_UnitCost === '') {
      setisOpensuccessmsgw(true);
      setwarmessage("Please enter Unit Cost");
    } else {
      if (m_PayType === '') {
        var mPayType = '1'
      } else {
        var mPayType = m_PayType
      }

      if (m_Status === '') {
        var mStatus = '1'
      } else {
        var mStatus = m_Status
      }
      

      axios
        .post(URL + "/SetReader", {
          seq: m_ReaderSeq,
          reseller: m_Reseller,
          serial: m_ReaderSerial,
          tid: m_TID,
          location: m_ReaderLocation,
          registered: firstregidates,
          freeperiod: m_FreePeriod,
          paystartdate: paiddates,
          paytype: mPayType,
          unitcost: m_UnitCost,
          status: mStatus,
          comment: ''
        }, Header)
        .then((response) => {
          console.log(response)
          if (response.data.success === true) {
            setisOpensuccessmsg(true);
            setmessage("Succeed");
            GetUsingPayReaderList()
          }
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    }
  }
  //location list on customer id
  const getloctaionRecords = (e) => {
    setm_Reseller(e.target.value)
    if (e.target.value === '') {
      setselectcustomer('')
      setSelectlocation('')
      setLocationLists([])
    }
    axios.post(URL + "/total_location_by_resellerid", {
      resellerid: e.target.value,
    }, Header).then((response) => {
      setLocationLists(response.data.data);
    })
  }

  //search data
  function searchdata(e){
    //GetUsingPayReaderList()
    var rec = [];
    
    if(e.target.value===''){
      GetUsingPayReaderList()
    }else{
      //console.log(e.target.value)
      //console.log(copyDate)
      copyDate.filter(item => 
        item.serial.includes(e.target.value) ||
        item.seq.toString().includes(e.target.value) ||
        item.freeperiod.toString().includes(e.target.value) ||
        item.locationName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.paystartdate.includes(e.target.value) ||
        item.paytypename.includes(e.target.value) ||
        item.registered.includes(e.target.value) ||
        item.reseller.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.statusname.includes(e.target.value) ||
        item.tid.includes(e.target.value) ||
        item.unitcost.toString().includes(e.target.value)
        
        ).map(items => (
        rec.push(items)
      ))
      console.log(rec)
      setData(rec)
    }
    
  }


  useEffect(() => {
    GetUsingPayReaderList()
    GetResellerList()
  }, []);

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
  //sorting
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        col === 'seq' || col === 'serial' || col === 'tid' || col === 'freeperiod' || col === 'unitcost' ?
          parseInt(a[col]) > parseInt(b[col]) ? 1 : -1
          :
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((b, a) =>
        col === 'seq' || col === 'serial' || col === 'tid' || col === 'freeperiod' || col === 'unitcost' ?
          parseInt(a[col]) > parseInt(b[col]) ? 1 : -1
          :
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("ASC");
    }
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
              <h6 className="font-weight-bolder mb-0">{t('TerminalSettings')}</h6>
            </nav>
          </div>
        </nav>
        <div className="container-fluid pt-1 py-4 px-0">
          {/* <div className="row">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card p-2 px-4">
                <form action="" className="information_form">
                  <div className="row mt-3">
                    <div className="col-md-2">
                      <label className="input_label_padding_top">{t('SearchPeriod')}:</label>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <DatePicker className='form-control' selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <DatePicker className='form-control' selected={endDate} onChange={(date) => setEndDate(date)} dateFormat="yyyy-MM-dd" />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-2">
                      <label className="input_label_padding_top">{t('Search')}</label>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <select className="selectpicker classNameic form-select select_options align-left" onChange={getloctaionRecord} id='selectreseller' data-live-search="true">
                          <option value="">{t('Partner')}</option>
                          {datar.map((item, i) => {
                            return <option key={i} value={item.resellerid}>{item.displayname}</option>
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <select className="classic form-select select_options align-left padingtop" onChange={(e) => { setSelectlocation(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text) }} >
                          <option value="">{t('Location')}</option>
                          {datal.map((items, i) => {
                            return <option key={i} value={items.seq}>{items.displayname}</option>
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <input type={'text'} className='form-control' placeholder={t('TerminalSerial')} />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <input type={'text'} className='form-control' placeholder={t('TID')} />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <button type="button" className="btn btn-outline-success allBtnsize" onClick={searchpayday}>{t('Search')}</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div> */}

          <div className="row">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card p-4">
                <div className="databaseTableSection pt-0">
                  <div className="grayBgColor p-4 pt-2 pb-2">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="font-weight-bolder mb-0 pt-2"><i className="mdi mdi-view-headline"></i> {t('TerminalList')}</h6>
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
                        <div>
                          <div id="datatable_wrapper" className="information_dataTables dataTables_wrapper dt-bootstrap4 table-responsive">
                            {/* sdsd */}
                            <div className="col-md-12 d-flex " >
                            <div className='col-md-6 d-flex mt-3' >
                                <div class="input-group input-group-sm tsearch ">

                                  <input type="text" class="form-control form-control-sm rounded " placeholder="Search"
                                    aria-label="Search" aria-describedby="basic-addon2" 
                                    onChange={searchdata} />
                                </div>
                              </div>
                              {/* sdsd */}
                            <div className="d-flex exportPopupBtn">
                              

                              {/* <a href="#!" className="btn button btn-info">Export</a> */}
                              <CSVLink headerss={headerss} data={data} filename="SetReader.csv">
                                <button className="btn button btn-info mx-2" >{t('Export')}</button>
                              </CSVLink>
                              <a className="btn button btn-info" onClick={() => openRegistrationmodal({ mseq: '' })}>{t('Registration')}</a>
                            </div>
                            </div>

                            <table className="display table-bordered dataTable no-footer mt-6">
                              <thead>
                                <tr>
                                  <th onClick={() => sorting("seq")} className="text-center sorting">{t('Turn')}</th>
                                  <th onClick={() => sorting("reseller")} className="text-center sorting">{t('Partner')}</th>
                                  <th onClick={() => sorting("locationName")} className="text-center sorting">{t('Location')}</th>
                                  <th onClick={() => sorting("serial")} className="text-center sorting">{t('SerialNo')}</th>
                                  <th onClick={() => sorting("tid")} className="text-center sorting">{t('TID')}</th>
                                  <th onClick={() => sorting("registered")} className="text-center sorting">{t('FirstRegistrationDate')}</th>
                                  <th onClick={() => sorting("freeperiod")} className="text-center sorting">{t('FreePeriod')}</th>
                                  <th onClick={() => sorting("paystartdate")} className="text-center sorting">{t('PaidStartDate')}</th>
                                  <th onClick={() => sorting("paytypename")} className="text-center sorting">{t('PaymentCategory')}</th>
                                  <th onClick={() => sorting("unitcost")} className="text-center sorting">{t('UnitPrice')}</th>
                                  {/* <th className="text-center sorting">{t('ExpectedPaymentAmount')}</th> */}
                                  <th onClick={() => sorting("statusname")} className="text-center sorting">{t('State')}</th>
                                  <th onClick={() => sorting("comment")} className="text-center sorting">{t('Note')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentItems.length > 0 ? currentItems.map((item, i) => {
                                  return <tr key={i} className="odd show-modal" onClick={() => openRegistrationmodal({ mseq: item.seq })} >
                                    <td>{item.seq}</td>
                                    <td>{item.reseller}</td>
                                    <td>{item.locationName}</td>
                                    <td>{item.serial}</td>
                                    <td>{item.tid}</td>
                                    <td>{item.registered}</td>
                                    <td>{item.freeperiod}</td>
                                    <td>{item.paystartdate}</td>
                                    <td>{item.paytypename}</td>
                                    <td>{item.unitcost}</td>
                                    {/* <td>{item.gmissionid}</td> */}
                                    <td>{item.statusname}</td>
                                    <td>{item.comment}</td>

                                  </tr>
                                }) : <tr className="odd"><td valign="top" colSpan="12" className="dataTables_empty">{t('NoDataAvailable')}</td></tr>}
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
                            {/* modal */}
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
                                        <div className='col-md-4'><span>{t('Partner')}</span></div>
                                        <div className='col-md-8'>
                                          <select className="form-select" onChange={getloctaionRecords} id='selectreseller' data-live-search="true" value={m_Reseller}>
                                            <option value="">{t('Partner')}</option>
                                            {datar.map((item, i) => {
                                              return <option key={i} value={item.resellerid}>{item.displayname}</option>
                                            })}
                                          </select>
                                        </div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('SerialNo')}</span></div>
                                        <div className='col-md-8'>
                                          <input type="text" className='form-control' onChange={(e) => { setm_ReaderSerial(e.target.value) }} defaultValue={m_ReaderSerial} />
                                        </div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('TID')}</span></div>
                                        <div className='col-md-8'>
                                          <input type="text" className='form-control' onChange={(e) => { setm_TID(e.target.value) }} defaultValue={m_TID} />
                                        </div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('Location')}</span></div>
                                        <div className='col-md-8'>
                                          <select className='form-select' onChange={(e) => { setm_ReaderLocation(e.target.value) }} value={m_ReaderLocation}>
                                            <option value={''}>Location</option>
                                            {LocationLists.map((item, i) => {
                                              return <option key={i} value={item.seq}>{item.displayname}</option>
                                            })}


                                          </select>
                                          {/* <input type="text" className='form-control' onChange={(e) => { setm_ReaderLocation(e.target.value) }} defaultValue={m_ReaderLocation} /> */}
                                        </div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('FirstRegistrationDate')}</span></div>
                                        <div className='col-md-8'>
                                          <DatePicker className='form-control' selected={firstregidate} onChange={(date) => setFirstregidate(date)} dateFormat="yyyy-MM-dd" />
                                        </div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('FreePeriod')}</span></div>
                                        <div className='col-md-8'><input type={'text'} className='form-control' onChange={(e) => { setm_FreePeriod(e.target.value) }} defaultValue={m_FreePeriod} /></div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('PaidStartDate')}</span></div>
                                        <div className='col-md-8'>
                                          <DatePicker className='form-control' selected={paiddate} onChange={(date) => setPaiddate(date)} dateFormat="yyyy-MM-dd" />
                                        </div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('PaymentCategory')}</span></div>
                                        <div className='col-md-8'>
                                          <select className='form-select' onChange={(e) => { setm_PayType(e.target.value) }} value={m_PayType}>
                                            <option value={'1'}>{t('Month')}</option>
                                            <option value={'2'}>{t('Year')}</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('UnitPrice')}</span></div>
                                        <div className='col-md-8'>
                                          <input type={'text'} className='form-control' onChange={(e) => { setm_UnitCost(e.target.value) }} value={m_UnitCost} />
                                        </div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('State')}</span></div>
                                        <div className='col-md-8'>
                                          <select className='form-select' onChange={(e) => { setm_Status(e.target.value) }} value={m_Status}>
                                            <option value={'1'}>{t('Inuse')}</option>
                                            <option value={'2'}>{t('Pause')}</option>
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
                                          <button type="submit" className="btn btn-sm savepopupbtn" onClick={savetrans} >{t('Save')}</button>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </Modal.Body>
                            </Modal>
                            {/* modal */}
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
export default SetReader;