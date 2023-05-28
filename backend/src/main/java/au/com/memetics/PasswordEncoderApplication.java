package au.com.memetics;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.NoArgsConstructor;

/*
 *  Utility for generating passwords
 */
@NoArgsConstructor
public class PasswordEncoderApplication {

    public static void main(final String[] args) {
        System.out.println(encode("user"));
        System.out.println(encode("admin"));
    }

    private static String encode(final String username) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String password = bCryptPasswordEncoder.encode(username);

        return password;
    }
}
