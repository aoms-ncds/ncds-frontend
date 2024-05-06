import { TypeObject } from '@mui/material/styles/createPalette';
import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {
  addESignature: ( signature: Esignature ) => getStandardResponse(
    axios.patch('/settings/esignature/', signature, { headers: { ...getAuthHeader() } },
    ),
  ),
  addOfficeMnrName: ( data:string ) => getStandardResponse(
    axios.patch('/settings/esignature/officeMngrName', { name: data }, { headers: { ...getAuthHeader() } },
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
  removeESignaturepr: (signatureType: 'presidentSignature') => getStandardResponse(
    axios.patch(`/settings/esignature/${signatureType}/remove/`, null, { headers: { ...getAuthHeader() } },
    ),
  ),
};

