import moment from 'moment';
import { PDFCell, PDFTable, PDFTableHeader, PDFTableRow } from '../../IRO/components/PDFTable';
import { Page, Text, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import axios from 'axios';
import React from 'react';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    left: 260,
    height: 50,
    width: 50,
    marginTop: 30,
  },
  title: {
    marginTop: 90,
    fontSize: 12,
    position: 'absolute',
    left: 210,
    color: 'darkblue',
  },
  address: {
    marginTop: 114,
    fontSize: 10,
    position: 'absolute',
    left: 260,
    color: 'black',
  },
  frno: {
    marginTop: 126,
    fontSize: 10,
    position: 'absolute',
    left: 270,
    color: 'black',
  },
  month: {
    marginTop: 140,
    fontSize: 10,
    position: 'absolute',
    left: 230,
    color: 'black',
  },
  division: {
    marginTop: 170,
    fontSize: 10,
    position: 'absolute',
    left: 100,
    color: 'black',
  },
  date: {
    marginTop: 170,
    fontSize: 10,
    position: 'absolute',
    left: 400,
    color: 'black',
  },
  table: {
    width: '700',
    position: 'absolute',
    left: 50,
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
  box: {
    width: 478,
    height: 200,
    border: '1pt solid black',
    marginTop: 1,
  },
  box1: {
    width: 478,
    height: 30,
    marginTop: 1,
  },
});


const FRReceiptTemplate = (props:any) => {
  const rowData = props.rowData;
  const month=moment(rowData.FRdate);
  const monthName = month.format('MMMM');
  // const [imageData, setImageData] = React.useState('');

  console.log(rowData);
  return (
    <Document>
      <Page size="A4">
        <Image src="/iet_logo.png" style={styles.image} />
        {/* <Image
          style={styles.image}
          // eslint-disable-next-line max-len, max-len, max-len
          src="data:image/jpeg;base64,
          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
          4eSb0Wloj5eSxYuO0vLRqS0//2Q== "/> */}


        {/* <Image src={imageData}/> */}
        <div>
          <Text style={styles.title}>REQUISITION FOR FINANCE</Text>
          <Text style={styles.address}>ADDRESS</Text>
          <Text style={styles.frno}>FRNO:{rowData.FRno}</Text>
          <Text style={styles.month}>For the Month of:{monthName}</Text>
          <div>
            <Text style={styles.division}>Name of the Division:{rowData?.createdBy?.officialDetails?.division?.details?.name}</Text>
            <Text style={styles.date}>Date:{moment(rowData.FRdate).format('DD-MM-yyyy')}</Text>
          </div>
        </div>
        <div style={{ marginTop: 200, width: 500, left: 50 }}>
          <PDFTable>
            <PDFTableHeader>
              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'40'}>
                Sl No
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100'}>
                Financial Requisition particulars
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'60'}>
                Sub Division Name
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'60'}>
                Quantity
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100'}>
                Description
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'110'}>
                Need Of Month
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'110'}>
                Total
              </PDFCell>
            </PDFTableHeader>
            {rowData.particulars && rowData.particulars.map((item: Particular, index: number) => (
              <PDFTableRow key={index}>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'40'}>
                  {String(index + 1)}
                </PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100'}>
                  {item.mainCategory}
                </PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'60'}>
                  {rowData?.purposeSubdivision?.name}
                </PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'80'}>
                  {String(item.quantity)}
                </PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100'}>
                  {item.narration}
                </PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'110'}>
                  {item.month}
                </PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'110'}>
                  {String(item.requestedAmount)}
                </PDFCell>
              </PDFTableRow>
            ))}


          </PDFTable>
        </div>

        <div style={{ marginTop: 290 }}>
          <Text style={{ left: 60, position: 'absolute', fontSize: 10 }}>coordinator Leader Sign</Text>
          <Text style={{ left: 260, position: 'absolute', fontSize: 10 }}>Senior Leader Sign</Text>
          <Text style={{ left: 460, position: 'absolute', fontSize: 10 }}>Junior Leader Sign</Text>
        </div>
        <div style={{ marginTop: 10, fontSize: 10 }}>
          <Text style={{ left: 60, position: 'absolute', fontSize: 10 }}>Date:</Text>
          <Text style={{ left: 260, position: 'absolute', fontSize: 10 }}>Date:</Text>
          <Text style={{ left: 460, position: 'absolute', fontSize: 10 }}>Date:</Text>
        </div>

        <div style={{ marginTop: 80 }}>
          <Text style={{ fontSize: 12, paddingLeft: 40, paddingRight: 40 }}>
            * The Original requisition must reach Delhi Office by 15 of the previous month for which money is requested. If it is not received in Delhi Office by that date, it will be presumed that
            there is no needs of finance in your area for the month of you have balance of money with you
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: 20,
              paddingLeft: 40,
              paddingRight: 40,
            }}
          >
            * All Disputes are subjected to Delhi jurisdiction
          </Text>
        </div>
      </Page>
    </Document>
  );
};

export default FRReceiptTemplate;
