import { FRPurpose, SanctionedAsPer } from './FRTypes';

export const categories = [
  {
    name: 'Maintenance Of Priest &  Preachers',
    subcategory1: [
      {
        name: 'Support',
        subcategory2: [
          {
            name: 'Worker',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the support of (No: of workers) of (Division Name) for the month of (mon, year)',
              },
            ],
          },
          {
            name: 'Office Assistant',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the support of office assistant Mr/Ms/Mrs (Name) of (Division) for the month of (mon,year)',
              },
            ],
          },
          {
            name: 'Prayer Group Staff',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the support of Mr/Ms/Mrs (Name) (Prayer group) for the month of (mon,year)',
              },
            ],
          },
          {
            name: 'Promotional Office Staff ',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the Monthly Support of Promotional Office Staff Mr/Ms/Mrs <NAME>for the month of <MONTH, YEAR>',
              },
            ],
          },
          {
            name: 'Youth Minister',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the Monthly Support of Youth Minister Mr/Ms/Mrs <NAME>for the month of <MONTH, YEAR>',
              },
            ],
          },
          {
            name: 'Children Minister',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the Monthly Support of Childrens Minister Staff Mr/Ms/Mrs <NAME>for the month of <MONTH, YEAR>',
              },
            ],
          },
          {
            name: 'Co-ordinator',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the Monthly Support of Co-ordinator Mr/Ms/Mrs <NAME>for the month of <MONTH, YEAR>',
              },
            ],
          },
          {
            name: 'Special Support',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the Special Support of <DESIGNATION> Mr/Ms/Mrs <NAME>for the month of <MONTH, YEAR>',
              },
            ],
          },
        ],
      },
      {
        name: 'Allowance',
        subcategory2: [
          {
            name: 'Trasfer Allowance',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the Newstation Allowance to Mr/Ms/Mrs<name of beneficiary> for the expense of transportation from (from place to place to)',
              },
            ],
          },
          {
            name: 'New Station Allowance',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the Transfer Allowance to Mr/Ms/Mrs <Name of beneficiary>  for the expense of transportation from (from place to place to)',
              },
            ],
          },
        ],
      },
      {
        name: 'Expense',
        subcategory2: [
          {
            name: 'Vehicle Running Exps.',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the Expense for vehicle repair and maintenance charges (Vehicles reg: no:)',
              },
            ],
          },
          {
            name: 'Vehicle Repairs',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the expense for <Expense Name> for Mr.(Name Of Worker)',
              },
            ],
          },
          {
            name: 'TA/DA for Mission Trip',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the expense for <Expense Name> for Mr.(Name Of Worker)',
              },
            ],
          },
          {
            name: 'TA/DA for Field Visit',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the expense for <Expense Name> for Mr.(Name Of Worker)',
              },
            ],
          },
          {
            name: 'TA/DA for Native place',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the expense for <Expense Name> for Mr.(Name Of Worker)',
              },
            ],
          },
          {
            name: 'Travelling Expenses ( Train/flight )',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the expense for <Expense Name> for Mr.(Name Of Worker) in <Train/Flight>',
              },
            ],
          },
        ],
      },
      {
        name: 'Medical Insurance (MUTT)',
        subcategory2: [
          {
            name: '',
            subcategory3: [
              {
                name: '',
                narration: '',
              },
            ],
          },
        ],
      },
      {
        name: 'Welfare Help',
        subcategory2: [
          {
            name: 'Widow care',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the special welfare for (name of ceremony) of (benefeciary name) in (division).',
              },
            ],
          },
          {
            name: 'Ceremonical Services',
            subcategory3: [
              {
                name: 'Select',
                narration: '',
              },
            ],
          },
          {
            name: 'Motor Bike',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the purchase of Motor Bike to Mr. (Name of worker) for the (purpose) at (division).',
              },
            ],
          },
          {
            name: 'Fan',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the purchase of ceiling fan to Mr. (Name of worker) who does not have ceiling fan in his residence',
              },
            ],
          },
          {
            name: 'Bicycle',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the purchase of Bicycle to Mr. (Name of worker) for the (purpose) at (division).',
              },
            ],
          },
          {
            name: 'Four Wheeler',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the purchase of (name of four wheeler) to Mr. (Name of worker) for the (purpose) at (division).',
              },
            ],
          },
          {
            name: 'Winter Clothes',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the expense of purchasing (Name of winter cloth) for (benefeciary name/no: of group), (division), (@price of one).',
              },
            ],
          },
          {
            name: 'UPS/Inverter',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the purchase of 1 UPS/Inverter for (purpose) in (division)',
              },
            ],
          },
          {
            name: 'Computer or Laptop',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the purchase 1 computer/laptop for (purpose) in (division)',
              },
            ],
          },
          {
            name: 'Mobile or Tablet',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the purchase of a new (Mobile/tablet) for Mr/Mrs/Ms (name)',
              },
            ],
          },
          {
            name: 'Medical Help',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the medical help of (Benefeciary name) in (division).',
              },
            ],
          },
          {
            name: 'Electrical/ Electronic Item',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the purchase  (item name) for (purpose) in (division)',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Establishment Expenses',
    subcategory1: [
      {
        name: 'Staff Expenses',
        subcategory2: [
          {
            name: 'Head Office Staff',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the expense of <STAFF EXPENSE NAME> for the month of <Month,Year>',
              },
            ],
          },
          {
            name: 'Salary & Other Allowances',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the expense of <STAFF EXPENSE NAME> for the month of <Month,Year>',
              },
            ],
          },
          {
            name: 'Leave Encashment',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the expense of <STAFF EXPENSE NAME> for the month of <Month,Year>',
              },
            ],
          },
          {
            name: 'Employee PF',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the expense of <STAFF EXPENSE NAME> for the month of <Month,Year>',
              },
            ],
          },
          {
            name: 'Staff Welfare',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the expense of <STAFF EXPENSE NAME> for the month of <Month,Year>',
              },
            ],
          },
          {
            name: 'Mission Trip Expenses',
            subcategory3: [
              {
                name: 'Select',
                narration: 'Towards the expense of <STAFF EXPENSE NAME> for the month of <Month,Year>',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const purposes: FRPurpose[] = ['Worker', 'Subdivision', 'Division', 'Coordinator', 'Others'];
export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// eslint-disable-next-line max-len
export const sanctionedAsPers:SanctionedAsPer[] = [
  'As per sanction by Manager',
  'As per policy', 'As Per List Attached',
  'As Per Ticket Attached',
  'As Per Bill Attached',
  'As per Index Attached',
  'As Per Budget',
];
