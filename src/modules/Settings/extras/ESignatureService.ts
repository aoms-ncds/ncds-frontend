import { TypeObject } from '@mui/material/styles/createPalette';
import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {
  addESignatureS1: ( signature: Esignature ) => getStandardResponse(
    axios.patch('/settings/esignature/', { s1: signature }, { headers: { ...getAuthHeader() } },
    ),
  ),
  addESignatureS2: ( signature: Esignature ) => getStandardResponse(
    axios.patch('/settings/esignature/', { s2: signature }, { headers: { ...getAuthHeader() } },
    ),
  ),
  addESignatureS3: ( signature: Esignature ) => getStandardResponse(
    axios.patch('/settings/esignature/', { s3: signature }, { headers: { ...getAuthHeader() } },
    ),
  ),
  addOfficeMnrName: ( data:string ) => getStandardResponse(
    axios.patch('/settings/esignature/officeMngrName', { name: data }, { headers: { ...getAuthHeader() } },
    ),
  ),
  addPresidentName: ( data:string ) => getStandardResponse(
    axios.patch('/settings/esignature/presidentName', { name: data }, { headers: { ...getAuthHeader() } },
    ),
  ),
  addPreOfficeMnrName: ( data:string ) => getStandardResponse(
    axios.patch('/settings/esignature/prevOfficeMngrName', { prevName: data }, { headers: { ...getAuthHeader() } },
    ),
  ),
  addOfficeMnrEmail: ( data:string ) => getStandardResponse(
    axios.patch('/settings/esignature/presidentEMail', { email: data }, { headers: { ...getAuthHeader() } },
    ),
  ),
  getESignature: () => getStandardResponse(
    axios.get('/settings/esignature/', { headers: { ...getAuthHeader() } },
    ),
  ),
  removeESignature: (signatureType: 'officeManagerSignature') => getStandardResponse(
    axios.patch(`/settings/esignature/${signatureType}/remove/`, null, { headers: { ...getAuthHeader() } },
    ),
  ),
  removePreESignature: (signatureType: 'prevOfficeManagerSignature') => getStandardResponse(
    axios.patch(`/settings/esignature/${signatureType}/remove/`, null, { headers: { ...getAuthHeader() } },
    ),
  ),
  removeESignaturepr: (signatureType: 'presidentSignature') => getStandardResponse(
    axios.patch(`/settings/esignature/${signatureType}/remove/`, null, { headers: { ...getAuthHeader() } },
    ),
  ),
};

