const params =
    new URLSearchParams(
        window.location.search
    );

const projectId =
    params.get("id");

const project =
    projects.find(
        p => p.id === projectId
    );

const container =
    document.getElementById(
        "projectDetailContainer"
    );

if (project) {

    container.innerHTML = `

        <div class="card card-custom p-4">

            <h2>
                ${project.title}
            </h2>

            <p class="text-secondary">
                ${project.description}
            </p>

            <ol class="list-group list-group-flush list-group-numbered">
                
                ${project.desc_list
                    .map(
                        desc_list => `
                                <li
                                class="list-group-item border-0">
                                    ${desc_list}
                                </li>
                            `
                    ).join("")
                }
                        
            </ol>
            
            </br>
            
            <p class="text-danger">
                ${project.notes
                    .map(
                        notes => `
                                <li
                                class="list-group-item border-0 text-danger">
                                    ${notes}
                                </li>
                            `
                    ).join("")
                }
            </p>

            <div class="ratio ratio-16x9 mb-4">

               
                <div class="mb-4">

                    <div class="ratio ratio-16x9">

                        ${project.youtube
                            .map(
                                item => {
                                    if (!item.url || item.url.trim() === "") { return ""; }

                                    return `                    
                                            <iframe
                                                src ="${item.url}"
                                                title="${item.title}"
                                                allowfullscreen >
                                                </iframe>
                                            `
                                }).join("")
                        }

                    </div>

                </div>

            </div>
            
            <section id="skill_used" class="container">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                    <h4 class="section-title mb-0"> Skills | Tools | Technology used </h4>
                </div>

                <div class="mb-4">
                
                ${project.technologies
                    .map(
                        tech => `
                                <span
                                class="tech-pill">
                                    ${tech}
                                </span>
                            `
                    ).join("")
                }

                </div>

                <div class="mb-4">
                    
                    ${project.platform_and_tools
                        .map(
                            tool => `
                                        <span
                                        class="tech-pill">
                                            ${tool}
                                        </span>
                                    `
                        ).join("")
                    }

                </div>

            </section>

            <section id="skill_used" class="container">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                    <h4 class="section-title mb-0"> Github Repository </h4>
                </div>
            <div class="d-flex gap-2">
                ${project.github
                    .map(
                        item => {
                            if (!item.link || item.link.trim() === "") { return ""; }

                            return `
                            
                                <a
                                    href="${item.link}"
                                    target="_blank"
                                    class="btn btn-outline-dark btn-md  ${item.link !== "" ? 'active' : ''}"
                                >

                                        <i class="bi bi-github"></i>

                                        ${item.title} 

                                </a>
                                `
                        }).join("")
                }
                

            </div>
             </section>

        </div>

    `;
}