import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Icon from "@mdi/react";
import { mdiWeatherNight, mdiWeatherSunny } from "@mdi/js";

export default function Logo() {
	const [isDarkMode, setDarkMode] = useLocalStorage(false, "mode");

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
