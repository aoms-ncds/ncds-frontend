/* eslint-disable max-len */
import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Line,
  Font,
} from '@react-pdf/renderer';
import moment from 'moment';


Font.register({
  family: 'CourierPrime',
  src: '/arial.ttf',
  fonts: [
    { src: '/arial_bold.ttf', fontWeight: 'bold' },
    { src: '/ARIALBD 1.TTF', fontWeight: 200 },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11 },
  header: { textAlign: 'center', marginBottom: 20 },
  title: { fontSize: 14, textDecoration: 'underline', fontFamily: 'CourierPrime' },
  logo: { width: 550, marginBottom: 10, alignSelf: 'center' },
  //   footerLogo: { width: 400, marginTop: 10, alignSelf: 'center', top: 10 },
  section: { marginBottom: 10 },
  text: { fontSize: 10, marginBottom: 4, alignSelf: 'flex-end' },
  text1: { fontSize: 10, marginBottom: 4, alignSelf: 'flex-end', fontFamily: 'CourierPrime' },
  boldText: { fontSize: 10, fontWeight: 'bold' },
  underlineText: { textDecoration: 'underline' },
  dottedLine: { borderBottom: '1px dotted black', marginVertical: 5 },
  signature: { marginTop: 20, fontSize: 10, fontStyle: 'italic' },
  footer: {
    position: 'absolute', // Keeps it at the bottom
    bottom: 0, // Aligns it to the page bottom
    width: '100%', // Ensures full width
    textAlign: 'center', // Centers content
    paddingVertical: 10, // Adds some space
    paddingLeft: 40,
  },
  footerLogo: {
    width: '100%', // Adjust width as needed
    height: 50, // Adjust height as needed
    objectFit: 'contain',
  },
  spacedText: { fontSize: 10, marginBottom: 10 }, // Adjust marginBottom for more space
//   boldText: { fontSize: 10, fontFamily: 'Teko', fontWeight: 'bold' },
});
// Apply styles

const SanctionLetter = (data:any) => {
  console.log(data.data, 'data4');

  return (

    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header} fixed>
          <Image style={styles.logo} fixed src="/header_tightly_cropped.png" />

        </View>
        <View style={styles.header} >
          <Text style={styles.title}>Sanction Letter</Text>
          <Text style={styles.text1}>Date:{data.data.approvedDate ? moment(data.data.approvedDate).format('DD-MM-yyyy') : ''}</Text>
          <Text style={styles.text1}>
            {data.data.approvedDate ?
              `${moment(data.data.approvedDate).format('DD-MM-yyyy')}/IET/${data.data.applicationCode}` :
              ''}
          </Text>
        </View>

        {/* From Section */}
        <View style={styles.section}>
          <Text style={styles.boldText}>From,</Text>
        </View>
        <View>
          <Text>The President,</Text>
          <Text>Indian Evangelical Team.</Text>
        </View>

        {/* To Section */}
        <Text>{'\n'}</Text>
        <View style={styles.section}>
          <Text>{'\n'}</Text>

          <Text style={styles.boldText}>To,</Text>
        </View>
        <View>
          <Text>{data.data.coordinatorName?.basicDetails?.firstName } {data.data.coordinatorName?.basicDetails?.lastName }</Text>
          <Text>{data.data.division?.details?.name}</Text>
        </View>
        <Text>{'\n'}</Text>
        {/* Subject */}
        <View style={[styles.section, { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }]}>
          <Text style={styles.boldText}>Subject: Sanction Letter for </Text>
          <Text>{data.data.name}</Text>
        </View>


        {/* Letter Content */}
        <View style={styles.section}>
          <View style={styles.section}>
            <Text>Dear {data.data.coordinatorName?.basicDetails?.firstName } {data.data.coordinatorName?.basicDetails?.lastName },</Text>
          </View>
          <Text>
              I am pleased to inform you that, after careful review and consideration, the mission organization has officially sanctioned for {data.data.name}. This approval aligns with our commitment to advancing our mission objectives and serving the community effectively.
          </Text>
        </View>

        {/* Sanction Details */}

        <View style={styles.section}>
          <Text style={{ fontFamily: 'CourierPrime' }}>The details of the sanction are as follows:</Text>
        </View>
        <View style={styles.section}>
          {/* Purpose */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>• Purpose: </Text>
            <Text> {data.data?.name}</Text>
          </View>
          <Text>{'\n'}</Text>
          {/* Sanctioned Amount */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>• Sanctioned Amount: </Text>
            <Text>Rs. {data.data?.sanctionedAmount}</Text>
          </View>
          <Text>{'\n'}</Text>
          {/* Duration/Validity */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>• Duration/Validity: </Text>
            <Text>{data.data?.validityDate}</Text>
          </View>
          <Text>{'\n'}</Text>
          {/* Conditions/Remarks */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Text>• Conditions/Remarks: </Text>
            <Text style={[{ flex: 1, maxWidth: '100%' }]}>
              {data.data?.presidentRemark}
            </Text>
          </View>


        </View>
        <View style={styles.section}></View>

        {/* Closing Remarks */}
        <View style={styles.section}>
          <Text>
              We trust that these resources will be utilized responsibly and following the policy or guidelines provided. Kindly ensure the submission of a progress and utilization report to the concerned department. We appreciate your dedication to the mission and look forward to the positive impact this initiative will bring.
          </Text>
          <Text>In service,</Text>
          <View style={styles.header}>
            {/* <Image style={styles.footerLogo} src={data.presidentSignature.base64}/> */}
            <Image style={{
              // left: 60,
              top: 20,
              // position: 'absolute',
              height: 35,
              width: 50,
            }}
            src={`data:${data.data.presidentSignature?.type};base64, ${data.data.presidentSignature?.base64} `} />
          </View>
          <Text style={styles.signature}>{data.data.presidentName}</Text>
          <Text>President, IET.</Text>
        </View>

        {/* Footer */}
        {/* <Text style={styles.logo}> */}
        {/* Footer - Fixed at the Bottom of Every Page */}
        <View style={styles.footer} fixed>
          <Image style={styles.footerLogo} src="/footer_transparent_document.png" />
        </View>


        {/* </Text> */}
      </Page>
    </Document>
  );
};


export default SanctionLetter;
