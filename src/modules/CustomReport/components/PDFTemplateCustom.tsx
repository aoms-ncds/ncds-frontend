import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import UserLifeCycleStates from '../../User/extras/UserLifeCycleStates';
import WorkersServices from '../../Workers/extras/WorkersServices';

import IROLifeCycleStates from '../../IRO/extras/IROLifeCycleStates';

Font.register({
  family: 'Teko',
  src: 'https://fonts.googleapis.com/css2?family=Teko:wght@300&display=swap',
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  image: {
    position: 'absolute',
    left: 385,
    height: 50,
    width: 50,
    marginTop: 15,
  },
  title: {
    marginTop: 65,
    fontSize: 14,
    position: 'absolute',
    left: 350,
    color: 'darkblue',
  },

  month: {
    marginTop: 2,
    fontSize: 10,
    position: 'absolute',
    left: 600,
    color: 'black',
  },
  IRONo: {
    marginTop: 90,
    fontSize: 12,
    position: 'absolute',
    left: 365,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
  },
  line1: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 4, // Adjust the spacing as needed
  },
  line: {
    position: 'absolute',
    left: '20',
    right: 22,
    top: 108,
    borderBottom: 1,
    borderColor: 'black',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 108, // Adjust this value to set the table's position
    width: 800,
    flex: 1, // This will make the table fill the width of the page
    flexShrink: 0,
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    height: 70,
    paddingRight: 70,

    left: 20,
  },
  tableRow2: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    height: 40,
    paddingRight: 70,
    left: 20,
    // flex: 0.3, // Decrease width
  },
  tableRow1: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    height: 70,
    left: 20,
    marginBottom: '280px',
  },
  tableHead: {
    flex: 0.1,
    fontSize: 12,
    padding: 1.3,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
    color: 'red',
  },
  tableHead1: {
    flex: 1,
    fontSize: 12,
    padding: 2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
  },
  tableHead2: {
    flex: 1,
    fontSize: 12,
    padding: 2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
  },
  tableHeadCopy: {
    flex: 1,
    fontSize: 12,
    padding: 2,
    // textAlign: 'justify',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
    // paddingLeft: '60vh',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    padding: 2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
  },
  narrationColumn: {
    flex: 4, // Increase width for better visibility
    textAlign: 'left',
    padding: 4,
    flexWrap: 'wrap',
    wordBreak: 'break-word',
  },
  tableCell1: {
    flex: 1,
    fontSize: 14,
    padding: 4, // Increase padding for better spacing
    textAlign: 'left', // Align text to left for better readability
    fontWeight: 'bold',
    fontFamily: 'Oswald',
    flexWrap: 'wrap', // Enable text wrapping
    wordBreak: 'break-word', // Ensure long words wrap properly
    maxWidth: 200, // Adjust based on available space
  },

  tableCell2: {
    flex: 5,
    fontSize: 14,
    padding: 2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
  },
  headGrid: {
    borderRight: 1,
    height: 30,
    // paddingRight: 50,
  },
  cellGrid: {
    borderRight: 1,
    height: 70,
  },
  grid: {
    borderRight: 1,
    height: 70,
  },
  grid4: {
    borderRight: 1,
    height: 70,
    left: 70, // Ensure this doesn't push it outside the page

  },
  grid2: {
    borderRight: 1,
    height: 40,
  },
  grid34444: {
    borderRightWidth: 1, // Use borderRightWidth instead of borderRight
    borderColor: 'black', // Required for the border to appear
    borderStyle: 'solid', // Ensures the border is visible
    height: 38,
    left: 281, // Ensure this doesn't push it outside the page
  },


});

// Create Document Component
const PDFTemplateCustom = (props:any) => {
  const date= new Date().toLocaleString();
  return (
    <Document>
      <Page size={'A4'} style={styles.page} orientation='landscape'>
        <div>
          {/* <Image src="/3D Logo 3.png" style={styles.image} /> */}
          <Text style={styles.title}>
            {'Custom Report IRO'}
          </Text>
          {/* <Text>{date}</Text> */}
          <Text style={styles.month}>{date}</Text>
          {/* <Text style={styles.frno}>{`FR No: ${props.FrNo}`}</Text> */}
        </div>
        <View style={styles.line} />
        <View style={styles.tableContainer} >
          <View style={styles.tableRow2} key={0}>
            {props.headers.map((header: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
              <React.Fragment key={index}>
                <div style={styles.grid2}></div>
                <Text style={styles.tableHead}>{header}</Text>
              </React.Fragment>
            ))}
            <div style={styles.grid34444}></div> {/* This will now be displayed */}
          </View>


          {props.rowData?.map((row: any, index: number) => (
            <View style={styles.tableRow} key={row._id}>
              <div style={styles.grid}></div>
              <Text style={styles.tableHead2}>{index +1}</Text>
              <div style={styles.grid}></div>

              {props.headers.includes('IRO No') && (
                <>
                  <Text style={styles.tableHead1}>{row.IROno}</Text>
                  <div style={styles.grid}></div>

                </>
              )}

              {props.headers.includes('Date') && (
                <>
                  <Text style={styles.tableCell}>{moment(row.IRODate).format('DD/MM/YYYY')}</Text>
                  <div style={styles.grid}></div>

                </>
              )}

              {props.headers.includes('Division') && (
                <>

                  <Text style={styles.tableCell}>{row.divisionData?.details?.name}</Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('Sanction Amount') && (
                <>

                  <Text style={styles.tableCell}>{row.particularsData?.sanctionedAmount}</Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('Sanction as per') && (
                <>
                  <Text style={styles.tableCell}>{row.particularsData?.sanctionedAsPer}</Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('Narration') && (
                <>
                  <View style={[styles.tableCell, styles.narrationColumn]}>
                    <Text>{row.particularsData?.narration}</Text>
                  </View>
                  <div style={styles.grid4}></div>
                </>
              )}
              {props.headers.includes('Sanctioned Bank') && (
                <>

                  <Text style={styles.tableCell}>{row.sanctionedBank}</Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('Beneficiary Name') && (
                <>

                  <Text style={styles.tableCell}>
                    {row.sanctionedBank?.split('-').slice(1).join('-').trim()}
                  </Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('Sub-Division') && (
                <>

                  <Text style={styles.tableCell}>{row?.subDivData?.name}</Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('Main Category') && (
                <>

                  <Text style={styles.tableCell}>{row.particularsData?.mainCategory}</Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('Sub Category 1') && (
                <>

                  <Text style={styles.tableCell}>{row.particularsData?.subCategory1}</Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('Sub Category 2') && (
                <>

                  <Text style={styles.tableCell}>{row.particularsData?.subCategory2}</Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('Sub Category 3') && (
                <>

                  <Text style={styles.tableCell}>{row.particularsData?.subCategory3}</Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('Requested Amount') && (
                <>

                  <Text style={styles.tableCell}>{row.particularsData?.requestedAmount}</Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('Status') && (
                <>

                  <Text style={styles.tableCell}>
                    {IROLifeCycleStates.getStatusNameByCodeTransaction(row.status).replaceAll('_', ' ')}</Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('For the month') && (
                <>
                  <Text style={styles.tableCell}>{row.particularsData?.month}</Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('Mode of Payment') && (
                <>
                  <Text style={styles.tableCell}>{row.releaseAmountData?.modeOfPayment}</Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('Amount Release Date') && (
                <>
                  <Text style={styles.tableCell}>
                    {moment(row.releaseAmountData?.transferredDate).format('DD/MM/YYYY')}
                  </Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('IroClosedOn') && (
                <>
                  <Text style={styles.tableCell}>{moment(row.iroClosedOn).format('DD/MM/YYYY')}</Text>
                  <div style={styles.grid}></div>
                </>
              )}

              {props.headers.includes('Source Of Account') && (
                <>
                  <Text style={styles.tableCell}>{row.sourceOfAccount}</Text>
                  <div style={styles.grid}></div>
                </>
              )}

              {props.headers.includes('ReleaseAmount') && (
                <>
                  <Text style={styles.tableCell}>{row.releaseAmountData?.releaseAmount}</Text>
                  <div style={styles.grid}></div>
                </>
              )}

              {props.headers.includes('TransactionNumber') && (
                <>
                  <Text style={styles.tableCell}>{row.releaseAmountData?.transactionNumber}</Text>
                  <div style={styles.grid}></div>
                </>
              )}

              {props.headers.includes('TransferredAmount') && (
                <>
                  <Text style={styles.tableCell}>{row.releaseAmountData?.transferredAmount}</Text>
                  <div style={styles.grid}></div>
                </>
              )}

              {props.headers.includes('TransferredDate') && (
                <>
                  <Text style={styles.tableCell}>
                    {moment(row.releaseAmountData?.transferredDate).format('DD/MM/YYYY')}
                  </Text>
                  <div style={styles.grid}></div>
                </>
              )}

              {props.headers.includes('TransferredBank Name') && (
                <>
                  <Text style={styles.tableCell}>{row.releaseAmountData?.transferredBank?.bankName}</Text>
                  <div style={styles.grid}></div>
                </>
              )}

              {props.headers.includes('TransferredBank branchName') && (
                <>
                  <Text style={styles.tableCell}>{row.releaseAmountData?.transferredBank?.branchName}</Text>
                  <div style={styles.grid}></div>
                </>
              )}

              {props.headers.includes('TransferredBank accountNumber') && (
                <>
                  <Text style={styles.tableCell}>{row.releaseAmountData?.transferredBank?.accountNumber}</Text>
                  <div style={styles.grid}></div>
                </>
              )}

              {props.headers.includes('TransferredBank IFSCCode') && (
                <>
                  <Text style={styles.tableCell}>{row.releaseAmountData?.transferredBank?.IFSCCode}</Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {props.headers.includes('Last Updated') && (
                <>
                  <Text style={styles.tableCell}>{moment(row.updatedAt).format('DD/MM/YYYY')}</Text>
                  <div style={styles.grid}></div>
                </>
              )}
              {/* <div style={styles.grid}></div> */}

            </View>
          ))}


          {/* <View style={{ ...styles.tableRow, backgroundColor: '#bdbdbd' }} key={1} >
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Total</Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevBasic}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.basic}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevHRA}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.HRA}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevSpouseAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.spouseAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevPositionalAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.positionalAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevSpecialAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.specialAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevImpactDeduction}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.impactDeduction}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevTelAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.telAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevPIONMissionaryFund}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.PIONMissionaryFund}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevMUTDeduction}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.MUTDeduction}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>
              {total.total}
            </Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.deduction}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.net}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
          </View> */}

          {/* <View style={{ ...styles.tableRow, backgroundColor: '#bdbdbd' }} key={2} >
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.bottomTableCell, fontWeight: 'bold' }}>Total No of Workers: </Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.bottomTableCell, fontWeight: 'bold' }}>{workers?.filter((worker)=>worker.supportStructure?.supportEnabled).length ?? 0}</Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
          </View> */}

          {/* <View style={{ ...styles.tableRow, backgroundColor: '#bdbdbd' }} key={3} >
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.bottomTableCell, fontWeight: 'bold' }}>Total Net Amount: </Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.bottomTableCell, fontWeight: 'bold' }}>{total.net}</Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>

            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>

            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
          </View> */}


        </View>
      </Page>
    </Document>
  );
};


export default PDFTemplateCustom;
