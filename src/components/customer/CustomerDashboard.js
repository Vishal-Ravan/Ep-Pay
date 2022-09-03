import React, { useState, useEffect } from 'react';
import axios from "axios";
import { URL } from "../URL/url";
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE
import 'zingchart/modules-es6/zingchart-depth.min.js';
//import { CanvasJSChart } from 'canvasjs-react-charts'

function CustomerDashboard() {
  const [customerData, setCustomerData] = useState({});
  const [customerGraph1Data, setCustomerGraph1Data] = useState(null);
  const [customerGraph2Data, setCustomerGraph2Data] = useState(null);
  const [customerGraph3Data, setCustomerGraph3Data] = useState(null);
  const [customerGraph4Data, setCustomerGraph4Data] = useState(null);
  const [customerGraph5Data, setCustomerGraph5Data] = useState(null);
  const [customerGraph6Data, setCustomerGraph6Data] = useState(null);
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');
  let customerseq = localStorage.getItem("customerseq");

  //customer data
  async function customer_dashboard() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    await axios.post(URL + "/customer_dashboard", { customerseq: customerseq }, headers)
      .then((response) => {
        setCustomerData(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //customer graph1
  async function customer_graph1() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    await axios
      .post(URL + "/customer_graph1", { customerseq: customerseq }, headers)
      .then((response) => {
        setCustomerGraph1Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //customer graph2
  async function customer_graph2() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    await axios
      .post(URL + "/customer_graph2", { customerseq: customerseq }, headers)
      .then((response) => {
        setCustomerGraph2Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //customer graph3
  async function customer_graph3() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    await axios
      .post(URL + "/customer_graph3", { customerseq: customerseq }, headers)
      .then((response) => {
        setCustomerGraph3Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //customer graph4
  async function customer_graph4() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    await axios
      .post(URL + "/customer_graph4", { customerseq: customerseq }, headers)
      .then((response) => {
        setCustomerGraph4Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //customer graph5
  async function customer_graph5() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    await axios
      .post(URL + "/customer_graph5", { customerseq: customerseq }, headers)
      .then((response) => {
        setCustomerGraph5Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //customer graph6
  async function customer_graph6() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    await axios
      .post(URL + "/customer_graph6", { customerseq: customerseq }, headers)
      .then((response) => {
        setCustomerGraph6Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  useEffect(() => {
    customer_dashboard()
    customer_graph1()
    customer_graph2()
    customer_graph3()
    customer_graph4()
    customer_graph5()
    customer_graph6()

  }, []);

  //graph1
  const databar = []
  if (customerGraph1Data != null) {
    customerGraph1Data.garph1.forEach(element => {
      databar.push({
        name: element.month_name,
        pv: element.value
      },
      )
    });
  }

  //graph2
  var myDataline = {}
  if (customerGraph2Data != null) {
    myDataline = {
      "type": "line",
      "utc": true,
      "title": {
        "text": "",
        "font-size": "24px",
        "adjust-layout": true
      },
      "plotarea": {
        "margin": "dynamic 20 260 dynamic",
      },
      "legend": {
        "layout": "float",
        "background-color": "none",
        "border-width": 0,
        "shadow": 0,
        "align": "center",
        "adjust-layout": true,
        "toggle-action": "remove",
        "item": {
          "padding": 0,
          "marginRight": 17,
          "cursor": "hand"
        }
      },
      "scale-x": {
        "values": ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        "min-value": 1383292800000,
        "shadow": 0,
        "step": 3600000,

        "label": {
          "visible": false
        },
        "minor-ticks": 0
      },
      "scale-y": {
        "line-color": "#f6f7f8",
        "shadow": 0,
        "guide": {
          "line-style": "dashed"
        },
        "label": {
          "text": "",
        },
        "minor-ticks": 0,
        "thousands-separator": ","
      },
      "crosshair-x": {
        "line-color": "#efefef",
        "plot-label": {
          "border-radius": "5px",
          "border-width": "1px",
          "border-color": "#f6f7f8",
          "padding": "0px",
          "font-weight": "bold"
        },
        "scale-label": {
          "font-color": "#000",
          "background-color": "none",
          "border-radius": "5px"
        }
      },
      "tooltip": {
        "visible": false
      },
      "plot": {
        "highlight": true,
        "tooltip-text": "%t views: %v<br>%k",
        "shadow": 0,
        "line-width": "2px",
        "marker": {
          "type": "circle",
          "size": 3
        },
        "highlight-state": {
          "line-width": 3
        },
        "animation": {
          "effect": 1,
          "sequence": 2,
          "speed": 100,
        }
      },
      "series": [{
        "values": [
          customerGraph2Data.graph2[0].value,
          customerGraph2Data.graph2[1].value,
          customerGraph2Data.graph2[2].value,
          customerGraph2Data.graph2[3].value,
          customerGraph2Data.graph2[4].value,
          customerGraph2Data.graph2[5].value,
          customerGraph2Data.graph2[6].value
        ],
        "text": "",
        "line-color": "#007790",
        "legend-item": {
          "background-color": "#fff",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker": {
          "visible": false
        },
        "marker": {
          "background-color": "#007790",
          "border-width": 1,
          "shadow": 0,
          "border-color": "#69dbf1"
        },
        "highlight-marker": {
          "size": 6,
          "background-color": "#007790",
        }
      },
      ]
    };
  }

  //graph3
  var myData = {}
  if (customerGraph3Data != null) {
    myData = {
      "type": "line",
      "utc": true,
      "title": {
        "text": "",
        "font-size": "24px",
        "adjust-layout": true
      },
      "plotarea": {
        "margin": "dynamic 45 60 dynamic",
      },
      "legend": {
        "layout": "float",
        "background-color": "none",
        "border-width": 0,
        "shadow": 0,
        "align": "center",
        "adjust-layout": true,
        "toggle-action": "remove",
        "item": {
          "padding": 7,
          "marginRight": 17,
          "cursor": "hand"
        }
      },
      "scale-x": {
        "values": [customerGraph3Data.garph1[0].month_name, customerGraph3Data.garph1[1].month_name, customerGraph3Data.garph1[2].month_name, customerGraph3Data.garph1[3].month_name, customerGraph3Data.garph1[4].month_name, customerGraph3Data.garph1[5].month_name, customerGraph3Data.garph1[6].month_name, customerGraph3Data.garph1[7].month_name, customerGraph3Data.garph1[8].month_name, customerGraph3Data.garph1[9].month_name, customerGraph3Data.garph1[10].month_name, customerGraph3Data.garph1[11].month_name],
        "min-value": 1383292800000,
        "shadow": 0,
        "step": 3600000,

        "label": {
          "visible": false
        },
        "minor-ticks": 0
      },
      "scale-y": {
        "line-color": "#f6f7f8",
        "shadow": 0,
        "guide": {
          "line-style": "dashed"
        },
        "label": {
          "text": "Page Views",
        },
        "minor-ticks": 0,
        "thousands-separator": ","
      },
      "crosshair-x": {
        "line-color": "#efefef",
        "plot-label": {
          "border-radius": "5px",
          "border-width": "1px",
          "border-color": "#f6f7f8",
          "padding": "10px",
          "font-weight": "bold"
        },
        "scale-label": {
          "font-color": "#000",
          "background-color": "#f6f7f8",
          "border-radius": "5px"
        }
      },
      "tooltip": {
        "visible": false
      },
      "plot": {
        "highlight": true,
        "tooltip-text": "%t views: %v<br>%k",
        "shadow": 0,
        "line-width": "2px",
        "marker": {
          "type": "circle",
          "size": 3
        },
        "highlight-state": {
          "line-width": 3
        },
        "animation": {
          "effect": 1,
          "sequence": 2,
          "speed": 100,
        }
      },
      "series": [{
        "values": [
          customerGraph3Data.garph1[0].value,
          customerGraph3Data.garph1[1].value,
          customerGraph3Data.garph1[2].value,
          customerGraph3Data.garph1[3].value,
          customerGraph3Data.garph1[4].value,
          customerGraph3Data.garph1[5].value,
          customerGraph3Data.garph1[6].value,
          customerGraph3Data.garph1[7].value,
          customerGraph3Data.garph1[8].value,
          customerGraph3Data.garph1[9].value,
          customerGraph3Data.garph1[10].value,
          customerGraph3Data.garph1[11].value
        ],
        "text": "",
        "line-color": "#007790",
        "legend-item": {
          "background-color": "#fff",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker": {
          "visible": false
        },
        "marker": {
          "background-color": "#007790",
          "border-width": 1,
          "shadow": 0,
          "border-color": "#69dbf1"
        },
        "highlight-marker": {
          "size": 6,
          "background-color": "#007790",
        }
      },
      {
        "values": [
          customerGraph3Data.graph3[0].value,
          customerGraph3Data.graph3[1].value,
          customerGraph3Data.graph3[2].value,
          customerGraph3Data.graph3[3].value,
          customerGraph3Data.graph3[4].value,
          customerGraph3Data.graph3[5].value,
          customerGraph3Data.graph3[6].value,
          customerGraph3Data.graph3[7].value,
          customerGraph3Data.graph3[8].value,
          customerGraph3Data.graph3[9].value,
          customerGraph3Data.graph3[10].value,
          customerGraph3Data.graph3[11].value
        ],
        "text": "",
        "line-color": "#da534d",
        "legend-item": {
          "background-color": "#fff",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker": {
          "visible": false
        },
        "marker": {
          "background-color": "#da534d",
          "border-width": 1,
          "shadow": 0,
          "border-color": "#faa39f"
        },
        "highlight-marker": {
          "size": 6,
          "background-color": "#da534d",
        }
      }
      ]
    };
  }

  //graph4
  var myDatas = {}
  if (customerGraph4Data != null) {
    myDatas = {
      "type": "line",
      "utc": true,
      "title": {
        "text": "",
        "font-size": "24px",
        "adjust-layout": true
      },
      "plotarea": {
        "margin": "dynamic 45 60 dynamic",
      },
      "legend": {
        "layout": "float",
        "background-color": "none",
        "border-width": 0,
        "shadow": 0,
        "align": "center",
        "adjust-layout": true,
        "toggle-action": "remove",
        "item": {
          "padding": 7,
          "marginRight": 17,
          "cursor": "hand"
        }
      },
      "scale-x": {
        "values": [customerGraph4Data.graph4[0].month_name, customerGraph4Data.graph4[1].month_name, customerGraph4Data.graph4[2].month_name, customerGraph4Data.graph4[3].month_name, customerGraph4Data.graph4[4].month_name, customerGraph4Data.graph4[5].month_name, customerGraph4Data.graph4[6].month_name, customerGraph4Data.graph4[7].month_name, customerGraph4Data.graph4[8].month_name, customerGraph4Data.graph4[9].month_name, customerGraph4Data.graph4[10].month_name, customerGraph4Data.graph4[11].month_name],
        "min-value": 1383292800000,
        "shadow": 0,
        "step": 3600000,

        "label": {
          "visible": false
        },
        "minor-ticks": 0
      },
      "scale-y": {
        "line-color": "#f6f7f8",
        "shadow": 0,
        "guide": {
          "line-style": "dashed"
        },
        "label": {
          "text": "Page Views",
        },
        "minor-ticks": 0,
        "thousands-separator": ","
      },
      "crosshair-x": {
        "line-color": "#efefef",
        "plot-label": {
          "border-radius": "5px",
          "border-width": "1px",
          "border-color": "#f6f7f8",
          "padding": "10px",
          "font-weight": "bold"
        },
        "scale-label": {
          "font-color": "#000",
          "background-color": "#f6f7f8",
          "border-radius": "5px"
        }
      },
      "tooltip": {
        "visible": false
      },
      "plot": {
        "highlight": true,
        "tooltip-text": "%t views: %v<br>%k",
        "shadow": 0,
        "line-width": "2px",
        "marker": {
          "type": "circle",
          "size": 3
        },
        "highlight-state": {
          "line-width": 3
        },
        "animation": {
          "effect": 1,
          "sequence": 2,
          "speed": 100,
        }
      },
      "series": [{
        "values": [
          customerGraph4Data.graph4[0].value,
          customerGraph4Data.graph4[1].value,
          customerGraph4Data.graph4[2].value,
          customerGraph4Data.graph4[3].value,
          customerGraph4Data.graph4[4].value,
          customerGraph4Data.graph4[5].value,
          customerGraph4Data.graph4[6].value,
          customerGraph4Data.graph4[7].value,
          customerGraph4Data.graph4[8].value,
          customerGraph4Data.graph4[9].value,
          customerGraph4Data.graph4[10].value,
          customerGraph4Data.graph4[11].value
        ],
        "text": "",
        "line-color": "#007790",
        "legend-item": {
          "background-color": "#fff",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker": {
          "visible": false
        },
        "marker": {
          "background-color": "#007790",
          "border-width": 1,
          "shadow": 0,
          "border-color": "#69dbf1"
        },
        "highlight-marker": {
          "size": 6,
          "background-color": "#007790",
        }
      }, {
        "values": [
          customerGraph4Data.graph4_1[0].value,
          customerGraph4Data.graph4_1[1].value,
          customerGraph4Data.graph4_1[2].value,
          customerGraph4Data.graph4_1[3].value,
          customerGraph4Data.graph4_1[4].value,
          customerGraph4Data.graph4_1[5].value,
          customerGraph4Data.graph4_1[6].value,
          customerGraph4Data.graph4_1[7].value,
          customerGraph4Data.graph4_1[8].value,
          customerGraph4Data.graph4_1[9].value,
          customerGraph4Data.graph4_1[10].value,
          customerGraph4Data.graph4_1[11].value
        ],
        "text": "",
        "line-color": "#da534d",
        "legend-item": {
          "background-color": "#fff",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker": {
          "visible": false
        },
        "marker": {
          "background-color": "#da534d",
          "border-width": 1,
          "shadow": 0,
          "border-color": "#faa39f"
        },
        "highlight-marker": {
          "size": 6,
          "background-color": "#da534d",
        }
      }
      ]
    };
  }

  //graph 5
  const datachart = []
  if (customerGraph5Data != null) {
    customerGraph5Data.graph5.forEach(element => {
      datachart.push({
        name: element.month_name,
        color: element.color,
        mono: element.mono
      },
      )
    });
  }

  // graph 6
  const data = []
  if (customerGraph6Data != null) {
    customerGraph6Data.graph6.forEach(element => {
      data.push({
        name: element.month_name,
        print: element.print,
        copy: element.copy,
        fax: element.fax,
        scan: element.scan
      },
      )
    });
  }

  return (
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      <div className="container-fluid">
        <nav className="navbar navbar-main navbar-expand-lg px-0  shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
          <div className="container-fluid py-1 px-0">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark">{t('Pages')}</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{t('Dashboard')}</li>
              </ol>
              <h6 className="font-weight-bolder mb-0">{t('Dashboard')}</h6>
            </nav>
          </div>
        </nav>
        <div className="container-fluid py-4 px-0">
          <div className="row">
            {/* <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-header p-3 pt-2">
                  <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                    <i className="material-icons opacity-10">{t('people')}</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize">{t('Total Customers')}</p>
                    <h4 className="mb-0">{alldata.total_customer}</h4>
                  </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                  <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{alldata.total_percentage_of_customer}% </span>{t('than last month')}</p>
                </div>
              </div>
            </div> */}
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-header p-3 pt-2">
                  <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                    <i className="material-icons opacity-10">business</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize">{t('TotalPaymentCardTerminal')}</p>
                    <h4 className="mb-0">{customerData.total_paymentcard_terminal}</h4>
                  </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                  <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{customerData.total_percentage_of_payreader}% </span>{t('ThanLastMonth')}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-header p-3 pt-2">
                  <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                    <i className="material-icons opacity-10">web</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize">{t('TotalKiosk')}</p>
                    <h4 className="mb-0">{customerData.total_kiosk}</h4>
                  </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                  <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{customerData.total_percentage_of_kiosk}%</span>{t('ThanLastMonth')} </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="card">
                <div className="card-header p-3 pt-2">
                  <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                    <i className="material-icons opacity-10">web</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize">{t('TotalSales')} at previous month</p>
                    <h4 className="mb-0">{customerData.total_sales_previous_month}</h4>
                  </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                  <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{customerData.total_percentage_of_sales_premonth}% </span>{t('ThanLastMonth')}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-4">
              <div className="card">
                <div className="card-header p-3 pt-2">
                  <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                    <i className="material-icons opacity-10">insert_drive_file</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize"> {t('TotalSalesCurrentMonth')}</p>
                    <h4 className="mb-0">{customerData.total_sales_current_month}</h4>
                  </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                  <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{customerData.total_percentage_of_sales_curmonth} % </span>{t('ThanLastMonth')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="statics_section">
            <div className="statics_title mb-4">
              <h6 className="font-weight-bolder mb-0">{t('Statics')}</h6>
            </div>
            <div className="row">
              <div className="col-xl-3 col-sm-6 mb-4">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">school</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize"> {t('TotalSalesInYesterday')}</p>
                      <h4 className="mb-0">{customerData.total_sales_yesterday}</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0"><span className="text-success text-sm font-weight-bolder">0% </span></p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-4">
                <div className="card tooltipExtra">
                  <div className="top">
                    <ul className="tooltipList">
                      <li>{customerData.total_percentage_of_sales_today}% {t('ThanYesterday')}</li>
                    </ul>
                    <i></i>
                  </div>
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">work</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize"> {t('TotalSalesInToday')}</p>
                      <h4 className="mb-0">{customerData.total_sales_today}</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{customerData.total_percentage_of_sales_today}% </span>{t('ThanYesterday')}</p>
                  </div>
                </div>
              </div>
              {/* <div className="col-xl-3 col-sm-6 mb-4">
              <div className="card">
                <div className="card-header p-3 pt-2">
                  <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                    <i className="material-icons opacity-10">contact_page</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize"> Sales in 3 months,  payment</p>
                    <h4 className="mb-0">00</h4>
                  </div>
                </div>
                  <hr className="dark horizontal my-0"/>
                  <div className="card-footer p-3">
                    <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+5% </span>than last month</p>
                  </div>
              </div>
            </div> */}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-7 col-md-7 mt-4 mb-4">
              <div className="card z-index-2 ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                  <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                    <div className="chart">
                      {/* <canvas id="chart-bars" class="chart-canvas" height="170"></canvas> */}
                      <BarChart
                        width={719.3}
                        height={300}
                        data={databar}
                        BarThickness={1}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 0,
                          bottom: 5,
                        }}
                        font={{
                          size: 14,
                          weight: 300,
                          family: "Roboto",
                          style: 'normal',
                          lineHeight: 5
                        }}
                        color="#fff"
                      >
                        <CartesianGrid strokeDasharray="3" />
                        <XAxis dataKey="name" fill="#fff" />
                        <YAxis fill="#fff" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#fff" />
                        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                      </BarChart>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {/* <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 ">{t('Monthly updated')}</h6>
                      <p className="text-sm ">{t('Total Sales: for 1 year / by my customer')}</p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="monthlygraph" className="form-control">
                          <option value="" > --{t('Select Customer')}--</option>
                          {datas.map(items => {
                            return <option value={items.seq}  >{items.display_name}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                  <div className="d-flex ">
                    <i className="material-icons text-sm my-auto me-1">{t('schedule')}</i>
                    <p className="mb-0 text-sm"> {t('campaign sent 2 days ago')} </p>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 mt-4 mb-4">
              <div className="card z-index-2  ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                  <div className="shadow-dark border-radius-lg py-3 pe-1">
                    <div className="chart">
                      <ZingChart data={myDataline}></ZingChart>
                      {/* <canvas id="chart-line" className="chart-canvas" height="170"></canvas> */}
                      {/* <LineChart width={500} height={300} data={dataline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" interval="preserveEnd" />
                    <YAxis interval="preserveEnd" />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#fff" activeDot={{ r: 5 }} />
                  </LineChart> */}
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {/* <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 "> {t('Daily updated')} </h6>
                      <p className="text-sm "> {t('Total Sales : for 1 week')} </p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="dailyUpdated" className="form-control">
                          <option value="" > --{t('Select Customer')}--</option>
                          {datas.map(items => {
                            return <option value={items.seq}  >{items.display_name}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                  <div className="d-flex ">
                    <i className="material-icons text-sm my-auto me-1">{t('schedule')}</i>
                    <p className="mb-0 text-sm"> {t('updated 4 min ago')} </p>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mt-4 mb-4">
              <div className="card z-index-2 ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                  <div className="bg-white shadow-dark border-radius-lg py-3 pe-1">
                    <ZingChart data={myData}></ZingChart>
                    {/* <div id='myChart'><a className="zc-ref" href="https://www.zingchart.com/">Powered by ZingChart</a></div> */}
                  </div>
                </div>
                <div className="card-body">
                  {/* <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 ">{t('Monthly updated')}</h6>
                      <p className="text-sm ">{t('Total Sales: for 1 year / by customer')}</p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="linegraphOne" className="form-control">
                          <option value="" > --{t('Select Customer')}--</option>
                          {datas.map(items => {
                            return <option value={items.seq}  >{items.display_name}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                  <div className="d-flex ">
                    <i className="material-icons text-sm my-auto me-1">{t('schedule')}</i>
                    <p className="mb-0 text-sm"> {t('campaign sent 2 days ago')} </p>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mt-4 mb-4">
              <div className="card z-index-2 ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                  <div className="bg-white shadow-dark border-radius-lg py-3 pe-1">
                    <ZingChart data={myDatas}></ZingChart>
                    {/* <div id='lineChart2'><a className="zc-ref2" href="https://www.zingchart.com/">Powered by ZingChart</a></div> */}
                  </div>
                </div>
                <div className="card-body">
                  {/* <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 ">{t('Monthly updated')}</h6>
                      <p className="text-sm ">{t('Total Sales: for 1 year / by customer')}</p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="linegraphTwo" className="form-control">
                          <option value="" > --{t('Select Customer')}--</option>
                          {datas.map(items => {
                            return <option value={items.seq}  >{items.display_name}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                  <div className="d-flex ">
                    <i className="material-icons text-sm my-auto me-1">{t('schedule')}</i>
                    <p className="mb-0 text-sm"> {t('campaign sent 2 days ago')} </p>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mt-4 mb-4">
              <div className="card z-index-2 ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                  <div className="bg-white shadow-dark border-radius-lg py-3 pe-1">
                    {/* <div id='myChartHorigontal'></div> */}
                    <BarChart
                      width={600}
                      height={300}
                      data={datachart}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="color" stackId="a" fill="#29a2cc" />
                      <Bar dataKey="mono" stackId="a" fill="#d31e1e" />
                    </BarChart>
                  </div>
                </div>
                <div className="card-body">
                  {/* <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 ">{t('Monthly updated')}</h6>
                      <p className="text-sm ">{t('Total Sales: for 1 year / by customer')}</p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="twoColorGraph" className="form-control">
                          <option value="" > --{t('Select Customer')}--</option>
                          {datas.map(items => {
                            return <option value={items.seq}  >{items.display_name}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                  <div className="d-flex ">
                    <i className="material-icons text-sm my-auto me-1">{t('schedule')}</i>
                    <p className="mb-0 text-sm"> {t('campaign sent 2 days ago')} </p>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mt-4 mb-4">
              <div className="card z-index-2 ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                  <div className="bg-white shadow-dark border-radius-lg py-3 pe-1">
                    {/* <div id="chartContainer"></div> */}
                    {/* chart */}
                    {/* <ResponsiveContainer width={'99%'} height={300}> */}
                    <BarChart
                      width={600}
                      height={300}
                      data={data}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="print" stackId="a" fill="#acea8b" />
                      <Bar dataKey="copy" stackId="a" fill="#434348" />
                      <Bar dataKey="fax" stackId="a" fill="#91b4e7" />
                      <Bar dataKey="scan" stackId="a" fill="#ed7d31" />
                    </BarChart>
                    {/* </ResponsiveContainer> */}
                    {/* chart */}
                  </div>
                </div>
                <div className="card-body">
                  {/* <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 ">{t('Monthly updated')}</h6>
                      <p className="text-sm ">{t('Total Sales: for 1 year / by customer')}</p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="fourColorGraph" className="form-control">
                          <option value="" > --{t('Select Customer')}--</option>
                          {datas.map(items => {
                            return <option value={items.seq}  >{items.display_name}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                  <div className="d-flex ">
                    <i className="material-icons text-sm my-auto me-1">{t('schedule')}</i>
                    <p className="mb-0 text-sm"> {t('campaign sent 2 days ago')} </p>
                  </div> */}
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
export default CustomerDashboard;