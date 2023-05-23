/* eslint-disable require-jsdoc */
export default class CommonLifeCycleStates {
  // Inactive states
  public static readonly FORCE_DELETED = -100;
  public static readonly DELETED = -101;
  public static readonly REJECTED = -102;
  public static readonly INACTIVE = -103;

  // Active states
  public static readonly CREATED = 100;
  public static readonly ACTIVE = 100;
}
