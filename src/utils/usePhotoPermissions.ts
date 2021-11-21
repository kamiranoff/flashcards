import { useCallback, useEffect, useRef, useState } from 'react';
import { request, PERMISSIONS, openSettings, check, checkMultiple } from 'react-native-permissions';
import { isAndroid, isIOS } from './device';

export enum PermissionStatus {
  GRANTED = 'granted',
  DENIED = 'denied',
  LIMITED = 'limited',
  BLOCKED = 'blocked',
  UNAVAILABLE = 'unavailable',
}

export const checkPhotoPermissions = async () => {
  try {
    let result = {};
    if (isIOS) {
      result = await checkMultiple([PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY]);
    } else {
      result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    }
    return result;
  } catch (e) {
    return e;
  }
};

const usePhotoPermissions = () => {
  const [permissionPhotoStatus, setPermissionPhotoStatus] = useState('');
  const isMounted = useRef(true);

  const requestIOSPhotoPermission = () => {
    request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
      setPermissionPhotoStatus(result);
    });
  };

  const requestAndroidPhotoPermission = () => {
    request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
      if (result && result === PermissionStatus.GRANTED) {
        setPermissionPhotoStatus(PermissionStatus.GRANTED);
      } else {
        setPermissionPhotoStatus(PermissionStatus.BLOCKED);
      }
    });
  };

  const requestPhotoPermission = useCallback(() => {
    if (isIOS) {
      requestIOSPhotoPermission();
    }
    if (isAndroid) {
      requestAndroidPhotoPermission();
    }
  }, []);

  const setPermissions = () => {
    if (!isMounted.current) {
      return;
    }
    checkPhotoPermissions().then((res) => setPermissionPhotoStatus(res));
  };

  useEffect(() => {
    isMounted.current = true;
    setPermissions();
    return () => {
      isMounted.current = false;
    };
  }, [permissionPhotoStatus]);

  const handleTriggerPhotoPermission = useCallback(() => {
    if (permissionPhotoStatus === PermissionStatus.BLOCKED) {
      return openSettings();
    }
    requestPhotoPermission();
  }, [permissionPhotoStatus, requestPhotoPermission]);

  return {
    permissionPhotoStatus,
    handleTriggerPhotoPermission,
  };
};

export { usePhotoPermissions };
