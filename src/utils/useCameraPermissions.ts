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

export const checkCameraPermissions = async () => {
  try {
    let result = {};
    if (isIOS) {
      result = await check(PERMISSIONS.IOS.CAMERA);
    } else {
      result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    }
    return result;
  } catch (e) {
    return e;
  }
};

const useCameraPermissions = () => {
  const [permissionCameraStatus, setPermissionCameraStatus] = useState('');
  const isMounted = useRef(true);

  const requestIOSCameraPermission = () => {
    request(PERMISSIONS.IOS.CAMERA).then((result) => {
      setPermissionCameraStatus(result);
    });
  };

  const requestAndroidCameraPermission = () => {
    request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
      setPermissionCameraStatus(result);
    });
  };

  const requestCameraPermission = () => {
    if (isIOS) {
      requestIOSCameraPermission();
    }
    if (isAndroid) {
      requestAndroidCameraPermission();
    }
  };

  const setPermissions = () => {
    if (!isMounted.current) {
      return;
    }
    checkCameraPermissions().then((res) => {
      setPermissionCameraStatus(res);
    });
  };

  useEffect(() => {
    isMounted.current = true;
    setPermissions();
    return () => {
      isMounted.current = false;
    };
  }, [permissionCameraStatus]);

  const handleTriggerCameraPermission = useCallback(() => {
    if (permissionCameraStatus === PermissionStatus.BLOCKED) {
      if (isIOS) {
        openLink('app-settings:');
      }
      if (isAndroid) {
        openSettings().then(() => null);
      }
      return;
    }
    requestCameraPermission();
  }, [permissionCameraStatus]);

  return {
    permissionCameraStatus,
    handleTriggerCameraPermission,
  };
};

export { useCameraPermissions };
