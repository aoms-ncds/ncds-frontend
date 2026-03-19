/* eslint-disable max-len */
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import UserLifeCycleStates from '../../User/extras/UserLifeCycleStates';
import WorkersServices from '../../Workers/extras/WorkersServices';
import DivisionsServices from '../../Divisions/extras/DivisionsServices';
import { set } from 'mongoose';

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
    fontFamily: 'CourierPrime',

    fontSize: 12,
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
    fontFamily: 'CourierPrime',

    fontSize: 12,
    textAlign: 'center',
    marginBottom: 2,
  },
  IRONo: {
    fontFamily: 'CourierPrime',

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
    marginTop: 2,
    right: 21,
    top: 18,

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
    height: 60,
    left: 20,
  },
  tableHead: {
    flex: 1,
    fontSize: 12,
    padding: 2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'CourierPrime',
    color: 'darkblue',

  },

  tableCell: {
    flex: 1,
    fontSize: 12,
    padding: 2,
    textAlign: 'center',
    // fontWeight: 'bold',
    fontFamily: 'CourierPrime',
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
    height: 60,
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
  const [division, setDivision] = useState('');
  
  const firstPageRows = 9;
  const otherPageRows = 11;
  useEffect(()=>{
    setDivision('');
  }, []);
  const getTotalPages = (workers: any[]) => {
    if (!workers || workers.length === 0) return 0;
    if (workers.length <= firstPageRows) return 1;
    return 1 + Math.ceil((workers.length - firstPageRows) / otherPageRows);
  };

  const getRowsForPage = (workers: any[], page: number) => {
    if (page === 0) return workers.slice(0, firstPageRows);

    const start = firstPageRows + (page - 1) * otherPageRows;
    const end = start + otherPageRows;
    return workers.slice(start, end);
  };

  const getSerialNumberOffset = (pageIndex: number) => {
    if (pageIndex === 0) return 0;
    return firstPageRows + (pageIndex - 1) * otherPageRows;
  };

  console.log(division, ' ressoo ');
  useEffect(() => {
    if ((props.data.purpose == 'Coordinator' || props.data.purpose == 'Worker') && props.data.workerId) {
      DivisionsServices.getDivisionById(props.data?.divisionId??'').then((res)=>setDivision(res.data.details.name));
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
      // DivisionsServices.getDivisionById(props.data?.divisionId??'').then((res)=>setDivision(res.data.details.name));

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
        console.log('diivv');
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
    // setDivision('');
  }, [workers]);

  const hasDivision = !!division;
  const showDivision = (purpose === 'Individual' || purpose === 'Coordinator') && hasDivision;
  const showSubDivision = workers?.[0]?.officialDetails?.divisionHistory?.at(-1)?.subDivision?.name &&
  props.data.purpose !== 'Coordinator';

  const subDivisionName = workers?.[0]?.officialDetails?.divisionHistory?.at(-1)?.subDivision?.name;

  const serialNumber = 1;
  const totalPages = getTotalPages(workers??[]);

  return (
    <Document>
      <Page size={'A4'} style={styles.page} orientation='portrait'>

        <div>
          <Image src="/3D Logo 3.png" style={styles.image} />
          <Text style={styles.title}>
            {`WORKER SUPPORT SIGNATURE SHEET OF ${purpose}`}{division? '- ' : ''} {division?? division}{workers?.[0]?.officialDetails?.divisionHistory?.at(-1)?.subDivision?.name &&props.data.purpose !== 'Coordinator' ?
              '/ ' + workers[0].officialDetails?.divisionHistory?.at(-1)?.subDivision.name :
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
              render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
              fixed
            />

            <View style={styles.tableContainer}>
              <Image src="/3D Logo 3.png" style={styles.watermarkImage} />

              {/* Table Header */}
              <View style={{ ...styles.tableRow, height: 30 }} key={`header-${pageIndex}`}>
                <div style={styles.headGrid}></div>
                <Text style={{ ...styles.tableHead, flex: 0.5 }}>Sl No.</Text>
                <div style={styles.headGrid}></div>
                <Text style={styles.tableHead}>Worker Code</Text>
                <div style={styles.headGrid}></div>
                <Text style={{ ...styles.tableHead, flex: 2 }}>Worker Name</Text>
                <div style={styles.headGrid}></div>
                <Text style={{ ...styles.tableHead, flex: 0.7 }}>Net Amt</Text>
                <div style={styles.headGrid}></div>
                <Text style={{ ...styles.tableHead, textAlign: 'right' }}>Signature</Text>
                <Text style={styles.tableHead}></Text>
                <div style={styles.cellGridCopy2}></div>
              </View>

              {/* Table Rows */}
              {getRowsForPage(workers?? [], pageIndex)?.map((row: any, index: number) => {
                const serialNumber = getSerialNumberOffset(pageIndex) + index + 1;

                return (
                  <View style={styles.tableRow} key={row._id}>
                    <div style={styles.cellGrid}></div>
                    <Text style={{ ...styles.tableCell, flex: 0.5 }}>{serialNumber}</Text>
                    <div style={styles.cellGrid}></div>
                    <Text style={styles.tableCell}>{row.workerCode}</Text>
                    <div style={styles.cellGrid}></div>
                    <Text style={{ ...styles.tableCell, flex: 2 }}>
                      {row.basicDetails.firstName} {row.basicDetails.lastName}
                    </Text>
                    <div style={styles.cellGrid}></div>
                    <Text style={{ ...styles.tableCell, flex: 0.7 }}>
                      {row.supportStructure?.supportEnabled ?
                        (row.supportStructure?.basic ?? 0) +
                  (row.supportStructure?.HRA ?? 0) +
                  (row.supportStructure?.spouseAllowance ?? 0) +
                  (row.supportStructure?.positionalAllowance ?? 0) +
                  (row.supportStructure?.specialAllowance ?? 0) +
                  (row.supportStructure?.PIONMissionaryFund ?? 0) +
                  (row.supportStructure?.pmaDeduction?.amount ?? 0) +
                  (row.supportStructure?.telAllowance ?? 0) -
                  ((row.supportStructure?.impactDeduction ?? 0) +
                    (row.supportStructure?.MUTDeduction ?? 0)) :
                        ''}
                    </Text>
                    <div style={styles.cellGrid}></div>
                    <Text style={styles.tableCell}></Text>
                    <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
                    <div style={styles.cellGrid}></div>
                  </View>
                );
              })}

              {/* Total Row on Last Page */}
              {pageIndex === totalPages - 1 && (
                <View
                  style={{ ...styles.tableRow, backgroundColor: '#bdbdbd', height: 30 }}
                  key={`total-${pageIndex}`}
                >
                  <div style={styles.headGrid}></div>
                  <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
                  <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
                  <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
                  <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
                  <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
                  <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
                  <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
                  <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
                  <Text
                    style={{
                      flex: 1.4,
                      fontSize: 12,
                      padding: 2,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
            Total Net Amount
                  </Text>
                  <div style={{ ...styles.headGrid }}></div>
                  <Text style={{ ...styles.tableCell, fontWeight: 'bold', fontSize: 16 }}>{total}</Text>
                  <div style={{ ...styles.headGrid, borderColor: '#bdbdbd' }}></div>
                  <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}> </Text>
                  <div style={styles.headGridCopyy}></div>
                </View>
              )}
            </View>
          </>
        ))}

      </Page>
    </Document>
  );
};


export default IROReconciliationPdf;
