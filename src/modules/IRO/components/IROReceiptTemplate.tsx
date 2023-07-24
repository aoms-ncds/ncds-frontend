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
    position: 'absolute',
  },
  text1: {
    fontSize: 10,
    color: 'black',
    position: 'absolute',
    marginTop: 100,
  },
  text2: {
    fontSize: 8,
    color: 'black',
    position: 'absolute',
    marginTop: 114,
  },
  h1: {
    fontSize: 10,
    position: 'absolute',
    left: 50,
    color: 'black',
  },
  box: {
    width: 490,
    height: 50,
    border: '1px solid #333',
    position: 'absolute',
    left: 50,
  },
  box2: {
    width: 490,
    height: 30,
    border: '1px solid #333',
    position: 'absolute',
    left: 50,
  },
  box3: {
    width: 490,
    height: 100,
    border: '1px solid #333',
    position: 'absolute',
    left: 50,
  },
  box4: {
    width: 490,
    height: 80,
    border: '1px solid #333',
    position: 'absolute',
    left: 50,
  },
  box5: {
    width: 80,
    height: 80,
    border: '1px solid #333',
    position: 'absolute',
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
const IROReceiptTemplate = (props:{rowData:IROrder}) => {
  let totalAmount=0;
  const [coordinatorImage, setCoordinatrImage] = useState<string | null>(null);
  console.log(props);
  // console.log(props.rowData.division.details.coordinator, 'coordinatorImage');


  // useEffect(() => {
  //   if (props.rowData && props.rowData.division.details.coordinator.sign.downloadURL) {
  //     const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  //     const url = props.rowData.division.details.coordinator.sign.downloadURL;


  //     fetch(url)
  //       .then((response) => response.blob())
  //       .then((blob) => {
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //           setCoordinatorImage(reader.result as string);
  //         };
  //         reader.readAsDataURL(blob);
  //       })
  //       .catch((error) => {
  //         console.error('Error downloading images:', error);
  //       });
  //   }
  // }, [props.rowData]);


  const sanctionedAmount = props.rowData && props.rowData?.sanctionedAmount;
  let sanctionedAmountWords = '';

  if (typeof sanctionedAmount !== 'undefined') {
    sanctionedAmountWords = numberToWords.toWords(sanctionedAmount);
  } else {
    sanctionedAmountWords = 'N/A';
  }

  const dateString = props.rowData?.releaseAmount?.transferredDate;
  const formattedDate = moment(dateString).format('DD MMMM YYYY');
  useEffect(() => {
    console.log(totalAmount, 'xcdfv');
  }, [totalAmount]);

  // const raiseddateString = printdetails?.IROdate;
  // const raiseddate = new Date(raiseddateString);
  // const option = { day: 'numeric', month: 'long', year: 'numeric' as const };
  // const raisformattedDate = raiseddate.toLocaleDateString('en-GB', option);

  return (
    <Document>
      <Page size="A4">
        <div>
          <>
            <Image src="/iet_logo.png" style={styles.image} />
            <Text style={styles.heading}> INDIAN EVANGELICAL TEAM </Text></>
          {/* <Image src={`${'https://drive.google.com/uc?id=1DLTxXV4OwASqLKQz_Z6iZQUrDjrdVZQB&expor'}`} style={styles.image} /> */}
          <Text style={styles.title}> INTERNAL RELEASE ORDER </Text>
        </div>

        <div style={{ marginTop: 120 }}>
          <Text style={{ ...styles.h1, fontWeight: 'bold',
            fontFamily: 'Oswald' }}>Financial Request Details</Text>
          <View style={{ ...styles.box, marginTop: 15 }}>
            <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>IRO No :{props.rowData?.IROno} </Text>
            <Text style={{ ...styles.text, marginTop: 10, left: 200 }}>Request Raised Date :{props.rowData?.IRODate.format('DD/MM/YYYY')}</Text>
            <Text style={{ ...styles.text, marginTop: 30, left: 20 }}>Fund Release date:{formattedDate}</Text>
            <Text style={{ ...styles.text, marginTop: 30, left: 200 }}>FR Reconciled Date:</Text>

          </View>

        </div>

        <div style={{ marginTop: 80 }}>
          <Text style={{ ...styles.h1, fontWeight: 'bold',
            fontFamily: 'Oswald' }}>Division Details</Text>
          <View style={{ ...styles.box2, marginTop: 15 }}>
            <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>Division Name :{props.rowData?.division?.details.name}</Text>
            <Text style={{ ...styles.text, marginTop: 10, left: 200 }}>Leader Name :{props.rowData?.division?.details.coordinator.name?.basicDetails?.firstName +
            ' '+ props.rowData?.division?.details.coordinator.name?.basicDetails?.lastName}</Text>
          </View>
        </div>

        <div style={{ marginTop: 60 }}>
          <Text style={{ ...styles.h1, fontWeight: 'bold',
            fontFamily: 'Oswald' }}>Deposit Bank Details</Text>
          <View style={{ ...styles.box4, marginTop: 15 }}>
            <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>Bank Name :{props.rowData?.releaseAmount?.transferredBank.bankName}</Text>
            <Text style={{ ...styles.text, marginTop: 10, left: 200 }}>Account No :{props.rowData?.releaseAmount?.transferredBank.accountNumber}</Text>
            <Text style={{ ...styles.text, marginTop: 30, left: 20 }}>Bank Branch :{props.rowData?.releaseAmount?.transferredBank.branchName}</Text>
            <Text style={{ ...styles.text, marginTop: 30, left: 200 }}>Fund Source :{props.rowData?.releaseAmount?.transferredBank.bankName}</Text>
            <Text style={{ ...styles.text, marginTop: 50, left: 20 }}>Transfer Type :{props.rowData?.releaseAmount?.modeOfPayment}</Text>
            <Text style={{ ...styles.text, marginTop: 50, left: 200 }}>Transaction Id :{props.rowData?.releaseAmount?.transactionNumber}</Text>
          </View>
        </div>

        <div style={{ marginTop: 110 }}>
          <Text style={{ ...styles.h1, fontWeight: 'bold',
            fontFamily: 'Oswald' }}>Expense Details</Text>
          <PDFTable style={{ marginTop: 15, width: 500, left: 45, right: 15 }}>
            <PDFTableHeader>
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold',
                fontFamily: 'Oswald' }} width={'50%'}>
                  Sl No
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold',
                fontFamily: 'Oswald' }} width={'100%'}>
                  Main Category
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold',
                fontFamily: 'Oswald' }} width={'100%'}>
                  Narration
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold',
                fontFamily: 'Oswald' }} width={'40%'}>
                  Requested Amount
              </PDFCell>
            </PDFTableHeader>

            {props.rowData.particulars && props.rowData.particulars.map((item: Particular, index: number) => {
              totalAmount += item.requestedAmount??0;
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
                {totalAmount.toString()+'/-'}
              </PDFCell>
            </PDFTableRow>
          </PDFTable>


        </div>

        <div style={{ marginTop: 30 }}>
          <View style={{ ...styles.box2, marginTop: 15 }}>
            <Text style={{ ...styles.text, marginTop: 10, left: 20, fontWeight: 'bold',
              fontFamily: 'Oswald' }}>Sanctioned Amount in Words : </Text>
            <Text style={{ ...styles.text, marginTop: 13, left: 130 }} >{sanctionedAmountWords.charAt(0).toUpperCase()+sanctionedAmountWords.slice(1, sanctionedAmountWords.length)} only</Text>
          </View>
        </div>

        <div style={{ marginTop: 80 }}>
          <Text style={{ ...styles.text, marginTop: 1, left: 50, fontWeight: 'bold',
            fontFamily: 'Oswald' }}>E Signature</Text>
          <Text style={{ ...styles.text, marginTop: 1, left: 410, fontWeight: 'bold',
            fontFamily: 'Oswald' }}>E Signature are protected</Text>
          <View style={{ ...styles.box5, marginTop: 15, left: 50 }}></View>
          <View style={{ ...styles.box5, marginTop: 15, left: 130 }}></View>
          <View style={{ ...styles.box5, marginTop: 15, left: 210 }}></View>
          <View style={{ ...styles.box5, marginTop: 15, left: 290 }}></View>
          <View style={{ ...styles.box5, marginTop: 15, left: 410, width: 130 }}></View>
          <Text style={{ ...styles.text1, left: 410, fontSize: 10, marginTop: 110 }}>NAME</Text>

          <Text style={{ ...styles.text1, left: 50 }}>Division Leader</Text>
          <Text style={{ ...styles.text1, left: 130 }}>Workers Dept</Text>
          <Text style={{ ...styles.text1, left: 210 }}>Account Manager</Text>
          <Text style={{ ...styles.text1, left: 300 }}>Accountant</Text>
          <Text style={{ ...styles.text2, left: 410, fontSize: 10, marginTop: 124 }}>ADMINISTRATOR</Text>
          <Text style={{ ...styles.text2, left: 410, marginTop: 138, fontSize: 10 }}>SANCTIONING AUTHORITY</Text>
        </div>
        <div style={{ marginTop: 180 }}>
          <Text style={{ fontSize: 8, color: 'grey', left: 30 }}>
            This Document is electronically signed by authorized person of the Evangelical Team adding to the accuracy and content of the information submitted
          </Text>
        </div>
      </Page>
    </Document>
  );
};
export default IROReceiptTemplate;
