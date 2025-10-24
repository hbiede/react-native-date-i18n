#import "DateI18n.h"
#import "DateI18n-Swift.h"

@implementation DateI18n
RCT_EXPORT_MODULE()

- (NSString *)format:(double)date formatStyle:(NSString *)formatStyle {
  return [DateI18nImplementation format:date with:formatStyle];
}

- (NSString *)formatTime:(double)date formatStyle:(NSString *)formatStyle {
  return [DateI18nImplementation formatTime:date with:formatStyle];
}

- (NSString *)formatDateTime:(double)date
    dateFormatStyle:(NSString *)dateFormatStyle
    timeFormatStyle:(NSString *)timeFormatStyle {
  return [DateI18nImplementation formatDateTime:date with:dateFormatStyle and:timeFormatStyle];
}

- (NSString *)formatAbbreviatedShortDate:(double)date {
  return [DateI18nImplementation formatAbbreviatedShortDate:date];
}

- (NSString *)formatAbbreviatedShortDateRange:(double)date1
                                        date2:(double)date2 {
  return [DateI18nImplementation formatAbbreviatedShortDateRangeFrom:date1 to:date2];
}

- (NSString *)formatAbbreviatedShortTime:(double)date {
  return [DateI18nImplementation formatAbbreviatedShortTime:date];
}

- (NSString *)formatAbbreviatedShortTimeRange:(double)date1
                                        date2:(double)date2 {
  return [DateI18nImplementation formatAbbreviatedShortTimeRangeFrom:date1 to:date2];
}


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeDateI18nSpecJSI>(params);
}

@end
