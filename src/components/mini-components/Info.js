const Info = ({tip, position}) => {
    return (
        <button
            style={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
            }}
            data-tooltip={tip}
            data-position={position || "bottom center" }
        >
            <i className="info circle icon"></i>
        </button>
    )
}

export default Info