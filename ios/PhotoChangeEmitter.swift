//
//  PhotoChangeEmitter.swift
//  FlashCards
//
//  Created by Anita on 27/10/2021.

import Foundation
import UIKit
import AVFoundation
import Photos


@objc(PhotosChangeObserver)
class PhotosChangeObserver: RCTEventEmitter {
  override init() {
    super.init();
  }

  override func supportedEvents() -> [String]! {
    return ["onPhotosChanged"]
  }
}

extension PhotosChangeObserver: PHPhotoLibraryChangeObserver {
  func photoLibraryDidChange(_ changeInstance: PHChange) {
      DispatchQueue.main.async { [unowned self] in
        sendEvent(withName: "onPhotosChanged", body: {})
      }
  }
  @objc
  func register() {
    PHPhotoLibrary.shared().register(self)
  }
  @objc
  func unregister() {
    PHPhotoLibrary.shared().unregisterChangeObserver(self)
  }
}
