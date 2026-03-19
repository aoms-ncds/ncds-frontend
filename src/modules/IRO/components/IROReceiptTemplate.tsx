import { Avatar } from '@mui/material';
import { PDFCell, PDFTable, PDFTableHeader, PDFTableRow } from './PDFTable';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import moment from 'moment';
import * as numberToWords from 'number-to-words';
import { useState, useEffect } from 'react';

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
    color: 'red',
    textDecoration: 'underline',

  },
  title: {
    marginTop: 70,
    fontSize: 15,
    position: 'absolute',
    left: 210,
    color: 'red',
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
    fontSize: 10,
    left: 50,
    color: 'black',
  },
  box: {
    width: 490,
    border: '1px solid #333',
    left: 50,
  },
  box2: {
    width: 490,
    height: 30,
    border: '1px solid #333',
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
    height: 80,
    border: '1px solid #333',
    left: 50,
  },
  box5: {
    width: 80,
    height: 80,
    border: '1px solid #333',
    display: 'flex',
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
const IROReceiptTemplate = (props: { rowData: IROrder }) => {
  let totalAmount = 0;
  // const [coordinatorImage, setCoordinatrImage] = useState<string | null>(null);

  // console.log(props.rowData.division.details.coordinator, 'coordinatorImage');
  const sanctionedAmount = props.rowData && props.rowData?.sanctionedAmount;
  let sanctionedAmountWords = '';

  if (typeof sanctionedAmount !== 'undefined') {
    sanctionedAmountWords = numberToWords.toWords(sanctionedAmount?? '');
  } else {
    sanctionedAmountWords = 'N/A';
  }

  // const dateString = props?.rowData?.releaseAmount?.transferredDate?? '';
  // console.log(dateString, 'dateString');

  // const formattedDate = moment(dateString)?.format('DD MMMM YYYY');
  // console.log(formattedDate, 'formattedDate');
  '';
  useEffect(() => {

  }, [totalAmount]);

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
          <Text style={{
            ...styles.h1, fontWeight: 'bold',
            fontFamily: 'Oswald',
          }}>Financial Request Details</Text>
          <View style={{ ...styles.box, marginTop: 15 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>IRO No :{props.rowData?.IROno}</Text>
              </View>
              <View>
                <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>Request Raised Date :{props.rowData?.IRODate.format('DD/MM/YYYY')}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 15, left: 20, marginBottom: 10 }}>Fund Release date:{props?.rowData?.releaseAmount?.transferredDate?.format('DD/MM/YYYY') ?? ''}
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.text, marginTop: 15, left: 20, marginBottom: 10 }}>FR Reconciled Date:
                </Text>
              </View>
            </View>
          </View>

        </div>

        <div style={{ marginTop: 20 }}>
          <Text style={{
            ...styles.h1, fontWeight: 'bold',
            fontFamily: 'Oswald',
          }}>Division Details</Text>
          <View style={{ ...styles.box2, marginTop: 15 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>
  Division Name : {props.rowData.division?.details?.name ?? ''}
</Text>
              </View>
              <View>
  <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>
    Leader Name :
    {(props.rowData.division?.details?.coordinator?.name?.basicDetails?.firstName ?? '') +
      ' ' +
      (props.rowData.division?.details?.coordinator?.name?.basicDetails?.lastName ?? '')}
  </Text>
</View></View>
          </View>
        </div>

        <div style={{ marginTop: 30 }}>
          <Text style={{
            ...styles.h1, fontWeight: 'bold',
            fontFamily: 'Oswald',
          }}>Deposit Bank Details</Text>
          <View style={{ ...styles.box4, marginTop: 15 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>Bank Name :{props.rowData.releaseAmount?.transferredBank.branchName}
                </Text></View>
              <View></View>
              <Text style={{ ...styles.text, marginTop: 10 }}>Account No :{props.rowData.createdBy.division?.BeneficiaryBank1?.accountNumber ?? ''}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 15, left: 20 }}>Bank Branch :{props.rowData.createdBy.division?.BeneficiaryBank1?.branchName ?? ''}
                </Text></View>
              <View><Text style={{ ...styles.text, marginTop: 15 }}>Fund Source :{props.rowData.releaseAmount?.transferredBank.bankName}</Text>
              </View></View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 180 }}>
                <Text style={{ ...styles.text, marginTop: 15, left: 20 }}>Transfer Type :{props.rowData?.releaseAmount?.modeOfPayment ?? ''}
                </Text></View>
              <View>
                <Text style={{ ...styles.text, marginTop: 15 }}>Transaction Id :{props.rowData?.releaseAmount?.transactionNumber ?? 0}</Text>
              </View>
            </View></View>
        </div>

        <div style={{ marginTop: 25 }}>
          <Text style={{
            ...styles.h1, fontWeight: 'bold',
            fontFamily: 'Oswald',
          }}>Expense Details</Text>
          <PDFTable style={{ marginTop: 15, width: 500, left: 45, right: 15 }}>
            <PDFTableHeader>
              <PDFCell style={{
                textAlign: 'center', fontSize: 10, fontWeight: 'bold',
                fontFamily: 'Oswald',
              }} width={'50%'}>
                Sl No
              </PDFCell>
              <PDFCell style={{
                textAlign: 'center', fontSize: 10, fontWeight: 'bold',
                fontFamily: 'Oswald',
              }} width={'100%'}>
                Main Category
              </PDFCell>
              <PDFCell style={{
                textAlign: 'center', fontSize: 10, fontWeight: 'bold',
                fontFamily: 'Oswald',
              }} width={'100%'}>
                Narration
              </PDFCell>
              <PDFCell style={{
                textAlign: 'center', fontSize: 10, fontWeight: 'bold',
                fontFamily: 'Oswald',
              }} width={'40%'}>
                Requested Amount
              </PDFCell>
            </PDFTableHeader>

            {props.rowData.particulars && props.rowData.particulars.map((item: Particular, index: number) => {
              totalAmount += item.requestedAmount ?? 0;
              return (<PDFTableRow key={index} height='50' ><PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'50%'}>
                {String(index + 1)}
              </PDFCell>
              <div style={{ borderRight: 1, height: 50, borderRightColor: '#90e5fc' }}></div>

              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100%'}>
                {item.mainCategory}
              </PDFCell>
              <div style={{ borderRight: 1, height: 50, borderRightColor: '#90e5fc' }}></div>

              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100%'}>
                {item.narration}
              </PDFCell>
              <div style={{ borderRight: 1, height: 50, borderRightColor: '#90e5fc' }}></div>

              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'40%'}>
                {String(item.requestedAmount)}
              </PDFCell>
              {/* <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100'}>
                    {item.sanctionedAmount?.toString()}
                  </PDFCell> */}
              </PDFTableRow>);
            })}
            <PDFTableRow key={props.rowData.particulars.length}>
              <PDFCell width={'50%'} ></PDFCell>
              <PDFCell width={'100%'} ></PDFCell>
              <PDFCell width={'100%'}></PDFCell>
              <div style={{ borderRight: 1, height: 24, borderRightColor: '#90e5fc' }}></div>
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'100%'}>
                Total amount :
              </PDFCell>
              <div style={{ borderRight: 1, height: 24, borderRightColor: '#90e5fc' }}></div>
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'55%'}>
                {totalAmount.toString() + '/-'}
              </PDFCell>
            </PDFTableRow>
          </PDFTable>


        </div>

        <div style={{ marginTop: 20 }}>
          <View style={{ ...styles.box2, marginTop: 15 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 130 }}>
                <Text style={{
                  ...styles.text, marginTop: 10, left: 15, fontWeight: 'bold',
                  fontFamily: 'Oswald',
                }} >Sanctioned Amount in Words : </Text></View>
              <View>
                <Text style={{ ...styles.text, marginTop: 12 }} >{sanctionedAmountWords.charAt(0).toUpperCase() +
                  sanctionedAmountWords.slice(1, sanctionedAmountWords.length)} only</Text>
              </View>
            </View>
          </View>
        </div>

        <div style={{ marginTop: 25 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 400 }}>
              <Text style={{
                ...styles.text, fontWeight: 'bold',
                fontFamily: 'Oswald', left: 50,
              }} >E Signature</Text></View>
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
              src={`data:${props.rowData?.signature?.officeManagerSignature?.type};base64, ${props.rowData?.signature?.officeManagerSignature?.base64} `} />
            </View>

          </View>
          <View style={{ flexDirection: 'row' }}>

            <View
              style={{ ...styles.text2, marginTop: 15, left: 400, width: 130 }}
            >
              <Text style={{ ...styles.text1, fontSize: 10, marginTop: 15 }}>Office Manager</Text>
              <Text style={{ ...styles.text1, fontSize: 10, marginTop: 5 }}>{props.rowData?.signature?.officeManagerSignature?.filename}</Text>
            </View>
          </View>
          {/* <View style={{ flexDirection: 'row', textAlign: 'right', width: 410 }} >
            <Text style={{ ...styles.text2, left: 400, fontSize: 10, marginTop: 5 }}>ADMINISTRATOR</Text>
          </View>
          <View style={{ flexDirection: 'row', textAlign: 'right', width: 410 }} >

            <Text style={{ ...styles.text2, left: 400, marginTop: 5, fontSize: 10 }}>SANCTIONING AUTHORITY</Text>
          </View> */}
        </div>
        <div style={{ marginTop: '15', marginBottom: '20' }}>
          <Text style={{ fontSize: 8, color: 'grey', left: 30 }} >
            This Document is electronically signed by authorized person of the Evangelical Team adding to the accuracy and content of the information submitted
          </Text>
        </div>
      </Page>
    </Document>
  );
};
export default IROReceiptTemplate;
