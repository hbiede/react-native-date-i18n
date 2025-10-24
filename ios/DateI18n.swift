import Foundation

extension DateFormatter.Style {
  init(enumName: String) {
    switch enumName.lowercased() {
    case "short":
      self = .short
    case "medium":
      self = .medium
    case "long":
      self = .long
    case "full":
      self = .full
    default:
      self = .none
    }
  }
}

@objc(DateI18nImplementation)
@objcMembers
public class DateI18nImplementation: NSObject {
  static func dateFrom(_ secondsSince1970: Double) -> Date {
    Date(timeIntervalSince1970: secondsSince1970 / 1000)
  }

  public static func format(_ date: Double, with formatString: String) -> String {
    let dateFormatter = DateFormatter()
    dateFormatter.dateStyle = .init(enumName: formatString)
    dateFormatter.timeStyle = .none

    return dateFormatter.string(from: self.dateFrom(date))
  }

  public static func formatTime(_ date: Double, with formatString: String) -> String {
    let dateFormatter = DateFormatter()
    dateFormatter.timeStyle = .init(enumName: formatString)
    dateFormatter.dateStyle = .none

    return dateFormatter.string(from: self.dateFrom(date))
  }

  public static func formatDateTime(_ date: Double, with dateFormatStyle: String, and timeFormatStyle: String) -> String {
    let dateFormatter = DateFormatter()
    dateFormatter.dateStyle = .init(enumName: dateFormatStyle)
    dateFormatter.timeStyle = .init(enumName: timeFormatStyle)

    return dateFormatter.string(from: self.dateFrom(date))
  }

  public static func formatAbbreviatedShortDate(_ date: Double) -> String {
    self.dateFrom(date).formatted(Date.FormatStyle().month(.defaultDigits).day(.defaultDigits))
  }

  public static func formatAbbreviatedShortDateRange(from date1: Double, to date2: Double) -> String {
    let a = self.dateFrom(min(date1, date2))
    let b = self.dateFrom(max(date1, date2))

    let format = Date.FormatStyle().month(.defaultDigits).day(.defaultDigits)
    var dateStringA = a.formatted(format)

    if a.formatted(Date.FormatStyle().year(.extended())) == b.formatted(Date.FormatStyle().year(.extended())) {
      // Do nothing unless the days are the same
      if dateStringA == b.formatted(format) { return dateStringA }
    } else {
      dateStringA = a.formatted(format.year(.twoDigits))
    }

    let dateStringB = b.formatted(format.year(.twoDigits))

    return "\(dateStringA) – \(dateStringB)"
  }

  public static func formatAbbreviatedShortTime(_ date: Double) -> String {
    self.dateFrom(date).formatted(Date.FormatStyle().hour(.defaultDigits(amPM: .omitted)).minute(.defaultDigits))
  }

  public static func formatAbbreviatedShortTimeRange(from date1: Double, to date2: Double) -> String {
    let a = self.dateFrom(min(date1, date2))
    let b = self.dateFrom(max(date1, date2))

    let testFormat = Date.FormatStyle().year().month().day()
    if a.formatted(testFormat) != b.formatted(testFormat) {
      return (a..<b).formatted(
        Date.IntervalFormatStyle().year().hour(.conversationalDefaultDigits(amPM: .abbreviated)).minute()
      )
    }

    let timeStringA = {
      let hourA = a.formatted(Date.FormatStyle().hour(.twoDigits(amPM: .abbreviated)))
      let hourB = b.formatted(Date.FormatStyle().hour(.twoDigits(amPM: .abbreviated)))

      guard (hourA.lowercased().contains("a") && hourB.lowercased().contains("a")) || (hourA.lowercased().contains("p") && hourB.lowercased().contains("p")) else {
        // Different day-period
        return a.formatted(Date.FormatStyle().hour(.defaultDigits(amPM: .narrow)).minute(.twoDigits))
      }

      // Same day-period
      if Int(a.formatted(Date.FormatStyle().minute())) == .zero {
        // Trim to only the hour when minutes on dateA are zero and day-periods match
        return a.formatted(Date.FormatStyle().hour(.twoDigits(amPM: .omitted)))
      } else {
        return a.formatted(Date.FormatStyle().hour(.defaultDigits(amPM: .omitted)).minute(.twoDigits))
      }
    }()

    let timeStringB = Int(b.formatted(Date.FormatStyle().minute())) == .zero
        ? b.formatted(Date.FormatStyle().hour(.defaultDigits(amPM: .narrow)))
        : b.formatted(Date.FormatStyle().hour(.defaultDigits(amPM: .narrow)).minute(.twoDigits))

    return "\(timeStringA) – \(timeStringB)"
  }
}
