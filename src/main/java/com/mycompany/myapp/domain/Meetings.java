package com.mycompany.myapp.domain;

import com.mycompany.myapp.domain.enumeration.location;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Meetings.
 */
@Document(collection = "meetings")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Meetings implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("title")
    private String title;

    @NotNull(message = "must not be null")
    @Field("location")
    private location location;

    @Field("location_offline_detail")
    private String location_Offline_Detail;

    @NotNull(message = "must not be null")
    @Field("from")
    private ZonedDateTime from;

    @NotNull(message = "must not be null")
    @Field("to")
    private ZonedDateTime to;

    @Field("user")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Meetings id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Meetings title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public location getLocation() {
        return this.location;
    }

    public Meetings location(location location) {
        this.setLocation(location);
        return this;
    }

    public void setLocation(location location) {
        this.location = location;
    }

    public String getLocation_Offline_Detail() {
        return this.location_Offline_Detail;
    }

    public Meetings location_Offline_Detail(String location_Offline_Detail) {
        this.setLocation_Offline_Detail(location_Offline_Detail);
        return this;
    }

    public void setLocation_Offline_Detail(String location_Offline_Detail) {
        this.location_Offline_Detail = location_Offline_Detail;
    }

    public ZonedDateTime getFrom() {
        return this.from;
    }

    public Meetings from(ZonedDateTime from) {
        this.setFrom(from);
        return this;
    }

    public void setFrom(ZonedDateTime from) {
        this.from = from;
    }

    public ZonedDateTime getTo() {
        return this.to;
    }

    public Meetings to(ZonedDateTime to) {
        this.setTo(to);
        return this;
    }

    public void setTo(ZonedDateTime to) {
        this.to = to;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Meetings user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Meetings)) {
            return false;
        }
        return getId() != null && getId().equals(((Meetings) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Meetings{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", location='" + getLocation() + "'" +
            ", location_Offline_Detail='" + getLocation_Offline_Detail() + "'" +
            ", from='" + getFrom() + "'" +
            ", to='" + getTo() + "'" +
            "}";
    }
}
