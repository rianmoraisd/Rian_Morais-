function responder(tipo) {

    const messages = document.getElementById("messages");

    if (!messages) return;

    let pergunta = "";
    let resposta = "";

    if (tipo === "preco") {

        pergunta = "Quanto custa?";

        resposta =
            "Temos planos a partir de R$ 99 por mês. 😊";

    }

    if (tipo === "horario") {

        pergunta = "Qual o horário?";

        resposta =
            "Nosso atendimento funciona 24 horas por dia, 7 dias por semana.";

    }

    if (tipo === "agendamento") {

        pergunta = "Quero agendar";

        resposta =
            "Claro! Posso ajudar você a escolher o melhor horário. 📅";

    }


    messages.innerHTML += `
        <div class="message user">
            ${pergunta}
        </div>
    `;


    setTimeout(() => {

        messages.innerHTML += `
            <div class="message bot">
                ${resposta}
            </div>
        `;

        messages.scrollTop = messages.scrollHeight;

    }, 500);

}


/* LOGIN */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value;

        const senha =
            document.getElementById("senha").value;


        if (!email || !senha) {

            alert("Preencha seu e-mail e senha.");

            return;
        }


        /*
            Nesta primeira versão,
            o login é apenas uma demonstração.

            Depois podemos conectar
            o login ao Supabase.
        */

        window.location.href = "painel.html";

    });

}


/* CADASTRO */

const cadastroForm =
    document.getElementById("cadastroForm");

if (cadastroForm) {

    cadastroForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            alert(
                "Cadastro criado! Agora você poderá entrar na sua conta."
            );

            window.location.href = "login.html";

        }
    );

}