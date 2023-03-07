export default function clickAway(node: any) {
	const handleClick = (event: Event) => {
		if (!node.contains(event.target)) {
			node.dispatchEvent(new CustomEvent('click-away'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
