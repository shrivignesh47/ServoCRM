package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Event.
 */
@Document(collection = "event")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("event_name")
    private String event_name;

    @NotNull(message = "must not be null")
    @Field("event_date")
    private LocalDate event_date;

    @Field("registrations")
    private Integer registrations;

    @Field("attendance")
    @JsonIgnoreProperties(value = { "event" }, allowSetters = true)
    private Set<Attendance> attendances = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Event id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEvent_name() {
        return this.event_name;
    }

    public Event event_name(String event_name) {
        this.setEvent_name(event_name);
        return this;
    }

    public void setEvent_name(String event_name) {
        this.event_name = event_name;
    }

    public LocalDate getEvent_date() {
        return this.event_date;
    }

    public Event event_date(LocalDate event_date) {
        this.setEvent_date(event_date);
        return this;
    }

    public void setEvent_date(LocalDate event_date) {
        this.event_date = event_date;
    }

    public Integer getRegistrations() {
        return this.registrations;
    }

    public Event registrations(Integer registrations) {
        this.setRegistrations(registrations);
        return this;
    }

    public void setRegistrations(Integer registrations) {
        this.registrations = registrations;
    }

    public Set<Attendance> getAttendances() {
        return this.attendances;
    }

    public void setAttendances(Set<Attendance> attendances) {
        if (this.attendances != null) {
            this.attendances.forEach(i -> i.setEvent(null));
        }
        if (attendances != null) {
            attendances.forEach(i -> i.setEvent(this));
        }
        this.attendances = attendances;
    }

    public Event attendances(Set<Attendance> attendances) {
        this.setAttendances(attendances);
        return this;
    }

    public Event addAttendance(Attendance attendance) {
        this.attendances.add(attendance);
        attendance.setEvent(this);
        return this;
    }

    public Event removeAttendance(Attendance attendance) {
        this.attendances.remove(attendance);
        attendance.setEvent(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Event)) {
            return false;
        }
        return getId() != null && getId().equals(((Event) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Event{" +
            "id=" + getId() +
            ", event_name='" + getEvent_name() + "'" +
            ", event_date='" + getEvent_date() + "'" +
            ", registrations=" + getRegistrations() +
            "}";
    }
}
