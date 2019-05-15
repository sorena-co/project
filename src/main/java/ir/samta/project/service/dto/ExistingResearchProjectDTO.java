package ir.samta.project.service.dto;
import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the ExistingResearchProject entity.
 */
public class ExistingResearchProjectDTO implements Serializable {

    private Long id;

    private String projectTitle;

    private String projectCode;

    private String institution;

    private ZonedDateTime fromDate;

    private ZonedDateTime toDate;

    private String lastStatus;


    private Long documentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public String getProjectCode() {
        return projectCode;
    }

    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public ZonedDateTime getFromDate() {
        return fromDate;
    }

    public void setFromDate(ZonedDateTime fromDate) {
        this.fromDate = fromDate;
    }

    public ZonedDateTime getToDate() {
        return toDate;
    }

    public void setToDate(ZonedDateTime toDate) {
        this.toDate = toDate;
    }

    public String getLastStatus() {
        return lastStatus;
    }

    public void setLastStatus(String lastStatus) {
        this.lastStatus = lastStatus;
    }

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ExistingResearchProjectDTO existingResearchProjectDTO = (ExistingResearchProjectDTO) o;
        if (existingResearchProjectDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), existingResearchProjectDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExistingResearchProjectDTO{" +
            "id=" + getId() +
            ", projectTitle='" + getProjectTitle() + "'" +
            ", projectCode='" + getProjectCode() + "'" +
            ", institution='" + getInstitution() + "'" +
            ", fromDate='" + getFromDate() + "'" +
            ", toDate='" + getToDate() + "'" +
            ", lastStatus='" + getLastStatus() + "'" +
            ", document=" + getDocumentId() +
            "}";
    }
}
