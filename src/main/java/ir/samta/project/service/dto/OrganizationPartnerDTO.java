package ir.samta.project.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the OrganizationPartner entity.
 */
public class OrganizationPartnerDTO implements Serializable {

    private Long id;

    private String organization;

    private String type;

    private String name;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrganizationPartnerDTO organizationPartnerDTO = (OrganizationPartnerDTO) o;
        if (organizationPartnerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), organizationPartnerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrganizationPartnerDTO{" +
            "id=" + getId() +
            ", organization='" + getOrganization() + "'" +
            ", type='" + getType() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
