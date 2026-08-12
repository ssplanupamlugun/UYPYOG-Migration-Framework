/**
 * Migration Upload
 */

document.addEventListener("DOMContentLoaded", function() {

    console.log("=================================");
    console.log("Migration Upload JS Loaded");
    console.log("=================================");


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const moduleCodeElement =
        document.getElementById("moduleCode");

    const fileInput =
        document.getElementById("migrationFile");

    const dropZone =
        document.getElementById("dropZone");


    const browseBtn =
        document.getElementById("browseBtn");

    const selectedFile =
        document.getElementById("selectedFile");

    const selectedFileName =
        document.getElementById("selectedFileName");

    const selectedFileSize =
        document.getElementById("selectedFileSize");

    const removeFile =
        document.getElementById("removeFile");

    const resetBtn =
        document.getElementById("resetBtn");

    const validateBtn =
        document.getElementById("validateBtn");

    const uploadStatus =
        document.getElementById("uploadStatus");

    const uploadStatusText =
        document.getElementById("uploadStatusText");

    const statusBadge =
        document.getElementById("statusBadge");


    if (!fileInput) {

        console.error(
            "ERROR: #migrationFile not found"
        );

        return;
    }


    if (!dropZone) {

        console.error(
            "ERROR: #dropZone not found"
        );

        return;
    }


    if (!browseBtn) {

        console.error(
            "ERROR: #browseBtn not found"
        );

        return;
    }


    /* =====================================================
       MODULE CODE
    ===================================================== */

    const moduleCode =
        moduleCodeElement
            ? moduleCodeElement.value
            : "";


    console.log(
        "Migration Module:",
        moduleCode
    );


    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const MAX_FILE_SIZE =
        25 * 1024 * 1024;


    const ALLOWED_EXTENSIONS =
        ["xlsx", "xls"];


    /* =====================================================
       MODULE INFORMATION
    ===================================================== */

    if (
        typeof moduleData !== "undefined"
        &&
        moduleCode
    ) {

        let moduleFound = null;


        moduleData.forEach(function(category) {

            if (
                category.modules
                &&
                Array.isArray(category.modules)
            ) {

                category.modules.forEach(
                    function(module) {

                        if (
                            module.code === moduleCode
                        ) {

                            moduleFound =
                                module;

                        }

                    }
                );

            }

        });


        if (moduleFound) {

            const moduleName =
                document.getElementById(
                    "moduleName"
                );

            const moduleDescription =
                document.getElementById(
                    "moduleDescription"
                );

            const moduleCodeDisplay =
                document.getElementById(
                    "moduleCodeDisplay"
                );

            const moduleIcon =
                document.getElementById(
                    "moduleIcon"
                );


            if (moduleName) {

                moduleName.textContent =
                    moduleFound.name;

            }


            if (moduleDescription) {

                moduleDescription.textContent =
                    moduleFound.description;

            }


            if (moduleCodeDisplay) {

                moduleCodeDisplay.textContent =
                    moduleFound.code;

            }


            if (moduleIcon) {

                moduleIcon.className =
                    "fa-solid " +
                    moduleFound.icon;

            }

        }

    }


    /* =====================================================
       BROWSE BUTTON
    ===================================================== */

    browseBtn.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            event.stopPropagation();

            console.log(
                "Browse button clicked"
            );


            fileInput.click();

        }
    );


    /* =====================================================
       DROP ZONE CLICK
    ===================================================== */

    dropZone.addEventListener(
        "click",
        function(event) {

            /*
             * Don't trigger file picker twice
             * when Browse button is clicked.
             */

            if (
                event.target === browseBtn
                ||
                browseBtn.contains(
                    event.target
                )
            ) {

                return;

            }


            console.log(
                "Drop zone clicked"
            );


            fileInput.click();

        }
    );


    /* =====================================================
       FILE SELECTED
    ===================================================== */

    fileInput.addEventListener(
        "change",
        function() {

            console.log(
                "File input changed"
            );


            if (
                fileInput.files
                &&
                fileInput.files.length > 0
            ) {

                const file =
                    fileInput.files[0];


                console.log(
                    "Selected file:",
                    file.name
                );


                handleFile(file);

            }

        }
    );


    /* =====================================================
       DRAG ENTER
    ===================================================== */

    dropZone.addEventListener(
        "dragenter",
        function(event) {

            event.preventDefault();

            event.stopPropagation();


            dropZone.classList.add(
                "drag-over"
            );

        }
    );


    /* =====================================================
       DRAG OVER
    ===================================================== */

    dropZone.addEventListener(
        "dragover",
        function(event) {

            event.preventDefault();

            event.stopPropagation();


            event.dataTransfer.dropEffect =
                "copy";


            dropZone.classList.add(
                "drag-over"
            );

        }
    );


    /* =====================================================
       DRAG LEAVE
    ===================================================== */

    dropZone.addEventListener(
        "dragleave",
        function(event) {

            event.preventDefault();

            event.stopPropagation();


            dropZone.classList.remove(
                "drag-over"
            );

        }
    );


    /* =====================================================
       DROP
    ===================================================== */

    dropZone.addEventListener(
        "drop",
        function(event) {

            event.preventDefault();

            event.stopPropagation();


            console.log(
                "File dropped"
            );


            dropZone.classList.remove(
                "drag-over"
            );


            const files =
                event.dataTransfer.files;


            if (
                files
                &&
                files.length > 0
            ) {

                const file =
                    files[0];


                console.log(
                    "Dropped file:",
                    file.name
                );


                /*
                 * Put dropped file into
                 * file input.
                 */

                try {

                    const dataTransfer =
                        new DataTransfer();


                    dataTransfer.items.add(
                        file
                    );


                    fileInput.files =
                        dataTransfer.files;

                } catch (error) {

                    console.warn(
                        "Could not assign dropped file to input",
                        error
                    );

                }


                handleFile(file);

            }

        }
    );


    /* =====================================================
       HANDLE FILE
    ===================================================== */

    function handleFile(file) {

        console.log(
            "Handling file:",
            file.name
        );


        /* ---------------------------------------------
           Extension
        --------------------------------------------- */

        const extension =
            file.name
                .split(".")
                .pop()
                .toLowerCase();


        if (
            !ALLOWED_EXTENSIONS
                .includes(extension)
        ) {

            showError(
                "Invalid File Format",
                "Please upload an XLS or XLSX file."
            );


            resetFile();

            return;

        }


        /* ---------------------------------------------
           File Size
        --------------------------------------------- */

        if (
            file.size > MAX_FILE_SIZE
        ) {

            showError(
                "File Too Large",
                "Maximum allowed file size is 25 MB."
            );


            resetFile();

            return;

        }


        /* ---------------------------------------------
           Display File
        --------------------------------------------- */

        if (selectedFileName) {

            selectedFileName.textContent =
                file.name;

        }


        if (selectedFileSize) {

            selectedFileSize.textContent =
                formatFileSize(file.size);

        }


        if (selectedFile) {

            selectedFile.style.display =
                "flex";

        }


        dropZone.style.display =
            "none";


        if (validateBtn) {

            validateBtn.disabled =
                false;

        }


        updateStatus(
            "File Ready",
            "Your file has been selected and is ready for validation.",
            "ready"
        );


        console.log(
            "File successfully selected."
        );

    }


    /* =====================================================
       FILE SIZE
    ===================================================== */

    function formatFileSize(bytes) {

        if (bytes === 0) {

            return "0 Bytes";

        }


        const sizes = [
            "Bytes",
            "KB",
            "MB",
            "GB"
        ];


        const index =
            Math.floor(
                Math.log(bytes) /
                Math.log(1024)
            );


        return (
            parseFloat(
                (
                    bytes /
                    Math.pow(
                        1024,
                        index
                    )
                ).toFixed(2)
            )
            +
            " "
            +
            sizes[index]
        );

    }


    /* =====================================================
       REMOVE FILE
    ===================================================== */

    if (removeFile) {

        removeFile.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                event.stopPropagation();


                resetFile();

            }
        );

    }


    /* =====================================================
       RESET
    ===================================================== */

    if (resetBtn) {

        resetBtn.addEventListener(
            "click",
            function() {

                resetFile();

            }
        );

    }


    function resetFile() {

        fileInput.value = "";


        if (selectedFile) {

            selectedFile.style.display =
                "none";

        }


        dropZone.style.display =
            "flex";


        if (validateBtn) {

            validateBtn.disabled =
                true;

        }


        updateStatus(
            "Ready to Upload",
            "Select an Excel file to begin the migration process.",
            "idle"
        );

    }


	/* =====================================================
	   VALIDATE BUTTON
	===================================================== */

	validateBtn.addEventListener(
	    "click",
	    async function () {

	        console.log("=================================");
	        console.log("VALIDATE BUTTON CLICKED");
	        console.log("=================================");


	        /* ---------------------------------------------
	           Check file
	        --------------------------------------------- */

	        if (
	            !fileInput.files ||
	            fileInput.files.length === 0
	        ) {

	            console.log("NO FILE SELECTED");

	            alert("Please select an Excel file first.");

	            return;
	        }


	        const file =
	            fileInput.files[0];


	        console.log(
	            "File:",
	            file.name
	        );

	        console.log(
	            "File size:",
	            file.size
	        );


	        /* ---------------------------------------------
	           Get module
	        --------------------------------------------- */

	        const moduleElement =
	            document.getElementById("moduleCode");


	        if (!moduleElement) {

	            console.error(
	                "moduleCode element NOT FOUND"
	            );

	            alert(
	                "Module code element is missing."
	            );

	            return;
	        }


	        const module =
	            moduleElement.value;


	        console.log(
	            "Module:",
	            module
	        );


	        /* ---------------------------------------------
	           Show validating
	        --------------------------------------------- */

	        console.log(
	            "Updating status to validating..."
	        );


	        updateStatus(
	            "Validating File",
	            "Reading Excel file and checking its structure...",
	            "processing"
	        );


	        validateBtn.disabled = true;


	        /* ---------------------------------------------
	           FormData
	        --------------------------------------------- */

	        const formData =
	            new FormData();


	        formData.append(
	            "file",
	            file
	        );


	        console.log(
	            "FormData created"
	        );


	        /* ---------------------------------------------
	           API URL
	        --------------------------------------------- */

	        const url =
	            "/migration/validate/"
	            + encodeURIComponent(module);


	        console.log(
	            "Calling API:",
	            url
	        );


	        try {

	            console.log(
	                "Sending request..."
	            );


	            const response =
	                await fetch(
	                    url,
	                    {
	                        method: "POST",
	                        body: formData
	                    }
	                );


	            console.log(
	                "HTTP Status:",
	                response.status
	            );


	            console.log(
	                "HTTP OK:",
	                response.ok
	            );


	            const responseText =
	                await response.text();


	            console.log(
	                "Raw Response:",
	                responseText
	            );


	            if (!response.ok) {

	                throw new Error(
	                    "Server returned HTTP "
	                    + response.status
	                    + ": "
	                    + responseText
	                );

	            }


	            let result;


	            try {

	                result =
	                    JSON.parse(responseText);

	            } catch (jsonError) {

	                console.error(
	                    "Invalid JSON response:",
	                    jsonError
	                );

	                throw new Error(
	                    "Server did not return valid JSON."
	                );

	            }


	            console.log(
	                "Validation Result:",
	                result
	            );


	            /* -----------------------------------------
	               VALID
	            ----------------------------------------- */

	            if (result.valid === true) {

	                console.log(
	                    "VALIDATION SUCCESS"
	                );


	                updateStatus(
	                    "File Valid",
	                    "Excel file passed validation and is ready for migration.",
	                    "success"
	                );


	                showValidationSuccess(
	                    result
	                );


	                const processBtn =
	                    document.getElementById(
	                        "processBtn"
	                    );


	                if (processBtn) {

	                    processBtn.disabled =
	                        false;

	                }


	            }

	            /* -----------------------------------------
	               INVALID
	            ----------------------------------------- */

	            else {

	                console.log(
	                    "VALIDATION FAILED"
	                );


	                console.log(
	                    "Errors:",
	                    result.errors
	                );


	                updateStatus(
	                    "Validation Failed",
	                    "Please correct the errors before continuing.",
	                    "error"
	                );


	                showValidationErrors(
	                    result.errors || [
	                        "File validation failed."
	                    ]
	                );

	            }


	        } catch (error) {

	            console.error(
	                "================================="
	            );

	            console.error(
	                "VALIDATION API ERROR"
	            );

	            console.error(
	                error
	            );

	            console.error(
	                "================================="
	            );


	            updateStatus(
	                "Validation Failed",
	                error.message ||
	                    "Unable to validate the file.",
	                "error"
	            );


	        } finally {

	            validateBtn.disabled =
	                false;

	        }

	    }
	);

    /* =====================================================
       VALIDATION SUCCESS
    ===================================================== */

    function showValidationSuccess(result) {

        const container =
            document.getElementById(
                "validationResult"
            );

        if (!container) {
            return;
        }

        container.innerHTML = `

	        <div class="validation-success">

	            <div class="validation-icon">

	                <i class="fa-solid fa-circle-check"></i>

	            </div>

	            <div class="validation-content">

	                <strong>
	                    File validation successful
	                </strong>

	                <span>
	                    ${result.totalRows}
	                    data row(s) found.
	                    Your file is ready for migration.
	                </span>

	            </div>

	        </div>

	    `;

        container.style.display =
            "block";
    }


    /* =====================================================
       VALIDATION ERRORS
    ===================================================== */

    function showValidationErrors(errors) {

        const container =
            document.getElementById(
                "validationResult"
            );

        if (!container) {
            return;
        }

        let errorHtml = "";

        errors.forEach(function(error) {

            errorHtml += `

	            <li>

	                <i class="fa-solid fa-circle-exclamation"></i>

	                ${escapeHtml(error)}

	            </li>

	        `;

        });

        container.innerHTML = `

	        <div class="validation-error">

	            <div class="validation-icon">

	                <i class="fa-solid fa-triangle-exclamation"></i>

	            </div>

	            <div class="validation-content">

	                <strong>
	                    File validation failed
	                </strong>

	                <ul>
	                    ${errorHtml}
	                </ul>

	            </div>

	        </div>

	    `;

        container.style.display =
            "block";
    }


    /* =====================================================
       HTML ESCAPE
    ===================================================== */

    function escapeHtml(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       STATUS
    ===================================================== */

	function updateStatus(
	    title,
	    message,
	    state
	) {

	    console.log(
	        "STATUS:",
	        title,
	        message,
	        state
	    );


	    if (uploadStatus) {

	        uploadStatus.textContent =
	            title;

	    } else {

	        console.warn(
	            "#uploadStatus not found"
	        );

	    }


	    if (uploadStatusText) {

	        uploadStatusText.textContent =
	            message;

	    } else {

	        console.warn(
	            "#uploadStatusText not found"
	        );

	    }


	    if (statusBadge) {

	        statusBadge.className =
	            "status-badge " + state;


	        statusBadge.innerHTML = `
	            <span></span>
	            ${capitalize(state)}
	        `;

	    } else {

	        console.warn(
	            "#statusBadge not found"
	        );

	    }

	}


    /* =====================================================
       CAPITALIZE
    ===================================================== */

    function capitalize(value) {

        return (
            value.charAt(0).toUpperCase()
            +
            value.slice(1)
        );

    }


    /* =====================================================
       ERROR
    ===================================================== */

    function showError(
        title,
        message
    ) {

        updateStatus(
            title,
            message,
            "error"
        );


        console.error(
            title + ": " + message
        );

    }

});