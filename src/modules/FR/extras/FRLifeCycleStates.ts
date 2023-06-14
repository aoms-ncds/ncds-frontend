import CommonLifeCycleStates from '../../../extras/CommonLifeCycleStates';

// eslint-disable-next-line require-jsdoc
export default class FRLifeCycleStates extends CommonLifeCycleStates {
  /* eslint-disable require-jsdoc */
  // Inactive states
  public static readonly FR_CLOSED = -200;
  public static readonly FR_SEND_BACK = -201;

  // Active states
  public static readonly FR_CREATED = 200;
  public static readonly WAITING_TO_PRESIDENT = 201;
  public static readonly WAITING_TO_ACCOUNTS = 202;
  public static readonly PRESIDENT_APPROVED = 203;
  public static readonly ACCOUNTS_APPROVED = 204;
  public static readonly FR_APPROVED = 205;

  public static readonly allStatus = ({
    FR_CREATED: FRLifeCycleStates.FR_CREATED,
    FR_CLOSED: FRLifeCycleStates.FR_CLOSED,
    SEND_BACK: FRLifeCycleStates.FR_SEND_BACK,
    WAITING_TO_PRESIDENT: FRLifeCycleStates.WAITING_TO_PRESIDENT,
    WAITING_TO_ACCOUNTS: FRLifeCycleStates.WAITING_TO_ACCOUNTS,
    PRESIDENT_APPROVED: FRLifeCycleStates.PRESIDENT_APPROVED,
    ACCOUNTS_APPROVED: FRLifeCycleStates.ACCOUNTS_APPROVED,
    FR_APPROVED: FRLifeCycleStates.FR_APPROVED,
  });

  public static readonly getStatusNameByCode = (code: number) =>{
    const statusKeys = Object.keys(FRLifeCycleStates.allStatus);
    for (let i = 0; i < statusKeys.length; i++) {
      const statusKey = statusKeys[i] as keyof typeof FRLifeCycleStates.allStatus;
      if (FRLifeCycleStates.allStatus[statusKey] === code) {
        return statusKey;
      }
    }
    return 'Unknown status';
  };
}
