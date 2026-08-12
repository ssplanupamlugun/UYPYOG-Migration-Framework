package org.egov.finance.migration.common.entity;


import java.time.LocalDateTime;

import org.egov.finance.migration.common.enums.JobStatus;
import org.egov.finance.migration.common.enums.MigrationType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "migration_job")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MigrationJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String jobId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MigrationType migrationType;

    @Column(nullable = false)
    private String tenantId;

    private String fileName;

    private String uploadedBy;

    private Integer totalRecords;

    private Integer successRecords;

    private Integer failedRecords;

    private Integer skippedRecords;

    @Enumerated(EnumType.STRING)
    private JobStatus status;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

}
