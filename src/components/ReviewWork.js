import React, { Component, Fragment } from "react";
import "../Timeline.css";
import Project from "./Project";

import { Api } from "@cennznet/api";
import { hexToU8a } from "@cennznet/util";
import { SimpleKeyring } from "@cennznet/wallet";
import { waitReady } from "@plugnet/wasm-crypto";
import { ContractAbi } from "@plugnet/types";
const jobPostJson = require("../contract/job-post/target/JobPost.json");

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

  onClickFinalisedHandle = async () => {
    await waitReady();
    const api = await Api.create({
      provider: "wss://mx-angelhack-angelbackbc.ap1.onfinality.io"
    });
    // worker account private key, must copy when account is first created
    const workerPrivateKey = hexToU8a(
      "0x6c05bb15a5cc326b5ae202dbdf6481e2bc0352fd221306a0da07af53b1d95406"
    );
    const contractAddr = "5Fj9RTuvA1zAhepp9eVc68ZBf1Mcfg7AV4TjfT2WJmfhnV7Q";
    const keyring = new SimpleKeyring();
    let kp;
    if (workerPrivateKey) {
      const seed = workerPrivateKey;
      kp = keyring.addFromSeed(seed);
    } else {
      kp = keyring.addFromUri(`//${workerPrivateKey}`);
    }
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
