package ir.samta.project.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import ir.samta.project.domain.enumeration.PlanType;

/**
 * A Document.
 */
@Entity
@Table(name = "document")
@Document(indexName = "document")
public class Documents implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "protective_classification")
    private String protectiveClassification;

    @Column(name = "persian_title")
    private String persianTitle;

    @Column(name = "foreign_title")
    private String foreignTitle;

    @Enumerated(EnumType.STRING)
    @Column(name = "plan_type")
    private PlanType planType;

    @Column(name = "detail_of_project")
    private String detailOfProject;

    @Column(name = "vision_of_project")
    private String visionOfProject;

    @Column(name = "executive_bidder")
    private String executiveBidder;

    @Column(name = "jhi_organization")
    private String organization;

    @Column(name = "industry")
    private String industry;

    @Column(name = "address")
    private String address;

    @Column(name = "export_plan_date")
    private ZonedDateTime exportPlanDate;

    @Column(name = "executive_plan_date")
    private ZonedDateTime executivePlanDate;

    @Column(name = "from_plan_date")
    private ZonedDateTime fromPlanDate;

    @Column(name = "to_plan_date")
    private ZonedDateTime toPlanDate;

    @Column(name = "rial_budget")
    private Long rialBudget;

    @Column(name = "foreign_budget")
    private Long foreignBudget;

    @Column(name = "leader_command")
    private String leaderCommand;

    @Column(name = "five_year_program")
    private String fiveYearProgram;

    @Column(name = "standing_approvals")
    private String standingApprovals;

    @Column(name = "approved_pattern")
    private String approvedPattern;

    @Column(name = "percentage_of_outsourcing")
    private Long percentageOfOutsourcing;

    @Column(name = "employer_operations")
    private String employerOperations;

    @Column(name = "industrial_user")
    private String industrialUser;

    @Column(name = "general_specification_of_the_design")
    private String generalSpecificationOfTheDesign;

    @Column(name = "the_purpose_of_the_project")
    private String thePurposeOfTheProject;

    @Column(name = "scientific_and_technical_buildings")
    private String scientificAndTechnicalBuildings;

    @Column(name = "how_implement_project")
    private String howImplementProject;

    @Column(name = "history_of_plan")
    private String historyOfPlan;

    @Column(name = "history_of_studies_and_research")
    private String historyOfStudiesAndResearch;

    @Column(name = "how_use")
    private String howUse;

    @Column(name = "defense_needs")
    private String defenseNeeds;

    @Column(name = "which_military")
    private String whichMilitary;

    @Column(name = "civilian_applications")
    private String civilianApplications;

    @Column(name = "imagined_date")
    private String imaginedDate;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private MainStep mainStep;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private CollageEducation collageEducation;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private ResearcherHistory researcherHistory;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private ExistingResearchProject existingResearchProject;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private OrganizationPartner organizationPartner;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private CostSummary costSummary;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private CostSummary foreCastCostConsume;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private CostSummary foreCastCostCost;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private CostSummary foreCastCostSupport;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private CostSummary foreCastCostSpace;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private CostSummary foreCastCostSellContract;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private CostSummary foreCastCostOther;

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

    public Documents title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getProtectiveClassification() {
        return protectiveClassification;
    }

    public Documents protectiveClassification(String protectiveClassification) {
        this.protectiveClassification = protectiveClassification;
        return this;
    }

    public void setProtectiveClassification(String protectiveClassification) {
        this.protectiveClassification = protectiveClassification;
    }

    public String getPersianTitle() {
        return persianTitle;
    }

    public Documents persianTitle(String persianTitle) {
        this.persianTitle = persianTitle;
        return this;
    }

    public void setPersianTitle(String persianTitle) {
        this.persianTitle = persianTitle;
    }

    public String getForeignTitle() {
        return foreignTitle;
    }

    public Documents foreignTitle(String foreignTitle) {
        this.foreignTitle = foreignTitle;
        return this;
    }

    public void setForeignTitle(String foreignTitle) {
        this.foreignTitle = foreignTitle;
    }

    public PlanType getPlanType() {
        return planType;
    }

    public Documents planType(PlanType planType) {
        this.planType = planType;
        return this;
    }

    public void setPlanType(PlanType planType) {
        this.planType = planType;
    }

    public String getDetailOfProject() {
        return detailOfProject;
    }

    public Documents detailOfProject(String detailOfProject) {
        this.detailOfProject = detailOfProject;
        return this;
    }

    public void setDetailOfProject(String detailOfProject) {
        this.detailOfProject = detailOfProject;
    }

    public String getVisionOfProject() {
        return visionOfProject;
    }

    public Documents visionOfProject(String visionOfProject) {
        this.visionOfProject = visionOfProject;
        return this;
    }

    public void setVisionOfProject(String visionOfProject) {
        this.visionOfProject = visionOfProject;
    }

    public String getExecutiveBidder() {
        return executiveBidder;
    }

    public Documents executiveBidder(String executiveBidder) {
        this.executiveBidder = executiveBidder;
        return this;
    }

    public void setExecutiveBidder(String executiveBidder) {
        this.executiveBidder = executiveBidder;
    }

    public String getOrganization() {
        return organization;
    }

    public Documents organization(String organization) {
        this.organization = organization;
        return this;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getIndustry() {
        return industry;
    }

    public Documents industry(String industry) {
        this.industry = industry;
        return this;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getAddress() {
        return address;
    }

    public Documents address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public ZonedDateTime getExportPlanDate() {
        return exportPlanDate;
    }

    public Documents exportPlanDate(ZonedDateTime exportPlanDate) {
        this.exportPlanDate = exportPlanDate;
        return this;
    }

    public void setExportPlanDate(ZonedDateTime exportPlanDate) {
        this.exportPlanDate = exportPlanDate;
    }

    public ZonedDateTime getExecutivePlanDate() {
        return executivePlanDate;
    }

    public Documents executivePlanDate(ZonedDateTime executivePlanDate) {
        this.executivePlanDate = executivePlanDate;
        return this;
    }

    public void setExecutivePlanDate(ZonedDateTime executivePlanDate) {
        this.executivePlanDate = executivePlanDate;
    }

    public ZonedDateTime getFromPlanDate() {
        return fromPlanDate;
    }

    public Documents fromPlanDate(ZonedDateTime fromPlanDate) {
        this.fromPlanDate = fromPlanDate;
        return this;
    }

    public void setFromPlanDate(ZonedDateTime fromPlanDate) {
        this.fromPlanDate = fromPlanDate;
    }

    public ZonedDateTime getToPlanDate() {
        return toPlanDate;
    }

    public Documents toPlanDate(ZonedDateTime toPlanDate) {
        this.toPlanDate = toPlanDate;
        return this;
    }

    public void setToPlanDate(ZonedDateTime toPlanDate) {
        this.toPlanDate = toPlanDate;
    }

    public Long getRialBudget() {
        return rialBudget;
    }

    public Documents rialBudget(Long rialBudget) {
        this.rialBudget = rialBudget;
        return this;
    }

    public void setRialBudget(Long rialBudget) {
        this.rialBudget = rialBudget;
    }

    public Long getForeignBudget() {
        return foreignBudget;
    }

    public Documents foreignBudget(Long foreignBudget) {
        this.foreignBudget = foreignBudget;
        return this;
    }

    public void setForeignBudget(Long foreignBudget) {
        this.foreignBudget = foreignBudget;
    }

    public String getLeaderCommand() {
        return leaderCommand;
    }

    public Documents leaderCommand(String leaderCommand) {
        this.leaderCommand = leaderCommand;
        return this;
    }

    public void setLeaderCommand(String leaderCommand) {
        this.leaderCommand = leaderCommand;
    }

    public String getFiveYearProgram() {
        return fiveYearProgram;
    }

    public Documents fiveYearProgram(String fiveYearProgram) {
        this.fiveYearProgram = fiveYearProgram;
        return this;
    }

    public void setFiveYearProgram(String fiveYearProgram) {
        this.fiveYearProgram = fiveYearProgram;
    }

    public String getStandingApprovals() {
        return standingApprovals;
    }

    public Documents standingApprovals(String standingApprovals) {
        this.standingApprovals = standingApprovals;
        return this;
    }

    public void setStandingApprovals(String standingApprovals) {
        this.standingApprovals = standingApprovals;
    }

    public String getApprovedPattern() {
        return approvedPattern;
    }

    public Documents approvedPattern(String approvedPattern) {
        this.approvedPattern = approvedPattern;
        return this;
    }

    public void setApprovedPattern(String approvedPattern) {
        this.approvedPattern = approvedPattern;
    }

    public Long getPercentageOfOutsourcing() {
        return percentageOfOutsourcing;
    }

    public Documents percentageOfOutsourcing(Long percentageOfOutsourcing) {
        this.percentageOfOutsourcing = percentageOfOutsourcing;
        return this;
    }

    public void setPercentageOfOutsourcing(Long percentageOfOutsourcing) {
        this.percentageOfOutsourcing = percentageOfOutsourcing;
    }

    public String getEmployerOperations() {
        return employerOperations;
    }

    public Documents employerOperations(String employerOperations) {
        this.employerOperations = employerOperations;
        return this;
    }

    public void setEmployerOperations(String employerOperations) {
        this.employerOperations = employerOperations;
    }

    public String getIndustrialUser() {
        return industrialUser;
    }

    public Documents industrialUser(String industrialUser) {
        this.industrialUser = industrialUser;
        return this;
    }

    public void setIndustrialUser(String industrialUser) {
        this.industrialUser = industrialUser;
    }

    public String getGeneralSpecificationOfTheDesign() {
        return generalSpecificationOfTheDesign;
    }

    public Documents generalSpecificationOfTheDesign(String generalSpecificationOfTheDesign) {
        this.generalSpecificationOfTheDesign = generalSpecificationOfTheDesign;
        return this;
    }

    public void setGeneralSpecificationOfTheDesign(String generalSpecificationOfTheDesign) {
        this.generalSpecificationOfTheDesign = generalSpecificationOfTheDesign;
    }

    public String getThePurposeOfTheProject() {
        return thePurposeOfTheProject;
    }

    public Documents thePurposeOfTheProject(String thePurposeOfTheProject) {
        this.thePurposeOfTheProject = thePurposeOfTheProject;
        return this;
    }

    public void setThePurposeOfTheProject(String thePurposeOfTheProject) {
        this.thePurposeOfTheProject = thePurposeOfTheProject;
    }

    public String getScientificAndTechnicalBuildings() {
        return scientificAndTechnicalBuildings;
    }

    public Documents scientificAndTechnicalBuildings(String scientificAndTechnicalBuildings) {
        this.scientificAndTechnicalBuildings = scientificAndTechnicalBuildings;
        return this;
    }

    public void setScientificAndTechnicalBuildings(String scientificAndTechnicalBuildings) {
        this.scientificAndTechnicalBuildings = scientificAndTechnicalBuildings;
    }

    public String getHowImplementProject() {
        return howImplementProject;
    }

    public Documents howImplementProject(String howImplementProject) {
        this.howImplementProject = howImplementProject;
        return this;
    }

    public void setHowImplementProject(String howImplementProject) {
        this.howImplementProject = howImplementProject;
    }

    public String getHistoryOfPlan() {
        return historyOfPlan;
    }

    public Documents historyOfPlan(String historyOfPlan) {
        this.historyOfPlan = historyOfPlan;
        return this;
    }

    public void setHistoryOfPlan(String historyOfPlan) {
        this.historyOfPlan = historyOfPlan;
    }

    public String getHistoryOfStudiesAndResearch() {
        return historyOfStudiesAndResearch;
    }

    public Documents historyOfStudiesAndResearch(String historyOfStudiesAndResearch) {
        this.historyOfStudiesAndResearch = historyOfStudiesAndResearch;
        return this;
    }

    public void setHistoryOfStudiesAndResearch(String historyOfStudiesAndResearch) {
        this.historyOfStudiesAndResearch = historyOfStudiesAndResearch;
    }

    public String getHowUse() {
        return howUse;
    }

    public Documents howUse(String howUse) {
        this.howUse = howUse;
        return this;
    }

    public void setHowUse(String howUse) {
        this.howUse = howUse;
    }

    public String getDefenseNeeds() {
        return defenseNeeds;
    }

    public Documents defenseNeeds(String defenseNeeds) {
        this.defenseNeeds = defenseNeeds;
        return this;
    }

    public void setDefenseNeeds(String defenseNeeds) {
        this.defenseNeeds = defenseNeeds;
    }

    public String getWhichMilitary() {
        return whichMilitary;
    }

    public Documents whichMilitary(String whichMilitary) {
        this.whichMilitary = whichMilitary;
        return this;
    }

    public void setWhichMilitary(String whichMilitary) {
        this.whichMilitary = whichMilitary;
    }

    public String getCivilianApplications() {
        return civilianApplications;
    }

    public Documents civilianApplications(String civilianApplications) {
        this.civilianApplications = civilianApplications;
        return this;
    }

    public void setCivilianApplications(String civilianApplications) {
        this.civilianApplications = civilianApplications;
    }

    public String getImaginedDate() {
        return imaginedDate;
    }

    public Documents imaginedDate(String imaginedDate) {
        this.imaginedDate = imaginedDate;
        return this;
    }

    public void setImaginedDate(String imaginedDate) {
        this.imaginedDate = imaginedDate;
    }

    public MainStep getMainStep() {
        return mainStep;
    }

    public Documents mainStep(MainStep mainStep) {
        this.mainStep = mainStep;
        return this;
    }

    public void setMainStep(MainStep mainStep) {
        this.mainStep = mainStep;
    }

    public CollageEducation getCollageEducation() {
        return collageEducation;
    }

    public Documents collageEducation(CollageEducation collageEducation) {
        this.collageEducation = collageEducation;
        return this;
    }

    public void setCollageEducation(CollageEducation collageEducation) {
        this.collageEducation = collageEducation;
    }

    public ResearcherHistory getResearcherHistory() {
        return researcherHistory;
    }

    public Documents researcherHistory(ResearcherHistory researcherHistory) {
        this.researcherHistory = researcherHistory;
        return this;
    }

    public void setResearcherHistory(ResearcherHistory researcherHistory) {
        this.researcherHistory = researcherHistory;
    }

    public ExistingResearchProject getExistingResearchProject() {
        return existingResearchProject;
    }

    public Documents existingResearchProject(ExistingResearchProject existingResearchProject) {
        this.existingResearchProject = existingResearchProject;
        return this;
    }

    public void setExistingResearchProject(ExistingResearchProject existingResearchProject) {
        this.existingResearchProject = existingResearchProject;
    }

    public OrganizationPartner getOrganizationPartner() {
        return organizationPartner;
    }

    public Documents organizationPartner(OrganizationPartner organizationPartner) {
        this.organizationPartner = organizationPartner;
        return this;
    }

    public void setOrganizationPartner(OrganizationPartner organizationPartner) {
        this.organizationPartner = organizationPartner;
    }

    public CostSummary getCostSummary() {
        return costSummary;
    }

    public Documents costSummary(CostSummary costSummary) {
        this.costSummary = costSummary;
        return this;
    }

    public void setCostSummary(CostSummary costSummary) {
        this.costSummary = costSummary;
    }

    public CostSummary getForeCastCostConsume() {
        return foreCastCostConsume;
    }

    public Documents foreCastCostConsume(CostSummary costSummary) {
        this.foreCastCostConsume = costSummary;
        return this;
    }

    public void setForeCastCostConsume(CostSummary costSummary) {
        this.foreCastCostConsume = costSummary;
    }

    public CostSummary getForeCastCostCost() {
        return foreCastCostCost;
    }

    public Documents foreCastCostCost(CostSummary costSummary) {
        this.foreCastCostCost = costSummary;
        return this;
    }

    public void setForeCastCostCost(CostSummary costSummary) {
        this.foreCastCostCost = costSummary;
    }

    public CostSummary getForeCastCostSupport() {
        return foreCastCostSupport;
    }

    public Documents foreCastCostSupport(CostSummary costSummary) {
        this.foreCastCostSupport = costSummary;
        return this;
    }

    public void setForeCastCostSupport(CostSummary costSummary) {
        this.foreCastCostSupport = costSummary;
    }

    public CostSummary getForeCastCostSpace() {
        return foreCastCostSpace;
    }

    public Documents foreCastCostSpace(CostSummary costSummary) {
        this.foreCastCostSpace = costSummary;
        return this;
    }

    public void setForeCastCostSpace(CostSummary costSummary) {
        this.foreCastCostSpace = costSummary;
    }

    public CostSummary getForeCastCostSellContract() {
        return foreCastCostSellContract;
    }

    public Documents foreCastCostSellContract(CostSummary costSummary) {
        this.foreCastCostSellContract = costSummary;
        return this;
    }

    public void setForeCastCostSellContract(CostSummary costSummary) {
        this.foreCastCostSellContract = costSummary;
    }

    public CostSummary getForeCastCostOther() {
        return foreCastCostOther;
    }

    public Documents foreCastCostOther(CostSummary costSummary) {
        this.foreCastCostOther = costSummary;
        return this;
    }

    public void setForeCastCostOther(CostSummary costSummary) {
        this.foreCastCostOther = costSummary;
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
        Documents document = (Documents) o;
        if (document.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), document.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Documents{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", protectiveClassification='" + getProtectiveClassification() + "'" +
            ", persianTitle='" + getPersianTitle() + "'" +
            ", foreignTitle='" + getForeignTitle() + "'" +
            ", planType='" + getPlanType() + "'" +
            ", detailOfProject='" + getDetailOfProject() + "'" +
            ", visionOfProject='" + getVisionOfProject() + "'" +
            ", executiveBidder='" + getExecutiveBidder() + "'" +
            ", organization='" + getOrganization() + "'" +
            ", industry='" + getIndustry() + "'" +
            ", address='" + getAddress() + "'" +
            ", exportPlanDate='" + getExportPlanDate() + "'" +
            ", executivePlanDate='" + getExecutivePlanDate() + "'" +
            ", fromPlanDate='" + getFromPlanDate() + "'" +
            ", toPlanDate='" + getToPlanDate() + "'" +
            ", rialBudget=" + getRialBudget() +
            ", foreignBudget=" + getForeignBudget() +
            ", leaderCommand='" + getLeaderCommand() + "'" +
            ", fiveYearProgram='" + getFiveYearProgram() + "'" +
            ", standingApprovals='" + getStandingApprovals() + "'" +
            ", approvedPattern='" + getApprovedPattern() + "'" +
            ", percentageOfOutsourcing=" + getPercentageOfOutsourcing() +
            ", employerOperations='" + getEmployerOperations() + "'" +
            ", industrialUser='" + getIndustrialUser() + "'" +
            ", generalSpecificationOfTheDesign='" + getGeneralSpecificationOfTheDesign() + "'" +
            ", thePurposeOfTheProject='" + getThePurposeOfTheProject() + "'" +
            ", scientificAndTechnicalBuildings='" + getScientificAndTechnicalBuildings() + "'" +
            ", howImplementProject='" + getHowImplementProject() + "'" +
            ", historyOfPlan='" + getHistoryOfPlan() + "'" +
            ", historyOfStudiesAndResearch='" + getHistoryOfStudiesAndResearch() + "'" +
            ", howUse='" + getHowUse() + "'" +
            ", defenseNeeds='" + getDefenseNeeds() + "'" +
            ", whichMilitary='" + getWhichMilitary() + "'" +
            ", civilianApplications='" + getCivilianApplications() + "'" +
            ", imaginedDate='" + getImaginedDate() + "'" +
            "}";
    }
}
