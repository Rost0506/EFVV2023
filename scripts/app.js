const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Що це було? Готуйся краще!!!", 7),
	new Result("Ти на вірному шляху, продовжуй в тому ж дусі", 15),
	new Result("Молодець, гарна підготовка", 22),
	new Result("Неймовірно, в захваті від твоїх знань", 27)
];

//Массив с вопросами
const questions = 
[
	new Question("Що визначає закон попиту та пропозиції?", 
	[
		new Answer("Відношення кількості товару до його ціни", 0),
		new Answer("Відношення кількості товару до доходу споживачів", 0),
		new Answer("Взаємозв'язок між ціною товару та кількістю, яку готові придбати споживачі", 1),
		new Answer("Кількість товару, доступного на ринку, та ціну, за яку його можна придбати", 0)
	]),

	new Question("Яким чином інфляція впливає на економіку країни?", 
	[
		new Answer("Зменшує реальну вартість грошей, спричиняючи зростання цін", 1),
		new Answer("Збільшує споживчу активність населення", 0),
		new Answer("Знижує обсяги зовнішньої торгівлі", 0),
		new Answer("Збільшує рівень економічного розвитку", 0)
	]),

	new Question("Що таке безробіття в макроекономіці?", 
	[
		new Answer("Відсутність роботи лише серед членів робочої сили", 0),
		new Answer("Стан, коли кількість вакантних робочих місць перевищує кількість безробітних", 0),
		new Answer("Соціальний статус осіб, які не працюють, але активно шукають роботу", 1),
		new Answer("Економічна криза, спричинена зниженням рівня споживчого попиту", 0)
	]),

	new Question("Яке поняття визначає обсяг виробництва, при повній зайнятості та наявних ресурсів?", 
	[
		new Answer("Реальний ВВП", 0),
		new Answer("Номінальний ВВП", 0),
		new Answer("Потенційний ВВП", 1),
		new Answer("ВВП", 0)
	]),

	new Question("Первісний результат, матеріальна і вартісна основа існування інших видів кінцевого результату підприємства – це", 
	[
		new Answer("товарна продукція", 0),
		new Answer("валовий дохід", 0),
		new Answer("прибуток", 0),
		new Answer("валова продукція", 1)
	]),

	new Question("Частина валової продукції, яка реалізується за межі підприємства різним споживачам є ...", 
	[
		new Answer("побічна продукція", 0),
		new Answer("кінцева продукція", 0),
		new Answer("проміжна продукція", 0),
		new Answer("товарна продукція", 1)
	]),
	new Question("Валовий дохід визначається як", 
	[
		new Answer("чистий дохід + оплата праці", 1),
		new Answer("прибуток + оплата праці", 0),
		new Answer("виручка від реалізації – повна собівартість реалізованої продукції", 0),
		new Answer("прибуток +повна собівартість реалізованої продукції", 0)
	]),
	
	new Question("Собівартість, що визначається на кожному підприємстві по окремим видам продукції називається", 
	[
		new Answer("індивідуальною собівартістю", 1),
		new Answer("суспільною собівартістю;", 0),
		new Answer("виробничою собівартістю;", 0),
		new Answer("комерційною собівартістю", 0)
	]),
	
	new Question("Частина валової продукції, яка реалізується за межі підприємства різним споживачам є ...", 
	[
		new Answer("побічна продукція", 0),
		new Answer("кінцева продукція", 0),
		new Answer("проміжна продукція", 0),
		new Answer("товарна продукція", 1)
	]),
	
	new Question("Комплекс цехів і служб підприємства, які забезпечують необхідні умови для функціонування підприємства називають", 
	[
		new Answer("виробничою інфраструктурою підприємства;", 1),
		new Answer("інфраструктурою підприємства;", 0),
		new Answer("соціальною інфраструктурою підприємства;", 0),
		new Answer("робочою структурою підприємства", 0)
	]),
	
	new Question("Науково-технічний прогрес – це", 
	[
		new Answer("покращення використання техніки в сільському господарстві;", 0),
		new Answer("впровадження у сільськогосподарське виробництво досягнень кращих виробників сільськогосподарської продукції; сил на основі", 0),
		new Answer("процес перетворення всіх елементів продуктивних використання досягнень науки, а також удосконалення організації та управління з метою досягнення економічного і соціального ефекту;", 1),
		new Answer("розробка ресурсо-, водо-, та енергозберігаючих технологій, теорії і методів програмування врожаїв сільськогосподарських культур і продуктивності тварин на основі нових технологічних рішень.", 0)
	]),
	
	new Question("Виокремлюють два види виробничої диверсифікації", 
	[
		new Answer("вертикально інтегрована та багатоспекторна", 0),
		new Answer("галузева та продуктово-асортиментна", 1),
		new Answer("фінансова та маркетингова", 0),
		new Answer("горизонтально інтегрована та горизонтально не інтегрована", 0)
	]),
	
	new Question("Ринкова економіка – це", 
	[
		new Answer("економіка, яка жорстко регулюється державою", 0),
		new Answer("економіка, яка не регулюється державою", 1),
		new Answer("економіка вільного підприємництва в межах існуючих законів", 0),
		new Answer("сукупність методів економічного впливу на виробництво", 0)
	]),
	
	new Question("Під банкрутством розуміють", 
	[
		new Answer("економічне середовище яке характеризується рівнем інфляції та дефляції, ступенем розвитку конкурентоспроможного середовища;", 0),
		new Answer("процес забезпечення організаційних форм господарювання на селі необхідними матеріальними ресурсами;", 0),
		new Answer("систему заходів, що спрямована на запобігання визнання боржника банкрутом та його ліквідації;", 0),
		new Answer("визнану арбітражним судом неспроможність боржника відновити свою платоспроможність та задовольнити вимоги кредиторів.", 1)
	]),
	
	new Question("Система заходів, що здійснюється під час провадження справи про банкрутство та спрямована на запобігання боржника банкрутом та його ліквідації називається", 
	[
		new Answer("мирова угода;", 0),
		new Answer("процедура розпорядження майном боржника;", 0),
		new Answer("санація;", 1),
		new Answer("ліквідація боржника", 0)
	]),
	
	new Question("Фондооснащеність розраховується як відношення", 
	[
		new Answer("вартості основних невиробничих фондів до площі сільськогосподарських угідь;", 0),
		new Answer("вартості основних невиробничих фондів до загальної земельної площі;", 0),
		new Answer("вартості основних виробничих фондів сільськогосподарського призна-чення до площі сільськогосподарських угідь;", 1),
		new Answer("вартості основних виробничих фондів сільськогосподарського призна-чення до загальної земельної площі.", 0)
	]),
	
	new Question("Назвіть спосіб стабілізації грошового обігу:", 
	[
		new Answer("дефляція", 1),
		new Answer("інфляція", 0),
		new Answer("гіперінфляція", 0),
		new Answer("підняття ставки центрального банк", 0)
	]),
	
	new Question("Кліринг – це", 
	[
		new Answer("система безготівкового розрахунку;", 1),
		new Answer("спосіб продажі товару на аукціоні;", 0),
		new Answer("спосіб купівлі товарів в кредит.", 0),
		new Answer("готівковий розрахунок між країнами", 0)
	]),
	
	new Question("До якого типу підприємства належить підприємство, власником якого виступають одна або декілька осіб, що відповідають за його борги усім своїм майном", 
	[
		new Answer("приватне;", 1),
		new Answer("індивідуальне;", 0),
		new Answer("орендне;", 0),
		new Answer("акціонерне", 0)
	]),
	
	new Question("До якого типу підприємств належить підприємство, за стан якого засновники несуть відповідальність у межах свого внеску", 
	[
		new Answer("індивідуальне", 0),
		new Answer("орендне;", 0),
		new Answer("товариство з обмеженою відповідальністю;", 1),
		new Answer("приватне", 0)
	]),
	
	new Question("Величина прожиткового мінімуму залежить від", 
	[
		new Answer("вартості споживчого кошика", 1),
		new Answer("облікової ставки Національного банку", 0),
		new Answer("розміру мінімальної заробітної плати", 0),
		new Answer("розміру середньої заробітної плати", 0)
	]),
	
	new Question("Що означає поняття 'еластичність попиту'", 
	[
		new Answer("ступінь відносної зміни попиту і пропозиції під впливом відносної зміни ринкової ціни", 0),
		new Answer("Відсоткове зменшення попиту на товар при збільшенні його ціни на 1%", 0),
		new Answer("Відношення зміни кількості товару до зміни його ціни", 0),
		new Answer("Співвідношення між попитом на товар і витратами на його придбання", 1)
	]),
	
	new Question("Що означає поняття 'оптимальна точка' на кривій пропозиції та попиту", 
	[
		new Answer("Точка, де попит на товар дорівнює пропозиції", 1),
		new Answer("Точка, де споживачі максимізують свою користь", 0),
		new Answer("Точка, де виробники максимізують свій прибуток", 0),
		new Answer("Точка, де ціна на товар є найнижчою", 0)
	]),
	
	new Question("Яке поняття відображає співвідношення між експортом та імпортом товарів у міжнародній торгівлі?", 
	[
		new Answer("Баланс товарів", 0),
		new Answer("Торговий баланс", 1),
		new Answer("Патіжний баланс", 0),
		new Answer("Чистий експорт", 0)
	]),
	
	new Question("Яке поняття використовується для опису ситуації, коли країна спеціалізується на виробництві та експорті тих товарів, у виробництві яких вона має конкурентну перевагу?", 
	[
		new Answer("Виробництво за замовленням", 0),
		new Answer("Синдром Датча", 0),
		new Answer("Теорія рівноваги товарного ринку", 0),
		new Answer("Принцип компаративних переваг", 1)
	]),
	
	new Question("До групи країн «великої сімки» (G7) входять ", 
	[
		new Answer("Японія, Німеччина, Франція, Великобританія, Італія, Канада, Росія", 0),
		new Answer("Канада, Японія, Китай, Великобританія, Німеччина, Швейцарія", 0),
		new Answer("США, Японія, Німеччина, Британія, Франція, Італія, Канада", 1),
		new Answer("Австралія, Канада, Китай, Великобританія, Німеччина, Італія", 0)
	]),
	
	new Question("Протекцонізм - це", 
	[
		new Answer("державна політика захисту внутрішнього ринку від іноземної конкуренції шляхом використання тарифних і нетарифних інструментів торгової політики", 1),
		new Answer("форма господарювання, при якій всі вироблені товари виробляються, збуваються і споживаються всередині країни", 0),
		new Answer("кількісне обмеження на обсяг товару, що може бути імпортованим/експортованим за визначений проміжок часу", 0),
		new Answer("політика мінімального державного втручання у зовнішню торгівлю, яка розвивається на основі вільних ринкових сил попиту та пропозиції", 0)
	]),
	
	new Question("До кількісних методів торгової політики належать:", 
	[
		new Answer("субсидії, кредитування, ліцензування", 0),
		new Answer("ліцензування, добровільні обмеження, кредити", 0),
		new Answer("квотування, ліцензування", 0),
		new Answer("мито, субсидії", 1)
	]),
	
	new Question("За способом встановлення виділяють такі види мита", 
	[
		new Answer("специфічні, адвалорні, комбіновані", 1),
		new Answer("специфічні та адвалорні", 0),
		new Answer("специфічні, адвалорні, преференційні", 0),
		new Answer("специфічні та неспецифічні", 0)
	]),
	
	new Question("Яка характеристика властива активному торговельному балансу", 
	[
		new Answer("світовий золотий запас знаходиться в даній країні", 0),
		new Answer("вартість експорту перевищує вартість імпорту", 1),
		new Answer("одна країна вкладає в економіку інших країн більше коштів, ніж інші країни в неї", 0),
		new Answer("зростання вартості експорту та імпорту", 0)
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}