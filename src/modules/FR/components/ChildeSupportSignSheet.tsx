/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
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
    backgroundColor: 'white',
    // paddingTop: 10,
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
    left: 290,
    color: 'darkblue',
    fontFamily: 'CourierPrime',
  },

  month: {
    fontFamily: 'CourierPrime',

    marginTop: 80,
    fontSize: 12,
    position: 'absolute',
    left: 340,
    color: 'black',
  },

  IRONo: {
    marginTop: 90,
    fontSize: 12,
    position: 'absolute',
    left: 380,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'CourierPrime',
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
  t1: {
    bottom: 30,
  },
  c1: { width: '10%', textAlign: 'center', paddingVertical: 0 },
  c2: { width: '15%', textAlign: 'center', paddingVertical: 0 },
  c3: { width: '25%', textAlign: 'left', paddingVertical: 0 },
  c4: { width: '25%', textAlign: 'left', paddingVertical: 0 },
  c3C: { width: '25%', textAlign: 'center', paddingVertical: 0 },
  c4C: { width: '25%', textAlign: 'center', paddingVertical: 0 },
  c5: { width: '10%', textAlign: 'center', paddingVertical: 0 },
  c6: { width: '20%', textAlign: 'center', paddingVertical: 0 },
  tableCellHead: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'CourierPrime',
    paddingVertical: 5,
    color: 'darkblue',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
  },
  tableCell: {
    fontSize: 12,
    fontFamily: 'CourierPrime',
    paddingVertical: 5,
    minHeight: 20,

  },
  tableCellBottom: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'CourierPrime',
    flex: 2,
    height: 30,
    flexWrap: 'wrap',
    paddingVertical: 5,
  },

  withBorder: {
    borderBottomWidth: 1, // Border for last row of the group
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
  },
  withTopBorder: {
    borderTopWidth: 1, // Border for last row of the group
    borderTopColor: '#000',
    borderTopStyle: 'solid',
    paddingTop: 0,
  },
  withBorderBottom: {
    borderBottomWidth: 1, // Border for last row of the group
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    backgroundColor: '#bdbdbd',
  },
  noBottomBorder: {
    borderBottomWidth: 0, // Remove border for "Child Of" & "Signature" in all rows except last
  },
  noTopBorder: {
    borderTopWidth: 0, // Remove border for "Child Of" & "Signature" in all rows except last
  },
  nill: {
  },
  noBottomBorderForGroup: {
    borderBottomWidth: 0, // Remove bottom border from entire row unless it's the last one
  },
  noTopBorderForGroup: {
    borderTopWidth: 0, // Remove bottom border from entire row unless it's the last one
  },

  childOfColumn: {
  },
  cellGrid: {
    borderRightWidth: 1,
    borderRightColor: '#000',
    alignSelf: 'stretch',
    width: 1,
  },
});


// Create Document Component
const ChildeSupportSignSheet = (props: { frNo: any; data: Child[] | null; total: number; month: string | null; subDiv?: any | null }) => {
  const [workers, setWorkers] = useState<IWorker[] | null>(null);
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // const rowsPerPage = 6;
  const [page, setPage] = useState(0);
  const rowsPerPage = 15; // or make it dynamic
  const totalPages = Math.ceil((props?.data ?? []).length / rowsPerPage);
  console.log(totalPages, 'totalPages');
  console.log(props?.data?.length, 'totalPages');
  // const totalPages = Math.ceil((props?.data ?? []).length / rowsPerPage);
  console.log(props, 'totalPages');
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

    console.log('Grouped Data:', groupedData);
    return Object.values(groupedData);
  };


  const getRowsPerPage = (page: number) => (page === 0 ? 15 : 15);

  const getRowsForPage = (page: number) => {
    const grouped = groupByParent(props?.data ?? []);
    const flatRows = grouped.flat();

    // Calculate pagination bounds
    let start = 0;
    if (page > 0) {
      start = 15 + (page - 1) * 15;
    }

    const count = getRowsPerPage(page);
    const paginatedRows = flatRows.slice(start, start + count);

    // Re-group just the paginated rows
    return groupByParent(paginatedRows);
  };


  const [purpose, setPurpose] = useState('Division');
  // console.log(props?.data?.map((e)=>e?.childOf?.division?.details?.name), 'rte');
  const [total, setTotal] = useState<number>(0);
  const div = props?.data?.map((e: any) => e.division?.details?.name);
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
            {`IET Child Education Assistance - ${div?.[0]}`}{props.data?.[0]?.childOf?.officialDetails?.divisionHistory?.at(-1)?.subDivision?.name ?
              ' / ' + props.data?.[0].childOf?.officialDetails?.divisionHistory?.at(-1)?.subDivision.name :
              ''}

          </Text>
          <Text style={styles.month}>{`For the Month of ${props?.month ?? ''}`}</Text>
          <Text style={styles.IRONo}>
            {'IRO' + (props as any)?.frNo?.slice(2)}
          </Text>         {/* <Text style={styles.IRONo}>{`IRO No: ${props.data.IRONo}`}</Text> */}
          {/* <Text style={styles.paymentDate}>{`Date Of payment: ${props.data.date}`}</Text> */}
        </div>
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <>
            <Text
              style={{
                position: 'absolute',
                fontSize: 12,
                bottom: 26,
                left: 0,
                right: 0,
                textAlign: 'center',
                color: 'grey',
              }}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
              fixed
            ></Text>
            <View style={[styles.tableContainer, {
              bottom: pageIndex > 0 ? 30 : 0,
            }]}>
              <View style={styles.line} break />
              <View style={styles.tableRow}>
                <View style={styles.cellGrid} />
                <Text style={[styles.tableCellHead, styles.c1]}>Sl No.</Text>
                <View style={styles.cellGrid} />

                <Text style={[styles.tableCellHead, styles.c2]}>Child Code</Text>
                <View style={styles.cellGrid} />

                <Text style={[styles.tableCellHead, styles.c4C]}>Child Of</Text>
                <View style={styles.cellGrid} />

                <Text style={[styles.tableCellHead, styles.c3C]}>Child Name</Text>
                <View style={styles.cellGrid} />

                <Text style={[styles.tableCellHead, styles.c5]}>Net Amt</Text>
                <View style={styles.cellGrid} />

                <Text style={[styles.tableCellHead, styles.c6]}>Signature</Text>
                <View style={styles.cellGrid} />
              </View>


              {getRowsForPage(pageIndex)?.map((group, groupIndex) =>

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
                      <View style={[styles.c1, isLastInGroup ? styles.noBottomBorderForGroup : styles.withBorder]}>
                        <Text style={[styles.tableCell]}>{serialNumber++}</Text>
                      </View>
                      <div style={styles.cellGrid}></div>
                      <View style={[styles.c2, isLastInGroup ? styles.noBottomBorderForGroup : styles.withBorder]}>
                        <Text style={[styles.tableCell]}>{row.childCode}</Text>
                      </View>


                      <div style={styles.cellGrid}></div>
                      {/* Child Of Column - Border Only in Last Row of Group */}
                      {isFirstInGroup ? (
                        <View style={[styles.c4,
                          styles.childOfColumn,
                          isLastInGroup ? styles.noBottomBorder : styles.noBottomBorder,
                          isFirstInGroup ? styles.noTopBorder : styles.noTopBorder]}>
                          <Text
                            style={{
                              ...styles.tableCell,
                              left: 5,
                            }}
                          >
                            {row.childOf?.basicDetails?.firstName} {row.childOf?.basicDetails?.lastName}
                          </Text>
                        </View>
                      ) : (
                        <View style={[styles.c4, styles.childOfColumn]}>
                          <Text style={[styles.tableCell]}></Text>
                        </View>
                      )}
                      <div style={styles.cellGrid}></div>
                      <View style={[styles.c3, isLastInGroup ? styles.noBottomBorderForGroup : styles.withBorder]}>
                        <Text style={{ ...styles.tableCell, left: 5 }}>{row.firstName} {row.lastName}</Text>
                      </View>
                      <div style={styles.cellGrid}></div>
                      <View style={[styles.c5, isLastInGroup ? styles.noBottomBorderForGroup : styles.withBorder]}>
                        <Text style={[styles.tableCell]}>{row.childSupport?.amount ?? ''}</Text>
                      </View>
                      {/* Signature Column - Border Only in Last Row of Group */}
                      <div style={styles.cellGrid}></div>
                      <View style={[styles.c6,
                        isLastInGroup ? styles.nill : styles.noBottomBorder,
                        isFirstInGroup ? styles.noTopBorder : styles.noTopBorder]}>
                        <Text
                          style={[
                            styles.tableCell,
                          ]}
                        ></Text>
                      </View>
                      <div style={styles.cellGrid}></div>
                    </View>
                  );
                }),
              )}
              {pageIndex === totalPages - 1 && (

                <View style={[styles.tableRow, styles.withBorderBottom]} key={1000} wrap={false}>
                  <View style={styles.cellGrid} />
                  <Text style={[styles.tableCellBottom, styles.c1]}></Text>
                  <Text style={[styles.tableCellBottom, styles.c2]}></Text>
                  <Text style={[styles.tableCellBottom, styles.c3]}></Text>
                  <Text style={[
                    styles.tableCellBottom,

                    {
                      padding: 0,
                      width: '35%',
                      fontSize: 14,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: 'black',
                      fontFamily: 'CourierPrime',
                    },
                  ]}>
                    Total Net Amount
                  </Text>

                  <View style={[styles.cellGrid, { left: 8 }]} />

                  <Text style={[
                    styles.tableCellBottom,

                    {
                      padding: 0,
                      width: '20%',
                      fontSize: 16,
                      color: 'black',
                      textAlign: 'center',
                      fontFamily: 'CourierPrime',
                      fontWeight: 'ultrabold',
                    },
                  ]}>
                    {Number.isNaN(total) ? 0 : total}
                  </Text>

                  <View style={styles.cellGrid} />

                </View>
              )}


            </View>
          </>
        ))}

      </Page>
    </Document>
  );
};


export default ChildeSupportSignSheet;
