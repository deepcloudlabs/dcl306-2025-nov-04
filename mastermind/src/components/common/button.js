export default function Button({label,click,color}) {
    return (
        <button className={`btn btn-${color}`}
                onClick={click}>{label}</button>
    );
}
