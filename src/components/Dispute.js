import React, { Component, Fragment } from "react";

export default class Dispute extends Component {
  render() {
    return (
      <div className="tile is-child box notification is-ight">
        <p className="product-title">{this.props.name}</p>
        <p className="product-description">{this.props.description}</p>
        <br />
        {this.props.register ? (
          <Fragment>
            <p style={{ textDecoration: "underline", cursor: "pointer" }}>
              Review requester info
            </p>
            <p style={{ textDecoration: "underline", cursor: "pointer" }}>
              Review worker result
            </p>
            <br />
            <button className="button is-medium">Refund Requester</button>{" "}
            &nbsp;
            <button className="button is-medium">
              Release payment to Worker
            </button>
          </Fragment>
        ) : (
          <button className="button is-medium">
            Accept invitation as Arbitrator
          </button>
        )}
      </div>
    );
  }
}
