/* eslint-disable max-len */
import { Avatar } from '@mui/material';
import { PDFCell, PDFTable, PDFTableHeader, PDFTableRow } from './PDFTable';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import moment from 'moment';
import * as numberToWords from 'number-to-words';
import { useState, useEffect } from 'react';
import UserServices from '../../User/extras/UserServices';
import FRServices from '../../FR/extras/FRServices';
import { ToWords } from 'to-words';

Font.register({
  family: 'CourierPrime',
  src: '/arial.ttf',
  fonts: [
    { src: '/arial_bold.ttf', fontWeight: 'bold' },
    { src: '/ARIALBD 1.TTF', fontWeight: 500 },
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
    left: 60,
    height: 60,
    width: 40,
    marginTop: 10,
  },
  heading: {
    position: 'absolute',
    left: 100,
    fontSize: 25,
    fontWeight: 500,
    marginTop: 15,
    color: '#cd151d',
  },
  title: {
    marginTop: 45,
    fontSize: 15,
    position: 'absolute',
    left: 180,
    color: 'black',
    fontWeight: 500,
    //
  },
  text: {
    fontSize: 11,
    color: 'black',
    fontWeight: 500,
  },
  text1: {
    fontSize: 8,
    color: 'black',

  },
  text2: {
    fontSize: 6,
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
const IROTemplateCustom = (props: { rowData?: any; prev?: boolean; fr?: FR; officeMngrSign?: any; officeMngrName?: any } & Record<string, any>) => {
  let totalAmount = 0;
  let totalReqAmount = 0;
  let NewTot: any = 0;
  let totalAmount2 = 0;
  // const [coordinatorImage, setCoordinatrImage] = useState<string | null>(null);
  const toWords = new ToWords({
    localeCode: 'en-IN', // Set Indian locale
    converterOptions: {
      currency: false, // Set true if dealing with currency
      ignoreDecimal: false, // Include decimal words if applicable
      ignoreZeroCurrency: false,
    },
  });
  // console.log(props.rowData.division.details.coordinator, 'coordinatorImage');
  const totalSacntion = props.rowData?.particulars.forEach((e:any) => {
    totalAmount2 += e?.sanctionedAmount != undefined ? e?.sanctionedAmount : 0;
  });
  console.log(props.rowData, 'total');

  NewTot += props?.rowData?.sanctionedAmount != undefined ? props?.rowData?.sanctionedAmount : 0;
  console.log(NewTot, 'eee');
  totalReqAmount = props.rowData?.particulars?.reduce((acc:any, e:any) => {
    return acc + (e?.requestedAmount !== undefined ? e.requestedAmount : 0);
  }, 0) ?? 0;
  const sanctionedAmount = NewTot != 0 ? NewTot : totalAmount2;
  let sanctionedAmountWords = '';
  console.log(sanctionedAmount, 'amount');

  if (typeof sanctionedAmount !== 'undefined') {
    sanctionedAmountWords = toWords.convert(sanctionedAmount);
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

              <Text style={{ ...styles.heading, fontFamily: 'CourierPrime' }}> INDIAN EVANGELICAL TEAM </Text></>
            {/* <Image src={`${'https://drive.google.com/uc?id=1DLTxXV4OwASqLKQz_Z6iZQUrDjrdVZQB&expor'}`} style={styles.image} /> */}
            <Text style={{ ...styles.title, right: 50, fontFamily: 'CourierPrime' }}> INTERNAL RELEASE ORDER </Text>
          </div>

          <div style={{ marginTop: 60 }}>
            <View style={{ ...styles.box, marginTop: 15 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, top: 2, fontFamily: 'CourierPrime', fontSize: 10 }}>IRO No</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 74 }}>:&nbsp;{props.rowData?.IROno}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, top: 2, fontFamily: 'CourierPrime', fontSize: 10 }}>IRO DATE</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 60 }}>:&nbsp;{props.rowData?.IRODate.format('DD/MM/YYYY')}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime', fontSize: 11, top: 2, marginBottom: 3 }}>Division Name</Text>
                  <Text style={{ ...styles.text, marginTop: 6, left: 34, marginBottom: 3 }}>: {props?.rowData?.division?.details.name ?? ''}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime', fontSize: 11, top: 2, marginBottom: 3 }}>Div. Co-ordinator</Text>
                  <Text style={{ ...styles.text, marginTop: 6, left: 19, marginBottom: 3 }}>
  : {props.rowData?.coordinatorName ||
     `${(props.rowData?.division?.details?.coordinator?.name?.basicDetails?.firstName || '').trim()} 
      ${(props.rowData?.division?.details?.coordinator?.name?.basicDetails?.middleName || '').trim()} 
      ${(props.rowData?.division?.details?.coordinator?.name?.basicDetails?.lastName || '').trim()}`.replace(/\s+/g, ' ')}
                  </Text>

                </View>
              </View>
            </View>
          </div>
          <div >
            <View style={{ ...styles.box, marginTop: 3 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 500, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime' }}>Beneficiary Name</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 15 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 5, left: 17 }}>:&nbsp;{props.rowData?.beneficiaryName?? ''}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime' }}>Account No</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 37 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 5, left: 48 }}>:&nbsp;{props.rowData?.accNumber ?? ''}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 5, left: 5, fontFamily: 'CourierPrime' }}>Source of Fund</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 20 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 5, left: 28 }}>:&nbsp;{props.rowData?.sourceOfAccount ?? ''}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime' }}>IFSC Code</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 42 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 5, left: 55 }}>:&nbsp;{props.rowData?.ifscCode ?? ''}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime' }}>Mode of Payment </Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 10 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 5, left: 15 }}>:&nbsp;{props.rowData?.modeOfPayment ?? ''}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime' }}>Bank Name</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 37 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 5, left: 51 }}>:&nbsp;{props.rowData?.bankName}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime' }}>Amt Released on</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 20 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 5, left: 19 }}>
  : {moment(props.rowData?.transferredDate).format('DD/MM/YYYY')}
                  </Text>                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime', fontSize: 11, marginBottom: 3 }}>Branch Name</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 29 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 6, left: 40, marginBottom: 3 }}>:&nbsp;{props.rowData?.branchName}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime' }}>FR No</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 20 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 5, left: 75 }}>
                    : {props.rowData.FRNumber}
                  </Text>                </View>
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

                  flexGrow: 1,
                }}
              >
                <Text
                  style={{
                    width: '12%',
                    textAlign: 'center', fontSize: 10,
                    fontFamily: 'CourierPrime',
                    fontWeight: 500,
                  }}
                >
                  Sl No
                </Text>
                {/* <div style={{ borderRight: 1, height: 24 }}></div> */}
                {/* <Text
                  style={{
                    fontWeight: 500,
                    width: '635px px', // Set fixed width,
                    textAlign: 'center', fontSize: 10,
                    fontFamily: 'CourierPrime',
                  }}
                >
                  Main Category
                </Text> */}
                <div style={{ borderRight: 1, height: 24 }}></div>
                <Text
                  style={{
                    fontWeight: 500,
                    width: '635px px', // Set fixed width,
                    textAlign: 'center', fontSize: 10,
                    fontFamily: 'CourierPrime',
                  }}
                >
                  Particulars / Narration
                </Text>
                <div style={{ borderRight: 1, height: 24 }}></div>
                <Text
                  style={{
                    fontWeight: 500,
                    width: '60%',
                    textAlign: 'center',
                    fontSize: 10,
                    fontFamily: 'CourierPrime',
                  }}
                >
                  Sanctioned{'\n'}
                  As Per
                </Text>
                <div style={{ borderRight: 1, height: 24 }}></div>
                <Text
                  style={{
                    fontWeight: 500,
                    width: '13%',
                    textAlign: 'center', fontSize: 10,
                    fontFamily: 'CourierPrime',
                  }}
                >
                  Qty
                </Text>
                <div style={{ borderRight: 1, height: 24 }}></div>
                <Text
                  style={{
                    fontWeight: 500,
                    width: '32%',
                    textAlign: 'center', fontSize: 10,
                    fontFamily: 'CourierPrime',
                  }}
                >
                  Requested{'\n'}
                  Amt
                </Text>
                <div style={{ borderRight: 1, height: 24 }}></div>
                <Text
                  style={{
                    fontWeight: 500,
                    width: '32%',
                    textAlign: 'center', fontSize: 10,
                    fontFamily: 'CourierPrime',
                  }}
                >
                  Sanctioned {'\n'} Amt
                </Text>
              </View>
              {props.rowData.particulars && props.rowData.particulars.map((item: Particular, index: number) => {
                totalAmount += item.requestedAmount ?? 0;
                // totalAmount2 += props.rowData.sanctionedAmount ?? 0;


                return (<PDFTableRow key={index} style={{ borderBottomColor: 'initial' }} height='100' >
                  <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'12%'}>
                    {String(index + 1)}
                  </PDFCell>
                  <div style={{ borderRight: 1, height: 100 }}></div>
                  {/* <PDFCell style={{ textAlign: 'center', fontSize: 10, padding: 5 }} width={'635px'}>
                    {`${item.mainCategory == 'Select' ? '' : item.mainCategory}${item.subCategory1 == 'Select' ? '' : ' > ' + item.subCategory1}${item.subCategory2 == 'Select' ? '' : ' > ' + item.subCategory2}${item.subCategory3 == 'Select' ? '' : ' > ' + item.subCategory3}`}
                  </PDFCell> */}
                  <div style={{ borderRight: 1, height: 100 }}></div>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      height: '100',
                      width: '635px',
                      padding: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 300,
                        // width: '32%',
                        fontSize: 10,
                        fontFamily: 'CourierPrime', textAlign: 'left', padding: 5,
                      }}
                    >
                      {item.mainCategory == 'Select' ? '' : item.mainCategory} {item.subCategory1 == 'Select' ? '' : ' > ' + item.subCategory1} {item.subCategory2 == 'Select' ? '' : ' > ' + item.subCategory2} {item.subCategory3 == 'Select' ? '' : ' > ' + item.subCategory3}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'left', fontSize: 10, padding: 5,
                      }}
                    >
                      {item.narration}

                    </Text>
                  </View>

                  <div style={{ borderRight: 1, height: 100 }}></div>
                  <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'60%'}>
                    {String(item?.sanctionedAsPer ?? '')}
                  </PDFCell>
                  <div style={{ borderRight: 1, height: 100 }}></div>

                  <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'13%'}>
                    {String(item.quantity)}
                  </PDFCell>
                  <div style={{ borderRight: 1, height: 100 }}></div>
                  <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'32%'}>
                    {String(item.requestedAmount)}
                  </PDFCell>
                  <div style={{ borderRight: 1, height: 100 }}></div>
                  <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'32%'}>
                    {String(item?.sanctionedAmount)}
                  </PDFCell>

                  {/* <PDFCell style={{ textAlign: 'cent  er', fontSize: 10 }} width={'100'}>
                    {item.sanctionedAmount?.toString()}
                  </PDFCell> */}
                </PDFTableRow>);
              })}
              <PDFTableRow key={props.rowData.particulars.length} style={{ borderBottomColor: 'initial' }}>
                <PDFCell style={{ fontWeight: 500, textAlign: 'left', left: 5, fontSize: 10, fontFamily: 'CourierPrime' }} width={'85%'}>
                  Grand Total
                </PDFCell>
                {/* <PDFCell width={'20%'} ></PDFCell> */}
                {/* <PDFCell width={'90%'} ></PDFCell> */}
                <PDFCell width={'637 px'} ></PDFCell>
                <PDFCell width={'637 px'} ></PDFCell>
                {/* <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div> */}
                <div style={{ borderRight: 1, right: 0.1, height: 24 }}></div>

                <PDFCell style={{ color: 'red', textAlign: 'center', fontSize: 10, fontFamily: 'CourierPrime' }} width={'50%'}>
                  {totalAmount as any ?? ''}
                </PDFCell>
                <div style={{ borderRight: 1, height: 24 }}></div>

                <PDFCell style={{ textAlign: 'center', color: 'red', fontSize: 10, fontFamily: 'CourierPrime' }} width={'50%'}>
                  <br />{totalAmount2 as any}
                </PDFCell>
              </PDFTableRow>
              <PDFTableRow key={props.rowData.particulars.length} >
                <PDFCell style={{ fontWeight: 500, textAlign: 'left', left: 5, fontSize: 10, fontFamily: 'CourierPrime' }} width={'30%'}>
                  Sanctioned Amount in Words:
                </PDFCell>
                <PDFCell width={'20%'} ></PDFCell>
                {/* <PDFCell width={'100%'} ></PDFCell> */}
                {/* <PDFCell width={'40%'} ></PDFCell> */}
                {/* <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div> */}
                {/* <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div> */}
                <PDFCell style={{ fontWeight: 500, textAlign: 'left', fontSize: 11, fontFamily: 'CourierPrime' }} width={'100%'}>
                  {sanctionedAmountWords}
                </PDFCell>
              </PDFTableRow>
            </View>
          </div>
          <div >
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 200 }}>
                <Text style={{
                  ...styles.text, marginTop: 10, padding: 5, left: 5,
                  fontFamily: 'CourierPrime', fontSize: 10,
                }} >Balance amount to be adjusted:</Text>
              </View>
              <View>
              </View>
            </View>
          </div>
          <br />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 200 }}>
              <Text style={{
                ...styles.text, left: 5, padding: 5,
                fontFamily: 'CourierPrime', fontSize: 10,
              }} >Adjusted to IRO No.:</Text></View>
            <View>
            </View>
          </View>

          <div style={{ marginTop: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              {props.rowData?.specialSanction == true ? (
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <Text style={{
                    ...styles.text,
                    textAlign: 'center',
                    fontSize: 10,
                    fontWeight: 500,
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
                      src={`data:${props.rowData?.presidentSign?.[0]?.type};base64,${props.rowData?.presidentSign?.[0]?.base64}`}
                    />                  </View>
                  <View style={{ textAlign: 'center', alignItems: 'center' }}>
                    <Text style={{
                      ...styles.text1,
                      fontSize: 11,
                      textAlign: 'center',
                      // f
                      fontWeight: 500,
                      fontFamily: 'CourierPrime',
                    }}>
                      {(props.rowData.president as any)?? props.rowData.president}

                      {/* {props.rowData?.division?.details.president?.name?.basicDetails?.firstName} {props.rowData?.division?.details.president?.name?.basicDetails?.lastName} */}
                    </Text>
                    <Text style={{
                      ...styles.text1,
                      fontSize: 11,
                      fontWeight: 500,
                      fontFamily: 'CourierPrime',
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
                  fontWeight: 500,
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
                    src={`data:${props.rowData?.officeManagerSign?.[0]?.type};base64,${props.rowData?.officeManagerSign?.[0]?.base64}`}
                  />


                </View>

                <View style={{ textAlign: 'center', alignItems: 'center' }}>
                  <Text style={{
                    ...styles.text1,
                    fontSize: 11,
                    textAlign: 'center',
                    //
                    fontWeight: 500,
                    fontFamily: 'CourierPrime',
                  }}>
                    {props.officeMngrName ?? props.officeMngrName}                      </Text>
                  <Text style={{
                    ...styles.text1,
                    fontSize: 11,
                    fontWeight: 500,
                    fontFamily: 'CourierPrime',
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
              <Text style={{ ...styles.text, left: 5, fontFamily: 'CourierPrime' }}>Prepared By:</Text>
              <Text style={{ ...styles.text, marginTop: 3, left: 7, marginBottom: 3 }}>
                {props.rowData.preparedBy}
              </Text>

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
export default IROTemplateCustom;
