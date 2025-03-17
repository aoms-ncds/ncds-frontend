import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import UserLifeCycleStates from '../../User/extras/UserLifeCycleStates';
import WorkersServices from '../../Workers/extras/WorkersServices';
import IROLifeCycleStates from '../../IRO/extras/IROLifeCycleStates';
import { Box } from '@mui/material';

// Function to determine page size based on column count
const getPageSize = (columnCount: number): 'A4' | 'A3' | 'A2' => {
  if (columnCount <= 7) return 'A4';
  if (columnCount <= 17) return 'A3';
  return 'A2';
};

// Function to determine font size based on column count
const getFontSize = (columnCount: number): number => {
  if (columnCount <= 7) return 12;
  if (columnCount <= 17) return 10; // Adjusted from 11 to 10 for better spacing
  return 9; // Reduced further for A2
};
// Function to generate column widths dynamically

const getColumnWidths = (headers: string[], pageSize: 'A4' | 'A3' | 'A2'): string[] => {
  const baseWidthMap: { [key: string]: number } = {
    'Narration': 12,
    'IRO No': 6,
    'Date': 7,
    'Division': 8,
    'Sanction Amount': 8,
    'Sanction as per': 6,
    'Sanctioned Bank': 8,
    'Beneficiary Name': 9,
    'Sub-Division': 7,
    'Main Category': 6,
    'Sub Category 1': 6,
    'Sub Category 2': 6,
    'Sub Category 3': 6,
    'Requested Amount': 8,
    'Status': 6,
    'For the month': 7,
    'Mode of Payment': 7,
    'Amount Release Date': 8,
    'IroClosedOn': 7,
    'Source Of Account': 6,
    'ReleaseAmount': 7,
    'TransactionNumber': 7,
    'TransferredAmount': 8,
    'TransferredDate': 7,
    'TransferredBank Name': 6,
    'TransferredBank branchName': 7,
    'TransferredBank accountNumber': 12,
    'TransferredBank IFSCCode': 12,
    'Last Updated': 7,

  };


  // Scale widths down for smaller pages


  const sizeMultiplier = pageSize === 'A2' ? 1.2 : pageSize === 'A3' ? 1.0 : 0.8;


  return headers.map((header) => {
    const baseWidth = baseWidthMap[header] || 6;


    return `${(baseWidth * sizeMultiplier).toFixed(1)}%`; // Keep width percentages precise
  });
};


// Font.register({


//   // family: 'Teko',


//   // src: 'https://fonts.googleapis.com/css2?family=Teko:wght@300&display=swap',


// });
Font.register({
  family: 'NotoSans',
  src: '/NotoSans-Regular.ttf', // Make sure this file is correctly placed in your project
});

const styles = StyleSheet.create({


  page: {


    backgroundColor: 'white',


    padding: 20, // Reduce margins for more space


  },


  image: {


    position: 'absolute',


    left: 825,


    height: 50,


    width: 50,


    marginTop: 20,


  },


  title: {


    marginTop: 40,


    fontSize: 12,


    position: 'absolute',


    left: 720,


    color: 'darkblue',


  },


  frno: {


    marginTop: 83,


    fontSize: 10,


    position: 'absolute',


    left: 820,


    color: 'black',


    fontWeight: 'bold',


    fontFamily: 'Oswald',


  },


  month: {
    marginTop: 2,
    fontSize: 10,
    position: 'absolute',
    left: 1200,
    color: 'black',
  },


  heading: {


    position: 'absolute',


    left: '800',


    marginTop: 60,


    fontWeight: 100,


  },


  headingLine: {


    position: 'absolute',


    left: '0',


    right: '0',


    top: 85,


    borderBottom: 1,


    borderColor: 'black',


  },


  line: {


    position: 'absolute',


    left: 30,


    right: 10,


    top: 125,


    borderBottom: 1,


    borderColor: 'black',


  },


  tableContainer: {


    display: 'flex',


    flexDirection: 'column',


    marginTop: 107,


    width: '100%', // Change from fixed 1650px to full width


  },


  tableRow: {


    display: 'flex',


    flexDirection: 'row',


    borderBottomWidth: 1,


    borderBottomColor: '#000',


    borderBottomStyle: 'solid',


    alignItems: 'center',


    height: 150,


    left: 10,


    break: 'avoid',


  },


  tableHead: {


    flex: 1,


    fontSize: 9,


    padding: 2,


    textAlign: 'center',


    fontWeight: 'bold',


  },
  tableHeadFOrHead: {
    color: 'red',

    flex: 1,


    fontSize: 12,


    padding: 2,


    textAlign: 'center',


    fontWeight: 'bold',


  },

  tableCell: {


    flex: 1,


    fontSize: 9,


    padding: 2,


    textAlign: 'center',


  },


  bottomTableCell: {


    flex: 1,


    fontSize: 6,


    padding: 2,


  },


  grid: {


    borderRight: 1,


    height: 150,


  },


});


const PDFTemplateCustomAll = (props:any) => {
  const columnCount = props.headers.length;


  const pageSize = getPageSize(columnCount);


  const fontSize = getFontSize(columnCount);


  const columnWidths: string[] = getColumnWidths(props.headers, pageSize);

  const date= new Date().toLocaleString();

  return (


    <Document>


      <Page size={pageSize} style={styles.page} orientation='landscape'>


        <View>


          <Text style={styles.title}>Custom Report IRO</Text>


        </View>
        <Text style={styles.month}>{date}</Text>


        <View style={styles.line} />


        <View style={styles.tableContainer} >


          {/* Headers */}


          <View style={styles.tableRow} key={0}>


            {props.headers.map((header: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined, index: any | null | undefined) => (


              <React.Fragment key={index}>


                <div style={styles.grid}></div>


                <Text style={[styles.tableHeadFOrHead]}>{header}</Text>


              </React.Fragment>


            ))}
            <div style={styles.grid}></div>


          </View>


          {/* Data Rows */}


          {props.rowData?.map((row: any, index: number) => (


            <View style={styles.tableRow} key={row._id} wrap={false}>


              <div style={styles.grid}></div>


              <Text style={[styles.tableCell]}>{index +1}</Text>


              <div style={styles.grid}></div>


              {props.headers.includes('IRO No') && (


                <>


                  <Text style={[styles.tableCell]}>{row.IROno}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Date') && (


                <>


                  <Text style={[styles.tableCell]}>{moment(row.IRODate).format('DD/MM/YYYY')}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Division') && (


                <>


                  <Text style={[styles.tableCell]}>{row.divisionData?.details?.name}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Sanction Amount') && (


                <>


                  <Text style={[styles.tableCell]}>{row.particularsData?.sanctionedAmount}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Sanction as per') && (


                <>


                  <Text style={[styles.tableCell]}>{row.particularsData?.sanctionedAsPer}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Narration') && (


                <>


                  <Text style={[styles.tableCell]}>{row.particularsData?.narration}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Sanctioned Bank') && (


                <>


                  <Text style={[styles.tableCell]}>{row.sanctionedBank}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Beneficiary Name') && (


                <>


                  <Text style={[styles.tableCell]}>


                    {row.sanctionedBank?.split('-').slice(1).join('-').trim()}


                  </Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Sub-Division') && (


                <>


                  <Text style={[styles.tableCell]}>{row?.subDivData?.name}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Main Category') && (


                <>


                  <Text style={[styles.tableCell]}>{row.particularsData?.mainCategory}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Sub Category 1') && (


                <>


                  <Text style={[styles.tableCell]}>{row.particularsData?.subCategory1}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Sub Category 2') && (


                <>


                  <Text style={[styles.tableCell]}>{row.particularsData?.subCategory2}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Sub Category 3') && (


                <>


                  <Text style={[styles.tableCell]}>{row.particularsData?.subCategory3}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Requested Amount') && (


                <>


                  <Text style={[styles.tableCell]}>{row.particularsData?.requestedAmount}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Status') && (


                <>


                  <Text style={[styles.tableCell]}>


                    {IROLifeCycleStates.getStatusNameByCodeTransaction(row.status).replaceAll('_', ' ')}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('For the month') && (


                <>


                  <Text style={[styles.tableCell]}>{row.particularsData?.month}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Mode of Payment') && (


                <>


                  <Text style={[styles.tableCell]}>{row.releaseAmountData?.modeOfPayment}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Amount Release Date') && (


                <>


                  <Text style={[styles.tableCell]}>


                    {moment(row.releaseAmountData?.transferredDate).format('DD/MM/YYYY')}


                  </Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('IroClosedOn') && (


                <>


                  <Text style={[styles.tableCell]}>{moment(row.iroClosedOn).format('DD/MM/YYYY')}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Source Of Account') && (


                <>


                  <Text style={[styles.tableCell]}>{row.sourceOfAccount}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('ReleaseAmount') && (


                <>


                  <Text style={[styles.tableCell]}>{row.releaseAmountData?.releaseAmount}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('TransactionNumber') && (


                <>


                  <Text style={[styles.tableCell]}>{row.releaseAmountData?.transactionNumber}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('TransferredAmount') && (


                <>


                  <Text style={[styles.tableCell]}>{row.releaseAmountData?.transferredAmount}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('TransferredDate') && (


                <>


                  <Text style={[styles.tableCell]}>


                    {moment(row.releaseAmountData?.transferredDate).format('DD/MM/YYYY')}


                  </Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('TransferredBank Name') && (


                <>


                  <Text style={[styles.tableCell]}>{row.releaseAmountData?.transferredBank?.bankName}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('TransferredBank branchName') && (


                <>


                  <Text style={[styles.tableCell]}>{row.releaseAmountData?.transferredBank?.branchName}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('TransferredBank accountNumber') && (


                <>


                  <Text style={[styles.tableCell]}>{row.releaseAmountData?.transferredBank?.accountNumber}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('TransferredBank IFSCCode') && (


                <>


                  <Text style={[styles.tableCell]}>{row.releaseAmountData?.transferredBank?.IFSCCode}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


              {props.headers.includes('Last Updated') && (


                <>


                  <Text style={[styles.tableCell]}>{moment(row.updatedAt).format('DD/MM/YYYY')}</Text>


                  <div style={styles.grid}></div>


                </>


              )}


            </View>


          ))}

          <View style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', fontWeight: 'bold', borderTop: '1px solid black' }}>
            <Text style={{ fontFamily: 'NotoSans', fontWeight: 800 }}>
              {`Requested amt : ₹ ${props.rowData?.reduce(
                (total: number, e: { particularsData: { requestedAmount: any } }) =>
                  total + (e.particularsData?.requestedAmount ? Number(e.particularsData.requestedAmount) : 0),
                0,
              ).toFixed(2)}`}
            </Text>
            <Text style={{ fontFamily: 'NotoSans', fontWeight: 800 }}>
              {`Sanctioned amt : ₹ ${props.rowData?.reduce(
                (total: number, e: { particularsData: { sanctionedAmount: any } }) =>
                  total + (e.particularsData?.sanctionedAmount ? Number(e.particularsData.sanctionedAmount) : 0),
                0,
              ).toFixed(2)}`}
            </Text>
          </View>
        </View>


      </Page>


    </Document>


  );
};


export default PDFTemplateCustomAll;


