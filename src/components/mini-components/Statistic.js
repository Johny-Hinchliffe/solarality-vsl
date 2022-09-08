import Info from './Info'

const Statistic = ({ value, icon, img, label, valueClass, imgClass, size, tip, position }) => {
	const div = img ? (
		<img src={img} className={imgClass} />
	) : icon ? (
		<i className={`${icon} icon`}> {value}</i>
	) : (
		value
	)

	return (
		<div className={`ui ${size} statistic`}>
			<div className={`${valueClass} value`}>{div}</div>

			<div className="label">{label}</div>
			{tip ? <Info tip={tip} position={position}   /> : null }
		</div>
	)
}

export default Statistic
