package ir.samta.project.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CollageEducation entity.
 */
public class CollageEducationDTO implements Serializable {

    private Long id;

    private String fullName;

    private String lastDegree;

    private String program;

    private String institution;

    private String country;

    private String receiveDateDegree;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getLastDegree() {
        return lastDegree;
    }

    public void setLastDegree(String lastDegree) {
        this.lastDegree = lastDegree;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getReceiveDateDegree() {
        return receiveDateDegree;
    }

    public void setReceiveDateDegree(String receiveDateDegree) {
        this.receiveDateDegree = receiveDateDegree;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CollageEducationDTO collageEducationDTO = (CollageEducationDTO) o;
        if (collageEducationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), collageEducationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CollageEducationDTO{" +
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
