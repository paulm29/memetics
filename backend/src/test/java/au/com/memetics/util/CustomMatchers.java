package au.com.memetics.util;

import org.hamcrest.Matcher;

import static org.hamcrest.Matchers.hasProperty;
import static org.hamcrest.Matchers.is;

public class CustomMatchers {
    public static Matcher<Object> withId(long id) {
        return hasProperty("id", is(id));
    }

    public static Matcher<Object> withId(int id) {
        return hasProperty("id", is(id));
    }

    public static Matcher<Object> withId(String id) {
        return hasProperty("id", is(id));
    }
}
