import { Moment } from 'moment';
import { languages } from './CommonConfig';

export {};

export interface ModuleRoute {
  base: string;
  pages: {
    title: string;
    path: string;
    private: boolean;
    element: React.ReactNode;
    requiredAccessRights?: 'string'[];
    showInDrawer?: boolean;
    icon?: React.ReactNode;
  }[];
}
export interface LoaderContextType {
  count: number;
  onLoad: () => void;
  afterLoad: () => void;
}
export interface StandardResponse<T> {
  success?: boolean;
  error?: string;
  message?: string;
  data: T;
}
export interface MongooseDocument {
  _id: string;
  createdAt: Moment;
  updatedAt: Moment;
}
export type Creatable<T extends MongooseDocument> = Omit<T, keyof MongooseDocument> &
  Partial<MongooseDocument>;
export interface FileObject extends MongooseDocument {
  name: string;
  size: number;
  type: FileObjectType;
  storage: 'S3' | 'Drive';
  fileId: string;
  downloadURL: string | null;
  private: boolean;
}
export type FileObjectType =
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/pdf'
  | 'video/quicktime'
  | 'image/png'
  | `video/${string}`
  | `image/${string}`;
export type FileObjectExtensions = '.xlsx' | '.xls';
export interface AJAXProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface DateRange {
  startDate: Moment;
  endDate: Moment;
}

export interface FormComponentProps<T, Options = undefined> {
  value: T;
  onChange: (newState: T) => void;
  action: 'view' | 'add' | 'edit';
  onSubmit?: (data: T) => Promise<void>;
  options?: Options;
}

export type Language = (typeof languages)[number];
export interface Address {
  buildingName?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}
