package com.mycompany.myapp.domain;

import com.mycompany.myapp.domain.enumeration.priority;
import com.mycompany.myapp.domain.enumeration.reminder;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Task.
 */
@Document(collection = "task")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("subject")
    private String subject;

    @Field("due_date")
    private ZonedDateTime due_date;

    @NotNull(message = "must not be null")
    @Field("priority")
    private priority priority;

    @NotNull(message = "must not be null")
    @Field("description")
    private String description;

    @NotNull(message = "must not be null")
    @Field("reminder")
    private reminder reminder;

    @Field("user")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Task id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSubject() {
        return this.subject;
    }

    public Task subject(String subject) {
        this.setSubject(subject);
        return this;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public ZonedDateTime getDue_date() {
        return this.due_date;
    }

    public Task due_date(ZonedDateTime due_date) {
        this.setDue_date(due_date);
        return this;
    }

    public void setDue_date(ZonedDateTime due_date) {
        this.due_date = due_date;
    }

    public priority getPriority() {
        return this.priority;
    }

    public Task priority(priority priority) {
        this.setPriority(priority);
        return this;
    }

    public void setPriority(priority priority) {
        this.priority = priority;
    }

    public String getDescription() {
        return this.description;
    }

    public Task description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public reminder getReminder() {
        return this.reminder;
    }

    public Task reminder(reminder reminder) {
        this.setReminder(reminder);
        return this;
    }

    public void setReminder(reminder reminder) {
        this.reminder = reminder;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Task user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Task)) {
            return false;
        }
        return getId() != null && getId().equals(((Task) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", subject='" + getSubject() + "'" +
            ", due_date='" + getDue_date() + "'" +
            ", priority='" + getPriority() + "'" +
            ", description='" + getDescription() + "'" +
            ", reminder='" + getReminder() + "'" +
            "}";
    }
}
