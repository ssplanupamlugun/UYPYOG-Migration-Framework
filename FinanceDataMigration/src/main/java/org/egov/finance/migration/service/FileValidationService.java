package org.egov.finance.migration.service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.egov.finance.migration.common.dto.FileValidationResult;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileValidationService {

	private static final long MAX_FILE_SIZE = 25 * 1024 * 1024;

	private static final Set<String> ALLOWED_EXTENSIONS = Set.of("xls", "xlsx");

	public FileValidationResult validate(MultipartFile file, String moduleCode) {

		FileValidationResult result = new FileValidationResult();

		result.setModuleCode(moduleCode);
		result.setFileName(file.getOriginalFilename());

		/*
		 * 1. File exists
		 */
		if (file == null || file.isEmpty()) {

			result.setValid(false);

			result.getErrors().add("Please select an Excel file.");

			return result;
		}

		/*
		 * 2. File size
		 */
		if (file.getSize() > MAX_FILE_SIZE) {

			result.setValid(false);

			result.getErrors().add("File size must not exceed 25 MB.");

			return result;
		}

		/*
		 * 3. Extension
		 */
		String fileName = file.getOriginalFilename();

		if (fileName == null || !hasValidExtension(fileName)) {

			result.setValid(false);

			result.getErrors().add("Only XLS and XLSX files are allowed.");

			return result;
		}

		/*
		 * 4. Read Excel
		 */
		try (InputStream inputStream = file.getInputStream()) {

			Workbook workbook = WorkbookFactory.create(inputStream);

			if (workbook.getNumberOfSheets() == 0) {

				result.setValid(false);

				result.getErrors().add("The Excel file does not contain any sheet.");

				workbook.close();

				return result;
			}

			Sheet sheet = workbook.getSheetAt(0);

			/*
			 * 5. Check header
			 */
			Row headerRow = sheet.getRow(0);

			if (headerRow == null) {

				result.setValid(false);

				result.getErrors().add("Excel header row is missing.");

				workbook.close();

				return result;
			}

			List<String> headers = readHeaders(headerRow);

			if (headers.isEmpty()) {

				result.setValid(false);

				result.getErrors().add("No column headers were found.");

				workbook.close();

				return result;
			}

			/*
			 * 6. Duplicate headers
			 */
			Set<String> uniqueHeaders = new HashSet<>();

			for (String header : headers) {

				if (!uniqueHeaders.add(header.toLowerCase())) {

					result.getErrors().add("Duplicate column found: " + header);
				}
			}

			/*
			 * 7. Count data rows
			 */
			int totalRows = 0;

			Iterator<Row> rows = sheet.iterator();

			if (rows.hasNext()) {
				rows.next(); // skip header
			}

			while (rows.hasNext()) {

				Row row = rows.next();

				if (!isEmptyRow(row)) {
					totalRows++;
				}
			}

			result.setTotalRows(totalRows);

			/*
			 * 8. Empty data
			 */
			if (totalRows == 0) {

				result.getErrors().add("Excel file does not contain any data rows.");
			}

			/*
			 * 9. Validate template headers
			 */
			validateAgainstTemplate(moduleCode, headers, result);

			workbook.close();

		} catch (Exception e) {

			result.setErrors(new ArrayList<>());

			result.getErrors()
					.add("Unable to read the Excel file. " + "Please make sure the file is a valid XLS/XLSX file.");

			result.setValid(false);

			return result;
		}

		result.setValid(result.getErrors().isEmpty());

		return result;
	}

	private boolean hasValidExtension(String fileName) {

		int index = fileName.lastIndexOf('.');

		if (index == -1) {
			return false;
		}

		String extension = fileName.substring(index + 1).toLowerCase();

		return ALLOWED_EXTENSIONS.contains(extension);
	}

	private List<String> readHeaders(Row headerRow) {

		List<String> headers = new ArrayList<>();

		DataFormatter formatter = new DataFormatter();

		for (Cell cell : headerRow) {

			String value = formatter.formatCellValue(cell).trim();

			if (!value.isEmpty()) {

				headers.add(value);
			}
		}

		return headers;
	}

	private boolean isEmptyRow(Row row) {

		DataFormatter formatter = new DataFormatter();

		for (Cell cell : row) {

			String value = formatter.formatCellValue(cell).trim();

			if (!value.isEmpty()) {
				return false;
			}
		}

		return true;
	}

	private void validateAgainstTemplate(String moduleCode, List<String> uploadedHeaders, FileValidationResult result) {

		/*
		 * Template header validation will be connected here.
		 *
		 * We will read the corresponding template:
		 *
		 * /migration-templates/BANK.xlsx
		 *
		 * /migration-templates/JOURNAL_VOUCHER.xlsx
		 *
		 * etc.
		 */

		// Implemented in the next step.
	}
}