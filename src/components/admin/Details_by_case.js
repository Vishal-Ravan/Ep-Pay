import React, { useState, useEffect } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "react-bootstrap";
import Successmsg from "../partner/success";
import Warningmsg from "../partner/warning";
import { URL } from "../URL/url";
import { Header } from "../Header/headers";
import { CSVLink } from "react-csv";
import { useTranslation } from 'react-i18next';
function Details_by_case() {
  //language
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');
  let reseller_id = localStorage.getItem("reseller_id");
  let customerseq = localStorage.getItem("customerseq");
  const [data, setData] = useState([]);
  const [selectpartner, setselectpartner] = useState('');
  const [selectcustomer, setselectcustomer] = useState('');
  const [selectlocation, setSelectlocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isOpensuccessmsg, setisOpensuccessmsg] = useState(false);
  const [isOpensuccessmsgw, setisOpensuccessmsgw] = useState(false);
  const [message, setmessage] = useState('');
  const [warmessage, setwarmessage] = useState('');
  const [order, setorder] = useState("ASC");
  const [isOpen, setisOpen] = useState(false);
  const [m_TransactionSeq, setmodelseq] = useState('');
  const [m_ServerTime, setm_ServerTime] = useState('');
  const [m_KICCSerial, setm_KICCSerial] = useState('');
  const [m_TID, setm_TID] = useState('');
  const [m_TotalCost, setm_TotalCost] = useState('');
  const [m_Reseller, setm_Reseller] = useState('');
  const [m_Cardname, setm_Cardname] = useState('');
  const [m_Approvalcode, setm_Approvalcode] = useState('');
  const [m_JobType, setm_JobType] = useState('');
  const [m_Totalpage, setm_Totalpage] = useState('');
  const [m_Paymode, setm_Paymode] = useState('');
  const [m_Cardnum, setm_Cardnum] = useState('');
  const [m_Color, setm_Color] = useState('');
  const [m_customerseq, setm_customerseq] = useState('');
  const [LocationListData, setLocationList] = useState([]);
  const [resellerListData, setResellerList] = useState([]);
  const [CustomerListData, setCustomerList] = useState([]);
  const headerss = [(data)];
  //Pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const title = [
    { label: "Payment Date", key: "paydate" },
    { label: "Partner", key: "reseller" },
    { label: "Customer", key: "customer" },
    { label: "TID", key: "tid" },
    { label: "	Location", key: "location" },
    { label: "Payment Method", key: "paymode" },
    { label: "Credit card company", key: "cardname" },
    { label: "Credit number", key: "cardnum" },
    { label: " Approval number", key: "approvalcode" },
    { label: " Amount of Payment ", key: "paycost" },
    { label: "Paper Size", key: "papersize" },
    { label: "Long live", key: "totalpage" },
    { label: "Amount Paper Case", key: "totalcost" },
    { label: "Print", key: "printjob" },
    { label: "Copy", key: "copyjob" },
    { label: "Scan", key: "scanjob" },
    { label: "Fax", key: "faxjob" },
    { label: "Gray-scale", key: "monojob" },
    { label: "Color", key: "colorjob" },
    { label: "Caller ID", key: "sendfaxnum" },
    { label: "Result", key: "faxresult" }
  ];
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
  const showhideMODAL = () => {
    setisOpensuccessmsg(false);
    setisOpen(false);
  }

  const showhideMODALw = () => {
    setisOpensuccessmsgw(false);
  }

  //search
  async function searchData(ResellerId, CustomerId, FromDate, Todate, Location, val) {
    // console.log(reseller_id);
    // console.log(CustomerId);
    // console.log(startDates);
    // console.log(endDates);
    if (val === 1) {
      setcurrentPage(1);
    }

    if (CustomerId === '') {
      var customerids = -2
    } else {
      var customerids = CustomerId
    }
    if (Location === 'Location' || Location === '위치') {
      Location = ''
    }
    await axios.post(URL + "/GetTransactionListDetail", {
      reseller_id: ResellerId,
      customer_id: customerids,
      fromdate: FromDate,
      todate: Todate,
      location: Location
    }, Header).then((response) => {
      setData(response.data.data);
    })
  }

  const searchpayday = (e) => {
    e.preventDefault();
    searchData(selectpartner, selectcustomer, startDates, endDates, selectlocation, 1)
  }

  //GetTransactionListDetail
  async function GetTransactionListDetail() {
    if (customerseq === -1) {
      var customerid = -2
    } else {
      var customerid = customerseq
    }
    await axios.post(URL + "/GetTransactionListDetail", {
      reseller_id: reseller_id,
      customer_id: customerid,
      fromdate: startDates,
      todate: endDates,
      location: ''
    }, Header).then((response) => {
      setData(response.data.data);
    })
  }

  //GetResellerList
  async function GetResellerList() {
    axios
      .post(URL + "/GetResellerList", { resellerid: '', }, Header)
      .then((response) => {
        setResellerList(response.data.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //customer list on reseller id
  const getCustomerRecord = (e) => {
    if (e.target.value === '') {
      setselectcustomer('')
      setSelectlocation('')
      setLocationList([])
    }
    setselectpartner(e.target.value)
    axios.post(URL + "/GetCustomerList", {
      resellerid: e.target.value, customerid: '-1'
    }, Header).then((response) => {
      setCustomerList(response.data.data);
    })
  }

  //location list on customer id
  const getloctaionRecord = (e) => {
    if (e.target.value === '') {
      setselectcustomer('')
      setSelectlocation('')
      setLocationList([])
    }
    setselectcustomer(e.target.value)
    axios.post(URL + "/GetLocationList", {
      customerid: e.target.value,
    }, Header).then((response) => {
      setLocationList(response.data.data);
    })
  }

  const getCustomerRecords = (e) => {
    setm_Reseller(e.target.value)
    axios.post(URL + "/GetCustomerList", {
      resellerid: e.target.value, customerid: '-1'
    }, Header).then((response) => {
      setCustomerList(response.data.data);
    })
  }

  function openRegistrationmodal(resource) {
    console.log(resource.mseq)
    setmodelseq(resource.mseq)
    setm_Reseller(resource.mreseller)
    axios.post(URL + "/GetTransactionInfo", {
      seq: resource.mseq
    }, Header).then((response) => {
      var obj = response.data.data
      setm_ServerTime(obj.servertime)
      setm_KICCSerial(obj.kiccserial)
      setm_TID(obj.tid)
      setm_TotalCost(obj.totalcost + ' 원')
      setm_Reseller(obj.resellerid)
      setm_Cardname(obj.r13)
      setm_Approvalcode(obj.r09)
      setm_JobType(obj.jobtype)
      setm_Totalpage(obj.totalpage)
      setm_Paymode(obj.paymode)
      setm_Cardnum(obj.r23)
      setm_Color(obj.color)
      setm_customerseq(obj.customerseq)
    })
    axios.post(URL + "/GetCustomerList", {
      resellerid: resource.mreseller, customerid: '-1'
    }, Header).then((response) => {
      setCustomerList(response.data.data);
      setisOpen(true)
    })
  }

  const closeModal = () => {
    setisOpen(false)
  };

  const savetrans = (e) => {
    e.preventDefault();
    axios
      .post(URL + "/SetTransaction", { seq: m_TransactionSeq, kiccserial: m_KICCSerial, tid: m_TID, resellerid: m_Reseller, customerseq: m_customerseq }, Header)
      .then((response) => {
        if (response.data.success === true) {
          setisOpensuccessmsg(true);
          setmessage("Succeed");
          searchData(selectpartner, selectcustomer, startDates, endDates, selectlocation, 2)
          //GetTransactionListDetail()
        }
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  useEffect(() => {
    GetTransactionListDetail()
    GetResellerList()
  }, [])

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
        col === 'tid' || col === 'approvalcode' || col === 'paycost' || col === 'papersize' || col === 'totalpage' || col === 'totalcost' || col === 'printjob' || col === 'copyjob' || col === 'scanjob' || col === 'faxjob' || col === 'monojob' || col === 'colorjob' || col === 'sendfaxnum' || col === 'faxresult' ?
          parseInt(a[col]) > parseInt(b[col]) ? 1 : -1
          :
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((b, a) =>
        col === 'tid' || col === 'approvalcode' || col === 'paycost' || col === 'papersize' || col === 'totalpage' || col === 'totalcost' || col === 'printjob' || col === 'copyjob' || col === 'scanjob' || col === 'faxjob' || col === 'monojob' || col === 'colorjob' || col === 'sendfaxnum' || col === 'faxresult' ?
          parseInt(a[col]) > parseInt(b[col]) ? 1 : -1
          :
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
              <h6 className="font-weight-bolder mb-0">{t('DetailsByCase')}</h6>
            </nav>
          </div>
        </nav>
        <div className="container-fluid pt-1 py-4 px-0">
          <div className="row">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card p-2 px-4">
                <form className="information_form">
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
                        <select className="selectpicker classNameic form-select select_options align-left" onChange={getCustomerRecord} id='selectreseller' data-live-search="true">
                          <option value="">{t('Partner')}</option>
                          {resellerListData.map((item, i) => {
                            return <option key={i} value={item.resellerid}>{item.displayname}</option>
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <select className="classic form-select select_options align-left padingtop" id='selectcustomer' onChange={getloctaionRecord}>
                          <option value="">{t('Customer')}</option>
                          {
                            CustomerListData.map((item, i) =>
                              <option key={i} value={item.seq}>{item.display_name}</option>
                            )
                          }
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <select className="classic form-select select_options align-left padingtop" onChange={(e) => { setSelectlocation(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text) }} >
                          <option value="">{t('Location')}</option>
                          {LocationListData.map((items, i) => {
                            return <option key={i} value={items.seq}>{items.displayname}</option>
                          })}
                        </select>
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
                        <div>
                          <div id="datatable_wrapper" className="information_dataTables dataTables_wrapper dt-bootstrap4 table-responsive">
                            <div className="d-flex exportPopupBtn">
                              <CSVLink headers={title} data={data} filename="AdminDetailsByCase.csv">
                                <button className="btn button btn-info mx-2" >{t('Export')}</button>
                              </CSVLink>
                            </div>
                            <table className="display table-bordered dataTable no-footer mt-6">
                              <thead>
                                <tr role="row">
                                  <th onClick={() => sorting("paydate")} className="text-center sorting_asc tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-sort="ascending" aria-label="Order: activate to sort column descending"><span className="">{t('PaymentDate')}</span></th>
                                  <th onClick={() => sorting("reseller")} className="text-center sorting_asc tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-sort="ascending" aria-label="Order: activate to sort column descending"><span className="">{t('Partner')}</span></th>
                                  <th onClick={() => sorting("customer")} className="text-center sorting_asc tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-sort="ascending" aria-label="Order: activate to sort column descending"><span className="">{t('Customer')}</span></th>
                                  <th onClick={() => sorting("tid")} className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('TID')}</span></th>
                                  <th onClick={() => sorting("location")} className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('Location')}</span></th>
                                  <th onClick={() => sorting("paymode")} className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('PaymentMethod')}</span></th>
                                  <th onClick={() => sorting("cardname")} className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('CreditCardCompany')}</span></th>
                                  <th onClick={() => sorting("cardnum")} className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('CreditNumber')}</span></th>
                                  <th onClick={() => sorting("approvalcode")} className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('ApprovalNumber')}</span></th>
                                  <th onClick={() => sorting("paycost")} className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('AmountOfPayment')}</span></th>
                                  <th onClick={() => sorting("papersize")} className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('PaperSize')}</span></th>
                                  <th onClick={() => sorting("totalpage")} className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('LongLive')}</span></th>
                                  <th onClick={() => sorting("totalcost")} className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('AmountPaperCase')}</span></th>
                                  <th className="text-center" colSpan="4" rowSpan="1">{t('AmountByTypeOfWork')}</th>
                                  <th className="text-center" colSpan="2" rowSpan="1">{t('AmountOfColor')}</th>
                                  <th className="text-center" colSpan="2" rowSpan="1">{t('FaxInformation')}</th>
                                </tr>
                                <tr role="row">
                                  <th onClick={() => sorting("printjob")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Print&amp;nbsp;Total: activate to sort column ascending">{t('Print')}</th>
                                  <th onClick={() => sorting("copyjob")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Color: activate to sort column ascending">{t('Copy')}</th>
                                  <th onClick={() => sorting("scanjob")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Mono: activate to sort column ascending">{t('Scan')}</th>
                                  <th onClick={() => sorting("faxjob")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('Fax')}</th>
                                  <th onClick={() => sorting("monojob")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Mono: activate to sort column ascending">{t('GrayScale')}</th>
                                  <th onClick={() => sorting("colorjob")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('Color')}</th>
                                  <th onClick={() => sorting("sendfaxnum")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Mono: activate to sort column ascending">{t('CallerID')}</th>
                                  <th onClick={() => sorting("faxresult")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('Result')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentItems.length > 0 ? currentItems.map((item, i) => {
                                  return <tr key={i} onClick={() => openRegistrationmodal({ mseq: item.seq, mreseller: item.resellerid })} >
                                    <td>{item.paydate}</td>
                                    <td>{item.reseller}</td>
                                    <td>{item.customer}</td>
                                    <td>{item.tid}</td>
                                    <td>{item.location}</td>
                                    <td>{item.paymode}</td>
                                    <td>{item.cardname}</td>
                                    <td>{item.cardnum}</td>
                                    <td>{item.approvalcode}</td>
                                    <td>{item.paycost}</td>
                                    <td>{item.papersize}</td>
                                    <td>{item.totalpage}</td>
                                    <td>{item.totalcost}</td>
                                    <td>{item.printjob}</td>
                                    <td>{item.copyjob}</td>
                                    <td>{item.scanjob}</td>
                                    <td>{item.faxjob}</td>
                                    <td>{item.monojob}</td>
                                    <td>{item.colorjob}</td>
                                    <td>{item.sendfaxnum}</td>
                                    <td>{item.faxresult}</td>
                                  </tr>
                                }) : <tr className="odd"><td valign="top" colSpan="21" className="dataTables_empty">{t('NoDataAvailable')}</td></tr>}
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
                                <h4 className="modal-title">{t('EditPaymentInformation')}</h4>
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
                                        <div className='col-md-4'><span>{t('PaymentDate')}</span></div>
                                        <div className='col-md-8'><span className='paymentdate'>{m_ServerTime}</span></div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('Partner')}</span></div>
                                        <div className='col-md-8'>
                                          <select className="form-select" onChange={getCustomerRecords} id='selectreseller' data-live-search="true" value={m_Reseller}>
                                            <option value="">{t('Partner')}</option>
                                            {resellerListData.map((item, i) => {
                                              return <option key={i} value={item.resellerid}>{item.displayname}</option>
                                            })}
                                          </select>
                                        </div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('Customer')}</span></div>
                                        <div className='col-md-8'>
                                          <select className="form-select" id='selectcustomer' onChange={(e) => { setm_customerseq(e.target.value) }} value={m_customerseq}>
                                            <option value="">{t('Customer')}</option>
                                            {
                                              CustomerListData.map((item, i) =>
                                                <option key={i} value={item.seq}>{item.display_name}</option>
                                              )
                                            }
                                          </select>
                                        </div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('SerialNumber')}</span></div>
                                        <div className='col-md-8'>
                                          <input type="text" className='form-control' onChange={(e) => { setm_KICCSerial(e.target.value) }} defaultValue={m_KICCSerial} />
                                        </div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('TID')}</span></div>
                                        <div className='col-md-8'>
                                          <input type="text" className='form-control' onChange={(e) => { setm_TID(e.target.value) }} defaultValue={m_TID} />
                                        </div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('PaymentMethod')}</span></div>
                                        <div className='col-md-8'><span className='tid'>
                                          {(m_Paymode == 1) ? '신용카드' : ''}
                                          {(m_Paymode == 2) ? '티머니' : ''}
                                          {(m_Paymode == 3) ? '캐시비' : ''}
                                          {(m_Paymode == 4) ? '회원카드' : ''}
                                        </span></div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('Amount')}</span></div>
                                        <div className='col-md-8'><span className='tid'>{m_TotalCost}</span></div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('CreditCardCompany')}</span></div>
                                        <div className='col-md-8'><span className='tid'>{m_Cardname}</span></div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('CreditNumber')}</span></div>
                                        <div className='col-md-8'><span className='tid'>{m_Cardnum}</span></div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('ApprovalNumber')}</span></div>
                                        <div className='col-md-8'><span className='tid'>{m_Approvalcode}</span></div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('WorkType')}</span></div>
                                        <div className='col-md-8'><span className='tid'>{m_JobType}</span></div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('Color')}</span></div>
                                        <div className='col-md-8'><span className='tid'>
                                          {
                                            (m_Color > 0) ? '컬러' : '흑백'

                                          }
                                        </span></div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('LongLive')}</span></div>
                                        <div className='col-md-8'><span className='tid'>{m_Totalpage}</span></div>
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
export default Details_by_case;