package ir.samta.project.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;


import java.io.Serializable;
import java.util.Objects;

/**
 * A MainStep.
 */
@Entity
@Table(name = "main_step")
public class MainStep implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "main_step")
    private String mainStep;

    @Column(name = "action_title")
    private String actionTitle;

    @Column(name = "detail_of_action")
    private String detailOfAction;

    @Column(name = "month")
    private Long month;

    @Column(name = "jhi_percent")
    private Long percent;

    @Column(name = "result")
    private String result;

    @ManyToOne
    @JsonIgnoreProperties("mainSteps")
    private Documents document;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMainStep() {
        return mainStep;
    }

    public MainStep mainStep(String mainStep) {
        this.mainStep = mainStep;
        return this;
    }

    public void setMainStep(String mainStep) {
        this.mainStep = mainStep;
    }

    public String getActionTitle() {
        return actionTitle;
    }

    public MainStep actionTitle(String actionTitle) {
        this.actionTitle = actionTitle;
        return this;
    }

    public void setActionTitle(String actionTitle) {
        this.actionTitle = actionTitle;
    }

    public String getDetailOfAction() {
        return detailOfAction;
    }

    public MainStep detailOfAction(String detailOfAction) {
        this.detailOfAction = detailOfAction;
        return this;
    }

    public void setDetailOfAction(String detailOfAction) {
        this.detailOfAction = detailOfAction;
    }

    public Long getMonth() {
        return month;
    }

    public MainStep month(Long month) {
        this.month = month;
        return this;
    }

    public void setMonth(Long month) {
        this.month = month;
    }

    public Long getPercent() {
        return percent;
    }

    public MainStep percent(Long percent) {
        this.percent = percent;
        return this;
    }

    public void setPercent(Long percent) {
        this.percent = percent;
    }

    public String getResult() {
        return result;
    }

    public MainStep result(String result) {
        this.result = result;
        return this;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Documents getDocument() {
        return document;
    }

    public MainStep document(Documents document) {
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
        MainStep mainStep = (MainStep) o;
        if (mainStep.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mainStep.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MainStep{" +
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
