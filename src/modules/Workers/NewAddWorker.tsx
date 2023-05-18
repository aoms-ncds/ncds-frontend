import React, { useState } from 'react';
import UserForm from '../User/components/UserForm';
import CommonPageLayout from '../../components/CommonPageLayout';

const NewAddWorker = () => {
  const [user, setUser] = useState<CreatableNewUser>({
    kind: 'worker',
    basicDetails: {
      firstName: '',
      lastName: '',
      email: '',
      currentAddress: {},
      permanentAddress: {},
    },
    officialDetails: { remarks: '' },
    supportDetails: {},
    supportStructure: {},
  });

  return (
    <CommonPageLayout title='Add worker'>
      {/* {user.basicDetails.field} */}
      <UserForm
        action='add'
        value={user}
        onChange={(newUser) => {
          setUser(newUser);
        }}
        options={{
          textField: {
            variant: 'standard',
          },
        }}
        // onSubmit={(creatableUser) => {
        //   //
        // }}
      />
    </CommonPageLayout>
  );
};

export default NewAddWorker;
