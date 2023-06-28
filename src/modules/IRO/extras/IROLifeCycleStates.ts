import FRLifeCycleStates from '../../FR/extras/FRLifeCycleStates';

// eslint-disable-next-line require-jsdoc
export default class IROLifeCycleStates extends FRLifeCycleStates {
  // Inactive states
  public static readonly IRO_CLOSED = -210;
  public static readonly IRO_SEND_BACK = -211;

  // Active states
  public static readonly IRO_APPROVED = 211;
  public static readonly OFFICE_MNGR_APPROVED = 212;
  public static readonly ACCOUNTS_MNGR_APPROVED = 213;
  public static readonly SUBMITTED_TO_ACCOUNTS_STATE = 214;
  public static readonly AMOUNT_RELEASED = 215;
  public static readonly WAITING_TO_ACCOUNTS=202;
}
