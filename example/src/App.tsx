import { StyleSheet, Text, View } from 'react-native';
import { formatDate, formatTime, formatDateTime } from 'react-native-date-i18n';
import { DateType } from '../../src/NativeDateI18n';

export default function App() {
  let testDate = new Date(953276400000);

  return (
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
    </View>
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
