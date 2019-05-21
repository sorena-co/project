package ir.samta.project.service.dto;

import ir.samta.project.domain.enumeration.PlanType;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the Document entity.
 */
public class DocumentDTO implements Serializable {

    private Long id;

    private String title;

    private String protectiveClassification;

    private String persianTitle;

    private String foreignTitle;

    private PlanType planType;

    private String detailOfProject;

    private String visionOfProject;

    private String executiveBidder;

    private String organization;

    private String industry;

    private String address;

    private ZonedDateTime exportPlanDate;

    private ZonedDateTime executivePlanDate;

    private ZonedDateTime fromPlanDate;

    private ZonedDateTime toPlanDate;

    private Long rialBudget;

    private Long foreignBudget;

    private String leaderCommand;

    private String fiveYearProgram;

    private String standingApprovals;

    private String approvedPattern;

    private Long percentageOfOutsourcing;

    private String employerOperations;

    private String industrialUser;

    private String generalSpecificationOfTheDesign;

    private String thePurposeOfTheProject;

    private String scientificAndTechnicalBuildings;

    private String howImplementProject;

    private String historyOfPlan;

    private String historyOfStudiesAndResearch;

    private String howUse;

    private String defenseNeeds;

    private String whichMilitary;

    private String civilianApplications;

    private String imaginedDate;


    private Long projectId;

    private String projectTitle;

    private List<MainStepDTO> mainSteps = new ArrayList<>();

    private String base64;

    private List<DocumentWordDTO> documentFiles = new ArrayList<>();

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

    public String getProtectiveClassification() {
        return protectiveClassification;
    }

    public void setProtectiveClassification(String protectiveClassification) {
        this.protectiveClassification = protectiveClassification;
    }

    public String getPersianTitle() {
        return persianTitle;
    }

    public void setPersianTitle(String persianTitle) {
        this.persianTitle = persianTitle;
    }

    public String getForeignTitle() {
        return foreignTitle;
    }

    public void setForeignTitle(String foreignTitle) {
        this.foreignTitle = foreignTitle;
    }

    public PlanType getPlanType() {
        return planType;
    }

    public void setPlanType(PlanType planType) {
        this.planType = planType;
    }

    public String getDetailOfProject() {
        return detailOfProject;
    }

    public void setDetailOfProject(String detailOfProject) {
        this.detailOfProject = detailOfProject;
    }

    public String getVisionOfProject() {
        return visionOfProject;
    }

    public void setVisionOfProject(String visionOfProject) {
        this.visionOfProject = visionOfProject;
    }

    public String getExecutiveBidder() {
        return executiveBidder;
    }

    public void setExecutiveBidder(String executiveBidder) {
        this.executiveBidder = executiveBidder;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public ZonedDateTime getExportPlanDate() {
        return exportPlanDate;
    }

    public void setExportPlanDate(ZonedDateTime exportPlanDate) {
        this.exportPlanDate = exportPlanDate;
    }

    public ZonedDateTime getExecutivePlanDate() {
        return executivePlanDate;
    }

    public void setExecutivePlanDate(ZonedDateTime executivePlanDate) {
        this.executivePlanDate = executivePlanDate;
    }

    public ZonedDateTime getFromPlanDate() {
        return fromPlanDate;
    }

    public void setFromPlanDate(ZonedDateTime fromPlanDate) {
        this.fromPlanDate = fromPlanDate;
    }

    public ZonedDateTime getToPlanDate() {
        return toPlanDate;
    }

    public void setToPlanDate(ZonedDateTime toPlanDate) {
        this.toPlanDate = toPlanDate;
    }

    public Long getRialBudget() {
        return rialBudget;
    }

    public void setRialBudget(Long rialBudget) {
        this.rialBudget = rialBudget;
    }

    public Long getForeignBudget() {
        return foreignBudget;
    }

    public void setForeignBudget(Long foreignBudget) {
        this.foreignBudget = foreignBudget;
    }

    public String getLeaderCommand() {
        return leaderCommand;
    }

    public void setLeaderCommand(String leaderCommand) {
        this.leaderCommand = leaderCommand;
    }

    public String getFiveYearProgram() {
        return fiveYearProgram;
    }

    public void setFiveYearProgram(String fiveYearProgram) {
        this.fiveYearProgram = fiveYearProgram;
    }

    public String getStandingApprovals() {
        return standingApprovals;
    }

    public void setStandingApprovals(String standingApprovals) {
        this.standingApprovals = standingApprovals;
    }

    public String getApprovedPattern() {
        return approvedPattern;
    }

    public void setApprovedPattern(String approvedPattern) {
        this.approvedPattern = approvedPattern;
    }

    public Long getPercentageOfOutsourcing() {
        return percentageOfOutsourcing;
    }

    public void setPercentageOfOutsourcing(Long percentageOfOutsourcing) {
        this.percentageOfOutsourcing = percentageOfOutsourcing;
    }

    public String getEmployerOperations() {
        return employerOperations;
    }

    public void setEmployerOperations(String employerOperations) {
        this.employerOperations = employerOperations;
    }

    public String getIndustrialUser() {
        return industrialUser;
    }

    public void setIndustrialUser(String industrialUser) {
        this.industrialUser = industrialUser;
    }

    public String getGeneralSpecificationOfTheDesign() {
        return generalSpecificationOfTheDesign;
    }

    public void setGeneralSpecificationOfTheDesign(String generalSpecificationOfTheDesign) {
        this.generalSpecificationOfTheDesign = generalSpecificationOfTheDesign;
    }

    public String getThePurposeOfTheProject() {
        return thePurposeOfTheProject;
    }

    public void setThePurposeOfTheProject(String thePurposeOfTheProject) {
        this.thePurposeOfTheProject = thePurposeOfTheProject;
    }

    public String getScientificAndTechnicalBuildings() {
        return scientificAndTechnicalBuildings;
    }

    public void setScientificAndTechnicalBuildings(String scientificAndTechnicalBuildings) {
        this.scientificAndTechnicalBuildings = scientificAndTechnicalBuildings;
    }

    public String getHowImplementProject() {
        return howImplementProject;
    }

    public void setHowImplementProject(String howImplementProject) {
        this.howImplementProject = howImplementProject;
    }

    public String getHistoryOfPlan() {
        return historyOfPlan;
    }

    public void setHistoryOfPlan(String historyOfPlan) {
        this.historyOfPlan = historyOfPlan;
    }

    public String getHistoryOfStudiesAndResearch() {
        return historyOfStudiesAndResearch;
    }

    public void setHistoryOfStudiesAndResearch(String historyOfStudiesAndResearch) {
        this.historyOfStudiesAndResearch = historyOfStudiesAndResearch;
    }

    public String getHowUse() {
        return howUse;
    }

    public void setHowUse(String howUse) {
        this.howUse = howUse;
    }

    public String getDefenseNeeds() {
        return defenseNeeds;
    }

    public void setDefenseNeeds(String defenseNeeds) {
        this.defenseNeeds = defenseNeeds;
    }

    public String getWhichMilitary() {
        return whichMilitary;
    }

    public void setWhichMilitary(String whichMilitary) {
        this.whichMilitary = whichMilitary;
    }

    public String getCivilianApplications() {
        return civilianApplications;
    }

    public void setCivilianApplications(String civilianApplications) {
        this.civilianApplications = civilianApplications;
    }

    public String getImaginedDate() {
        return imaginedDate;
    }

    public void setImaginedDate(String imaginedDate) {
        this.imaginedDate = imaginedDate;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DocumentDTO documentDTO = (DocumentDTO) o;
        if (documentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DocumentDTO{" +
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
            ", project=" + getProjectId() +
            ", project='" + getProjectTitle() + "'" +
            "}";
    }

    public List<MainStepDTO> getMainSteps() {
        return mainSteps;
    }

    public void setMainSteps(List<MainStepDTO> mainSteps) {
        this.mainSteps = mainSteps;
    }

    public String getBase64() {
        return base64;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }

    public List<DocumentWordDTO> getDocumentFiles() {
        return documentFiles;
    }

    public void setDocumentFiles(List<DocumentWordDTO> documentFiles) {
        this.documentFiles = documentFiles;
    }
}
