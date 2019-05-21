package ir.samta.project.service.dto;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the Phase entity.
 */
public class PhaseDTO implements Serializable {

    private Long id;

    private String title;

    private Long percent;

    private ZonedDateTime startDate;

    private ZonedDateTime finishDate;

    private Long cost;

    private String reasonOfDelay;

    private Boolean isFinish;


    private Long projectId;

    private String projectTitle;

    private List<ActionDTO> actions = new ArrayList<>();

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

    public Long getPercent() {
        return percent;
    }

    public void setPercent(Long percent) {
        this.percent = percent;
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

    public Long getCost() {
        return cost;
    }

    public void setCost(Long cost) {
        this.cost = cost;
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

        PhaseDTO phaseDTO = (PhaseDTO) o;
        if (phaseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), phaseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PhaseDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", percent=" + getPercent() +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", cost=" + getCost() +
            ", reasonOfDelay='" + getReasonOfDelay() + "'" +
            ", isFinish='" + isIsFinish() + "'" +
            ", project=" + getProjectId() +
            ", project='" + getProjectTitle() + "'" +
            "}";
    }

    public List<ActionDTO> getActions() {
        return actions;
    }

    public void setActions(List<ActionDTO> actions) {
        this.actions = actions;
    }
}
