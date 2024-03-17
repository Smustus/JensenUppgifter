import './Event.css';

function Event(props){

  const { data } = props;
  const { name, price, where, when } = data;
  const { date, from, to } = when;


  return(
    <section className="eventContainer">

      <section className="eventContainer__date">
        <p className="dateText">{ date }</p>
      </section>

      <div className="eventInfoAndPriceWrapper">
        <section className="eventContainer__eventInfo">
          <h3 className="eventInfo__artist">{ name }</h3>
          <p className="eventInfo__location">{ where }</p>
          <p className="eventInfo__time">{from}&nbsp;-&nbsp;{to}</p>
        </section>

        <section className="eventContainer__price">
          <p className="priceText">{ price }&nbsp;sek</p>
        </section>
      </div>

    </section>
  );
}

export default Event;