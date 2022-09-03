import React, { useState, useEffect } from 'react';
import axios from "axios";
import { URL } from "../URL/url";
import { Header } from "../Header/headers";
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE
import CircularProgress from '@mui/material/CircularProgress';
import 'zingchart/modules-es6/zingchart-depth.min.js';
function Dashboard() {
  const [adminData, setAdminData] = useState({});
  const [partnerListData, setPartnerListData] = useState([]);
  const [topPartnerSalesData, setTopPartnerSalesData] = useState([]);
  const [adminGraph1Data, setAdminGraph1Data] = useState(null);
  const [adminGraph2Data, setAdminGraph2Data] = useState(null);
  const [adminGraph3Data, setAdminGraph3Data] = useState(null);
  const [adminGraph4Data, setAdminGraph4Data] = useState(null);
  const [adminGraph5Data, setAdminGraph5Data] = useState(null);
  const [adminGraph6Data, setAdminGraph6Data] = useState(null);
  const [month, setmonth] = useState('1');
  const [top, settop] = useState('10');
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');
  const [loader, setLoader] = useState(false)

  //admin_dashboard
  async function admin_dashboard() {
    await axios.post(URL + "/admin_dashboard", { resellerid: "" }, Header)
      .then((response) => {
        setAdminData(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //graph1
  async function admin_graph1() {
    await axios.post(URL + "/admin_graph1", { resellerid: "" }, Header)
      .then((response) => {
        setAdminGraph1Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //graph2
  async function admin_graph2() {
    await axios.post(URL + "/admin_graph2", { resellerid: "" }, Header)
      .then((response) => {
        setAdminGraph2Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //graph3
  async function admin_graph3() {
    await axios.post(URL + "/admin_graph3", { resellerid: "" }, Header)
      .then((response) => {
        setAdminGraph3Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //graph4
  async function admin_graph4() {
    await axios.post(URL + "/admin_graph4", { resellerid: "" }, Header)
      .then((response) => {
        setAdminGraph4Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //graph5
  async function admin_graph5() {
    await axios.post(URL + "/admin_graph5", { resellerid: "" }, Header)
      .then((response) => {
        setAdminGraph5Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //graph6
  async function admin_graph6() {
    await axios.post(URL + "/admin_graph6", { resellerid: "" }, Header)
      .then((response) => {
        setAdminGraph6Data(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //partner list
  async function partnerlist() {
    await axios
      .post(URL + "/GetResellerList", { reseller_id: '' }, Header)
      .then((response) => {
        setPartnerListData(response.data.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //top
  async function TopPartnerSales() {
    await axios
      .post(URL + "/TopPartnerSales", { resellerid: "", month: month, top: top }, Header)
      .then((response) => {
        setTopPartnerSalesData(response.data.record);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  const getmonth = (e) => {
    // alert('get')
    setLoader(true)
    setmonth(e.target.value)
    axios
      .post(URL + "/TopPartnerSales", { resellerid: "", month: e.target.value, top: top }, Header)
      .then((response) => {
        setTopPartnerSalesData(response.data.record);
        setLoader(false)

      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  const gettop = (e) => {
    settop(e.target.value)
    axios
      .post(URL + "/TopPartnerSales", { resellerid: "", month: month, top: e.target.value }, Header)
      .then((response) => {
        //console.log(e.target.value)
        //console.log(month)
        setTopPartnerSalesData(response.data.record);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  //partner_graph1
  const partnerselectgraph1 = (e) => {
    if (e.target.value === "") {
      admin_graph1()
    } else {
      axios
        .post(URL + "/partner_graph1", { resellerid: e.target.value }, Header)
        .then((response) => {
          setAdminGraph1Data(response.data);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    }
  }

  //partner_graph2
  const partnerselectgraph2 = (e) => {
    if (e.target.value === "") {
      admin_graph2()
    } else {
      axios
        .post(URL + "/partner_graph2", { resellerid: e.target.value }, Header)
        .then((response) => {
          setAdminGraph2Data(response.data);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    }
  }

  //partner_graph3
  const partnerselectgraph3 = (e) => {
    if (e.target.value === "") {
      admin_graph3()
    } else {
      axios
        .post(URL + "/partner_graph3", { resellerid: e.target.value }, Header)
        .then((response) => {
          setAdminGraph3Data(response.data);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    }
  }

  //partner_graph4
  const partnerselectgraph4 = (e) => {
    if (e.target.value === "") {
      admin_graph4()
    } else {
      axios
        .post(URL + "/partner_graph4", { resellerid: e.target.value }, Header)
        .then((response) => {
          setAdminGraph4Data(response.data);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    }
  }

  //partner_graph5
  const partnerselectgraph5 = (e) => {
    if (e.target.value === "") {
      admin_graph5()
    } else {
      axios
        .post(URL + "/partner_graph5", { resellerid: e.target.value }, Header)
        .then((response) => {
          setAdminGraph5Data(response.data);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    }
  }

  //partner_graph6
  const partnerselectgraph6 = (e) => {
    if (e.target.value === "") {
      admin_graph6()
    } else {
      axios
        .post(URL + "/partner_graph6", { resellerid: e.target.value }, Header)
        .then((response) => {
          setAdminGraph6Data(response.data);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    }
  }

  useEffect(() => {
    admin_dashboard()
    admin_graph1()
    admin_graph2()
    admin_graph3()
    admin_graph4()
    admin_graph5()
    admin_graph6()
    partnerlist()
    TopPartnerSales()
  }, [])

  //graph1
  const databar = []
  if (adminGraph1Data != null) {
    adminGraph1Data.garph1.forEach(element => {
      databar.push({
        name: element.month_name,
        pv: element.value
      },
      )
    })
  }

  //graph2
  var myDataline = {}
  if (adminGraph2Data != null) {
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
          adminGraph2Data.graph2[0].value,
          adminGraph2Data.graph2[1].value,
          adminGraph2Data.graph2[2].value,
          adminGraph2Data.graph2[3].value,
          adminGraph2Data.graph2[4].value,
          adminGraph2Data.graph2[5].value,
          adminGraph2Data.graph2[6].value
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
  if (adminGraph3Data != null) {
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
        "values": [adminGraph3Data.garph1[0].month_name, adminGraph3Data.garph1[1].month_name, adminGraph3Data.garph1[2].month_name, adminGraph3Data.garph1[3].month_name, adminGraph3Data.garph1[4].month_name, adminGraph3Data.garph1[5].month_name, adminGraph3Data.garph1[6].month_name, adminGraph3Data.garph1[7].month_name, adminGraph3Data.garph1[8].month_name, adminGraph3Data.garph1[9].month_name, adminGraph3Data.garph1[10].month_name, adminGraph3Data.garph1[11].month_name],
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
          adminGraph3Data.garph1[0].value,
          adminGraph3Data.garph1[1].value,
          adminGraph3Data.garph1[2].value,
          adminGraph3Data.garph1[3].value,
          adminGraph3Data.garph1[4].value,
          adminGraph3Data.garph1[5].value,
          adminGraph3Data.garph1[6].value,
          adminGraph3Data.garph1[7].value,
          adminGraph3Data.garph1[8].value,
          adminGraph3Data.garph1[9].value,
          adminGraph3Data.garph1[10].value,
          adminGraph3Data.garph1[11].value
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
          adminGraph3Data.graph3[0].value,
          adminGraph3Data.graph3[1].value,
          adminGraph3Data.graph3[2].value,
          adminGraph3Data.graph3[3].value,
          adminGraph3Data.graph3[4].value,
          adminGraph3Data.graph3[5].value,
          adminGraph3Data.graph3[6].value,
          adminGraph3Data.graph3[7].value,
          adminGraph3Data.graph3[8].value,
          adminGraph3Data.graph3[9].value,
          adminGraph3Data.graph3[10].value,
          adminGraph3Data.graph3[11].value
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
  if (adminGraph4Data != null) {
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
        "values": [adminGraph4Data.graph4[0].month_name, adminGraph4Data.graph4[1].month_name, adminGraph4Data.graph4[2].month_name, adminGraph4Data.graph4[3].month_name, adminGraph4Data.graph4[4].month_name, adminGraph4Data.graph4[5].month_name, adminGraph4Data.graph4[6].month_name, adminGraph4Data.graph4[7].month_name, adminGraph4Data.graph4[8].month_name, adminGraph4Data.graph4[9].month_name, adminGraph4Data.graph4[10].month_name, adminGraph4Data.graph4[11].month_name],
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
          adminGraph4Data.graph4[0].value,
          adminGraph4Data.graph4[1].value,
          adminGraph4Data.graph4[2].value,
          adminGraph4Data.graph4[3].value,
          adminGraph4Data.graph4[4].value,
          adminGraph4Data.graph4[5].value,
          adminGraph4Data.graph4[6].value,
          adminGraph4Data.graph4[7].value,
          adminGraph4Data.graph4[8].value,
          adminGraph4Data.graph4[9].value,
          adminGraph4Data.graph4[10].value,
          adminGraph4Data.graph4[11].value
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
          adminGraph4Data.graph4_1[0].value,
          adminGraph4Data.graph4_1[1].value,
          adminGraph4Data.graph4_1[2].value,
          adminGraph4Data.graph4_1[3].value,
          adminGraph4Data.graph4_1[4].value,
          adminGraph4Data.graph4_1[5].value,
          adminGraph4Data.graph4_1[6].value,
          adminGraph4Data.graph4_1[7].value,
          adminGraph4Data.graph4_1[8].value,
          adminGraph4Data.graph4_1[9].value,
          adminGraph4Data.graph4_1[10].value,
          adminGraph4Data.graph4_1[11].value
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
    }
  }

  //graph 5
  const datachart = []
  if (adminGraph5Data != null) {
    adminGraph5Data.graph5.forEach(element => {
      datachart.push({
        name: element.month_name,
        color: element.color,
        mono: element.mono
      },
      )
    })
  }

  // graph 6
  const data = []
  if (adminGraph6Data != null) {
    adminGraph6Data.graph6.forEach(element => {
      data.push({
        name: element.month_name,
        print: element.print,
        copy: element.copy,
        fax: element.fax,
        scan: element.scan
      },
      )
    })
  }

  return (
    // <h1>Dashboard</h1>
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
                    <i className="material-icons opacity-10">people</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize">{t('TotalPartners')}</p>
                    <h4 className="mb-0">{adminData.total_partner}</h4>
                  </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                  <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{adminData.total_percentage_of_partner}% </span> {t('ThanLastMonth')}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-header p-3 pt-2">
                  <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                    <i className="material-icons opacity-10">person_add_alt_1</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize">{t('TotalCustomers')}</p>
                    <h4 className="mb-0">{adminData.total_customer}</h4>
                  </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                  <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{adminData.total_percentage_of_customer}% </span> {t('ThanLastMonth')}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-header p-3 pt-2">
                  <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                    <i className="material-icons opacity-10">business</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize">{t('TotalPaymentCardTerminal')}</p>
                    <h4 className="mb-0">{adminData.total_paymentcard_terminal}</h4>
                  </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                  <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{adminData.total_percentage_of_payreader}% </span> {t('ThanLastMonth')}</p>
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
                    <h4 className="mb-0">{adminData.total_kiosk}</h4>
                  </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                  <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{adminData.total_percentage_of_kiosk}%</span> {t('ThanLastMonth')} </p>
                </div>
              </div>
            </div>
          </div>
          <div className="statics_section">
            <div className="statics_title mb-4">
              <h6 className="font-weight-bolder mb-0">{t('Statics')}</h6>
            </div>
            <div className="row">
              <div className="col-xl-3 col-sm-6">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10"></i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">{t('TotalSales')} at previous month</p>
                      <h4 className="mb-0">{adminData.total_sales_previous_month}</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{adminData.total_percentage_of_sales_premonth}% </span> {t('ThanLastMonth')}</p>
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
                      <h4 className="mb-0">{adminData.total_sales_current_month}</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{adminData.total_percentage_of_sales_curmonth} % </span> {t('ThanLastMonth')}</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-4">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">school</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize"> {t('TotalSalesInYesterday')}</p>
                      <h4 className="mb-0">{adminData.total_sales_yesterday}</h4>
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
                      <li>{adminData.total_percentage_of_sales_today}% {t('ThanYesterday')}</li>
                    </ul>
                    <i></i>
                  </div>
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">work</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize"> {t('TotalSalesInToday')}</p>
                      <h4 className="mb-0">{adminData.total_sales_today}</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0"><span className="text-success text-sm font-weight-bolder">{adminData.total_percentage_of_sales_today}% </span>{t('ThanYesterday')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            {/* graph1 */}
            <div className="col-lg-7 col-md-7 mt-4 mb-4">
              <div className="card z-index-2 ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                  <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                    <div className="chart">
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
                      </BarChart>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 ">{t('MonthlyUpdated')}</h6>
                      <p className="text-sm ">{t('TotalSalesabove#6for1yearbypartner')}</p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="monthlygraph" className="form-select" onChange={partnerselectgraph1}>
                          <option value="" > --{t('SelectPartner')}--</option>
                          {partnerListData.map((items, p) => {
                            return <option key={p} value={items.resellerid}  >{items.displayname}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                </div>
              </div>
            </div>
            {/* graph2 */}
            <div className="col-lg-5 col-md-5 mt-4 mb-4">
              <div className="card z-index-2  ">
                <div className="card-header p-0 position-relative mx-3 z-index-2 bg-transparent">
                  <div className="shadow-dark border-radius-lg py-3 pe-1">
                    <div className="chart">
                      <ZingChart data={myDataline}></ZingChart>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 "> {t('DailyUpdated')} </h6>
                      <p className="text-sm "> {t('Above#6for1week')} </p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="dailyUpdated" className="form-select" onChange={partnerselectgraph2}>
                          <option value="" > --{t('SelectPartner')}--</option>
                          {partnerListData.map((items, p) => {
                            return <option key={p} value={items.resellerid}  >{items.displayname}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                </div>
              </div>
            </div>
            {/* graph3 */}
            <div className="col-lg-6 col-md-6 mt-4 mb-4">
              <div className="card z-index-2 ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                  <div className="bg-white shadow-dark border-radius-lg py-3 pe-1">
                    <ZingChart data={myData}></ZingChart>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 ">{t('MonthlyUpdated')}</h6>
                      <p className="text-sm ">{t('TotalSalesabove#6for1yearbypartner')}</p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="linegraphOne" className="form-select" onChange={partnerselectgraph3}>
                          <option value="" > --{t('SelectPartner')}--</option>
                          {partnerListData.map((items, p) => {
                            return <option key={p} value={items.resellerid}  >{items.displayname}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                </div>
              </div>
            </div>
            {/* graph4 */}
            <div className="col-lg-6 col-md-6 mt-4 mb-4">
              <div className="card z-index-2 ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                  <div className="bg-white shadow-dark border-radius-lg py-3 pe-1">
                    <ZingChart data={myDatas}></ZingChart>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 ">{t('MonthlyUpdated')}</h6>
                      <p className="text-sm ">{t('TotalSalesabove#6for1yearbypartner')}</p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="linegraphTwo" className="form-select" onChange={partnerselectgraph4}>
                          <option value="" > --{t('SelectPartner')}--</option>
                          {partnerListData.map((items, p) => {
                            return <option key={p} value={items.resellerid}  >{items.displayname}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mt-4 mb-4">
              <div className="card z-index-2 ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                  <div className="bg-white shadow-dark border-radius-lg py-3 pe-1">
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
                      <h6 className="mb-0 ">{t('MonthlyUpdated')}</h6>
                      <p className="text-sm ">{t('TotalSalesabove#6for1yearbypartner')}</p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="twoColorGraph" className="form-select" onChange={partnerselectgraph5}>
                          <option value="" > --{t('SelectPartner')}--</option>
                          {partnerListData.map((items, p) => {
                            return <option key={p} value={items.resellerid}  >{items.displayname}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mt-4 mb-4">
              <div className="card z-index-2 ">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                  <div className="bg-white shadow-dark border-radius-lg py-3 pe-1">
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
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-7">
                      <h6 className="mb-0 ">{t('MonthlyUpdated')}</h6>
                      <p className="text-sm ">{t('TotalSalesabove#6for1yearbypartner')}</p>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <select id="fourColorGraph" className="form-select" onChange={partnerselectgraph6}>
                          <option value="" > --{t('SelectPartner')}--</option>
                          {partnerListData.map((items, p) => {
                            return <option key={p} value={items.resellerid}  >{items.displayname}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr className="dark horizontal mt-0" />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-12 col-md-6 mb-md-0 mb-4">
              <div className="card">
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'absolute', bottom: '40%' }}>
                  {loader ? <CircularProgress /> : ''}
                </div>
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-lg-6 col-7">
                      <h6>{t('TopSalesReport')}</h6>
                      {/* <p className="text-sm mb-0">
                        <i className="fa fa-check text-info" aria-hidden="true"></i>
                        <span className="font-weight-bold ms-1"> {t('30DoneThisMonth')}</span>
                      </p> */}
                    </div>
                    <div className="col-lg-3 col-5 my-auto text-end">
                      <div>
                        <label className="font-weight-bold">{t('Period')}:</label>
                        <select className="topsaleSelect" onChange={getmonth}>
                          <option value={'1'}>1 {t('Month')} </option>
                          <option value={'3'}>3 {t('Month')} </option>
                          <option value={'6'}>6 {t('Month')} </option>
                          <option value={'12'}>12 {t('Month')} </option>
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
                                <h6 className="mb-0 text-md">{t('Partner')}</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="avatar-group mt-2">
                              <span className="text-md font-weight-bold">{t('TotalCost')}</span>
                            </div>
                          </td>
                          <td className="align-middle text-center text-sm">
                            <span className="text-md font-weight-bold">%{t('OfTotalSales')}</span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-md font-weight-bold">{t('NoOfTerminal')}</span>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {topPartnerSalesData.map((topitem, i) => {
                          return <tr key={i}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-md">{topitem.partner_name}</h6>
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