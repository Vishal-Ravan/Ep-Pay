import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";
import { CSVLink } from "react-csv";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { URL } from "../URL/url";
import { Header } from "../Header/headers";
import { useTranslation } from 'react-i18next';
function Customerprinter() {
  const [data, setData] = useState([]);
  const [datac, setDatasc] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [datas, setDatas] = useState([]);
  const [datal, setDatal] = useState([]);
  const [selectreseller, setSelectreseller] = useState('');
  const [selectcustomer, setSelectcustomer] = useState('');
  const [selectlocation, setSelectlocation] = useState('');
  const [modelSeq, setmodelSeq] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [order, setorder] = useState("ASC");
  const title = [
    { label: "TID", key: "tid" },
    { label: "Location", key: "locationname" },
    { label: "Serial No.", key: "printerserial" },
    { label: "Model Name", key: "printermodel" },
    { label: "Black", key: "black" },
    { label: "Yellow", key: "yellow" },
    { label: " Blue", key: "cyan" },
    { label: "Red", key: "magenta" },
    { label: "Recent update", key: "lastupdate" }

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
  //GetPrinterStatus
  async function GetPrinterStatus() {

    await axios.post(URL + "/GetPrinterStatus", {
      reseller_id: reseller_id,
      customer_id: customerseq,
      fromdate: startDates,
      todate: endDates,

    }, Header).then((response) => {
      setData(response.data.data);
    })
  }

  const searchprinter = (e) => {
    e.preventDefault();

    setSelectcustomer(e.target.value)
    //console.log(startDate);       


    axios.post(URL + "/GetPrinterStatus", {
      reseller_id: reseller_id,
      customer_id: customerseq,
      fromdate: startDates,
      todate: endDates

    }, Header).then((response) => {
      //console.log(response)
      setData(response.data.data);


    })
  };

  useEffect(() => {
    GetPrinterStatus()

  }, []);


  async function openModal(resource) {


    setmodelSeq(resource.mseq);
    await axios.post(URL + "/GetConsumInfo", { seq: resource.mseq, }, Header)
      .then((response) => {
        setDatasc(response.data.data);
        console.log(response)
        setisOpen(true)


      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })

  };
  const closeModal = () => {
    setisOpen(false)

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

  //sorting
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        col === 'black' || col === 'cyan' || col === 'magenta' || col === 'yellow' ?
          parseInt(a[col]) > parseInt(b[col]) ? 1 : -1
          :
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((b, a) =>
        col === 'black' || col === 'cyan' || col === 'magenta' || col === 'yellow' ?
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
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:void(0);">{t('Home')}</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{t('Management')}</li>
              </ol>
              <h6 className="font-weight-bolder mb-0">{t('PrinterSuppliesRemaining')}</h6>
            </nav>

          </div>
        </nav>

        <div className="container-fluid pt-1 py-4 px-0">
          <div className="row">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card p-2 px-4">
                <form className="information_form" onSubmit={(e) => e.preventDefault()}>
                  <div className="row">
                    <div className="col-md-2">
                      <label className="input_label_padding_top">{t('SearchPeriod')}:</label>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <DatePicker className='form-control' selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" />
                      </div>
                    </div>
                    <div className="col-md-1">
                      <div className="text-center text-bold"><span className="calenderDate">~</span></div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <DatePicker className='form-control' selected={endDate} onChange={(date) => setEndDate(date)} dateFormat="yyyy-MM-dd" />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <button className="btn btn-outline-success allBtnsize" onClick={searchprinter}>{t('Search')}</button>
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
                              <CSVLink headers={title} data={data} filename="CustomerPrinterList.csv">
                                <button className="btn btn-info">Export</button>
                              </CSVLink>
                            </div>
                            <table className="display table-bordered dataTable no-footer mt-6">
                              <thead>
                                <tr role="row">
                                  {/* <th>Customer</th> */}
                                  <th onClick={() => sorting("tid")} className="text-center sorting">{t('TID')}</th>
                                  <th onClick={() => sorting("locationname")} className="text-center sorting">{t('Location')}</th>
                                  <th onClick={() => sorting("printerserial")} className="text-center sorting">{t('SerialNo')}</th>
                                  <th onClick={() => sorting("printermodel")} className="text-center sorting">{t('ModelName')} </th>
                                  {/* <th onClick={() => sorting("black")} className="text-center sorting">{t('App version')} </th> */}
                                  <th onClick={() => sorting("black")} className="text-center sorting"><span className="text-dark"><i className="fa fa-tint" aria-hidden="true"></i> {t('Black')}</span></th>
                                  <th onClick={() => sorting("yellow")} className="text-center sorting"><span className="text-warning"><i className="fa fa-tint" aria-hidden="true"></i> {t('Yellow')}</span></th>
                                  <th onClick={() => sorting("cyan")} className="text-center sorting"><span className="text-info"><i className="fa fa-tint" aria-hidden="true"></i> {t('Blue')}</span></th>
                                  <th onClick={() => sorting("magenta")} className="text-center sorting"><span className="text-danger"><i className="fa fa-tint" aria-hidden="true"></i> {t('Red')}</span></th>
                                  <th onClick={() => sorting("lastupdate")} className="text-center sorting">{t('RecentUpdate')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentItems.length > 0 ? currentItems.map((item, i) => {
                                  return <tr key={i} onClick={() => openModal({ mseq: item.seq })} className="odd show-modal">
                                    {/* <td>{item.customername}</td>   */}
                                    <td>{item.tid}</td>
                                    <td>{item.locationname}</td>
                                    <td>{item.printerserial}</td>
                                    <td>{item.printermodel}</td>
                                    <td>{item.black}%</td>
                                    <td>{item.yellow}%</td>
                                    <td>{item.cyan}%</td>
                                    <td>{item.magenta}%</td>
                                    <td>{item.lastupdate}</td>

                                  </tr>
                                }) : <tr className="odd"><td valign="top" colSpan="9" className="dataTables_empty">{t('NoDataAvailable')}</td></tr>}


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
                            {/* model */}
                            <Modal className='modal-box informationConsumables modalPopupCenter' show={isOpen}>
                              <Modal.Header>
                                <h4 className="modal-title">{t('MoreInformationonconsumables')}</h4>
                                <button type="button" className="btn-close" onClick={closeModal}>×</button>
                              </Modal.Header>
                              <Modal.Body>
                                <div className="formProgress">
                                  <div className="formtopcont">
                                    <p>{t('LoremIpsumisaplaceholdertextcommonlyused.')}</p>
                                  </div>
                                </div>
                                <div className="formBgcolor">

                                  <div className="formProgress manForm pt-2">
                                    <div className="widget box">
                                      <div className="widget-header">
                                        <h4>
                                          <i className="icon-reorder"></i>
                                          <span id="m_modelNserial">(KONICA MINOLTA bizhub C300i)</span>
                                        </h4>
                                      </div>
                                      <div className="widget-content">
                                        <table className="table table-border border">
                                          <thead>
                                            <tr>
                                              <th>{t('NameDescription')}</th>
                                              <th>{t('CurrentBalance')}</th>
                                              <th>{t('MaximumRemainingAmount')}</th>
                                            </tr>
                                          </thead>
                                          <tbody>

                                            {datac.map((items, c) => {
                                              return
                                              <tr key={c}>
                                                <td>{items.name}</td>
                                                <td>{items.curlevel}</td>
                                                <td>{items.maxlevel}</td>
                                              </tr>
                                            })}

                                          </tbody>
                                        </table>
                                      </div>
                                    </div>

                                  </div>
                                  <div className="formProgressBtn">
                                    <div className="row">
                                      <div className="col-md-5">
                                        <button type="button" className="btn btn-sm savepopupbtn" onClick={closeModal}>{t('Cancel')}</button>
                                      </div>
                                      <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">

                                      </div>
                                    </div>
                                  </div>

                                </div>

                              </Modal.Body>
                            </Modal>
                            {/* model */}


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
                <a href="javascript:void(0)" className="font-weight-bold" target="_blank">EP Pay</a> {t('AllRightsReserved')}.
              </div>
            </div>

          </div>
        </div>
      </footer>
    </main>

  );
}
export default Customerprinter;