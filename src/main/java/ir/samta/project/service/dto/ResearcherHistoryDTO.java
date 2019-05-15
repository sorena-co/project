package ir.samta.project.service.dto;
import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the ResearcherHistory entity.
 */
public class ResearcherHistoryDTO implements Serializable {

    private Long id;

    private ZonedDateTime fromDate;

    private ZonedDateTime toDate;

    private String organization;

    private String level;

    private String job;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ResearcherHistoryDTO researcherHistoryDTO = (ResearcherHistoryDTO) o;
        if (researcherHistoryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), researcherHistoryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ResearcherHistoryDTO{" +
            "id=" + getId() +
            ", fromDate='" + getFromDate() + "'" +
            ", toDate='" + getToDate() + "'" +
            ", organization='" + getOrganization() + "'" +
            ", level='" + getLevel() + "'" +
            ", job='" + getJob() + "'" +
            "}";
    }
}
