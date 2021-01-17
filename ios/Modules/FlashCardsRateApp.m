//
//  FlashCardsRateApp.m
//  FlashCards
//
//  Created by Anita Czapla on 17/01/2021.
//  Copyright © 2021 Anita Czapla. All rights reserved.

#import "FlashCardsRateApp.h"
#import <StoreKit/StoreKit.h>
#import <React/RCTBridge.h>

@implementation FlashCardsRateApp

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
  return @{
    @"isAvailable": [SKStoreReviewController class] ? @(YES) : @(NO)
  };
}

RCT_EXPORT_METHOD(requestReview)
{
  [SKStoreReviewController requestReview];
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
