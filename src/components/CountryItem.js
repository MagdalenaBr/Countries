import Button from "./Button";

export default function CountryItem({ country, handleShowDetails }) {
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
