import moment from 'moment';
import { PDFCell, PDFTable, PDFTableHeader, PDFTableRow } from '../../IRO/components/PDFTable';
import { Page, Text, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

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
  tabletext: {
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


const FRreciptTemplate = (props:any) => {
  const rowData = props.rowData;
  const siNo = 1;
  console.log(rowData);
  return (
    <Document>
      <Page size="A4">
        <Image src="/iet_logo.png" style={styles.image} />
        <div>
          <Text style={styles.title}>REQUISITION FOR FINANCE</Text>
          <Text style={styles.address}>ADDRESS</Text>
          <Text style={styles.frno}>FRNO:{rowData._id}</Text>
          <Text style={styles.month}>For the Month of______</Text>
          <div>
            <Text style={styles.division}>Name of the Division:{rowData?.purposeDivision?.DivisionDetails.name}</Text>
            <Text style={styles.date}>Date:{moment(rowData.FRdate).format('DD-MM-YY')}</Text>
          </div>
        </div>
        <div style={{ marginTop: 200, width: 500, left: 50 }}>
          <PDFTable>
            <PDFTableHeader>
              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'40'}>
                Sl No
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100'}>
                Financial Requisition Particulars
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
            {rowData.Particulars.map((item:any, index:any) => (
              // eslint-disable-next-line react/jsx-key
              <PDFTableRow>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'40'}></PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100'}>{item.mainCategory}</PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'60'}></PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'80'}>{item.quantity}</PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100'}>{item.narration}</PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'110'}>{item.month}</PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'110'}>{item.requestedAmount}</PDFCell>
              </PDFTableRow>
            ))}
          </PDFTable>
        </div>

        <div style={{ marginTop: 290 }}>
          <Text style={{ left: 60, position: 'absolute', fontSize: 10 }}>Senior Leader Sign</Text>
          <Text style={{ left: 260, position: 'absolute', fontSize: 10 }}>Junior Leader Sign</Text>
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
            there is no needs of finance in your area for the month of you haw balance of money with you
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

export default FRreciptTemplate;
