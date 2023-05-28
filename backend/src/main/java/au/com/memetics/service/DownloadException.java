package au.com.memetics.service;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class DownloadException extends RuntimeException {

    public DownloadException(final Exception e) {
        super(e);
    }
}
