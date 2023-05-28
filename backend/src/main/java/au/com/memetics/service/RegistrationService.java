package au.com.memetics.service;

import au.com.memetics.controller.formsignin.DuplicateEmailException;
import au.com.memetics.controller.formsignin.Registration;
import au.com.memetics.dao.UserRepository;
import au.com.memetics.entity.Profile;
import au.com.memetics.mapping.ProfileMapper;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
@Slf4j
public class RegistrationService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Autowired
    public RegistrationService(final PasswordEncoder passwordEncoder, final UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Transactional
    public Profile createProfile(@Valid final Registration registration) throws DuplicateEmailException {
        if (!Objects.isNull(userRepository.findByEmail(registration.getEmail()))) {
            throw new DuplicateEmailException("The email address: " + registration.getEmail() + " is already in use.");
        }

        Profile profile = ProfileMapper.INSTANCE.fromRegistration(registration);
        profile.setPassword(encodePassword(registration));
        if (registration.isSocialMediaSignin()) {
            profile.setSocialMediaSignin(registration.getSocialMediaSignin());
        }

        return userRepository.save(profile);
    }

    private String encodePassword(final Registration registration) {
        String encodedPassword = null;
        if (!registration.isSocialMediaSignin()) {
            encodedPassword = passwordEncoder.encode(registration.getPassword());
        }

        return encodedPassword;
    }
}
