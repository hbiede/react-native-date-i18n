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
