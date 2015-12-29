//
//  SomeString.m
//  AwesomeProject1
//
//  Created by Anthony Quinault on 23/12/2015.
//  Copyright © 2015 CADESOFT. All rights reserved.
//


#import "SomeString.h"

@implementation SomeString

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(get:(RCTResponseSenderBlock)callback)
{
  // Change this depending on what you want to retrieve:
  NSString* someString = @"something";
  
  callback(@[someString]);
}


@end
