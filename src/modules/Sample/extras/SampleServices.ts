<<<<<<< HEAD
import moment from 'moment';
import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';

export default {
  getAll: () => {
    return getStandardResponse<SampleItem[]>(
      dummyRequest<SampleItem[]>({
        data: [
          {
            _id: 'jsdfkjsdfwoeifjd',
            name: 'Someone',
            email: 'someone@somewhere.something',
            createdAt: moment(),
            updatedAt: moment(),
          },
        ],
        // error: null,
        message: 'Successfully fetched all sample items',
        result: 'success',
        timeout: 500,
      }),
    );
  },
};
=======
import moment from 'moment';
import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';

export default {
  getAll: () => {
    return getStandardResponse<SampleItem[]>(
      dummyRequest<SampleItem[]>({
        data: [
          {
            _id: 'jsdfkjsdfwoeifjd',
            name: 'Someone',
            email: 'someone@somewhere.something',
            createdAt: moment(),
            updatedAt: moment(),
          },
        ],
        // error: null,
        message: 'Successfully fetched all sample items',
        result: 'success',
        timeout: 500,
      }),
    );
  },
};
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
