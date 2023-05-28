package au.com.memetics.resource.converter;

import au.com.memetics.dto.MemeExportDTO;
import au.com.memetics.entity.CsvExport;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import org.apache.commons.lang3.NotImplementedException;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.AbstractGenericHttpMessageConverter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;

import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.charset.Charset;

//@Component
public class CsvExportMessageConverter extends AbstractGenericHttpMessageConverter<CsvExport> {
    public static final MediaType MEDIA_TYPE = new MediaType("text", "csv", Charset.forName("UTF-8"));

    public CsvExportMessageConverter() {
        super(MEDIA_TYPE);
    }

    protected boolean supports(final Class<?> clazz) {
        return CsvExport.class.equals(clazz);
    }

    @Override
    protected CsvExport readInternal(final Class<? extends CsvExport> clazz, final HttpInputMessage inputMessage) throws IOException, HttpMessageNotReadableException {
        throw new NotImplementedException("not implemented");
    }

    @Override
    public boolean canWrite(final Type type, final Class<?> clazz, final MediaType mediaType) {
        return true;
    }

    @Override
    public CsvExport read(final Type type, final Class<?> contextClass, final HttpInputMessage inputMessage) throws IOException, HttpMessageNotReadableException {
        throw new NotImplementedException("not implemented");
    }

    @Override
    protected void writeInternal(final CsvExport csvExport, final Type type, final HttpOutputMessage outputMessage) throws IOException, HttpMessageNotWritableException {
        outputMessage.getHeaders().setContentType(MEDIA_TYPE);
        outputMessage.getHeaders().set("Content-Disposition", "attachment; filename=\"" + csvExport.getFilename() + "\"");
        CsvMapper csvMapper = new CsvMapper();
        CsvSchema schema = csvMapper.schemaFor(MemeExportDTO.class).withHeader();
        ObjectWriter writer = csvMapper.writer(schema);
        writer.writeValue(outputMessage.getBody(), csvExport.getExports());
        outputMessage.getBody().flush();
    }
}
