import React, { useState, useEffect } from 'react';
import axios from "axios";
import { URL } from "../URL/url";
import { Header } from "../Header/headers";
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE
import 'zingchart/modules-es6/zingchart-depth.min.js';
function Dashboard() {
  const [partnerData, setPartnerData] = useState({});
  const [customerListData, setCustomerListData] = useState([]);
  const [topCustomerSalesData, setTopCustomerSalesData] = useState([]);
  const [partnerGraph1Data, setPartnerGraph1Data] = useState(null);
  const [partnerGraph2Data, setPartnerGraph2Data] = useState(null);
  const [partnerGraph3Data, setPartnerGraph3Data] = useState(null);
  const [partnerGraph4Data, setPartnerGraph4Data] = useState(null);
  const [partnerGraph5Data, setPartnerGraph5Data] = useState(null);
  const [partnerGraph6Data, setPartnerGraph6Data] = useState(null);
  const [month, setmonth] = useState('1');
  const [top, settop] = useState('10');
  const { t, i18n } = useTranslation();
  const [customerId, SetCustomerId] = useState('');
  let role = localStorage.getItem("role");
  let customerseq = localStorage.getItem("customerseq");
  let reseller_id = localStorage.getItem("reseller_id");

  async function partner_dashboard() {
    //console.log(reseller_id);
    await axios.post(URL + "/partner_dashboard", { resellerid: reseller_id }, Header)
      .then((response) => {
        setPartnerData(response.data)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  async function customerlist() {
    await axios
      .post(URL + "/GetCustomerList", { role: role, resellerid: reseller_id, customerid: customerseq, }, Header)
      .then((response) => {
        setCustomerListData(response.data.data)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  async function TopCustomerSales() {
    await axios
      .post(URL + "/TopCustomerSales", { resellerid: reseller_id, month: month, top: top }, Header)
      .then((response) => {
        setTopCustomerSalesData(response.data.record)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //graph1
  async function partner_graph1() {
    await axios.post(URL + "/partner_graph1", { resellerid: reseller_id }, Header)
      .then((response) => {
        setPartnerGraph1Data(response.data)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  // //graph2
  async function partner_graph2() {
    await axios.post(URL + "/partner_graph2", { resellerid: reseller_id }, Header)
      .then((response) => {
        setPartnerGraph2Data(response.data)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  // //graph3
  async function partner_graph3() {
    await axios.post(URL + "/partner_graph3", { resellerid: reseller_id }, Header)
      .then((response) => {
        setPartnerGraph3Data(response.data)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //graph4
  async function partner_graph4() {
    await axios.post(URL + "/partner_graph4", { resellerid: reseller_id }, Header)
      .then((response) => {
        setPartnerGraph4Data(response.data)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //graph5
  async function partner_graph5() {
    await axios.post(URL + "/partner_graph5", { resellerid: reseller_id }, Header)
      .then((response) => {
        setPartnerGraph5Data(response.data)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //graph6
  async function partner_graph6() {
    await axios.post(URL + "/partner_graph6", { resellerid: reseller_id }, Header)
      .then((response) => {
        setPartnerGraph6Data(response.data)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }
  //getmonth
  const getmonth = (e) => {
    setmonth(e.target.value)
    axios
      .post(URL + "/TopCustomerSales", { resellerid: reseller_id, month: month, top: top }, Header)
      .then((response) => {
        setTopCustomerSalesData(response.data.record);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  };
  //get top sales

  const gettop = (e) => {
    settop(e.target.value)
    axios
      .post(URL + "/TopCustomerSales", { resellerid: reseller_id, month: month, top: top }, Header)
      .then((response) => {
        setTopCustomerSalesData(response.data.record);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  };

  //customer graph1
  
  const customerselectgraph1 = (e) => {
    //SetCustomerId(e.target.value)
    axios
      .post(URL + "/customer_graph1", { customerseq: e.target.value }, Header)
      .then((response) => {
        setPartnerGraph1Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }
  //customer graph2
  const customerselectgraph2 = (e) => {
    //SetCustomerId(e.target.value)
    
    axios
      .post(URL + "/customer_graph2", { customerseq: e.target.value }, Header)
      .then((response) => {
        setPartnerGraph2Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }
  //customer graph3
  const customerselectgraph3 = (e) => {
    //SetCustomerId(e.target.value)
    
    axios
      .post(URL + "/customer_graph3", { customerseq: e.target.value }, Header)
      .then((response) => {
        setPartnerGraph3Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }
  //customer graph4
  const customerselectgraph4 = (e) => {
    //SetCustomerId(e.target.value)
   
    axios
      .post(URL + "/customer_graph4", { customerseq: e.target.value }, Header)
      .then((response) => {
        setPartnerGraph4Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }
  //customer graph5
  const customerselectgraph5 = (e) => {
    //SetCustomerId(e.target.value)
    
    axios
      .post(URL + "/customer_graph5", { customerseq: e.target.value }, Header)
      .then((response) => {
        setPartnerGraph5Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }
  //customer graph6
  const customerselectgraph6 = (e) => {
    //SetCustomerId(e.target.value)
    
    axios
      .post(URL + "/customer_graph6", { customerseq: e.target.value }, Header)
      .then((response) => {
        setPartnerGraph6Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  useEffect(() => {
    console.log('In UseEffect')
    partner_dashboard()
    customerlist()
    TopCustomerSales()
    partner_graph1()
    partner_graph2()
    partner_graph3()
    partner_graph4()
    partner_graph5()
    partner_graph6()
  }, []);  
  //graph1
  const databar = []
  if (partnerGraph1Data != null) {
    partnerGraph1Data.garph1.forEach(element => {
      //console.log(element)
      databar.push({
        name: element.month_name,
        pv: element.value
      },
      )
    });
    //console.log('databar')
    //console.log(databar)
  }
  //graph2
  var myDataline = {}
  if (partnerGraph2Data != null) {
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
          partnerGraph2Data.graph2[0].value,
          partnerGraph2Data.graph2[1].value,
          partnerGraph2Data.graph2[2].value,
          partnerGraph2Data.graph2[3].value,
          partnerGraph2Data.graph2[4].value,
          partnerGraph2Data.graph2[5].value,
          partnerGraph2Data.graph2[6].value
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
  //console.log("myDataline");
  //console.log(myDataline);
  //graph3
  var myData = {}
  if (partnerGraph3Data != null) {
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
        "values": [partnerGraph3Data.garph1[0].month_name, partnerGraph3Data.garph1[1].month_name, partnerGraph3Data.garph1[2].month_name, partnerGraph3Data.garph1[3].month_name, partnerGraph3Data.garph1[4].month_name, partnerGraph3Data.garph1[5].month_name, partnerGraph3Data.garph1[6].month_name, partnerGraph3Data.garph1[7].month_name, partnerGraph3Data.garph1[8].month_name, partnerGraph3Data.garph1[9].month_name, partnerGraph3Data.garph1[10].month_name, partnerGraph3Data.garph1[11].month_name],
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
          partnerGraph3Data.garph1[0].value,
          partnerGraph3Data.garph1[1].value,
          partnerGraph3Data.garph1[2].value,
          partnerGraph3Data.garph1[3].value,
          partnerGraph3Data.garph1[4].value,
          partnerGraph3Data.garph1[5].value,
          partnerGraph3Data.garph1[6].value,
          partnerGraph3Data.garph1[7].value,
          partnerGraph3Data.garph1[8].value,
          partnerGraph3Data.garph1[9].value,
          partnerGraph3Data.garph1[10].value,
          partnerGraph3Data.garph1[11].value
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
          partnerGraph3Data.graph3[0].value,
          partnerGraph3Data.graph3[1].value,
          partnerGraph3Data.graph3[2].value,
          partnerGraph3Data.graph3[3].value,
          partnerGraph3Data.graph3[4].value,
          partnerGraph3Data.graph3[5].value,
          partnerGraph3Data.graph3[6].value,
          partnerGraph3Data.graph3[7].value,
          partnerGraph3Data.graph3[8].value,
          partnerGraph3Data.graph3[9].value,
          partnerGraph3Data.graph3[10].value,
          partnerGraph3Data.graph3[11].value
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

  //console.log("myData")
  //console.log(myData)

  //graph4
  var myDatas = {}
  if (partnerGraph4Data != null) {
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
        "values": [partnerGraph4Data.graph4[0].month_name, partnerGraph4Data.graph4[1].month_name, partnerGraph4Data.graph4[2].month_name, partnerGraph4Data.graph4[3].month_name, partnerGraph4Data.graph4[4].month_name, partnerGraph4Data.graph4[5].month_name, partnerGraph4Data.graph4[6].month_name, partnerGraph4Data.graph4[7].month_name, partnerGraph4Data.graph4[8].month_name, partnerGraph4Data.graph4[9].month_name, partnerGraph4Data.graph4[10].month_name, partnerGraph4Data.graph4[11].month_name],
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
          partnerGraph4Data.graph4[0].value,
          partnerGraph4Data.graph4[1].value,
          partnerGraph4Data.graph4[2].value,
          partnerGraph4Data.graph4[3].value,
          partnerGraph4Data.graph4[4].value,
          partnerGraph4Data.graph4[5].value,
          partnerGraph4Data.graph4[6].value,
          partnerGraph4Data.graph4[7].value,
          partnerGraph4Data.graph4[8].value,
          partnerGraph4Data.graph4[9].value,
          partnerGraph4Data.graph4[10].value,
          partnerGraph4Data.graph4[11].value
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
          partnerGraph4Data.graph4_1[0].value,
          partnerGraph4Data.graph4_1[1].value,
          partnerGraph4Data.graph4_1[2].value,
          partnerGraph4Data.graph4_1[3].value,
          partnerGraph4Data.graph4_1[4].value,
          partnerGraph4Data.graph4_1[5].value,
          partnerGraph4Data.graph4_1[6].value,
          partnerGraph4Data.graph4_1[7].value,
          partnerGraph4Data.graph4_1[8].value,
          partnerGraph4Data.graph4_1[9].value,
          partnerGraph4Data.graph4_1[10].value,
          partnerGraph4Data.graph4_1[11].value

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
   // console.log("myDatas")
   // console.log(myDatas)
  }


  //graph 5
  const datachart = []
  if (partnerGraph5Data != null) {
    partnerGraph5Data.graph5.forEach(element => {
      //console.log(element)
      datachart.push({
        name: element.month_name,
        color: element.color,
        mono: element.mono
      },
      )
    });
    //console.log("datachart")
    //console.log(datachart)
  }
  // graph 6
  const data = []
  if (partnerGraph6Data != null) {
    partnerGraph6Data.graph6.forEach(element => {
      //console.log(element)
      data.push({
        name: element.month_name,
        print: element.print,
        copy: element.copy,
        fax: element.fax,
        scan: element.scan
      },
      )
    });
    //console.log('data')
    //console.log(data)
  }




  //console.log(topcustomer);
  return (
    // <h1>Hello</h1>
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
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-header p-3 pt-2">
                  <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                    <i className="material-icons opacity-10">{t('people')}</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize">{t('Total Customers')}</p>
                    <h4 className="mb-0">{partnerData.total_customer}</h4>
                  </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                  <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{partnerData.total_percentage_of_customer}% </span>{t('than last month')}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-header p-3 pt-2">
                  <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                    <i className="material-icons opacity-10">{t('person_add_alt_1')}</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize">{t('Total Payment Card Terminal')}</p>
                    <h4 className="mb-0">{partnerData.total_paymentcard_terminal}</h4>
                  </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                  <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{partnerData.total_percentage_of_payreader}% </span>{t('than last month')}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-header p-3 pt-2">
                  <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                    <i className="material-icons opacity-10">{t('business')}</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize">{t('Total Kiosk')}</p>
                    <h4 className="mb-0">{partnerData.total_kiosk}</h4>
                  </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                  <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{partnerData.total_percentage_of_kiosk}%</span>{t('than last month')} </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="card">
                <div className="card-header p-3 pt-2">
                  <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                    <i className="material-icons opacity-10">{t('web')}</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize">{t('Total Sales')} at previous month</p>
                    <h4 className="mb-0">{partnerData.total_sales_previous_month}</h4>
                  </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                  <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{partnerData.total_percentage_of_sales_premonth}% </span>{t('than last month')}</p>
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
                      <i className="material-icons opacity-10">{t('insert_drive_file')}</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize"> {t('Total Sales Current Month')}</p>
                      <h4 className="mb-0">{partnerData.total_sales_current_month}</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{partnerData.total_percentage_of_sales_curmonth} % </span>{t('than last month')}</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-4">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">{t('school')}</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize"> {t('Total Sales In Yesterday')}</p>
                      <h4 className="mb-0">{partnerData.total_sales_yesterday}</h4>
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
                      <li>{partnerData.total_percentage_of_sales_today}% {t('than yesterday')}</li>
                    </ul>
                    <i></i>
                  </div>
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">{t('work')}</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize"> {t('Total Sales In Toda')}</p>
                      <h4 className="mb-0">{partnerData.total_sales_today}</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{partnerData.total_percentage_of_sales_today}% </span>{t('than yesterday')}</p>
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
                  <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 ">{t('Monthly updated')}</h6>
                      <p className="text-sm ">{t('Total Sales: for 1 year / by my customer')}</p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="monthlygraph" className="form-control" onChange={customerselectgraph1}>
                          <option value="" > --{t('Select Customer')}--</option>
                          {customerListData.map(items => {
                            return <option value={items.seq}  >{items.display_name}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <hr className="dark horizontal mt-0" />
                  {/* <div className="d-flex ">
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
                  <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 "> {t('Daily updated')} </h6>
                      <p className="text-sm "> {t('Total Sales : for 1 week')} </p>
                    </div>

                    <div className="col-md-5">
                      <div>
                        <select id="dailyUpdated" className="form-control" onChange={customerselectgraph2}>
                          <option value="" > --{t('Select Customer')}--</option>
                          {customerListData.map(items => {
                            return <option value={items.seq}  >{items.display_name}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                  {/* <div className="d-flex ">
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
                  <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 ">{t('Monthly updated')}</h6>
                      <p className="text-sm ">{t('Total Sales: for 1 year / by customer')}</p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="linegraphOne" className="form-control" onChange={customerselectgraph3}>
                          <option value="" > --{t('Select Customer')}--</option>
                          {customerListData.map(items => {
                            return <option value={items.seq}  >{items.display_name}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                  {/* <div className="d-flex ">
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
                  <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 ">{t('Monthly updated')}</h6>
                      <p className="text-sm ">{t('Total Sales: for 1 year / by customer')}</p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="linegraphTwo" className="form-control" onChange={customerselectgraph4}>
                          <option value="" > --{t('Select Customer')}--</option>
                          {customerListData.map(items => {
                            return <option value={items.seq}  >{items.display_name}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                  {/* <div className="d-flex ">
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
                  <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 ">{t('Monthly updated')}</h6>
                      <p className="text-sm ">{t('Total Sales: for 1 year / by customer')}</p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="twoColorGraph" className="form-control" onChange={customerselectgraph5}>
                          <option value="" > --{t('Select Customer')}--</option>
                          {customerListData.map(items => {
                            return <option value={items.seq}  >{items.display_name}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                  {/* <div className="d-flex ">
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
                  <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 ">{t('Monthly updated')}</h6>
                      <p className="text-sm ">{t('Total Sales: for 1 year / by customer')}</p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="fourColorGraph" className="form-control" onChange={customerselectgraph6}>
                          <option value="" > --{t('Select Customer')}--</option>
                          {customerListData.map(items => {
                            return <option value={items.seq}  >{items.display_name}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                  {/* <div className="d-flex ">
                    <i className="material-icons text-sm my-auto me-1">{t('schedule')}</i>
                    <p className="mb-0 text-sm"> {t('campaign sent 2 days ago')} </p>
                  </div> */}
                </div>
              </div>
            </div>

          </div>

          <div className="row mb-4">
            <div className="col-lg-12 col-md-6 mb-md-0 mb-4">
              <div className="card">
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-lg-6 col-7">
                      <h6>{t('Top Sales Report')}</h6>
                      <p className="text-sm mb-0">
                        <i className="fa fa-check text-info" aria-hidden="true"></i>
                        <span className="font-weight-bold ms-1"> {t('30 done this month')}</span>
                      </p>
                    </div>
                    <div className="col-lg-3 col-5 my-auto text-end">
                      <div>
                        <label className="font-weight-bold">{t('Period')}:</label>
                        <select className="topsaleSelect" onChange={getmonth}>
                          <option value={'1'}>1 month </option>
                          <option value={'3'}>3 month </option>
                          <option value={'6'}>6 month </option>
                          <option value={'12'}>12 month </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 col-5 my-auto text-end">
                      <div>
                        <label className="font-weight-bold">{t('Top')}:</label>
                        <select className="topsaleSelect" onChange={gettop}>
                          <option value={'10'}>10</option>
                          <option value={'20'}>20</option>
                          <option value={'30'}>30</option>
                          <option value={'40'}>40</option>
                          <option value={'50'}>50</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive">
                    <table className="table align-items-center mb-0">
                      <thead>

                        <tr>
                          <td>
                            <div className="d-flex px-2 py-1">
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-md">Customer</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="avatar-group mt-2">
                              <span className="text-md font-weight-bold">Total cost </span>
                            </div>
                          </td>
                          <td className="align-middle text-center text-sm">
                            <span className="text-md font-weight-bold">% of total sales</span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-md font-weight-bold"> No. of terminal</span>
                          </td>


                        </tr>
                      </thead>
                      <tbody>
                        {topCustomerSalesData.map((topitem, i) => {
                          return <tr key={i}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-md">{topitem.customer_name}</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="avatar-group mt-2">
                                <span className="text-md font-weight-bold">{topitem.totalcost} </span>
                              </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="text-md font-weight-bold">% {topitem.total_sale_percentage}</span>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-md font-weight-bold"> {topitem.total_terminal}</span>
                            </td>
                          </tr>

                        })}

                      </tbody>
                    </table>
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
export default Dashboard;