package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.Stage;
import com.mycompany.myapp.domain.enumeration.Type;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Deal.
 */
@Document(collection = "deal")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Deal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("amount")
    private Long amount;

    @NotNull(message = "must not be null")
    @Field("deal_name")
    private String deal_name;

    @NotNull(message = "must not be null")
    @Field("closing_date")
    private ZonedDateTime closing_date;

    @NotNull(message = "must not be null")
    @Field("stage")
    private Stage stage;

    @NotNull(message = "must not be null")
    @Field("type")
    private Type type;

    @Field("probability_percentage")
    private Integer probability_Percentage;

    @Field("compaign_source")
    private String compaign_Source;

    @NotNull(message = "must not be null")
    @Field("description")
    private String description;

    @Field("user")
    private User user;

    @Field("accounts")
    @JsonIgnoreProperties(value = { "user", "deals" }, allowSetters = true)
    private Accounts accounts;

    @Field("contacts")
    @JsonIgnoreProperties(value = { "deals" }, allowSetters = true)
    private Contacts contacts;

    @Field("lead")
    @JsonIgnoreProperties(value = { "deals" }, allowSetters = true)
    private Lead lead;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Deal id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getAmount() {
        return this.amount;
    }

    public Deal amount(Long amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getDeal_name() {
        return this.deal_name;
    }

    public Deal deal_name(String deal_name) {
        this.setDeal_name(deal_name);
        return this;
    }

    public void setDeal_name(String deal_name) {
        this.deal_name = deal_name;
    }

    public ZonedDateTime getClosing_date() {
        return this.closing_date;
    }

    public Deal closing_date(ZonedDateTime closing_date) {
        this.setClosing_date(closing_date);
        return this;
    }

    public void setClosing_date(ZonedDateTime closing_date) {
        this.closing_date = closing_date;
    }

    public Stage getStage() {
        return this.stage;
    }

    public Deal stage(Stage stage) {
        this.setStage(stage);
        return this;
    }

    public void setStage(Stage stage) {
        this.stage = stage;
    }

    public Type getType() {
        return this.type;
    }

    public Deal type(Type type) {
        this.setType(type);
        return this;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Integer getProbability_Percentage() {
        return this.probability_Percentage;
    }

    public Deal probability_Percentage(Integer probability_Percentage) {
        this.setProbability_Percentage(probability_Percentage);
        return this;
    }

    public void setProbability_Percentage(Integer probability_Percentage) {
        this.probability_Percentage = probability_Percentage;
    }

    public String getCompaign_Source() {
        return this.compaign_Source;
    }

    public Deal compaign_Source(String compaign_Source) {
        this.setCompaign_Source(compaign_Source);
        return this;
    }

    public void setCompaign_Source(String compaign_Source) {
        this.compaign_Source = compaign_Source;
    }

    public String getDescription() {
        return this.description;
    }

    public Deal description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Deal user(User user) {
        this.setUser(user);
        return this;
    }

    public Accounts getAccounts() {
        return this.accounts;
    }

    public void setAccounts(Accounts accounts) {
        this.accounts = accounts;
    }

    public Deal accounts(Accounts accounts) {
        this.setAccounts(accounts);
        return this;
    }

    public Contacts getContacts() {
        return this.contacts;
    }

    public void setContacts(Contacts contacts) {
        this.contacts = contacts;
    }

    public Deal contacts(Contacts contacts) {
        this.setContacts(contacts);
        return this;
    }

    public Lead getLead() {
        return this.lead;
    }

    public void setLead(Lead lead) {
        this.lead = lead;
    }

    public Deal lead(Lead lead) {
        this.setLead(lead);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Deal)) {
            return false;
        }
        return getId() != null && getId().equals(((Deal) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Deal{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", deal_name='" + getDeal_name() + "'" +
            ", closing_date='" + getClosing_date() + "'" +
            ", stage='" + getStage() + "'" +
            ", type='" + getType() + "'" +
            ", probability_Percentage=" + getProbability_Percentage() +
            ", compaign_Source='" + getCompaign_Source() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
