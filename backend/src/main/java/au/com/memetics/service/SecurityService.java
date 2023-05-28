package au.com.memetics.service;

import static au.com.memetics.entity.Role.ROLE_ADMIN;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import au.com.memetics.entity.Profile;

@Service
@Slf4j
public class SecurityService {
    public boolean canAccess(final int profileId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Profile profile = (Profile) authentication.getPrincipal();

        log.info(profile.getId() + " " + profile.getUsername() + " trying to access profile ID: " + profileId);

        return profile.getId() == profileId || profile.getRole() == ROLE_ADMIN;
    }
}
