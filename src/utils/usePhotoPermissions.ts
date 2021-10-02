import { useCallback, useEffect, useRef, useState } from 'react';
import { request, PERMISSIONS, openSettings, check } from 'react-native-permissions';
import { isAndroid, isIOS } from './device';
import { openLink } from './openLink';

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
      result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
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

  const requestPhotoPermission = () => {
    if (isIOS) {
      requestIOSPhotoPermission();
    }
    if (isAndroid) {
      requestAndroidPhotoPermission();
    }
  };

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
      if (isIOS) {
        openLink('app-settings:');
      }
      if (isAndroid) {
        openSettings().then(() => null);
      }
      return;
    }
    requestPhotoPermission();
  }, [permissionPhotoStatus]);

  return {
    permissionPhotoStatus,
    handleTriggerPhotoPermission,
  };
};

export { usePhotoPermissions };
