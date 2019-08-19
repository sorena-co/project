package ir.samta.project.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import ir.samta.project.domain.enumeration.FinancialProjectType;


import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A FinancialProject.
 */
@Entity
@Table(name = "financial_project")
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

    @Column(name = "factor_no")
    private String factorNo;

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

    @Column(name = "get_credit_project_id")
    private Long getCreditProjectId;

    @Column(name = "year_confirmed")
    private Long yearConfirmed;

    @ManyToOne(fetch = FetchType.LAZY)
    private Project targetProject;

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

    public void setTitle(String title) {
        this.title = title;
    }

    public FinancialProject title(String title) {
        this.title = title;
        return this;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public FinancialProject code(String code) {
        this.code = code;
        return this;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public FinancialProject name(String name) {
        this.name = name;
        return this;
    }

    public String getSellContractNo() {
        return sellContractNo;
    }

    public void setSellContractNo(String sellContractNo) {
        this.sellContractNo = sellContractNo;
    }

    public FinancialProject sellContractNo(String sellContractNo) {
        this.sellContractNo = sellContractNo;
        return this;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public FinancialProject amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public ZonedDateTime getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
    }

    public FinancialProject registerDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
        return this;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public FinancialProject startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public FinancialProject finishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public FinancialProject description(String description) {
        this.description = description;
        return this;
    }

    public FinancialProjectType getFinancialProjectType() {
        return financialProjectType;
    }

    public void setFinancialProjectType(FinancialProjectType financialProjectType) {
        this.financialProjectType = financialProjectType;
    }

    public FinancialProject financialProjectType(FinancialProjectType financialProjectType) {
        this.financialProjectType = financialProjectType;
        return this;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public FinancialProject project(Project project) {
        this.project = project;
        return this;
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

    public String getFactorNo() {
        return factorNo;
    }

    public void setFactorNo(String factorNo) {
        this.factorNo = factorNo;
    }

    public Long getGetCreditProjectId() {
        return getCreditProjectId;
    }

    public void setGetCreditProjectId(Long getCreditProjectId) {
        this.getCreditProjectId = getCreditProjectId;
    }

    public Long getYearConfirmed() {
        return yearConfirmed;
    }

    public void setYearConfirmed(Long yearConfirmed) {
        this.yearConfirmed = yearConfirmed;
    }

    public Project getTargetProject() {
        return targetProject;
    }

    public void setTargetProject(Project targetProject) {
        this.targetProject = targetProject;
    }
}
