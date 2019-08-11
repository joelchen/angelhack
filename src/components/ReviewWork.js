import React, { Component, Fragment } from "react";
import "../Timeline.css";
import Project from "./Project";

import { Api } from "@cennznet/api";
import { hexToU8a } from "@cennznet/util";
import { SimpleKeyring } from "@cennznet/wallet";
import { waitReady } from "@plugnet/wasm-crypto";
import { ContractAbi } from "@plugnet/types";
const jobPostJson = require("../contract/JobPost.json");

export default class ProjectStatus extends Component {
  state = {
    project_id: null,
    projects: [
      {
        id: 1,
        client: "mac",
        projectname: "Macdonalds Rework Online Menu",
        description:
          "Contract work to rework Macdonalds' online menu. Current ten pages menu needs a redesign using existing information and pricing.  The deliverable is converting the current menu into the new menu on an 81/2x11 as well as a two board wall design using same new graphics.",
        price: 20
      },
      {
        id: 2,
        client: "pepsi",
        projectname: "Pepsi Microsite Redesign",
        description:
          "Contract work to redesign Pepsi's microsite. We have a B2B online order microsite that we would like to redesign some of the pages to make it a little more user friendly. Would prefer if you worked out of a simple programs like Framer or Porto.io so we can collaborate and make changes.",
        price: 20
      }
    ]
  };

  onClickFinalisedHandle = async () => {
    await waitReady();
    const api = await Api.create({
      provider: "wss://mx-angelhack-angelbackbc.ap1.onfinality.io"
    });
    // worker account private key, must copy when account is first created
    const workerPrivateKey = hexToU8a(
      "0x6c05bb15a5cc326b5ae202dbdf6481e2bc0352fd221306a0da07af53b1d95406"
    );
    const contractAddr = "5HXcKWDKGTvXN2VBgjMSJs7YqqjgehL2CWCdCjkDEHA7Pdh9";
    const keyring = new SimpleKeyring();
    let kp = keyring.addFromSeed(workerPrivateKey);
    const abi = new ContractAbi(jobPostJson);
    const data = abi.messages.accepted();
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

    document.getElementById("accept-work").style.display = "none";
    document.getElementById("accept-text").style.display = "block";
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
            <button className="button is-large">Download submitted work</button>
            <br />
            <br />
            <button
              className="button is-large is-success"
              onClick={this.onClickFinalisedHandle}
              id="accept-work"
            >
              Accept work result
            </button>
            <h1 id="accept-text" style={{ display: "none" }}>
              Work result accepted
            </h1>
          </div>
        </section>
      </Fragment>
    );
  }
}
