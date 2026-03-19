/* eslint-disable max-len */
import { Avatar } from '@mui/material';
import { PDFCell, PDFTable, PDFTableHeader, PDFTableRow } from './PDFTable';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import moment from 'moment';
import * as numberToWords from 'number-to-words';
import { useState, useEffect } from 'react';
import UserServices from '../../User/extras/UserServices';
import FRServices from '../../FR/extras/FRServices';
import { ToWords } from 'to-words';

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
    backgroundColor: '#ffffff',
    padding: 10, // Add some padding inside the bordered container
  },
  borderContainer: {
    flex: 1,
    border: '2px solid #333', // Border color and thickness
    borderRadius: 12, // Border radius for rounded corners
    // padding: 10, // Padding inside the border
  },
  image: {
    position: 'absolute',
    left: 60,
    height: 60,
    width: 40,
    marginTop: 10,
  },
  heading: {
    position: 'absolute',
    left: 100,
    fontSize: 25,
    fontWeight: 500,
    marginTop: 15,
    color: '#cd151d',
  },
  title: {
    marginTop: 45,
    fontSize: 15,
    position: 'absolute',
    left: 180,
    color: 'black',
    fontWeight: 500,
    //
  },
  text: {
    fontSize: 11,
    color: 'black',
    fontWeight: 500,
  },
  text1: {
    fontSize: 8,
    color: 'black',

  },
  text2: {
    fontSize: 6,
    color: 'black',

  },
  h1: {
    fontSize: 15,
    left: 50,
    color: '#483285',
    fontWeight: 700,
  },
  box: {
    width: 560,
    border: '1px solid #333',
    left: 5,
  },
  box2: {
    width: 490,
    height: 30,
    // border: '1px solid #333',
    left: 50,
  },
  box3: {
    width: 490,
    height: 100,
    border: '1px solid #333',
    left: 50,
  },
  box4: {
    width: 490,
    height: 60,
    border: '1px solid #333',
    left: 50,
  },
  box5: {
    width: 490,
    height: 80,
    border: '1px solid #333',
  },
  table: {
    position: 'absolute',
    left: 0,
    width: 490,
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
    fontSize: 11,
  },
});
const IROTemplate = (props: { rowData?: any; prev?: boolean; fr?: FR; mngrName?: any; officeMngrSign?: any; president?: EsignaturePresident }) => {
  let totalAmount = 0;
  let totalReqAmount = 0;
  let NewTot: any = 0;
  let totalAmount2 = 0;
  // const [coordinatorImage, setCoordinatrImage] = useState<string | null>(null);
  const toWords = new ToWords({
    localeCode: 'en-IN', // Set Indian locale
    converterOptions: {
      currency: false, // Set true if dealing with currency
      ignoreDecimal: false, // Include decimal words if applicable
      ignoreZeroCurrency: false,
    },
  });
  // console.log(props.rowData.division.details.coordinator, 'coordinatorImage');
  const totalSacntion = props.rowData.particulars?.forEach((e:any) => {
    totalAmount2 += e?.sanctionedAmount != undefined ? e?.sanctionedAmount : 0;
  });
  console.log(props, 'total');

  NewTot += props?.rowData.particulars?.sanctionedAmount != undefined ? props?.fr?.sanctionedAmount : 0;
  console.log(NewTot, 'eee');
  totalReqAmount = props.rowData.particulars?.particulars?.reduce((acc: any, e: { requestedAmount: undefined}) => {
    return acc + (e?.requestedAmount !== undefined ? e.requestedAmount : 0);
  }, 0) ?? 0;
  const sanctionedAmount = NewTot != 0 ? NewTot : totalAmount2;
  let sanctionedAmountWords = '';
  console.log(sanctionedAmount, 'amount');

  if (typeof sanctionedAmount !== 'undefined') {
    sanctionedAmountWords = toWords.convert(sanctionedAmount);
    sanctionedAmountWords = sanctionedAmountWords.charAt(0).toUpperCase() + sanctionedAmountWords.slice(1) + ' only';
  } else {
    sanctionedAmountWords = 'N/A';
  }
  // const dateString = props?.rowData?.releaseAmount?.transferredDate?? '';
  console.log(sanctionedAmountWords, 'dateString');

  // const formattedDate = moment(dateString)?.format('DD MMMM YYYY');
  // console.log(formattedDate, 'formattedDate');
  '';
  useEffect(() => {
    totalAmount = 0;
    NewTot = 0;
    totalAmount2 = 0;
  }, []);

  // const raiseddateString = printdetails?.IROdate;
  // const raiseddate = new Date(raiseddateString);
  // const option = { day: 'numeric', month: 'long', year: 'numeric' as const };
  // const raisformattedDate = raiseddate.toLocaleDateString('en-GB', option);
  const { prev, rowData, fr } = props;
  console.log(fr, 'hre');

  let coordinatorName = '';

  if (prev) {
    coordinatorName = rowData?.division?.details?.prevCoordinator?.name ?? '';
  } else {
    if (fr?.names?.coordinator !=null) {
      const first = fr?.names?.coordinator?.basicDetails?.firstName?.trim() ?? '';
      const middle = fr?.names?.coordinator?.basicDetails?.middleName?.trim() ?? '';
      const last = fr?.names?.coordinator?.basicDetails?.lastName ?? '';
      coordinatorName = [first, middle, last].filter(Boolean).join(' ');
    } else {
      const first = rowData?.division?.details.coordinator?.name?.basicDetails?.firstName?.trim() ?? '';
      const middle = rowData?.division?.details.coordinator?.name?.basicDetails?.middleName?.trim() ?? '';
      const last = rowData?.division?.details.coordinator?.name?.basicDetails?.lastName?.trim() ?? '';
      coordinatorName = [first, middle, last].filter(Boolean).join(' ');
    }
  }
  return (
    <Document >
      <Page size="A4" style={styles.page} >
        <View style={styles.borderContainer}>
          <div>
            <>
              <Image src="/3D Logo 3.png" style={styles.image} />

              <Text style={{ ...styles.heading, fontFamily: 'CourierPrime' }}> INDIAN EVANGELICAL TEAM </Text></>
            {/* <Image src={`${'https://drive.google.com/uc?id=1DLTxXV4OwASqLKQz_Z6iZQUrDjrdVZQB&expor'}`} style={styles.image} /> */}
            <Text style={{ ...styles.title, right: 50, fontFamily: 'CourierPrime' }}> INTERNAL RELEASE ORDER </Text>
          </div>

          <div style={{ marginTop: 60 }}>
            <View style={{ ...styles.box, marginTop: 15 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, top: 2, fontFamily: 'CourierPrime', fontSize: 10 }}>IRO NO</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 74 }}>:&nbsp;{props.rowData?.IROno}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, top: 2, fontFamily: 'CourierPrime', fontSize: 10 }}>IRO DATE</Text>
                  <Text style={{ ...styles.text, marginTop: 5, left: 60 }}>:&nbsp;{props.rowData?.IRODate.format('DD/MM/YYYY')}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime', fontSize: 11, top: 2, marginBottom: 3 }}>Division Name</Text>
                  <Text style={{ ...styles.text, marginTop: 6, left: 34, marginBottom: 3 }}>: {props?.rowData?.division?.details?.name ?? ''}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime', fontSize: 11, top: 2, marginBottom: 3 }}>Div. Co-ordinator</Text>
                  <Text style={{ ...styles.text, marginTop: 6, left: 19, marginBottom: 3 }}>: {coordinatorName}</Text>
                </View>
              </View>
            </View>
          </div>
          <div >
            <View style={{ ...styles.box, marginTop: 3 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 500, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime' }}>Beneficiary Name</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 15 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 5, left: 17 }}>:&nbsp;{props.rowData?.releaseAmount?.transferredBank?.beneficiary?? props.rowData?.sanctionedBank.split('-').slice(1).join('-').trim() ?? ''}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime' }}>Account No</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 37 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 5, left: 48 }}>:&nbsp;{props.rowData?.releaseAmount?.transferredBank?.accountNumber ?? ''}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 5, left: 5, fontFamily: 'CourierPrime' }}>Source of Fund</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 20 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 5, left: 28 }}>:&nbsp;{props.rowData?.sourceOfAccount ?? ''}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime' }}>IFSC Code</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 42 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 5, left: 55 }}>:&nbsp;{props.rowData?.releaseAmount?.transferredBank?.IFSCCode ?? ''}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime' }}>Mode of Payment </Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 10 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 5, left: 15 }}>:&nbsp;{props.rowData?.releaseAmount?.modeOfPayment ?? ''}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime' }}>Bank Name</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 37 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 5, left: 51 }}>:&nbsp;{props.rowData?.releaseAmount?.transferredBank?.bankName}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime' }}>Amt Released on</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 20 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 5, left: 19 }}>:&nbsp;{props.rowData?.releaseAmount?.transferredDate.format('DD/MM/YYYY')}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime', fontSize: 11, marginBottom: 3 }}>Branch Name</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 29 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 6, left: 40, marginBottom: 3 }}>:&nbsp;{props.rowData?.releaseAmount?.transferredBank?.branchName}</Text>
                </View>
                <View style={{ width: 300, flexDirection: 'row' }}>
                  <Text style={{ ...styles.text, marginTop: 3, left: 5, fontFamily: 'CourierPrime', fontSize: 11, marginBottom: 3 }}>FR NO</Text>
                  {/* <Text style={{ ...styles.text, marginTop: 5, left: 52 }}>:</Text> */}
                  <Text style={{ ...styles.text, marginTop: 6, left: 76, marginBottom: 3 }}>:&nbsp;{props.fr?.FRno}</Text>
                </View>
              </View>
            </View>
          </div>
          <div style={{ marginTop: 3 }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                borderWidth: 1,
                // borderColor: '#bff0fd',
                marginTop: 2,
                width: 560,
                left: 5,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  // borderBottomColor: '#bff0fd',
                  // backgroundColor: '#bff0fd',
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  height: 24,
                  textAlign: 'center',

                  flexGrow: 1,
                }}
              >
                <Text
                  style={{
                    width: '12%',
                    textAlign: 'center', fontSize: 10,
                    fontFamily: 'CourierPrime',
                    fontWeight: 500,
                  }}
                >
                  Sl No
                </Text>
                {/* <div style={{ borderRight: 1, height: 24 }}></div> */}
                {/* <Text
                  style={{
                    fontWeight: 500,
                    width: '635px px', // Set fixed width,
                    textAlign: 'center', fontSize: 10,
                    fontFamily: 'CourierPrime',
                  }}
                >
                  Main Category
                </Text> */}
                <div style={{ borderRight: 1, height: 24 }}></div>
                <Text
                  style={{
                    fontWeight: 500,
                    width: '650px px', // Set fixed width,
                    textAlign: 'center', fontSize: 10,
                    fontFamily: 'CourierPrime',
                  }}
                >
                  Particulars / Narration
                </Text>
                <div style={{ borderRight: 1, height: 24 }}></div>
                <Text
                  style={{
                    fontWeight: 500,
                    width: '60%',
                    textAlign: 'center',
                    fontSize: 10,
                    fontFamily: 'CourierPrime',
                  }}
                >
                  Sanctioned{'\n'}
                  As Per
                </Text>
                <div style={{ borderRight: 1, height: 24 }}></div>
                <Text
                  style={{
                    fontWeight: 500,
                    width: '13%',
                    textAlign: 'center', fontSize: 10,
                    fontFamily: 'CourierPrime',
                  }}
                >
                  Qty
                </Text>
                <div style={{ borderRight: 1, height: 24 }}></div>
                <Text
                  style={{
                    fontWeight: 500,
                    width: '32%',
                    textAlign: 'center', fontSize: 10,
                    fontFamily: 'CourierPrime',
                  }}
                >
                  Requested{'\n'}
                  Amt
                </Text>
                <div style={{ borderRight: 1, height: 24 }}></div>
                <Text
                  style={{
                    fontWeight: 500,
                    width: '32%',
                    textAlign: 'center', fontSize: 10,
                    fontFamily: 'CourierPrime',
                  }}
                >
                  Sanctioned {'\n'} Amt
                </Text>
              </View>
              {props.rowData?.particulars &&
  props.rowData?.particulars?.map((item: Particular, index: number) => {
    const ROW_PADDING = 10;
    const FONT_SIZE = 10;
    const LINE_HEIGHT = 14;
    const MAX_WIDTH = 80; // Approx. max characters per line based on font-size
    const MAX_LINES_PER_ROW = 5;

    const calculateRowHeight = (text: string, width: number, fontSize: number) => {
      if (!text) return 50; // Default minimum height

      const CHAR_WIDTH = fontSize * 0.6; // Rough estimate (depends on font)
      const CHARS_PER_LINE = Math.floor(width / CHAR_WIDTH);
      const LINE_HEIGHT = fontSize * 1.2; // Spacing for better readability

      // Estimate how many lines the text will take
      const totalLines = Math.ceil(text.length / CHARS_PER_LINE);

      return totalLines * LINE_HEIGHT+10; // Add padding
    };

    // Calculate height based on the longest text field in the row
    const rowHeight = Math.max(
      calculateRowHeight(
        `${item.mainCategory === 'Select' ? '' : item.mainCategory} ${
          item.subCategory1 === 'Select' ? '' : ' > ' + item.subCategory1
        } ${item.subCategory2 === 'Select' ? '' : ' > ' + item.subCategory2} ${
          item.subCategory3 === 'Select' ? '' : ' > ' + item.subCategory3
        }`,
        500, // Text container width
        18, // Font size
      ),
      calculateRowHeight(item.narration ?? '', 500, 18),
      50, // Minimum height to avoid extra compression
    );


    totalAmount += item.requestedAmount ?? 0;

    return (
      // eslint-disable-next-line react/jsx-key
      <View wrap={false}>
        <PDFTableRow key={index} style={{ borderBottomColor: 'initial', paddingBottom: 5 }} height={`${rowHeight}px`}>

          <PDFCell style={{ textAlign: 'center', fontSize: FONT_SIZE }} width={'12%'}>
            {String(index+1)}
          </PDFCell>

          <div style={{ borderRight: 1, height: rowHeight }}></div>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              height: rowHeight,
              width: '650px',
              padding: 5,
            }}
          >
            <Text
              style={{
                fontWeight: 300,
                fontSize: FONT_SIZE,
                fontFamily: 'CourierPrime',
                textAlign: 'left',
                padding: 5,
                flexWrap: 'wrap',
              }}
            >
              {item.mainCategory == 'Select' ? '' : item.mainCategory}{' '}
              {item.subCategory1 == 'Select' ? '' : ' > ' + item.subCategory1}{' '}
              {item.subCategory2 == 'Select' ? '' : ' > ' + item.subCategory2}{' '}
              {item.subCategory3 == 'Select' ? '' : ' > ' + item.subCategory3}
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: FONT_SIZE,
                padding: 5,
                flexWrap: 'wrap',
              }}
            >
              {item.narration}
            </Text>
          </View>

          <div style={{ borderRight: 1, height: rowHeight }}></div>
          <PDFCell style={{ textAlign: 'center', fontSize: FONT_SIZE }} width={'60%'}>
            {String(item?.sanctionedAsPer ?? '')}
          </PDFCell>
          <div style={{ borderRight: 1, height: rowHeight }}></div>

          <PDFCell style={{ textAlign: 'center', fontSize: FONT_SIZE }} width={'13%'}>
            {String(item.quantity)}
          </PDFCell>
          <div style={{ borderRight: 1, height: rowHeight }}></div>
          <PDFCell style={{ textAlign: 'center', fontSize: FONT_SIZE }} width={'32%'}>
            {String(item.requestedAmount?.toFixed(2))}
          </PDFCell>
          <div style={{ borderRight: 1, height: rowHeight }}></div>
          <PDFCell style={{ textAlign: 'center', fontSize: FONT_SIZE }} width={'32%'}>
            {String(props.rowData.sanctionedAmount ?? item?.sanctionedAmount?.toFixed(2))}
          </PDFCell>
        </PDFTableRow>
      </View>
    );
  })}

              <PDFTableRow key={props.rowData?.particulars?.length} style={{ borderBottomColor: 'initial' }}>
                <PDFCell style={{ fontWeight: 500, textAlign: 'left', left: 5, fontSize: 10, fontFamily: 'CourierPrime' }} width={'85%'}>
                  Grand Total
                </PDFCell>
                {/* <PDFCell width={'20%'} ></PDFCell> */}
                {/* <PDFCell width={'90%'} ></PDFCell> */}
                <PDFCell width={'650 px'} ></PDFCell>
                <PDFCell width={'650 px'} ></PDFCell>
                {/* <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div> */}
                <div style={{ borderRight: 1, right: 0.1, height: 24 }}></div>

                <PDFCell style={{ color: 'red', textAlign: 'center', fontSize: 10, fontFamily: 'CourierPrime' }} width={'50%'}>
                  {totalAmount.toFixed(2) as any ?? ''}
                </PDFCell>
                <div style={{ borderRight: 1, height: 24 }}></div>

                <PDFCell style={{ textAlign: 'center', color: 'red', fontSize: 10, fontFamily: 'CourierPrime' }} width={'50%'}>
                  <br />{NewTot != 0 ? NewTot : totalAmount2.toFixed(2) as any ?? ''}
                </PDFCell>
              </PDFTableRow>
              <View wrap={false}>
                <PDFTableRow key={props.rowData?.particulars?.length} >
                  <PDFCell style={{ fontWeight: 500, textAlign: 'left', left: 5, fontSize: 10, fontFamily: 'CourierPrime' }} width={'30%'}>
                  Sanctioned Amount in Words:
                  </PDFCell>
                  <PDFCell width={'20%'} ></PDFCell>
                  {/* <PDFCell width={'100%'} ></PDFCell> */}
                  {/* <PDFCell width={'40%'} ></PDFCell> */}
                  {/* <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div>
                <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div> */}
                  {/* <div style={{ borderRight: 1, borderRightColor: '#ffffff', height: 24 }}></div> */}
                  <PDFCell style={{ fontWeight: 500, textAlign: 'left', fontSize: 11, fontFamily: 'CourierPrime' }} width={'100%'}>
                    {sanctionedAmountWords}
                  </PDFCell>
                </PDFTableRow>
              </View>
            </View>
          </div>

          <View wrap={false} style={{ marginTop: 5 }}>
            {/* Balance amount section */}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 200 }}>
                <Text style={{
                  ...styles.text, marginTop: 0, padding: 5, left: 5,
                  fontFamily: 'CourierPrime', fontSize: 10,
                }}>
        Balance amount to be adjusted:
                </Text>
              </View>
            </View>

            {/* Adjusted to IRO No. section */}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 200 }}>
                <Text style={{
                  ...styles.text, left: 5, padding: 5,
                  fontFamily: 'CourierPrime', fontSize: 10,
                }}>
        Adjusted to IRO No:
                </Text>
              </View>
            </View>

            {/* Signatures Row */}

            <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-evenly', right: 10 }}>
              {props.rowData?.specialsanction === 'Yes' && (
                <View style={{ flexDirection: 'column', alignItems: 'center', right: 60 }}>
                  <Text style={{
                    ...styles.text,
                    textAlign: 'center',
                    fontSize: 10,
                    fontWeight: 500,
                  }}>
          E Signature protected.
                  </Text>
                  <View style={{
                    ...styles.box5,
                    width: 130,
                    alignItems: 'center',
                  }}>
                    <Image
                      style={{ height: 78, width: 128 }}
                      src={`data:${props.rowData.president?.type ?? props?.president?.presidentSignature?.type};base64, ${props.rowData.president?.base64 ?? props?.president?.presidentSignature?.base64}`}
                    />
                  </View>
                  <Text style={{
                    ...styles.text1,
                    fontSize: 11,
                    textAlign: 'center',
                    fontWeight: 500,
                    fontFamily: 'CourierPrime',
                  }}>
                    {(props?.president as any).presidentName?? props.rowData.names?.president}
                  </Text>
                  <Text style={{
                    ...styles.text1,
                    fontSize: 11,
                    fontWeight: 500,
                    fontFamily: 'CourierPrime',
                    textAlign: 'center',
                  }}>
          President
                  </Text>
                </View>
              )}

              <View style={{ flexDirection: 'column', alignItems: 'flex-end', left: 100 }}>
                <Text style={{
                  ...styles.text,
                  textAlign: 'left',
                  fontSize: 10,
                  fontWeight: 500,
                  right: 15,
                }}>
        E Signature protected.
                </Text>
                <View style={{
                  ...styles.box5,
                  width: 130,
                  alignItems: 'flex-start',
                }}>
                  <Image
                    style={{ height: 78, width: 128 }}
                    src={`data:${props.prev ? props.officeMngrSign?.prevOfficeManagerSignature?.type : props.rowData?.sign?.officeMgr?.type ?? props.officeMngrSign?.officeManagerSignature?.type};base64, ${props.prev ? props.officeMngrSign?.prevOfficeManagerSignature?.base64 : props.rowData?.sign?.officeMgr?.base64 ?? props.officeMngrSign?.officeManagerSignature?.base64}`}
                  />
                </View>
                <Text style={{
                  ...styles.text1,
                  fontSize: 11,
                  textAlign: 'center',
                  fontWeight: 500,
                  right: 22,

                  fontFamily: 'CourierPrime',
                }}>
                  {props.prev ? props.officeMngrSign?.prevOfficeManagerName : props.rowData.names?.officeMgr ?? props.officeMngrSign?.officeManagerName}
                </Text>
                <Text style={{
                  ...styles.text1,
                  fontSize: 11,
                  fontWeight: 500,
                  fontFamily: 'CourierPrime',
                  textAlign: 'center',
                  right: 22,

                }}>
        Office Manager
                </Text>
              </View>
            </View>
          </View>


          <View style={{ minHeight: 20 }} wrap={false} />
          <div style={{ marginTop: 'auto', marginBottom: 10, left: 5, position: 'absolute', bottom: 0, width: 560 }} >
            <View style={{ flexDirection: 'row' }} wrap={false}>
              <Text style={{ ...styles.text, left: 5, fontFamily: 'CourierPrime' }}>Prepared By:</Text>
              <Text style={{ ...styles.text, marginTop: 0, left: 7, marginBottom: 3 }}>
                {props?.rowData?.approvedBy?.basicDetails?.firstName ?
                  `${props.rowData.approvedBy.basicDetails.firstName} ${props.rowData.approvedBy.basicDetails.middleName || ''
                  } ${props.rowData.approvedBy.basicDetails.lastName || ''}` :
                  'Daut Kumar'}
              </Text>

            </View>
            <Text style={{
              fontSize: 8,
              color: 'grey',
              marginTop: 5,
            }}>
              This document is electronically signed by an authorized person of the Indian Evangelical Team adding to the accuracy and
              content of the information submitted.
            </Text>
          </div>
        </View>
      </Page>
    </Document>
  );
};
export default IROTemplate;
