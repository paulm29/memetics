package au.com.memetics.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateUtils {
    private static final DateTimeFormatter formatTimestamp = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss.S");
    private static final DateTimeFormatter formatDate = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public static Date getTimestamp(String dateString) {
        return java.sql.Date.valueOf(LocalDate.parse(dateString, formatTimestamp));
    }

    public static Date getDate(LocalDate localDate) {
        return java.sql.Date.valueOf(localDate);
    }

    public static Date getDate(String dateString) {
        return java.sql.Date.valueOf(LocalDate.parse(dateString, formatDate));
    }

    public static String getDateString(LocalDate date) {
        return date.format(formatDate);
    }

    public static String getDateString(Date date) {
        LocalDate localDate = new java.sql.Date(date.getTime()).toLocalDate();
        return localDate.format(formatDate);
    }
}
