package ir.samta.project.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import ir.samta.project.domain.enumeration.FinancialProjectType;

/**
 * A FinancialProject.
 */
@Entity
@Table(name = "financial_project")
@Document(indexName = "financialproject")
public class FinancialProject implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "sell_contract_no")
    private String sellContractNo;

    @Column(name = "amount")
    private Long amount;

    @Column(name = "register_date")
    private ZonedDateTime registerDate;

    @Column(name = "start_date")
    private ZonedDateTime startDate;

    @Column(name = "finish_date")
    private ZonedDateTime finishDate;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "financial_project_type")
    private FinancialProjectType financialProjectType;

    @ManyToOne
    @JsonIgnoreProperties("financialProjects")
    private Project project;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public FinancialProject title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCode() {
        return code;
    }

    public FinancialProject code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public FinancialProject name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSellContractNo() {
        return sellContractNo;
    }

    public FinancialProject sellContractNo(String sellContractNo) {
        this.sellContractNo = sellContractNo;
        return this;
    }

    public void setSellContractNo(String sellContractNo) {
        this.sellContractNo = sellContractNo;
    }

    public Long getAmount() {
        return amount;
    }

    public FinancialProject amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public ZonedDateTime getRegisterDate() {
        return registerDate;
    }

    public FinancialProject registerDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
        return this;
    }

    public void setRegisterDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public FinancialProject startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public FinancialProject finishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public String getDescription() {
        return description;
    }

    public FinancialProject description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public FinancialProjectType getFinancialProjectType() {
        return financialProjectType;
    }

    public FinancialProject financialProjectType(FinancialProjectType financialProjectType) {
        this.financialProjectType = financialProjectType;
        return this;
    }

    public void setFinancialProjectType(FinancialProjectType financialProjectType) {
        this.financialProjectType = financialProjectType;
    }

    public Project getProject() {
        return project;
    }

    public FinancialProject project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
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
        FinancialProject financialProject = (FinancialProject) o;
        if (financialProject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), financialProject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FinancialProject{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", sellContractNo='" + getSellContractNo() + "'" +
            ", amount=" + getAmount() +
            ", registerDate='" + getRegisterDate() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", description='" + getDescription() + "'" +
            ", financialProjectType='" + getFinancialProjectType() + "'" +
            "}";
    }
}
