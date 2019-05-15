package ir.samta.project.domain;



import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import ir.samta.project.domain.enumeration.ForeCastCostType;

/**
 * A ForeCastCost.
 */
@Entity
@Table(name = "fore_cast_cost")
@Document(indexName = "forecastcost")
public class ForeCastCost implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "device_name")
    private String deviceName;

    @Column(name = "builder_company")
    private String builderCompany;

    @Column(name = "count")
    private Long count;

    @Column(name = "cost_detail")
    private String costDetail;

    @Column(name = "base_price_rial")
    private Long basePriceRial;

    @Column(name = "base_price_dollar")
    private Long basePriceDollar;

    @Column(name = "total_price_rial")
    private Long totalPriceRial;

    @Column(name = "total_price_dollar")
    private Long totalPriceDollar;

    @Column(name = "space")
    private Long space;

    @Column(name = "sell_contract_type")
    private String sellContractType;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private ForeCastCostType type;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public ForeCastCost deviceName(String deviceName) {
        this.deviceName = deviceName;
        return this;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getBuilderCompany() {
        return builderCompany;
    }

    public ForeCastCost builderCompany(String builderCompany) {
        this.builderCompany = builderCompany;
        return this;
    }

    public void setBuilderCompany(String builderCompany) {
        this.builderCompany = builderCompany;
    }

    public Long getCount() {
        return count;
    }

    public ForeCastCost count(Long count) {
        this.count = count;
        return this;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public String getCostDetail() {
        return costDetail;
    }

    public ForeCastCost costDetail(String costDetail) {
        this.costDetail = costDetail;
        return this;
    }

    public void setCostDetail(String costDetail) {
        this.costDetail = costDetail;
    }

    public Long getBasePriceRial() {
        return basePriceRial;
    }

    public ForeCastCost basePriceRial(Long basePriceRial) {
        this.basePriceRial = basePriceRial;
        return this;
    }

    public void setBasePriceRial(Long basePriceRial) {
        this.basePriceRial = basePriceRial;
    }

    public Long getBasePriceDollar() {
        return basePriceDollar;
    }

    public ForeCastCost basePriceDollar(Long basePriceDollar) {
        this.basePriceDollar = basePriceDollar;
        return this;
    }

    public void setBasePriceDollar(Long basePriceDollar) {
        this.basePriceDollar = basePriceDollar;
    }

    public Long getTotalPriceRial() {
        return totalPriceRial;
    }

    public ForeCastCost totalPriceRial(Long totalPriceRial) {
        this.totalPriceRial = totalPriceRial;
        return this;
    }

    public void setTotalPriceRial(Long totalPriceRial) {
        this.totalPriceRial = totalPriceRial;
    }

    public Long getTotalPriceDollar() {
        return totalPriceDollar;
    }

    public ForeCastCost totalPriceDollar(Long totalPriceDollar) {
        this.totalPriceDollar = totalPriceDollar;
        return this;
    }

    public void setTotalPriceDollar(Long totalPriceDollar) {
        this.totalPriceDollar = totalPriceDollar;
    }

    public Long getSpace() {
        return space;
    }

    public ForeCastCost space(Long space) {
        this.space = space;
        return this;
    }

    public void setSpace(Long space) {
        this.space = space;
    }

    public String getSellContractType() {
        return sellContractType;
    }

    public ForeCastCost sellContractType(String sellContractType) {
        this.sellContractType = sellContractType;
        return this;
    }

    public void setSellContractType(String sellContractType) {
        this.sellContractType = sellContractType;
    }

    public ForeCastCostType getType() {
        return type;
    }

    public ForeCastCost type(ForeCastCostType type) {
        this.type = type;
        return this;
    }

    public void setType(ForeCastCostType type) {
        this.type = type;
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
        ForeCastCost foreCastCost = (ForeCastCost) o;
        if (foreCastCost.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), foreCastCost.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ForeCastCost{" +
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
