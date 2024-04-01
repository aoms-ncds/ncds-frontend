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
    right: '1400',
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

//     const basic=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.basic? total + Number(worker.supportStructure?.basic):total,
//       0,
//     );
//     const prevBasic=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevBasic? total + Number(worker.supportStructure?.prevBasic):total,
//       0,
//     );
//     const HRA=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.HRA? total + Number(worker.supportStructure?.HRA):total,
//       0,
//     );
//     const prevHRA=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevHRA? total + Number(worker.supportStructure?.prevHRA):total,
//       0,
//     );
//     const spouseAllowance=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.spouseAllowance? total + Number(worker.supportStructure?.spouseAllowance):total,
//       0,
//     );
//     const prevSpouseAllowance=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevSpouseAllowance? total + Number(worker.supportStructure?.prevSpouseAllowance):total,
//       0,
//     );
//     const positionalAllowance=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.positionalAllowance? total + Number(worker.supportStructure?.positionalAllowance):total,
//       0,
//     );
//     const prevPositionalAllowance=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevPositionalAllowance? total + Number(worker.supportStructure?.prevPositionalAllowance):total,
//       0,
//     );
//     const specialAllowance=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.specialAllowance? total + Number(worker.supportStructure?.specialAllowance):total,
//       0,
//     );
//     const prevSpecialAllowance=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevSpecialAllowance? total + Number(worker.supportStructure?.prevSpecialAllowance):total,
//       0,
//     );
//     const impactDeduction=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.impactDeduction? total + Number(worker.supportStructure?.impactDeduction):total,
//       0,
//     );
//     const prevImpactDeduction=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevImpactDeduction? total + Number(worker.supportStructure?.prevImpactDeduction):total,
//       0,
//     );
//     const telAllowance=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.telAllowance? total + Number(worker.supportStructure?.telAllowance):total,
//       0,
//     );
//     const prevTelAllowance=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevTelAllowance? total + Number(worker.supportStructure?.prevTelAllowance):total,
//       0,
//     );
//     const PIONMissionaryFund=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.PIONMissionaryFund? total + Number(worker.supportStructure?.PIONMissionaryFund):total,
//       0,
//     );
//     const prevPIONMissionaryFund=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevPIONMissionaryFund? total + Number(worker.supportStructure?.prevPIONMissionaryFund):total,
//       0,
//     );
//     const MUTDeduction=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.MUTDeduction? total + Number(worker.supportStructure?.MUTDeduction):total,
//       0,
//     );
//     const prevMUTDeduction=workers?.reduce(
//       (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevMUTDeduction? total + Number(worker.supportStructure?.prevMUTDeduction):total,
//       0,
//     );
//     setTotal({
//       basic: basic,
//       prevBasic: prevBasic,
//       HRA: HRA,
//       prevHRA: prevHRA,
//       spouseAllowance: spouseAllowance,
//       prevSpouseAllowance: prevSpouseAllowance,
//       positionalAllowance: positionalAllowance,
//       prevPositionalAllowance: prevPositionalAllowance,
//       specialAllowance: specialAllowance,
//       prevSpecialAllowance: prevSpecialAllowance,
//       impactDeduction: impactDeduction,
//       prevImpactDeduction: prevImpactDeduction,
//       telAllowance: telAllowance,
//       prevTelAllowance: prevTelAllowance,
//       PIONMissionaryFund: PIONMissionaryFund,
//       prevPIONMissionaryFund: prevPIONMissionaryFund,
//       MUTDeduction: MUTDeduction,
//       prevMUTDeduction: prevMUTDeduction,
//       total: (basic ?? 0) +
//     (HRA ?? 0) +
//     (spouseAllowance ?? 0) +
//     (positionalAllowance ?? 0) +
//     (specialAllowance ?? 0) +
//     (PIONMissionaryFund ?? 0) +
//     (telAllowance ?? 0),
//       deduction: (impactDeduction ?? 0) +
//     (MUTDeduction ?? 0),
//       net: (basic ?? 0) +
//     (HRA ?? 0) +
//     (spouseAllowance ?? 0) +
//     (positionalAllowance ?? 0) +
//     (specialAllowance ?? 0) +
//     (PIONMissionaryFund ?? 0) +
//     (telAllowance ?? 0) -
//     (
//       (impactDeduction ?? 0) +
//       (MUTDeduction ?? 0)
//     ),
//     });
//   }, [workers]);
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
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Sub-Division</Text>
            <div style={styles.grid}></div>
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
              <Text style={styles.tableCell}>{row?.firstName}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.lastName}</Text>
              <div style={styles.grid}></div>
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
