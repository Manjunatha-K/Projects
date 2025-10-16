package com.stream.app.spring_stream_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "yt_videos")
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long videoId;

    private String title;

    private String description;

    private String contentType;

    private String filePath;

/*    @ManyToOne
    private Courses course;*/
}
