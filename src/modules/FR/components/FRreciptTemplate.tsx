import { BorderTop, Pages } from '@mui/icons-material';
import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Svg,
  Image,
} from '@react-pdf/renderer';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    left: 140,
    height: 70,
    width: 300,
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
    marginTop: 114,
    fontSize: 10,
    position: 'absolute',
    left: 260,
    color: 'black',
  },
  frno: {
    marginTop: 126,
    fontSize: 10,
    position: 'absolute',
    left: 270,
    color: 'black',
  },
  month: {
    marginTop: 140,
    fontSize: 10,
    position: 'absolute',
    left: 230,
    color: 'black',
  },
  division: {
    marginTop: 170,
    fontSize: 10,
    position: 'absolute',
    left: 100,
    color: 'black',
  },
  date: {
    marginTop: 170,
    fontSize: 10,
    position: 'absolute',
    left: 400,
    color: 'black',
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
  },
  tabletext: {
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

const FRreciptTemplate = () => {
  return (
    <Document>
      <Page size="A4">
        <Image src="/iet_logo.png" style={styles.image} />
        <div>
          <Text style={styles.title}>REQUISTION FOR FINANCE</Text>
          <Text style={styles.address}>ADDRESS</Text>
          <Text style={styles.frno}>FRNO:</Text>
          <Text style={styles.month}>For the Month of______</Text>
          <div>
            <Text style={styles.division}>Name of the Division:</Text>
            <Text style={styles.date}>Date:</Text>
          </div>
        </div>
        <div style={{ marginTop: 200 }}>
          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.tabletext}>Sl No</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tabletext}>
                  Financial Requisition Particulars
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tabletext}>Sub Division Name</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tabletext}>Quntity</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tabletext}>Description</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tabletext}>Need Of Month</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.tabletext}>Total</Text>
              </View>
            </View>
            <View style={styles.box}>
              <View style={{ ...styles.row }}>
                <View style={{ ...styles.cell, width: 32 }}>
                  <Text style={styles.tabletext}>01</Text>
                </View>
                <View style={{ ...styles.cell, width: 150 }}>
                  <Text style={styles.tabletext}></Text>
                </View>
                <View style={{ ...styles.cell, width: 93 }}>
                  <Text style={styles.tabletext}></Text>
                </View>
                <View style={{ ...styles.cell, width: 40 }}>
                  <Text style={styles.tabletext}></Text>
                </View>
                <View style={{ ...styles.cell, width: 58 }}>
                  <Text style={styles.tabletext}></Text>
                </View>
                <View style={{ ...styles.cell, width: 75 }}>
                  <Text style={styles.tabletext}></Text>
                </View>
                <View
                  style={{
                    ...styles.cell,
                    width: 28,
                    borderRight: 'none',
                  }}
                >
                  <Text style={styles.tabletext}></Text>
                </View>
              </View>
            </View>
            <View style={styles.box1}>
              <View style={{ ...styles.row }}>
                <View style={{ ...styles.cell, width: 32 }}>
                  <Text style={styles.tabletext}>test</Text>
                </View>
                <View style={{ ...styles.cell, width: 150 }}>
                  <Text style={styles.tabletext}></Text>
                </View>
                <View style={{ ...styles.cell, width: 93 }}>
                  <Text style={styles.tabletext}></Text>
                </View>
                <View style={{ ...styles.cell, width: 40 }}>
                  <Text style={styles.tabletext}></Text>
                </View>
                <View style={{ ...styles.cell, width: 58 }}>
                  <Text style={styles.tabletext}></Text>
                </View>
                <View style={{ ...styles.cell, width: 75 }}>
                  <Text style={styles.tabletext}></Text>
                </View>
                <View
                  style={{
                    ...styles.cell,
                    width: 30,
                  }}
                >
                  <Text style={styles.tabletext}></Text>
                </View>
              </View>
            </View>
          </View>
        </div>

        <div style={{ marginTop: 290 }}>
          <Text style={{ left: 60, position: 'absolute', fontSize: 10 }}>
            Senior Leader Sign
          </Text>
          <Text style={{ left: 260, position: 'absolute', fontSize: 10 }}>
            Junior Leader Sign
          </Text>
          <Text style={{ left: 460, position: 'absolute', fontSize: 10 }}>
            Junior Leader Sign
          </Text>
        </div>
        <div style={{ marginTop: 10, fontSize: 10 }}>
          <Text style={{ left: 60, position: 'absolute', fontSize: 10 }}>
            Date:
          </Text>
          <Text style={{ left: 260, position: 'absolute', fontSize: 10 }}>
            Date:
          </Text>
          <Text style={{ left: 460, position: 'absolute', fontSize: 10 }}>
            Date:
          </Text>
        </div>

        <div style={{ marginTop: 80 }}>
          <Text style={{ fontSize: 12, paddingLeft: 40, paddingRight: 40 }}>
            * The Original requisition must reach Delhi Office by 15 of the
            previous month for which money is requested. If it is not received
            in Delhi Office by that date, it will be presumed that there is no
            needs of finance in your area for the month of you haw balance
            of money with you
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: 20,
              paddingLeft: 40,
              paddingRight: 40,
            }}
          >
            * All Disputes are subjected to Delhi jurisdiction
          </Text>
        </div>
      </Page>
    </Document>
  );
};

export default FRreciptTemplate;
