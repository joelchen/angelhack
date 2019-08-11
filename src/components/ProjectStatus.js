import React, { Component, Fragment } from "react";
import "../Timeline.css";

import { Api } from "@cennznet/api";

import { hexToU8a } from "@cennznet/util";

import { SimpleKeyring } from "@cennznet/wallet";

import { waitReady } from "@plugnet/wasm-crypto";

import { ContractAbi } from "@plugnet/types";

import Project from "./Project";

const jobPostJson = require("../contract/JobPost.json");

const submittedTextStyle = {
  display: "none"
};

export default class ProjectStatus extends Component {
  state = {
    project_id: null,
    projects: [
      {
        id: 1,
        client: "mac",
        projectname: "Macdonalds Rework Online Menu",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        price: 50
      },
      {
        id: 2,
        client: "pepsi",
        projectname: "Pepsi Microsite Redesign",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        price: 50
      }
    ]
  };

  requester = {};

  onClickStartHandle = async () => {
    // without this, nothing works
    await waitReady();

    // web socket endpoint
    const api = await Api.create({
      provider: "wss://mx-angelhack-angelbackbc.ap1.onfinality.io"
    });

    // worker account private key, must copy when account is first created
    // should not be hardcoded
    const workerPrivateKey = hexToU8a(
      "0x6c05bb15a5cc326b5ae202dbdf6481e2bc0352fd221306a0da07af53b1d95406"
    );

    const contractAddr = "5HXcKWDKGTvXN2VBgjMSJs7YqqjgehL2CWCdCjkDEHA7Pdh9";

    // get the keyring
    const keyring = new SimpleKeyring();
    let kp = keyring.addFromSeed(workerPrivateKey);

    // get the abi
    const abi = new ContractAbi(jobPostJson);
    const data = abi.messages.completed();

    // call the smart contract
    const tx = api.tx.contract.call(contractAddr, 0, 20000, data);

    // execute the transaction
    await tx.signAndSend(kp, ({ events = [], status }) => {
      console.log(status);
      events.forEach(({ phase, event: { data, method, section } }) => {
        console.log(
          phase.toString() +
            " : " +
            section +
            "." +
            method +
            " " +
            data.toString()
        );
      });
    });

    document.getElementById("submit-work").style.display = "none";
    document.getElementById("icon3circle").style.display = "none";
    document.getElementById("submitted-text").style.display = "block";
    document.getElementById("icon3check").style.display = "block";

    setTimeout(function() {
      document.getElementById("icon4circle").style.display = "none";
      document.getElementById("icon4check").style.display = "block";
    }, 30000);
  };

  componentDidMount() {
    let project_id = this.props.match.params.project_id;
    this.setState({ project_id });
  }
  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <Project
              name={this.state.projects[0].projectname}
              client={this.state.projects[0].client}
              id={this.state.projects[0].id}
              key={this.state.projects[0].id}
              description={this.state.projects[0].description}
              price={this.state.projects[0].price}
              displaybutton="false"
            />
            <br />

            <div id="timeline-wrap">
              <div id="timeline" />
              <div className="marker mfirst timeline-icon one">
                <i className="fa fa-check" />
                <span className="marker-text">Created</span>
              </div>

              <div className="marker m2 timeline-icon two">
                <i className="fa fa-check" />
                <span className="marker-text">Started</span>
              </div>

              <div className="marker m3 timeline-icon three">
                <i className="fa fa-circle" id="icon3circle" />
                <i
                  className="fa fa-check"
                  id="icon3check"
                  style={{ display: "none", margin: "15px" }}
                />
                <div id="submit-work">
                  <span
                    style={{
                      color: "blue",
                      fontSize: "15px",
                      cursor: "pointer"
                    }}
                  >
                    Upload
                  </span>
                  <button
                    onClick={this.onClickStartHandle}
                    className="button is-large"
                    style={{ marginLeft: "-60px" }}
                  >
                    Submit work
                  </button>
                </div>
                <div id="submitted-text" style={submittedTextStyle}>
                  <span className="marker-text">Submitted</span>
                </div>
              </div>

              <div className="marker mlast timeline-icon four">
                <i className="fa fa-circle" id="icon4circle" />
                <i
                  className="fa fa-check"
                  id="icon4check"
                  style={{ display: "none", margin: "15px" }}
                />
                <span className="marker-text">Finalised</span>
                <button
                  onClick={this.onClickFinalisedHandle}
                  className="button is-large"
                  style={{ display: "none" }}
                >
                  Click
                </button>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
