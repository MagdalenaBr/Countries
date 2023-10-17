import Button from "./Button";
import Icon from "@mdi/react";
import { mdiMagnify, mdiWindowClose } from "@mdi/js";

export default function Search({
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
