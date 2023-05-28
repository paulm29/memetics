package au.com.memetics.entity;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "SocialMediaSignin")
public enum SocialMediaSignin {
    FACEBOOK,
    TWITTER,
    NONE
}
