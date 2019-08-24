package ir.samta.project.service;

import ir.samta.project.domain.FinancialProject;
import ir.samta.project.domain.Project;
import ir.samta.project.domain.enumeration.FinancialProjectType;
import ir.samta.project.repository.FinancialProjectRepository;
import ir.samta.project.repository.ProjectRepository;
import ir.samta.project.service.dto.FinancialProjectDTO;
import ir.samta.project.service.dto.FinancialProjectMainDTO;
import ir.samta.project.service.dto.FinancialProjectTypeExistDTO;
import ir.samta.project.service.mapper.FinancialProjectMapper;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


/**
 * Service Implementation for managing FinancialProject.
 */
@Service
@Transactional
public class FinancialProjectService {

    private final Logger log = LoggerFactory.getLogger(FinancialProjectService.class);

    private final FinancialProjectRepository financialProjectRepository;

    private final FinancialProjectMapper financialProjectMapper;

    private final ProjectRepository projectRepository;

    public FinancialProjectService(FinancialProjectRepository financialProjectRepository, FinancialProjectMapper financialProjectMapper, ProjectRepository projectRepository) {
        this.financialProjectRepository = financialProjectRepository;
        this.financialProjectMapper = financialProjectMapper;
        this.projectRepository = projectRepository;
    }

    /**
     * Save a financialProject.
     *
     * @param financialProjectDTO the entity to save
     * @return the persisted entity
     */
    public FinancialProjectDTO save(FinancialProjectDTO financialProjectDTO) throws IOException {
        log.debug("Request to save FinancialProject : {}", financialProjectDTO);
        FinancialProject financialProject = financialProjectMapper.toEntity(financialProjectDTO);
        financialProject = financialProjectRepository.save(financialProject);
        FinancialProjectDTO result = financialProjectMapper.toDto(financialProject);
        createExcel(financialProject.getProject().getId());
        return result;
    }

    /**
     * Get all the financialProjects.
     *
     * @param projectId
     * @param type
     * @param pageable  the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<FinancialProjectDTO> findAll(Long projectId, FinancialProjectType type, Pageable pageable) {
        log.debug("Request to get all FinancialProjects");
        return financialProjectRepository.findAllByProject_IdAndFinancialProjectType(projectId, type, pageable)
            .map(financialProjectMapper::toDto);
    }


    /**
     * Get one financialProject by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<FinancialProjectDTO> findOne(Long id) {
        log.debug("Request to get FinancialProject : {}", id);
        return financialProjectRepository.findById(id)
            .map(financialProjectMapper::toDto);
    }

    /**
     * Delete the financialProject by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete FinancialProject : {}", id);
        financialProjectRepository.deleteById(id);
    }

    public FinancialProjectDTO findByProjectAndType(Long projectId, FinancialProjectType type) {
        return financialProjectMapper.toDto(financialProjectRepository.findFirstByProject_IdAndFinancialProjectType(projectId, type));
    }

    public Long getSumOfCostForProject(Long projectId) {
        List<FinancialProjectType> type = new ArrayList<>();
        type.add(FinancialProjectType.SEND_TO_PROJECT_HAVE_CODE);
        return financialProjectRepository.getSumOfCostForProject(projectId, type);
    }

    public FinancialProjectTypeExistDTO getStyle(Long projectId) {
        FinancialProjectTypeExistDTO result = new FinancialProjectTypeExistDTO();
        result.setExistSurplusCost(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.SURPLUS_COST));
        result.setExistSendToProjectHaveCode(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.SEND_TO_PROJECT_HAVE_CODE));
        result.setExistReceivedTotalForProject(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.RECEIVED_TOTAL_FOR_PROJECT));
        result.setExistReceivedFromOrganization(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.RECEIVED_FROM_ORGANIZATION));
        result.setExistReceivedFromInstitution(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.RECEIVED_FROM_INSTITUTION));
        result.setExistInClearing(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.IN_CLEARING));
        result.setExistFinalClearing(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.FINAL_CLEARING));
        result.setExistDebitToInstitution(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.DEBIT_TO_INSTITUTION));
        result.setExistCreditRemain(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.CREDIT_REMAIN));
        result.setExistCreditEstimates(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.CREDIT_ESTIMATES));
        result.setExistBeforeClearing(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.BEFORE_CLEARING));
        result.setExistAmountConfirmed(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.AMOUNT_CONFIRMED));
        result.setExistSellContractAmount(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.SELL_CONTRACT_AMOUNT));
        result.setExistCreditApply(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.CREDIT_APPLY));
        result.setExistSendToProjectNotHaveCode(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.SEND_TO_PROJECT_NOT_HAVE_CODE));
        result.setExistSendToOtherProject(financialProjectRepository.existsAllByProject_IdAndFinancialProjectType(projectId, FinancialProjectType.SEND_TO_OTHER_PROJECT));

        return result;
    }

    public FinancialProjectMainDTO getMainFinancialProject(Long projectId) {
        FinancialProjectMainDTO result = new FinancialProjectMainDTO();
        result.setAmountConfirmed(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.AMOUNT_CONFIRMED));
        result.setSendToProjectNotHaveCode(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.SEND_TO_PROJECT_NOT_HAVE_CODE));
        result.setSendToProjectHaveCode(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.SEND_TO_PROJECT_HAVE_CODE));
        result.setSellContractAmount(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.SELL_CONTRACT_AMOUNT));
        result.setReceivedFromOrganization(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.RECEIVED_FROM_ORGANIZATION));
        result.setReceivedFromInstitution(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.RECEIVED_FROM_INSTITUTION));
        result.setCreditEstimatesAmount(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.CREDIT_ESTIMATES));
        result.setCreditApply(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.CREDIT_APPLY));
        result.setSendToOtherProject(financialProjectRepository.getTotalSendToOtherProject(projectId));
        result.setReceivedFromOtherProject(financialProjectRepository.getTotalReceivedFromOtherProject(projectId));
        return result;
    }

    private void createExcel(Long projectId) throws IOException {
        Project project = projectRepository.getOne(projectId);

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("گزارش مالی");

        // Create a Font for styling header cells
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setFontHeightInPoints((short) 14);
        headerFont.setColor(IndexedColors.RED.getIndex());

        // Create a CellStyle with the font
        CellStyle headerCellStyle = workbook.createCellStyle();
        headerCellStyle.setFont(headerFont);


        // Create a Row
        Row headerRow = sheet.createRow(0);

        Cell cell0 = headerRow.createCell(0);
        cell0.setCellValue("مبلغ مصوب");
        cell0.setCellStyle(headerCellStyle);

        Cell cell1 = headerRow.createCell(1);
        cell1.setCellValue("جمع کل اعتبارات مصوب");
        cell1.setCellStyle(headerCellStyle);

        Cell cell2 = headerRow.createCell(2);
        cell2.setCellValue("واریز از موسسه به سازمان");
        cell2.setCellStyle(headerCellStyle);

        Cell cell3 = headerRow.createCell(3);
        cell3.setCellValue("واریز از سازمان به معاونت");
        cell3.setCellStyle(headerCellStyle);

        Cell cell4 = headerRow.createCell(4);
        cell4.setCellValue("دریافتی کل برای پروژه");
        cell4.setCellStyle(headerCellStyle);

        Cell cell5 = headerRow.createCell(5);
        cell5.setCellValue("مبلغ هزینه شده برای پروژه کد دار");
        cell5.setCellStyle(headerCellStyle);

        Cell cell6 = headerRow.createCell(6);
        cell6.setCellValue("مبلغ هزینه شده برای پروژه بدون کد");
        cell6.setCellStyle(headerCellStyle);

        Cell cell7 = headerRow.createCell(7);
        cell7.setCellValue("مازاد هزینه");
        cell7.setCellStyle(headerCellStyle);

        Cell cell8 = headerRow.createCell(8);
        cell8.setCellValue("مانده اعتبار پروژه در حساب معاونت");
        cell8.setCellStyle(headerCellStyle);

        Cell cell9 = headerRow.createCell(9);
        cell9.setCellValue("اعتبار تخصیصی");
        cell9.setCellStyle(headerCellStyle);

        Cell cell10 = headerRow.createCell(10);
        cell10.setCellValue("مبلغ قرارداد");
        cell10.setCellStyle(headerCellStyle);

        Row row = sheet.createRow(1);
        Long sendToProjectHaveCode = financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.SEND_TO_PROJECT_HAVE_CODE);
        Long receiveFromOrganization = financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.RECEIVED_FROM_ORGANIZATION);
        Long creditEstimate = financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.CREDIT_ESTIMATES);

        if (creditEstimate != null)
            row.createCell(0).setCellValue(creditEstimate);

        Long amountConfirmed = financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.AMOUNT_CONFIRMED);
        if (amountConfirmed != null)
            row.createCell(1).setCellValue(amountConfirmed);

        Long receivedFromInstitution = financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.RECEIVED_FROM_INSTITUTION);
        if (receivedFromInstitution != null)
            row.createCell(2).setCellValue(receivedFromInstitution);

        if (receiveFromOrganization != null && sendToProjectHaveCode != null) {
            row.createCell(3).setCellValue(receiveFromOrganization);
            row.createCell(4).setCellValue(receiveFromOrganization);

            row.createCell(5).setCellValue(sendToProjectHaveCode);
            row.createCell(6).setCellValue(financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.SEND_TO_PROJECT_NOT_HAVE_CODE));
            if (sendToProjectHaveCode > receiveFromOrganization) {
                row.createCell(7).setCellValue(sendToProjectHaveCode - receiveFromOrganization);
                row.createCell(8).setCellValue(0);
            } else {
                row.createCell(7).setCellValue(0);
                row.createCell(8).setCellValue(receiveFromOrganization - sendToProjectHaveCode);
            }
        }
        Long creditApply = financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.CREDIT_APPLY);
        if (creditApply != null)
            row.createCell(9).setCellValue(creditApply);

        Long sellContractAmount = financialProjectRepository.getMainFinancialProject(projectId, FinancialProjectType.SELL_CONTRACT_AMOUNT);
        if (sellContractAmount != null)
            row.createCell(10).setCellValue(sellContractAmount);

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        workbook.write(bos);
        bos.close();
        byte[] bytes = bos.toByteArray();

        project.setFile(bytes);
        project.setFileContentType("applications/ms-xlsx");

        projectRepository.save(project);
    }
}
