package ir.samta.project.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A ExistingResearchProject.
 */
@Entity
@Table(name = "existing_research_project")
@Document(indexName = "existingresearchproject")
public class ExistingResearchProject implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "project_title")
    private String projectTitle;

    @Column(name = "project_code")
    private String projectCode;

    @Column(name = "institution")
    private String institution;

    @Column(name = "from_date")
    private ZonedDateTime fromDate;

    @Column(name = "to_date")
    private ZonedDateTime toDate;

    @Column(name = "last_status")
    private String lastStatus;

    @ManyToOne
    @JsonIgnoreProperties("existingResearchProjects")
    private Documents document;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public ExistingResearchProject projectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
        return this;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public String getProjectCode() {
        return projectCode;
    }

    public ExistingResearchProject projectCode(String projectCode) {
        this.projectCode = projectCode;
        return this;
    }

    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }

    public String getInstitution() {
        return institution;
    }

    public ExistingResearchProject institution(String institution) {
        this.institution = institution;
        return this;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public ZonedDateTime getFromDate() {
        return fromDate;
    }

    public ExistingResearchProject fromDate(ZonedDateTime fromDate) {
        this.fromDate = fromDate;
        return this;
    }

    public void setFromDate(ZonedDateTime fromDate) {
        this.fromDate = fromDate;
    }

    public ZonedDateTime getToDate() {
        return toDate;
    }

    public ExistingResearchProject toDate(ZonedDateTime toDate) {
        this.toDate = toDate;
        return this;
    }

    public void setToDate(ZonedDateTime toDate) {
        this.toDate = toDate;
    }

    public String getLastStatus() {
        return lastStatus;
    }

    public ExistingResearchProject lastStatus(String lastStatus) {
        this.lastStatus = lastStatus;
        return this;
    }

    public void setLastStatus(String lastStatus) {
        this.lastStatus = lastStatus;
    }

    public Documents getDocument() {
        return document;
    }

    public ExistingResearchProject document(Documents document) {
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
        ExistingResearchProject existingResearchProject = (ExistingResearchProject) o;
        if (existingResearchProject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), existingResearchProject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExistingResearchProject{" +
            "id=" + getId() +
            ", projectTitle='" + getProjectTitle() + "'" +
            ", projectCode='" + getProjectCode() + "'" +
            ", institution='" + getInstitution() + "'" +
            ", fromDate='" + getFromDate() + "'" +
            ", toDate='" + getToDate() + "'" +
            ", lastStatus='" + getLastStatus() + "'" +
            "}";
    }
}
