import FRLifeCycleStates from '../../FR/extras/FRLifeCycleStates';

// eslint-disable-next-line require-jsdoc
export default class IROLifeCycleStates extends FRLifeCycleStates {
  public static readonly IRO_CLOSED = -210;
  public static readonly IRO_SEND_BACK = -211;

  // Active states
  public static readonly IRO_APPROVED = 211;
  public static readonly OFFICE_MNGR_APPROVED = 212;
  public static readonly ACCOUNTS_MNGR_APPROVED = 213;
  public static readonly WAITING_TO_ACCOUNTS_STATE = 214;
  public static readonly AMOUNT_RELEASED = 215;
  public static readonly WAITING_TO_ACCOUNTS = 202;
  public static readonly RECONCILIATION_DONE = 216;

  public static readonly WAITING_TO_OFFICE_MNGR= 211;
  public static readonly WAITING_TO_ACCOUNTS_MNGR = 212;


  public static readonly allFRStatus = ({

    FR_CREATED: IROLifeCycleStates.FR_CREATED,
    FR_CLOSED: IROLifeCycleStates.FR_CLOSED,
    SEND_BACK: IROLifeCycleStates.FR_SEND_BACK,
    WAITING_TO_PRESIDENT: IROLifeCycleStates.WAITING_TO_PRESIDENT,
    WAITING_TO_ACCOUNTS: IROLifeCycleStates.WAITING_TO_ACCOUNTS,
    PRESIDENT_APPROVED: IROLifeCycleStates.PRESIDENT_APPROVED,
    ACCOUNTS_APPROVED: IROLifeCycleStates.ACCOUNTS_APPROVED,
    FR_APPROVED: IROLifeCycleStates.FR_APPROVED,
    FR_REJECTED: IROLifeCycleStates.REJECTED,
    WAITING_TO_ACCOUNTS_STATE: IROLifeCycleStates.WAITING_TO_ACCOUNTS_STATE,
    IRO_CLOSED: IROLifeCycleStates.IRO_CLOSED,
    IRO_SEND_BACK: IROLifeCycleStates.IRO_SEND_BACK,
    IRO_APPROVED: IROLifeCycleStates.IRO_APPROVED,
    OFFICE_MNGR_APPROVED: IROLifeCycleStates.OFFICE_MNGR_APPROVED,
    ACCOUNTS_MNGR_APPROVED: IROLifeCycleStates.ACCOUNTS_MNGR_APPROVED,
    AMOUNT_RELEASED: IROLifeCycleStates.AMOUNT_RELEASED,
    RECONCILIATION_DONE: IROLifeCycleStates.RECONCILIATION_DONE,
  });

  public static readonly getStatusNameByCodeFR = (code: number) =>{
    const statusKeys = Object.keys(IROLifeCycleStates.allFRStatus);
    for (let i = 0; i < statusKeys.length; i++) {
      const statusKey = statusKeys[i] as keyof typeof IROLifeCycleStates.allFRStatus;
      if (IROLifeCycleStates.allFRStatus[statusKey] === code) {
        return statusKey;
      }
    }
    return 'Unknown status';
  };
}
