import FRRecipt from '../FR/components/FRReceiptTemplate';
import { PDFViewer } from '@react-pdf/renderer';

const pdfview = () => {
  return (
    <PDFViewer style={{ height: 1000, width: 1500 }}>
      <FRRecipt rowData={undefined} />
    </PDFViewer>
  );
};

export default pdfview;
