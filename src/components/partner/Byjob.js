import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { CSVLink } from "react-csv";
import "react-datepicker/dist/react-datepicker.css";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { URL } from "../URL/url";
import { Header } from "../Header/headers";
import { useTranslation } from 'react-i18next';
function Byjob() {
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
  const [isOpen, setisOpen] = useState(false);
  const [datas, setDatas] = useState([]);
  const [datal, setDatal] = useState([]);
  const [selectreseller, setSelectreseller] = useState('');
  const [selectcustomer, setSelectcustomer] = useState('');
  const [selectlocation, setSelectlocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [order, setorder] = useState("ASC");
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
  const title = [
    { label: "Payment Date", key: "paydate" },
    { label: "Customer", key: "customer" },
    { label: "TID", key: "tid" },
    { label: "Location", key: "location" },
    { label: "Payment Method", key: "paymode" },
    { label: "Credit card company", key: "cardname" },
    { label: "Credit numbe", key: "cardnum" },
    { label: "Approval number", key: "approvalcode" },
    { label: "Amount of Payment", key: "paycost" },
    { label: "Paper Size", key: "papersize" },
    { label: "Long live", key: "totalpage" },
    { label: "Amount Paper Case", key: "totalcost" },
    { label: "Print", key: "printjob" },
    { label: "Copy", key: "copyjob" },
    { label: "Scan", key: "scanjob" },
    { label: "Fax", key: "faxjob" },
    { label: "Gray-scal", key: "monojob" },
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
  //console.log(years+'-' + months + '-'+dts);
  // date format
  const searchpayday = (e) => {
    e.preventDefault();

    setSelectcustomer(e.target.value)
    setcurrentPage(1);
    if (selectcustomer === '') {
      var customerids = -2
    } else {
      var customerids = selectcustomer
    }
    if (selectlocation === 'Location' || selectlocation === '위치') {
      var Location = ''
    } else {
      var Location = selectlocation
    }


    axios.post(URL + "/GetTransactionListDetail", {
      reseller_id: reseller_id,
      customer_id: customerids,
      fromdate: startDates,
      todate: endDates,
      location: Location,
    }, Header).then((response) => {
      console.log(response)
      setData(response.data.data);


    })
  };
  const getLocationRecord = (e) => {
    //alert(e.target.value);
    //console.log(e);
    setSelectcustomer(e.target.value)



    axios.post(URL + "/GetLocationList", {

      customerid: e.target.value,

    }, Header).then((response) => {
      //console.log(response)
      setDatal(response.data.data);


    })


  };
  //GetTransactionListDetail
  async function GetTransactionListDetail() {
    await axios.post(URL + "/GetTransactionListDetail", {
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
    GetTransactionListDetail()
    GetCustomerList()
  }, []);
  function openModal(resource) {

    setisOpen(true)


  };
  const closeModal = () => {
    setisOpen(false)
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
          className={currentPage === number ? "active" : null}
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

    if ((currentPage - 1) % pageNumberLimit === 0) {
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


      <div className="container-fluid">
        <nav className="navbar navbar-main navbar-expand-lg px-0 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
          <div className="container-fluid py-1 px-0">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">{t('Home')}</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{t('Management')}</li>
              </ol>
              <h6 className="font-weight-bolder mb-0">{t('DetailsByPeriod')}</h6>
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
                        {/* <input type="date" name="data"  className="form-control" placeholder="dd/mm/yy"/>                         */}
                        <DatePicker className='form-control' selected={endDate} onChange={(date) => setEndDate(date)} dateFormat="yyyy-MM-dd" />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-2">
                      <label className="input_label_padding_top">{t('Search')}</label>
                    </div>
                    {/* <div className="col-md-2">
                      <div className="input-group">
                        
                        <select className="classNameic form-select select_options align-left padingtop" onChange={(e)=>{setSelectreseller(e.target.value)}} disabled>
                            <option value={reseller_id}>{display_name}</option>
                        </select>
                      </div>
                    </div> */}
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
                              <CSVLink headers={title} data={data} filename="PartnerDetalsByCaseList.csv">
                                <button className="btn btn-info">Export</button>
                              </CSVLink>
                            </div>
                            <table className="display table-bordered dataTable no-footer mt-6">
                              <thead>
                                <tr role="row">
                                  <th onClick={() => sorting("paydate")} className="text-center sorting_asc tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-sort="ascending" aria-label="Order: activate to sort column descending"><span className="">{t('Payment Date')}</span></th>
                                  <th onClick={() => sorting("customer")} className="text-center sorting_asc tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-sort="ascending" aria-label="Order: activate to sort column descending"><span className="">{t('Customer')}</span></th>
                                  <th onClick={() => sorting("tid")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('TID')}</span></th>
                                  <th onClick={() => sorting("location")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('Location')}</span></th>
                                  <th onClick={() => sorting("paymode")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('PaymentMethod')}</span></th>
                                  <th onClick={() => sorting("cardname")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('CreditCardCompany')}</span></th>
                                  <th onClick={() => sorting("cardnum")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('CreditNumber')}</span></th>
                                  <th onClick={() => sorting("approvalcode")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('ApprovalNumber')}</span></th>
                                  <th onClick={() => sorting("paycost")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('AmountOfPayment')}</span></th>
                                  <th onClick={() => sorting("papersize")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('PaperSize')}</span></th>
                                  <th onClick={() => sorting("totalpage")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('LongLive')}</span></th>
                                  <th onClick={() => sorting("totalcost")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('AmountPaperCase')}</span></th>

                                  <th className="text-center" colspan="4" rowspan="1">{t('AmountByTypeOfWork')}</th>
                                  <th className="text-center" colspan="2" rowspan="1">{t('AmountOfColor')}</th>
                                  <th className="text-center" colspan="2" rowspan="1">{t('FaxInformation')}</th>
                                </tr>
                                <tr role="row">
                                  <th onClick={() => sorting("printjob")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Print&amp;nbsp;Total: activate to sort column ascending">{t('Print')}</th>

                                  <th onClick={() => sorting("copyjob")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Color: activate to sort column ascending">{t('Copy')}</th>

                                  <th onClick={() => sorting("scanjob")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Mono: activate to sort column ascending">{t('Scan')}</th>
                                  <th onClick={() => sorting("faxjob")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('Fax')}</th>
                                  <th onClick={() => sorting("monojob")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Mono: activate to sort column ascending">{t('GrayScal')}</th>
                                  <th onClick={() => sorting("colorjob")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('Color')}</th>
                                  <th onClick={() => sorting("sendfaxnum")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Mono: activate to sort column ascending">{t('CallerID')}</th>
                                  <th onClick={() => sorting("faxresult")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('Result')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentItems.length > 0 ? currentItems.map((item, i) => {
                                  return <tr>
                                    <td>{item.paydate}</td>
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
                                }) : <tr class="odd"><td valign="top" colspan="20" class="dataTables_empty">{t('NoDataAvailable')}</td></tr>}


                              </tbody>
                            </table>
                            <div>
                              <ul className="pageNumbers">
                                <li>
                                  <button
                                    onClick={handlePrevbtn}
                                    disabled={currentPage === pages[0] ? true : false}
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
                                    disabled={currentPage === pages[pages.length - 1] ? true : false}
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
                                    <div className="formProgress manForm pt-2">
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('TID')}</span></div>
                                        <div className='col-md-8'><span className='tid'></span></div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('Customer')}</span></div>
                                        <div className='col-md-8'><span className='customer'></span></div>
                                      </div>
                                      <div className='row mb-3'>
                                        <div className='col-md-4'><span>{t('Serial No.')}</span></div>
                                        <div className='col-md-8'><span className='tid'></span></div>
                                      </div>
                                    </div>
                                    <div className="formProgressBtn">
                                      <div className="row">
                                        <div className="col-md-5">
                                          <button type="button" className="btn btn-sm" onClick={closeModal}>{t('Cancel')}</button>
                                        </div>
                                        <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                          <button type="submit" className="btn btn-sm savepopupbtn" >{t('Save')}</button>
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
export default Byjob;