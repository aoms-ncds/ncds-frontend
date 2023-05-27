import moment from 'moment';
import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { FilterQuery } from 'mongoose';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (cred: LoginCredentials) => getStandardResponse<LoginResponse>(
    dummyRequest<LoginResponse>({
      data: {
        token: 'skdfksj',
        user: {

          '_id': '646703c19e433f67d27019b2',
          'workerCode': '',
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
            'field': 'Missionary',
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
            'offiStatus': 'Ministering',
            'dateOfDivisionJoining': moment('2023-05-19T04:32:00.077Z'),
            'noOfChurches': 5,
            'subdivision': {
              _id: 'skjdfj',
              name: 'ksdfj',
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

  getAll: (conditions?: FilterQuery<User>): Promise<StandardResponse<User[]>> =>
    getStandardResponse<User[]>(axios.get('/users', { params: {
      filterQuery: JSON.stringify(conditions),
    } }), (users) =>
      users.map((user: any) => ({
        ...user,
        basicDetails: {
          ...user.basicDetails,
          dateOfBirth: moment(user.basicDetails.dateOfBirth),
        },
        officialDetails: {
          ...user.officialDetails,
          dateOfJoining: moment(user.basicDetails.dateOfJoining),
        },
        createdAt: moment(user.createdAt),
        updatedAt: moment(user.updatedAt),
      })),
    ),
};
