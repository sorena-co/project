package ir.samta.project.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;


import java.io.Serializable;
import java.util.Objects;

/**
 * A CostSummary.
 */
@Entity
@Table(name = "cost_summary")
public class CostSummary implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cost_detail")
    private String costDetail;

    @Column(name = "from_page")
    private Long fromPage;

    @Column(name = "cost_rial")
    private Long costRial;

    @Column(name = "cost_dollar")
    private Long costDollar;

    @ManyToOne
    @JsonIgnoreProperties("costSummaries")
    private Documents document;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCostDetail() {
        return costDetail;
    }

    public CostSummary costDetail(String costDetail) {
        this.costDetail = costDetail;
        return this;
    }

    public void setCostDetail(String costDetail) {
        this.costDetail = costDetail;
    }

    public Long getFromPage() {
        return fromPage;
    }

    public CostSummary fromPage(Long fromPage) {
        this.fromPage = fromPage;
        return this;
    }

    public void setFromPage(Long fromPage) {
        this.fromPage = fromPage;
    }

    public Long getCostRial() {
        return costRial;
    }

    public CostSummary costRial(Long costRial) {
        this.costRial = costRial;
        return this;
    }

    public void setCostRial(Long costRial) {
        this.costRial = costRial;
    }

    public Long getCostDollar() {
        return costDollar;
    }

    public CostSummary costDollar(Long costDollar) {
        this.costDollar = costDollar;
        return this;
    }

    public void setCostDollar(Long costDollar) {
        this.costDollar = costDollar;
    }

    public Documents getDocument() {
        return document;
    }

    public CostSummary document(Documents document) {
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
        CostSummary costSummary = (CostSummary) o;
        if (costSummary.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), costSummary.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CostSummary{" +
            "id=" + getId() +
            ", costDetail='" + getCostDetail() + "'" +
            ", fromPage=" + getFromPage() +
            ", costRial=" + getCostRial() +
            ", costDollar=" + getCostDollar() +
            "}";
    }
}
