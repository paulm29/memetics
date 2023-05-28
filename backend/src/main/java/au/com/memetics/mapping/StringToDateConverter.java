package au.com.memetics.mapping;

import jakarta.persistence.metamodel.Type;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;


@Component
public class StringToDateConverter {
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public Date convertTo(String s, Type<Date> type) {
        if (s == null) {
            return null;
        }

        try {
            return java.sql.Date.valueOf(LocalDate.parse(s, formatter));
        } catch (DateTimeParseException e) {
            return null;
        }
    }

    public String convertFrom(Date date, Type<String> type) {
        if (date == null) {
            return null;
        }
        return formatter.format(new java.sql.Date(date.getTime()).toLocalDate());
    }
}
