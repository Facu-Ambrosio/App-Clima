const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a535854345msh88fdac3e6b0cbadp152f93jsnd563d889226a',
		'X-RapidAPI-Host': 'weather-api99.p.rapidapi.com'
	}
};

const getData = async (ciudad) => {
	let resp = await fetch(`https://weather-api99.p.rapidapi.com/weather?city=${ciudad}`, options)
	let data = await resp.json();
	console.log(data);
	return data;
};

const crearCard = async (param) => {
	let data = await getData(param.replace(/ /g, "%20"));
	let main = await data.main;
	let ciudad = await data.name;
	let pais = await data.sys.country;
	let weather = await data.weather[0];

	let temp = Math.round(main.temp - (273.15));
	let st = Math.round(main.feels_like - (273.15));;
	let icon = weather.icon;
	let humedad = main.humidity;

	let section = document.getElementById("ciudades");
	let card = document.createElement("div");
	card.classList.add("col-md-3", "col-sm-6");
	card.innerHTML =`
	<div class="card">
		<div class="card-body">
			<h5 class="card-title">${ciudad}, ${pais}</h5>
			<img src="./assets/${icon}.png" alt="">
			<p class="card-text">
				Temperatura: ${temp} °C
			</p>
			<p>
				ST: ${st} °C
			</p>
			<p>
				Humedad: ${humedad}%
			</p>
		</div>
	</div>
	`;
	section.append(card);
};


let form = document.querySelector("form");
form.addEventListener("submit", async(e) => {
	e.preventDefault();
	let ciudad = document.getElementById("ciudad").value;
	let boton = document.getElementById("buscar");
	boton.disabled = true;
	boton.innerHTML=`
	<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
	Buscando...
	`;
	await crearCard(ciudad);
	boton.removeAttribute("disabled");
	boton.innerHTML=`
	Buscar
	`;
	form.reset();
})