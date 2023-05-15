import { Moment } from 'moment';

export { };

declare global {
  interface ModuleRoute {
    base: string;
    pages: {
      title: string;
      path: string;
      private: boolean;
      element: JSX.Element;
      requiredAccessRights?: 'string'[];
      showInDrawer?: boolean;
      icon?: JSX.Element;
    }[];
  }
  interface LoaderContextType{
    count: number;
    onLoad: () => void;
    afterLoad: () => void;
}
  interface StandardResponse<T>{
    success?: boolean;
    error?: string;
    message?: string;
    data: T;
  }
  interface MongooseDocument{
    _id: string;
    createdAt: Moment;
    updatedAt: Moment;
  }
  type Creatable<T extends MongooseDocument> = Omit<T, keyof MongooseDocument> & Partial<MongooseDocument>;
  interface FileObject extends MongooseDocument{
    name: string;
    size: number;
    type: FileObjectType;
    storage: 'S3'|'Drive';
    fileId: string;
    downloadURL: string|null;
    private: boolean;
  }
  type FileObjectType =
    'application/vnd.ms-excel'
    |'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    |'application/pdf' | 'video/quicktime' | 'image/png' | `video/${string}` | `image/${string}`;
    type FileObjectExtensions = '.xlsx'|'.xls';
  interface AJAXProgress{
    loaded: number;
    total: number;
    percentage: number;
  }

  interface DateRange{
    startDate: Moment;
    endDate: Moment;
  }

  interface FormComponentProps<FormState, Options={}>{
    value: FormState;
    options?: Options;
    onChange: (newState: FormState) => void;
    action: 'view'|'add'|'edit';
    onSubmit?: (data: FormState) => Promise<void>;
    title?: string;
  }
}
