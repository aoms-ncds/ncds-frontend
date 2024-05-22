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
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    left: 120,
    height: 60,
    width: 40,
    marginTop: 20,
  },
  heading: {
    position: 'absolute',
    left: 170,
    fontSize: 20,
    marginTop: 35,
    color: 'black',
    textDecoration: 'underline',
    textDecorationColor: 'red',

  },
  title: {
    marginTop: 70,
    fontSize: 15,
    position: 'absolute',
    left: 210,
    color: 'black',
    fontWeight: 800,
  },
  text: {
    fontSize: 10,
    color: 'black',
  },
  text1: {
    fontSize: 10,
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
    width: 600,
    // border: '1px solid #333',
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
    left: 50,
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
    fontSize: 10,
  },
});
const IROTemplate = (props: { rowData: any;fr:FR; mngrName?:any;officeMngrSign:any }) => {
  console.log(props, 'ssds');
  console.log(props.mngrName, 'IRO');
  console.log(props.rowData?.releaseAmount, 'bnk');
  const contentPerPage = Math.ceil(Object.keys(props.rowData).length / 2);
  console.log(contentPerPage, 'contentPerPage');

  let totalAmount = 0;
  let NewTot:any = 0;
  let totalAmount2 = 0;
  // const [coordinatorImage, setCoordinatrImage] = useState<string | null>(null);

  // console.log(props.rowData.division.details.coordinator, 'coordinatorImage');
  const totalSacntion =props.fr?.particulars.forEach((e)=>{
    totalAmount2 += e?.sanctionedAmount !=undefined ? e?.sanctionedAmount : 0;
  });
  NewTot += props?.fr?.sanctionedAmount !=undefined ? props?.fr?.sanctionedAmount: 0;
  console.log(NewTot, 'eee');
  console.log(totalAmount2, 'eee');

  const sanctionedAmount = NewTot?? totalAmount2;
  let sanctionedAmountWords = '';

  if (typeof sanctionedAmount !== 'undefined') {
    sanctionedAmountWords = numberToWords.toWords(sanctionedAmount);
  } else {
    sanctionedAmountWords = 'N/A';
  }
  // const dateString = props?.rowData?.releaseAmount?.transferredDate?? '';
  // console.log(dateString, 'dateString');

  // const formattedDate = moment(dateString)?.format('DD MMMM YYYY');
  // console.log(formattedDate, 'formattedDate');
  '';
  useEffect(() => {
    totalAmount = 0;
    NewTot = 0;
    totalAmount2 = 0;
  }, []);

  // const raiseddateString = printdetails?.IROdate;
  // const raiseddate = new Date(raiseddateString);
  // const option = { day: 'numeric', month: 'long', year: 'numeric' as const };
  // const raisformattedDate = raiseddate.toLocaleDateString('en-GB', option);

  return (
    <Document>
      <Page size="A4" >
        <div>
          <>
            <Image src="/3D Logo 3.png" style={styles.image} />
            <Text style={styles.heading}> INDIAN EVANGELICAL TEAM </Text></>
          {/* <Image src={`${'https://drive.google.com/uc?id=1DLTxXV4OwASqLKQz_Z6iZQUrDjrdVZQB&expor'}`} style={styles.image} /> */}
          <Text style={styles.title}> INTERNAL RELEASE ORDER </Text>
        </div>

        <div style={{ marginTop: 100 }}>
          {/* <Text style={{
                        ...styles.h1, fontWeight: 'bold',
                        fontFamily: 'Oswald'
                    }}>Financial Request Details</Text> */}
          <View style={{ ...styles.box, marginTop: 15, padding: 10 }}>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 300 }}>
                <Text style={{ ...styles.text, marginTop: 1, left: 50 }}>IRO No: {props.rowData?.IROno}</Text>
              </View>
              <View>
                <Text style={{ ...styles.text, marginTop: 1, left: 50 }}>IRO DATE: {props.rowData?.IRODate.format('DD/MM/YYYY')}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 300 }}>
                <Text style={{ ...styles.text, marginTop: 15, left: 50, marginBottom: 10 }}>Division Name: {props?.rowData?.division?.details.name ?? ''}
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.text, marginTop: 15, left: 50, marginBottom: 10 }}>Co-Ordinator Name: {(props?.rowData?.division?.details?.coordinator?.name?.basicDetails?.firstName ?? '') +
                  (props?.rowData?.division?.details?.coordinator?.name?.basicDetails?.lastName ?? '')}
                </Text>
              </View>
            </View>
          </View>

        </div>
        <div>
          <Text style={{
            ...styles.h1, fontWeight: 'bold',
            fontFamily: 'Oswald',
          }}>Finance Requisition Details</Text>
        </div>
        <div style={{ marginTop: 0 }}>
          <View style={{ ...styles.box4, marginTop: 2 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>FR NO: {props.fr?.FRno}
                </Text></View>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>FR Raised On: {props.fr?.createdAt.format('DD/MM/YYYY')}
                </Text></View>
              <View></View>
              <Text style={{ ...styles.text, marginTop: 10 }}>FR Verified On: {props.fr?.updatedAt.format('DD/MM/YYYY')}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 15, left: 20 }}>Requested For: {props.fr?.purpose}
                </Text></View>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 15, left: 20 }}>
                  Requested Amt: {props.fr?.particulars[0].requestedAmount}
                </Text>
              </View>
              <View>
                {/* <Text style={{ ...styles.text, marginTop: 15 }}>If special sanctioned: </Text> */}
              </View></View>
            <View style={{ flexDirection: 'row' }}>
            </View>
          </View>
        </div>
        <div style={{ marginTop: 15 }}>
          <Text style={{
            ...styles.h1, fontWeight: 'bold',
            fontFamily: 'Oswald',
          }}>IRO Details</Text>
        </div>
        <div style={{ marginTop: 0 }}>
          <View style={{ ...styles.box4, marginTop: 2 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>IRO Verified On: {props?.rowData?.IRODate.format('DD/MM/YYYY')}
                </Text></View>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>Reconciled On: {props.rowData.updatedAt?.format('DD/MM/YYYY')}
                </Text></View>
              <View></View>
              <Text style={{ ...styles.text, marginTop: 10 }}>IRO Closed On: {props.rowData.updatedAt?.format('DD/MM/YYYY')}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 15, left: 20 }}>Source Of Fund: {props.rowData?.sourceOfAccount ?? ''}
                </Text></View>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 15, left: 20 }}>Sanctioned Amt: {props.rowData?.sanctionedAmount ?? props.rowData.sanctionedAmountTotal}
                </Text></View>
              <View>
                {/* <Text style={{ ...styles.text, marginTop: 15 }}>Fund Source: </Text> */}
              </View></View>
            <View style={{ flexDirection: 'row' }}>
            </View>
          </View>
        </div>
        <div style={{ marginTop: 15 }}>
          <Text style={{
            ...styles.h1, fontWeight: 'bold',
            fontFamily: 'Oswald',
          }}>Beneficiary Bank Details</Text>
        </div>
        <div style={{ marginTop: 0 }}>
          <View style={{ ...styles.box5, marginTop: 2 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>Bank Name: {props.rowData?.releaseAmount?.transferredBank?.bankName}
                </Text></View>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>Branch Name: {props.rowData?.releaseAmount?.transferredBank?.branchName}
                </Text></View>
              <View></View>
              <Text style={{ ...styles.text, marginTop: 10 }}>Account No: {props.rowData?.releaseAmount?.transferredBank?.accountNumber ?? ''}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 15, left: 20 }}>IFSC Code: {props.rowData?.releaseAmount?.transferredBank?.IFSCCode ?? ''}
                </Text></View>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 15, left: 20 }}>Beneficiary Name: {props.rowData?.releaseAmount?.transferredBank?.beneficiary ?? ''}
                </Text></View>
              <View>
              </View></View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 15, left: 20 }}>Transaction ID: {props.rowData?.releaseAmount?.transactionNumber ?? ''}
                </Text></View>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 15, left: 20 }}>Transfer Method: {props.rowData?.releaseAmount?.modeOfPayment ?? ''}
                </Text></View>
              <View><Text style={{ ...styles.text, marginTop: 15 }}>Amt Released on: {props.rowData.releaseAmount?.transferredDate.format('DD/MM/YYYY')}</Text>
              </View></View>
          </View>
        </div>

      </Page>
      <Page size="A4" >
        <div style={{ marginTop: 25 }}>
          <PDFTable style={{ marginTop: 2, width: 500, left: 45, right: 15 }}>
            <PDFTableHeader>
              <PDFCell style={{
                textAlign: 'center', fontSize: 10, fontWeight: 'bold',
                fontFamily: 'Oswald',
              }} width={'80%'}>
                Sl No
              </PDFCell>
              <PDFCell style={{
                textAlign: 'center', fontSize: 10, fontWeight: 'bold',
                fontFamily: 'Oswald',
              }} width={'90%'}>
                Particulars
              </PDFCell>
              <PDFCell style={{
                textAlign: 'right', fontSize: 10, fontWeight: 'bold',
                fontFamily: 'Oswald',
                marginLeft: '20px',
              }} width={'100%'}>
                Narration
              </PDFCell>
              <PDFCell style={{
                textAlign: 'right', fontSize: 10, fontWeight: 'bold',
                marginLeft: '25px',
                fontFamily: 'Oswald',
              }} width={'100%'}>
                Qty
              </PDFCell>
              <PDFCell style={{
                textAlign: 'center', fontSize: 10, fontWeight: 'bold',
                fontFamily: 'Oswald',
                marginLeft: '18px',
              }} width={'100%'}>
                Rqst
                Amt
              </PDFCell>
              <PDFCell style={{
                textAlign: 'center', fontSize: 10, fontWeight: 'bold',
                fontFamily: 'Oswald',
              }} width={'100%'}>
                Sanctioned
                Amt
              </PDFCell>
              <PDFCell style={{
                textAlign: 'center', fontSize: 10, fontWeight: 'bold',
                fontFamily: 'Oswald',
              }} width={'100%'}>
                Sanctioned As Per
              </PDFCell>
            </PDFTableHeader>

            {props.rowData.particulars && props.rowData.particulars.map((item: Particular, index: number) => {
              totalAmount += item.requestedAmount ?? 0;
              // totalAmount2 += props.rowData.sanctionedAmount ?? 0;


              return (<PDFTableRow key={index} height='50' ><PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'20%'}>
                {String(index + 1)}
              </PDFCell>
              <div style={{ borderRight: 1, height: 50, borderRightColor: '#90e5fc' }}></div>
              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100%'}>
                {`${item.mainCategory} > ${item.subCategory1} > ${item.subCategory2} > ${item.subCategory3}`}
              </PDFCell>

              <div style={{ borderRight: 1, height: 50, borderRightColor: '#90e5fc' }}></div>
              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'80%'} >
                {item.narration}
              </PDFCell>
              <div style={{ borderRight: 1, height: 100, borderRightColor: '#90e5fc', marginTop: 50 }}></div>

              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'28%'}>
                {String(item.quantity)}
              </PDFCell>
              <div style={{ borderRight: 1, height: 100, borderRightColor: '#90e5fc' }}></div>

              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'30%'}>
                {String(item.requestedAmount)}
              </PDFCell>
              <div style={{ borderRight: 1, height: 100, borderRightColor: '#90e5fc' }}></div>
              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'40%'}>
                {String( props.rowData.sanctionedAmount?? item?.sanctionedAmount )}
              </PDFCell>
              <div style={{ borderRight: 1, height: 100, borderRightColor: '#90e5fc' }}></div>
              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'40%'}>
                {String(item?.sanctionedAsPer ?? '')}
              </PDFCell>
              {/* <PDFCell style={{ textAlign: 'cent  er', fontSize: 10 }} width={'100'}>
                    {item.sanctionedAmount?.toString()}
                  </PDFCell> */}
              </PDFTableRow>);
            })}
            <PDFTableRow key={props.rowData.particulars.length}>
              <PDFCell width={'10%'} ></PDFCell>
              {/* <PDFCell width={'100%'} ></PDFCell>
                            <PDFCell width={'100%'}></PDFCell> */}
              {/* <div style={{ borderRight: 1, height: 24, borderRightColor: '#90e5fc' }}></div> */}
              <PDFCell style={{ textAlign: 'center', paddingLeft: '20px', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'100%'}>
                Grand Total
              </PDFCell>
              {/* <div style={{ borderRight: 1, height: 24, borderRightColor: '#90e5fc' }}></div> */}
              <PDFCell width={'10%'} ></PDFCell>
              <PDFCell width={'10%'} ></PDFCell>
              <PDFCell style={{ paddingLeft: '30px', color: 'red', textAlign: 'center', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'55%'}>
                <br /> {totalAmount as any}
              </PDFCell>
              <PDFCell style={{ paddingRight: '30px', textAlign: 'center', color: 'red', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'55%'}>
                <br />{NewTot ?? totalAmount2}
              </PDFCell>
              <PDFCell width={'10%'} ></PDFCell>
            </PDFTableRow>
            <PDFTableRow key={props.rowData.particulars.length}>
              {/* <PDFCell width={'10%'} ></PDFCell> */}
              {/* <PDFCell width={'100%'} ></PDFCell>
                            <PDFCell width={'100%'}></PDFCell> */}
              {/* <div style={{ borderRight: 1, height: 24, borderRightColor: '#90e5fc' }}></div> */}
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'100%'}>
                Sanctioned Amount in Words:
              </PDFCell>
              {/* <div style={{ borderRight: 1, height: 24, borderRightColor: '#90e5fc' }}></div> */}
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'55%'}>
                {sanctionedAmountWords}
              </PDFCell>
            </PDFTableRow>
          </PDFTable>


        </div>

        <div style={{ marginTop: 5 }}>
          <View style={{ ...styles.box2, marginTop: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 200 }}>
                <Text style={{
                  ...styles.text, marginTop: 10, left: 15, fontWeight: 'bold',
                  fontFamily: 'Oswald',
                }} >Balance amount to be adjusted</Text></View>
              <View>
              </View>
            </View>
          </View>
        </div>

        <div style={{ marginTop: 5 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 300 }}>
            </View>
            <View>
              <Text style={{
                ...styles.text, fontWeight: 'bold',
                fontFamily: 'Oswald',
              }} >E Signature are protected</Text>
            </View>

          </View>
          <View style={{ flexDirection: 'row' }}>


            <View
              style={{ ...styles.box5, marginTop: 15, left: 400, width: 130 }}>
              <Image style={{
                height: 78,
                width: 128,
              }}
              src={`data:${props.officeMngrSign?.officeManagerSignature?.type};base64, ${props.officeMngrSign?.officeManagerSignature?.base64} `} />
            </View>

          </View>
          <View style={{ flexDirection: 'row' }}>

            <View
              style={{ ...styles.text2, marginTop: 5, left: 400, width: 130 }}
            >
              <Text style={{ ...styles.text1, fontSize: 10, marginTop: 15 }}>Office Manager</Text>
              <Text style={{ ...styles.text1, fontSize: 10, marginTop: 5 }}>{props.officeMngrSign?.officeManagerName} </Text>            </View>
          </View>
          <div style={{ marginTop: '15', marginBottom: '20' }}>
            <Text style={{ fontSize: 8, color: 'grey', left: 30 }} >
              This Document is electronically signed by authorized person of the Evangelical Team adding to the accuracy and content of the information submitted
            </Text>
          </div>
          {/* <View style={{ flexDirection: 'row', textAlign: 'right', width: 410 }} >
            <Text style={{ ...styles.text2, left: 400, fontSize: 10, marginTop: 5 }}>ADMINISTRATOR</Text>
          </View>
          <View style={{ flexDirection: 'row', textAlign: 'right', width: 410 }} >

            <Text style={{ ...styles.text2, left: 400, marginTop: 5, fontSize: 10 }}>SANCTIONING AUTHORITY</Text>
          </View> */}
        </div>
      </Page>

    </Document>
  );
};
export default IROTemplate;
