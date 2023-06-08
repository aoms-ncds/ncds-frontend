import FRRecipt from '../FR/components/FRreciptTemplate';
import { PDFViewer } from '@react-pdf/renderer';

const pdfview = () => {
  return (
    <PDFViewer style={{ height: 1000, width: 1500 }}>
      <FRRecipt />
    </PDFViewer>
  );
};

export default pdfview;
