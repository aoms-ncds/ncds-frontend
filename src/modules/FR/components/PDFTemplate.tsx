import ReactPDF, { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import moment from 'moment';
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
  heading: {
    position: 'absolute',
    left: '800',
    marginTop: 60,
    fontWeight: 100,
  },
  headingLine: {
    position: 'absolute',
    left: '0',
    right: '0',
    top: 85,
    borderBottom: 1,
    borderColor: 'black',
  },
  line: {
    position: 'absolute',
    left: '20',
    right: 15,
    top: 90,
    borderBottom: 1,
    borderColor: 'black',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 91, // Adjust this value to set the table's position
    width: 1650,
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
interface TotalSupportStructure {
  basic?: number;
  prevBasic?: number;
  HRA?: number;
  prevHRA?: number;
  spouseAllowance?: number;
  prevSpouseAllowance?: number;
  positionalAllowance?: number;
  prevPositionalAllowance?: number;
  specialAllowance?: number;
  prevSpecialAllowance?: number;
  impactDeduction?: number;
  prevImpactDeduction?: number;
  telAllowance?: number;
  prevTelAllowance?: number;
  PIONMissionaryFund?: number;
  prevPIONMissionaryFund?: number;
  MUTDeduction?: number;
  prevMUTDeduction?: number;
  total?: number;
  prevTotal?: number;
  deduction?: number;
  prevDeduction?: number;
  net?: number;
  prevNet?: number;
}
// Create Document Component
const PDFTemplate = (props:{purpose:FRPurpose|null;divisionId:string|null;workerId:string|null;designationParticularID:string|null;subDivisionId:string|null}) => {
  const [workers, setWorkers] = useState<IWorker[] | null>(null);
  const [total, setTotal] = useState<TotalSupportStructure>({
    basic: 0,
    prevBasic: 0,
    HRA: 0,
    prevHRA: 0,
    spouseAllowance: 0,
    prevSpouseAllowance: 0,
    positionalAllowance: 0,
    prevPositionalAllowance: 0,
    specialAllowance: 0,
    prevSpecialAllowance: 0,
    impactDeduction: 0,
    prevImpactDeduction: 0,
    telAllowance: 0,
    prevTelAllowance: 0,
    PIONMissionaryFund: 0,
    prevPIONMissionaryFund: 0,
    MUTDeduction: 0,
    prevMUTDeduction: 0,
    total: 0,
    prevTotal: 0,
    deduction: 0,
    prevDeduction: 0,
    net: 0,
    prevNet: 0,
  });
  useEffect(() => {
    console.log(props, 'props');
    if ((props.purpose=='Coordinator'||props.purpose=='Worker')&&props.workerId) {
      WorkersServices.getById(props.workerId).then((res)=>res?.data && setWorkers([res?.data]));
    } else if (props.purpose=='Subdivision'&&props.divisionId&&props.subDivisionId) {
      WorkersServices.getAll({ status: UserLifeCycleStates.ACTIVE, division: props.divisionId })
    .then((res) => {
      console.log(res);
      setWorkers(res.data);
    })
      .catch((res) => {
        console.log(res);
      });
    } else {
      if (props.divisionId) {
        WorkersServices.getAll({
          status: UserLifeCycleStates.ACTIVE,
          division: props.divisionId,
          withoutCoordinator: true })
          .then((res) => {
            console.log(res);
            setWorkers(res.data);
          })
         .catch((res) => {
           console.log(res);
         });
      }
    }
  }, [props]);
  useEffect(() => {
    const basic=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.basic? total + Number(worker.supportStructure?.basic):total,
      0,
    );
    const prevBasic=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevBasic? total + Number(worker.supportStructure?.prevBasic):total,
      0,
    );
    const HRA=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.HRA? total + Number(worker.supportStructure?.HRA):total,
      0,
    );
    const prevHRA=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevHRA? total + Number(worker.supportStructure?.prevHRA):total,
      0,
    );
    const spouseAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.spouseAllowance? total + Number(worker.supportStructure?.spouseAllowance):total,
      0,
    );
    const prevSpouseAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevSpouseAllowance? total + Number(worker.supportStructure?.prevSpouseAllowance):total,
      0,
    );
    const positionalAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.positionalAllowance? total + Number(worker.supportStructure?.positionalAllowance):total,
      0,
    );
    const prevPositionalAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevPositionalAllowance? total + Number(worker.supportStructure?.prevPositionalAllowance):total,
      0,
    );
    const specialAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.specialAllowance? total + Number(worker.supportStructure?.specialAllowance):total,
      0,
    );
    const prevSpecialAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevSpecialAllowance? total + Number(worker.supportStructure?.prevSpecialAllowance):total,
      0,
    );
    const impactDeduction=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.impactDeduction? total + Number(worker.supportStructure?.impactDeduction):total,
      0,
    );
    const prevImpactDeduction=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevImpactDeduction? total + Number(worker.supportStructure?.prevImpactDeduction):total,
      0,
    );
    const telAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.telAllowance? total + Number(worker.supportStructure?.telAllowance):total,
      0,
    );
    const prevTelAllowance=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevTelAllowance? total + Number(worker.supportStructure?.prevTelAllowance):total,
      0,
    );
    const PIONMissionaryFund=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.PIONMissionaryFund? total + Number(worker.supportStructure?.PIONMissionaryFund):total,
      0,
    );
    const prevPIONMissionaryFund=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevPIONMissionaryFund? total + Number(worker.supportStructure?.prevPIONMissionaryFund):total,
      0,
    );
    const MUTDeduction=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.MUTDeduction? total + Number(worker.supportStructure?.MUTDeduction):total,
      0,
    );
    const prevMUTDeduction=workers?.reduce(
      (total, worker) =>worker.supportStructure?.supportEnabled && worker.supportStructure?.prevMUTDeduction? total + Number(worker.supportStructure?.prevMUTDeduction):total,
      0,
    );
    setTotal({
      basic: basic,
      prevBasic: prevBasic,
      HRA: HRA,
      prevHRA: prevHRA,
      spouseAllowance: spouseAllowance,
      prevSpouseAllowance: prevSpouseAllowance,
      positionalAllowance: positionalAllowance,
      prevPositionalAllowance: prevPositionalAllowance,
      specialAllowance: specialAllowance,
      prevSpecialAllowance: prevSpecialAllowance,
      impactDeduction: impactDeduction,
      prevImpactDeduction: prevImpactDeduction,
      telAllowance: telAllowance,
      prevTelAllowance: prevTelAllowance,
      PIONMissionaryFund: PIONMissionaryFund,
      prevPIONMissionaryFund: prevPIONMissionaryFund,
      MUTDeduction: MUTDeduction,
      prevMUTDeduction: prevMUTDeduction,
      total: (basic ?? 0) +
    (HRA ?? 0) +
    (spouseAllowance ?? 0) +
    (positionalAllowance ?? 0) +
    (specialAllowance ?? 0) +
    (PIONMissionaryFund ?? 0) +
    (telAllowance ?? 0),
      deduction: (impactDeduction ?? 0) +
    (MUTDeduction ?? 0),
      net: (basic ?? 0) +
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
    });
  }, [workers]);
  return (
    <Document>
      <Page size={'A1'} style={styles.page}>
        <Text style={styles.heading}>REPORT</Text>
        <View style={styles.line} />
        <View style={styles.tableContainer} >
          <View style={styles.tableRow} key={0}>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Sl No.</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Worker Code</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>First Name</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Last Name</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Division</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Sub-Division</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Prev Basic</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Updated At</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Basic</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Prev HRA</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Updated At</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>HRA</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Prev Spouse Allowance</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Updated At</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Spouse Allowance</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Prev Positional Allowance</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Updated At</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Positional Allowance</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Prev Special Allowance</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Updated At</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Special Allowance</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Prev Impact Deduction</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Updated At</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Impact Deduction</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Prev Tel Allowance</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Updated At</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Tel Allowance</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Prev PION Missionary Fund</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Updated At</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>PION Missionary Fund</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Prev MUT Deduction</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Updated At</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>MUT Deduction</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Total Amount</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Total Deduction</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Net Amount</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Support Enabled</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Disabled From</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Disabled To</Text>
            <div style={styles.grid}></div>
          </View>

          {workers?.map((row, index) => (<>
            <View style={styles.tableRow} key={row._id}>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{index+1}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.workerCode}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.basicDetails.firstName}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.basicDetails.lastName}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.division?.details.name}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.officialDetails.divisionHistory[row.officialDetails?.divisionHistory.length - 1]?.subDivision?.name}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.prevBasic}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.basicLastUpdatedAt?moment( row.supportStructure?.basicLastUpdatedAt)?.format('DD/MM/YYYY'):null}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.basic}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.prevHRA}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.HRALastUpdatedAt?moment( row.supportStructure?.HRALastUpdatedAt)?.format('DD/MM/YYYY'):null}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.HRA}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.prevSpouseAllowance}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>
                {row.supportStructure?.spouseAllowanceLastUpdatedAt?moment( row.supportStructure?.spouseAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.spouseAllowance}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.prevPositionalAllowance}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>
                {row.supportStructure?.positionalAllowanceLastUpdatedAt?moment( row.supportStructure?.positionalAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.positionalAllowance}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.prevSpecialAllowance}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>
                {row.supportStructure?.specialAllowanceLastUpdatedAt?moment( row.supportStructure?.specialAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.specialAllowance}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.prevImpactDeduction}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>
                {row.supportStructure?.impactDeductionLastUpdatedAt?moment( row.supportStructure?.impactDeductionLastUpdatedAt)?.format('DD/MM/YYYY'):null}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.impactDeduction}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.prevTelAllowance}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.telAllowanceLastUpdatedAt?moment( row.supportStructure?.telAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.telAllowance}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.prevPIONMissionaryFund}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>
                {row.supportStructure?.PIONMissionaryFundLastUpdatedAt?moment( row.supportStructure?.PIONMissionaryFundLastUpdatedAt)?.format('DD/MM/YYYY'):null}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.PIONMissionaryFund}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.prevMUTDeduction}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.MUTDeductionLastUpdatedAt?moment( row.supportStructure?.MUTDeductionLastUpdatedAt)?.format('DD/MM/YYYY'):null}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.MUTDeduction}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.supportEnabled?(row.supportStructure?.basic ?? 0) +
      (row.supportStructure?.HRA ?? 0) +
      (row.supportStructure?.spouseAllowance ?? 0) +
      (row.supportStructure?.positionalAllowance ?? 0) +
      (row.supportStructure?.specialAllowance ?? 0) +
      (row.supportStructure?.telAllowance ?? 0):0}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.supportEnabled?(row.supportStructure?.impactDeduction ?? 0) +
      (row.supportStructure?.PIONMissionaryFund ?? 0) +
      (row.supportStructure?.MUTDeduction ?? 0):0}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.supportEnabled?(row.supportStructure?.basic ?? 0) +
      (row.supportStructure?.HRA ?? 0) +
      (row.supportStructure?.spouseAllowance ?? 0) +
      (row.supportStructure?.positionalAllowance ?? 0) +
      (row.supportStructure?.specialAllowance ?? 0) +
      (row.supportStructure?.telAllowance ?? 0) -
      (
        (row.supportStructure?.impactDeduction ?? 0) +
        (row.supportStructure?.PIONMissionaryFund ?? 0) +
        (row.supportStructure?.MUTDeduction ?? 0)
      ):0}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.supportEnabled?'Yes':'No'}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row?.supportStructure?.disabledFrom? row?.supportStructure?.disabledFrom?.format('DD/MM/YYYY'):'-'}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.supportStructure?.disabledTo? row.supportStructure?.disabledTo?.format('DD/MM/YYYY'):'-'}</Text>
              <div style={styles.grid}></div>
            </View>
          </>
          ))}

          <View style={{ ...styles.tableRow, backgroundColor: '#bdbdbd' }} key={1} >
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Total</Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevBasic}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.basic}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevHRA}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.HRA}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevSpouseAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.spouseAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevPositionalAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.positionalAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevSpecialAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.specialAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevImpactDeduction}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.impactDeduction}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevTelAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.telAllowance}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevPIONMissionaryFund}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.PIONMissionaryFund}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.prevMUTDeduction}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.MUTDeduction}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>
              {total.total}
            </Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.deduction}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>{total.net}</Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
          </View>

        </View>
      </Page>
    </Document>
  );
};


export default PDFTemplate;
