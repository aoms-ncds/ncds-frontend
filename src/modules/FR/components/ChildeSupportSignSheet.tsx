/* eslint-disable max-len */
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
    marginVertical: 6,
  },

  line: {
    left: 0,
    right: 0,
    top: 0,
    borderBottomWidth: 1,
    borderColor: 'black',
  },

  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 108,
    width: '90%', // Make table responsive
    alignSelf: 'center', // Centers the table
    marginHorizontal: 'auto', // Ensures equal spacing
  },

  cellGridRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 3,
  },
 tableRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  c1: { width: '5%', textAlign: 'center' },
  c2: { width: '15%', textAlign: 'center' },
  c3: { width: '25%', textAlign: 'center' },
  c4: { width: '25%', textAlign: 'center' },
  c5: { width: '10%', textAlign: 'center' },
  c6: { width: '20%', textAlign: 'center' },
  tableCell: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Oswald',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
  },
  tableCellBottom: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
    flex: 1,
	height:40,
    flexWrap: 'wrap',
    paddingVertical: 5,
    borderBottomWidth: 1, // Default bottom border for all cells
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
  },

  withBorder: {
    borderBottomWidth: 1, // Border for last row of the group
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
  },

  noBottomBorder: {
    borderBottomWidth: 0, // Remove border for "Child Of" & "Signature" in all rows except last
  },

  noBottomBorderForGroup: {
    borderBottomWidth: 0, // Remove bottom border from entire row unless it's the last one
  },

  childOfColumn: {
    fontWeight: 'bold',
    backgroundColor: '#F5F5F5', // Light gray background (optional)
  },
  cellGrid: {
    borderRightWidth: 1,
    borderRightColor: '#000',
    alignSelf: 'stretch',
    width: 1,
  },
});



// Create Document Component
const ChildeSupportSignSheet = (props:{frNo:any; data:Child[]|null; total:number; month:string | null; subDiv?:any | null}) => {
  const [workers, setWorkers] = useState<IWorker[] | null>(null);
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  //const rowsPerPage = 6;
  //const totalPages = Math.ceil((props?.data ?? []).length / rowsPerPage);
  //console.log(totalPages, 'totalPages');
  // Function to get rows for a specific page
const groupByParent = (data: any[]) => {
  const groupedData: Record<string, any[]> = {}; // Explicitly define object structure

  data.forEach((child) => {
    const parentId = child.childOf?._id; // Use _id instead of basicDetails.id
    if (parentId) {
      if (!groupedData[parentId]) {
        groupedData[parentId] = [];
      }
      groupedData[parentId].push(child);
    }
  });

  console.log("Grouped Data:", groupedData);
  return Object.values(groupedData);
};



	const getRowsForPage = () => {
	  return groupByParent(props?.data ?? []);
	};
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
  }, []);
  let serialNumber = 1;
  return (
    <Document>
      <Page size={'A4'} style={styles.page} orientation='landscape'>
        <div>
          <Image src="/3D Logo 3.png" style={styles.image} />
          <Text style={styles.title}>
            {`IET Child Education Assistance- ${div?.[0]}`} - {props.data?.[0]?.childOf?.officialDetails?.divisionHistory[props.data?.[0]?.childOf?.officialDetails?.divisionHistory?.length - 1]?.subDivision?.name ?? ''}
          </Text>
          <Text style={styles.month}>{`For the Month of ${props?.month ?? ''}`}</Text>
          <Text style={styles.IRONo}>{(props as any)?.frNo}</Text>
          {/* <Text style={styles.IRONo}>{`IRO No: ${props.data.IRONo}`}</Text> */}
          {/* <Text style={styles.paymentDate}>{`Date Of payment: ${props.data.date}`}</Text> */}
        </div>
       
          <>
		  
            <View style={styles.tableContainer}>
            <View style={styles.line} />
			<View style={styles.tableRow}>
				<View style={styles.cellGrid} />
				<Text style={[styles.tableCell,styles.c1]}>Sl No.</Text>
				<View style={styles.cellGrid} />

				<Text style={[styles.tableCell,styles.c2]}>Child Code</Text>
				<View style={styles.cellGrid} />

				<Text style={[styles.tableCell,styles.c3]}>Child Name</Text>
				<View style={styles.cellGrid} />

				<Text style={[styles.tableCell,styles.c4]}>Child Of</Text>
				<View style={styles.cellGrid} />

				<Text style={[styles.tableCell,styles.c5]}>Net Amount</Text>
				<View style={styles.cellGrid} />

				<Text style={[styles.tableCell,styles.c6]}>Signature</Text>
				<View style={styles.cellGrid} />
		    </View>

					
{
getRowsForPage()?.map((group, groupIndex) =>
  group.map((row, index) => {
  
    const isFirstInGroup = index === 0;
    const isLastInGroup = index === group.length - 1;
	
    return (
      <View
        style={[
          styles.tableRow,
          // Apply border bottom only if it's the last row in the group
          isLastInGroup ? styles.withBorder : styles.noBottomBorderForGroup,
        ]}
        key={row._id}
        wrap={false}
      >
	  <div style={styles.cellGrid}></div>
        <Text style={[styles.tableCell,styles.c1 ]}>{serialNumber ++}</Text>
		<div style={styles.cellGrid}></div>
        <Text style={[styles.tableCell,styles.c2 ]}>{row.childCode}</Text>
		<div style={styles.cellGrid}></div>
        <Text style={[styles.tableCell,styles.c3 ]}>{row.firstName} {row.lastName}</Text>
		<div style={styles.cellGrid}></div>
        {/* Child Of Column - Border Only in Last Row of Group */}
        {isFirstInGroup ? (
          <Text
            style={[
              styles.tableCell,styles.c4,
              styles.childOfColumn,
              isLastInGroup ? styles.withBorder : styles.noBottomBorder,
            ]}
          >
            {row.childOf?.basicDetails?.firstName} {row.childOf?.basicDetails?.lastName}
          </Text>
        ) : (
          <Text style={[styles.tableCell,styles.c4, styles.childOfColumn, styles.noBottomBorder]}></Text>
        )}
		<div style={styles.cellGrid}></div>
        <Text style={[styles.tableCell,styles.c5 ]}>{row.childSupport?.amount ?? ''}</Text>

        {/* Signature Column - Border Only in Last Row of Group */}
		<div style={styles.cellGrid}></div>
        <Text
          style={[
            styles.tableCell,styles.c6,
            isLastInGroup ? styles.noBottomBorder : styles.noBottomBorder,
          ]}
        ></Text>
		<div style={styles.cellGrid}></div>
      </View>
    );
  })
)}
  <View style={{ ...styles.tableRow, backgroundColor: '#bdbdbd', height: 50 }} key={1} wrap={false}>
  <div style={styles.cellGrid}></div>
  
  <Text style={[styles.tableCellBottom,  { fontWeight: 'bold' }]}></Text>
  <div style={{ ...styles.cellGrid, borderColor: '#bdbdbd' }}></div>
  
  <Text style={[styles.tableCellBottom,  { fontWeight: 'bold' }]}></Text>
  <div style={{ ...styles.cellGrid, borderColor: '#bdbdbd' }}></div>

  <Text style={[styles.tableCellBottom,  { fontWeight: 'bold' }]}></Text>
  <div style={{ ...styles.cellGrid, borderColor: '#bdbdbd' }}></div>

  <Text style={[styles.tableCellBottom,  { fontWeight: 'bold' }]}></Text>
  <div style={{ ...styles.cellGrid, borderColor: '#bdbdbd' }}></div>

  <Text style={[
    styles.tableCellBottom,
    
    {
      flex: 2,
      fontSize: 14,
      padding: 2,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Oswald',
    }
  ]}>
    Total Net Amount
  </Text>
  
  <div style={{ ...styles.cellGrid }}></div>
  
  <Text style={[
    styles.tableCellBottom,
    
    {
      flex: 2,
      fontSize: 16,
      padding: 2,
      textAlign: 'center',
      fontFamily: 'Oswald',
	  fontWeight: 'ultrabold'
    }
  ]}>
    {Number.isNaN(total) ? 0 : total}
  </Text>
  
  <div style={{ ...styles.cellGrid, borderColor: '#bdbdbd' }}></div>
  
  <Text style={[styles.tableCellBottom,  { fontWeight: 'bold' }]}></Text>
  
  <div style={styles.cellGrid}></div>
</View>

             

            </View>
          </>
      

      </Page>
    </Document>
  );
};


export default ChildeSupportSignSheet;
