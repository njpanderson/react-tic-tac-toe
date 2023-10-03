export default function(props) {
	return (
		<button className="btn" {...props}>{props.children}</button>
	)
}
