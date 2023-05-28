package au.com.memetics.dao;

import au.com.memetics.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import au.com.memetics.entity.Profile;

// doesn't work when I try to extend interface with ProfileDaoCustom
@Repository
public interface UserRepository extends JpaRepository<Profile, Long> {
    Profile findByEmail(String email);
    Profile findByNickname(String nickname);
}
