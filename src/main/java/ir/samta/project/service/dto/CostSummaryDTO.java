package ir.samta.project.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CostSummary entity.
 */
public class CostSummaryDTO implements Serializable {

    private Long id;

    private String costDetail;

    private Long fromPage;

    private Long costRial;

    private Long costDollar;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCostDetail() {
        return costDetail;
    }

    public void setCostDetail(String costDetail) {
        this.costDetail = costDetail;
    }

    public Long getFromPage() {
        return fromPage;
    }

    public void setFromPage(Long fromPage) {
        this.fromPage = fromPage;
    }

    public Long getCostRial() {
        return costRial;
    }

    public void setCostRial(Long costRial) {
        this.costRial = costRial;
    }

    public Long getCostDollar() {
        return costDollar;
    }

    public void setCostDollar(Long costDollar) {
        this.costDollar = costDollar;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CostSummaryDTO costSummaryDTO = (CostSummaryDTO) o;
        if (costSummaryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), costSummaryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CostSummaryDTO{" +
            "id=" + getId() +
            ", costDetail='" + getCostDetail() + "'" +
            ", fromPage=" + getFromPage() +
            ", costRial=" + getCostRial() +
            ", costDollar=" + getCostDollar() +
            "}";
    }
}
