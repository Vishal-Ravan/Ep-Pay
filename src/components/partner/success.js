import React from 'react';
//import axios from "axios";
//import { Redirect } from "react-router-dom";
import { Modal} from "react-bootstrap";
import {useTranslation} from 'react-i18next'
export default function Successmsg({ msg,modal,showhide }) {
//language
const {t, i18n} = useTranslation();  

    return (
        <Modal className='modal-box modalPopupCenter successfullpopup' show={modal}>
        <Modal.Body>
            <div className="formProgress"> 
              <div className="formtopcont text-center">
                <h5 className="text-center">{msg}</h5>
                <button type="button" className="btn btn-sm savepopupbtn" onClick={showhide} >{t('OK')}</button>
              </div> 
            </div>
        </Modal.Body>
        
        
    </Modal>
    );
  }
  