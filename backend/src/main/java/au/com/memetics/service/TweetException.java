package au.com.memetics.service;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class TweetException extends RuntimeException {

    public TweetException(final Exception e) {
        super(e);
    }
}
