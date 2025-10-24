import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

/**
 * Mapping to iOS's {@code DateFormatter.Style} and Android's {@code FormatStyle}.
 * See each platform's respective documentation for exact details on expected output
 *
 * @see https://developer.apple.com/documentation/foundation/dateformatter/style
 * @see https://developer.android.com/reference/java/time/format/FormatStyle
 */
export enum DateType {
  none = 'none',
  /** '3/17/00' */
  short = 'short',
  /** 'Mar 17, 2000' */
  medium = 'medium',
  /** 'March 17, 2000' */
  long = 'long',
  /** 'Friday, March 17, 2000 AD' */
  full = 'full',
}

export interface Spec extends TurboModule {
  format(date: number, formatStyle?: DateType): string;
  formatTime(date: number, formatStyle?: DateType): string;
  formatDateTime(
    date: number,
    dateFormatStyle?: DateType,
    timeFormatStyle?: DateType
  ): string;
  formatAbbreviatedShortDate(date: number): string;
  formatAbbreviatedShortDateRange(date1: number, date2: number): string;
  formatAbbreviatedShortTime(date: number): string;
  formatAbbreviatedShortTimeRange(date1: number, date2: number): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DateI18n');
