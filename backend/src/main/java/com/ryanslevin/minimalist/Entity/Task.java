package com.ryanslevin.minimalist.Entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Column(name = "id")
    private int id;

    @NotNull
    @Column(name = "user_id")
    private String userId;

    @NotNull
    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "is_complete")
    private Boolean isComplete;

    @Column(name = "created_datetime")
    private Date createdDateTime;

    @Column(name = "complete_by_date")
    private Date completeByDate;

    public Task() {

    }

    public Task(int id, String userId, String description, Boolean isComplete, Date createdDateTime, Date completeByDate) {
        this.id = id;
        this.userId = userId;
        this.description = description;
        this.isComplete = isComplete;
        this.createdDateTime = createdDateTime;
        this.completeByDate = completeByDate;
    }

    public int getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getIsComplete() {
        return isComplete;
    }

    public void setIsComplete(Boolean isComplete) {
        this.isComplete = isComplete;
    }

    public Date getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(Date createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public Date getCompleteByDate() {
        return completeByDate;
    }

    public void setCompleteByDate(Date completeByDate) {
        this.completeByDate = completeByDate;
    }


    @Override
    public String toString() {
        return "Task [completeByDate=" + completeByDate + ", createdDateTime=" + createdDateTime + ", description="
                + description + ", id=" + id + ", isComplete=" + isComplete + ", userId=" + userId
                + "]";
    }


    
}