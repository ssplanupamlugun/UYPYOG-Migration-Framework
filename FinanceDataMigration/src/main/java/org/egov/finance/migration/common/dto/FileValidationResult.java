package org.egov.finance.migration.common.dto;

import java.util.ArrayList;
import java.util.List;

public class FileValidationResult {

	private boolean valid;

	private String moduleCode;

	private String fileName;

	private int totalRows;

	private List<String> errors = new ArrayList<>();

	private List<String> warnings = new ArrayList<>();

	public FileValidationResult() {
	}

	public FileValidationResult(boolean valid, String moduleCode) {
		this.valid = valid;
		this.moduleCode = moduleCode;
	}

	public boolean isValid() {
		return valid;
	}

	public void setValid(boolean valid) {
		this.valid = valid;
	}

	public String getModuleCode() {
		return moduleCode;
	}

	public void setModuleCode(String moduleCode) {
		this.moduleCode = moduleCode;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public int getTotalRows() {
		return totalRows;
	}

	public void setTotalRows(int totalRows) {
		this.totalRows = totalRows;
	}

	public List<String> getErrors() {
		return errors;
	}

	public void setErrors(List<String> errors) {
		this.errors = errors;
	}

	public List<String> getWarnings() {
		return warnings;
	}

	public void setWarnings(List<String> warnings) {
		this.warnings = warnings;
	}
}