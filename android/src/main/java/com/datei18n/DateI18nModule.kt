package com.datei18n

import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle
import java.time.Instant
import java.time.ZoneId
import java.time.ZonedDateTime

import kotlin.math.max
import kotlin.math.min

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = DateI18nModule.NAME)
class DateI18nModule(reactContext: ReactApplicationContext) :
  NativeDateI18nSpec(reactContext) {

  private fun zonedDateTime(millisecondsSince1970: Double): ZonedDateTime {
    return ZonedDateTime.ofInstant(
      Instant.ofEpochMilli(millisecondsSince1970.toLong()),
      ZoneId.of("UTC")
    )
    .withZoneSameInstant(ZoneId.systemDefault())
  }

  private fun formatStyle(style: String?): FormatStyle {
    return when (style) {
      "medium" -> FormatStyle.MEDIUM
      "long" -> FormatStyle.LONG
      "full" -> FormatStyle.FULL
      else -> FormatStyle.SHORT
    }
  }

  override fun getName(): String {
    return NAME
  }

  override fun format(date: Double, formatStyle: String?): String {
    if (formatStyle == null || "none".equals(formatStyle)) {
      return ""
    }

    return DateTimeFormatter.ofLocalizedDate(formatStyle(formatStyle)).format(
      zonedDateTime(date)
    )
  }

  override fun formatTime(date: Double, formatStyle: String?): String {
    if (formatStyle == null || "none".equals(formatStyle)) {
      return ""
    }

    return DateTimeFormatter.ofLocalizedTime(formatStyle(formatStyle)).format(
      zonedDateTime(date)
    )
  }

  override fun formatDateTime(date: Double, dateFormatStyle: String?, timeFormatStyle: String?): String {
    if ((dateFormatStyle == null || "none".equals(dateFormatStyle)) && (timeFormatStyle == null || "none".equals(timeFormatStyle))) {
      return ""
    }

    return DateTimeFormatter.ofLocalizedDateTime(formatStyle(dateFormatStyle), formatStyle(timeFormatStyle)).format(
      zonedDateTime(date)
    )
  }

  override fun formatAbbreviatedShortDate(date: Double): String {
    val dateObj = zonedDateTime(date).withYear(1234)

    return DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT)
      .format(dateObj)
      .replace("[^\\d]?(?:12)?34[^\\d]?".toRegex(), "") // Replace false year to trim year and characters
  }

  override fun formatAbbreviatedShortDateRange(date1: Double, date2: Double): String {
    val a = zonedDateTime(min(date1, date2))
    val b = zonedDateTime(max(date1, date2))

    val dateStringB = DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT).format(b)
    if (a.getYear() == b.getYear()) {
      if (a.getMonth() == b.getMonth() && a.getDayOfMonth() == b.getDayOfMonth()) {
        return dateStringB
      }

      val dateStringA = formatAbbreviatedShortDate(min(date1, date2))
      return "$dateStringA – $dateStringB"
    } else {
      val dateStringA = DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT).format(a)
      return "$dateStringA – $dateStringB"
    }
  }

  override fun formatAbbreviatedShortTime(date: Double): String {
    return formatTime(date, "short")
      .replace(".*?(\\d{1,2}:\\d{1,2}).*".toRegex(), "$1")
  }

  override fun formatAbbreviatedShortTimeRange(date1: Double, date2: Double): String {
    val a = zonedDateTime(min(date1, date2))
    val b = zonedDateTime(max(date1, date2))

    var prefix = ""
    if (a.getYear() != b.getYear() ||
          a.getMonth() != b.getMonth() ||
          a.getDayOfMonth() != b.getDayOfMonth()) {
        return "${formatDateTime(min(date1, date2), "short", "short")} – ${formatDateTime(max(date1, date2), "short", "short")}"
    }

    val timeStringB = formatTime(max(date1, date2), "short").replace(":00", "")
    val timeStringA = {
      val hourA = formatTime(min(date1, date2), "short")

      if ((hourA.contains("a", ignoreCase = true) && timeStringB.lowercase().contains("p", ignoreCase = true)) ||
            (hourA.contains("p", ignoreCase = true) && timeStringB.contains("a", ignoreCase = true))) {
        // Different day-period
        hourA
      } else {
        hourA.replace(".*?(\\d{1,2}:\\d{1,2}).*".toRegex(), "$1")
      }
    }().replace(":00", "")

    return "$timeStringA – $timeStringB"
  }

  companion object {
    const val NAME = "DateI18n"
  }
}
