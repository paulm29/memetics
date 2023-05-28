package com.github.imgur;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import com.github.commons.Response;

@Getter
@Setter
@ToString
public abstract class AbstractResponse implements Response {
    private String raw;

    @Override
    public void setRawResponse(final String rawResponse) {
        this.raw = rawResponse;
    }
}
