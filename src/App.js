import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import CountryInfoPanel from "./components/CountryInfoPanel";
import Search from "./components/Search";
import CountriesList from "./components/CountriesList";

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
