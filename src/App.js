import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import {
	mdiMagnify,
	mdiWeatherNight,
	mdiChevronLeft,
	mdiWindowClose,
	mdiWeatherSunny,
} from "@mdi/js";

export default function App() {
	const [countries, setCountries] = useState([]);
	const [countryName, setCountryName] = useState("");
	const [error, setError] = useState("");
	const [activeRegion, setActiveRegion] = useState("");
	const [activeCoutryDetails, setactiveCountryDetails] = useState(false);
	const [activeCountry, setActiveCountry] = useState("");

	let sortedCountries;

	if (activeRegion === "") sortedCountries = countries;
	if (activeRegion)
		sortedCountries = countries.filter(
			country => country.region === activeRegion
		);

	function handleShowDetails(country) {
		setactiveCountryDetails(!activeCoutryDetails);
		setActiveCountry(() => country);
	}
	function handleCloseDetails() {
		setactiveCountryDetails(!activeCoutryDetails);
		setActiveCountry("");
	}

	useEffect(function () {
		async function fetchData() {
			setError("");
			try {
				const res = await fetch(`https://restcountries.com/v3.1/all`);
				if (!res.ok) {
					throw new Error("Something went wrong with fetching countries");
				}
				const data = await res.json();
				setCountries(data);
			} catch (err) {
				setError(err.message);
			}
		}

		fetchData();
	}, []);

	return (
		<>
			<Logo />
			<main className='main-container'>
				{activeCoutryDetails ? (
					<CountryInfoPanel
						countries={countries}
						activeCountry={activeCountry}
						handleCloseDetails={handleCloseDetails}
						setActiveCountry={setActiveCountry}
					/>
				) : (
					<>
						<Search
							countryName={countryName}
							setCountryName={setCountryName}
							activeRegion={activeRegion}
							setActiveRegion={setActiveRegion}
						/>
						<CountriesList
							error={error}
							sortedCountries={sortedCountries}
							handleShowDetails={handleShowDetails}
							countryName={countryName}
						/>
					</>
				)}
			</main>
		</>
	);
}

function ErrorMessage({ error }) {
	return <p>🛑 {error}</p>;
}

function Logo() {
	const [isDarkMode, setDarkMode] = useState(false);

	useEffect(
		function () {
			if (isDarkMode) {
				document.documentElement.classList.add("dark-mode");
				document.documentElement.classList.remove("light-mode");
			} else {
				document.documentElement.classList.add("light-mode");
				document.documentElement.classList.remove("dark-mode");
			}
		},
		[isDarkMode]
	);

	return (
		<header className='header'>
			<div className='header_content'>
				<h1>Where in the world?</h1>

				<button onClick={() => setDarkMode(!isDarkMode)}>
					{isDarkMode ? (
						<Icon path={mdiWeatherSunny} size={1.5} />
					) : (
						<Icon path={mdiWeatherNight} size={1.5} />
					)}
				</button>
			</div>
		</header>
	);
}
function Button({ children, handleClickEvent, buttonClass }) {
	return (
		<button className={buttonClass} onClick={handleClickEvent}>
			{children}
		</button>
	);
}

function Search({
	countryName,
	setCountryName,
	activeRegion,
	setActiveRegion,
}) {
	return (
		<div className='search-container'>
			<div className='search-container_search-input'>
				<Icon path={mdiMagnify} size={1} color='hsl(0, 0%, 52%)' />
				<input
					type='text'
					value={countryName}
					onChange={e => setCountryName(e.target.value)}
					placeholder='Search for a country...'
				/>
				<Button handleClickEvent={() => setCountryName("")}>
					<Icon path={mdiWindowClose} size={1} />
				</Button>
			</div>
			<div className='search-container_select-region'>
				<Button handleClickEvent={() => setActiveRegion("")}>
					<Icon path={mdiWindowClose} size={1} />
				</Button>
				<select
					value={activeRegion}
					onChange={e => setActiveRegion(e.target.value)}>
					<option value=''>Filter by Region</option>
					<option value='Africa'>Africa</option>
					<option value='Americas'>America</option>
					<option value='Asia'>Asia</option>
					<option value='Europe'>Europe</option>
					<option value='Oceania'>Oceania</option>
				</select>
			</div>
		</div>
	);
}

function CountriesList({
	error,
	sortedCountries,
	handleShowDetails,
	countryName,
}) {
	const [serchedCountry, setSerchedCountry] = useState([]);
	useEffect(
		function () {
			const serchedCountryResult = sortedCountries.filter(country =>
				country.name.common.toLowerCase().includes(countryName.toLowerCase())
					? country.name.common
					: ""
			);
			setSerchedCountry(serchedCountryResult);
		},
		[countryName, sortedCountries]
	);

	return (
		<div className='countries-container'>
			{error ? (
				<ErrorMessage error={error} />
			) : (
				serchedCountry?.map(country => (
					<CountryItem
						country={country}
						key={country.cca2}
						handleShowDetails={handleShowDetails}
					/>
				))
			)}
		</div>
	);
}
function CountryItem({ country, handleShowDetails }) {
	return (
		<Button
			buttonClass={"country-item"}
			handleClickEvent={() => handleShowDetails(country)}>
			<div className='country-item_flag'>
				<img
					src={country.flags.svg}
					alt={
						country.flags.alt
							? country.flags.alt
							: `${country.name.common} flag`
					}></img>
			</div>

			<div className='country-item_data'>
				<h3 className='country-item_title'>{country.name.common}</h3>
				<p>
					<span>Population:</span> {country.population.toLocaleString("en-US")}
				</p>
				<p>
					<span>Region:</span> {country.region}
				</p>
				<p>
					<span>Capital:</span> {country.capital}
				</p>
			</div>
		</Button>
	);
}

function CountryInfoPanel({
	countries,
	activeCountry,
	handleCloseDetails,
	setActiveCountry,
}) {
	const borderShortcut = activeCountry.borders?.map(v => v);

	const borderingCountries = countries
		.map(country =>
			borderShortcut?.includes(country.cca3) ? country.name.common : ""
		)
		.filter(value => value);
	function changeToBorderingCountry(value) {
		const countryObj = countries.filter(
			country => country.name.common === value
		);
		setActiveCountry(...countryObj);
	}

	useEffect(
		function () {
			if (!activeCountry.name.common) return;
			document.title = `🗺 | ${activeCountry.name.common}`;

			return function () {
				document.title = "Where in the world?";
			};
		},
		[activeCountry.name.common]
	);

	return (
		<div className='country-information'>
			<Button
				buttonClass={"country-information_back-button"}
				handleClickEvent={handleCloseDetails}>
				<Icon path={mdiChevronLeft} size={1} /> Back
			</Button>
			<div className='country-information_content'>
				<img
					className='country-information_img'
					src={activeCountry.flags.svg}
					alt={
						activeCountry.flags.alt
							? activeCountry.flags.alt
							: `${activeCountry.name.common} flag`
					}></img>
				<div className='country-information_info--one'>
					<h2>{activeCountry.name.common}</h2>
					<p>
						<span>Native Name:</span> {activeCountry.altSpellings[2]}
					</p>
					<p>
						<span>Population:</span>{" "}
						{activeCountry.population.toLocaleString("en-US")}
					</p>
					<p>
						<span>Region:</span> {activeCountry.region}
					</p>
					<p>
						<span>Sub Region:</span> {activeCountry.subregion}
					</p>
					<p>
						<span>Capital:</span> {activeCountry.capital}
					</p>
				</div>
				<div className='country-information_info--two'>
					<p>
						<span>Top Level Domain:</span> {activeCountry.tld}
					</p>
					<p>
						<span>Currencies:</span>{" "}
						{Object.values(activeCountry.currencies).map(
							lang => Object.values(lang).map(val => val)[0]
						)}
					</p>
					<p>
						<span>Languages:</span>{" "}
						{Object.values(activeCountry.languages)
							.map(lang => lang)
							.join(", ")}
					</p>
				</div>
				<div className='country-information_border-countries'>
					{activeCountry.borders ? (
						<p>
							<span>Border Countries:</span>{" "}
							{borderingCountries.map((borderingCountry, i) => (
								<Button
									buttonClass={"country-information_border-countries-button"}
									key={i}
									handleClickEvent={() =>
										changeToBorderingCountry(borderingCountry)
									}>
									{borderingCountry}
								</Button>
							))}
						</p>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}
