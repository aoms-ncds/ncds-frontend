import FRLifeCycleStates from '../../FR/extras/FRLifeCycleStates';

// eslint-disable-next-line require-jsdoc
export default class IROLifeCycleStates extends FRLifeCycleStates {
  public static readonly IRO_CLOSED = -210; //
  // public static readonly IRO_SEND_BACK = -211;

  // Active states
  public static readonly WAITING_FOR_OFFICE_MNGR= 211;//
  public static readonly WAITING_FOR_ACCOUNTS_MNGR = 212;
  public static readonly WAITING_FOR_ACCOUNTS_STATE = 213;
  public static readonly AMOUNT_RELEASED = 214;//
  public static readonly RECONCILIATION_DONE = 215; //
  public static readonly WAITTING_FOR_RELEASE_AMOUNT = 216;
  public static readonly IRO_REJECTED = 217;
  public static readonly IRO_IN_PROCESS = 218;
  public static readonly REVERTED_TO_DIVISION = 219;
  public static readonly REOPENED = 220;


  public static readonly allTransactionStatus = ({

    FR_CLOSED: IROLifeCycleStates.FR_CLOSED,
    SEND_BACK: IROLifeCycleStates.FR_SEND_BACK,
    WAITING_FOR_PRESIDENT: IROLifeCycleStates.WAITING_FOR_PRESIDENT,
    WAITING_FOR_ACCOUNTS: IROLifeCycleStates.WAITING_FOR_ACCOUNTS,
    FR_APPROVED: IROLifeCycleStates.FR_APPROVED,
    FR_REJECTED: IROLifeCycleStates.REJECTED,

    IRO_CLOSED: IROLifeCycleStates.IRO_CLOSED,
    // IRO_SEND_BACK: IROLifeCycleStates.IRO_SEND_BACK,
    WAITING_FOR_OFFICE_MNGR: IROLifeCycleStates.WAITING_FOR_OFFICE_MNGR,
    WAITING_FOR_ACCOUNTS_MNGR: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_MNGR,
    WAITING_FOR_ACCOUNTS_STATE: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE,
    AMOUNT_RELEASED: IROLifeCycleStates.AMOUNT_RELEASED,
    RECONCILIATION_DONE: IROLifeCycleStates.RECONCILIATION_DONE,
    WAITTING_FOR_RELEASE_AMOUNT: IROLifeCycleStates.WAITTING_FOR_RELEASE_AMOUNT,
    IRO_REJECTED: IROLifeCycleStates.IRO_REJECTED,
    IRO_IN_PROCESS: IROLifeCycleStates.IRO_IN_PROCESS,
    REVERTED_TO_DIVISION: IROLifeCycleStates.REVERTED_TO_DIVISION,
    REOPENED: IROLifeCycleStates.REOPENED,

  });

  public static readonly getStatusNameByCodeTransaction = (code: number) =>{
    const statusKeys = Object.keys(IROLifeCycleStates.allTransactionStatus);
    for (let i = 0; i < statusKeys.length; i++) {
      const statusKey = statusKeys[i] as keyof typeof IROLifeCycleStates.allTransactionStatus;
      if (IROLifeCycleStates.allTransactionStatus[statusKey] === code) {
        return statusKey;
      }
    }
    return 'Unknown status';
  };
}
