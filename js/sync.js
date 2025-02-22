(async () => {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbw6Ng6C66jGvWL0eQiFwGxwEF0gPhhnexNFPxQx_PKoAcU71csUlNDzMs62C7jdnwcp/exec');
        if (!response.ok) {
            handleError(new Error(response.status));
            return;
        };

        const dataX = await response.json();
        dataX.shift();
        dataX.shift();

        const ip = dataX.filter(row => row[0] !== "" && row[1] !== "").map(row => [row[0], row[1]]);
        const jurl = dataX.map(row => [row[2], row[3]]);

        processData(jurl, ip);
    } catch (error) {
        handleError(new Error(error));
    };
})();

function handleError(error) {
    console.error("Ошибка:", error);
    Array.from(document.getElementsByClassName('pricelist__content')).forEach(el => {
        el.innerHTML = `<p>Ошибка: ${error.message}</p>`;
    });
};


function processData(jurl, ip) {
    let toJurLObject = jurl.map(function (i) {
        return `
            <div><p>${i[0]}</p><p>${i[1]} руб./мес.</p></div>
        `;
    });
    let toIPObject = ip.map(function (i) {
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
    document.querySelector('.pricelist__toJurL').innerHTML += `
<hr/>
<p class="pricelist__note">*Цена на услуги для каждого клиента устанавливается индивидуально</p>
`;
    document.querySelector('.pricelist__toIP').innerHTML = toIPObject;
    document.querySelector('.pricelist__toIP').innerHTML += `
<hr/>
<p class="pricelist__note">*Базовые цены определены при условиях:</p>
<ul class="pricelist__notes">
    <li>ИП имеет 1 торговое место</li>
    <li>1 КСА</li>
    <li>Осуществляет один вид деятельности</li>
    <li>В стоимость включена обработка до 20 первичных документов</li>
</ul>
<p class="pricelist__note">*Цена на услуги для каждого клиента устанавливается индивидуально</p>
`;
};