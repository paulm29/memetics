package au.com.memetics.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.sql.Time;
import java.time.LocalTime;

// Converter to persist LocalDate and LocalDateTime with
// https://www.thoughts-on-java.org/persist-localdate-localdatetime-jpa/
@Converter(autoApply = true)
public class LocalTimeAttributeConverter implements AttributeConverter<LocalTime, Time> {

    @Override
    public Time convertToDatabaseColumn(LocalTime localTime) {
        return (localTime == null ? null : Time.valueOf(localTime));
    }

    @SuppressWarnings("deprecation")
    @Override
    public LocalTime convertToEntityAttribute(Time time) {
        return (time == null ? null : LocalTime.of(time.getHours(), time.getMinutes()));
    }
}
