# Initial project work

### 1. Initialize project

### 2. MUI library & Theme setup

### 3. Setup Code Linting tools and code snippet configuration files

- ESLint
- VS Code Custom Code Snippets for the frontend project

### 4. Setup project structure

- src/

  - components
    - CommonPageLayout.tsx
  - pages/

    - Home
      - index.tsx
    - Users

      - types/

        - User.d.ts

      - components/
        - UserServices.tsx
          - `login();`
          - `getCountByType();`
      - index.tsx
      - Login.tsx

    - Divisions

      - components/
        - DivisionServices.tsx
          - `getCount();`
      - index.tsx

    - ...
      - ...
        - ...
          - ...

### 5. Create a CommonPageLayout component

- Sample usage:

```html
<CommonPageLayout title="Page title" loadingCount="{loading}">
  Content goes here...
</CommonPageLayout>
```

### 6. Setup react-router-dom

### 7. Design Login Page

- Design User Type/Interface

```javascript
interface User {
  _id: string;
}
```

- Email Regex

### 8. Create Fake REST API Caller in Users/components/UserServices for logging user in

```javascript
UserServices.login(email: string, password: string) => {
    data: User;
    message: "Successfully logged in!" | "Something went wrong! Please try again";
    error: any;
}
```

### 9. Design Private Routes

### 10. Design forgotten passwords page

```javascript
UserServices.requestForgottenPasswordReset(email: string,) => {
    data: void;
    message: "Successfully logged in!" | "Something went wrong! Please try again";
    error: any;
}
```

# Home

### 11. Design HomePage

- Create Fake REST API Caller in Divisions/components/DivisionServices for getting count of all the divisions

```javascript
DivisionServices.getCount() => {
     data: Number;
     message: "Successfully fetched count of all divisions!" | "Something went wrong! Please try again";
     error: any;
}
```

- Create a Fake REST API Caller in Users/components/UserServices for getting count of all staffs/workers

```javascript
UserServices.getCountByType(type: "staff"|"worker") => {
        data: Number;
        message: "Successfully fetched count of all staff" | "Successfully fetched count of all workers" | "Something went wrong! Please try again";
        error: any;
}
```

- Create a Fake REST API Caller in FR/components/FRServices for getting count of all active FRs

```javascript
FRServices.getActiveCount() => {
     data: Number;
     message: "Successfully fetched count of all active FRs!" | "Something went wrong! Please try again";
     error: any;
}
```

- Create a Fake REST API Caller in IRO/components/IROServices for getting count of all active IROs

```javascript
IROServices.getActiveCount() => {
     data: Number;
     message: "Successfully fetched count of all active IROs!" | "Something went wrong! Please try again";
     error: any;
}
```

# HR

### 15. Design HR Dashboard

Items:

1. Manage Staff
2. Manage Workers
3. Approve new workers

### 16. Design Manage Staff page

### 17. Design Table of all all staffs

````
- Create a Fake REST API Caller in User/components/UserServices for getting count of all active Users

```javascript
UserServices.getActiveCount() => {
     data: Number;
     message: "Successfully fetched count of all Users!" | "Something went wrong! Please try again";
     error: any;
}
````

### 18. Add button for adding a new staff (Which will redirect to /users/add)

### 19. Excel & PDF exports of users' data

### 20. Excel imports of users' data
