var typed = new Typed(".typing", {

    strings: [

        "AIML Engineer",
        "Full Stack Developer",
        "Creative Designer",
        "AI Enthusiast",
        "Future Builder"

    ],

    typeSpeed: 80,
    backSpeed: 50,
    loop: true

});
/* ================= AOS ================= */

AOS.init({

    duration: 1000,
    once: true

});
/* ================= PARTICLES ================= */

particlesJS("particles-js", {

    particles: {

        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },

        color: {
            value: "#00f7ff"
        },

        shape: {
            type: "circle"
        },

        opacity: {
            value: 0.5
        },

        size: {
            value: 3
        },

        line_linked: {
            enable: true,
            distance: 150,
            color: "#00f7ff",
            opacity: 0.4,
            width: 1
        },

        move: {
            enable: true,
            speed: 3
        }

    },

    interactivity: {

        detect_on: "canvas",

        events: {

            onhover: {
                enable: true,
                mode: "repulse"
            },

            onclick: {
                enable: true,
                mode: "push"
            }

        }

    },

    retina_detect: true

});
/* ================= MOBILE MENU ================= */

let menu = document.getElementById("menu");

function openMenu(){

    menu.style.right = "0";
}

function closeMenu(){

    menu.style.right = "-220px";
}
/* ================= CUSTOM CURSOR ================= */

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";

    cursor.style.top = e.clientY + "px";

});
/* ================= LOADER ================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 1000);

    }, 2500);

});
/* ================= MOUSE GLOW ================= */

const glow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});
/* ================= 3D PROJECT CARDS ================= */

const cards = document.querySelectorAll(".project-card");

cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 20;
        const rotateY = (x - centerX) / 20;

        card.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
        "rotateX(0) rotateY(0)";

    });

});
/* ================= ACTIVE NAVBAR ================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;

        if(scrollY >= sectionTop - 200){

            current = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if(link.getAttribute("href") === `#${current}`){

            link.classList.add("active");
        }

    });

});
/* ================= CONTACT FORM ================= */

const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const inputs = form.querySelectorAll("input, textarea");

    const data = {

        name: inputs[0].value,

        email: inputs[1].value,

        message: inputs[2].value

    };

    try{

        const response = await fetch("http://localhost:5000/contact", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await response.text();

        alert(result);

        form.reset();

    } catch(error){

        console.log(error);

        alert("Something went wrong");

    }

});
/* ================= FETCH PROJECTS ================= */

async function fetchProjects(){

    try{

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

                <div class="project-card"
                data-aos="zoom-in">

                    <img
                    src="${project.image}"
                    alt="project">

                    <div class="project-layer">

                        <h3>
                            ${project.title}
                        </h3>

                        <p>
                            ${project.description}
                        </p>

                        <div class="project-links">

                            <a href="${project.github}"
                            target="_blank">

                                <i class="fa-brands fa-github"></i>

                            </a>

                            <a href="${project.live_demo}"
                            target="_blank">

                                <i class="fa-solid fa-up-right-from-square"></i>

                            </a>

                        </div>

                    </div>

                </div>

            `;

        });

    } catch(error){

        console.log(error);
    }

}

fetchProjects();