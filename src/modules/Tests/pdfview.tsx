import React from "react";
import FRRecipt from "../FR/components/FRreciptTemplate";
import IRORecipt from "../IRO/components/IROReciptTemplate";
import { PDFViewer } from "@react-pdf/renderer";

const pdfview = () => {
  return (
    <PDFViewer style={{ height: 1000, width: 1500 }}>
      <IRORecipt />
    </PDFViewer>
  );
};

export default pdfview;
