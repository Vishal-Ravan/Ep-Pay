import React, { useState } from 'react';
//import axios from "axios";
import { Link } from "react-router-dom";
import logo from '../../assets/img/logo-white.png';
import profile_img from '../../assets/img/avatar.jpg';
import '../../assets/css/partner_style.css';
import { useTranslation } from 'react-i18next';


function Header() {
  let role = localStorage.getItem("role");

  const logout = () => {
    sessionStorage.removeItem('isLoggedIn');
    localStorage.clear();
    window.location.href = '/epay';
  }

  let display_name = localStorage.getItem("display_name");
  // custom js
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showinfo, setIsShownInfo] = useState(false);
  const [showinfos, setIsShownInfos] = useState(false);

  const showHideUserMenu = () => {
    setShowUserMenu(!showUserMenu)
  }

  const { t, i18n } = useTranslation();

  return (
    <header className="topbaar">
      <div className="container-fluid">
        <div className="logosection">
          <div className="d-flex justify-content-between">
            <div className="logobrand">
              {role == 2 &&
                <Link to="/dashboard"><img src={logo} alt="logo" /> </Link>
              }
              {role == 3 &&
                <Link to="/Customer_Dashboard"><img src={logo} alt="logo" /> </Link>
              }
              {role == 1 &&
                <Link to="/Admin_Dashboard"><img src={logo} alt="logo" /> </Link>
              }
            </div>
            <div className="navigationbg pt-2">
              <div className="container">
                <div className="main_navbg">
                  <nav className="navbar navbar-expand-lg">
                    <div className="">
                      <a className="nav-link d-xl-none d-lg-none text-body p-0 menuBtn" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <div className="sidenav-toggler-inner">
                          <i className="sidenav-toggler-line"></i>
                          <i className="sidenav-toggler-line"></i>
                          <i className="sidenav-toggler-line"></i>
                        </div>
                      </a>
                      <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav main_menu">
                          <li onMouseEnter={() => { setIsShownInfo(true) }} onMouseLeave={() => { setIsShownInfo(false) }} className="nav-item dropdown dropdown_position">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"><i className="mdi mdi-human-male-board"></i> {t('Management')}</a>
                            {
                              (showinfo === true) ?
                                (role == 2) ?
                                  <ul className="dropdown-menu drpmenu">
                                    {/* partner */}
                                    <li><Link className="dropdown-item" to="/information">{t('Information')}</Link></li>
                                    <li><Link className="dropdown-item" to="/membership-card">{t('MembershipCard')}</Link></li>
                                    <li><Link className="dropdown-item" to="/Kiosk-management">{t('KioskManagement')}</Link></li>
                                    {/* partner */}
                                  </ul> :
                                  /* Customer */
                                  (role == 3) ?
                                    <ul className="dropdown-menu drpmenu">
                                      <li><Link className="dropdown-item" to="/CustomerInformation">{t('Information')}</Link></li>
                                      <li><Link className="dropdown-item" to="/Kiosk">{t('Kiosk')}</Link></li>
                                    </ul>
                                    /* Customer */
                                    :
                                    /* Admin */
                                    <ul className="dropdown-menu drpmenu">
                                      <li><Link className="dropdown-item" to="/Partner">{t('Partner')}</Link></li>
                                      <li><Link className="dropdown-item" to="/Customer">{t('Customer')}</Link></li>
                                      <li><Link className="dropdown-item" to="/PayReader">{t('Payreader')}</Link></li>
                                      <li><Link className="dropdown-item" to="/Kiosks">{t('Kiosk')}</Link></li>
                                      <li><Link className="dropdown-item" to="/Managementmembershipcard">{t('MembershipCard')}</Link></li>
                                      <li><Link className="dropdown-item" to="/Loginuser">{t('LoginUser')}</Link></li>
                                    </ul>
                                /* Admin */
                                : ''
                            }
                          </li>
                          {role == 2 &&
                            <li className="nav-item"> <Link className="nav-link" to="/Byday"><i className="mdi mdi-calendar-check"></i> {t('ByDate')}</Link> </li>
                          }
                          {role == 2 &&
                            <li className="nav-item"> <Link className="nav-link" to="/Byjob"><i className="mdi mdi-card-bulleted-outline"></i> {t('DetailsByCase')}</Link> </li>
                          }
                          {role == 2 &&
                            <li className="nav-item"> <Link className="nav-link" to="/ByMFCard"><i className="mdi mdi-home-outline"></i> {t('MembershipCard')}</Link> </li>
                          }
                          {role == 2 &&
                            <li className="nav-item"> <Link className="nav-link" to="/Printer"><i className="mdi mdi-printer"></i> {t('Printer')}</Link> </li>
                          }
                          {role == 2 &&
                            <li className="nav-item"> <Link className="nav-link" to="/Support"><i className="mdi mdi-home-outline"></i> {t('Support')}</Link> </li>
                          }
                          {/*customer */}
                          {role == 3 &&
                            <li className="nav-item"> <Link className="nav-link" to="/Salesinformationbydate"><i className="mdi mdi-calendar-check"></i> {t('ByDate')}</Link> </li>
                          }
                          {role == 3 &&
                            <li className="nav-item"> <Link className="nav-link" to="/Detailsbyperiod"><i className="mdi mdi-card-bulleted-outline"></i> {t('DetailsByCase')} </Link> </li>
                          }
                          {role == 3 &&
                            <li className="nav-item"> <Link className="nav-link" to="/Customerprinter"><i className="mdi mdi-printer"></i> {t('Printer')}</Link> </li>
                          }
                          {role == 3 &&
                            <li className="nav-item"> <Link className="nav-link" to="/Support"><i className="mdi mdi-account-settings-outline"></i> {t('Support')}</Link> </li>
                          }
                          {/* admin */}
                          {role == 1 &&
                            <li className="nav-item"><Link className="nav-link" to="/Sales_by_day"><i className="mdi mdi-sale"></i> {t('SalesByDay')}</Link></li>
                          }
                          {role == 1 &&
                            <li className="nav-item"><Link className="nav-link" to="/Details_by_case"><i className="mdi mdi-briefcase-edit-outline"></i> {t('DetailsByCase')}</Link></li>
                          }
                          {role == 1 &&
                            <li className="nav-item"><Link className="nav-link" to="/Membership_card"><i className="mdi mdi-card-account-details-outline"></i> {t('MembershipCard')}</Link></li>
                          }
                          {role == 1 &&
                            <li className="nav-item"><Link className="nav-link" to="/Adminprinter"><i className="mdi mdi-printer-outline"></i> {t('Printer')}</Link></li>
                          }
                          {role == 1 &&
                            <li onMouseEnter={() => setIsShownInfos(true)} onMouseLeave={() => setIsShownInfos(false)} className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle moreOption" role="button" data-bs-toggle="dropdown"><i className="mdi mdi-human-male-board"></i> {t('More')}</a>
                              <ul className="dropdown-menu drpmenu showMoreOnHover" style={{ display: `${showinfos ? 'block' : 'none'}` }}>
                                <li><Link className="dropdown-item" to="/SetReader">{t('TerminalSettings')}</Link></li>
                                {/* <li><Link className="dropdown-item" to="/Customer">{t('Payment')}</Link></li> */}
                                <li><Link className="dropdown-item" to="/AdminSupport">{t('Support')}</Link></li>
                              </ul>
                            </li>
                          }
                        </ul>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div className="mainProfile">
              <ul className="navbar-nav  justify-content-end">
                <li onMouseEnter={() => { showHideUserMenu(true) }} onMouseLeave={() => { showHideUserMenu(false) }} className="nav-item dropdown adminProfile pe-2 d-flex align-items-center">
                  <a className="nav-link d-flex p-0 dropdown-toggle" id="dropdownSettingButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="profileImg"><img src={profile_img} alt='1' /></span>
                    <span className="proName">{display_name}</span>
                  </a>
                  {
                    (showUserMenu === true) ?
                      <ul className="dropdown-menu  dropdown-menu-end me-sm-n4" aria-labelledby="dropdownSettingButton">
                        {/* <li className="profiledropMenu"> <Link className="dropdown-item border-radius-md" to="#!"> User Info  </Link> </li>   */}
                        <li className="profiledropMenu"> <Link className="dropdown-item border-radius-md" to="/SetPassword"> {t('SetPassword')}  </Link> </li>
                        <li className="profiledropMenu"> <a className="dropdown-item border-radius-md" onClick={logout}> {t('Logout')}  </a> </li>
                      </ul> : ''
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;