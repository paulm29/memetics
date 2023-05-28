package au.com.memetics.mapping;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.hamcrest.MatcherAssert.assertThat;

import java.util.Date;

import ma.glasnost.orika.MappingContext;
import org.junit.Before;
import org.junit.Test;

public class StringToDateConverterTest {
    private StringToDateConverter converter;
    private MappingContext mappingContext = null;

    @Before
    public void setUp() throws Exception {
        converter = new StringToDateConverter();
    }

    @Test
    public void shouldGetNullWhenStringNotInDateFomrat() throws Exception {
        assertThat(converter.convertTo(null, null, mappingContext), is(nullValue()));
        assertThat(converter.convertTo("notADate", null, mappingContext), is(nullValue()));
        assertThat(converter.convertTo("31/31/2001", null, mappingContext), is(nullValue()));
    }

    @Test
    public void shouldConvertStringToDate() throws Exception {
        Date date = converter.convertTo("31/12/2017", null, mappingContext);

        assertThat(date.getTime(), is(new Date(2017 - 1900, 11, 31).getTime()));
    }

    @Test
    public void shouldConvertFromString() throws Exception {
        String date = converter.convertFrom(new Date(2017 - 1900, 11, 31), null, mappingContext);

        assertThat(date, is("31/12/2017"));
    }

    @Test
    public void shouldBeNullWhenDateIsNull() throws Exception {
        assertThat(converter.convertFrom(null, null, mappingContext), is(nullValue()));
    }
}