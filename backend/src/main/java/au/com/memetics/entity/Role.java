package au.com.memetics.entity;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "Role")
public enum Role {
    ROLE_USER, ROLE_ADMIN
}
