import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  Permission,
  checkMultiple,
  PERMISSIONS,
  PermissionStatus,
  openSettings,
  requestMultiple,
} from 'react-native-permissions';
import { Platform } from 'react-native';
import { isIOS } from '../utils/device';
import { Logger } from '../service/Logger';

enum Status {
  GRANTED = 'granted',
  DENIED = 'denied',
  LIMITED = 'limited',
  BLOCKED = 'blocked',
  UNAVAILABLE = 'unavailable',
}

const ANDROID_PHOTO_LIBRARY = [
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
];

const IOS_PHOTO_LIBRARY_PERMISSIONS = [PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY, PERMISSIONS.IOS.PHOTO_LIBRARY];

export enum Permissions {
  IOS_PHOTO_LIBRARY_ADD_ONLY = 'ios.permission.PHOTO_LIBRARY_ADD_ONLY',
  IOS_PHOTO_LIBRARY = 'ios.permission.PHOTO_LIBRARY',
  ANDROID_READ_EXTERNAL = 'android.permission.READ_EXTERNAL_STORAGE',
  ANDROID_WRITE_EXTERNAL = 'android.permission.WRITE_EXTERNAL_STORAGE',
}

const PHOTO_LIBRARY_PERMISSIONS = Platform.select<
  typeof ANDROID_PHOTO_LIBRARY | typeof IOS_PHOTO_LIBRARY_PERMISSIONS | {}
>({
  android: ANDROID_PHOTO_LIBRARY,
  ios: IOS_PHOTO_LIBRARY_PERMISSIONS,
  default: {},
});

const PHOTO_LIBRARY_VALUES: Permission[] | Permission = Object.values(PHOTO_LIBRARY_PERMISSIONS);
type ContextType = {
  isPhotoLibraryGranted: boolean;
  isPhotoLibraryLimited: boolean;
  isPhotoLibraryBlocked: boolean;
  handleRequestPhotoLibraryPermission: () => void;
  checkIsPhotoLibraryBlocked: () => Promise<boolean | null> | void;
};

const PermissionsContext = createContext<ContextType>({
  isPhotoLibraryGranted: false,
  isPhotoLibraryLimited: false,
  isPhotoLibraryBlocked: false,
  handleRequestPhotoLibraryPermission: () => null,
  checkIsPhotoLibraryBlocked: () => {},
});

interface Props {
  children: ReactNode | ReactNode[];
}

const PermissionsProvider: FC<Props> = ({ children }) => {
  const [statuses, setStatuses] = useState<Partial<Record<Permission, PermissionStatus>>>({});
  const isPhotoLibraryGrantedAndroid =
    statuses[Permissions.ANDROID_READ_EXTERNAL] === Status.GRANTED &&
    statuses[Permissions.ANDROID_WRITE_EXTERNAL] === Status.GRANTED;
  const isPhotoLibraryBlockedAndroid =
    statuses[Permissions.ANDROID_READ_EXTERNAL] === Status.BLOCKED ||
    statuses[Permissions.ANDROID_WRITE_EXTERNAL] === Status.BLOCKED;

  const isPhotoLibraryGranted = isIOS
    ? statuses[Permissions.IOS_PHOTO_LIBRARY] === Status.GRANTED
    : isPhotoLibraryGrantedAndroid;
  const isPhotoLibraryLimited =
    statuses[Permissions.IOS_PHOTO_LIBRARY] === Status.LIMITED ||
    statuses[Permissions.IOS_PHOTO_LIBRARY_ADD_ONLY] === Status.GRANTED;
  const isPhotoLibraryBlocked = isIOS
    ? statuses[Permissions.IOS_PHOTO_LIBRARY] === Status.BLOCKED
    : isPhotoLibraryBlockedAndroid;

  const checkIsPhotoLibraryBlocked = useCallback(async () => {
    try {
      const res = await checkMultiple(PHOTO_LIBRARY_VALUES);
      if (res) {
        setStatuses(res);
        if (isIOS) {
          return [res[Permissions.IOS_PHOTO_LIBRARY_ADD_ONLY], res[Permissions.IOS_PHOTO_LIBRARY]].includes(
            'blocked',
          );
        }
        return [res[Permissions.ANDROID_WRITE_EXTERNAL], res[Permissions.ANDROID_READ_EXTERNAL]].includes(
          'blocked',
        );
      }
      return null;
    } catch (e) {
      Logger.sendMessage(`getIsLibraryBlocked: ${e}`);
      return null;
    }
  }, []);

  const handleRequestPhotoLibraryPermission = useCallback(async () => {
    if (isPhotoLibraryBlocked) {
      return openSettings();
    }
    try {
      const result = await requestMultiple(PHOTO_LIBRARY_VALUES);
      if (result) {
        return setStatuses(result);
      }
      return null;
    } catch (e) {
      return Logger.sendMessage(`handleRequestPhotoLibraryPermission: ${e}`);
    }
  }, [isPhotoLibraryBlocked]);

  return (
    <PermissionsContext.Provider
      value={{
        isPhotoLibraryGranted,
        isPhotoLibraryLimited,
        isPhotoLibraryBlocked,
        checkIsPhotoLibraryBlocked,
        handleRequestPhotoLibraryPermission,
      }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissionsContext = () => useContext(PermissionsContext);

export { PermissionsProvider };
