/* eslint-disable max-len */
import { Avatar } from '@mui/material';
import { PDFCell, PDFTable, PDFTableHeader, PDFTableRow } from './PDFTable';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import moment from 'moment';
import * as numberToWords from 'number-to-words';
import { useState, useEffect } from 'react';
import UserServices from '../../User/extras/UserServices';
import FRServices from '../../FR/extras/FRServices';

Font.register({
  family: 'Oswald',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf' }, // Normal
    { src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf', fontWeight: 700 }, // Bold
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 10, // Add some padding inside the bordered container
  },
  borderContainer: {
    flex: 1,
    border: '2px solid #333', // Border color and thickness
    borderRadius: 12, // Border radius for rounded corners
    // padding: 10, // Padding inside the border
  },
  image: {
    position: 'absolute',
    left: 80,
    height: 60,
    width: 40,
    marginTop: 10,
  },
  heading: {
    position: 'absolute',
    left: 130,
    fontSize: 32,
    // fontWeight: 'bold',
    marginTop: 8,
    color: '#cd151d',
  },
  title: {
    marginTop: 45,
    fontSize: 15,
    position: 'absolute',
    left: 200,
    color: 'black',
    // fontWeight: 'bold',
  },
  text: {
    fontSize: 11,
    color: 'black',
  },
  text1: {
    fontSize: 11,
    color: 'black',

  },
  text2: {
    fontSize: 8,
    color: 'black',

  },
  h1: {
    fontSize: 15,
    left: 50,
    color: '#483285',
    fontWeight: 700,
  },
  box: {
    width: 560,
    border: '1px solid #333',
    left: 5,
  },
  box2: {
    width: 490,
    height: 30,
    // border: '1px solid #333',
    left: 50,
  },
  box3: {
    width: 490,
    height: 100,
    border: '1px solid #333',
    left: 50,
  },
  box4: {
    width: 490,
    height: 60,
    border: '1px solid #333',
    left: 50,
  },
  box5: {
    width: 490,
    height: 80,
    border: '1px solid #333',
  },
  table: {
    position: 'absolute',
    left: 0,
    width: 490,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    border: '1px solid black',
    padding: 3,
    height: 20,
  },
  tableText: {
    fontSize: 11,
  },
});
const IROTemplate = (props: { rowData?: any; fr?: FR; mngrName?: any; officeMngrSign?: any; president: EsignaturePresident }) => {
  let totalAmount = 0;
  let totalReqAmount = 0;
  let NewTot: any = 0;
  let totalAmount2 = 0;
  // const [coordinatorImage, setCoordinatrImage] = useState<string | null>(null);

  // console.log(props.rowData.division.details.coordinator, 'coordinatorImage');
  const totalSacntion = props.fr?.particulars.forEach((e) => {
    totalAmount2 += e?.sanctionedAmount != undefined ? e?.sanctionedAmount : 0;
  });
  console.log(totalAmount2, 'total');

  NewTot += props?.fr?.sanctionedAmount != undefined ? props?.fr?.sanctionedAmount : 0;
  console.log(NewTot, 'eee');
  totalReqAmount = props.fr?.particulars?.reduce((acc, e) => {
    return acc + (e?.requestedAmount !== undefined ? e.requestedAmount : 0);
  }, 0) ?? 0;
  const sanctionedAmount = NewTot != 0 ? NewTot : totalAmount2;
  let sanctionedAmountWords = '';
  console.log(sanctionedAmount, 'amount');

  if (typeof sanctionedAmount !== 'undefined') {
    sanctionedAmountWords = numberToWords.toWords(sanctionedAmount);
    sanctionedAmountWords = sanctionedAmountWords.charAt(0).toUpperCase() + sanctionedAmountWords.slice(1) + ' only';
  } else {
    sanctionedAmountWords = 'N/A';
  }
  // const dateString = props?.rowData?.releaseAmount?.transferredDate?? '';
  console.log(sanctionedAmountWords, 'dateString');

  // const formattedDate = moment(dateString)?.format('DD MMMM YYYY');
  // console.log(formattedDate, 'formattedDate');
  '';
  useEffect(() => {
    totalAmount = 0;
    NewTot = 0;
    totalAmount2 = 0;
  }, []);
  console.log(totalAmount, 'hr');

  // const raiseddateString = printdetails?.IROdate;
  // const raiseddate = new Date(raiseddateString);
  // const option = { day: 'numeric', month: 'long', year: 'numeric' as const };
  // const raisformattedDate = raiseddate.toLocaleDateString('en-GB', option);

  return (
    <Document >
      <Page size="A4" style={styles.page} >
        <View style={styles.borderContainer}>
          <div>
            <>
              <Image src="/3D Logo 3.png" style={styles.image} />

              <Text style={{ ...styles.heading, fontWeight: 700, fontFamily: 'Oswald' }}> INDIAN EVANGELICAL TEAM </Text></>
            {/* <Image src={`${'https://drive.google.com/uc?id=1DLTxXV4OwASqLKQz_Z6iZQUrDjrdVZQB&expor'}`} style={styles.image} /> */}
            <Text style={{ ...styles.title, fontWeight: 700, fontFamily: 'Oswald' }}> Internal Release Order </Text>
          </div>

          <div style={{ marginTop: 60 }}>
            <View style={{ ...styles.box, marginTop: 15 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 10 }}>IRO NO:</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 7 }}>{props.rowData?.IROno}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontWeight: 'bold', fontFamily: 'Oswald' }}>IRO DATE:</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 7 }}>{props.rowData?.IRODate.format('DD/MM/YYYY')}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 11, marginBottom: 3 }}>Division Name:</Text>
                  <Text style={{ ...styles.text, marginTop: 6, left: 7, marginBottom: 3 }}>{props?.rowData?.division?.details.name ?? ''}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 11, marginBottom: 3 }}>Divisional Co-ordinator: </Text>
                  <Text style={{ ...styles.text, marginTop: 6, left: 7, marginBottom: 3 }}>{`${props?.rowData?.division?.details?.coordinator?.name?.basicDetails?.firstName ? props?.rowData?.division?.details?.coordinator?.name?.basicDetails?.firstName.trim() : ''}${props?.rowData?.division?.details?.coordinator?.name?.basicDetails?.middleName ? ' ' + props?.rowData?.division?.details?.coordinator?.name?.basicDetails?.middleName.trim() : ''} ${props?.rowData?.division?.details?.coordinator?.name?.basicDetails?.lastName ?? ''}`}</Text>
                </View>
              </View>
            </View>
          </div>
          <div >
            <View style={{ ...styles.box, marginTop: 3 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontWeight: 'bold', fontFamily: 'Oswald' }}>Beneficiary Name</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 15 }}>:</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 17 }}>{props.rowData?.releaseAmount?.transferredBank?.beneficiary ?? ''}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontWeight: 'bold', fontFamily: 'Oswald' }}>Amt Released on</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 15 }}>:</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 17 }}>{props.rowData.releaseAmount?.transferredDate.format('DD/MM/YYYY')}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontWeight: 'bold', fontFamily: 'Oswald' }}>Account No</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 37 }}>:</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 39 }}>{props.rowData?.releaseAmount?.transferredBank?.accountNumber ?? ''}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontWeight: 'bold', fontFamily: 'Oswald' }}>Source Of Fund</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 20 }}>:</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 22 }}> {props.rowData?.sourceOfAccount ?? ''}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontWeight: 'bold', fontFamily: 'Oswald' }}>IFSC Code</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 42 }}>:</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 44 }}>{props.rowData?.releaseAmount?.transferredBank?.IFSCCode ?? ''}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontWeight: 'bold', fontFamily: 'Oswald' }}>Mode of Payment </Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 10 }}>:</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 12 }}>{props.rowData?.releaseAmount?.modeOfPayment ?? ''}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontWeight: 'bold', fontFamily: 'Oswald' }}>Bank Name</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 37 }}>:</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 39 }}>{props.rowData?.releaseAmount?.transferredBank?.bankName}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontWeight: 'bold', fontFamily: 'Oswald' }}>Transaction ID</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 22 }}>:</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 24 }}>{props.rowData?.releaseAmount?.transactionNumber ?? ''}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 11, marginBottom: 3 }}>Branch Name</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 29 }}>:</Text>
                  <Text style={{ ...styles.text, marginTop: 6, left: 31, marginBottom: 3 }}>{props.rowData?.releaseAmount?.transferredBank?.branchName}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 11, marginBottom: 3 }}>FR NO</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 52 }}>:</Text>
                  <Text style={{ ...styles.text, marginTop: 6, left: 54, marginBottom: 3 }}>{props.fr?.FRno}</Text>
                </View>
              </View>
            </View>
          </div>
          <div style={{ marginTop: 3 }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                borderWidth: 1,
                // borderColor: '#bff0fd',
                marginTop: 2,
                width: 560,
                left: 5,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  // borderBottomColor: '#bff0fd',
                  // backgroundColor: '#bff0fd',
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  height: 24,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  flexGrow: 1,
                }}
              >
                <Text
                  style={{
                    width: '20%',
                    textAlign: 'center', fontSize: 11, fontWeight: 'bold',
                    fontFamily: 'Oswald',
                  }}
                >
                  Sl No
                </Text>
                <div style={{ borderRight: 1, height: 24 }}></div>
                <Text
                  style={{
                    width: '800 px', // Set fixed width,
                    textAlign: 'center', fontSize: 11, fontWeight: 'bold',
                    fontFamily: 'Oswald',
                  }}
                >
                  Particulars / Narration
                </Text>
                <div style={{ borderRight: 1, height: 24 }}></div>
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'center', fontSize: 11, fontWeight: 'bold',
                    fontFamily: 'Oswald',
                  }}
                >
                  Sanctioned
                  As Per
                </Text>
                <div style={{ borderRight: 1, height: 24 }}></div>
                <Text
                  style={{
                    width: '40%',
                    textAlign: 'center', fontSize: 11, fontWeight: 'bold',
                    fontFamily: 'Oswald',
                  }}
                >
                  Qty
                </Text>
                <div style={{ borderRight: 1, height: 24 }}></div>
                <Text
                  style={{
                    width: '60%',
                    textAlign: 'center', fontSize: 11, fontWeight: 'bold',
                    fontFamily: 'Oswald',
                  }}
                >
                  Request Amount
                </Text>
                <div style={{ borderRight: 1, height: 24 }}></div>
                <Text
                  style={{
                    width: '60%',
                    textAlign: 'center', fontSize: 11, fontWeight: 'bold',
                    fontFamily: 'Oswald',
                  }}
                >
                  Sanctioned Amount
                </Text>
              </View>
              {props.rowData.particulars && props.rowData.particulars.map((item: Particular, index: number) => {
                totalAmount += item.requestedAmount ?? 0;
                // totalAmount2 += props.rowData.sanctionedAmount ?? 0;


                return (<PDFTableRow key={index} style={{ borderBottomColor: 'initial' }} height='50' >
                  <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'20%'}>
                    {String(index + 1)}
                  </PDFCell>
                  <div style={{ borderRight: 1, height: 50 }}></div>
                  <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'800 px'}>
                    {item.narration}
                  </PDFCell>
                  <div style={{ borderRight: 1, height: 50 }}></div>
                  <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100%'}>
                    {String(item?.sanctionedAsPer ?? '')}
                  </PDFCell>
                  <div style={{ borderRight: 1, height: 50 }}></div>

                  <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'40%'}>
                    {String(item.quantity)}
                  </PDFCell>
                  <div style={{ borderRight: 1, height: 50 }}></div>
                  <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'60%'}>
                    {String(item.requestedAmount)}
                  </PDFCell>
                  <div style={{ borderRight: 1, height: 50 }}></div>
                  <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'60%'}>
                    {String(props.rowData.sanctionedAmount ?? item?.sanctionedAmount)}
                  </PDFCell>

                  {/* <PDFCell style={{ textAlign: 'cent  er', fontSize: 10 }} width={'100'}>
                    {item.sanctionedAmount?.toString()}
                  </PDFCell> */}
                </PDFTableRow>);
              })}
              <PDFTableRow key={props.rowData.particulars.length} style={{ borderBottomColor: 'initial' }}>
                <PDFCell style={{ textAlign: 'left', left: 5, fontSize: 11, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'100%'}>
                  Grand Total
                </PDFCell>
                {/* <PDFCell width={'20%'} ></PDFCell> */}
                <PDFCell width={'100%'} ></PDFCell>
                <PDFCell width={'590 px'} ></PDFCell>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, height: 24 }}></div>

                <PDFCell style={{ color: 'red', textAlign: 'center', fontSize: 11, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'60%'}>
                  {totalAmount as any ?? ''}
                </PDFCell>
                <div style={{ borderRight: 1, height: 24 }}></div>

                <PDFCell style={{ textAlign: 'center', color: 'red', fontSize: 11, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'60%'}>
                  <br />{NewTot != 0 ? NewTot : totalAmount2}
                </PDFCell>
              </PDFTableRow>
              <PDFTableRow key={props.rowData.particulars.length + 1}>
                <PDFCell style={{ textAlign: 'left', left: 5, fontSize: 11, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'100%'}>
                  Sanctioned Amount in Words:
                </PDFCell>
                <PDFCell width={'20%'} ></PDFCell>
                <PDFCell width={'100%'} ></PDFCell>
                <PDFCell width={'40%'} ></PDFCell>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <PDFCell style={{ textAlign: 'left', fontSize: 11, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'100%'}>
                  {sanctionedAmountWords}
                </PDFCell>
              </PDFTableRow>
            </View>
          </div>
          <div >
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 200 }}>
                <Text style={{
                  ...styles.text, marginTop: 10, left: 5, fontWeight: 'bold',
                  fontFamily: 'Oswald', fontSize: 10,
                }} >Balance amount to be adjusted:</Text></View>
              <View>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 200 }}>
                <Text style={{
                  ...styles.text, left: 5, fontWeight: 'bold',
                  fontFamily: 'Oswald', fontSize: 10,
                }} >Adjusted to IRO No.:</Text></View>
              <View>
              </View>
            </View>
          </div>

          <div style={{ marginTop: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              {props.rowData?.specialsanction == 'Yes' ? (
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <Text style={{
                    ...styles.text,
                    textAlign: 'center',
                    fontSize: 10,
                  }}>
                    E Signature protected.
                  </Text>
                  <View style={{
                    ...styles.box5,
                    width: 130,
                    alignItems: 'center',
                  }}>
                    <Image
                      style={{
                        height: 78,
                        width: 128,
                      }}
                      src={`data:${props.president.presidentSignature?.type};base64, ${props.president.presidentSignature?.base64} `} />
                  </View>
                  <View style={{ textAlign: 'center', alignItems: 'center' }}>
                    <Text style={{
                      ...styles.text1,
                      fontSize: 11,
                      textAlign: 'center',
                      // fontWeight: 'bold',
                      fontFamily: 'Oswald',
                    }}>
                      Mr. Shaji Varghese
                      {/* {props.rowData?.division?.details.president?.name?.basicDetails?.firstName} {props.rowData?.division?.details.president?.name?.basicDetails?.lastName} */}
                    </Text>
                    <Text style={{
                      ...styles.text1,
                      fontSize: 11,
                      fontWeight: 'bold',
                      fontFamily: 'Oswald',
                      textAlign: 'center',
                    }}>
                      President
                    </Text>
                  </View>
                </View>) :
                <View style={{ width: 300 }} />}<View style={{ width: 300, flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{
                  ...styles.text,
                  textAlign: 'center',
                  fontSize: 10,
                }}>
                  E Signature protected.
                </Text>
                <View style={{
                  ...styles.box5,
                  width: 130,
                  alignItems: 'center',
                }}>
                  <Image
                    style={{
                      height: 78,
                      width: 128,
                    }}
                    src={`data:${props.officeMngrSign?.officeManagerSignature?.type};base64, ${props.officeMngrSign?.officeManagerSignature?.base64}`}
                  />
                </View>
                <View style={{ textAlign: 'center', alignItems: 'center' }}>
                  <Text style={{
                    ...styles.text1,
                    fontSize: 11,
                    textAlign: 'center',
                    // fontWeight: 'bold',
                    fontFamily: 'Oswald',
                  }}>
                    {props.officeMngrSign?.officeManagerName}
                  </Text>
                  <Text style={{
                    ...styles.text1,
                    fontSize: 11,
                    fontWeight: 'bold',
                    fontFamily: 'Oswald',
                    textAlign: 'center',
                  }}>
                    Office Manager
                  </Text>
                </View>
              </View>
            </View>
          </div>
          <div style={{ marginTop: 'auto', marginBottom: 10, left: 5, position: 'absolute', bottom: 0, width: 560 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ ...styles.text, left: 5, fontWeight: 'bold', fontFamily: 'Oswald' }}>Prepared By:</Text>
              <Text style={{ ...styles.text, marginTop: 3, left: 7, marginBottom: 3 }}>{`${props?.rowData?.approvedBy?.basicDetails?.firstName ? props?.rowData?.approvedBy?.basicDetails?.firstName.trim() : ''}${props?.rowData?.approvedBy?.basicDetails?.middleName ? ' ' + props?.rowData?.approvedBy?.basicDetails?.middleName.trim() : ''} ${props?.rowData?.approvedBy?.basicDetails?.lastName ?? ''}`}</Text>
            </View>
            <Text style={{
              fontSize: 8,
              color: 'grey',
              marginTop: 5,
            }}>
              This document is electronically signed by an authorized person of the Indian Evangelical Team adding to the accuracy and
              content of the information submitted.
            </Text>
          </div>
        </View>
      </Page>
    </Document>
  );
};
export default IROTemplate;
