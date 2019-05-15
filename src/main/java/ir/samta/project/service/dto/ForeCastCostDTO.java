package ir.samta.project.service.dto;
import java.io.Serializable;
import java.util.Objects;
import ir.samta.project.domain.enumeration.ForeCastCostType;

/**
 * A DTO for the ForeCastCost entity.
 */
public class ForeCastCostDTO implements Serializable {

    private Long id;

    private String deviceName;

    private String builderCompany;

    private Long count;

    private String costDetail;

    private Long basePriceRial;

    private Long basePriceDollar;

    private Long totalPriceRial;

    private Long totalPriceDollar;

    private Long space;

    private String sellContractType;

    private ForeCastCostType type;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getBuilderCompany() {
        return builderCompany;
    }

    public void setBuilderCompany(String builderCompany) {
        this.builderCompany = builderCompany;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public String getCostDetail() {
        return costDetail;
    }

    public void setCostDetail(String costDetail) {
        this.costDetail = costDetail;
    }

    public Long getBasePriceRial() {
        return basePriceRial;
    }

    public void setBasePriceRial(Long basePriceRial) {
        this.basePriceRial = basePriceRial;
    }

    public Long getBasePriceDollar() {
        return basePriceDollar;
    }

    public void setBasePriceDollar(Long basePriceDollar) {
        this.basePriceDollar = basePriceDollar;
    }

    public Long getTotalPriceRial() {
        return totalPriceRial;
    }

    public void setTotalPriceRial(Long totalPriceRial) {
        this.totalPriceRial = totalPriceRial;
    }

    public Long getTotalPriceDollar() {
        return totalPriceDollar;
    }

    public void setTotalPriceDollar(Long totalPriceDollar) {
        this.totalPriceDollar = totalPriceDollar;
    }

    public Long getSpace() {
        return space;
    }

    public void setSpace(Long space) {
        this.space = space;
    }

    public String getSellContractType() {
        return sellContractType;
    }

    public void setSellContractType(String sellContractType) {
        this.sellContractType = sellContractType;
    }

    public ForeCastCostType getType() {
        return type;
    }

    public void setType(ForeCastCostType type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ForeCastCostDTO foreCastCostDTO = (ForeCastCostDTO) o;
        if (foreCastCostDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), foreCastCostDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ForeCastCostDTO{" +
            "id=" + getId() +
            ", deviceName='" + getDeviceName() + "'" +
            ", builderCompany='" + getBuilderCompany() + "'" +
            ", count=" + getCount() +
            ", costDetail='" + getCostDetail() + "'" +
            ", basePriceRial=" + getBasePriceRial() +
            ", basePriceDollar=" + getBasePriceDollar() +
            ", totalPriceRial=" + getTotalPriceRial() +
            ", totalPriceDollar=" + getTotalPriceDollar() +
            ", space=" + getSpace() +
            ", sellContractType='" + getSellContractType() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
