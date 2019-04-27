package ir.samta.project.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Phase.
 */
@Entity
@Table(name = "phase")
@Document(indexName = "phase")
public class Phase implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "jhi_percent")
    private Long percent;

    @Column(name = "start_date")
    private ZonedDateTime startDate;

    @Column(name = "finish_date")
    private ZonedDateTime finishDate;

    @Column(name = "jhi_cost")
    private Long cost;

    @Column(name = "reason_of_delay")
    private String reasonOfDelay;

    @Column(name = "is_finish")
    private Boolean isFinish;

    @ManyToOne
    @JsonIgnoreProperties("phases")
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

    public Phase title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getPercent() {
        return percent;
    }

    public Phase percent(Long percent) {
        this.percent = percent;
        return this;
    }

    public void setPercent(Long percent) {
        this.percent = percent;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public Phase startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public Phase finishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public Long getCost() {
        return cost;
    }

    public Phase cost(Long cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Long cost) {
        this.cost = cost;
    }

    public String getReasonOfDelay() {
        return reasonOfDelay;
    }

    public Phase reasonOfDelay(String reasonOfDelay) {
        this.reasonOfDelay = reasonOfDelay;
        return this;
    }

    public void setReasonOfDelay(String reasonOfDelay) {
        this.reasonOfDelay = reasonOfDelay;
    }

    public Boolean isIsFinish() {
        return isFinish;
    }

    public Phase isFinish(Boolean isFinish) {
        this.isFinish = isFinish;
        return this;
    }

    public void setIsFinish(Boolean isFinish) {
        this.isFinish = isFinish;
    }

    public Project getProject() {
        return project;
    }

    public Phase project(Project project) {
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
        Phase phase = (Phase) o;
        if (phase.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), phase.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Phase{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", percent=" + getPercent() +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", cost=" + getCost() +
            ", reasonOfDelay='" + getReasonOfDelay() + "'" +
            ", isFinish='" + isIsFinish() + "'" +
            "}";
    }
}
