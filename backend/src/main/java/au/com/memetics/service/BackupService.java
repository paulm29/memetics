package au.com.memetics.service;


import java.awt.image.BufferedImage;
import java.io.File;
import java.net.URL;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import au.com.memetics.entity.BackupResult;

@Service
@Slf4j
public class BackupService {
    private final MemeService memeService;
    private static String DIRECTORY = "c:/_backup/";
    private static long SLEEP = 500;

    public BackupService(MemeService memeService) {
        this.memeService = memeService;
    }

    public BackupResult backupImages()  {
        List<String> imageUrls = memeService.getImageUrls();
        imageUrls.forEach(this::download);
        log.info("Finished backup.");
        return new BackupResult();
    }

    private void download(String urlString) {
        try {
            Thread.sleep(SLEEP);
        } catch (InterruptedException e) {
            log.error(e.getMessage(), e);
            throw new DownloadException(e);
        }

        String filename = urlString.substring(urlString.lastIndexOf("/") + 1); // http://i.imgur.com/0PUqyW2.png
        String extension = filename.substring(filename.indexOf(".") + 1, filename.length());

        try {
            File file = new File(DIRECTORY + filename);
            if (file.exists()) {
                log.info("File exists, skipping: " + file.getAbsolutePath());
            } else {
                URL url = new URL(urlString);
                BufferedImage image = ImageIO.read(url);
                ImageIO.write(image, extension, new File(DIRECTORY + filename));
                log.info("Downloaded: " + file.getAbsolutePath());
            }
        } catch (Exception e) {
            log.error("Could not download: " + filename);
            log.error(e.getMessage(), e);
        }
    }
}
