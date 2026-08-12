package org.egov.finance.migration.repository;

import java.util.List;

import org.egov.finance.migration.common.entity.MigrationJobDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MigrationJobDetailRepository extends JpaRepository<MigrationJobDetail, Long> {

	List<MigrationJobDetail> findByJobId(String jobId);

}