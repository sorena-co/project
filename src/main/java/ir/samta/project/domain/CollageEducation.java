package ir.samta.project.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;


import java.io.Serializable;
import java.util.Objects;

/**
 * A CollageEducation.
 */
@Entity
@Table(name = "collage_education")
public class CollageEducation implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "last_degree")
    private String lastDegree;

    @Column(name = "program")
    private String program;

    @Column(name = "institution")
    private String institution;

    @Column(name = "country")
    private String country;

    @Column(name = "receive_date_degree")
    private String receiveDateDegree;

    @ManyToOne
    @JsonIgnoreProperties("collageEducations")
    private Documents document;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public CollageEducation fullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getLastDegree() {
        return lastDegree;
    }

    public CollageEducation lastDegree(String lastDegree) {
        this.lastDegree = lastDegree;
        return this;
    }

    public void setLastDegree(String lastDegree) {
        this.lastDegree = lastDegree;
    }

    public String getProgram() {
        return program;
    }

    public CollageEducation program(String program) {
        this.program = program;
        return this;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public String getInstitution() {
        return institution;
    }

    public CollageEducation institution(String institution) {
        this.institution = institution;
        return this;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getCountry() {
        return country;
    }

    public CollageEducation country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getReceiveDateDegree() {
        return receiveDateDegree;
    }

    public CollageEducation receiveDateDegree(String receiveDateDegree) {
        this.receiveDateDegree = receiveDateDegree;
        return this;
    }

    public void setReceiveDateDegree(String receiveDateDegree) {
        this.receiveDateDegree = receiveDateDegree;
    }

    public Documents getDocument() {
        return document;
    }

    public CollageEducation document(Documents document) {
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
        CollageEducation collageEducation = (CollageEducation) o;
        if (collageEducation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), collageEducation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CollageEducation{" +
            "id=" + getId() +
            ", fullName='" + getFullName() + "'" +
            ", lastDegree='" + getLastDegree() + "'" +
            ", program='" + getProgram() + "'" +
            ", institution='" + getInstitution() + "'" +
            ", country='" + getCountry() + "'" +
            ", receiveDateDegree='" + getReceiveDateDegree() + "'" +
            "}";
    }
}
