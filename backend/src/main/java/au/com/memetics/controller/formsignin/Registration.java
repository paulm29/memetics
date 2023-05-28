package au.com.memetics.controller.formsignin;

import au.com.memetics.entity.SocialMediaSignin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Arrays;

@PasswordsNotEmpty(
        triggerFieldName = "socialMediaSignin",
        passwordFieldName = "password",
        passwordVerificationFieldName = "passwordVerification"
)
@PasswordsNotEqual(
        passwordFieldName = "password",
        passwordVerificationFieldName = "passwordVerification"
)
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Registration {
    public static final String FIELD_NAME_EMAIL = "email";

    @Email
    @NotEmpty
    @Size(max = 50)
    private String email;

    @NotEmpty
    @Size(max = 30)
    private String nickname;

    @NotEmpty
    @Size(max = 30)
    private String country;

    @Size(max = 30)
    private String firstName;

    @Size(max = 30)
    private String lastName;

    @Size(max = 30)
    private String city;

    @Size(max = 30)
    private String state;

    @Size(max = 50)
    private String webSite;

    private String password;
    private String passwordVerification;
    private SocialMediaSignin socialMediaSignin;

    public boolean isSocialMediaSignin() {
        return Arrays.asList(SocialMediaSignin.values()).contains(socialMediaSignin);
    }
}
