//
//  PhotoChangeEmitter.m
//  FlashCards
//
//  Created by Anita on 27/10/2021.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(PhotosChangeObserver, RCTEventEmitter)
RCT_EXTERN_METHOD(register)
RCT_EXTERN_METHOD(unregister)
@end
