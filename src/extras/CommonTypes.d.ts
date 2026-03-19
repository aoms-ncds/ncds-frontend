import { Moment } from 'moment';
// import languages from './CommonConfig';

export default {};

declare global {
  interface ModuleRoute {
    base: string;
    pages: {
      title: string;
      path: string;
      private: boolean;
      element: JSX.Element;
      requiredAccessRights?: Permission[];
      showInDrawer?: boolean;
      icon?: React.ReactNode;
    }[];
  }
  interface LoaderContextType {
    count: number;
    onLoad: () => void;
    afterLoad: () => void;
  }
  interface StandardResponse<T> {
    success?: boolean;
    error?: string;
    message?: string;
    data: T;
  }
  interface MongooseDocument {
    _id: string;
    createdAt: Moment;
    updatedAt: Moment;
  }
  type Creatable<T extends MongooseDocument> = Omit<T, keyof MongooseDocument> & Partial<MongooseDocument>;
  interface FileObject extends MongooseDocument {
    filename: string;
    size: number;
    type: FileObjectType;
    storage: 'S3' | 'Drive';
    fileId: string;
    downloadURL: string | null;
    private: boolean;
    status: number;
    refId?: string;
    base64?: string;

  }
  type FileObjectType =
    | 'application/vnd.ms-excel'
    | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    | 'application/pdf'
    | 'video/quicktime'
    | 'image/png'
    | `video/${string}`
    | `image/${string}`;

  type FileObjectExtensions = '.xlsx' | '.xls';
  interface AJAXProgress {
    loaded: number;
    total: number;
    percentage: number;
  }

  interface FormComponentProps<T, Options = undefined> {
    disable?: boolean;
    value: T;
    onChange: (newState: T) => void;
    action: 'view' |'multi'| 'add' | 'edit'| 'custom'|'customIRO'| 'reopen'| 'customEdit'| 'editAdmin';
    actionAdi?: 'view';
    onSubmit?: (data: T,) => Promise<void>;
    options?: Options;
  }

  type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
  };

  // type Language = (typeof languages)[number];
  interface Address {
    buildingName?: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
  }

  interface DateRange {
    startDate: Moment;
    endDate: Moment;
    rangeType?: DateRangeType;
  }
  type DateRangeType =
    | 'date-time'
    | 'days'
    | 'weeks'
    | 'months'
    | 'quarter_years'
    | 'years'
    | 'customRange'
    | 'customDay';

}
