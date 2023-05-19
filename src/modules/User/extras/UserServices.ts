import moment from 'moment';
import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (cred: LoginCredentials) => getStandardResponse<LoginResponse>(
    dummyRequest<LoginResponse>({
      data: {
        token: 'skdfksj',
        user: {
          '_id': '646703c19e433f67d27019b2',
          'workerCode': '22',
          'basicDetails': {
            'aadhaar': {
              'aadhaarNo': '123456789012',
            },
            'voterId': {
              'voterIdNo': 'V12345678',
            },
            'firstName': 'John',
            'lastName': 'Doe',
            'dateOfBirth': moment('2022-12-31T18:30:00.000Z'),
            'gender': 'Male',
            'field': 'missionary',
            'martialStatus': 'Married',
            'highestQualification': 'Ph.D.',
            'motherTounge': 'English',
            'communicationLanguage': 'English',
            'knownLanguages': [
              'English',
              'Malayalam - മലയാളം',
            ],
            'email': 'abcd@gmail.com',
            'phone': '1234567890',
            'alternativePhone': '9876543210',
            'PANNo': 'ABCD1234',
            'licenseNumber': 'L12345678',
            'permanentAddress': {
              'buildingName': 'Puliyulla parambath',
              'street': '123 Main Street',
              'city': 'Example City',
              'state': 'Example State',
              'country': 'India',
              'pincode': '12345',
            },
            'currentAddress': {
              'buildingName': 'Puliyulla parambath',
              'street': '456 Elm Street',
              'city': 'Current City',
              'state': 'Current State',
              'country': 'India',
              'pincode': '54321',
            },
          },
          'officialDetails': {
            'dateOfJoining': moment('2022-12-31T18:30:00.000Z'),
            'remarks': 'Lorem ipsum dolor sit amet.',
            'selfSupport': true,
            'status': 'ministering',
            'dateOfDivisionJoining': moment('2023-05-19T04:32:00.077Z'),
            'noOfChurches': 5,
            'subdivision': {
              _id: 'skjdfj',
              subDivisionName: 'ksdfj',
            },
          },
          'supportDetails': {
            'totalNoOfYearsInMinistry': 10,
            'withChurch': true,
          },
          'supportStructure': {
            'basic': 5000,
            'HRA': 2000,
            'spouseAllowance': 1000,
            'positionalAllowance': 500,
            'specialAllowance': 800,
            'impactDeduction': 200,
            'telAllowance': 400,
            'PIONMissionaryFund': 300,
            'MUTDeduction': 100,
          },
          'createdAt': moment('2023-05-19T05:06:09.292Z'),
          'updatedAt': moment('2023-05-19T05:06:09.292Z'),
        },
      },
      message: 'Successfully logged in!',
      result: 'success',
      timeout: 500,
    }),
    // axios.post('/users/login'),
  ),
  creates: (staff: CreatableNewUser) => {
    return getStandardResponse<CreatableStaff>(
      axios.post('/hr/staffs', staff),
    );
  },
  edit: (staff: CreatableNewUser) => {
    return getStandardResponse<CreatableStaff>(
      axios.patch('/hr/staffs/'+staff._id, staff),
    );
  },
  getAll: () => getStandardResponse<User[]>(
    axios.get('/hr/staffs'),
    (users) => users.map((item: any) => ({
      ...item,
      basicDetails: {
        ...item.basicDetails,
        dateOfBirth: moment(item.basicDetails.dateOfBirth),
      },
      officialDetails: {
        ...item.officialDetails,
        dateOfJoining: moment(item.basicDetails.dateOfJoining),
      },
      createdAt: moment(item.createdAt),
      updatedAt: moment(item.updatedAt),
    })),
  ),
  getById: (workerId: string) => getStandardResponse<User|null>(
    axios.get(`/hr/staffs/${workerId}`),
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
  getDesignations: () => getStandardResponse<[]>(
    axios.get('/hr/designations'),
  ),
};
