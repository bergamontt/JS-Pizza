const pizza_list = [
    {
        id: 1,
        icon: 'assets/images/pizza_7.jpg',
        title: "Імпреза",
        type: 'М’ясна піца',
        content: {
            meat: ['балик', 'салямі'],
            chicken: ['куриця'],
            cheese: ['сир моцарелла', 'сир рокфорд'],
            pineapple: ['ананаси'],
            additional: ['томатна паста', 'петрушка']
        },
        small_size: {
            weight: 370,
            size: 30,
            price: 99
        },
        big_size: {
            weight: 660,
            size: 40,
            price: 169
        },
        is_new: true,
        is_popular: true
    },
    {
        id: 2,
        icon: 'assets/images/pizza_2.jpg',
        title: "BBQ",
        type: 'М’ясна піца',
        content: {
            meat: ['мисливські ковбаски', 'ковбаски папероні', 'шинка'],
            cheese: ['сир домашній'],
            mushroom: ['шампінйони'],
            additional: ['петрушка', 'оливки']
        },
        small_size: {
            weight: 460,
            size: 30,
            price: 139
        },
        big_size: {
            weight: 840,
            size: 40,
            price: 199
        },
        is_popular: true
    },
    {
        id: 3,
        icon: 'assets/images/pizza_1.jpg',
        title: "Міксовий поло",
        type: 'М’ясна піца',
        content: {
            meat: ['вітчина', 'куриця копчена'],
            cheese: ['сир моцарелла'],
            pineapple: ['ананаси'],
            additional: ['кукурудза', 'петрушка', 'соус томатний']
        },
        small_size: {
            weight: 430,
            size: 30,
            price: 115
        },
        big_size: {
            weight: 780,
            size: 40,
            price: 179
        }
    },
    {
        id: 4,
        icon: 'assets/images/pizza_5.jpg',
        title: "Сициліано",
        type: 'М’ясна піца',
        content: {
            meat: ['вітчина', 'салямі'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            additional: ['перець болгарський', 'соус томатний']
        },
        small_size: {
            weight: 450,
            size: 30,
            price: 111
        },
        big_size: {
            weight: 790,
            size: 40,
            price: 169
        }
    },
    {
        id: 17,
        icon: 'assets/images/pizza_3.jpg',
        title: "Маргарита",
        type: 'Вега піца',
        content: {
            cheese: ['сир моцарелла', 'сир домашній'],
            tomato: ['помідори'],
            additional: ['базилік', 'оливкова олія', 'соус томатний']
        },
        small_size: {
            weight: 370,
            size: 30,
            price: 89
        }
    },
    {
        id: 43,
        icon: 'assets/images/pizza_6.jpg',
        title: "Мікс смаків",
        type: 'М’ясна піца',
        content: {
            meat: ['ковбаски'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            pineapple: ['ананаси'],
            additional: ['цибуля кримська', 'огірки квашені', 'соус гірчичний']
        },
        small_size: {
            weight: 470,
            size: 30,
            price: 115
        },
        big_size: {
            weight: 780,
            size: 40,
            price: 180
        }
    },
    {
        id: 90,
        icon: 'assets/images/pizza_8.jpg',
        title: "Дольче Маре",
        type: 'Морська піца',
        content: {
            ocean: ['криветки тигрові', 'мідії', 'ікра червона', 'філе червоної риби'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        big_size: {
            weight: 845,
            size: 40,
            price: 399
        }
    },
    {
        id: 6,
        icon: 'assets/images/pizza_4.jpg',
        title: "Россо Густо",
        type: 'Морська піца',
        content: {
            ocean: ['ікра червона', 'лосось копчений'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        small_size: {
            weight: 400,
            size: 30,
            price: 189
        },
        big_size: {
            weight: 700,
            size: 40,
            price: 299
        }
    }
];
//відповідає за зміну прозорості хедера при руханні вертикальним скролом
const stickyElm = document.querySelector('.heading');
const observer = new IntersectionObserver(([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1), { threshold: [1] });
observer.observe(stickyElm);
window.addEventListener('load', function () {
    for (let card of pizza_list)
        addPizzaCard(card);
    const storedData = localStorage.getItem('pizzasInCart');
    let orderList = [];
    if (storedData)
        orderList = JSON.parse(storedData);
    else
        localStorage.setItem('pizzasInCart', JSON.stringify([]));
    orderList.forEach(pizza => addPizzaToCart(pizza.card, pizza.size, pizza.amount));
    let filterSpans = document.querySelectorAll('.pizza-filter');
    for (let span of filterSpans)
        span.addEventListener('click', filter);
});
function filter(e) {
    const span = e.target;
    toggleChosenFilter(span);
    const filter = span.getAttribute("data-filter");
    document.querySelector('#pizza_list').innerHTML = '';
    let filteredPizza;
    if (filter === 'all')
        filteredPizza = pizza_list;
    if (filter === 'meat')
        filteredPizza = pizza_list.filter(pizza => pizza.content.meat);
    if (filter === 'pineapple')
        filteredPizza = pizza_list.filter(pizza => pizza.content.pineapple);
    if (filter === 'mushroom')
        filteredPizza = pizza_list.filter(pizza => pizza.content.mushroom);
    if (filter === 'seafood')
        filteredPizza = pizza_list.filter(pizza => pizza.content.ocean);
    if (filter === 'vega')
        filteredPizza = pizza_list.filter(pizza => !pizza.content.meat && !pizza.content.ocean);
    filteredPizza.forEach(pizza => addPizzaCard(pizza));
    updateNumOfAllPizza(filteredPizza.length);
}
function toggleChosenFilter(span) {
    const lastFilter = document.querySelector(".chosen-filter");
    lastFilter.setAttribute('class', 'pizza-filter');
    span.setAttribute('class', 'pizza-filter chosen-filter');
}
function updateNumOfAllPizza(amount) {
    document.querySelector('.amount-of-pizza').textContent = amount.toString();
}
function addPizzaCard(card) {
    const cardContainer = document.querySelector('#pizza_list');
    const pizzaCard = document.createElement('div');
    pizzaCard.setAttribute('class', 'col-sm-12 col-md-6 col-lg-4 pizza-container');
    const html = `<div class="thumbnail pizza-card">
        <div class="caption">
        <div class="pizza-picture"><img src="${card.icon}" class="full-pizza"></div>
            <h3 class="pizza-name">${card.title}</h3>
            <p class="pizza-type">${card.type}</p>
            <p class="pizza-ingr">${getDecription(card)}</p>
        </div>
        <section class="pizza-size-info-container">
            </section>
    </div>`;
    pizzaCard.innerHTML = html;
    setSizes(card, pizzaCard);
    setBadge(card, pizzaCard);
    cardContainer.appendChild(pizzaCard);
}
function setSizes(card, pizzaCard) {
    let html = '';
    if (card.small_size) {
        const cont = document.createElement("div");
        cont.setAttribute("class", 'pizza-size-info');
        cont.innerHTML = `<div class="cart-item-desc-container">
            <article class="cart-item-desc">
                <img src="assets/images/size-icon.svg" alt="size" />
                <span class="cart-item-size">${card.small_size.size}</span>
            </article>
            <article class="cart-item-desc">
                <img src="assets/images/weight.svg" />
                <span class="cart-item-weight">${card.small_size.weight}</span>
            </article></div>
        <span class="pizza-cost-for-size">${card.small_size.price}</span>
        <span class="money-type">грн.</span>
        <button class="btn btn-warning login-button btn-buy">Купити</button>`;
        cont.getElementsByClassName('btn-buy')[0].addEventListener('click', function () { buyPizza(card, true); });
        pizzaCard.getElementsByClassName('pizza-size-info-container')[0].appendChild(cont);
    }
    if (card.big_size) {
        const cont = document.createElement("div");
        cont.setAttribute("class", 'pizza-size-info');
        cont.innerHTML = `<div class="cart-item-desc-container">
            <article class="cart-item-desc">
                <img src="assets/images/size-icon.svg" alt="size" />
                <span class="cart-item-size">${card.big_size.size}</span>
            </article>
            <article class="cart-item-desc">
                <img src="assets/images/weight.svg" />
                <span class="cart-item-weight">${card.big_size.weight}</span>
            </article>
        </div>
        <span class="pizza-cost-for-size">${card.big_size.price}</span>
        <span class="money-type">грн.</span>
        <button class="btn btn-warning login-button btn-buy">Купити</button>`;
        cont.getElementsByClassName('btn-buy')[0].addEventListener('click', function () { buyPizza(card, false); });
        pizzaCard.getElementsByClassName('pizza-size-info-container')[0].appendChild(cont);
    }
}
function buyPizza(card, isSmall) {
    if (isInCart(card, isSmall))
        increasePizza();
    else {
        let pizzasInCart = JSON.parse(localStorage.getItem('pizzasInCart'));
        pizzasInCart.push({
            card: card,
            size: isSmall,
            amount: 1
        });
        localStorage.setItem('pizzasInCart', JSON.stringify(pizzasInCart));
        addPizzaToCart(card, isSmall, 1);
    }
}
function isInCart(card, isSmall) {
    const cartItem = document.getElementById(card.id + isSmall);
    if (cartItem)
        return true;
    return false;
}
function increasePizza() {
}
function addPizzaToCart(card, isSmall, amount) {
    const item = document.createElement("div");
    item.setAttribute("class", "cart-item");
    item.setAttribute('id', `${card.id}${isSmall}`);
    item.innerHTML = `<div class="cart-item-text-info">
    <span class="cart-item-name">${isSmall ? card.title + "(Мала)" : card.title + "(Велика)"}</span>
    <article class="cart-item-desc">
        <img src="assets/images/size-icon.svg" alt="size" />
        <span class="cart-item-size">${isSmall ? card.small_size.size : card.big_size.size}}</span>
        <img src="assets/images/weight.svg" alt="weight" />
        <span class="cart-item-weight">${isSmall ? card.small_size.weight : card.big_size.weight}</span>
    </article>
    <article class="cart-item-amount">
        <span class="cart-item-cost">${isSmall ? card.small_size.price : card.big_size.price}</span>
        <button class="decrease-button">-</button>
        <span class="cart-item-amount">${amount}</span>
        <button class="increase-button">+</button>
        <button class="delete-cart-item">×</button>
    </article></div>
    <div class="cart-item-img"><img src="${card.icon}" class="half-pizza"></div>`;
    document.querySelector(".cart-items-container").appendChild(item);
}
function setBadge(card, pizzaCard) {
    if (card.is_new || card.is_popular) {
        let badge = document.createElement('div');
        badge.setAttribute('class', `${card.is_new ? 'badge-new' : 'badge-popular'}`);
        badge.innerText = `${card.is_new ? 'Нова' : 'Популярна'}`;
        pizzaCard.getElementsByClassName('pizza-card')[0].appendChild(badge);
    }
}
function getDecription(card) {
    let content = [];
    Object.values(card.content).forEach(array => content = content.concat(array));
    let contentString = content.join(', ');
    return contentString.charAt(0).toUpperCase() + contentString.slice(1);
}
