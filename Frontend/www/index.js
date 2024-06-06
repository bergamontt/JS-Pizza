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
const stickyElm = document.querySelector('.heading');
const observer = new IntersectionObserver(([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1), { threshold: [1] });
observer.observe(stickyElm);
window.addEventListener('load', function () {
    for (let card of pizza_list)
        addPizzaCard(card);
});
function addPizzaCard(card) {
    const cardContainer = document.querySelector('#pizza_list');
    const pizzaCard = document.createElement('div');
    pizzaCard.setAttribute('class', 'col-sm-12 col-md-6 col-lg-4');
    const html = `<div class="thumbnail pizza-card">
        <img src="${card.icon}" class="full-pizza">
        <div class="caption">
            <h3 class="pizza-name">${card.title}</h3>
            <p class="pizza-type">${card.type}</p>
            <p class="pizza-ingr">${getDecription(card)}</p>
            <section class="pizza-size-info-container">
            </section>
        </div>
    </div>`;
    pizzaCard.innerHTML = html;
    setSizes(card, pizzaCard);
    setBadge(card, pizzaCard);
    cardContainer.appendChild(pizzaCard);
}
function setSizes(card, pizzaCard) {
    let html = '';
    if (card.small_size) {
        html += `<div class="pizza-size-info">
        <div class="cart-item-desc-container">
            <article class="cart-item-desc">
                <img src="assets/images/size-icon.svg" alt="size" />
                <span class="cart-item-size">${card.small_size.size}</span>
            </article>
            <article class="cart-item-desc">
                <img src="assets/images/weight.svg" />
                <span class="cart-item-weight">${card.small_size.weight}</span>
            </article>
        </div>
        <span class="pizza-cost-for-size">${card.small_size.price}</span>
        <span class="money-type">грн.</span>
        <button class="btn btn-warning login-button">Купити</button>
    </div>`;
    }
    if (card.big_size) {
        html += '\n' + `<div class="pizza-size-info">
        <div class="cart-item-desc-container">
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
        <button class="btn btn-warning login-button">Купити</button>
    </div>`;
    }
    pizzaCard.getElementsByClassName('pizza-size-info-container')[0].innerHTML = html;
}
function setBadge(card, pizzaCard) {
    if (card.is_new) {
        let badge = document.createElement('div');
        badge.setAttribute('class', 'badge-new');
        badge.innerText = 'Нова';
        pizzaCard.getElementsByClassName('pizza-card')[0].appendChild(badge);
    }
    else if (card.is_popular) {
        let badge = document.createElement('div');
        badge.setAttribute('class', 'badge-popular');
        badge.innerText = 'Популярна';
        pizzaCard.getElementsByClassName('pizza-card')[0].appendChild(badge);
    }
}
function getDecription(card) {
    let content = [];
    Object.values(card.content).forEach(array => content = content.concat(array));
    let contentString = content.join(', ');
    return contentString.charAt(0).toUpperCase() + contentString.slice(1);
}
