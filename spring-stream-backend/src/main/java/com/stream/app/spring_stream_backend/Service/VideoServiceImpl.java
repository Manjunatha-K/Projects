package com.stream.app.spring_stream_backend.Service;

import com.stream.app.spring_stream_backend.model.Video;
import com.stream.app.spring_stream_backend.repo.VideoRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class VideoServiceImpl implements VideoService {
    @Value("${files.video}")
    String DIR;

    @Autowired
    private VideoRepository videoRepository;

    @PostConstruct
    public void init() {
        File file = new File(DIR);
        if (!file.exists()) {
            file.mkdir();
            System.out.println("Folder created");
        } else {
            System.out.println("folder already exists");
        }
    }

    @Override
    public Video get(String videoId) {
        return null;
    }

    @Override
    public Video save(Video video, MultipartFile file) {

        try {
            String filename = file.getOriginalFilename();

            String contentType = file.getContentType();

            InputStream inputStream = file.getInputStream();

            //folder path : create

            String cleanFileName = StringUtils.cleanPath(filename);

            //folder path with filename
            String cleanFolder = StringUtils.cleanPath(DIR);
            //file path
            Path path = Paths.get(cleanFolder, cleanFileName);
            System.out.println(path);

            //copy file to folder
            Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);

            //video metadata
            video.setContentType(contentType);
            video.setFilePath(path.toString());

            return videoRepository.save(video);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Video getByTitle(String title) {
        return null;
    }

    @Override
    public List<Video> getAll() {
        return List.of();
    }
}
