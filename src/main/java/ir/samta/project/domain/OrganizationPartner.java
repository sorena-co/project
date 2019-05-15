package ir.samta.project.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A OrganizationPartner.
 */
@Entity
@Table(name = "organization_partner")
@Document(indexName = "organizationpartner")
public class OrganizationPartner implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_organization")
    private String organization;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("organizationPartners")
    private Documents document;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrganization() {
        return organization;
    }

    public OrganizationPartner organization(String organization) {
        this.organization = organization;
        return this;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getType() {
        return type;
    }

    public OrganizationPartner type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public OrganizationPartner name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Documents getDocument() {
        return document;
    }

    public OrganizationPartner document(Documents document) {
        this.document = document;
        return this;
    }

    public void setDocument(Documents document) {
        this.document = document;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        OrganizationPartner organizationPartner = (OrganizationPartner) o;
        if (organizationPartner.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), organizationPartner.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrganizationPartner{" +
            "id=" + getId() +
            ", organization='" + getOrganization() + "'" +
            ", type='" + getType() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
