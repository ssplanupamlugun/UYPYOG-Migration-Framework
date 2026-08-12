package org.egov.finance.migration.modules.journalvoucher.service;

import org.egov.finance.migration.common.dto.MigrationRequest;
import org.egov.finance.migration.common.dto.MigrationResult;
import org.egov.finance.migration.common.enums.MigrationType;
import org.egov.finance.migration.processor.AbstractMigrationProcessor;
import org.springframework.stereotype.Service;

@Service
public class JVMigrationProcessor
        extends AbstractMigrationProcessor {

    @Override
    public MigrationType getMigrationType() {

        return MigrationType.JOURNAL_VOUCHER;

    }

    @Override
    protected MigrationResult doProcess(MigrationRequest request) {

        return MigrationResult.builder()
                .success(true)
                .message("Journal Voucher Processor Initialized")
                .build();

    }

}