#import "DateI18n.h"

@implementation DateI18n
RCT_EXPORT_MODULE()

- (NSDate *) dateFrom:(double)secondsSince1970 {
  return [NSDate dateWithTimeIntervalSince1970:(secondsSince1970 / 1000.0)];
}

- (NSDateFormatterStyle)styleFrom:(NSString *)rawStyle {
  if ([@"short" caseInsensitiveCompare:rawStyle] == NSOrderedSame) {
    return NSDateFormatterShortStyle;
  }
  if ([@"medium" caseInsensitiveCompare:rawStyle] == NSOrderedSame) {
    return NSDateFormatterMediumStyle;
  }
  if ([@"long" caseInsensitiveCompare:rawStyle] == NSOrderedSame) {
    return NSDateFormatterLongStyle;
  }
  if ([@"full" caseInsensitiveCompare:rawStyle] == NSOrderedSame) {
    return NSDateFormatterFullStyle;
  }
  return NSDateFormatterNoStyle;
}

- (NSString *)format:(double)date formatStyle:(NSString *)formatStyle {
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    dateFormatter.dateStyle = [self styleFrom:formatStyle];
    dateFormatter.timeStyle = NSDateFormatterNoStyle;

    return [dateFormatter stringFromDate:[self dateFrom:date]];
}

- (NSString *)formatTime:(double)date formatStyle:(NSString *)formatStyle {
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    dateFormatter.timeStyle = [self styleFrom:formatStyle];
    dateFormatter.dateStyle = NSDateFormatterNoStyle;

    return [dateFormatter stringFromDate:[self dateFrom:date]];
}

- (NSString *)formatDateTime:(double)date
    dateFormatStyle:(NSString *)dateFormatStyle
    timeFormatStyle:(NSString *)timeFormatStyle {
      NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
      dateFormatter.dateStyle = [self styleFrom:dateFormatStyle];
      dateFormatter.timeStyle = [self styleFrom:timeFormatStyle];

      return [dateFormatter stringFromDate:[self dateFrom:date]];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeDateI18nSpecJSI>(params);
}

@end
