import CommonLifeCycleStates from '../../../extras/CommonLifeCycleStates';

// eslint-disable-next-line require-jsdoc
export default class FRLifeCycleStates extends CommonLifeCycleStates {
  /* eslint-disable require-jsdoc */
  // Inactive states
  public static readonly FR_CLOSED = -200;
  public static readonly FR_SEND_BACK = -201;

  // Active states
  public static readonly SUBMITTED_TO_PRESIDENT = 201;
  public static readonly SUBMITTED_TO_ACCOUNTS = 202;
  public static readonly PRESIDENT_APPROVED = 203;
  public static readonly ACCOUNTS_APPROVED = 204;
  public static readonly FR_APPROVED = 205;
}
