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
    left: 260,
    height: 50,
    width: 50,
    marginTop: 15,
  },
  title: {
    marginTop: 65,
    fontSize: 14,
    position: 'absolute',
    left: 150,
    color: 'darkblue',
  },

  month: {
    marginTop: 80,
    fontSize: 12,
    position: 'absolute',
    left: 230,
    color: 'black',
  },
  IRONo: {
    marginTop: 90,
    fontSize: 12,
    position: 'absolute',
    left: 240,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
  },
  line: {
    position: 'absolute',
    left: '20',
    right: 25,
    top: 113,
    borderBottom: 1,
    borderColor: 'black',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 114, // Adjust this value to set the table's position
    width: 550,
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
  tableCell: {
    flex: 1,
    fontSize: 12,
    padding: 2,
    textAlign: 'center',
  },
  headGrid: {
    borderRight: 1,
    height: 30,
  },
  cellGrid: {
    borderRight: 1,
    height: 50,
  },
});

// Create Document Component
const IROReconciliationPdf = (props:{data:
  {purpose:FRPurpose|null;divisionId:string|null;workerId:string|null;designationParticularID:string|null;subDivisionId:string|null;IRONo:string|null;month:string|null};
},
) => {
  const [workers, setWorkers] = useState<IWorker[] | null>(null);
  const [total, setTotal] = useState(0);
  const [purpose, setPurpose] = useState('Division');
  useEffect(() => {
    console.log(props, 'props');
    if ((props.data.purpose=='Coordinator'||props.data.purpose=='Worker')&&props.data.workerId) {
      WorkersServices.getById(props.data.workerId).then((res)=>res?.data && setWorkers([res?.data]));
      props.data.purpose=='Coordinator'? setPurpose('Coordinator'):setPurpose('Individual');
    } else if (props.data.purpose=='Subdivision'&&props.data.divisionId&&props.data.subDivisionId) {
      WorkersServices.getWorkersBySubDivision( { division: props.data.divisionId, subDiv: props.data.subDivisionId, designationParticular: props.data.designationParticularID??null })
    .then((res) => {
      console.log(res);
      setWorkers(res.data);
      setPurpose(res.data[0].division?.details.name??'Division');
    })
      .catch((res) => {
        console.log(res);
      });
    } else if (props.data.purpose=='Division'&&props.data.divisionId) {
      if (props.data.designationParticularID) {
        console.log('');
        WorkersServices.getWorkersByDesignation({
          division: props.data.divisionId,
          designationParticular: props.data.designationParticularID })
          .then((res) => {
            console.log(res);
            setWorkers(res.data);
            setPurpose(res.data[0].division?.details.name??'Division');
          })
         .catch((res) => {
           console.log(res);
         });
      } else {
        WorkersServices.getAll({
          status: UserLifeCycleStates.ACTIVE,
          division: props.data.divisionId,
          withoutCoordinator: true,
          withoutSubDivision: true,
        })
          .then((res) => {
            console.log(res);
            setWorkers(res.data.filter((worker)=>worker.supportStructure.supportEnabled));
            setPurpose(res.data[0].division?.details.name??'Division');
          })
         .catch((res) => {
           console.log(res);
         });
      }
    } else {
      setWorkers([]);
    }
  }, [props.data.IRONo]);
  useEffect(() => {
    const basic = workers?.reduce(
      (total, worker) => worker.supportStructure?.supportEnabled && worker.supportStructure?.basic ? total + Number(worker.supportStructure?.basic) : total,
      0,
    );
    const HRA = workers?.reduce(
      (total, worker) => worker.supportStructure?.supportEnabled && worker.supportStructure?.HRA ? total + Number(worker.supportStructure?.HRA) : total,
      0,
    );
    const spouseAllowance = workers?.reduce(
      (total, worker) => worker.supportStructure?.supportEnabled && worker.supportStructure?.spouseAllowance ? total + Number(worker.supportStructure?.spouseAllowance) : total,
      0,
    );
    const positionalAllowance = workers?.reduce(
      (total, worker) => worker.supportStructure?.supportEnabled && worker.supportStructure?.positionalAllowance ? total + Number(worker.supportStructure?.positionalAllowance) : total,
      0,
    );
    const specialAllowance = workers?.reduce(
      (total, worker) => worker.supportStructure?.supportEnabled && worker.supportStructure?.specialAllowance ? total + Number(worker.supportStructure?.specialAllowance) : total,
      0,
    );
    const impactDeduction = workers?.reduce(
      (total, worker) => worker.supportStructure?.supportEnabled && worker.supportStructure?.impactDeduction ? total + Number(worker.supportStructure?.impactDeduction) : total,
      0,
    );
    const telAllowance = workers?.reduce(
      (total, worker) => worker.supportStructure?.supportEnabled && worker.supportStructure?.telAllowance ? total + Number(worker.supportStructure?.telAllowance) : total,
      0,
    );
    const PIONMissionaryFund = workers?.reduce(
      (total, worker) => worker.supportStructure?.supportEnabled && worker.supportStructure?.PIONMissionaryFund ? total + Number(worker.supportStructure?.PIONMissionaryFund) : total,
      0,
    );
    const MUTDeduction = workers?.reduce(
      (total, worker) => worker.supportStructure?.supportEnabled && worker.supportStructure?.MUTDeduction ? total + Number(worker.supportStructure?.MUTDeduction) : total,
      0,
    );
    setTotal(
      (basic ?? 0) +
        (HRA ?? 0) +
        (spouseAllowance ?? 0) +
        (positionalAllowance ?? 0) +
        (specialAllowance ?? 0) +
        (PIONMissionaryFund ?? 0) +
        (telAllowance ?? 0) -
        (
          (impactDeduction ?? 0) +
          (MUTDeduction ?? 0)
        ),
    );
  }, [workers]);
  return (
    <Document>
      <Page size={'A4'} style={styles.page} >
        <div>
          <Image src="/3D Logo.png" style={styles.image} />
          <Text style={styles.title}>
            {`WORKER SUPPORT SIGNATURE SHEET OF ${purpose}`}
          </Text>
          <Text style={styles.month}>{`For the Month of ${props.data.month}`}</Text>
          <Text style={styles.IRONo}>{`IRO No: ${props.data.IRONo}`}</Text>
          {/* <Text style={styles.paymentDate}>{`Date Of payment: ${props.data.date}`}</Text> */}
        </div>
        <View style={styles.line} />
        <View style={styles.tableContainer} >
          <View style={{ ...styles.tableRow, height: 30 }} key={0}>
            <div style={styles.headGrid}></div>
            <Text style={styles.tableHead}>Sl No.</Text>
            <div style={styles.headGrid}></div>
            <Text style={styles.tableHead}>Worker Code</Text>
            <div style={styles.headGrid}></div>
            <Text style={styles.tableHead}>First Name</Text>
            <div style={styles.headGrid}></div>
            <Text style={styles.tableHead}>Last Name</Text>
            <div style={styles.headGrid}></div>
            <Text style={styles.tableHead}>Division</Text>
            <div style={styles.headGrid}></div>
            <Text style={styles.tableHead}>Sub-Division</Text>
            <div style={styles.headGrid}></div>
            <Text style={styles.tableHead}>Net Amount</Text>
            <div style={styles.headGrid}></div>
            <Text style={styles.tableHead}>Signature</Text>
            <div style={styles.headGrid}></div>
          </View>

          {workers?.map((row, index) => (<>
            <View style={styles.tableRow} key={row._id}>
              <div style={styles.cellGrid}></div>
              <Text style={styles.tableCell}>{index+1}</Text>
              <div style={styles.cellGrid}></div>
              <Text style={styles.tableCell}>{row.workerCode}</Text>
              <div style={styles.cellGrid}></div>
              <Text style={styles.tableCell}>{row.basicDetails.firstName}</Text>
              <div style={styles.cellGrid}></div>
              <Text style={styles.tableCell}>{row.basicDetails.lastName}</Text>
              <div style={styles.cellGrid}></div>
              <Text style={styles.tableCell}>{row.division?.details.name}</Text>
              <div style={styles.cellGrid}></div>
              <Text style={styles.tableCell}>{row.officialDetails.divisionHistory[row.officialDetails?.divisionHistory.length - 1]?.subDivision?.name}</Text>
              <div style={styles.cellGrid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.supportEnabled?(row.supportStructure?.basic ?? 0) +
      (row.supportStructure?.HRA ?? 0) +
      (row.supportStructure?.spouseAllowance ?? 0) +
      (row.supportStructure?.positionalAllowance ?? 0) +
      (row.supportStructure?.specialAllowance ?? 0) +
      (row.supportStructure?.PIONMissionaryFund ?? 0) +
      (row.supportStructure?.telAllowance ?? 0) -
      (
        (row.supportStructure?.impactDeduction ?? 0) +
        (row.supportStructure?.MUTDeduction ?? 0)
      ):0}</Text>
              <div style={styles.cellGrid}></div>
              <Text style={styles.tableCell}></Text>
              <div style={styles.cellGrid}></div>
            </View>
          </>
          ))}
          <View style={{ ...styles.tableRow, backgroundColor: '#bdbdbd', height: 30 }} key={1} >
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
            <Text style={{ flex: 2,
              fontSize: 12,
              padding: 2,
              textAlign: 'center', fontWeight: 'bold' }}>Total Net Amount</Text>
            <div style={{ ...styles.headGrid }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total}</Text>
            <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}> </Text>
            <div style={styles.headGrid}></div>
          </View>
        </View>
      </Page>
    </Document>
  );
};


export default IROReconciliationPdf;
