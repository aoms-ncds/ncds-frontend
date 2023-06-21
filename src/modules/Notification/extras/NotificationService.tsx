
import { DateRange } from '@mui/icons-material';
import axios from 'axios';
import moment from 'moment';
import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
const Messaging = {
  send: (args: Message): Promise<StandardResponse<boolean>> => getStandardResponse(
    axios.post(
      '/messaging/send',
      args,
      {
        headers: {
          ...getAuthHeader(),
        },
      },
    ),
  ),


  getMessages: (dateRange: DateRange): Promise<StandardResponse<Message[]>> => getStandardResponse(
    axios.get(
      '/messaging', {
        params: {
          startDate: moment(dateRange.startDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
          endDate: moment(dateRange.endDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        },
        headers: {
          ...getAuthHeader(),
        },
      }),
  ),
  getMyMessages: (read: boolean): Promise<StandardResponse<Message[]>> => getStandardResponse(
    axios.get(
      '/messaging/my_messages', {
        params: {
          read,
        },
        headers: {
          ...getAuthHeader(),
        },
      }),
  ),
  getMyMessagesCount: (): Promise<StandardResponse<number>> => getStandardResponse(
    axios.get(
      '/messaging/my_messages/count', {
        headers: {
          ...getAuthHeader(),
        },
      }),
  ),
  getMessageById: (_id: string): Promise<StandardResponse<Message>> => getStandardResponse(
    axios.get(
      `/messaging/${_id}`, {
        headers: {
          ...getAuthHeader(),
        },
      },
    ),
  ),

  // markAllMessagesAsRead: (): Promise<StandardResponse<Message[]>> => getStandardResponse(
  //     axios.delete(
  //         "/messaging/my_messages", {
  //         headers: {
  //             ...getAuthHeader(),
  //         },
  //     })
  // ),
  markAllAsRead: (): Promise<StandardResponse<void>> => getStandardResponse(
    axios.patch(
      '/messaging/mark_all_as_read', {}, {
        headers: {
          ...getAuthHeader(),
        },
      },
    ),
  ),
  markAsRead: (_id: string): Promise<StandardResponse<void>> => getStandardResponse(
    axios.patch(
      `/messaging/${_id}/mark_as_read`, {}, {
        headers: {
          ...getAuthHeader(),
        },
      },
    ),
  ),


};

export default Messaging;
