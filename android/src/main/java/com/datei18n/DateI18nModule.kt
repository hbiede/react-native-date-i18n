package com.datei18n

import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle
import java.time.Instant
import java.time.ZoneId
import java.time.ZonedDateTime

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

  companion object {
    const val NAME = "DateI18n"
  }
}
