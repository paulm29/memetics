package au.com.memetics.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BufferUpdate {
    String text;
    List<String> services;
}
