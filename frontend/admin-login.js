/* ================= ADMIN LOGIN ================= */

const loginForm =
document.getElementById("login-form");

loginForm.addEventListener(

    "submit",

    async (e) => {

        e.preventDefault();

        const inputs =
        loginForm.querySelectorAll("input");

        const data = {

            email: inputs[0].value,

            password: inputs[1].value

        };

        try{

            const response =
            await fetch(

                "http://localhost:5000/admin-login",

                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/json"
                    },

                    body:JSON.stringify(data)

                }

            );

            const result =
            await response.json();

            if(result.success){

                localStorage.setItem(

                    "adminLoggedIn",

                    "true"
                );

                alert(result.message);

                window.location.href =
                "admin.html";

            }

        } catch(error){

            alert(

                "Invalid Credentials"
            );

            console.log(error);
        }

    }

);