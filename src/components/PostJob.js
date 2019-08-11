import React, { Component, Fragment } from "react";

export default class PostJob extends Component {
  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <form>
              <div className="field">
                <label className="label">Project Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Input Project Name"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Project Requirements</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Input project description"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Input Project Price"
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
