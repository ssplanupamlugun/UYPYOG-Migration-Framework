package org.egov.finance.migration.controller;

import org.egov.finance.migration.common.dto.MigrationRequest;
import org.egov.finance.migration.common.dto.MigrationResult;
import org.egov.finance.migration.factory.MigrationProcessorFactory;
import org.egov.finance.migration.processor.MigrationProcessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/migration")
public class MigrationController {

	private final MigrationProcessorFactory factory;

	public MigrationController(MigrationProcessorFactory factory) {

		this.factory = factory;

	}

	@PostMapping("/process")
	public MigrationResult process(MigrationRequest request) {

		MigrationProcessor processor = factory.getProcessor(request.getMigrationType());

		return processor.process(request);

	}

}