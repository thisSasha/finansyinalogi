document.querySelectorAll('*[href^="#N"]').forEach(link => {
    link.onclick = function (e) {
        if (document.querySelector('.nav__links').classList.contains('nav__links_active')) {
            document.querySelector('.nav__links').classList.toggle('nav__links_active');
            document.querySelector('.nav__gamburger').classList.toggle('nav__gamburger_active');
        };
        document.querySelector('.nav__links').classList.remove('show');
        document.querySelector('.nav__hamburger').classList.remove('active');
        document.body.classList.remove('scrollNone');
        e.preventDefault();
        let href = this.getAttribute('href').substring(2);
        const scrollTarget = document.querySelector(href);
        console.log(document.querySelector(href));
        const topOffset = 0;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;
        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };
});



let listToJurLArray = [ // Юр лиц
    // < ['Консультации по налоговому учету и отчетности', 100], >            ПРИМЕР БЕЗ // и без <>
    ['Ведение учета УСН(численность работников 1-3)', 250],
    ['Ведение учета УСН(численность работников 4-6)', 350],
    ['Ведение учета УСН(численность работников 7-9)', 450],
    ['Ведение учета ОСН(численность работников 1-3)', 500],
    ['Ведение учета ОСН(численность работников 4-6)', 650],
    ['Ведение учета ОСН(численность работников 7-9)', 800],



];
let listToIPArray = [ // Ип
    ['Оформление документов для получения кредита', 60],
    ['Ведение учета при ОСН без учёта затрат(Вычет - 20% от дохода)', 100],
    ['Ведение учета при ОСН с учётом затрат', 180],
    ['Ведение учета при ОСН. Рознич. и оптовая торговля с товарным учётом', 240],
    ['Ведение учета при ОСН с НДС( учёт доходов и расходов )', 300],
];






let toJurLObject = listToJurLArray.map(function (i) {
    return `
        <div><p>${i[0]}</p><p>${i[1]} руб./мес.</p></div>
    `;
});
let toIPObject = listToIPArray.map(function (i) {
    return `
        <div><p>${i[0]}</p><p>${i[1]} руб./мес.</p></div>
    `;
});
toJurLObject = toJurLObject.toString();
toJurLObject.replace(',', '');
toJurLObject = toJurLObject.replace(/,/gi, '');
toIPObject = toIPObject.toString();
toIPObject.replace(',', '');
toIPObject = toIPObject.replace(/,/gi, '');
document.querySelector('.pricelist__toJurL').innerHTML = toJurLObject;
document.querySelector('.pricelist__toIP').innerHTML = toIPObject;


const navGamburger = document.querySelector('.nav__hamburger');

navGamburger.addEventListener('click', () => {
    navGamburger.classList.toggle('active');
});



let tabLinks = document.querySelectorAll(".pricelist__tab");
let tabContents = document.querySelectorAll(".pricelist__content");

tabLinks[0].classList.add('current');
tabContents[0].classList.add('current');

for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].addEventListener("click", function () {
        let tabId = this.getAttribute("data-tab");

        // remove current class from all tabs
        for (let i = 0; i < tabLinks.length; i++) {
            tabLinks[i].classList.remove("current");
        }

        // add current class to clicked tab
        this.classList.add("current");

        // remove current class from all tab contents
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove("current");
        };
        document.getElementById(tabId).classList.add("current");
    });
};





let showed = false;

document.getElementById('showMore').onclick = function (e) {
    let height = document.querySelector('.pricelist__main').scrollHeight
    if (showed) {
        document.querySelector('.pricelist__main').style.maxHeight = '180px';
        e.target.childNodes[1].innerHTML = '+';
    } else {
        document.querySelector('.pricelist__main').style.maxHeight = height + 'px';
        e.target.childNodes[1].innerHTML = '-';
    };
    showed = !showed;
};




function callRequest(phNum) {
    const text = phNum;

    //Отправляем текст в наш телеграм канал
    otpravka(token, text, chatid);
}

function otpravka(token, text, chatid) {
    const data = new FormData();
    data.append("parse_mode", "HTML");
    data.append("text", text);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatid}`);
    xhr.send(data);
    alert('Ваша заявка отправлена');

};

function copyNum(e) {
    let copied = e.target.parentNode.childNodes[0].innerHTML;
    copied = copied.replace(/\(/g, '' );
    copied = copied.replace(/\)/g, '' );
    copied = copied.replace(/\-/g, '' );
    navigator.clipboard.writeText(copied);
};

document.querySelectorAll('.fa-copy').forEach(el => {
    el.onclick = copyNum;
});

document.querySelector('form').onsubmit = function (e) {
    e.preventDefault();
    callRequest(e.target.childNodes[1].value);
    document.forms.callRequest.reset();
};


const hamburgerButton = document.querySelector('.nav__hamburger');
const navLinks = document.querySelector('.nav__links');

hamburgerButton.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    document.body.classList.toggle('scrollNone');
});
