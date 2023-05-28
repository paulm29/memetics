package au.com.memetics.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.social.security.SocialUserDetails;
import org.springframework.social.security.SocialUserDetailsService;

import lombok.extern.slf4j.Slf4j;

/**
 * This class delegates requests forward to our UserDetailsService implementation.
 * This is possible because we use the username of the user as the account ID.
 */
@Slf4j
public class SocialUserDetailsServiceImpl implements SocialUserDetailsService {
    private final UserDetailsService userDetailsService;

    @Autowired
    public SocialUserDetailsServiceImpl(final UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    /**
     * Loads the username by using the account ID of the user.
     * @param userId    The account ID of the requested user.
     * @return  The information of the requested user.
     * @throws UsernameNotFoundException    Thrown if no user is found.
     * @throws DataAccessException
     */
    @Override
    public SocialUserDetails loadUserByUserId(final String userId) throws UsernameNotFoundException, DataAccessException {
        UserDetails userDetails = userDetailsService.loadUserByUsername(userId);
        return (SocialUserDetails) userDetails;
    }
}
