import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import UserLifeCycleStates from '../../User/extras/UserLifeCycleStates';
import WorkersServices from '../../Workers/extras/WorkersServices';

Font.register({
  family: 'CourierPrime',
  src: '/arial.ttf',
  fonts: [
    { src: '/arial_bold.ttf', fontWeight: 'bold' },
    { src: '/ARIALBD 1.TTF', fontWeight: 500 },
  ],
});


const styles = StyleSheet.create({
  page: {

    flexDirection: 'column',
    padding: 20,
    width: 841.89,
    height: 595.28,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  image: {
    height: 70,
    width: 50,
    left: 250,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'darkblue',

    marginBottom: 4,
  },
  c1: { width: '5%', textAlign: 'center', paddingVertical: 0 },
  c2: { width: '15%', textAlign: 'center', paddingVertical: 0 },
  c3: { width: '25%', textAlign: 'center', paddingVertical: 0 },
  c4: { width: '25%', textAlign: 'center', paddingVertical: 0 },
  c5: { width: '10%', textAlign: 'center', paddingVertical: 0 },
  c6: { width: '20%', textAlign: 'center', paddingVertical: 0 },
  month: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 2,
  },
  IRONo: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 6,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#000',
    marginBottom: 5,
  },
  tableContainer: {
    flexDirection: 'column',
    marginTop: 4,
    right: 25,
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    borderTopWidth: .5,
    borderTopColor: '#000',
    borderTopStyle: 'solid',
    alignItems: 'center',
    height: 62,
    left: 20,
  },
  tableHead: {
    flex: 1,
    fontSize: 12,
    padding: 2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
    color: 'darkblue',

  },

  tableCell: {
    flex: 1,
    fontSize: 14,
    padding: 2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
  },
  watermark: {
    position: 'absolute',
    top: '40%',
    left: '15%',
    fontSize: 60,
    color: 'rgba(150, 150, 150, 0.3)',
    transform: 'rotate(-45deg)',
    zIndex: -1,
  },
  watermarkImage: {
    position: 'absolute',
    top: '10%',
    left: '20%',
    width: 400,
    height: 'auto',
    opacity: 0.1,
    // transform: 'rotate(-45deg)',
    // zIndex: -1,
  },
  headGrid: {
    borderRight: 1,
    height: 30,
    // marginRight: 5,
  },
  headGridCopyy: {
    borderRight: 1,
    height: 30,
    marginLeft: 5,
  },
  cellGrid: {
    borderRight: 1,
    height: 62,
  },
  cellGridCopy: {
    borderRight: 1,
    height: 50,
    marginRight: 50,
  },
  cellGridCopy1: {
    borderRight: 1,
    height: 30,
    marginRight: 44,
  },
  cellGridCopy2: {
    borderRight: 1,
    height: 30,
    // marginLeft: 5,
  },
});

// Create Document Component
const IROReconciliationPdf = (props: {
  data:
  { purpose: FRPurpose | null; divisionId: string | null; workerId: string | null; designationParticularID: string | null; subDivisionId: string | null; IRONo: string | null; month: string | null };
},
) => {
  const [workers, setWorkers] = useState<IWorker[] | null>(null);
  const [total, setTotal] = useState(0);
  const [purpose, setPurpose] = useState('Division');
  const rowsPerPage = 9;
  const totalPages = Math.ceil((workers ?? []).length / rowsPerPage)-1;
  console.log(totalPages, 'totalPages');
  const getRowsPerPage = (page: number) => (page === 0 ? 9 : 11);

  // Function to get rows for a specific page
  const getRowsForPage = (page: number) => {
    let start = 0;

    // First page (0) starts at 0
    if (page > 0) {
      start = 9 + (page - 1) * 11;
    }

    const count = getRowsPerPage(page);
    return workers?.slice(start, start + count);
  };
  useEffect(() => {
    console.log(props, 'props');
    if ((props.data.purpose == 'Coordinator' || props.data.purpose == 'Worker') && props.data.workerId) {
      WorkersServices.getById(props.data.workerId).then((res) => {
        if (res?.data) {
          const worker = res.data;
          const hasValidSupportStructure = (supportStructure:any) => {
            const hasAnyDeduction= supportStructure.HRA !== 0 ||
            supportStructure.MUTDeduction !== 0 ||
            supportStructure.PIONMissionaryFund !== 0 ||
            supportStructure.basic !== 0 ||
            supportStructure.spouseAllowance !== 0 ||
            supportStructure.positionalAllowance !== 0 ||
            supportStructure.telAllowance !== 0 ||
            supportStructure.impactDeduction !== 0;
            worker.supportStructure.specialAllowance !== 0;
            const isSupportEnabled = supportStructure.supportEnabled === true;
            return hasAnyDeduction && isSupportEnabled;
          };
          if (hasValidSupportStructure(worker.supportStructure)) {
            setWorkers([worker]);
          }
        }
      });
      props.data.purpose == 'Coordinator' ? setPurpose('Coordinator') : setPurpose('Individual');
    } else if (props.data.purpose == 'Subdivision' && props.data.divisionId && props.data.subDivisionId) {
      WorkersServices.getWorkersBySubDivision({ division: props.data.divisionId, subDiv: props.data.subDivisionId, designationParticular: props.data.designationParticularID ?? null })
        .then((res) => {
          // console.log(res, 'shibin');
          // setWorkers(res.data);
          const filteredWorkers = res.data.filter((worker: IWorker) => {
            console.log(worker.supportStructure); // Log supportStructure for each worker
            const hasAnyDeduction = worker.supportStructure.HRA !== 0 ||
            worker.supportStructure.MUTDeduction !== 0 ||
            worker.supportStructure.PIONMissionaryFund !== 0 ||
            worker.supportStructure.basic !== 0 ||
            worker.supportStructure.spouseAllowance !== 0 ||
            worker.supportStructure.positionalAllowance !== 0 ||
            worker.supportStructure.telAllowance !== 0 ||
            worker.supportStructure.specialAllowance !== 0;

            const isSupportEnabled = worker.supportStructure.supportEnabled;

            return hasAnyDeduction && isSupportEnabled;
          });

          console.log(filteredWorkers, 'filteredWorkers3'); // Check the filtered results

          setWorkers(filteredWorkers);
          setPurpose(res.data[0].division?.details.name ?? 'Division');
        })
        .catch((res) => {
          console.log(res);
        });
    } else if (props.data.purpose == 'Division' && props.data.divisionId) {
      if (props.data.designationParticularID) {
        console.log('');
        WorkersServices.getWorkersByDesignation({
          division: props.data.divisionId,
          designationParticular: props.data.designationParticularID,
        })
          .then((res) => {
            console.log(res);
            // setWorkers(res.data);

            const filteredWorkers = res.data.filter((worker: IWorker) => {
              console.log(worker.supportStructure); // Log supportStructure for each worker
              console.log(`supportEnabled: ${worker.supportStructure.supportEnabled}`); // Log the value
              const hasAnyDeduction = worker.supportStructure.HRA !== 0 ||
              worker.supportStructure.MUTDeduction !== 0 ||
              worker.supportStructure.PIONMissionaryFund !== 0 ||
              worker.supportStructure.basic !== 0 ||
              worker.supportStructure.spouseAllowance !== 0 ||
              worker.supportStructure.positionalAllowance !== 0 ||
              worker.supportStructure.telAllowance !== 0 ||
              worker.supportStructure.specialAllowance !== 0;
              worker.supportStructure.impactDeduction !== 0;

              const isSupportEnabled = worker.supportStructure.supportEnabled;

              return hasAnyDeduction && isSupportEnabled;
            });

            console.log(filteredWorkers, 'filteredWorkers1'); // Check the filtered results

            setWorkers(filteredWorkers);
            setPurpose(res.data[0].division?.details.name ?? 'Division');
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
            const filteredWorkers = res.data.filter((worker: IWorker) => {
              console.log(worker.supportStructure); // Log supportStructure for each worker
              const hasAnyDeduction = worker.supportStructure.HRA !== 0 ||
              worker.supportStructure.MUTDeduction !== 0 ||
              worker.supportStructure.PIONMissionaryFund !== 0 ||
              worker.supportStructure.basic !== 0 ||
              worker.supportStructure.spouseAllowance !== 0 ||
              worker.supportStructure.positionalAllowance !== 0 ||
              worker.supportStructure.telAllowance !== 0 ||
              worker.supportStructure.specialAllowance !== 0||
              worker.supportStructure.impactDeduction !== 0;

              const isSupportEnabled = worker.supportStructure.supportEnabled;

              return hasAnyDeduction && isSupportEnabled;
            });

            console.log(filteredWorkers, 'filteredWorkers2'); // Check the filtered results

            setWorkers(filteredWorkers);
            setPurpose(res.data[0].division?.details.name ?? 'Division');
          })
          .catch((res) => {
            console.log(res);
          });
      }
    } else {
      setWorkers([]);
    }
  }, [props.data.IRONo]);
  console.log(workers, 'workers');

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
    const pmaDeduction = workers?.reduce(
      (total, worker) => worker.supportStructure?.supportEnabled && worker.supportStructure?.pmaDeduction?.amount ? total + Number(worker.supportStructure?.pmaDeduction?.amount) : total,
      0,
    );
    setTotal(
      (basic ?? 0) +
      (HRA ?? 0) +
      (spouseAllowance ?? 0) +
      (positionalAllowance ?? 0) +
      (specialAllowance ?? 0) +
      (PIONMissionaryFund ?? 0) +
      (pmaDeduction ?? 0) +
      (telAllowance ?? 0) -
      (
        (impactDeduction ?? 0) +
        (MUTDeduction ?? 0)
      ),
    );
  }, [workers]);
  return (
    <Document>
      <Page size={'A4'} style={styles.page} orientation='portrait'>

        <div>
          <Image src="/3D Logo 3.png" style={styles.image} />
          <Text style={styles.title}>
            {`WORKER SUPPORT SIGNATURE SHEET OF ${purpose}`}{workers?.[0]?.officialDetails?.divisionHistory?.at(-1)?.subDivision?.name ?
              '- ' + workers[0].officialDetails?.divisionHistory?.at(-1)?.subDivision.name :
              ''}

          </Text>
          <Text style={styles.month}>{`For the Month of ${props.data.month}`}</Text>
          <Text style={styles.IRONo}>{`IRO No: ${props.data.IRONo}`}</Text>
          {/* <Text style={styles.paymentDate}>{`Date Of payment: ${props.data.date}`}</Text> */}
        </div>

        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <>
            <Text
              style={{
                position: 'absolute',
                fontSize: 12,
                bottom: 30,
                left: 0,
                right: 0,
                textAlign: 'center',
                color: 'grey',
              }}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
              fixed
            >{pageIndex}</Text>

            {/* <View style={styles.line} /> */}
            <View style={styles.tableContainer}>
              <Image src="/3D Logo 3.png" style={styles.watermarkImage} />
              <View style={{ ...styles.tableRow, height: 30 }} key={0}>
                <div style={styles.headGrid}></div>
                <Text style={{ ...styles.tableHead, flex: 0.5 }}>Sl No.</Text>
                <div style={styles.headGrid}></div>
                <Text style={styles.tableHead}>Worker Code</Text>
                <div style={styles.headGrid}></div>
                <Text style={{ ...styles.tableHead, flex: 2 }}>Worker Name</Text>
                <div style={styles.headGrid}></div>
                {/* <Text style={styles.tableHead}>Last Name</Text>
    <div style={styles.headGrid}></div> */}
                {/* <Text style={styles.tableHead}>Division</Text>
              <div style={styles.headGrid}></div> */}
                <Text style={{ ...styles.tableHead, flex: 0.7 }}>Net Amount</Text>
                <div style={styles.headGrid}></div>
                <Text style={{ ...styles.tableHead, textAlign: 'right' }}>Signature</Text>
                <Text style={styles.tableHead}></Text>
                {/* <div style={styles.cellGridCopy1}></div> */}
                <div style={styles.cellGridCopy2}></div>
              </View>

              {getRowsForPage(pageIndex)?.map((row: any, index: any) => {
                const globalIndex = pageIndex * rowsPerPage + index + 1; // Calculate the global index

                return (

                  <View style={styles.tableRow} key={row._id}>
                    <div style={styles.cellGrid}></div>
                    <Text style={{ ...styles.tableCell, flex: 0.5 }}>{globalIndex}</Text>
                    <div style={styles.cellGrid}></div>
                    <Text style={styles.tableCell}>{row.workerCode}</Text>
                    <div style={styles.cellGrid}></div>
                    <Text style={{ ...styles.tableCell, flex: 2 }} >{row.basicDetails.firstName}{' '} {row.basicDetails.lastName}</Text>
                    <div style={styles.cellGrid}></div>
                    {/* <Text style={styles.tableCell}>{row.basicDetails.lastName}</Text>
        <div style={styles.cellGrid}></div> */}
                    {/* <Text style={styles.tableCell}>{row.division?.details.name}</Text>
                  <div style={styles.cellGrid}></div> */}
                    <Text style={{ ...styles.tableCell, flex: 0.7 }}>{row.supportStructure?.supportEnabled ?
                      (row.supportStructure?.basic ?? 0) +
                    (row.supportStructure?.HRA ?? 0) +
                    (row.supportStructure?.spouseAllowance ?? 0) +
                    (row.supportStructure?.positionalAllowance ?? 0) +
                    (row.supportStructure?.specialAllowance ?? 0) +
                    (row.supportStructure?.PIONMissionaryFund ?? 0) +
                    (row.supportStructure?.pmaDeduction?.amount ?? 0) +
                    (row.supportStructure?.telAllowance ?? 0) -
                    (
                      (row.supportStructure?.impactDeduction ?? 0) +
                      (row.supportStructure?.MUTDeduction ?? 0)
                    ) : ''}</Text>
                    <div style={styles.cellGrid}></div>
                    <Text style={styles.tableCell}></Text>
                    {/* <div style={styles.cellGridCopy}></div> */}
                    <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
                    <div style={styles.cellGrid}></div>
                  </View>
                );
              })}
              {pageIndex === totalPages-1&& (
                <View style={{ ...styles.tableRow, backgroundColor: '#bdbdbd', height: 30 }} key={1}>
                  <div style={styles.headGrid}></div>
                  <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
                  <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
                  <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
                  <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
                  <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
                  {/* <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
                <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text> */}
                  <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
                  <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
                  <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
                  {/* <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div> */}
                  <Text style={{
                    flex: 1.4,
                    fontSize: 12,
                    padding: 2,
                    textAlign: 'center', fontWeight: 'bold',
                  }}>Total Net Amount</Text>
                  <div style={{ ...styles.headGrid }}></div>
                  <Text style={{ ...styles.tableCell, fontWeight: 'bold', fontSize: 16 }}>{total}</Text>
                  <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
                  <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}> </Text>
                  <div style={styles.headGridCopyy}></div>

                </View>
              )}
            </View>
            <div>{pageIndex}</div>
          </>
        ))}
      </Page>
    </Document>
  );
};


export default IROReconciliationPdf;
