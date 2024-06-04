/* eslint-disable react/jsx-key */
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import UserLifeCycleStates from '../../User/extras/UserLifeCycleStates';
import WorkersServices from '../../Workers/extras/WorkersServices';

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
    left: 270,
    color: 'darkblue',
  },

  month: {
    marginTop: 80,
    fontSize: 12,
    position: 'absolute',
    left: 350,
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
    height: 50,
    left: 20,
  },
  tableHead: {
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
  headGrid: {
    borderRight: 1,
    height: 30,
    // paddingRight: 50,
  },
  cellGrid: {
    borderRight: 1,
    height: 50,
  },
});

// Create Document Component
const ChildeSupportSignSheet = (props:{data:Child[]|null; total:number; month:string | null}) => {
  const [workers, setWorkers] = useState<IWorker[] | null>(null);
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const rowsPerPage = 8;
  const totalPages = Math.ceil((props?.data ?? []).length / rowsPerPage);
  console.log(totalPages, 'totalPages');

  // Function to get rows for a specific page
  const getRowsForPage = (page:any) => {
    const start = page * rowsPerPage;
    return props?.data?.slice(start, start + rowsPerPage);
  };
  const d = new Date();
  const name = month[d.getMonth()];
  const year = new Date().getFullYear();
  const [purpose, setPurpose] = useState('Division');
  // console.log(props?.data?.map((e)=>e?.childOf?.division?.details?.name), 'rte');
  const [total, setTotal] = useState<number>(0);
  const div= props?.data?.map((e:any)=>e.division?.details?.name);
  console.log(props, 'pop');
  useEffect(() => {
    let tot = 0;
    props.data?.map((i) => {
      tot += i.childSupport?.amount;
      setTotal(tot);
    });
    // console.log(tot, 'tot');
  }, [props]);
  return (
    <Document>
      <Page size={'A4'} style={styles.page} orientation='landscape'>
        <div>
          <Image src="/3D Logo 3.png" style={styles.image} />
          <Text style={styles.title}>
            {`CHILD SUPPORT SIGNATURE SHEET OF ${div?.[0]}`} - {props.data?.[0]?.childOf?.officialDetails?.divisionHistory[0]?.subDivision?.name}
          </Text>
          <Text style={styles.month}>{`For the Month of ${props?.month ?? ''}`} {year}</Text>
          {/* <Text style={styles.IRONo}>{`IRO No: ${props.data.IRONo}`}</Text> */}
          {/* <Text style={styles.paymentDate}>{`Date Of payment: ${props.data.date}`}</Text> */}
        </div>
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <><View style={styles.line} /><View style={styles.tableContainer}>
            <View style={{ ...styles.tableRow, height: 30 }} key={0}>
              <div style={styles.headGrid}></div>
              <Text style={styles.tableHead}>Sl No.</Text>
              <div style={styles.headGrid}></div>
              <Text style={styles.tableHead}>Child Code</Text>
              <div style={styles.headGrid}></div>
              <Text style={styles.tableHead}>Child Name</Text>
              <div style={styles.headGrid}></div>
              <Text style={styles.tableHead}>Chid Of</Text>
              <div style={styles.headGrid}></div>
              <Text style={styles.tableHead}>Division</Text>
              <div style={styles.headGrid}></div>
              <Text style={styles.tableHead}>Net Amount</Text>
              <div style={styles.headGrid}></div>
              <Text style={styles.tableHead}></Text>
              {/* <div style={styles.headGrid}></div> */}
              <Text style={styles.tableHeadCopy}>Signature</Text>
              <div style={styles.headGrid}></div>
            </View>

            {getRowsForPage(pageIndex)?.map((row: any, index: any) => (<>
              <View style={styles.tableRow} key={row._id}>
                <div style={styles.cellGrid}></div>
                <Text style={styles.tableCell}>{index + 1}</Text>
                <div style={styles.cellGrid}></div>
                <Text style={styles.tableCell}>{row.childCode}</Text>
                <div style={styles.cellGrid}></div>
                <Text style={styles.tableCell}>
                  {row.firstName}{' '}
                  <Text style={styles.tableCell}>{row.lastName} </Text>
                </Text><div style={styles.cellGrid}></div>
                <Text style={styles.tableCell}>{row?.childOf?.basicDetails?.firstName} {' '} {row?.childOf?.basicDetails?.lastName}</Text>
                <div style={styles.cellGrid}></div>
                <Text style={styles.tableCell}>{row.division?.details?.name ?? ''}</Text>
                <div style={styles.cellGrid}></div>
                <Text style={styles.tableCell}>{row.childSupport?.amount != 0 ? row.childSupport?.amount : ''}</Text>
                <div style={styles.cellGrid}></div>
                <Text style={styles.tableCell}></Text>
                {/* <div style={styles.cellGrid}></div> */}
                <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
                <div style={styles.cellGrid}></div>
              </View>
            </>
            ))}
          </View></>
        ))}
        <View style={{ ...styles.tableRow, backgroundColor: '#bdbdbd', height: 30 }} key={1}>
          <div style={styles.headGrid}></div>
          <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
          <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
          <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
          <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
          <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
          <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
          <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
          <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
          <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
          <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
          <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
          <Text style={{
            flex: 2,
            fontSize: 12,
            padding: 2,
            textAlign: 'center', fontWeight: 'bold', fontFamily: 'Oswald',
          }}>Total Net Amount</Text>
          <div style={{ ...styles.headGrid }}></div>
          <Text style={{ ...styles.tableCell, fontWeight: 'ultrabold', fontFamily: 'Oswald', fontSize: 16 }}>{Number.isNaN(total) ? 0 : total}</Text>
          <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
          <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}> </Text>
          <div style={styles.headGrid}></div>
        </View>
      </Page>
    </Document>
  );
};


export default ChildeSupportSignSheet;
