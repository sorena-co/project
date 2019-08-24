package ir.samta.project.service.dto;

public class FinancialProjectMainDTO {
    private Long creditEstimatesAmount;
    private Long sellContractAmount;
    private Long amountConfirmed;
    private Long receivedFromInstitution;
    private Long receivedFromOrganization;
    private Long sendToProjectHaveCode;
    private Long sendToProjectNotHaveCode;
    private Long creditApply;
    private Long sendToOtherProject;
    private Long receivedFromOtherProject;

    public Long getCreditEstimatesAmount() {
        return creditEstimatesAmount;
    }

    public void setCreditEstimatesAmount(Long creditEstimatesAmount) {
        this.creditEstimatesAmount = creditEstimatesAmount;
    }

    public Long getSellContractAmount() {
        return sellContractAmount;
    }

    public void setSellContractAmount(Long sellContractAmount) {
        this.sellContractAmount = sellContractAmount;
    }

    public Long getAmountConfirmed() {
        return amountConfirmed;
    }

    public void setAmountConfirmed(Long amountConfirmed) {
        this.amountConfirmed = amountConfirmed;
    }

    public Long getReceivedFromInstitution() {
        return receivedFromInstitution;
    }

    public void setReceivedFromInstitution(Long receivedFromInstitution) {
        this.receivedFromInstitution = receivedFromInstitution;
    }

    public Long getReceivedFromOrganization() {
        return receivedFromOrganization;
    }

    public void setReceivedFromOrganization(Long receivedFromOrganization) {
        this.receivedFromOrganization = receivedFromOrganization;
    }

    public Long getSendToProjectHaveCode() {
        return sendToProjectHaveCode;
    }

    public void setSendToProjectHaveCode(Long sendToProjectHaveCode) {
        this.sendToProjectHaveCode = sendToProjectHaveCode;
    }

    public Long getSendToProjectNotHaveCode() {
        return sendToProjectNotHaveCode;
    }

    public void setSendToProjectNotHaveCode(Long sendToProjectNotHaveCode) {
        this.sendToProjectNotHaveCode = sendToProjectNotHaveCode;
    }

    public Long getCreditApply() {
        return creditApply;
    }

    public void setCreditApply(Long creditApply) {
        this.creditApply = creditApply;
    }

    public Long getSendToOtherProject() {
        return sendToOtherProject;
    }

    public void setSendToOtherProject(Long sendToOtherProject) {
        this.sendToOtherProject = sendToOtherProject;
    }

    public Long getReceivedFromOtherProject() {
        return receivedFromOtherProject;
    }

    public void setReceivedFromOtherProject(Long receivedFromOtherProject) {
        this.receivedFromOtherProject = receivedFromOtherProject;
    }
}
