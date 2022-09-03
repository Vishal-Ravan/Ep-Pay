import React, { useState, useEffect } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { URL } from "../URL/url";
import { Header } from "../Header/headers";
import { CSVLink } from "react-csv";
import { useTranslation } from 'react-i18next';
function Membership_card() {
  const [data, setData] = useState([]);
  const [copydata, setCopydata] = useState([]);
  const [ResellerListData, setResellerList] = useState([]);
  const [selectreseller, setSelectreseller] = useState('');
  const [selectcardnum, setSelectcardnum] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [order, setorder] = useState("ASC");
  const headerss = [(data)];
  //Pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const title = [
    { label: "Partner", key: "resellername" },
    { label: "Card number", key: "cardnum" },
    { label: "Card description", key: "description" },
    { label: "Charge", key: "topupcost" },
    { label: "	Use", key: "usagecost" },
    { label: "Balance", key: "afterbal" },
    { label: "Charge/Use Date", key: "lastupdate" },
    { label: "Payment Date", key: "paydate" },
    { label: " Customer", key: "customer" },
    { label: " TID ", key: "tid" },
    { label: "Location", key: "location" },
    { label: "Amount of Payment", key: "paycost" },
    { label: "Work type", key: "jobtype" },
    { label: "size", key: "papersize" },
    { label: "Color", key: "colortype" },
    { label: "Long live", key: "totalpage" }
  ];

  //language
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');
  let reseller_id = localStorage.getItem("reseller_id");
  let role = localStorage.getItem("role");
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
  const searchmfcard = (e) => {
    e.preventDefault();
    setcurrentPage(1)


    if (selectcardnum === '') {
      axios.post(URL + "/GetMFTransactionList", {
        reseller_id: selectreseller,
        cardnum: selectcardnum,
        fromdate: startDates,
        todate: endDates
      }, Header).then((response) => {
        setData(response.data.data);
        //setCopydata(response.data.data);
        console.log(response.data.data)
      })
    } else {

      var rec = [];
      axios.post(URL + "/GetMFTransactionList", {
        reseller_id: selectreseller,
        cardnum: '',
        fromdate: startDates,
        todate: endDates
      }, Header).then((response) => {
        //setData(response.data.data);
        console.log(selectcardnum);
        setCopydata(response.data.data);
        response.data.data.filter(item => item.cardnum != null ?

          item.cardnum.includes(selectcardnum.toString()) : '').map(items => (
            rec.push(items)
          ))
        console.log(rec)
        setData(rec)

        //console.log(response.data.data)
      })
    }


  }

  //GetMFTransactionList
  async function GetMFTransactionList() {
    await axios.post(URL + "/GetMFTransactionList", {
      reseller_id: reseller_id,
      cardnum: '',
      fromdate: startDates,
      todate: endDates,
      role: role
    }, Header).then((response) => {
      setData(response.data.data);
      //console.log(role);
    })
  }

  //GetResellerList
  async function GetResellerList() {
    await axios
      .post(URL + "/GetResellerList", { resellerid: '', }, Header)
      .then((response) => {
        setResellerList(response.data.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  useEffect(() => {
    GetMFTransactionList()
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
  })

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }
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
        col === 'topupcost' || col === 'usagecost' || col === 'afterbal' || col === 'paycost' || col === 'totalpage' ?
          parseInt(a[col]) > parseInt(b[col]) ? 1 : -1
          :
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((b, a) =>
        col === 'topupcost' || col === 'usagecost' || col === 'afterbal' || col === 'paycost' || col === 'totalpage' ?
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
      <div className="container-fluid">
        <nav className="navbar navbar-main navbar-expand-lg px-0 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
          <div className="container-fluid py-1 px-0">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">{t('Home')}</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{t('Management')}</li>
              </ol>
              <h6 className="font-weight-bolder mb-0">{t('MembershipCard')}</h6>
            </nav>
          </div>
        </nav>
        <div className="container-fluid pt-1 py-4 px-0">
          <div className="row">
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
                    <div className="col-md-3">
                      <div className="input-group">
                        <select className="classNameic form-select select_options align-left" onChange={(e) => { setSelectreseller(e.target.value) }} disabled="">
                          <option value="">{t('Partner')}</option>
                          {ResellerListData.map((item, i) => {
                            return <option key={i} value={item.resellerid}>{item.displayname}</option>
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <input type="text" name="" onChange={(e) => { setSelectcardnum(e.target.value) }} className="form-control" placeholder={t('CardNumber')} />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <button type="button" className="btn btn-outline-success allBtnsize" onClick={searchmfcard}>{t('Search')}</button>
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
                              {/* <a href="#!" className="btn button btn-info">Export</a> */}
                              <CSVLink headers={title} data={data} filename="AdminMemberShipCard.csv">
                                <button className="btn button btn-info mx-2" >{t('Export')}</button>
                              </CSVLink>
                            </div>
                            <table className="display table-bordered dataTable no-footer mt-6">
                              <thead>
                                <tr role="row">
                                  <th onClick={() => sorting("resellername")} className="text-center sorting_asc tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-sort="ascending" aria-label="Order: activate to sort column descending"><span className="">{t('Partner')}</span></th>
                                  <th onClick={() => sorting("cardnum")} className="text-center sorting_asc tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-sort="ascending" aria-label="Order: activate to sort column descending"><span className="">{t('CardNumber')}</span></th>
                                  <th onClick={() => sorting("description")} className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('CardDescription')}</span></th>
                                  <th onClick={() => sorting("topupcost")} className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('Charge')}</span></th>
                                  <th onClick={() => sorting("usagecost")} className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('Use')}</span></th>
                                  <th onClick={() => sorting("afterbal")} className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('Balance')}</span></th>
                                  <th onClick={() => sorting("lastupdate")} className="text-center sorting tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('ChargeUseDate')}</span></th>
                                  <th className="text-center" colSpan="9" rowSpan="1">{t('UsageHistory')}</th>
                                </tr>
                                <tr role="row">
                                  <th onClick={() => sorting("paydate")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Print&amp;nbsp;Total: activate to sort column ascending">{t('PaymentDate')}</th>
                                  <th onClick={() => sorting("customer")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Color: activate to sort column ascending">{t('Customer')}</th>
                                  <th onClick={() => sorting("tid")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Mono: activate to sort column ascending">{t('TID')}</th>
                                  <th onClick={() => sorting("location")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('Location')}</th>
                                  <th onClick={() => sorting("paycost")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Mono: activate to sort column ascending">{t('AmountOfPayment')}</th>
                                  <th onClick={() => sorting("jobtype")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('WorkType')}</th>
                                  <th onClick={() => sorting("papersize")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Mono: activate to sort column ascending">{t('Size')}</th>
                                  <th onClick={() => sorting("colortype")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('Color')}</th>
                                  <th onClick={() => sorting("totalpage")} className="text-center sorting" tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('LongLive')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentItems.length > 0 ? currentItems.map((item, i) => {
                                  return <tr key={i}>
                                    <td>{item.resellername}</td>
                                    <td>{item.cardnum}</td>
                                    <td>{item.description}</td>
                                    <td>{item.topupcost}</td>
                                    <td>{item.usagecost}</td>
                                    <td>{item.afterbal}</td>
                                    <td>{item.lastupdate}</td>
                                    <td>{item.paydate !== '' ? item.paydate : '0'}</td>
                                    <td>{item.paydate !== '' ? item.customer : '0'}</td>
                                    <td>{item.paydate !== '' ? item.tid : '0'}</td>
                                    <td>{item.paydate !== '' ? item.location : '0'}</td>
                                    <td>{item.paydate !== '' ? item.paycost : 0}</td>
                                    <td>{item.paydate !== '' ? item.jobtype : '0'}</td>
                                    <td>{item.paydate !== '' ? item.papersize : '0'}</td>
                                    <td>{item.paydate !== '' ? item.colortype : '0'}</td>
                                    <td>{item.paydate !== '' ? item.totalpage : 0}</td>
                                  </tr>
                                }) : <tr className="odd"><td valign="top" colSpan="16" className="dataTables_empty">{t('NoDataAvailable')}</td></tr>}
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
export default Membership_card;