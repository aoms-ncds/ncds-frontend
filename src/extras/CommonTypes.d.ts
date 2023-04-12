export { };

declare global {
  interface ModuleRoute {
    base: string;
    pages: {
      path: string;
      private: boolean;
      element: JSX.Element;
      requiredAccessRights: 'string'[];
    }[]
  }
}