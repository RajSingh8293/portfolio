/* eslint-disable react/prop-types */

const Button = ({ onClickData, children, className, type }) => {
    return (
        <div>
            {onClickData ? <button
                // onClick={() => onClickData(true)}
                onClick={onClickData}
                type={type ? type : "button"}
                className={`px-4 py-2 rounded ${className ? className : "bg-green-400 hover:bg-green-500 text-white"}  `}
            >
                {children}
            </button>
                :
                <button

                    className={`px-4 py-2 rounded ${className ? className : "bg-green-400 hover:bg-green-500 text-white"}  `}
                >
                    {children}
                </button>}


        </div >
    )
}

export default Button