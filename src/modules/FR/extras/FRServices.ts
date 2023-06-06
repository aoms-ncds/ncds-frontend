import moment from 'moment';
import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';
import { categories, purposes, sanctionedAsPers } from './FRConfig';
import axios from 'axios';
export default {

  getCount: (conditions?: unknown) => getStandardResponse<number>(axios.get('/fr/count', { params: conditions })),

  getAll: () => getStandardResponse<Frrequest[]>(
    axios.get('/fr/'),
  ),
  deleteParticulars: (particularid: string) => getStandardResponse<number>(axios.delete('/fr/particulars/' + particularid)),
  getPurposes: () => getStandardResponse<FRPurpose[]>(
    dummyRequest<FRPurpose[]>({
      data: purposes,
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 0,
    }),
  ),
  getSanctionedAsPer: () => getStandardResponse<SanctionedAsPer[]>(
    dummyRequest<SanctionedAsPer[]>({
      data: sanctionedAsPers,
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 0,
    }),
  ),

  getMainCategory: () => getStandardResponse<MainCategory[]>(
    dummyRequest<MainCategory[]>({
      data: categories,
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  addParticulars: ( particularData: CreatableParticular) => getStandardResponse<Particular>(
    axios.post('/fr/particulars', particularData),
  ),
  getById: (fRId: string) =>
    getStandardResponse<FR>(
      axios.get('/fr/' + fRId),
      (data) => ({
        ...data,
        FRdate: moment(data.FRdate),
        createdAt: moment(data.createdAt),
        updatedAt: moment(data.updatedAt),
      }),
    ),
  // createFRRequests: ( frRequest: CreatableFR) => getStandardResponse<number>(
  //   axios.post('/fr/', frRequest),
  // ),
  createFRRequests: (frRequest: CreatableFR) => {
    return getStandardResponse<CreatableFR>(
      new Promise((resolve, reject) => {
        axios
          .post('/fr/', {
            ...frRequest,
            Particulars: [],
          })
          .then(async (createdFR) => {
            // Create partcularsisions
            try {
              if (frRequest.Particulars) {
                for (let i = 0; i < frRequest.Particulars.length; i++) {
                  const partculars = frRequest.Particulars[i];
                  await axios.patch('/fr/particulars/' + partculars._id, {
                    FR: createdFR.data.data._id,
                    mainCategory: partculars.mainCategory,
                    subCategory1: partculars.subCategory1,
                    subCategory2: partculars.subCategory2,
                    subCategory3: partculars.subCategory3,
                    quantity: partculars.quantity,
                    month: partculars.month,
                    requestedAmount: partculars.requestedAmount,
                    narration: partculars.narration,
                  });
                }
              }
              resolve(createdFR);
            } catch (error) {
              reject(error);
            }
          })
          .catch(reject);
      }),
    );
  },
  getParticulars: () => getStandardResponse<Particular[]>(
    dummyRequest<Particular[]>({
      data: [{
        _id: '1',
        mainCategory: 'main',
        subCategory1: 'sub',
        subCategory2: 'sub2',
        subCategory3: 'sub3',
        quantity: '12',
        month: 'January',
        requestedAmount: '300',
        narration: 'paticularss',
      },
      {
        _id: '2',
        mainCategory: 'main',
        subCategory1: 'sub',
        subCategory2: 'sub2',
        subCategory3: 'sub3',
        quantity: '12',
        month: 'January',
        requestedAmount: '300',
        narration: 'paticularss',
      },
      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // getAllRemarksById: (frId: string)=>getStandardResponse<Remark[]>(
  //   dummyRequest<Remark[]>({
  //     data: [
  //       {
  //         _id: '1',
  //         FRno: '1234',
  //         date: moment(),
  //         purpose: 'Worker',
  //         sanctionedAmount: 43,
  //         purposeWorker: {
  //           '_id': 'sdkfj',
  //           'workerCode': 'IETWK00005',
  //           'basicDetails': {
  //             firstName: 'Jishnu',
  //             lastName: 'Raj',
  //             dateOfBirth: moment(),
  //             gender: 'Male',
  //             martialStatus: 'Unmarried',
  //             highestQualification: 'BCA Degree',
  //             motherTounge: 'Malayalam - മലയാളം',
  //             communicationLanguage: 'English',
  //             knownLanguages: [
  //               'English',
  //               'Hindi - हिन्दी',
  //               'Malayalam - മലയാളം',
  //             ],
  //             email: 'jishnurajpp2@gmail.com',
  //             phone: '07592929463',
  //             alternativePhone: '09019132589',
  //             PANNo: 'BZFPJ0166D',
  //             aadhaar: {
  //               aadhaarNo: '1234567890',
  //             },
  //             voterId: {
  //               voterIdNo: '123456',
  //             },
  //             licenseNumber: '1234567890',
  //             permanentAddress: {
  //               buildingName: 'Puliyylla Parambath',
  //               street: 'Puthukkayam, Vanimal',
  //               city: 'Kozhikode',
  //               state: 'Kerala',
  //               country: 'India',
  //               pincode: '673506',
  //             },
  //             currentOfficialAddress: {
  //               buildingName: 'Puliyylla Parambath',
  //               street: 'Puthukkayam, Vanimal',
  //               city: 'Kozhikode',
  //               state: 'Kerala',
  //               country: 'India',
  //               pincode: '673506',
  //             },
  //             residingAddress: {
  //               buildingName: 'Puliyylla Parambath',
  //               street: 'Puthukkayam, Vanimal',
  //               city: 'Kozhikode',
  //               state: 'Kerala',
  //               country: 'India',
  //               pincode: '673506',
  //             },
  //           },
  //           'officialDetails': {
  //             'dateOfJoining': moment('2022-12-31T18:30:00.000Z'),
  //             'remarks': 'Lorem ipsum dolor sit amet.',
  //             'selfSupport': true,
  //             'status': 'ministering',
  //             'dateOfDivisionJoining': moment('2023-05-19T04:32:00.077Z'),
  //             'noOfChurches': 5,
  //             'partcularsision': {
  //               _id: 'skjdfj',
  //               name: 'ksdfj',
  //             },
  //           },
  //           'supportDetails': {
  //             totalNoOfYearsInMinistry: 10,
  //             withChurch: true,
  //           },
  //           'supportStructure': {
  //           },
  //           'children': [],
  //           'createdAt': moment(),
  //           'updatedAt': moment(),
  //           'status': 100,
  //         },
  //         createdAt: moment(),
  //         updatedAt: moment(),
  //       },
  //       {
  //         _id: '2',
  //         // eslint-disable-next-line max-len
  //         remark: 'HI Hlo jhvaj hfgadkhjfga yukhj gfiuyakhfigfi  uaigqaufjuka jiuklfr you8a ruak uoahyfuioafuiafuahyfuafhuafhuiaf',
  //         createdBy: {
  //           '_id': '646703c19e433f67d27019b2',
  //           'kind': 'staff',
  //           'basicDetails': {
  //             'aadhaar': {
  //               'aadhaarNo': '123456789012',
  //             },
  //             'voterId': {
  //               'voterIdNo': 'V12345678',
  //             },
  //             'firstName': 'John',
  //             'lastName': 'Doe',
  //             'dateOfBirth': moment('2022-12-31T18:30:00.000Z'),
  //             'gender': 'Male',
  //             'field': 'Missionary',
  //             'martialStatus': 'Married',
  //             'highestQualification': 'Ph.D.',
  //             'motherTounge': 'English',
  //             'communicationLanguage': 'English',
  //             'knownLanguages': [
  //               'English',
  //               'Malayalam - മലയാളം',
  //             ],
  //             'email': 'abcd@gmail.com',
  //             'phone': '1234567890',
  //             'alternativePhone': '9876543210',
  //             'PANNo': 'ABCD1234',
  //             'licenseNumber': 'L12345678',
  //             'permanentAddress': {
  //               'buildingName': 'Puliyulla parambath',
  //               'street': '123 Main Street',
  //               'city': 'Example City',
  //               'state': 'Example State',
  //               'country': 'India',
  //               'pincode': '12345',
  //             },
  //             'currentAddress': {
  //               'buildingName': 'Puliyulla parambath',
  //               'street': '456 Elm Street',
  //               'city': 'Current City',
  //               'state': 'Current State',
  //               'country': 'India',
  //               'pincode': '54321',
  //             },
  //           },
  //           'officialDetails': {
  //             'dateOfJoining': moment('2022-12-31T18:30:00.000Z'),
  //             'remarks': 'Lorem ipsum dolor sit amet.',
  //             'selfSupport': true,
  //             'status': 'ministering',
  //             'dateOfDivisionJoining': moment('2023-05-19T04:32:00.077Z'),
  //             'noOfChurches': 5,
  //             'partcularsision': {
  //               _id: 'skjdfj',
  //               name: 'ksdfj',
  //             },
  //           },
  //           'supportDetails': {
  //             'totalNoOfYearsInMinistry': 10,
  //             'withChurch': true,
  //           },
  //           'supportStructure': {
  //             'basic': 5000,
  //             'HRA': 2000,
  //             'spouseAllowance': 1000,
  //             'positionalAllowance': 500,
  //             'specialAllowance': 800,
  //             'impactDeduction': 200,
  //             'telAllowance': 400,
  //             'PIONMissionaryFund': 300,
  //             'MUTDeduction': 100,
  //           },
  //           'createdAt': moment('2023-05-19T05:06:09.292Z'),
  //           'updatedAt': moment('2023-05-19T05:06:09.292Z'),
  //         },
  //         createdAt: moment(),
  //         updatedAt: moment(),
  //       },
  //       {
  //         _id: '3',
  //         remark: 'HI Hlo',
  //         createdBy: {
  //           '_id': '646703c19e433f67d27019b2',
  //           'kind': 'staff',
  //           'basicDetails': {
  //             'aadhaar': {
  //               'aadhaarNo': '123456789012',
  //             },
  //             'voterId': {
  //               'voterIdNo': 'V12345678',
  //             },
  //             'firstName': 'John',
  //             'lastName': 'Doe',
  //             'dateOfBirth': moment('2022-12-31T18:30:00.000Z'),
  //             'gender': 'Male',
  //             'field': 'Missionary',
  //             'martialStatus': 'Married',
  //             'highestQualification': 'Ph.D.',
  //             'motherTounge': 'English',
  //             'communicationLanguage': 'English',
  //             'knownLanguages': [
  //               'English',
  //               'Malayalam - മലയാളം',
  //             ],
  //             'email': 'abcd@gmail.com',
  //             'phone': '1234567890',
  //             'alternativePhone': '9876543210',
  //             'PANNo': 'ABCD1234',
  //             'licenseNumber': 'L12345678',
  //             'permanentAddress': {
  //               'buildingName': 'Puliyulla parambath',
  //               'street': '123 Main Street',
  //               'city': 'Example City',
  //               'state': 'Example State',
  //               'country': 'India',
  //               'pincode': '12345',
  //             },
  //             'currentAddress': {
  //               'buildingName': 'Puliyulla parambath',
  //               'street': '456 Elm Street',
  //               'city': 'Current City',
  //               'state': 'Current State',
  //               'country': 'India',
  //               'pincode': '54321',
  //             },
  //           },
  //           'officialDetails': {
  //             'dateOfJoining': moment('2022-12-31T18:30:00.000Z'),
  //             'remarks': 'Lorem ipsum dolor sit amet.',
  //             'selfSupport': true,
  //             'status': 'ministering',
  //             'dateOfDivisionJoining': moment('2023-05-19T04:32:00.077Z'),
  //             'noOfChurches': 5,
  //             'partcularsision': {
  //               _id: 'skjdfj',
  //               name: 'ksdfj',
  //             },
  //           },
  //           'supportDetails': {
  //             'totalNoOfYearsInMinistry': 10,
  //             'withChurch': true,
  //           },
  //           'supportStructure': {
  //             'basic': 5000,
  //             'HRA': 2000,
  //             'spouseAllowance': 1000,
  //             'positionalAllowance': 500,
  //             'specialAllowance': 800,
  //             'impactDeduction': 200,
  //             'telAllowance': 400,
  //             'PIONMissionaryFund': 300,
  //             'MUTDeduction': 100,
  //           },
  //           'createdAt': moment('2023-05-19T05:06:09.292Z'),
  //           'updatedAt': moment('2023-05-19T05:06:09.292Z'),
  //         },
  //         createdAt: moment(),
  //         updatedAt: moment(),
  //       },
  //       {
  //         _id: '4',
  //         remark: 'HI Hlo',
  //         createdBy: {
  //           '_id': '646703c19e433f67d27019b2',
  //           'kind': 'staff',
  //           'basicDetails': {
  //             'aadhaar': {
  //               'aadhaarNo': '123456789012',
  //             },
  //             'voterId': {
  //               'voterIdNo': 'V12345678',
  //             },
  //             'firstName': 'John',
  //             'lastName': 'Doe',
  //             'dateOfBirth': moment('2022-12-31T18:30:00.000Z'),
  //             'gender': 'Male',
  //             'field': 'Missionary',
  //             'martialStatus': 'Married',
  //             'highestQualification': 'Ph.D.',
  //             'motherTounge': 'English',
  //             'communicationLanguage': 'English',
  //             'knownLanguages': [
  //               'English',
  //               'Malayalam - മലയാളം',
  //             ],
  //             'email': 'abcd@gmail.com',
  //             'phone': '1234567890',
  //             'alternativePhone': '9876543210',
  //             'PANNo': 'ABCD1234',
  //             'licenseNumber': 'L12345678',
  //             'permanentAddress': {
  //               'buildingName': 'Puliyulla parambath',
  //               'street': '123 Main Street',
  //               'city': 'Example City',
  //               'state': 'Example State',
  //               'country': 'India',
  //               'pincode': '12345',
  //             },
  //             'currentAddress': {
  //               'buildingName': 'Puliyulla parambath',
  //               'street': '456 Elm Street',
  //               'city': 'Current City',
  //               'state': 'Current State',
  //               'country': 'India',
  //               'pincode': '54321',
  //             },
  //           },
  //           'officialDetails': {
  //             'dateOfJoining': moment('2022-12-31T18:30:00.000Z'),
  //             'remarks': 'Lorem ipsum dolor sit amet.',
  //             'selfSupport': true,
  //             'status': 'ministering',
  //             'dateOfDivisionJoining': moment('2023-05-19T04:32:00.077Z'),
  //             'noOfChurches': 5,
  //             'partcularsision': {
  //               _id: 'skjdfj',
  //               name: 'ksdfj',
  //             },
  //           },
  //           'supportDetails': {
  //             'totalNoOfYearsInMinistry': 10,
  //             'withChurch': true,
  //           },
  //           'supportStructure': {
  //             'basic': 5000,
  //             'HRA': 2000,
  //             'spouseAllowance': 1000,
  //             'positionalAllowance': 500,
  //             'specialAllowance': 800,
  //             'impactDeduction': 200,
  //             'telAllowance': 400,
  //             'PIONMissionaryFund': 300,
  //             'MUTDeduction': 100,
  //           },
  //           'createdAt': moment('2023-05-19T05:06:09.292Z'),
  //           'updatedAt': moment('2023-05-19T05:06:09.292Z'),
  //         },
  //         createdAt: moment(),
  //         updatedAt: moment(),
  //       },
  //     ],
  //     message: 'fetched data',
  //     result: 'success',
  //     timeout: 0,
  //   }),
  // ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAllRemarksById: (frId: string) =>
    getStandardResponse<Remark[]>(
      dummyRequest<Remark[]>({
        data: [
          {
            _id: '1',
            remark: 'HI Hlo',
            createdBy: {
              _id: '646703c19e433f67d27019b2',
              workerCode: '',
              basicDetails: {
                aadhaar: {
                  aadhaarNo: '123456789012',
                },
                voterId: {
                  voterIdNo: 'V12345678',
                },
                firstName: 'John',
                lastName: 'Doe',
                dateOfBirth: moment('2022-12-31T18:30:00.000Z'),
                gender: 'Male',
                field: 'Missionary',
                martialStatus: 'Married',
                highestQualification: 'Ph.D.',
                motherTongue: 'English',
                communicationLanguage: 'English',
                knownLanguages: ['English', 'Malayalam - മലയാളം'],
                email: 'abcd@gmail.com',
                phone: '1234567890',
                alternativePhone: '9876543210',
                PANNo: 'ABCD1234',
                licenseNumber: 'L12345678',
                permanentAddress: {
                  buildingName: 'Puliyulla parambath',
                  street: '123 Main Street',
                  city: 'Example City',
                  state: 'Example State',
                  country: 'India',
                  pincode: '12345',
                },
                currentOfficialAddress: {
                  buildingName: 'Puliyulla parambath',
                  street: '456 Elm Street',
                  city: 'Current City',
                  state: 'Current State',
                  country: 'India',
                  pincode: '54321',
                },
                residingAddress: {
                  buildingName: 'Puliyulla parambath',
                  street: '456 Elm Street',
                  city: 'Current City',
                  state: 'Current State',
                  country: 'India',
                  pincode: '54321',
                },
              },
              officialDetails: {
                dateOfJoining: moment('2022-12-31T18:30:00.000Z'),
                remarks: 'Lorem ipsum dolor sit amet.',
                selfSupport: true,
                status: 'Ministering',
                divisionHistory: [],
                noOfChurches: 5,
              },
              supportDetails: {
                totalNoOfYearsInMinistry: 10,
                withChurch: true,
              },
              supportStructure: {
                basic: 5000,
                HRA: 2000,
                spouseAllowance: 1000,
                positionalAllowance: 500,
                specialAllowance: 800,
                impactDeduction: 200,
                telAllowance: 400,
                PIONMissionaryFund: 300,
                MUTDeduction: 100,
              },
              children: [],
              createdAt: moment('2023-05-19T05:06:09.292Z'),
              updatedAt: moment('2023-05-19T05:06:09.292Z'),
            },
            createdAt: moment(),
            updatedAt: moment(),
          },
          {
            _id: '2',
            // eslint-disable-next-line max-len
            remark:
              'HI Hlo jhvaj hfgadkhjfga yukhj gfiuak uoahyfuioafuiafuahyfuafhuafhuiaf',
            createdBy: {
              _id: '646703c19e433f67d27019b2',
              workerCode: '',
              basicDetails: {
                aadhaar: {
                  aadhaarNo: '123456789012',
                },
                voterId: {
                  voterIdNo: 'V12345678',
                },
                firstName: 'John',
                lastName: 'Doe',
                dateOfBirth: moment('2022-12-31T18:30:00.000Z'),
                gender: 'Male',
                field: 'Missionary',
                martialStatus: 'Married',
                highestQualification: 'Ph.D.',
                motherTongue: 'English',
                communicationLanguage: 'English',
                knownLanguages: ['English', 'Malayalam - മലയാളം'],
                email: 'abcd@gmail.com',
                phone: '1234567890',
                alternativePhone: '9876543210',
                PANNo: 'ABCD1234',
                licenseNumber: 'L12345678',
                permanentAddress: {
                  buildingName: 'Puliyulla parambath',
                  street: '123 Main Street',
                  city: 'Example City',
                  state: 'Example State',
                  country: 'India',
                  pincode: '12345',
                },
                currentOfficialAddress: {
                  buildingName: 'Puliyulla parambath',
                  street: '456 Elm Street',
                  city: 'Current City',
                  state: 'Current State',
                  country: 'India',
                  pincode: '54321',
                },
                residingAddress: {
                  buildingName: 'Puliyulla parambath',
                  street: '456 Elm Street',
                  city: 'Current City',
                  state: 'Current State',
                  country: 'India',
                  pincode: '54321',
                },
              },
              officialDetails: {
                dateOfJoining: moment('2022-12-31T18:30:00.000Z'),
                remarks: 'Lorem ipsum dolor sit amet.',
                selfSupport: true,
                status: 'Ministering',
                divisionHistory: [],
                noOfChurches: 5,
              },
              supportDetails: {
                totalNoOfYearsInMinistry: 10,
                withChurch: true,
              },
              supportStructure: {
                basic: 5000,
                HRA: 2000,
                spouseAllowance: 1000,
                positionalAllowance: 500,
                specialAllowance: 800,
                impactDeduction: 200,
                telAllowance: 400,
                PIONMissionaryFund: 300,
                MUTDeduction: 100,
              },
              children: [],
              createdAt: moment('2023-05-19T05:06:09.292Z'),
              updatedAt: moment('2023-05-19T05:06:09.292Z'),
            },
            createdAt: moment(),
            updatedAt: moment(),
          },
          {
            _id: '3',
            remark: 'HI Hlo',
            createdBy: {
              _id: '646703c19e433f67d27019b2',
              workerCode: '',
              basicDetails: {
                aadhaar: {
                  aadhaarNo: '123456789012',
                },
                voterId: {
                  voterIdNo: 'V12345678',
                },
                firstName: 'John',
                lastName: 'Doe',
                dateOfBirth: moment('2022-12-31T18:30:00.000Z'),
                gender: 'Male',
                field: 'Missionary',
                martialStatus: 'Married',
                highestQualification: 'Ph.D.',
                motherTongue: 'English',
                communicationLanguage: 'English',
                knownLanguages: ['English', 'Malayalam - മലയാളം'],
                email: 'abcd@gmail.com',
                phone: '1234567890',
                alternativePhone: '9876543210',
                PANNo: 'ABCD1234',
                licenseNumber: 'L12345678',
                permanentAddress: {
                  buildingName: 'Puliyulla parambath',
                  street: '123 Main Street',
                  city: 'Example City',
                  state: 'Example State',
                  country: 'India',
                  pincode: '12345',
                },
                currentOfficialAddress: {
                  buildingName: 'Puliyulla parambath',
                  street: '456 Elm Street',
                  city: 'Current City',
                  state: 'Current State',
                  country: 'India',
                  pincode: '54321',
                },
                residingAddress: {
                  buildingName: 'Puliyulla parambath',
                  street: '456 Elm Street',
                  city: 'Current City',
                  state: 'Current State',
                  country: 'India',
                  pincode: '54321',
                },
              },
              officialDetails: {
                dateOfJoining: moment('2022-12-31T18:30:00.000Z'),
                remarks: 'Lorem ipsum dolor sit amet.',
                selfSupport: true,
                status: 'Ministering',
                divisionHistory: [],
                noOfChurches: 5,
              },
              supportDetails: {
                totalNoOfYearsInMinistry: 10,
                withChurch: true,
              },
              supportStructure: {
                basic: 5000,
                HRA: 2000,
                spouseAllowance: 1000,
                positionalAllowance: 500,
                specialAllowance: 800,
                impactDeduction: 200,
                telAllowance: 400,
                PIONMissionaryFund: 300,
                MUTDeduction: 100,
              },
              children: [],
              createdAt: moment('2023-05-19T05:06:09.292Z'),
              updatedAt: moment('2023-05-19T05:06:09.292Z'),
            },
            createdAt: moment(),
            updatedAt: moment(),
          },
          {
            _id: '4',
            remark: 'HI Hlo',
            createdBy: {
              _id: '646703c19e433f67d27019b2',
              workerCode: '',
              basicDetails: {
                aadhaar: {
                  aadhaarNo: '123456789012',
                },
                voterId: {
                  voterIdNo: 'V12345678',
                },
                firstName: 'John',
                lastName: 'Doe',
                dateOfBirth: moment('2022-12-31T18:30:00.000Z'),
                gender: 'Male',
                field: 'Missionary',
                martialStatus: 'Married',
                highestQualification: 'Ph.D.',
                motherTongue: 'English',
                communicationLanguage: 'English',
                knownLanguages: ['English', 'Malayalam - മലയാളം'],
                email: 'abcd@gmail.com',
                phone: '1234567890',
                alternativePhone: '9876543210',
                PANNo: 'ABCD1234',
                licenseNumber: 'L12345678',
                permanentAddress: {
                  buildingName: 'Puliyulla parambath',
                  street: '123 Main Street',
                  city: 'Example City',
                  state: 'Example State',
                  country: 'India',
                  pincode: '12345',
                },
                currentOfficialAddress: {
                  buildingName: 'Puliyulla parambath',
                  street: '456 Elm Street',
                  city: 'Current City',
                  state: 'Current State',
                  country: 'India',
                  pincode: '54321',
                },
                residingAddress: {
                  buildingName: 'Puliyulla parambath',
                  street: '456 Elm Street',
                  city: 'Current City',
                  state: 'Current State',
                  country: 'India',
                  pincode: '54321',
                },
              },
              officialDetails: {
                dateOfJoining: moment('2022-12-31T18:30:00.000Z'),
                remarks: 'Lorem ipsum dolor sit amet.',
                selfSupport: true,
                status: 'Ministering',
                divisionHistory: [],
                noOfChurches: 5,
              },
              supportDetails: {
                totalNoOfYearsInMinistry: 10,
                withChurch: true,
              },
              supportStructure: {
                basic: 5000,
                HRA: 2000,
                spouseAllowance: 1000,
                positionalAllowance: 500,
                specialAllowance: 800,
                impactDeduction: 200,
                telAllowance: 400,
                PIONMissionaryFund: 300,
                MUTDeduction: 100,
              },
              children: [],
              createdAt: moment('2023-05-19T05:06:09.292Z'),
              updatedAt: moment('2023-05-19T05:06:09.292Z'),
            },
            createdAt: moment(),
            updatedAt: moment(),
          },
        ],
        message: 'fetched data',
        result: 'success',
        timeout: 0,
      }),
    ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addRemarks: (remark: CreatableRemark) =>
    getStandardResponse<Remark>(
      axios.post('/fr/remarks', {
        ...remark,
        createdBy: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null,
      }),
    ),

  updateFRRequests: (frID: string, frRequest: CreatableFR) => {
    return getStandardResponse<CreatableFR>(
      new Promise((resolve, reject) => {
        console.log(frRequest);
        axios
          .patch('/fr/' + frID, {
            ...frRequest,
            particulars: [],
          })
          .then(async (updatedFR) => {
            try {
              if (frRequest.Particulars) {
                for (let i = 0; i < frRequest.Particulars.length; i++) {
                  const partculars = frRequest.Particulars[i];
                  await axios.patch('/fr/particulars/' + partculars._id, {
                    FR: updatedFR.data.data._id,
                    mainCategory: partculars.mainCategory,
                    subCategory1: partculars.subCategory1,
                    subCategory2: partculars.subCategory2,
                    subCategory3: partculars.subCategory3,
                    quantity: partculars.quantity,
                    month: partculars.month,
                    requestedAmount: partculars.requestedAmount,
                    narration: partculars.narration,
                  });
                }
              }
              resolve(updatedFR); // Resolve with the updated division
            } catch (error) {
              reject(error);
            }
          })
          .catch(reject);
      }),
    );
  },

  manageFRRequests: (frID: string, operation:string, frRequest: CreatableFR) => {
    return getStandardResponse<CreatableFR>(
      new Promise((resolve, reject) => {
        console.log(frRequest);
        axios
          .patch('/fr/' + frID+'/'+operation, {
            ...frRequest,
          })
          .then(async (updatedFR) => {
            resolve(updatedFR);
          })
          .catch(reject);
      }),
    );
  },


};
