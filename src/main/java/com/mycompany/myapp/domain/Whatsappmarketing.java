package com.mycompany.myapp.domain;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Whatsappmarketing.
 */
@Document(collection = "whatsappmarketing")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Whatsappmarketing implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("name")
    private String name;

    @NotNull(message = "must not be null")
    @Field("status")
    private String status;

    @NotNull(message = "must not be null")
    @Field("created_on")
    private Instant created_On;

    @Field("created_by")
    private String created_by;

    @Field("recipents")
    private Long recipents;

    @Field("report")
    private String report;

    @Field("action")
    private String action;

    @Field("user")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Whatsappmarketing id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Whatsappmarketing name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return this.status;
    }

    public Whatsappmarketing status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCreated_On() {
        return this.created_On;
    }

    public Whatsappmarketing created_On(Instant created_On) {
        this.setCreated_On(created_On);
        return this;
    }

    public void setCreated_On(Instant created_On) {
        this.created_On = created_On;
    }

    public String getCreated_by() {
        return this.created_by;
    }

    public Whatsappmarketing created_by(String created_by) {
        this.setCreated_by(created_by);
        return this;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }

    public Long getRecipents() {
        return this.recipents;
    }

    public Whatsappmarketing recipents(Long recipents) {
        this.setRecipents(recipents);
        return this;
    }

    public void setRecipents(Long recipents) {
        this.recipents = recipents;
    }

    public String getReport() {
        return this.report;
    }

    public Whatsappmarketing report(String report) {
        this.setReport(report);
        return this;
    }

    public void setReport(String report) {
        this.report = report;
    }

    public String getAction() {
        return this.action;
    }

    public Whatsappmarketing action(String action) {
        this.setAction(action);
        return this;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Whatsappmarketing user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Whatsappmarketing)) {
            return false;
        }
        return getId() != null && getId().equals(((Whatsappmarketing) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Whatsappmarketing{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            ", created_On='" + getCreated_On() + "'" +
            ", created_by='" + getCreated_by() + "'" +
            ", recipents=" + getRecipents() +
            ", report='" + getReport() + "'" +
            ", action='" + getAction() + "'" +
            "}";
    }
}
