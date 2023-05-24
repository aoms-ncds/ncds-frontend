import React, { Fragment, ReactNode } from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types/style";

export const PDFTable = (props: {
  children: JSX.Element | JSX.Element[] | ReactNode;
  style?: Style;
}) => (
  <View
    style={{
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 0,
      borderWidth: 1,
      borderColor: "#bff0fd",
      ...props.style,
    }}
  >
    {props.children}
  </View>
);

export const PDFTableHeader = (props: {
  children: JSX.Element | JSX.Element[];
  style?: Style;
}) => (
  <View
    style={{
      flexDirection: "row",
      borderBottomColor: "#bff0fd",
      backgroundColor: "#bff0fd",
      borderBottomWidth: 1,
      alignItems: "center",
      height: 24,
      textAlign: "center",
      fontStyle: "bold",
      flexGrow: 1,
      ...props.style,
    }}
  >
    {props.children}
  </View>
);

export const PDFTableRow = (props: {
  children: JSX.Element | JSX.Element[];
  style?: Style;
}) => (
  <View
    style={{
      flexDirection: "row",
      borderBottomColor: "#bff0fd",
      borderBottomWidth: 1,
      alignItems: "center",
      height: 24,
      fontStyle: "bold",
      ...props.style,
    }}
  >
    {props.children}
  </View>
);

export const PDFCell = (props: {
  children?: JSX.Element | JSX.Element[] | String;
  width: string;
  style?: Style;
}) => (
  <Text
    style={{
      width: props.width,
      borderRightColor: "#90e5fc",
      borderRightWidth: 1,
      textAlign: "right",
      ...props.style,
    }}
  >
    {props.children}
  </Text>
);
