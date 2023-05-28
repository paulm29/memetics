package au.com.memetics.service;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.jupiter.api.condition.EnabledOnOs;
import org.springframework.beans.factory.annotation.Autowired;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.junit.jupiter.api.condition.OS.WINDOWS;


public class TweetDownloadServiceTest {
    @Autowired
    private TweetDownloadService service;

    @Ignore
    @Test
    @EnabledOnOs({WINDOWS})
    public void shouldReadAndWriteImage() throws Exception {
        FileInputStream fis = new FileInputStream("./src/test/resources/imgur/uploadme.jpg");
        String fileString = "./src/test/resources/imgur/uploadme_" + Math.random() + ".jpg";

        service.readAndWriteImage(fis, fileString);

        assertThat(Files.exists(Paths.get(fileString)), is(true));

        Files.delete(Paths.get(fileString));
    }

    @Ignore
    @Test
    public void shouldReadAndWriteImageFromUrl() throws Exception {
        URL url = new URL("https://i.imgur.com/dgs0kUP.jpg");
        BufferedImage img = ImageIO.read(url);

        String fileString = "./src/test/resources/imgur/image" + Math.random() + ".jpg";

        File file = new File(fileString);
        ImageIO.write(img, "jpg", file);

        assertThat(Files.exists(Paths.get(fileString)), is(true));
    }

}
