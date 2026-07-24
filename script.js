document.addEventListener("DOMContentLoaded", () => {
    
    renderSkills();
    renderProjects("projectsContainer", 3);
    renderProjects("allProjectsContainer");
    renderCertificates("certificatesContainer", 3);
    renderCertificates("allCertificatesContainer");
    renderWorkHistory("workHistoryContainer", 10);

    if (document.getElementById("headerSummary")) {
          renderHeaderSummary();
    }
});

function renderHeaderSummary(containerId){
    
    //Count total Projects
    const totalProjects = projects.length;
    document.getElementById("totalProjects").textContent = totalProjects;
    document.getElementById("section_hdr_projects_btn").textContent = "See All " + "("+ totalProjects +")";

    //Count total certificates
    const totalCertificates = certificates.length;
    document.getElementById("totalCertificates").textContent = totalCertificates;
    document.getElementById("section_hdr_certificates_btn").textContent = "See All " + "("+ totalCertificates +")";


    //Count other certiicates
    const otherCertificates = certificates.filter(
        cert => !cert.issuer.includes("SAP")
    );

    const totalOtherCertificates = otherCertificates.length
    document.getElementById("totalOtherCertificates").textContent = totalOtherCertificates;      
    
    //Count SAP certificates 
    const sapCertificates = certificates.filter(
        cert => cert.issuer.includes("SAP")
    );

    const totalSAPCertificates = sapCertificates.length
    document.getElementById("totalSapCertificates").textContent = totalSAPCertificates;    


    //years of experience
    document.getElementById("totalSapExperience").textContent =
        `${getSapYearsExperience()}+`;

}

function getSapYearsExperience() {

    const sapClients = experienceData
        .filter(exp => exp.tech === "SAP")
        .flatMap(exp => exp.clientDetails);

    let totalMilliseconds = 0;

    sapClients.forEach(client => {

        const startDate = new Date(client.startDate);

        const endDate = client.endDate && client.endDate !== "null"
            ? new Date(client.endDate)
            : new Date();

        totalMilliseconds += endDate - startDate;

    });

    const totalYears =
        totalMilliseconds /
        (1000 * 60 * 60 * 24 * 365.25);

    return totalYears.toFixed(1);
}

function formatDate(dateString) {

    if (!dateString || dateString === "null") {
        return "Currently Employed";
    }

    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
    });
}

function renderSkills(){
    const container = document.getElementById("skillsContainer");
    if(!container || typeof skills === "undefined") return;
    container.innerHTML = skills.map(skill => `<span class="skill-badge">${skill}</span>`).join("");
}

function renderWorkHistory(containerId, limit){
    const container = document.getElementById(containerId);
    if(!container || typeof experienceData === "undefined") return;
    const workHistoryList = limit ? experienceData.slice(0, limit) : experienceData;
    container.innerHTML = workHistoryList.map(workHistory => { if( workHistory.hidden === "true"){ return ""; } return `
        <div class="timeline-item">
            <div class="timeline-dot">
            </div>
            <div class="card card-custom p-4">
                <div class="d-flex flex-wrap justify-content-between gap-2 text-success"> 
                    <strong> ${workHistory.company} </strong> 
                </div>

                <div class="d-flex flex-wrap justify-content-between gap-2">
                    <h4 class="mb-1">${workHistory.jobTitle}</h4>
                    <h5> 
                        <span class="badge text-bg-light">
                        ${
                            workHistory.clientDetails
                                .map(
                                    clientDetail =>
                                        `${formatDate(clientDetail.startDate)} - ${formatDate(clientDetail.endDate)}`
                                )
                                .join("")
                        }
                        </span>
                    </h5>
                </div>

                <div class="d-flex flex-wrap justify-content-between gap-2">
                    <div>
                        ${
                            workHistory.clientDetails.map(
                                clientDetail =>
                                    clientDetail.clientName.map(client => {

                                        // Hide item
                                        if (client.hidden === "true") {
                                            return "";
                                        }

                                        // Render label
                                        if (client.hidden === "false" && client.type === "label") {
                                            return `
                                                <div class="d-inline-flex">
                                                    <strong>${client.text}</strong>
                                                </div>
                                            `;
                                        }

                                        // Render badge
                                        if (client.text) {
                                            return `
                                                <div class="d-inline-flex">
                                                    <h5>
                                                        <span class="badge bg-info me-0">
                                                            ${client.text}
                                                        </span>
                                                    </h5>
                                                </div>
                                            `;
                                        }

                                        return "";
                                    }).join("")
                            ).join("")
                        }
                    </div>
                    <h5>
                        <span class="badge text-bg-light"> 
                            ${  workHistory.clientDetails.map( empType => empType.employmentType )  }
                        </span>
                    </h5>
                </div>

                <div>
                    <ul class="list-group ps-4">     
                        ${
                            workHistory.clientDetails.map(
                                clientDetail =>
                                    clientDetail.clientExperience.map(exp => {

                                        // Hide item
                                        if (exp.hidden === "true") {
                                            return "";
                                        }

                                        // Render label
                                        if (exp.hidden === "false" && exp.type === "label") {
                                            return `
                                                <div class="d-inline-flex">
                                                    <strong>${exp.text}</strong>
                                                </div>
                                            `;
                                        }

                                        // Render badge
                                        if (exp.text) {
                                            return `
                                                <li class="border-0 p-0 myListStyle text-secondary">
                                                    ${exp.text}
                                                </li>
                                            `;
                                        }

                                        return "";
                                    }).join("")
                            ).join("")
                        }                        
                    </ul>
                </div>
                
                </br>
                <div >
                    ${
                        workHistory.clientDetails.map(
                            clientDetail =>
                                clientDetail.clientModule.map(module => {

                                    // Hide item
                                    if (module.hidden === "true") {
                                        return "";
                                    }

                                    // Render label
                                    if (module.hidden === "false" && module.type === "label") {
                                        return `
                                            <div class="d-inline-flex">
                                                <strong>${module.text}</strong>
                                            </div>
                                        `;
                                    }

                                    // Render badge
                                    if (module.text) {
                                        return `
                                            <div class="d-inline-flex">
                                                <h5>
                                                    <span class="badge bg-secondary me-0">
                                                        ${module.text}
                                                    </span>
                                                </h5>
                                            </div>
                                        `;
                                    }

                                    return "";
                                }).join("")
                        ).join("")
                    }

                </div>   
                
                <div>
                    <ul class="list-group ps-4">     
                        ${
                            workHistory.clientDetails.map(
                                clientDetail =>
                                    clientDetail.achievements.map(achievement => {

                                        // Hide item
                                        if (achievement.hidden === "true") {
                                            return "";
                                        }

                                        // Render label
                                        if (achievement.hidden === "false" && achievement.type === "label") {
                                            return `
                                                <div class="d-inline-flex">
                                                    <strong>${achievement.text}</strong>
                                                </div>
                                            `;
                                        }

                                        // Render badge
                                        if (achievement.text) {
                                            return `
                                                <li class="border-0 p-0 myListStyle text-secondary">
                                                    ${achievement.text}
                                                </li>
                                            `;
                                        }

                                        return "";
                                    }).join("")
                            ).join("")
                        }                        
                    </ul>
                </div>

            </div>
        </div>
    `}).join("");
}

function renderProjects(containerId, limit){
    const container = document.getElementById(containerId);
    if(!container || typeof projects === "undefined") return;
    const projectList = limit ? projects.slice(0, limit) : projects;
    container.innerHTML = projectList.map(project => `
        <div class="col-lg-4 col-md-6">
            <div class="card card-custom project-card h-100">
                <div class="card-body p-4">
                    <div class="project-icon"><i class="bi ${project.icon}"></i></div>
                    <h5 class="fw-bold">${project.title}</h5>
                    <p class="text-secondary">${project.description}</p>
                    <div class="mb-3">${project.technologies.map(tech => `<span class="tech-pill">${tech}</span>`).join("")}</div>
                    <a href="project-details.html?id=${project.id}" target="_blank" class="btn btn-outline-primary">View Project <i class="bi bi-arrow-up-right ms-1"></i></a>
                </div>
            </div>
        </div>
    `).join("");
}

function renderCertificates(containerId, limit){
    const container = document.getElementById(containerId);
    if(!container || typeof certificates === "undefined") return;
    let certificateList = limit ? certificates.slice(0, limit) : certificates;
    if(containerId != "allCertificatesContainer"){
        certificateList = certificates.filter(cert => cert.featured === "X");
        certificateList = limit ? certificateList.slice(0, limit) : certificateList;
    }
    container.innerHTML = certificateList.map(cert => `
        <div class="col-lg-4 col-md-6">
            <div class="card card-custom certificate-card h-100">
                <div class="card-body p-4">
                    <h5 class="fw-bold">${cert.title}</h5>
                    <p class="text-secondary mb-3">${cert.certType} | ${cert.issuer} </p>
                    ${
                        cert.link?.trim() ? `
                        <a href="${cert.link}" 
                            target="_blank" 
                            class="btn btn-outline-dark">

                            <i class="bi bi-patch-check me-2"></i>

                           Verify
                        </a>
                    ` : ""
                    }

                    ${
                        cert.certImg?.trim() ? `
                        <a href="${cert.certImg}" 
                            target="_blank" 
                            class="btn btn-outline-dark">

                            <i class="bi bi-file-earmark-image"></i>

                            Image
                        </a>
                    ` : ""
                    }                    
                    
                </div>
            </div>
        </div>
    `).join("");
}
