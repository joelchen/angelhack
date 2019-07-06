import React, { Component, Fragment } from "react";
import "../Timeline.css";

import { Api } from "@cennznet/api";

import { hexToU8a } from "@cennznet/util";

import { SimpleKeyring } from "@cennznet/wallet";

import { waitReady } from "@plugnet/wasm-crypto";

import { ContractAbi } from "@plugnet/types";

import Project from "./Project";

const jobPostJson = require("../abi/JobPost.json");

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
        price: 20
      },
      {
        id: 2,
        client: "pepsi",
        projectname: "Pepsi Microsite Redesign",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        price: 20
      }
    ]
  };

  requester = {};

  onClickStartHandle = async () => {
    await waitReady();
    const api = await Api.create({
      provider: "wss://mx-angelhack-angelbackbc.ap1.onfinality.io"
    });
    // worker account private key, must copy when account is first created
    const workerPrivateKey = hexToU8a(
      "0x6c05bb15a5cc326b5ae202dbdf6481e2bc0352fd221306a0da07af53b1d95406"
    );
    const contractAddr = "5GbcjUjH2DHVDkmMvW72R1CZ29uBwUP33iC39mFrpMyqtpLU";
    const keyring = new SimpleKeyring();
    let kp;
    if (workerPrivateKey) {
      const seed = workerPrivateKey;
      kp = keyring.addFromSeed(seed);
    } else {
      kp = keyring.addFromUri(`//${workerPrivateKey}`);
    }
    const abi = new ContractAbi(jobPostJson);
    const data = abi.messages.started();
    const tx = api.tx.contract.call(contractAddr, 0, 20000, data);
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
                <span className="marker-text">Assigned</span>
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

// cennz-cli script:run -c wss://mx-angelhack-angelbackbc.ap1.onfinality.io contract-deploy /Users/ooijithong/projects/angelhack/src/contract/job-post/target/job-post.wasm 5F4eWAFjLKSpyPccSwvY55KdhT2bWwqwMHbbzHD462hkvN1t
// cennz-cli script:run -c wss://mx-angelhack-angelbackbc.ap1.onfinality.io contract-instantiate 5F4eWAFjLKSpyPccSwvY55KdhT2bWwqwMHbbzHD462hkvN1t 0xc34732f396541fb51c3349cec78fe35701d2d128c9fc3fb48b2295eb83915de5 /Users/ooijithong/projects/angelhack/src/contract/job-post/target/JobPost.json 1000 20000
