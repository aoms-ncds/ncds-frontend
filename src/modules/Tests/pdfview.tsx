import IROReceipt from '../IRO/components/IROReceiptTemplate';
import { PDFViewer } from '@react-pdf/renderer';

const pdfview = () => {
  return (
    <PDFViewer style={{ height: 1000, width: 1500 }}>
      <IROReceipt/>
    </PDFViewer>
  );
};

export default pdfview;
