package ir.samta.project.service;

import ir.samta.project.domain.DocumentWord;
import ir.samta.project.domain.Documents;
import ir.samta.project.domain.MainStep;
import ir.samta.project.repository.DocumentRepository;
import ir.samta.project.repository.DocumentWordRepository;
import ir.samta.project.repository.MainStepRepository;
import ir.samta.project.service.dto.DocumentDTO;
import ir.samta.project.service.mapper.DocumentMapper;
import ir.samta.project.service.mapper.DocumentWordMapper;
import ir.samta.project.service.mapper.MainStepMapper;
import org.apache.poi.xwpf.usermodel.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;


/**
 * Service Implementation for managing Document.
 */
@Service
@Transactional
public class DocumentService {

    private final Logger log = LoggerFactory.getLogger(DocumentService.class);

    private final DocumentRepository documentRepository;

    private final DocumentMapper documentMapper;


    private final MainStepMapper mainStepMapper;
    private final MainStepRepository mainStepRepository;

    private final DocumentWordRepository documentWordRepository;
    private final DocumentWordMapper documentWordMapper;

    public DocumentService(DocumentRepository documentRepository, DocumentMapper documentMapper, MainStepMapper mainStepMapper, MainStepRepository mainStepRepository, DocumentWordRepository documentWordRepository, DocumentWordMapper documentWordMapper) {
        this.documentRepository = documentRepository;
        this.documentMapper = documentMapper;
        this.mainStepMapper = mainStepMapper;
        this.mainStepRepository = mainStepRepository;
        this.documentWordRepository = documentWordRepository;
        this.documentWordMapper = documentWordMapper;
    }

    /**
     * Save a document.
     *
     * @param documentDTO the entity to save
     * @return the persisted entity
     */
    public DocumentDTO save(DocumentDTO documentDTO) throws IOException {
        log.debug("Request to save Document : {}", documentDTO);
        Documents document = documentMapper.toEntity(documentDTO);
        document = documentRepository.save(document);
        DocumentDTO result = documentMapper.toDto(document);

        List<MainStep> mainSteps = mainStepMapper.toEntity(documentDTO.getMainSteps());
        for (MainStep mainStep : mainSteps) {
            mainStep.setDocument(document);
        }
        mainStepRepository.saveAll(mainSteps);
        createWordFile(document);
        return result;
    }

    /**
     * Get all the documents.
     *
     * @param projectId
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DocumentDTO> findAll(Long projectId) {
        log.debug("Request to get all Documents");
        List<Documents> documents = documentRepository.findAllByProject_Id(projectId);
        List<DocumentDTO> documentDTOS = documentMapper.toDto(documents);
        for (DocumentDTO document : documentDTOS) {
            document.setDocumentFiles(documentWordMapper.toDto(documentWordRepository.findAllByDocument_Id(document.getId())));
        }
        return documentDTOS;
    }


    /**
     * Get one document by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<DocumentDTO> findOne(Long id) {
        log.debug("Request to get Document : {}", id);
        return documentRepository.findById(id)
            .map(documentMapper::toDto);
    }

    /**
     * Delete the document by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Document : {}", id);
        documentRepository.deleteById(id);
    }

    public void createWordFile(Documents documents) throws IOException {
        String fileName = "/home/mohammad/Downloads/13-page1.docx.docx";
        InputStream fis = new FileInputStream(fileName);
        XWPFDocument document = new XWPFDocument(fis);
        replaceWord(document, "title", documents.getTitle());
        replaceWord(document, "protectiveClassification", documents.getProtectiveClassification());
        replaceWord(document, "persianTitle", documents.getPersianTitle());
        replaceWord(document, "foreignTitle", documents.getForeignTitle());
        replaceWord(document, "foreignTitle", documents.getForeignTitle());
        replaceWord(document, "planType", documents.getPlanType().toString());
        replaceWord(document, "visionOfProject", documents.getVisionOfProject());
        replaceWord(document, "detailOfProject", documents.getDetailOfProject());
        replaceWord(document, "executiveBidder", documents.getExecutiveBidder());
        replaceWord(document, "organization", documents.getOrganization());
        replaceWord(document, "industry", documents.getIndustry());
        replaceWord(document, "address", documents.getAddress());
      /*  replaceWord(document,"exportPlanDate",documentDTO.getExportPlanDate().toString());
        replaceWord(document,"executivePlanDate",documentDTO.getExecutivePlanDate().toString());
        replaceWord(document,"fromPlanDate",documentDTO.getFromPlanDate().toString());
        replaceWord(document,"toPlanDate",documentDTO.getToPlanDate().toString());*/
        replaceWord(document, "rialBudget", documents.getRialBudget().toString());
        replaceWord(document, "foreignBudget", documents.getForeignBudget().toString());
        replaceWord(document, "leaderCommand", documents.getLeaderCommand());
        replaceWord(document, "fiveYearProgram", documents.getFiveYearProgram());
        replaceWord(document, "standingApprovals", documents.getStandingApprovals());
        replaceWord(document, "approvedPattern", documents.getApprovedPattern());
        replaceWord(document, "percentageOfOutsourcing", documents.getPercentageOfOutsourcing().toString());
        replaceWord(document, "employerOperations", documents.getEmployerOperations());
        replaceWord(document, "industrialUser", documents.getIndustrialUser());
        replaceWord(document, "generalSpecificationOfTheDesign", documents.getGeneralSpecificationOfTheDesign());
        replaceWord(document, "thePurposeOfTheProject", documents.getThePurposeOfTheProject());
        replaceWord(document, "scientificAndTechnicalBuildings", documents.getScientificAndTechnicalBuildings());
        replaceWord(document, "howImplementProject", documents.getHowImplementProject());
        replaceWord(document, "historyOfPlan", documents.getHistoryOfPlan());
        replaceWord(document, "historyOfStudiesAndResearch", documents.getHistoryOfStudiesAndResearch());
        replaceWord(document, "howUse", documents.getHowUse());
        replaceWord(document, "defenseNeeds", documents.getDefenseNeeds());
        replaceWord(document, "whichMilitary", documents.getWhichMilitary());
        replaceWord(document, "civilianApplications", documents.getCivilianApplications());
        replaceWord(document, "imaginedDate", documents.getImaginedDate());

        replaceTable(document, "mainStep", "");
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        document.write(bos);

        byte[] bytes = bos.toByteArray();
        DocumentWord documentWord = new DocumentWord();
        documentWord.setDocument(documents);
        documentWord.setFile(bytes);
        documentWord.setFileContentType("applications/ms-word");
        documentWordRepository.save(documentWord);
        bos.close();

        document.close();
    }

    private void replaceWord(XWPFDocument document, String key, String value) {
        List<XWPFParagraph> paragraphs = document.getParagraphs();
        for (XWPFParagraph p : paragraphs) {
            List<XWPFRun> runs = p.getRuns();
            if (runs != null) {
                for (XWPFRun r : runs) {
                    String text = r.getText(0);
                    if (text != null && text.contains(key)) {
                        text = text.replace(key, value);
                        r.setText(text, 0);
                    }
                }
            }
        }
    }

    private void replaceTable(XWPFDocument document, String key, String value) {
        List<MainStep> all = mainStepRepository.findAll();
        List<XWPFTable> tables = document.getTables();
        XWPFTable tab = tables.get(0);
        List<XWPFTableRow> rows = tab.getRows();
        while (rows.size() > 1) {
            tab.removeRow(rows.size() - 1);
        }
        for (MainStep mainStep : all) {
            XWPFTableRow row = tab.createRow();
            row.getCell(0).setText(mainStep.getMainStep());
            row.getCell(1).setText(mainStep.getActionTitle());
            row.getCell(2).setText(mainStep.getDetailOfAction());
            row.getCell(3).setText(mainStep.getMonth().toString());
            row.getCell(4).setText(mainStep.getPercent().toString());
            row.getCell(5).setText(mainStep.getResult());

        }
    }
}
