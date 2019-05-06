package ir.samta.project.service.dto;
import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Action entity.
 */
public class ActionDTO implements Serializable {

    private Long id;

    private String title;

    private Long doPercent;

    private Long finalPercent;

    private ZonedDateTime startDate;

    private ZonedDateTime finishDate;

    private String reasonOfDelay;

    private Boolean isFinish;


    private Long phaseId;

    private String phaseTitle;

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

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public String getReasonOfDelay() {
        return reasonOfDelay;
    }

    public void setReasonOfDelay(String reasonOfDelay) {
        this.reasonOfDelay = reasonOfDelay;
    }

    public Boolean isIsFinish() {
        return isFinish;
    }

    public void setIsFinish(Boolean isFinish) {
        this.isFinish = isFinish;
    }

    public Long getPhaseId() {
        return phaseId;
    }

    public void setPhaseId(Long phaseId) {
        this.phaseId = phaseId;
    }

    public String getPhaseTitle() {
        return phaseTitle;
    }

    public void setPhaseTitle(String phaseTitle) {
        this.phaseTitle = phaseTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ActionDTO actionDTO = (ActionDTO) o;
        if (actionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), actionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ActionDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", doPercent='" + getDoPercent() + "'" +
            ", finalPercent='" + getFinalPercent() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", reasonOfDelay='" + getReasonOfDelay() + "'" +
            ", isFinish='" + isIsFinish() + "'" +
            ", phase=" + getPhaseId() +
            ", phase='" + getPhaseTitle() + "'" +
            "}";
    }

    public Long getDoPercent() {
        return doPercent;
    }

    public void setDoPercent(Long doPercent) {
        this.doPercent = doPercent;
    }

    public Long getFinalPercent() {
        return finalPercent;
    }

    public void setFinalPercent(Long finalPercent) {
        this.finalPercent = finalPercent;
    }
}
