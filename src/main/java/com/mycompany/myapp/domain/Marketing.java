package com.mycompany.myapp.domain;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Marketing.
 */
@Document(collection = "marketing")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Marketing implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("campaign_name")
    private String campaign_name;

    @NotNull(message = "must not be null")
    @Field("start_date")
    private ZonedDateTime start_date;

    @NotNull(message = "must not be null")
    @Field("end_date")
    private ZonedDateTime end_date;

    @NotNull(message = "must not be null")
    @Field("type")
    private String type;

    @NotNull(message = "must not be null")
    @Field("status")
    private String status;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Marketing id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCampaign_name() {
        return this.campaign_name;
    }

    public Marketing campaign_name(String campaign_name) {
        this.setCampaign_name(campaign_name);
        return this;
    }

    public void setCampaign_name(String campaign_name) {
        this.campaign_name = campaign_name;
    }

    public ZonedDateTime getStart_date() {
        return this.start_date;
    }

    public Marketing start_date(ZonedDateTime start_date) {
        this.setStart_date(start_date);
        return this;
    }

    public void setStart_date(ZonedDateTime start_date) {
        this.start_date = start_date;
    }

    public ZonedDateTime getEnd_date() {
        return this.end_date;
    }

    public Marketing end_date(ZonedDateTime end_date) {
        this.setEnd_date(end_date);
        return this;
    }

    public void setEnd_date(ZonedDateTime end_date) {
        this.end_date = end_date;
    }

    public String getType() {
        return this.type;
    }

    public Marketing type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return this.status;
    }

    public Marketing status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Marketing)) {
            return false;
        }
        return getId() != null && getId().equals(((Marketing) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Marketing{" +
            "id=" + getId() +
            ", campaign_name='" + getCampaign_name() + "'" +
            ", start_date='" + getStart_date() + "'" +
            ", end_date='" + getEnd_date() + "'" +
            ", type='" + getType() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
