package ir.samta.project.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the MainStep entity.
 */
public class MainStepDTO implements Serializable {

    private Long id;

    private String mainStep;

    private String actionTitle;

    private String detailOfAction;

    private Long month;

    private Long percent;

    private String result;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMainStep() {
        return mainStep;
    }

    public void setMainStep(String mainStep) {
        this.mainStep = mainStep;
    }

    public String getActionTitle() {
        return actionTitle;
    }

    public void setActionTitle(String actionTitle) {
        this.actionTitle = actionTitle;
    }

    public String getDetailOfAction() {
        return detailOfAction;
    }

    public void setDetailOfAction(String detailOfAction) {
        this.detailOfAction = detailOfAction;
    }

    public Long getMonth() {
        return month;
    }

    public void setMonth(Long month) {
        this.month = month;
    }

    public Long getPercent() {
        return percent;
    }

    public void setPercent(Long percent) {
        this.percent = percent;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MainStepDTO mainStepDTO = (MainStepDTO) o;
        if (mainStepDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mainStepDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MainStepDTO{" +
            "id=" + getId() +
            ", mainStep='" + getMainStep() + "'" +
            ", actionTitle='" + getActionTitle() + "'" +
            ", detailOfAction='" + getDetailOfAction() + "'" +
            ", month=" + getMonth() +
            ", percent=" + getPercent() +
            ", result='" + getResult() + "'" +
            "}";
    }
}
