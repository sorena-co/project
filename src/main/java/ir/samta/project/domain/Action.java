package ir.samta.project.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Action.
 */
@Entity
@Table(name = "action")
@Document(indexName = "action")
public class Action implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "do_percent")
    private Boolean doPercent;

    @Column(name = "final_percent")
    private Boolean finalPercent;

    @Column(name = "start_date")
    private ZonedDateTime startDate;

    @Column(name = "finish_date")
    private ZonedDateTime finishDate;

    @Column(name = "reason_of_delay")
    private String reasonOfDelay;

    @Column(name = "is_finish")
    private Boolean isFinish;

    @ManyToOne
    @JsonIgnoreProperties("actions")
    private Phase phase;

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

    public Action title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean isDoPercent() {
        return doPercent;
    }

    public Action doPercent(Boolean doPercent) {
        this.doPercent = doPercent;
        return this;
    }

    public void setDoPercent(Boolean doPercent) {
        this.doPercent = doPercent;
    }

    public Boolean isFinalPercent() {
        return finalPercent;
    }

    public Action finalPercent(Boolean finalPercent) {
        this.finalPercent = finalPercent;
        return this;
    }

    public void setFinalPercent(Boolean finalPercent) {
        this.finalPercent = finalPercent;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public Action startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public Action finishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public String getReasonOfDelay() {
        return reasonOfDelay;
    }

    public Action reasonOfDelay(String reasonOfDelay) {
        this.reasonOfDelay = reasonOfDelay;
        return this;
    }

    public void setReasonOfDelay(String reasonOfDelay) {
        this.reasonOfDelay = reasonOfDelay;
    }

    public Boolean isIsFinish() {
        return isFinish;
    }

    public Action isFinish(Boolean isFinish) {
        this.isFinish = isFinish;
        return this;
    }

    public void setIsFinish(Boolean isFinish) {
        this.isFinish = isFinish;
    }

    public Phase getPhase() {
        return phase;
    }

    public Action phase(Phase phase) {
        this.phase = phase;
        return this;
    }

    public void setPhase(Phase phase) {
        this.phase = phase;
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
        Action action = (Action) o;
        if (action.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), action.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Action{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", doPercent='" + isDoPercent() + "'" +
            ", finalPercent='" + isFinalPercent() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", reasonOfDelay='" + getReasonOfDelay() + "'" +
            ", isFinish='" + isIsFinish() + "'" +
            "}";
    }
}
