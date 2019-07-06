import React, { Component, Fragment } from "react";
import axios from "axios";

export default class PostJob extends Component {
  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <form>
              <div class="field">
                <label class="label">Project Name</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Text input" />
                </div>
              </div>

              <div class="field">
                <label class="label">Project Requirements</label>
                <div class="control">
                  <textarea class="textarea" placeholder="Textarea" />
                </div>
              </div>

              <div class="field">
                <label class="label">Price</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Text input" />
                </div>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </Fragment>
    );
  }
}
