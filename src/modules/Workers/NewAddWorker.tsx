import React, { useState } from 'react';
import UserForm from '../User/components/UserForm';
import CommonPageLayout from '../../components/CommonPageLayout';

const NewAddWorker = () => {
  const [user, setUser] = useState<CreatableNewUser>({
    basicDetails: {
      firstName: '',
      lastName: '',
      email: '',
      currentAddress: {},
      permanentAddress: {},
    },
    officialDetails: {
      remarks: '',
    },
  });

  return (
    <CommonPageLayout title='Add worker'>
      {/* {user.basicDetails.field} */}
      <UserForm
        action='add'
        value={user}
        onChange={(newUser) => {
        // Implement
          setUser(newUser);
        }}
        options={{
          textField: {
            variant: 'standard',
          },
        }}
      />
    </CommonPageLayout>
  );
};

export default NewAddWorker;
