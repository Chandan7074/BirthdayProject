package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String guestName;
    private String dream;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    private String rating;
    private String selectedSong; // Store chosen Kannada audio track
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Feedback() {}

    public Feedback(String guestName, String dream, String feedback, String rating, String selectedSong) {
        this.guestName = guestName;
        this.dream = dream;
        this.feedback = feedback;
        this.rating = rating;
        this.selectedSong = selectedSong;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }
    public String getDream() { return dream; }
    public void setDream(String dream) { this.dream = dream; }
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
    public String getRating() { return rating; }
    public void setRating(String rating) { this.rating = rating; }
    public String getSelectedSong() { return selectedSong; }
    public void setSelectedSong(String selectedSong) { this.selectedSong = selectedSong; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}