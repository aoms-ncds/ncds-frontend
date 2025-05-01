/* eslint-disable max-len */
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
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
  image: {
    position: 'absolute',
    left: 825,
    height: 50,
    width: 50,
    marginTop: 20,
  },
  title: {
    marginTop: 70,
    fontSize: 12,
    position: 'absolute',
    left: 720,
    color: 'darkblue',
  },

  frno: {
    marginTop: 83,
    fontSize: 10,
    position: 'absolute',
    left: 820,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
  },
  month: {
    marginTop: 95,
    fontSize: 10,
    position: 'absolute',
    left: 790,
    color: 'black',
  },
  FRNO: {
    marginTop: 85,
    fontSize: 10,
    position: 'absolute',
    left: 825,
    color: 'black',
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
    top: 106,
    borderBottom: 1,
    borderColor: 'black',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 107, // Adjust this value to set the table's position
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
  tableHead: {
    flex: 1,
    fontSize: 6,
    padding: 2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    fontSize: 6,
    padding: 2,
    textAlign: 'center',
  },
  bottomTableCell: {
    flex: 1,
    fontSize: 6,
    padding: 2,
  },
  grid: {
    borderRight: 1,
    height: 30,
  },
});

// Create Document Component
const ChildePDFTemplate = (props:{frNo:string; divisionId:string|null;data:Child[]|null; month: string | null; total:number;
}) => {
  const [workers, setWorkers] = useState<Child[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [purpose, setPurpose] = useState('Division');
  console.log(props, '√poprosp');

  // console.log(props.total, 'prop.ttt');
  // console.log(workers, 'pop');
  useEffect(() => {
    setWorkers(props.data);
    let tot = 0;
    workers?.map((i) => {
      tot += i.childSupport?.amount;
      setTotal(tot);
    });
    // console.log(tot, 'tot');
  }, []);
  const div= props?.data?.map((e:any)=>e.division?.details?.name);

  // useEffect(() => {
  //   console.log(props, 'props');
  //   if (props.workerId) {
  //     ChildrenServices.getById(props.workerId).then((res)=>res?.data && setWorkers([res?.data]));
  //   } else if (props.divisionId) {
  //     ChildrenServices.getAll({ status: UserLifeCycleStates.ACTIVE, division: props.divisionId })
  //   .then((res) => {
  //     console.log(res);
  //     setWorkers(res.data);
  //   })
  //     .catch((res) => {
  //       console.log(res);
  //     });
  //   }
  // }, [props.total]);
  return (
    <Document>
      <Page size={'A2'} style={styles.page} orientation='landscape'>
        <div>
          <Image src="/3D Logo 3.png" style={styles.image} />
          <Text style={styles.title}>
            {`IET Child Educational Assistance - ${div?.[0]}`} {props.data?.[0]?.childOf?.officialDetails?.divisionHistory?.at(-1)?.subDivision?.name ?
              '/ ' + props.data[0].childOf?.officialDetails?.divisionHistory?.at(-1)?.subDivision.name :
              ''}


          </Text>
          <Text style={styles.month}>{`For the Month of ${props.month}`}</Text>
          <Text style={styles.FRNO}>
            {'IRO' + (props as any)?.frNo?.slice(4)}
          </Text>

          {/* <Text style={styles.frno}>{`FR No: ${props.FrNo}`}</Text> */}
        </div>
        <View style={styles.line} />
        <View style={styles.tableContainer} >
          <View style={styles.tableRow} key={0}>
            <div style={styles.grid}></div>
            <Text style={styles.tableHead}>Sl No.</Text>
            <div style={styles.grid}></div>
            <Text style={styles.tableHead}>Child Code</Text>
            <div style={styles.grid}></div>
            <Text style={styles.tableHead}>Child Name</Text>
            <div style={styles.grid}></div>
            <Text style={styles.tableHead}>Child Of</Text>
            <div style={styles.grid}></div>
            <Text style={styles.tableHead}>DOB</Text>
            <div style={styles.grid}></div>
            <Text style={styles.tableHead}>CEA Amount</Text>
            <div style={styles.grid}></div>
          </View>

          {workers?.map((row, index) => (<>
            <View style={styles.tableRow} key={row._id}>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.childCode}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.firstName} {row.lastName}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row?.childOf?.basicDetails?.firstName} {row?.childOf?.basicDetails?.lastName}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.dateOfBirth?.format('DD/MM/YYYY')}</Text>
              <div style={styles.grid}></div>
              <Text style={styles.tableCell}>{row.childSupport?.amount !== 0 ? row.childSupport?.amount : ''}</Text>
              <div style={styles.grid}></div>
            </View>
          </>
          ))}


          <View style={{ ...styles.tableRow, backgroundColor: '#bdbdbd' }} key={3} >
            <div style={styles.grid}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.bottomTableCell, fontWeight: 'bold' }}>Total Net Amount: </Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.bottomTableCell, fontWeight: 'bold' }}>{props?.total}</Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>

            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>

            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={{ ...styles.grid, borderColor: '#bdbdbd' }}></div>
            <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}></Text>
            <div style={styles.grid}></div>
          </View>

          {/* <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>Total: {props.total}</Text> */}

        </View>
      </Page>
    </Document>
  );
};


export default ChildePDFTemplate;
