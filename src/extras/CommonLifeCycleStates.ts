/* eslint-disable require-jsdoc */
export default class CommonLifeCycleStates {
  // Inactive states
  public static readonly FORCE_DELETED = -100;
  public static readonly DELETED = -101;
  public static readonly REJECTED = -102;
  public static readonly INACTIVE = -103;
  public static readonly CREATED = -104;
  public static readonly DISAPPROVE = -105;
  // Active states
  public static readonly ACTIVE = 100;
  public static readonly APPROVED = 101;

  public static readonly allStatus = ({
    FORCE_DELETED: CommonLifeCycleStates.FORCE_DELETED,
    DELETED: CommonLifeCycleStates. DELETED,
    REJECTED: CommonLifeCycleStates.REJECTED,
    INACTIVE: CommonLifeCycleStates.INACTIVE,
    CREATED: CommonLifeCycleStates.CREATED,
    ACTIVE: CommonLifeCycleStates.ACTIVE,
    APPROVED: CommonLifeCycleStates.APPROVED,
  });
  public static readonly getStatusNameByCode = (code: number) =>{
    const statusKeys = Object.keys(CommonLifeCycleStates.allStatus);
    for (let i = 0; i < statusKeys.length; i++) {
      const statusKey = statusKeys[i] as keyof typeof CommonLifeCycleStates.allStatus;
      if (CommonLifeCycleStates.allStatus[statusKey] === code) {
        return statusKey;
      }
    }
    return 'Unknown status';
  };
}
