// --------------------------------------------------------- 1) ДАННЫЕ ------------------------------------------------------------------------------
import data from './data.js';





// ------------------------------------------ 2) С О З Д А Е М  С О Д Е Р Ж А Н И Е - КАРТОЧЕК ТОВАРОВ ИЗ БАЗЫ ДАННЫХ--------------------------------------------------

//1.  СОЗДАЕМ МАССИВ (createNewTag) СО СВОЙСТВАМИ-ОБЪЕКТАМИ (property), СОДЕРЖАЩИЕ: ТЕГИ И КЛАССЫ, КНОПКУ И ФУНКЦИЮ.
const createNewTag = [
    {
        newTag: 'img', class: "foto", event: {
            pressure: 'click',
            fn: (id) => () => openPicture(id)
        },

    },
    { newTag: 'h2', class: 'h2' },
    { newTag: 'p', class: "text" },
    { newTag: 'div', class: "zena" },
    // кнопка и событие и функция получение id
    {
        newTag: 'button',
        class: "addlink",
        word: "+Add to Basket",
        event: {
            pressure: 'click',
            fn: (id) => () => setBasket(id)
        }
    },
];

//2. ЗАПУСКАЕМ ЦИКЛ ПО ПОЛУЧЕННЫМ ДАННЫМ (СЕРФДОСКИ) И ЗАПУСКАЕМ ФУНКЦИЮ ПО ОБЪЕКТАМ МАССИВА (СЕРФДОСКИ)
for (let i = 0; i < data.length; i++) {
    creatSecelector(data[i]);
};

//3. СОЗДАЕМ ФУНКЦИЮ ФУНКЦИЮ ПО ОБЪЕКТАМ МАССИВА (СЕРФДОСКИ). ПРОДОЛЖАЕМ ЭТАП 2
function creatSecelector(surfboard) {

    // 1. Создаем элемент li (элемент списка в виде карточки) и присваеваем ему класс из CSS "card"
    const li = document.createElement('li');
    li.className = 'card'

    // 2. Запускаем цикл forEach по свойствам(property) 1 ЭТАПА (создание тегов)
    createNewTag.forEach(property => {
        // создаем теги и классы из 1 ЭТАПА
        const isertTag = document.createElement(property.newTag)
        isertTag.className = property.class;
        // создаем картинку
        if (property.newTag === 'img')
            isertTag.src = surfboard.img
        // создаем заголовок h2 (модель)
        if (property.class === "h2")
            isertTag.innerHTML = surfboard.model;
        // создаем описание
        if (property.class === 'text')
            isertTag.innerHTML = surfboard.specifications;
        // создаем цену
        if (property.class === 'zena')
            isertTag.innerHTML = surfboard.price + " " + "$";
        if (property.class === "addlink")
            isertTag.innerHTML = property.word;
        // создаем событие на кнопку. 
        if (property.event)
            isertTag.addEventListener(property.event.pressure, property.event.fn(surfboard.id));
        // 3. Добавляем теги на страницу с классами и событиями в cardslist (flex)
        const cardslist = document.querySelector('.cardslist');
        li.appendChild(isertTag);
        cardslist.appendChild(li);
    });
};
 // Открываем картинку
function openPicture(id) {
    const el = data.find(e => e.id === id);
    window.open(el.img);
}












// -------------------------------------------------------- 3) С О З Д А Е М --- К О Р З И Н У ----------------------------------------------------------

// ----1. ДОБАВЛЯЕМ СЕРФДОСКИ В КОРЗИНУ ПО КЛИКУ
let backetOfProducts = [];
const result = document.querySelector('.result');

// ------Функция обратный вызов newProduct
function newProduct(p, el, count) {
    return {
        id: p.id,
        model: p.model,
        price: el.price * count,
        count
    }
}

function setBasket(id) {
    //Отобразить корзину
    let backet = document.querySelector(".backet")
    backet.style.display = "block";
    // *. В аргументе функции мы получаем id сефрдосок
    result.innerHTML = "";
    // *. находит полностью объект (телефоны) по id
    const el = data.find(e => e.id === id);
    /* 1. при нажатии на кнопку, 
    находит в корзине (backetOfProducts), если есть объект с таким id
    в корзине, то вернуть undefined,
    а если нашелся то присвоить новый объект с Map.
    */
    const isExiste = backetOfProducts.find(e => e.id === el.id);
    // console.log(isExiste);
    /*3 Проверяем корзину, если объект есть, то перезаписать корзину return
    новым объектом {id, model, количество, цена}
    */
    if (isExiste) {
        backetOfProducts = backetOfProducts.map(function (p) {
            if (p.id === el.id) {
                const priceCount = p.count + 1;
                return newProduct(p, el, priceCount)
            } else
                return p
        })
    } else {
        /*2 Если undefined то добавляем объект с количеством 1,
        запускаем функцию newProduct */
        backetOfProducts.push(newProduct(el, el, 1))
    }

    // 4. Запускаем цикл - добовляет объекты сефрдосок в массив карзины
    // console.log(backetOfProducts);
    for (let i = 0; i < backetOfProducts.length; i++) {
        creatSecelectorTable(backetOfProducts[i]);
    };

    total();
};


// ----- 2. СОЗДАЕМ ТЕГИ В КОРЗИНЕ И КЛИКИ НА КНОПКИ
const createNewTagBacket = [
    { newTag: 'div', class: 'modelT' },
    { newTag: 'div', class: "amountT" },
    { newTag: 'div', class: "priceT" },
    {
        newTag: 'div',
        class: "add",
        word: "+",
        event: {
            pressure: 'click',
            fn: (id) => () => add(id)
        }
    }, 
    {
        newTag: 'div',
        class: "del",
        word: "-",
        event: {
            pressure: 'click',
            fn: (id) => () => del(id)
        }
    },
];

function creatSecelectorTable(surfTable) {
    // 1. Создаем элемент tr (элемент списка в виде карточки) и присваеваем ему класс из CSS "row"
    const div = document.createElement('div');
    div.className = 'row'
    // 2. Запускаем цикл forEach по свойствам(property) 1 ЭТАПА (создание тегов)
    createNewTagBacket.forEach(property => {
        // создаем теги и классы из 1 ЭТАПА
        const isertTag = document.createElement(property.newTag)
        isertTag.className = property.class;
        // создаем заголовок td (модель)
        if (property.class === "modelT")
            isertTag.innerHTML = surfTable.model;
        // создаем описание td(количество)
        if (property.class === 'amountT')
            isertTag.innerHTML = surfTable.count;
        // создаем цену td (price)
        if (property.class === 'priceT')
            isertTag.innerHTML = surfTable.price;
        if (property.class === "add")
            isertTag.innerHTML = property.word;
        if (property.event)
            isertTag.addEventListener(property.event.pressure, property.event.fn(surfTable.id));
        if (property.class === "del")
            isertTag.innerHTML = property.word;
        // 3. Добавляем теги на страницу с классами и событиями в table (таблица)  
        div.appendChild(isertTag);
        result.appendChild(div);
    });
};

// 3.------  ДОБАВЛЕНИЕ и УДАЛЕНИЕ элементов в КОРЗИНЕ по клику
function add(id) {
    setBasket(id)
};

function del(id) {
    result.innerHTML = "";
    // *. находит полностью объект (телефоны) по id
    const el = data.find(e => e.id === id);
    // console.log(el);
    /* 1. при нажатии на кнопку, 
    находит в корзине (backetOfProducts), если есть объект с таким id
    в корзине, то вернуть undefined,
    а если нашелся то присвоить новый объект с Map.
    */
    const isExiste = backetOfProducts.find(e => e.id === el.id);
    // console.log(isExiste);
    /*3 Проверяем корзину, если объект есть, то перезаписать корзину return
    новым объектом {id, model, количество, цена}
    */
    if (isExiste) {
        backetOfProducts = backetOfProducts.map(function (p) {
            if (p.id === el.id) {
                const priceCount = p.count - 1;
                return newProduct(p, el, priceCount)
            } else
                return p
        })
        console.log(backetOfProducts)
    } else {
        /*2 Если undefined то добавляем объект с количеством 1,
        запускаем функцию newProduct */
        backetOfProducts.push(newProduct(el, el, 1))
    }

    // 4. Запускаем цикл - добовляет объекты сефрдосок в массив карзины
    // console.log(backetOfProducts);
    for (let i = 0; i < backetOfProducts.length; i++) {
        creatSecelectorTable(backetOfProducts[i]);
    };
    total();
};

// 4. -------  ОЧИСТКА КАРЗИНЫ

let clearBasket = document.querySelector(".totalClear");
clearBasket.addEventListener("click", clearBasketFn);

function clearBasketFn() {
    // Очистить данные в корзине
    backetOfProducts.length = 0;
    result.innerHTML = "";
    result2.innerHTML = "";
}
















// ---------------------------------------------- 4) ОТПРАВКА РЕЗУЛЬТАТОВ КОРЗИНЫ В МОДАЛЬНОЕ ОКНО ЗАКАЗА ----------------------------------------

const result2 = document.querySelector(".result2");

// 5. Запускаем цикл подсчета количества и цены
let div1 = document.createElement("div");
// div1.className = "modelT";
let div2 = document.createElement("div");
// div2.className = "amountT";
let div3 = document.createElement("div");
// div3.className = "priceT";
function total() {
    result2.innerHTML = "";

    let totalCountModel = 0;
    let totalCount = 0;
    let totalPrice = 0;
    for (let i = 0; i < backetOfProducts.length; i++) {
        // Количество моделей
        totalCountModel = totalCountModel + backetOfProducts[i].count;
        // Количество
        totalCount += backetOfProducts[i].count;
        // Цена
        totalPrice += backetOfProducts[i].price;
    };
    totalCountModel = "Number of surfboards:" + totalCountModel;

    div1.innerHTML = totalCountModel;
    div2.innerHTML = totalCount;
    div3.innerHTML = totalPrice;

    result2.appendChild(div1);
    result2.appendChild(div2);
    result2.appendChild(div3);
};


// ----------------- ОФОРМЛЕНИЕ МОДАЛЬНОГО ОКНА КНОПКИ ЗАКАЗА ------------------------
const totalbutton = document.querySelector(".total");
totalbutton.addEventListener("click", buttomModal);

function buttomModal() {
    if (backetOfProducts.length > 0) {
        alert(
            `  
----------------------------------------------------------- 
                            Your order is accepted!
                            
Total:
Number of ordered surfboards: ${div2.innerHTML}.
Total cost: ${div3.innerHTML}`);

    };
};

