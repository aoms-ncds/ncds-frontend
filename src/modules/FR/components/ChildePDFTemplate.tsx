import ReactPDF, { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import moment from 'moment';
import { useEffect, useState } from 'react';
import UserLifeCycleStates from '../../User/extras/UserLifeCycleStates';
import WorkersServices from '../../Workers/extras/WorkersServices';
import ChildrenServices from '../../Workers/extras/ChildrenServices';

Font.register({
  family: 'Teko',
  src: 'https://fonts.googleapis.com/css2?family=Teko:wght@300&display=swap',
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  box5: {
    width: 490,
    height: 80,
    border: '1px solid #333',
    // left: 50,
    position: 'absolute',
    right: '1600',
    transform: 'rotate(-90deg)'
  },
  heading: {
    position: 'absolute',
    right: '1600',
    marginTop: 1000,
    // marginTop: 60,
    fontWeight: 100,
    transform: 'rotate(-90deg)'
  },
  headingLine: {
    position: 'absolute',
    left: '0',
    right: '0',
    top: 85,
    borderBottom: 1,
    borderColor: 'black',
  },
  container: {
    transform: 'rotate(90deg)',
  },
  line: {
    position: 'absolute',
    left: '20',
    right: '1550',
    top: 90,
    marginTop: 1000,
    borderBottom: 1,
    borderColor: 'black',
    transform: 'rotate(-90deg)'
  },
  line1: {
    position: 'absolute',
    left: '20',
    right: 15,
    top: 90,
    borderBottom: 1,
    borderColor: 'black',
  },
  tableContainer: {
    position: 'relative',
    right: '800',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 1100,// Adjust this value to set the table's position
    width: 2000,
    transform: 'rotate(-90deg)', // Rotate the table by 90 degrees clockwise
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    height: 30,
    left: 20,
  },
  tableCell: {
    flex: 1,
    fontSize: 6,
    padding: 2,
    textAlign: 'center',
  },
  grid: {
    borderRight: 1,
    height: 30,
  },
  
});

// Create Document Component
const ChildePDFTemplate = (props:{divisionId:string|null;workerId:string|null}) => {
    console.log(props, '√poprosp');
    
  const [workers, setWorkers] = useState<Child[] | null>(null);

  console.log(workers, 'pop');
  
  useEffect(() => {
    console.log(props, 'props');
    if (props.workerId) {
      ChildrenServices.getById(props.workerId).then((res)=>res?.data && setWorkers([res?.data]));
    } else if (props.divisionId) {
        ChildrenServices.getAll({ status: UserLifeCycleStates.ACTIVE, division: props.divisionId })
    .then((res) => {
      console.log(res);
      setWorkers(res.data);
    })
      .catch((res) => {
        console.log(res);
      });
    }
  }, [props]);

  return (
    <Document>
      <Page size={'A1'}  style={styles.page}>
        <Text style={styles.heading}>REPORT</Text>
        {/* <View style={styles.line} /> */}
        <View style={styles.tableContainer} >
          <View style={styles.tableRow} key={0}>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Sl No.</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Childe Code</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>First Name</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Last Name</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Division</Text>
            <div style={styles.grid}></div>
            {/* <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Sub-Division</Text>
            <div style={styles.grid}></div> */}
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>DOB</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Age</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Gender</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>CEA Amount</Text>
            <div style={styles.grid}></div>
          </View>

          {workers?.map((row, index) => (<>
            <View style={styles.tableRow} key={row._id}>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{index}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.childCode}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.firstName}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.lastName}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{(row.division as unknown as Division | undefined)?.details?.name}</Text>
              <div style={styles.grid}></div> 
              {/* <Text style={styles.tableCell}>{row.lastName}</Text> */}
              {/* <div style={styles.grid}></div> */}
              <Text style={styles.tableCell}>{row.dateOfBirth instanceof Date ? row.dateOfBirth?.toLocaleDateString('en-GB') : ''}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{(row.dateOfBirth?.fromNow() || '')?.replace(' ago', '')}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.gender}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.childSupport.amount}</Text>
              <div style={styles.grid}></div>
            </View>
          </>
          ))}

          <View style={{ ...styles.tableRow, backgroundColor: '#bdbdbd' }} key={1} >
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
          </View>

        </View>

        <View
              style={{ ...styles.box5, marginTop: 15, left: 1200, width: 130 }}>
              {/* <Image style={{
                height: 78,
                width: 128,
              }}
              src={`data:`} /> */}
            </View>
      </Page>
    </Document>
  );
};


export default ChildePDFTemplate;
