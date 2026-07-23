document.addEventListener("DOMContentLoaded", () => {
    renderSkills();
    renderProjects("projectsContainer", 3);
    renderProjects("allProjectsContainer");
    renderCertificates();
});

function renderSkills(){
    const container = document.getElementById("skillsContainer");
    if(!container || typeof skills === "undefined") return;
    container.innerHTML = skills.map(skill => `<span class="skill-badge">${skill}</span>`).join("");
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
                    <a href="${project.link}" target="_blank" class="btn btn-outline-primary">View Project <i class="bi bi-arrow-up-right ms-1"></i></a>
                </div>
            </div>
        </div>
    `).join("");
}

function renderCertificates(){
    const container = document.getElementById("certificatesContainer");
    if(!container || typeof certificates === "undefined") return;
    container.innerHTML = certificates.map(cert => `
        <div class="col-lg-4 col-md-6">
            <div class="card card-custom certificate-card h-100">
                <div class="card-body p-4">
                    <h5 class="fw-bold">${cert.title}</h5>
                    <p class="text-secondary mb-3">${cert.issuer}</p>
                    <a href="${cert.link}" target="_blank" class="btn btn-outline-dark"><i class="bi bi-patch-check me-2"></i>Verify</a>
                    <a href="${cert.certImg}" target="_blank" class="btn btn-outline-dark"><i class="bi bi-patch-check me-2"></i>Image</a>
                </div>
            </div>
        </div>
    `).join("");
}
