/* eslint-disable react/no-multi-comp */
import React, { Fragment, ReactNode } from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';

export const PDFTable = (props: { children: JSX.Element | JSX.Element[] | ReactNode; style?: Style }) => (
  <View
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 0,
      borderWidth: 1,
      borderColor: '#bff0fd',
      ...props.style,
    }}
  >
    {props.children}
  </View>
);

export const PDFTableHeader = (props: { children: JSX.Element | JSX.Element[]; style?: Style }) => (
  <View
    style={{
      flexDirection: 'row',
      borderBottomColor: '#bff0fd',
      backgroundColor: '#bff0fd',
      borderBottomWidth: 1,
      alignItems: 'center',
      height: 24,
      textAlign: 'center',
      fontWeight: 'bold',
      flexGrow: 1,
      ...props.style,
    }}
  >
    {props.children}
  </View>
);

export const PDFTableRow = (props: { children: JSX.Element | JSX.Element[]; height?:string; style?: Style }) => (
  <View
    style={{
      flexDirection: 'row',
      borderBottomColor: '#bff0fd',
      borderBottomWidth: 1,
      alignItems: 'center',
      height: props.height??24,
      // maxHeight:'100%',?
      fontWeight: 'bold',
      ...props.style,
    }}
  >
    {props.children}
  </View>
);

export const PDFCell = (props: { children?: JSX.Element | JSX.Element[] | string; width: string; style?: Style }) => (
  <>
    <Text
      style={{
        width: props.width,
        // borderRightColor: '#90e5fc',
        // borderRightStyle: 'solid',
        // borderRightWidth: 1,
        // borderRight: 1,
        // borderLeft: 1,
        // borderLeftColor: '#90e5fc',
        // borderLeftStyle: 'solid',
        // borderLeftWidth: 1,
        // borderRightWidth: 1,
        textAlign: 'right',
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  </>
);
