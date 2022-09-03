import React, { useState, useEffect } from 'react';
import axios from "axios";
import { CSVLink } from "react-csv";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { URL } from "../URL/url";
import { Header } from "../Header/headers";
import { useTranslation } from 'react-i18next';
function Bydate() {
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
  const [datas, setDatas] = useState([]);
  const [datal, setDatal] = useState([]);

  const [selectreseller, setSelectreseller] = useState('');
  const [selectcustomer, setSelectcustomer] = useState('');
  const [selectlocation, setSelectlocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [order, setorder] = useState("ASC");
  const title = [
    { label: "Transaction Date", key: "paydate" },
    { label: "Customer", key: "customer" },
    { label: "TID", key: "tid" },
    { label: "Location", key: "location" },
    { label: "Number Of Payments", key: "paynumber" },
    { label: "Print", key: "printcost" },
    { label: "Copy", key: "copycost" },
    { label: "Scan", key: "scancost" },
    { label: "Fax", key: "faxcost" },
    { label: "Total", key: "totalcost" },
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
  //console.log(years+'-' + months + '-'+dts);
  // date format

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
  //search
  const searchpayday = (e) => {
    //alert(startDates);
    e.preventDefault();

    setSelectcustomer(e.target.value)
    console.log(selectlocation);
    setcurrentPage(1);
    if (selectcustomer === '') {
      var customerId = '-2'
    } else {
      var customerId = selectcustomer
    }
    if (selectlocation === 'Location' || selectlocation === '위치') {
      var locationValue = '';
    } else {
      var locationValue = selectlocation;
    }
    axios.post(URL + "/GetTransactionListByDay", {
      reseller_id: reseller_id,
      customer_id: customerId,
      fromdate: startDates,
      todate: endDates,
      location: locationValue,
    }, Header).then((response) => {
      console.log(response)
      setData(response.data.data);


    })
  };
  //get location
  const getLocationRecord = (e) => {
    console.log(e.target.value);
    setSelectcustomer(e.target.value)
    axios.post(URL + "/GetLocationList", {
      customerid: e.target.value,
    }, Header).then((response) => {
      //console.log(response)
      setDatal(response.data.data);


    })


  };
  // GetTransactionListByDay
  async function GetTransactionListByDay() {
    console.log(reseller_id)
    console.log(customerseq)
    console.log(startDates)
    console.log(endDates)
    await axios.post(URL + "/GetTransactionListByDay", {
      reseller_id: reseller_id,
      customer_id: customerseq,
      fromdate: startDates,
      todate: endDates,
      location: '',
    }, Header).then((response) => {
      console.log(response)
      setData(response.data.data);


    })
  }
  //GetCustomerList
  async function GetCustomerList() {
    await axios
      .post(URL + "/GetCustomerList", { role: role, resellerid: reseller_id, customerid: customerseq, }, Header)

      .then((response) => {

        setDatas(response.data.data);
        //console.log(response)


      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }
  useEffect(() => {
    GetTransactionListByDay()
    GetCustomerList()

  }, []);
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
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        col === 'paynumber' || col === 'printcost' || col === 'totalcost' ?
          parseInt(a[col]) > parseInt(b[col]) ? 1 : -1
          :
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("DSC");

    }
    if (order === "DSC") {
      const sorted = [...data].sort((b, a) =>
        col === 'paynumber' || col === 'printcost' || col === 'totalcost' ?
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
              <h6 className="font-weight-bolder mb-0">{t('SalesInformationByDate')}</h6>
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
                        {/* <input type="date" name="data"  className="form-control" placeholder="dd/mm/yy"/> */}
                        <DatePicker className='form-control' selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        {/* <input type="date" name="data"  className="form-control padingtop" placeholder="dd/mm/yy"/>                         */}
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
                        <select className="classNameic form-select select_options align-left padingtop" id='selectcustomer' onChange={getLocationRecord}>
                          <option value="">{t('Customer')}</option>
                          {datas.map(items => {
                            return <option value={items.seq}>{items.display_name}</option>
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <select className="classNameic form-select select_options align-left padingtop" onChange={(e) => { setSelectlocation(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text) }}>
                          <option value="">{t('Location')}</option>
                          {datal.map(items => {
                            return <option value={items.seq}>{items.displayname}</option>
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
                              {/* <a href="#!" className="btn button btn-info">Export</a> */}
                              <CSVLink headers={title} data={data} filename="PartnerByDateList.csv">
                                <button className="btn btn-info">Export</button>
                              </CSVLink>

                            </div>
                            <table className="display table-bordered dataTable no-footer mt-6">
                              <thead>
                                <tr role="row">
                                  <th className="text-center sorting_asc tabletextalignment" rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-sort="ascending" aria-label="Order: activate to sort column descending"><span className="">{t('TransactionDate')}</span></th>
                                  <th className="text-center sorting_asc tabletextalignment" onClick={() => sorting("customer")} rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-sort="ascending" aria-label="Order: activate to sort column descending"><span className="">{t('Client')}</span></th>
                                  <th className="text-center sorting tabletextalignment" onClick={() => sorting("tid")} rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('TID')}</span></th>
                                  <th className="text-center sorting tabletextalignment" onClick={() => sorting("location")} rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('Location')}</span></th>
                                  <th className="text-center sorting tabletextalignment" onClick={() => sorting("paynumber")} rowSpan="2" tabIndex="0" aria-controls="list-dt" colSpan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('NumberOfPayments')}</span></th>

                                  <th className="text-center" colSpan="5" rowSpan="1">{t('AmountOfPayment')}</th>
                                </tr>
                                <tr role="row">
                                  <th className="text-center sorting" onClick={() => sorting("printcost")} tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Print&amp;nbsp;Total: activate to sort column ascending">{t('Print')}</th>

                                  <th className="text-center sorting" onClick={() => sorting("copycost")} tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Color: activate to sort column ascending">{t('Copy')}</th>

                                  <th className="text-center sorting" onClick={() => sorting("scancost")} tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Mono: activate to sort column ascending">{t('Scan')}</th>
                                  <th className="text-center sorting" onClick={() => sorting("faxcost")} tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('Fax')}</th>
                                  <th className="text-center sorting" onClick={() => sorting("totalcost")} tabIndex="0" aria-controls="list-dt" rowSpan="1" colSpan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('Total')}</th>

                                </tr>
                              </thead>
                              <tbody>
                                {currentItems.length > 0 ? currentItems.map((item, i) => {
                                  return <tr>
                                    <td>{item.paydate}</td>
                                    <td>{item.customer}</td>
                                    <td>{item.tid}</td>
                                    <td>{item.location}</td>
                                    <td>{item.paynumber}</td>
                                    <td>{item.printcost}</td>

                                    <td>{item.copycost}</td>
                                    <td>{item.scancost}</td>
                                    <td>{item.faxcost}</td>
                                    <td>{item.totalcost}</td>


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
export default Bydate;