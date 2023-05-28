package com.github.commons;

import java.util.Map;

public interface Request {
    Map<String, Object> buildParameters();
    boolean isOAuth();
}
