package ir.samta.project.service.dto;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the DocumentWord entity.
 */
public class DocumentWordDTO implements Serializable {

    private Long id;

    @Lob
    private byte[] file;

    private String fileContentType;

    private Long documentId;

    private String documentTitle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public String getFileContentType() {
        return fileContentType;
    }

    public void setFileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
    }

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

    public String getDocumentTitle() {
        return documentTitle;
    }

    public void setDocumentTitle(String documentTitle) {
        this.documentTitle = documentTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DocumentWordDTO documentWordDTO = (DocumentWordDTO) o;
        if (documentWordDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentWordDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DocumentWordDTO{" +
            "id=" + getId() +
            ", file='" + getFile() + "'" +
            ", document=" + getDocumentId() +
            ", document='" + getDocumentTitle() + "'" +
            "}";
    }
}
