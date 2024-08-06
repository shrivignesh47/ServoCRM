package com.mycompany.myapp.domain;

import com.mycompany.myapp.domain.enumeration.h;
import com.mycompany.myapp.domain.enumeration.product_cat;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Product.
 */
@Document(collection = "product")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("product_name")
    private String product_name;

    @Field("product_code")
    private Integer product_code;

    @NotNull(message = "must not be null")
    @Field("product_category")
    private product_cat product_category;

    @NotNull(message = "must not be null")
    @Field("manufacture")
    private String manufacture;

    @NotNull(message = "must not be null")
    @Field("sales_start_date")
    private ZonedDateTime sales_start_date;

    @Field("sales_end_date")
    private h sales_end_date;

    @NotNull(message = "must not be null")
    @Field("sales_ending_date")
    private ZonedDateTime sales_Ending_date;

    @NotNull(message = "must not be null")
    @Field("support_start_date")
    private ZonedDateTime support_start_date;

    @NotNull(message = "must not be null")
    @Field("support_end_date")
    private ZonedDateTime support_end_date;

    @Field("unit_price")
    private Integer unit_price;

    @Field("commission_rate")
    private Float commission_rate;

    @Field("tax")
    private String tax;

    @NotNull(message = "must not be null")
    @Field("description")
    private String description;

    @Field("user")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Product id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProduct_name() {
        return this.product_name;
    }

    public Product product_name(String product_name) {
        this.setProduct_name(product_name);
        return this;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public Integer getProduct_code() {
        return this.product_code;
    }

    public Product product_code(Integer product_code) {
        this.setProduct_code(product_code);
        return this;
    }

    public void setProduct_code(Integer product_code) {
        this.product_code = product_code;
    }

    public product_cat getProduct_category() {
        return this.product_category;
    }

    public Product product_category(product_cat product_category) {
        this.setProduct_category(product_category);
        return this;
    }

    public void setProduct_category(product_cat product_category) {
        this.product_category = product_category;
    }

    public String getManufacture() {
        return this.manufacture;
    }

    public Product manufacture(String manufacture) {
        this.setManufacture(manufacture);
        return this;
    }

    public void setManufacture(String manufacture) {
        this.manufacture = manufacture;
    }

    public ZonedDateTime getSales_start_date() {
        return this.sales_start_date;
    }

    public Product sales_start_date(ZonedDateTime sales_start_date) {
        this.setSales_start_date(sales_start_date);
        return this;
    }

    public void setSales_start_date(ZonedDateTime sales_start_date) {
        this.sales_start_date = sales_start_date;
    }

    public h getSales_end_date() {
        return this.sales_end_date;
    }

    public Product sales_end_date(h sales_end_date) {
        this.setSales_end_date(sales_end_date);
        return this;
    }

    public void setSales_end_date(h sales_end_date) {
        this.sales_end_date = sales_end_date;
    }

    public ZonedDateTime getSales_Ending_date() {
        return this.sales_Ending_date;
    }

    public Product sales_Ending_date(ZonedDateTime sales_Ending_date) {
        this.setSales_Ending_date(sales_Ending_date);
        return this;
    }

    public void setSales_Ending_date(ZonedDateTime sales_Ending_date) {
        this.sales_Ending_date = sales_Ending_date;
    }

    public ZonedDateTime getSupport_start_date() {
        return this.support_start_date;
    }

    public Product support_start_date(ZonedDateTime support_start_date) {
        this.setSupport_start_date(support_start_date);
        return this;
    }

    public void setSupport_start_date(ZonedDateTime support_start_date) {
        this.support_start_date = support_start_date;
    }

    public ZonedDateTime getSupport_end_date() {
        return this.support_end_date;
    }

    public Product support_end_date(ZonedDateTime support_end_date) {
        this.setSupport_end_date(support_end_date);
        return this;
    }

    public void setSupport_end_date(ZonedDateTime support_end_date) {
        this.support_end_date = support_end_date;
    }

    public Integer getUnit_price() {
        return this.unit_price;
    }

    public Product unit_price(Integer unit_price) {
        this.setUnit_price(unit_price);
        return this;
    }

    public void setUnit_price(Integer unit_price) {
        this.unit_price = unit_price;
    }

    public Float getCommission_rate() {
        return this.commission_rate;
    }

    public Product commission_rate(Float commission_rate) {
        this.setCommission_rate(commission_rate);
        return this;
    }

    public void setCommission_rate(Float commission_rate) {
        this.commission_rate = commission_rate;
    }

    public String getTax() {
        return this.tax;
    }

    public Product tax(String tax) {
        this.setTax(tax);
        return this;
    }

    public void setTax(String tax) {
        this.tax = tax;
    }

    public String getDescription() {
        return this.description;
    }

    public Product description(String description) {
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

    public Product user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return getId() != null && getId().equals(((Product) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", product_name='" + getProduct_name() + "'" +
            ", product_code=" + getProduct_code() +
            ", product_category='" + getProduct_category() + "'" +
            ", manufacture='" + getManufacture() + "'" +
            ", sales_start_date='" + getSales_start_date() + "'" +
            ", sales_end_date='" + getSales_end_date() + "'" +
            ", sales_Ending_date='" + getSales_Ending_date() + "'" +
            ", support_start_date='" + getSupport_start_date() + "'" +
            ", support_end_date='" + getSupport_end_date() + "'" +
            ", unit_price=" + getUnit_price() +
            ", commission_rate=" + getCommission_rate() +
            ", tax='" + getTax() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
