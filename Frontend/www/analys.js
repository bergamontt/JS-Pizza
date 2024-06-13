
let CURRENT_FILTER = 'price';
let CURRENT_CHART = 'piechart';
let CURRENT_WIDTH = 550;
let CURRENT_HEIGHT = 365;

addEventListener('load', function () {
    google.charts.load('current', { 'packages': ['corechart', 'table'] });
    google.charts.setOnLoadCallback(draw);

    this.document.querySelector('.exit-button').addEventListener('click', comeback)

    const filterBtns = this.document.querySelectorAll('.filter');
    for (let btn of filterBtns)
        btn.addEventListener('click', changeFilter);

    const chartBtns = this.document.querySelectorAll('.chart');
    for (let btn of chartBtns)
        btn.addEventListener('click', swapChart);

    window.addEventListener('resize', function (event) { resizeWindow(event); }, true);
});

function draw() {
    document.getElementById("graph").innerHTML = '';

    const boughtPizza = JSON.parse(localStorage.getItem('boughtPizza'));
    const pizzaTypes = getPizzaType();
    const pizzaSizes = getPizzaSize();
    var data = new google.visualization.DataTable();

    if (CURRENT_FILTER === 'price') {
        data.addColumn('string', 'Піца');
        data.addColumn('number', 'Ціна');
        data.addRows(boughtPizza.map((pizza) => [pizza.title, pizza.price * pizza.amount]));
    } else if (CURRENT_FILTER === 'amount') {
        data.addColumn('string', 'Піца');
        data.addColumn('number', 'Кількість');
        data.addRows(boughtPizza.map((pizza) => [pizza.title, pizza.amount]));
    } else if (CURRENT_FILTER === 'type') {
        data.addColumn('string', 'Тип піци');
        data.addColumn('number', 'Кількість');
        data.addRows(pizzaTypes.map((pizza) => [pizza.type, pizza.amount]));
        document.querySelector(".shown-pizza").innerHTML = '';
        document.querySelector(".shown-pizza").style.display = 'none';
    } else if (CURRENT_FILTER = 'size') {
        data.addColumn('string', 'Розмір піци');
        data.addColumn('number', 'Кількість');
        data.addRows(pizzaSizes.map((pizza) => [pizza.type, pizza.amount]));
        document.querySelector(".shown-pizza").innerHTML = '';
        document.querySelector(".shown-pizza").style.display = 'none';
    }

    let filterText;
    if (CURRENT_FILTER === 'price') filterText = 'ціною';
    else if (CURRENT_FILTER === 'amount') filterText = 'кількістю';
    else if (CURRENT_FILTER === 'type') filterText = 'типом';
    else if (CURRENT_FILTER === 'size') filterText = 'розміром';

    var options = {
        'title': `Статистика куплених піц за ${filterText}:`,
        'width': CURRENT_WIDTH,
        'is3D': true,
        'height': CURRENT_HEIGHT
    };

    if (CURRENT_CHART === 'piechart')
        chart = new google.visualization.PieChart(document.getElementById("graph"));
    else if (CURRENT_CHART === 'barchart')
        chart = new google.visualization.BarChart(document.getElementById("graph"));
    else if (CURRENT_CHART === 'tablechart')
        chart = new google.visualization.Table(document.getElementById("graph"));
    else
        chart = new google.visualization.AreaChart(document.getElementById('graph'));

    if (CURRENT_CHART !== 'tablechart') {
        chart.draw(data, options);
    } else chart.draw(data, { showRowNumber: true, width: `${CURRENT_WIDTH}px`, height: `${CURRENT_HEIGHT}px` });

    google.visualization.events.addListener(chart, 'select', selectHandler);

    function selectHandler() {
        if (CURRENT_FILTER === 'type' || CURRENT_FILTER === 'size')
            return;
        var selectedItem = chart.getSelection()[0];
        if (selectedItem) {
            var topping = data.getValue(selectedItem.row, 0);
            const selectedPizza = boughtPizza[boughtPizza.findIndex(pizza => pizza.title === topping)];
            showSelectedPizza(selectedPizza);
        }
    }
}

function resizeWindow(event) {
    let height = window.innerHeight;
    let width = window.innerWidth;
    if (width < 596) {
        CURRENT_WIDTH = 300;
        CURRENT_HEIGHT = 250;
        google.charts.setOnLoadCallback(draw);
    } else {
        CURRENT_WIDTH = 550;
        CURRENT_HEIGHT = 365;
        google.charts.setOnLoadCallback(draw);
    }
    if (width < 867 && document.querySelector(".shown-pizza").innerHTML !== '')
        document.querySelector('body').style.height = '100%';
    else
        document.querySelector('body').style.height = '100vh';
}

function getPizzaType() {
    const boughtPizza = JSON.parse(localStorage.getItem('boughtPizza'));
    const pizzaType = [];
    for (let pizza of boughtPizza) {
        let temp = pizzaType[pizzaType.findIndex(p => p.type === pizza.type)];
        if (temp)
            temp.amount += pizza.amount;
        else pizzaType.push({
            type: pizza.type,
            amount: pizza.amount
        });
    }
    return pizzaType;
}

function getPizzaSize() {
    const boughtPizza = JSON.parse(localStorage.getItem('boughtPizza'));
    const pizzaSize = [{ type: 'Мала', amount: 0 }, { type: 'Велика', amount: 0 }];
    for (let pizza of boughtPizza) {
        if (pizza.title.includes('(Мала)'))
            pizzaSize[0].amount = pizzaSize[0].amount + pizza.amount;
        else pizzaSize[1].amount = pizzaSize[1].amount + pizza.amount;
    }
    return pizzaSize;
}

function showSelectedPizza(selectedPizza) {
    const container = document.querySelector(".shown-pizza");
    let html = `<div class="caption">
    <div class="pizza-picture"><img src="${selectedPizza.icon}" class="full-pizza"></div>
        <h3 class="pizza-name">${selectedPizza.title}</h3>
        <p class="pizza-type">${selectedPizza.type}</p>
        <p class="pizza-ingr">${selectedPizza.desc}</p>
        <div class="cart-item-desc-container">
            <article class="cart-item-desc">
                <img src="assets/images/size-icon.svg" alt="size" />
                <span class="cart-item-size">${selectedPizza.size}</span>
                <img src="assets/images/weight.svg" />
                <span class="cart-item-weight">${selectedPizza.weight}</span>
                </article></div></div>`
    container.innerHTML = html;
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
}

function swapChart(event) {
    if (event.target.classList.contains('active'))
        return;
    event.target.src = event.target.src.replace('.png', '_sel.png');
    document.querySelector('.active').src = document.querySelector('.active').src.replace('_sel', '');

    document.querySelector('.active').classList.toggle('active');
    event.target.classList.toggle('active');
    CURRENT_CHART = event.target.getAttribute('data-chart');
    google.charts.setOnLoadCallback(draw);
}

function changeFilter(event) {
    if (event.target.classList.contains('selected'))
        return;
    document.querySelector('.selected').classList.toggle('selected');
    event.target.classList.toggle('selected');
    CURRENT_FILTER = event.target.getAttribute('data-filter');
    google.charts.setOnLoadCallback(draw);
}

function comeback() {
    location.href = 'main.html';
}
