import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Permission,
  checkMultiple,
  openSettings,
  PERMISSIONS,
  requestMultiple,
  PermissionStatus,
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

const IOS_CAMERA_PERMISSION = [PERMISSIONS.IOS.CAMERA];
const ANDROID_CAMERA_PERMISSION = [PERMISSIONS.ANDROID.CAMERA];

const ANDROID_PHOTO_LIBRARY = [
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
];

const IOS_PHOTO_LIBRARY_PERMISSIONS = [PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY, PERMISSIONS.IOS.PHOTO_LIBRARY];

enum Permissions {
  IOS_PHOTO_LIBRARY_ADD_ONLY = 'ios.permission.PHOTO_LIBRARY_ADD_ONLY',
  IOS_PHOTO_LIBRARY = 'ios.permission.PHOTO_LIBRARY',
  IOS_CAMERA = 'ios.permission.CAMERA',
  ANDROID_CAMERA = 'android.permission.CAMERA',
  ANDROID_READ_EXTERNAL = 'android.permission.READ_EXTERNAL_STORAGE',
  ANDROID_WRITE_EXTERNAL = 'android.permission.WRITE_EXTERNAL_STORAGE',
}

const IOS_PERMISSIONS = [
  PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
  PERMISSIONS.IOS.CAMERA,
  PERMISSIONS.IOS.PHOTO_LIBRARY,
];

const ANDROID_PERMISSIONS = [
  PERMISSIONS.ANDROID.CAMERA,
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
];

const CAMERA_PERMISSIONS = Platform.select<
  typeof ANDROID_CAMERA_PERMISSION | typeof IOS_CAMERA_PERMISSION | {}
>({
  android: ANDROID_CAMERA_PERMISSION,
  ios: IOS_CAMERA_PERMISSION,
  default: {},
});
const PLATFORM_PERMISSIONS = Platform.select<
  typeof ANDROID_PERMISSIONS | typeof IOS_PERMISSIONS | {}
  >({
  android: ANDROID_PERMISSIONS,
  ios: IOS_PERMISSIONS,
  default: {},
});
const PERMISSIONS_VALUES: Permission[] = Object.values(PLATFORM_PERMISSIONS);
const CAMERA_PERMISSIONS_VALUES: Permission[] = Object.values(CAMERA_PERMISSIONS);
const PHOTO_LIBRARY_PERMISSIONS = Platform.select<
  typeof ANDROID_PHOTO_LIBRARY | typeof IOS_PHOTO_LIBRARY_PERMISSIONS | {}
>({
  android: ANDROID_PHOTO_LIBRARY,
  ios: IOS_PHOTO_LIBRARY_PERMISSIONS,
  default: {},
});

const PHOTO_LIBRARY_VALUES: Permission[] | Permission = Object.values(PHOTO_LIBRARY_PERMISSIONS);
type ContextType = {
  isCameraGranted: boolean;
  isCameraBlocked: boolean;
  isPhotoLibraryGranted: boolean;
  isPhotoLibraryLimited: boolean;
  isPhotoLibraryBlocked: boolean;
  handleCheckPhotoLibraryPermissions: () => void;
  handleRequestPhotoLibraryPermission: () => void;
  handleCheckCameraPermission: () => void;
  handleRequestCameraPermission: () => void;
  handleCheckMultiplePermissions: () => void;
};

const PermissionsContext = createContext<ContextType>({
  isCameraGranted: false,
  isCameraBlocked: false,
  isPhotoLibraryGranted: false,
  isPhotoLibraryLimited: false,
  isPhotoLibraryBlocked: false,
  handleCheckPhotoLibraryPermissions: () => null,
  handleRequestPhotoLibraryPermission: () => null,
  handleCheckCameraPermission: () => null,
  handleRequestCameraPermission: () => null,
  handleCheckMultiplePermissions: () => null,
});

interface Props {
  children: ReactNode | ReactNode[];
}

const PermissionsProvider: FC<Props> = ({ children }) => {
  const isMounted = useRef(true);
  const [statuses, setStatuses] = useState<Partial<Record<Permission, PermissionStatus>>>({});
  const cameraStatus = isIOS ? Permissions.IOS_CAMERA : Permissions.ANDROID_CAMERA;
  const isPhotoLibraryGrantedAndroid =
    statuses[Permissions.ANDROID_READ_EXTERNAL] === Status.GRANTED &&
    statuses[Permissions.ANDROID_WRITE_EXTERNAL] === Status.GRANTED;
  const isPhotoLibraryBlockedAndroid =
    statuses[Permissions.ANDROID_READ_EXTERNAL] === Status.BLOCKED ||
    statuses[Permissions.ANDROID_WRITE_EXTERNAL] === Status.BLOCKED;

  const isCameraGranted = statuses[cameraStatus] === Status.GRANTED;
  const isCameraBlocked = statuses[cameraStatus] === Status.BLOCKED;
  const isPhotoLibraryGranted = isIOS
    ? statuses[Permissions.IOS_PHOTO_LIBRARY] === Status.GRANTED
    : isPhotoLibraryGrantedAndroid;
  const isPhotoLibraryLimited =
    statuses[Permissions.IOS_PHOTO_LIBRARY] === Status.LIMITED ||
    statuses[Permissions.IOS_PHOTO_LIBRARY_ADD_ONLY] === Status.GRANTED;
  const isPhotoLibraryBlocked = isIOS
    ? statuses[Permissions.IOS_PHOTO_LIBRARY] === Status.BLOCKED
    : isPhotoLibraryBlockedAndroid;

  const handleCheckMultiplePermissions = useCallback(async () => {
    if (!isMounted.current) {
      return null;
    }
    try {
      const res = await checkMultiple(PERMISSIONS_VALUES);
      if (res) {
        return setStatuses(res);
      }

      return null;
    } catch (e) {
      return Logger.sendMessage(`handleCheckMultiplePermissions: ${e}`);
    }
  }, []);

  const handleCheckPhotoLibraryPermissions = useCallback(async () => {
    if (!isMounted.current) {
      return null;
    }
    try {
      const res = await checkMultiple(PHOTO_LIBRARY_VALUES);
      if (res) {
        return setStatuses(res);
      }
      return null;
    } catch (e) {
      return Logger.sendMessage(`handleCheckPhotoLibraryPermissions: ${e}`);
    }
  }, []);

  const handleCheckCameraPermission = useCallback(async () => {
    if (!isMounted.current) {
      return;
    }
    try {
      const res = await checkMultiple(CAMERA_PERMISSIONS_VALUES);
      if (res) {
        setStatuses(res);
      }
    } catch (e) {
      Logger.sendMessage(`handleCheckCameraPermission: ${e}`);
    }
  }, []);

  const handleRequestCameraPermission = useCallback(async () => {
    if (isCameraBlocked) {
      return openSettings();
    }
    try {
      const result = await requestMultiple(CAMERA_PERMISSIONS_VALUES);
      if (result) {
        return setStatuses(result);
      }
      return null;
    } catch (e) {
      return Logger.sendMessage(`handleRequestCameraPermission: ${e}`);
    }
  }, [isCameraBlocked]);

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

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <PermissionsContext.Provider
      value={{
        isCameraGranted,
        isCameraBlocked,
        isPhotoLibraryGranted,
        isPhotoLibraryLimited,
        isPhotoLibraryBlocked,
        handleCheckPhotoLibraryPermissions,
        handleRequestPhotoLibraryPermission,
        handleCheckCameraPermission,
        handleRequestCameraPermission,
        handleCheckMultiplePermissions,
      }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissionsContext = () => useContext(PermissionsContext);

export { PermissionsProvider };
