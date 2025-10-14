package com.stream.app.spring_stream_backend.Service;

import com.stream.app.spring_stream_backend.model.Video;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface VideoService {

    Video get(String videoId);

    Video save(Video video, MultipartFile file);

    Video getByTitle(String title);

    List<Video> getAll();
}
