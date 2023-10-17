import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import CountryItem from "./CountryItem";

export default function CountriesList({
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
