import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { WINDOW_PIXEL_WIDTH } from '../utils/device';
import { Logger } from '../service/Logger';

export interface PhotoPickerFile {
  uri: Image['path'];
  name: string;
  type: string;
  width: Image['width'];
  height: Image['height'];
}

export enum PickerError {
  USER_CANCELLED = 'USER_CANCELLED',
  FAIL_TO_CROP_IMAGE = 'FAIL_TO_CROP_IMAGE',
  NO_FILE = 'NO_FILE',
}


const imageOptions = {
  cropping: true,
  compressImageQuality: 0.6,
  freeStyleCropEnabled: true,
  width: 300,
  height: 400,
  compressImageMaxWidth: WINDOW_PIXEL_WIDTH,
  compressImageMaxHeight: (WINDOW_PIXEL_WIDTH * 4) / 3,
  // mediaType: 'photo',
};

class PhotoPicker {
  static getFile = (image: Image): PhotoPickerFile => {
    const uri = image.path;
    const fileType = uri.substr(uri.lastIndexOf('.') + 1);
    return {
      ...image,
      width: image.width,
      height: image.height,
      uri,
      name: `image.${fileType}`,
      type: `image/${fileType}`,
    };
  };

  static openCropper = async(
    onError: (e: PickerError) => void = () => null,
  ): Promise<{ uri: string } | void> => {
    try {
      const image = await ImagePicker.openPicker(imageOptions);

      const file = PhotoPicker.getFile(image);
      if ('uri' in file) {
        return file;
      }

      return onError(PickerError.NO_FILE);
    } catch (e) {
      if (e.message === 'User cancelled image selection') {
        return onError(PickerError.USER_CANCELLED);
      }
      Logger.sendMessage('PhotoPicker error');
      return onError(PickerError.FAIL_TO_CROP_IMAGE);
    }
  };
}

export { PhotoPicker };
