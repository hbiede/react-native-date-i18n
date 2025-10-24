import DateI18n, { DateType } from './NativeDateI18n';

export { DateType };

export function formatDate(
  date: Date,
  formatStyle: DateType = DateType.long
): string {
  return DateI18n.format(date.getTime(), formatStyle);
}
export function formatTime(
  date: Date,
  formatStyle: DateType = DateType.short
): string {
  return DateI18n.formatTime(date.getTime(), formatStyle);
}
export function formatDateTime(
  date: Date,
  dateFormatStyle: DateType = DateType.long,
  timeFormatStyle: DateType = DateType.short
): string {
  return DateI18n.formatDateTime(
    date.getTime(),
    dateFormatStyle,
    timeFormatStyle
  );
}
export function formatAbbreviatedShortDate(date: Date): string {
  return DateI18n.formatAbbreviatedShortDate(date.getTime());
}
export function formatAbbreviatedShortDateRange(
  date1: Date,
  date2: Date
): string {
  return DateI18n.formatAbbreviatedShortDateRange(
    date1.getTime(),
    date2.getTime()
  );
}
export function formatAbbreviatedShortTime(date: Date): string {
  return DateI18n.formatAbbreviatedShortTime(date.getTime());
}
export function formatAbbreviatedShortTimeRange(
  date1: Date,
  date2: Date
): string {
  return DateI18n.formatAbbreviatedShortTimeRange(
    date1.getTime(),
    date2.getTime()
  );
}
