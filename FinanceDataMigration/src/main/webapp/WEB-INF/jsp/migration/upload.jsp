<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Migration Upload</title>
<%@ include file="../layout/head.jsp"%>
</head>

<body>

	<!-- HEADER -->

	<%@ include file="../layout/header.jsp"%>


	<!-- NAVBAR -->

	<%@ include file="../layout/navbar.jsp"%>


	<main class="migration-upload-page">


		<!-- =================================================
             PAGE HEADER
        ================================================== -->

		<section class="upload-page-header">


			<div class="upload-heading">


				<a href="<c:url value='/migration/new'/>" class="upload-back-btn">

					<i class="fa-solid fa-arrow-left"></i>

				</a>


				<div class="upload-module-icon">

					<i id="moduleIcon" class="fa-solid fa-cloud-arrow-up"></i>

				</div>


				<div>

					<div class="upload-eyebrow">

						<i class="fa-solid fa-layer-group"></i> MIGRATION WORKSPACE

					</div>


					<h1 id="moduleName">Migration</h1>


					<p id="moduleDescription">Upload and migrate your data
						securely.</p>

				</div>

			</div>


			<div class="module-code-display">

				<span>MODULE</span> <strong id="moduleCodeDisplay">
					${moduleCode} </strong>

			</div>


		</section>



		<!-- =================================================
             PROGRESS STEPS
        ================================================== -->

		<section class="migration-steps-card">


			<div class="migration-step active">

				<div class="step-circle">

					<i class="fa-solid fa-upload"></i>

				</div>

				<div class="step-content">

					<strong>Upload</strong> <span>Select file</span>

				</div>

			</div>


			<div class="step-line"></div>


			<div class="migration-step">

				<div class="step-circle">

					<i class="fa-solid fa-check-double"></i>

				</div>

				<div class="step-content">

					<strong>Validate</strong> <span>Check data</span>

				</div>

			</div>


			<div class="step-line"></div>


			<div class="migration-step">

				<div class="step-circle">

					<i class="fa-solid fa-gears"></i>

				</div>

				<div class="step-content">

					<strong>Process</strong> <span>Create records</span>

				</div>

			</div>


			<div class="step-line"></div>


			<div class="migration-step">

				<div class="step-circle">

					<i class="fa-solid fa-flag-checkered"></i>

				</div>

				<div class="step-content">

					<strong>Result</strong> <span>View summary</span>

				</div>

			</div>


		</section>



		<!-- =================================================
             MAIN CONTENT
        ================================================== -->

		<div class="upload-content-grid">


			<!-- =================================================
                 UPLOAD CARD
            ================================================== -->

			<section class="upload-card">


				<div class="card-header">


					<div class="card-title">

						<div class="card-title-icon blue">

							<i class="fa-solid fa-file-arrow-up"></i>

						</div>


						<div>

							<h3>Upload Migration File</h3>

							<p>Select an Excel file containing your migration data</p>

						</div>

					</div>


					<span class="required-badge"> <i
						class="fa-solid fa-asterisk"></i> Required

					</span>

				</div>



				<!-- DROP ZONE -->

				<div id="dropZone" class="upload-drop-zone">


					<input type="file" id="moduleCode" name="file"
						value="${moduleCode}" accept=".xlsx,.xls" hidden>


					<div class="drop-icon">

						<i class="fa-solid fa-file-excel"></i>

					</div>

					<h3>Drag & Drop your Excel file here</h3>
					<p>or click anywhere to browse from your computer</p>
					<span class="file-types"> <i class="fa-solid fa-file-excel"></i>

						XLSX / XLS <span class="dot">•</span> Maximum 25 MB

					</span>


					<button type="button" id="browseBtn" class="browse-btn">

						<i class="fa-solid fa-folder-open"></i> Browse File

					</button>

				</div>



				<!-- SELECTED FILE -->

				<div id="selectedFile" class="selected-file" style="display: none;">


					<div class="selected-file-icon">

						<i class="fa-solid fa-file-excel"></i>

					</div>


					<div class="selected-file-info">

						<strong id="selectedFileName"> file.xlsx </strong> <span
							id="selectedFileSize"> 0 KB </span>

					</div>


					<button type="button" id="removeFile" class="remove-file-btn">

						<i class="fa-solid fa-trash"></i>

					</button>

				</div>

				<div id="validationResult" class="validation-result"
					style="display: none;"></div>

				<!-- ACTIONS -->

				<div class="upload-actions">


					<a href="<c:url value='/migration/template/${moduleCode}'/>"
						id="downloadTemplate" class="template-btn"> <i
						class="fa-solid fa-download"></i> Download Template

					</a>


					<div class="primary-actions">


						<button type="button" id="resetBtn" class="reset-btn">

							<i class="fa-solid fa-rotate-left"></i> Reset

						</button>


						<button type="button" id="validateBtn" class="validate-btn"
							disabled>

							<i class="fa-solid fa-shield-check"></i> Validate File

						</button>

						<button type="button" id="processBtn" class="process-btn" disabled>

							<i class="fa-solid fa-play"></i> Process Migration

						</button>

					</div>

				</div>

			</section>



			<!-- =================================================
                 MIGRATION INFORMATION
            ================================================== -->

			<aside class="upload-side-panel">


				<!-- FILE REQUIREMENTS -->

				<div class="side-card">


					<div class="side-card-header">

						<div class="side-icon blue">

							<i class="fa-solid fa-circle-info"></i>

						</div>


						<div>

							<h4>File Requirements</h4>

							<span> Before uploading </span>

						</div>

					</div>


					<ul class="requirements-list">

						<li><i class="fa-solid fa-circle-check"></i> Excel format
							(.xlsx / .xls)</li>


						<li><i class="fa-solid fa-circle-check"></i> Maximum file
							size 25 MB</li>


						<li><i class="fa-solid fa-circle-check"></i> Use the provided
							template</li>


						<li><i class="fa-solid fa-circle-check"></i> Keep mandatory
							columns populated</li>


					</ul>

				</div>



				<!-- MIGRATION FLOW -->

				<div class="side-card">


					<div class="side-card-header">

						<div class="side-icon purple">

							<i class="fa-solid fa-route"></i>

						</div>


						<div>

							<h4>Migration Flow</h4>

							<span> What happens next? </span>

						</div>

					</div>


					<div class="flow-list">


						<div class="flow-item">

							<span class="flow-number"> 1 </span>

							<div>

								<strong> Upload </strong> <small> Select your Excel file
								</small>

							</div>

						</div>


						<div class="flow-item">

							<span class="flow-number"> 2 </span>

							<div>

								<strong> Validate </strong> <small> Check records and
									fields </small>

							</div>

						</div>


						<div class="flow-item">

							<span class="flow-number"> 3 </span>

							<div>

								<strong> Process </strong> <small> Create migration
									records </small>

							</div>

						</div>


						<div class="flow-item">

							<span class="flow-number"> 4 </span>

							<div>

								<strong> Result </strong> <small> View success and
									failures </small>

							</div>

						</div>


					</div>

				</div>

			</aside>

		</div>



		<!-- =================================================
             STATUS CARD
        ================================================== -->

		<section class="upload-status-card">


			<div class="status-left">


				<div class="status-icon idle">

					<i class="fa-solid fa-hourglass-start"></i>

				</div>


				<div>

					<strong id="uploadStatus"> Ready to Upload </strong> <span
						id="uploadStatusText"> Select an Excel file to begin the
						migration process. </span>

				</div>

			</div>


			<div class="status-badge idle" id="statusBadge">

				<span></span> Idle

			</div>

		</section>


	</main>


	<!-- FOOTER -->
	<%@ include file="../layout/foot.jsp"%>
</body>

</html>