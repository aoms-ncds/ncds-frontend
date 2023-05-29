import React from 'react';
import { PDFCell, PDFTable, PDFTableHeader, PDFTableRow } from '../components/PDFTable';
import { Page, Text, View, Document, StyleSheet, Font, Svg, Image } from '@react-pdf/renderer';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    left: 140,
    height: 60,
    width: 300,
    marginTop: 30,
  },
  title: {
    marginTop: 80,
    fontSize: 15,
    position: 'absolute',
    left: 190,
    color: 'red',
  },
  text: {
    fontSize: 10,
    color: 'black',
    position: 'absolute',
  },
  text1: {
    fontSize: 10,
    color: 'black',
    position: 'absolute',
    marginTop: 100,
  },
  text2: {
    fontSize: 8,
    color: 'black',
    position: 'absolute',
    marginTop: 114,
  },
  h1: {
    fontSize: 10,
    position: 'absolute',
    left: 50,
    color: 'black',
  },
  box: {
    width: 490,
    height: 50,
    border: '1pt solid black',
    position: 'absolute',
    left: 50,
  },
  box2: {
    width: 490,
    height: 30,
    border: '1pt solid black',
    position: 'absolute',
    left: 50,
  },
  box3: {
    width: 490,
    height: 100,
    border: '1pt solid black',
    position: 'absolute',
    left: 50,
  },
  box4: {
    width: 490,
    height: 80,
    border: '1pt solid black',
    position: 'absolute',
    left: 50,
  },
  box5: {
    width: 80,
    height: 80,
    border: '1pt solid black',
    position: 'absolute',
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
  tabletext: {
    fontSize: 10,
  },
});

const IROReciptTemplate = () => {
  return (
    <Document>
      <Page size="A4">
        <div>
          <Image src="/iet_logo.png" style={styles.image} />
          <Text style={styles.title}> INTERNAL RELEASE ORDER </Text>
        </div>

        <div style={{ marginTop: 120 }}>
          <Text style={{ ...styles.h1 }}>Financial Request Details</Text>
          <View style={{ ...styles.box, marginTop: 15 }}>
            <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>IRO No :</Text>
            <Text style={{ ...styles.text, marginTop: 10, left: 200 }}>Request Raised Date :</Text>
            <Text style={{ ...styles.text, marginTop: 30, left: 20 }}>Fund Release date:</Text>
            <Text style={{ ...styles.text, marginTop: 30, left: 200 }}>FR Reconciled Date:</Text>
          </View>
        </div>

        <div style={{ marginTop: 80 }}>
          <Text style={{ ...styles.h1 }}>Division Details</Text>
          <View style={{ ...styles.box2, marginTop: 15 }}>
            <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>Division Name :</Text>
            <Text style={{ ...styles.text, marginTop: 10, left: 200 }}>Leader Name :</Text>
          </View>
        </div>

        <div style={{ marginTop: 60 }}>
          <Text style={{ ...styles.h1 }}>Deposit Bank Details</Text>
          <View style={{ ...styles.box4, marginTop: 15 }}>
            <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>Bank Name :</Text>
            <Text style={{ ...styles.text, marginTop: 10, left: 200 }}>Account No :</Text>
            <Text style={{ ...styles.text, marginTop: 30, left: 20 }}>Bank Branch :</Text>
            <Text style={{ ...styles.text, marginTop: 30, left: 200 }}>Fund Source :</Text>
            <Text style={{ ...styles.text, marginTop: 50, left: 20 }}>Transfer Type :</Text>
            <Text style={{ ...styles.text, marginTop: 50, left: 200 }}>Transaction Id :</Text>
          </View>
        </div>

        <div style={{ marginTop: 110 }}>
          <Text style={{ ...styles.h1 }}>Expense Details</Text>
          <View style={{ ...styles.box3, marginTop: 15 }}>
            <PDFTable>
              <PDFTableHeader>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'40'}>
                  S No
                </PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'80'}>
                  Man Category
                </PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'60'}>
                  Narration
                </PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100'}>
                  Requested Amount
                </PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100'}>
                  Sanctioned Amoubt
                </PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'110'}>
                  Accountant Remarks
                </PDFCell>
              </PDFTableHeader>
              <PDFTableRow>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'40'}></PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'80'}></PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'60'}></PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100'}></PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'100'}></PDFCell>
                <PDFCell style={{ textAlign: 'center', fontSize: 10 }} width={'110'}></PDFCell>
              </PDFTableRow>
            </PDFTable>
          </View>
        </div>

        <div style={{ marginTop: 120 }}>
          <View style={{ ...styles.box2, marginTop: 15 }}>
            <Text style={{ ...styles.text, marginTop: 10, left: 20 }}>Santioned Amount in Words :</Text>
          </View>
        </div>

        <div style={{ marginTop: 80 }}>
          <Text style={{ ...styles.text, marginTop: 1, left: 50 }}>E Signature</Text>
          <Text style={{ ...styles.text, marginTop: 1, left: 410 }}>E Signature are protected</Text>
          <View style={{ ...styles.box5, marginTop: 15, left: 50 }}></View>
          <View style={{ ...styles.box5, marginTop: 15, left: 130 }}></View>
          <View style={{ ...styles.box5, marginTop: 15, left: 210 }}></View>
          <View style={{ ...styles.box5, marginTop: 15, left: 290 }}></View>
          <View style={{ ...styles.box5, marginTop: 15, left: 410, width: 130 }}></View>
          <Text style={{ ...styles.text1, left: 50 }}>Name</Text>
          <Text style={{ ...styles.text1, left: 130 }}>Name</Text>
          <Text style={{ ...styles.text1, left: 210 }}>Name</Text>
          <Text style={{ ...styles.text1, left: 290 }}>Name</Text>
          <Text style={{ ...styles.text1, left: 410, fontSize: 10, marginTop: 130 }}>NAME</Text>

          <Text style={{ ...styles.text2, left: 50 }}>Division Leader</Text>
          <Text style={{ ...styles.text2, left: 130 }}>Workers Dept</Text>
          <Text style={{ ...styles.text2, left: 210 }}>Account Manager</Text>
          <Text style={{ ...styles.text2, left: 290 }}>Accountant</Text>
          <Text style={{ ...styles.text2, left: 410, fontSize: 10, marginTop: 144 }}>ADMINISTRATOR</Text>
          <Text style={{ ...styles.text2, left: 410, marginTop: 158, fontSize: 10 }}>SACTIONING AUTHORITY</Text>
        </div>
        <div style={{ marginTop: 210 }}>
          <Text style={{ fontSize: 8, color: 'grey', left: 30 }}>
            This Document is electronically sigedn by authorised person of the Evangelical Team adding to the accuracy and content of the information submitted
          </Text>
        </div>
      </Page>
    </Document>
  );
};

export default IROReciptTemplate;
