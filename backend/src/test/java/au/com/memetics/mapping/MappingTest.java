package au.com.memetics.mapping;


import static org.junit.Assert.assertEquals;

import au.com.memetics.controller.formsignin.Registration;
import au.com.memetics.dto.MemeExportDTO;
import au.com.memetics.entity.Meme;
import au.com.memetics.entity.Profile;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import au.com.memetics.AbstractTest;

public class MappingTest extends AbstractTest {
    @Autowired
    private OldMapper oldMapper;

    @Test
    public void shouldMapMemeToMemeExport() {
        Profile profile = new Profile();
        profile.setNickname("nickname");
        Meme meme = new Meme();
        meme.setProfile(profile);

        MemeExportDTO memeExport = oldMapper.map(meme, MemeExportDTO.class);

        assertEquals(meme.getId(), memeExport.getId());
        assertEquals(meme.getProfile().getNickname(), memeExport.getNickname());
    }

    @Test
    public void shouldMapRegistrationToProfile() {
        Registration registration = new Registration();
        registration.setNickname("nickname");

        Profile profile = oldMapper.map(registration, Profile.class);

        assertEquals(registration.getNickname(), profile.getNickname());
    }
}
