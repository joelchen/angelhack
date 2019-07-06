import React, { Component, Fragment } from "react";

export default class Food extends Component {
  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <form>
              <div className="field">
                <label className="label">Food Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Text input"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Food Description</label>
                <div className="control">
                  <textarea className="textarea" placeholder="Textarea" />
                </div>
              </div>

              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Text input"
                  />
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </Fragment>
    );
  }
}
