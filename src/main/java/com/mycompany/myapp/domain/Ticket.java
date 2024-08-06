package com.mycompany.myapp.domain;

import com.mycompany.myapp.domain.enumeration.StatusTicket;
import com.mycompany.myapp.domain.enumeration.channel;
import com.mycompany.myapp.domain.enumeration.classification;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Ticket.
 */
@Document(collection = "ticket")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Ticket implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("contact_name")
    private String contact_name;

    @NotNull(message = "must not be null")
    @Field("account_name")
    private String account_name;

    @NotNull(message = "must not be null")
    @Field("email")
    private String email;

    @NotNull(message = "must not be null")
    @Field("phone")
    private Long phone;

    @NotNull(message = "must not be null")
    @Field("subject")
    private String subject;

    @NotNull(message = "must not be null")
    @Field("description")
    private String description;

    @NotNull(message = "must not be null")
    @Field("status")
    private StatusTicket status;

    @Field("product_name")
    private String product_name;

    @NotNull(message = "must not be null")
    @Field("due_date")
    private ZonedDateTime due_date;

    @NotNull(message = "must not be null")
    @Field("language")
    private String language;

    @NotNull(message = "must not be null")
    @Field("channel")
    private channel channel;

    @NotNull(message = "must not be null")
    @Field("classifications")
    private classification classifications;

    @Field("attachments")
    private byte[] attachments;

    @Field("attachments_content_type")
    private String attachmentsContentType;

    @Field("user")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Ticket id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContact_name() {
        return this.contact_name;
    }

    public Ticket contact_name(String contact_name) {
        this.setContact_name(contact_name);
        return this;
    }

    public void setContact_name(String contact_name) {
        this.contact_name = contact_name;
    }

    public String getAccount_name() {
        return this.account_name;
    }

    public Ticket account_name(String account_name) {
        this.setAccount_name(account_name);
        return this;
    }

    public void setAccount_name(String account_name) {
        this.account_name = account_name;
    }

    public String getEmail() {
        return this.email;
    }

    public Ticket email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getPhone() {
        return this.phone;
    }

    public Ticket phone(Long phone) {
        this.setPhone(phone);
        return this;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public String getSubject() {
        return this.subject;
    }

    public Ticket subject(String subject) {
        this.setSubject(subject);
        return this;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return this.description;
    }

    public Ticket description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public StatusTicket getStatus() {
        return this.status;
    }

    public Ticket status(StatusTicket status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(StatusTicket status) {
        this.status = status;
    }

    public String getProduct_name() {
        return this.product_name;
    }

    public Ticket product_name(String product_name) {
        this.setProduct_name(product_name);
        return this;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public ZonedDateTime getDue_date() {
        return this.due_date;
    }

    public Ticket due_date(ZonedDateTime due_date) {
        this.setDue_date(due_date);
        return this;
    }

    public void setDue_date(ZonedDateTime due_date) {
        this.due_date = due_date;
    }

    public String getLanguage() {
        return this.language;
    }

    public Ticket language(String language) {
        this.setLanguage(language);
        return this;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public channel getChannel() {
        return this.channel;
    }

    public Ticket channel(channel channel) {
        this.setChannel(channel);
        return this;
    }

    public void setChannel(channel channel) {
        this.channel = channel;
    }

    public classification getClassifications() {
        return this.classifications;
    }

    public Ticket classifications(classification classifications) {
        this.setClassifications(classifications);
        return this;
    }

    public void setClassifications(classification classifications) {
        this.classifications = classifications;
    }

    public byte[] getAttachments() {
        return this.attachments;
    }

    public Ticket attachments(byte[] attachments) {
        this.setAttachments(attachments);
        return this;
    }

    public void setAttachments(byte[] attachments) {
        this.attachments = attachments;
    }

    public String getAttachmentsContentType() {
        return this.attachmentsContentType;
    }

    public Ticket attachmentsContentType(String attachmentsContentType) {
        this.attachmentsContentType = attachmentsContentType;
        return this;
    }

    public void setAttachmentsContentType(String attachmentsContentType) {
        this.attachmentsContentType = attachmentsContentType;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Ticket user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ticket)) {
            return false;
        }
        return getId() != null && getId().equals(((Ticket) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ticket{" +
            "id=" + getId() +
            ", contact_name='" + getContact_name() + "'" +
            ", account_name='" + getAccount_name() + "'" +
            ", email='" + getEmail() + "'" +
            ", phone=" + getPhone() +
            ", subject='" + getSubject() + "'" +
            ", description='" + getDescription() + "'" +
            ", status='" + getStatus() + "'" +
            ", product_name='" + getProduct_name() + "'" +
            ", due_date='" + getDue_date() + "'" +
            ", language='" + getLanguage() + "'" +
            ", channel='" + getChannel() + "'" +
            ", classifications='" + getClassifications() + "'" +
            ", attachments='" + getAttachments() + "'" +
            ", attachmentsContentType='" + getAttachmentsContentType() + "'" +
            "}";
    }
}
