import { useEffect } from "react";
import Button from "./Button";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";

export default function CountryInfoPanel({
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
