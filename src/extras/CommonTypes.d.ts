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
  interface StandardResponse<T>{
    success?: boolean;
    error?: string;
    message?: string;
    data: T;
  }
}
