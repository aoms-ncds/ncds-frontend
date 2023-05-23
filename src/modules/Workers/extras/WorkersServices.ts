import moment from 'moment';
import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { CreatableSpouse, Spouse } from './SpouseTypes';
import { CreatableChild } from './ChildTypes';
import { CreatableIWorker, IWorker } from './WorkersTypes';

export default {
  getCount: () => getStandardResponse<number>(
    axios.get('/hr/staffs/count'),
  ),
  getById: (workerId: string) => getStandardResponse<IWorker|null>(
    axios.get(`/workers/${workerId}`),
    (data) =>({
      ...data,
      basicDetails: {
        ...data.basicDetails,
        dateOfBirth: moment(data.basicDetails.dateOfBirth),
      },
      officialDetails: {
        ...data.officialDetails,
        dateOfJoining: moment(data.basicDetails.dateOfJoining),
      },
      createdAt: moment(data.createdAt),
      updatedAt: moment(data.updatedAt),
    }),
  ),
  create: (staff: CreatableIWorker) => {
    return getStandardResponse<IWorker>(
      axios.post('/hr/staffs', staff),
    );
  },
  edit: (staff: CreatableIWorker) => {
    return getStandardResponse<IWorker>(
      axios.patch('/hr/staffs/'+staff._id, staff),
    );
  },
  approve: ( id:string) => getStandardResponse<number>(
    dummyRequest({
      data: id,
      // error: null,
      message: 'Approved',
      result: 'success',
      timeout: 500,
    }),
  ),
  delete: ( workerId: string) => getStandardResponse<number>(
    dummyRequest({
      data: workerId,
      // error: null,
      message: 'deleted',
      result: 'success',
      timeout: 500,
    }),
  ),
  getChild: () => getStandardResponse<[]>(
    dummyRequest({
      data: [
        {
          _id: '1',
          type: 'New',
          firstName: 'Neha',
          lastName: 'Thomas',
          dob: moment(),
          childSupport: 'Level 1',
          childOf: { _id: 1,
            workerCode: '111',
            firstName: 'Athira',
            lastName: 'Haridas',
            missionaryOrNonMissionary: '',
            dob: moment(),
            gender: 'Female',
            age: '',
            maritalStatus: '',
            highestQualification: '',
            motherToungue: '',
            communicationLanguage: '',
            languagesKnown: [],
            email: 'athiraharidas@gmail.com',
            phone: '7592099483',
            alternativeMobileNumber: '',
            PANnumber: '',
            aadhaarNumber: '',
            voterId: '',
            licenseNumber: '',
            permanentAddress: 'Kottappady(H)',
            permanentAddressCity: 'Thodupuzha',
            permanentAddressDistrict: 'Idukki',
            permanentAddressState: 'Kerala',
            permanentAddressCountry: 'India',
            permanentAddressPincode: '685581',
            currentAddress: 'Kottappady(H)',
            currentAddressCity: 'Thodupuzha',
            currentAddressDistrict: 'Idukki',
            currentAddressState: 'Kerala',
            currentAddressCountry: 'India',
            currentAddressPincode: '685581',
            spouseOfAnotherStaff: '' },
          studying: false,
          classOfStudy: '',
          working: false,
          occupation: '',
          qualification: '' },
      ],
      // error: null,
      message: 'Network Error',
      result: 'success',
      timeout: 500,
    }),
  ),
  addChild: (action: string ) => getStandardResponse<number>(
    dummyRequest({
      data: 1,
      // error: null,
      message: action+'ed Child',
      result: 'success',
      timeout: 500,
    }),
  ),
  getChildById: (childId: string) => getStandardResponse<CreatableChild>(
    dummyRequest<CreatableChild>({
      data: {
        type: 'New',
        firstName: 'Neha',
        lastName: 'Thomas',
        dob: moment(),
        childSupport: 'Level 1',
        childOf: { _id: '',
          workerCode: '',
          firstName: '',
          lastName: '',
          missionaryOrNonMissionary: 'missionary',
          dob: moment(),
          gender: 'Male',
          age: 0,
          maritalStatus: 'Unmarried',
          highestQualification: '',
          motherToungue: 'Malayalam - മലയാളം',
          communicationLanguage: 'Malayalam - മലയാളം',
          languagesKnown: [],
          email: '',
          phone: '',
          alternativeMobileNumber: '',
          PANNo: 'string',
          aadhaar: { aadhaarFile: {
            _id: '',
            name: '',
            size: 0,
            type: 'image/png',
            storage: 'Drive',
            fileId: '',
            downloadURL: null,
            private: false,
            createdAt: moment(),
            updatedAt: moment(),
          }, aadhaarNo: '467389' },

          voterId: { voterIdFile: {
            _id: '',
            name: '',
            size: 0,
            type: 'image/png',
            storage: 'Drive',
            fileId: '',
            downloadURL: null,
            private: false,
            createdAt: moment(),
            updatedAt: moment(),
          }, voterIdNo: '467389' },
          licenseNumber: '',
          permanentAddress: {
            buildingName: '',
            street: '',
            city: '',
            district: '',
            state: '',
            country: '',
            pincode: '',
          },
          currentAddress: {
            buildingName: '',
            street: '',
            city: '',
            district: '',
            state: '',
            country: '',
            pincode: '',
          },
          createdAt: moment(),
          updatedAt: moment(),
        },
        studying: true,
        classOfStudy: '',
        working: false,
        occupation: '',
        qualification: '',

      },
      // error: null,
      message: 'Approved',
      result: 'success',
      timeout: 500,
    }),
  ),
  editChild: (action: string ) => getStandardResponse<number>(
    dummyRequest({
      data: 1,
      // error: null,
      message: action+'ed Child',
      result: 'success',
      timeout: 500,
    }),
  ),
  getSpouse: () => getStandardResponse<Spouse[]>(
    axios.get('/workers/spouse/'),
  ),
  addSpouse: (spouse: Spouse ) => getStandardResponse<number>(
    axios.post('/workers/spouses', spouse),
  ),
  editSpouse: () => getStandardResponse<number>(
    axios.patch('/workers/spouses'),
  ),

  getSpouseById: (spouseId: string) => getStandardResponse<CreatableSpouse>(
    axios.get(`/workers/spouses${spouseId}`),
  ),

};
