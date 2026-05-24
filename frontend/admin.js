/* ================= AUTH CHECK ================= */

const isLoggedIn =
localStorage.getItem(

    "adminLoggedIn"
);

if(!isLoggedIn){

    window.location.href =
    "admin-login.html";
}
/* ================= FETCH MESSAGES ================= */

async function fetchMessages() {

    try {

        const response =
        await fetch("http://localhost:5000/messages");

        const messages =
        await response.json();

        const container =
        document.getElementById("messages-container");

        container.innerHTML = "";

        messages.forEach((msg) => {

            container.innerHTML += `

                <div class="message-card">

                    <h3>${msg.name}</h3>

                    <p><strong>Email:</strong> ${msg.email}</p>

                    <p>${msg.message}</p>

                </div>

            `;

        });

    } catch (error) {

        console.log(error);
    }

}

fetchMessages();

/* ================= ADD PROJECT ================= */

const projectForm =
document.getElementById("project-form");

projectForm.addEventListener(

    "submit",

    async (e) => {

        e.preventDefault();

        const inputs =
        projectForm.querySelectorAll(

            "input, textarea"
        );

        const data = {

            title: inputs[0].value,

            description: inputs[1].value,

            image: inputs[2].value,

            github: inputs[3].value,

            live_demo: inputs[4].value

        };

        try {

            const response =
            await fetch(

                "http://localhost:5000/add-project",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                        "application/json"

                    },

                    body: JSON.stringify(data)

                }

            );

            const result =
            await response.text();

            alert(result);

            projectForm.reset();

            fetchProjects();

        } catch (error) {

            console.log(error);
        }

    }

);

/* ================= FETCH PROJECTS ================= */

async function fetchProjects() {

    try {

        const response =
        await fetch(

            "http://localhost:5000/projects"
        );

        const projects =
        await response.json();

        const container =
        document.getElementById(

            "projects-container"
        );

        container.innerHTML = "";

        projects.forEach((project) => {

            container.innerHTML += `

                <div class="message-card">

                    <img
                    src="${project.image}"
                    alt="project"
                    style="
                    width:100%;
                    border-radius:15px;
                    margin-bottom:15px;
                    ">

                    <h3>${project.title}</h3>

                    <p>${project.description}</p>

                    <div
                    style="
                    display:flex;
                    gap:15px;
                    margin-top:15px;
                    ">

                        <a
                        href="${project.github}"
                        target="_blank">

                            GitHub

                        </a>

                        <a
                        href="${project.live_demo}"
                        target="_blank">

                            Live Demo

                        </a>

                    </div>

                    <button
                    onclick="deleteProject(${project.id})">

                        Delete Project

                    </button>

                </div>

            `;

        });

    } catch (error) {

        console.log(error);
    }

}

fetchProjects();

/* ================= DELETE PROJECT ================= */

async function deleteProject(id) {

    const confirmDelete =
    confirm(

        "Delete this project?"
    );

    if (!confirmDelete) return;

    try {

        const response =
        await fetch(

            `http://localhost:5000/delete-project/${id}`,

            {

                method: "DELETE"

            }

        );

        const result =
        await response.text();

        alert(result);

        fetchProjects();

    } catch (error) {

        console.log(error);
    }

}