/* eslint-disable max-len */
import moment from 'moment';
import { PDFCell, PDFTable, PDFTableHeader, PDFTableRow } from '../../IRO/components/PDFTable';
import { Page, Text, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

Font.register({ family: 'Oswald', fonts: [
  { src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf' },
  { src: 'https://fonts.googleapis.com/css2?family=Oswald:wght@200;700&display=swap' },
]});
// Font.register({
//   family: 'Oswald',
//   src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
//   family:'Oswald:wght@700',
// });

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    left: 260,
    height: 50,
    width: 50,
    marginTop: 30,
  },
  title: {
    marginTop: 90,
    fontSize: 12,
    position: 'absolute',
    left: 210,
    color: 'darkblue',
  },
  address: {
    marginTop: 105,
    fontSize: 10,
    position: 'absolute',
    left: 185,
    color: 'black',
  },
  frno: {
    marginTop: 120,
    fontSize: 10,
    position: 'absolute',
    left: 275,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
  },
  month: {
    marginTop: 135,
    fontSize: 10,
    position: 'absolute',
    left: 240,
    color: 'black',
  },
  division: {
    marginTop: 173,
    fontSize: 10,
    position: 'absolute',
    left: 183,
    color: 'black',
  },
  bank: {
    marginTop: 194,
    fontSize: 10,
    position: 'absolute',
    left: 170,
    color: 'black',
  },
  divisiontitle: {
    marginTop: 170,
    fontSize: 10,
    position: 'absolute',
    left: 100,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
  },
  divisiontitle1: {
    marginTop: 190,
    fontSize: 10,
    position: 'absolute',
    left: 100,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
  },
  divisiontitle2: {
    marginTop: 190,
    fontSize: 10,
    position: 'absolute',
    left: 420,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
  },
  date: {
    marginTop: 173,
    fontSize: 10,
    position: 'absolute',
    left: 443,
    color: 'black',
  },
  date1: {
    marginTop: 193,
    fontSize: 10,
    position: 'absolute',
    left: 468,
    color: 'black',
  },
  datetitle: {
    marginTop: 170,
    fontSize: 10,
    position: 'absolute',
    left: 420,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Oswald',
  },
  table: {
    width: '700',
    position: 'absolute',
    left: 50,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    border: '1px solid black',
    padding: 3,
    height: 20,
  },
  tableText: {
    fontSize: 10,
  },
  box: {
    width: 478,
    height: 200,
    border: '1pt solid black',
    marginTop: 1,
  },
  box1: {
    width: 478,
    height: 30,
    marginTop: 1,
  },
});


const FRReceiptTempForHelhiDevisionPrev = (props: { rowData: FR; label: any;president:EsignaturePresident}) => {
  // const month=moment(props.rowData.FRdate);
  // const monthName = month.format('MMMM');
  // const [imageData, setImageData] = React.useState('');
  console.log(props, 'prop here');
  const coordinatorName =
  props.rowData?.division?.details?.name === 'DELHI OFFICE'
    ? `${props.rowData?.division?.details?.coordinator?.name?.basicDetails?.firstName || ''} 
       ${props.rowData?.division?.details?.coordinator?.name?.basicDetails?.lastName || ''}`
    : props.rowData?.division?.details?.prevCoordinator?.name;

console.log('Coordinator Name:', coordinatorName);


  let totalAmount=0;
  return (
    <Document>
      <Page size="A4">
        <Image src="/3D Logo.png" style={styles.image} />
        {/* <Image
          style={styles.image}
          // eslint-disable-next-line max-len, max-len, max-len
          src="data:image/jpeg;base64, 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 "/>
        <Image src={imageData}/> */}
        <div>
          <Text style={styles.title}>REQUISITION FOR FINANCE</Text>
          <Text style={styles.address}>126.Andheri Modh- Chhatarpur, New Delhi-110074</Text>
          <Text style={styles.frno}>{props.rowData?.FRno}</Text>

          <Text style={styles.month}>For the Month of {props.rowData?.particulars[0]?.month}</Text>
          <div>
            <Text style={styles.divisiontitle }>Name of the Divisions:</Text>
            <Text style={styles.division }>{props?.rowData?.division?.details?.name}</Text>
            <Text style={styles.datetitle}>
            Place:
            </Text>
            <Text style={styles.date}>Delhi</Text>
          </div>
          <div>
            <Text style={styles.divisiontitle1 }>Name of the Bank:</Text>
            <Text style={styles.bank}>{props?.rowData?.sanctionedBank}</Text>
            <Text style={styles.divisiontitle2}>Account No:</Text>
            <Text style={styles.date1 }>0</Text>
          </div>
        </div>
        <div style={{ marginTop: 230, width: 560, left: 20, right: 20 }}>
          <PDFTable>
            <PDFTableHeader>
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'60'}>
                Sl No
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'30%'}>
                FR particulars
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'30%'}>
                Sub Division Name
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'20%'}>
                Quantity
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'80%'}>
                Description
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'30%'}>
                 Month
              </PDFCell>
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'25%'}>
                Total
              </PDFCell>
            </PDFTableHeader>
            {props.rowData?.particulars && props.rowData?.particulars.map((item: Particular, index: number) => {
              totalAmount += item.requestedAmount??0;
              return <PDFTableRow key={index} height='50'>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'60'}>
                  {String(index + 1)}
                </PDFCell>
                <div style={{ borderRight: 1, height: 50, borderRightColor: '#90e5fc' }}></div>
                <PDFCell style={{ textAlign: 'center', fontSize: 9 }} width={'30%'}>
                  {item.mainCategory}
                </PDFCell>
                <div style={{ borderRight: 1, height: 50, borderRightColor: '#90e5fc' }}></div>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'30%'}>
                  {props?.rowData.purposeSubdivision?.name}
                </PDFCell>
                <div style={{ borderRight: 1, height: 50, borderRightColor: '#90e5fc' }}></div>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'20%'}>
                  {String(item.quantity)}
                </PDFCell>
                <div style={{ borderRight: 1, height: 50, borderRightColor: '#90e5fc' }}></div>
                <PDFCell style={{ textAlign: 'center', fontSize: 9 }} width={'80%'}>
                  {item.narration}
                </PDFCell>
                <div style={{ borderRight: 1, height: 50, borderRightColor: '#90e5fc' }}></div>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'30%'} >
                  {item?.month}
                </PDFCell>
                <div style={{ borderRight: 1, height: 50, borderRightColor: '#90e5fc' }}></div>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'25%'}>
                  {String(item.requestedAmount)}
                </PDFCell>
              </PDFTableRow>;
            })}
            <PDFTableRow key={props.rowData?.particulars?.length}>
              <PDFCell width={'60'} ></PDFCell>
              <PDFCell width={'30%'} ></PDFCell>
              <PDFCell width={'30%'}></PDFCell>
              <PDFCell width={'20%'}></PDFCell>
              <PDFCell width={'80%'}></PDFCell>
              <div style={{ borderRight: 1, height: 24, borderRightColor: '#90e5fc' }}></div>
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'30%'}>
              Total amount :
              </PDFCell>
              <div style={{ borderRight: 1, height: 24, borderRightColor: '#90e5fc' }}></div>
              <PDFCell style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }} width={'25%'}>
                {totalAmount.toString()}
              </PDFCell>
            </PDFTableRow>
          </PDFTable>
        </div>
        {/* <div style={{ marginTop: 20, fontSize: 10 }}>
          <Image style={{ left: 60,
            position: 'absolute',
            height: 50,
            width: 50 }}
          src={`data:${props.rowData.division?.details.coordinator?.sign?.type};base64, ${props.rowData.division?.details.coordinator?.sign?.base64} `}/>
          <Image style={{ left: 260,
            position: 'absolute',
            height: 50,
            width: 50 }}
          src={`data:${props.rowData.division?.details.seniorLeader?.sign?.type};base64, ${props.rowData.division?.details.seniorLeader?.sign?.base64} `}/>
          <Image style={{ left: 460,
            height: 50,
            position: 'absolute',
            width: 50 }}
          src={`data:${props.rowData.division?.details.juniorLeader?.sign?.type};base64, ${props.rowData.division?.details.juniorLeader?.sign?.base64} `}/>
        </div> */}

        {/* <Text style={{ left: 60, position: 'absolute', fontSize: 10 }}>Coordinator Leader Sign</Text>
          <Text style={{ left: 260, position: 'absolute', fontSize: 10 }}>Senior Leader Sign</Text>
          <Text style={{ left: 460, position: 'absolute', fontSize: 10 }}>Junior Leader Sign</Text> */}
        {/* </div> */}
        <div style={{ marginTop: 50, fontSize: 10 }}>
          <Text style={{ left: 60, top: 20, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Designation: </Text>
          <Text style={{ left: 115, top: 20, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>{props.label?.[0]?.name}</Text>
          <Text style={{ left: 260, top: 20, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Name: </Text>
          <Text
            style={{
              left: 290,
              top: 20,
              position: 'absolute',
              fontSize: 10,
              fontWeight: 'bold',
              fontFamily: 'Oswald',
            }}
          >

            {props?.rowData?.status as any !== `Prev Cord` ?
              `${props.rowData?.division?.details?.coordinator?.name?.basicDetails?.firstName || ''} ${props.rowData?.division?.details?.coordinator?.name?.basicDetails?.lastName || ''}`:
              props.rowData?.division?.details?.prevCoordinator?.name 
            }

          </Text>
          <Text style={{ left: 460, top: 20, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Sign: </Text>
          <Image style={{ left: 480, top: 20,
            position: 'absolute',
            height: 20,
            width: 50 }}
         src={(() => {
  const signData = 
    props.rowData?.division?.details?.coordinator?.sign ||
    props.rowData?.division?.details?.prevCoordinator?.sign;
  
  return signData?.type && signData?.base64 
    ? `data:${signData.type};base64,${signData.base64}`
    : '';
})()}
          />

          <Text style={{ left: 60, top: 40, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Designation: </Text>
          <Text style={{ left: 115, top: 40, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>{props.label?.[1]?.name}</Text>

          {/* Modified seniorLeader with Delhi HQ's seniorLeader.'s details*/}
          <Text style={{ left: 260, top: 40, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Name: </Text>
          <Text
            style={{
              left: 290,
              top: 40,
              position: 'absolute',
              fontSize: 10,
              fontWeight: 'bold',
              fontFamily: 'Oswald',
            }}
          >
            {
 
     props.rowData?.division?.details?.prevJuniorLeader1?.name || `${props.rowData?.division?.details?.juniorLeader?.name?.basicDetails?.firstName || ''}   ${props.rowData?.division?.details?.juniorLeader?.name?.basicDetails?.lastName || ''}`
} 
     
          </Text>

          {/* Modified seniorLeader with Delhi HQ's seniorLeader.'s details*/}
          <Text style={{ left: 460, top: 40, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Sign: </Text>
          <Image style={{ left: 480, top: 40,
            position: 'absolute',
            height: 20,
            width: 50 }}
          // src={
          
          //     `data:${props.rowData?.division?.details?.prevJuniorLeader1?.sign?.type};base64,${props.rowData?.division?.details?.prevJuniorLeader1?.sign?.base64}` ||
          //     `data:${props.rowData?.division?.details?.juniorLeader?.sign?.base64};base64,${props.rowData?.division?.details?.juniorLeader?.sign?.type}`
          // }
          src={(() => {
  const signData = 
    props.rowData?.division?.details?.prevJuniorLeader1?.sign ||
    props.rowData?.division?.details?.juniorLeader?.sign;
  
  return signData?.type && signData?.base64 
    ? `data:${signData.type};base64,${signData.base64}`
    : '';
})()}
          />

          <Text style={{ left: 60, top: 60, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Designation:</Text>
          <Text style={{ left: 115, top: 60, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>{props.label?.[2]?.name}</Text>

          {/* Modified juniorLeader with Delhi HQ's juniorLeader.'s details*/}
          <Text style={{ left: 260, top: 60, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Name: </Text>
          <Text
            style={{
              left: 290,
              top: 60,
              position: 'absolute',
              fontSize: 10,
              fontWeight: 'bold',
              fontFamily: 'Oswald',
            }}
          >
            {
              props.rowData?.division?.details?.prevJuniorLeader2?.name ||
              `${props.rowData?.division?.details?.seniorLeader?.name?.basicDetails?.firstName || ''} ${props.rowData?.division?.details?.seniorLeader?.name?.basicDetails?.lastName || ''}`
            }
          </Text>
          {/* Modified juniorLeader with Delhi HQ's juniorLeader.'s details*/}
          <Text style={{ left: 460, top: 60, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Sign: </Text>
          <Image style={{ left: 480, top: 60,
            position: 'absolute',
            height: 20,
            width: 50 }}
          // src={
          //   props.rowData?.division?.details?.name === 'DELHI OFFICE' ?
          //     `data:${props.rowData?.division?.details?.prevJuniorLeader2?.sign?.type};base64,${props.rowData?.division?.details?.prevJuniorLeader2?.sign?.base64}` :
          //     `data:${props.rowData?.division?.details?.seniorLeader?.sign?.type};base64,${props.rowData?.division?.details?.seniorLeader?.sign?.base64}`
          // }
          src={(() => {
  const signData = 
    props.rowData?.division?.details?.prevJuniorLeader2?.sign ||
    props.rowData?.division?.details?.seniorLeader?.sign;
  
  return signData?.type && signData?.base64 
    ? `data:${signData.type};base64,${signData.base64}`
    : '';
})()}
          />
          {/* {props.label[3]?.name && (
            <><Text style={{ left: 60, top: 80, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Designation:</Text>
              <Text style={{ left: 115, top: 80, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>{props.label[3]?.name}</Text>
              <Text style={{ left: 260, top: 80, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Name: </Text>
              <Text style={{ left: 290, top: 80, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>{props.rowData?.division?.details.president?.name?.basicDetails?.firstName} {props.rowData?.division?.details.president?.name?.basicDetails?.lastName} </Text><Text style={{ left: 460, top: 80, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Sign: </Text><Image style={{
                left: 480, top: 80,
                position: 'absolute',
                height: 20,
                width: 50,
              }}
              src={`data:${props.rowData?.division?.details.president?.sign?.type};base64, ${props.rowData?.division?.details.president?.sign?.base64} `} /></>

          )}
          {props.label[4]?.name && (

            <><Text style={{ left: 60, top: 100, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Designation:</Text><Text style={{ left: 115, top: 100, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>{props.label[4]?.name}</Text><Text style={{ left: 260, top: 100, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Name: </Text><Text style={{ left: 290, top: 100, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>{props.rowData?.division?.details.officeManager?.name?.basicDetails?.firstName} {props.rowData?.division?.details.officeManager?.name?.basicDetails?.lastName} </Text><Text style={{ left: 460, top: 100, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Sign: </Text><Image style={{
              left: 480, top: 100,
              position: 'absolute',
              height: 20,
              width: 50,
            }}
            src={`data:${props.rowData?.division?.details.officeManager?.sign?.type};base64, ${props.rowData?.division?.details.officeManager?.sign?.base64} `} /></>
          )} */}

          {props.rowData?.specialsanction == 'Yes' ? (
            <><Text style={{ left: 60, top: 120, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Designation:</Text><Text style={{ left: 115, top: 120, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>President</Text>
              <Text style={{ left: 260, top: 120, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Name: </Text>
              <Text style={{ left: 290, top: 120, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>{props.rowData?.division?.details.president?.name?.basicDetails?.firstName} {props.rowData?.division?.details.president?.name?.basicDetails?.lastName} {props?.president?.presidentName} </Text>
              <Text style={{ left: 460, top: 120, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Sign: </Text><Image style={{
                left: 480, top: 120,
                position: 'absolute',
                height: 20,
                width: 50,
              }}
              src={`data:${props.president.presidentSignature?.type};base64, ${props.president.presidentSignature?.base64} `} />
              <Text style={{ left: 60, top: 150, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>President Approved Date :</Text>
              <Text style={{ left: 165, top: 150, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>
                {props?.rowData?.presidentApproveDate ? moment(props?.rowData?.presidentApproveDate).format('DD-MM-yyyy') : ''}
              </Text>
              <Text style={{ left: 60, top: 170, position: 'absolute', fontSize: 10, fontWeight: 'bold', fontFamily: 'Oswald' }}>Special Sanction: Yes</Text>


            </>

          ) : (
            []
          )}
        </div>
        {/* <div style={{ marginTop: 10, fontSize: 10 }}>
          <Text style={{ left: 60, position: 'absolute', fontSize: 10 }}>Date:</Text>
          <Text style={{ left: 260, position: 'absolute', fontSize: 10 }}>Date:</Text>
          <Text style={{ left: 460, position: 'absolute', fontSize: 10 }}>Date:</Text>
        </div> */}

        {/* <div style={{ marginTop: 100 }}>
          <Text style={{ fontSize: 12, paddingLeft: 25, paddingRight: 70, marginLeft: 55 }}>
            * The Original requisition must reach Delhi Office by 15 of the previous month for which money is requested. If it is not received in Delhi Office by that date, it will be presumed that
            there is no needs of finance in your area for the month of you have balance of money with you
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: 20,
              paddingLeft: 25,
              paddingRight: 70,
              marginLeft: 55,
            }}
          >
            * All Disputes are subjected to Delhi jurisdiction
          </Text>
        </div> */}

      </Page>
    </Document>
  );
};

export default FRReceiptTempForHelhiDevisionPrev;
