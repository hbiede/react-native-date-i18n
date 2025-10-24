import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  DateType,
  formatDate,
  formatDateTime,
  formatTime,
  formatAbbreviatedShortDate,
  formatAbbreviatedShortDateRange,
  formatAbbreviatedShortTime,
  formatAbbreviatedShortTimeRange,
} from 'react-native-date-i18n';

export default function App() {
  let testDate = new Date(953276400000);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Full</Text>
        <Text style={styles.date}>{formatDate(testDate, DateType.full)}</Text>
        <Text style={styles.date}>{formatTime(testDate, DateType.full)}</Text>
        <Text style={styles.date}>
          {formatDateTime(testDate, DateType.full, DateType.full)}
        </Text>
        <Text style={styles.title}>Long</Text>
        <Text style={styles.date}>{formatDate(testDate, DateType.long)}</Text>
        <Text style={styles.date}>{formatTime(testDate, DateType.long)}</Text>
        <Text style={styles.date}>
          {formatDateTime(testDate, DateType.long, DateType.long)}
        </Text>
        <Text style={styles.title}>Medium</Text>
        <Text style={styles.date}>{formatDate(testDate, DateType.medium)}</Text>
        <Text style={styles.date}>{formatTime(testDate, DateType.medium)}</Text>
        <Text style={styles.date}>
          {formatDateTime(testDate, DateType.medium, DateType.medium)}
        </Text>
        <Text style={styles.title}>Short</Text>
        <Text style={styles.date}>{formatDate(testDate, DateType.short)}</Text>
        <Text style={styles.date}>{formatTime(testDate, DateType.short)}</Text>
        <Text style={styles.date}>
          {formatDateTime(testDate, DateType.short, DateType.short)}
        </Text>
        <Text style={styles.title}>Abbreviated</Text>
        {/* Short date */}
        <Text style={styles.date}>{formatAbbreviatedShortDate(testDate)}</Text>
        {/* Short date range with same year */}
        <Text style={styles.date}>
          {formatAbbreviatedShortDateRange(testDate, new Date(952239600000))}
        </Text>
        {/* Short date range with different years */}
        <Text style={styles.date}>
          {formatAbbreviatedShortDateRange(testDate, new Date(983775600000))}
        </Text>

        {/* Short time */}
        <Text style={styles.date}>{formatAbbreviatedShortTime(testDate)}</Text>
        {/* Short time range, cut both ":00"'s' plus first AM */}
        <Text style={styles.date}>
          {formatAbbreviatedShortTimeRange(testDate, new Date(953290800000))}
        </Text>
        {/* Short time range, cut one ":00"'s' plus first AM */}
        <Text style={styles.date}>
          {formatAbbreviatedShortTimeRange(
            new Date(953278200000),
            new Date(953290800000)
          )}
        </Text>
        {/* Short time range, only cut one AM */}
        <Text style={styles.date}>
          {formatAbbreviatedShortTimeRange(
            new Date(953278200000),
            new Date(953292600000)
          )}
        </Text>
        {/* Short time range */}
        <Text style={styles.date}>
          {formatAbbreviatedShortTimeRange(testDate, new Date(953334000000))}
        </Text>
        {/* Short time range with dates */}
        <Text style={styles.date}>
          {formatAbbreviatedShortTimeRange(testDate, new Date(983775600000))}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  date: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
});
