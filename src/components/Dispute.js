import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class Dispute extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="tile is-child box notification is-ight">
        <p className="product-title">{this.props.name}</p>
        <p className="product-description">{this.props.description}</p>
        <br />
        {this.props.register ? (
          <Fragment>
            <Link to="">Review requester info</Link> <br />
            <Link to="">Review worker result</Link> <br /> <br />
            <button className="button is-large">Refund Requester</button> &nbsp;
            <button className="button is-large">
              Release payment to Worker
            </button>
          </Fragment>
        ) : (
          <button className="button is-large">
            Accept invitation as Arbitrator
          </button>
        )}
      </div>
    );
  }
}
