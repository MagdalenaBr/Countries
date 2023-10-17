export default function Button({ children, handleClickEvent, buttonClass }) {
	return (
		<button className={buttonClass} onClick={handleClickEvent}>
			{children}
		</button>
	);
}
