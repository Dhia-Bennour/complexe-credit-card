import React from "react";
import "./style.css";


const normalizeCardName = cardName =>
  cardName
    .trimLeft()
    .replace(/\d/g, "")
    .toUpperCase()
    .slice(0, 19);


const normalizeCardNumber = cardNumber =>
  cardNumber.replace(/\D/g, "").slice(0, 16);


const formatCardNumberForInput = cardNumber => {
  if (cardNumber === "") return "";

  return cardNumber.match(/.{1,4}/g).join(" ");
};

const formatCardNumberForCard = cardNumber =>
  formatCardNumberForInput(
    cardNumber.concat("*".repeat(16 - cardNumber.length))
  );


const normalizeCardValidThru = cardValidThru =>
  cardValidThru.replace(/\D/g, "").slice(0, 4);

const normalizeYear = year => {
  let yearAsNumber = Number(year);
  if (yearAsNumber.toString().length < 2 && yearAsNumber) {
    return yearAsNumber;
  } else if (yearAsNumber > 50) return "50";
  else if (yearAsNumber < 18) return "";

  return yearAsNumber;
};

const normalizeMonth = month => {
  let monthAsNumber = Number(month);
  if (monthAsNumber.toString().length < 2 && monthAsNumber) {
    return "0" + monthAsNumber;
  } else {
    if (monthAsNumber > 12) return "12";
    else if (monthAsNumber < 1) return "01";
  }
  return monthAsNumber;
};


const formatCardValidThru = cardValidThru => {
  let monthAndYear = cardValidThru.match(/.{1,2}/g);
  if (!monthAndYear) return "";
  if (monthAndYear.length === 2) {
    monthAndYear[0] = normalizeMonth(monthAndYear[0]);
    monthAndYear[1] = normalizeYear(monthAndYear[1]);
    return monthAndYear.join("/");
  }
};

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: "FOULEN",
      cardValidThru: "1255",
      cardNumber: "2222222"
    };
  }

  changeCardName = event => {
    this.setState({
      cardName: normalizeCardName(event.target.value)
    });
  };

  changeCardNumber = event => {
    this.setState({
      cardNumber: normalizeCardNumber(event.target.value)
    });
  };

  changeCardValidThru = event => {
    this.setState({
      cardValidThru: normalizeCardValidThru(event.target.value)
    });
  };

  render() {
    return (
      <div className="cardNextInput">
        <div className="card">
          <h1 className="title">CREDIT CARD</h1>
          <div className="card-content">
            <img
              src="https://t3.ftcdn.net/jpg/00/01/76/56/240_F_1765638_saELTbfEidXxJe2ADdLpK1J599ZGBA.jpg"
              alt="puce-magnétique"
              className="puce"
            />
            <div className="card-number">
              <h2 className="number">
                {formatCardNumberForCard(this.state.cardNumber)}
              </h2>
            </div>
            <div className="card-information">
              <span className="card-ref">5422</span>
              <div className="card-validity">
                <div className="validthru">
                  <div>
                    <span className="valid">VALID </span>
                    <span className="thru">THRU</span>
                  </div>
                  <div>
                    <img
                      src="http://icongal.com/gallery/image/95973/right_triangle_arrow_next_play.png"
                      alt="arrow"
                      className="fleche"
                    />
                  </div>
                </div>
                <div className="expired">
                  <span className="date-letter">MONTH/YEAR</span>
                  <span className="date-number">
                    {formatCardValidThru(this.state.cardValidThru)}
                  </span>
                </div>
              </div>
            </div>
            <h3 className="card-type">{this.state.cardName}</h3>

            <img
              src="https://www.lowestrates.ca/sites/default/files/creditcardlogos.jpg"
              alt="mastercard"
              className="mastercard"
            />
          </div>
        </div>

        <div className="inputDiv">
          <input
            type="text"
            value={this.state.cardName}
            onChange={this.changeCardName}
          />
          <input
            type="text"
            value={formatCardNumberForInput(this.state.cardNumber)}
            onChange={this.changeCardNumber}
          />
          <input
            type="text"
            value={formatCardValidThru(this.state.cardValidThru)}
            onChange={this.changeCardValidThru}
          />
        </div>
      </div>
    );
  }
}

export default Card;
