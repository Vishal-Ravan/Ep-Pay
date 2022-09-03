import React, { useState, useEffect } from 'react';
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion'
import { URL } from "../URL/url";
import { useTranslation } from 'react-i18next'
//import { Redirect } from "react-router-dom";
//import { Modal,Tabs,Tab} from "react-bootstrap";
//import DataTable from "react-data-table-component";
function Support() {
  //language
  const { t, i18n } = useTranslation();
  let user_id = localStorage.getItem("user_id");
  const [data, setData] = useState([]);
  const [dataf, setDataf] = useState([]);
  async function urllinks() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    await axios
      .post(URL + "/urllinks", { user_id: user_id, }, headers)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }
  //faq
  async function faq() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    axios
      .post(URL + "/faq", { user_id: user_id, }, headers)
      .then((response) => {
        setDataf(response.data.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }
  useEffect(() => {
    urllinks()
    faq()

  }, []);
  return (
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      <div className="container-fluid">
        <nav className="navbar navbar-main navbar-expand-lg px-0 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
          <div className="container-fluid py-1 px-0">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">{t('Home')}</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{t('Admin')}</li>
              </ol>
              <h6 className="font-weight-bolder mb-0">{t('Support')}</h6>
            </nav>

          </div>
        </nav>

        <div className="container-fluid pt-1 py-4 px-0">
          <div className="row">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card p-2 px-4">
                <div className="text-center py-4 downloadappSection">
                  <div className="appdownTitle">
                    <h4>{t('DownloadOur')}</h4>
                    <p className="mt-4">{t('ExceptureCint')}</p>
                  </div>
                  <div className="appDownload button-block pt-4 pb-2">
                    {data.map((item,i) => {
                      return <a key={i} href="{iten.url_name}" target="_blank" className="app-btn">
                        <i className="mdi mdi-apple"></i> {t('GetInPlayStore')}
                      </a>
                    })}

                    {/* <a href="#" className="app-btn">
                          <i className="mdi mdi-apple"></i> Get in<span>Play Store</span>
                      </a>
                      <a href="#" className="app-btn">
                          <i className="mdi mdi-apple"></i> Get in<span>Play Store</span>
                      </a>
                      <a href="#" className="app-btn">
                          <i className="mdi mdi-apple"></i> Get in<span>Play Store</span>
                      </a>
                      <a href="#" className="app-btn">
                          <i className="mdi mdi-apple"></i> Get in<span>Play Store</span>
                      </a>
                      <a href="#" className="app-btn">
                          <i className="mdi mdi-apple"></i> Get in<span>Play Store</span>
                      </a>
                      <a href="#" className="app-btn">
                          <i className="mdi mdi-apple"></i> Get in<span>Play Store</span>
                      </a>
                      <a href="#" className="app-btn">
                          <i className="mdi mdi-apple"></i> Get in<span>Play Store</span>
                      </a>
                      <a href="#" className="app-btn">
                          <i className="mdi mdi-apple"></i> Get in<span>Play Store</span>
                      </a>
                      <a href="#" className="app-btn">
                          <i className="mdi mdi-apple"></i> Get in<span>Play Store</span>
                      </a> */}
                  </div>
                </div>
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
                        <h6 className="font-weight-bolder mb-0 pt-2"><i className="mdi mdi-view-headline"></i> {t('FrequentQuestion')}</h6>
                      </div>
                      <div className="col-md-6">
                        <div className="">

                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="p-3">
                    <div className="frequent_question">
                      <Accordion defaultActiveKey="1">
                        <div className="row">


                          {/*  */}

                          {dataf.map((item,s) => {
                            return <div key={s} className="col-md-6">
                              <Accordion.Item eventKey={item.seq}>
                                <Accordion.Header>{item.question}</Accordion.Header>
                                <Accordion.Body>
                                  {item.answer}
                                </Accordion.Body>
                              </Accordion.Item></div>
                          })}

                        </div>
                      </Accordion>
                      {/*  */}





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
export default Support;