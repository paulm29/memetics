package au.com.memetics.service;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UploadException extends RuntimeException {
    String advice;

    public UploadException(final Exception e, final String advice) {
        super(e);
        this.advice = advice;
    }
}
