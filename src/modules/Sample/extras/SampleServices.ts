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
