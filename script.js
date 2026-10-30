
/* ==========================================
   T.U.C.A. - FUNCIONALIDADES DO SITE
========================================== */

/*
    AGENDA

    Para adicionar uma gira, copie um dos exemplos
    abaixo e altere as informações.

    O dia deve ter dois dígitos.
    O mês deve ser escrito por extenso.
*/

const agenda = [
    /*
    {
        dia: "30",
        mes: "Outubro",
        titulo: "Gira Mista",
        horario: "19h",
        descricao: "Atividade aberta ao público."
    },
    {
        dia: "06",
        mes: "Novembro",
        titulo: "Gira de Pretos-Velhos",
        horario: "19h",
        descricao: "Consulte as orientações da casa."
    }
    */
];


/* ==========================================
   MENU MOBILE
========================================== */

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", function () {

        const aberto = nav.classList.toggle("active");

        menuToggle.classList.toggle("active", aberto);

        menuToggle.setAttribute("aria-expanded", aberto);

        menuToggle.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );

    });

    document.querySelectorAll(".nav a").forEach(function (link) {

        link.addEventListener("click", function () {

            nav.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");

        });

    });

}


/* ==========================================
   CARREGAR A AGENDA
========================================== */

const agendaList = document.getElementById("agenda-list");

function carregarAgenda() {

    if (!agendaList) return;

    if (agenda.length === 0) {

        agendaList.innerHTML = `
            <div class="agenda-empty">
                <h3>Em breve, novas datas</h3>
                <p>
                    Nossa programação será divulgada por aqui.
                    Acompanhe também nossos comunicados no Instagram.
                </p>
            </div>
        `;

        return;
    }

    agendaList.innerHTML = "";

    agenda.forEach(function (evento) {

        const card = document.createElement("article");
        card.className = "agenda-card";

        const data = document.createElement("div");
        data.className = "agenda-date";

        const dia = document.createElement("strong");
        dia.textContent = evento.dia;

        const mes = document.createElement("span");
        mes.textContent = evento.mes;

        data.appendChild(dia);
        data.appendChild(mes);

        const info = document.createElement("div");
        info.className = "agenda-info";

        const titulo = document.createElement("h3");
        titulo.textContent = evento.titulo;

        const horario = document.createElement("p");
        horario.textContent = "Horário: " + evento.horario;

        const descricao = document.createElement("p");
        descricao.textContent = evento.descricao;

        info.appendChild(titulo);
        info.appendChild(horario);
        info.appendChild(descricao);

        card.appendChild(data);
        card.appendChild(info);

        agendaList.appendChild(card);

    });

}

carregarAgenda();


/* ==========================================
   ANO AUTOMÁTICO NO RODAPÉ
========================================== */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* ==========================================
   GALERIA - AMPLIAR FOTOGRAFIAS
========================================== */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

const galleryItems = document.querySelectorAll(".galeria-item");

function fecharGaleria() {

    if (!lightbox) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("no-scroll");

    lightboxImage.src = "";

}

galleryItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const imagem = item.querySelector("img");

        if (!imagem || !lightbox || !lightboxImage) return;

        lightboxImage.src = imagem.src;
        lightboxImage.alt = imagem.alt;

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add("no-scroll");

    });

});

if (lightboxClose) {
    lightboxClose.addEventListener("click", fecharGaleria);
}

if (lightbox) {

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            fecharGaleria();
        }

    });

}

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        fecharGaleria();
    }

});
