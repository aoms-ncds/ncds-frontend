import { useAuth } from '../../../hooks/Authentication';

interface PermissionChecksProps{
    permissions: Permission[];
    granted?: JSX.Element;
    denied?: (missingPermissions: Permission[]) => JSX.Element;
}
const PermissionChecks = (props: PermissionChecksProps):JSX.Element|null => {
  const auth = useAuth();
  if (!auth.user || !auth.user.permissions) return null;
  const deniedPermissions:Permission[] = [];
  for (let i = 0; i < props.permissions.length; i++) {
    const permission = props.permissions[i];
    if (!auth.user.permissions[permission]) {
      deniedPermissions.push(permission);
    }
  }
  return deniedPermissions.length === 0 ?
    (props.granted ?? null) :
    props.denied ?
      props.denied(deniedPermissions) :
      null;
};

export default PermissionChecks;
