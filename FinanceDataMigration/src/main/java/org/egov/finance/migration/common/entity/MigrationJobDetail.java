package org.egov.finance.migration.common.entity;


import java.time.LocalDateTime;

import org.egov.finance.migration.common.enums.RecordStatus;

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
@Table(name = "migration_job_detail")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MigrationJobDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String jobId;

    private Integer recordNumber;

    private Integer startRow;

    private Integer endRow;

    private String recordKey;

    @Enumerated(EnumType.STRING)
    private RecordStatus status;

    @Column(length = 2000)
    private String message;

    private Long executionTime;

    private Integer retryCount;

    private LocalDateTime processedTime;

}
