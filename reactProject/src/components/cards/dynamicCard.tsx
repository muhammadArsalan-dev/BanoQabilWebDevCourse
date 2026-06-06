import "./card.css";
const card = (props) => {
    return(
        <div id="main_div">
        <div id="card_div">
            <h3>{props.user}</h3>
            <p>{props.paragraph}</p>
            <button>Click</button>
        </div>
        </div>
    )
}

export default card;