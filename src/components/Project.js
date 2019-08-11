import React, { Component } from "react";
import { Link } from "react-router-dom";
import mac from "../macdonaldslogo.png";
import pepsi from "../pepsilogo.jpg";
import placeholder from "../placeholder.png";

export default class Project extends Component {
  render() {
    return (
      <div className="tile is-child box notification is-light">
        <div className="columns">
          <div className="column is-one-fifth">
            {this.props.id === 1 ? (
              <img src={mac} alt="Logo" />
            ) : this.props.id === 2 ? (
              <img src={pepsi} alt="Logo" />
            ) : (
              <img src={placeholder} alt="Logo" />
            )}
          </div>

          <div className="column">
            <p className="product-title">{this.props.name}</p>
            <p className="product-description">{this.props.description}</p>
            <br />
            {this.props.displaybutton === "true" ? (
              <Link to={"/projectstatus/" + this.props.id} className="button">
                {this.props.price} Tokens
              </Link>
            ) : (
              <div />
            )}

            {this.props.buybutton === "true" ? (
              <button className="button" is-primary>
                Pay
              </button>
            ) : (
              <div />
            )}

          </div>
        </div>
      </div>
    );
  }
}
