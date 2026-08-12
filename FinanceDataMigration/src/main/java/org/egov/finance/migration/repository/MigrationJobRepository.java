package org.egov.finance.migration.repository;

import org.egov.finance.migration.common.entity.MigrationJob;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MigrationJobRepository extends JpaRepository<MigrationJob, Long> {

	MigrationJob findByJobId(String jobId);

}