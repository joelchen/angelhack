import React, { Component, Fragment } from "react";
import "../Timeline.css";

export default class DisputeStatus extends Component {
  state = {
    project_id: null
  };

  requester = {};

  onClickHandle = async () => {};
  componentDidMount() {
    let project_id = this.props.match.params.project_id;
    this.setState({ project_id });
  }
  render() {
    return (
      <Fragment>
        <button onClick={this.onClickHandle}>Click</button>
        <section className="section">
          <div className="container">
            <h1>Project Status {this.state.project_id}</h1>
            <p className="subtitle is-5"></p>
            <br />

            <div id="timeline-wrap">
              <div id="timeline" />

              {/* <!-- This is the individual marker--> */}
              <div className="marker mfirst timeline-icon one">
                <i className="fa fa-pencil" />
                <span className="marker-text">Created</span>
              </div>
              {/* <!-- / marker --> */}

              {/* <!-- This is the individual marker--> */}
              <div className="marker m2 timeline-icon two">
                <i className="fa fa-usd" />
                <span className="marker-text">Assigned</span>
              </div>
              {/* <!-- / marker --> */}

              {/* <!-- This is the individual panel--> */}
              {/* <div className="timeline-panel">
            <p>text</p>
          </div> */}
              {/* <!-- / panel --> */}

              {/* <!-- This is the individual marker--> */}
              <div className="marker m3 timeline-icon three">
                <i className="fa fa-list" />
                <span className="marker-text">Completed</span>
              </div>
              {/* <!-- / marker --> */}

              {/* <!-- This is the individual marker--> */}
              <div className="marker mlast timeline-icon four">
                <i className="fa fa-check" />
                <span className="marker-text">Finalised</span>
              </div>
              {/* <!-- / marker --> */}
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
