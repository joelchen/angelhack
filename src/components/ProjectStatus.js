import React, { Component, Fragment } from "react";
import "../Timeline.css";

import { Api } from "@cennznet/api";

import { hexToU8a } from "@cennznet/util";

import { SimpleKeyring } from "@cennznet/wallet";

import { waitReady } from "@plugnet/wasm-crypto";

import { ContractAbi } from "@plugnet/types";

const jobPostJson = require("../abi/jobPost.json");

export default class ProjectStatus extends Component {
  state = {
    project_id: null
  };

  requester = {};

  onClickHandle = async () => {
    await waitReady();

    const api = await Api.create({
      provider: "wss://mx-angelhack-angelbackbc.ap1.onfinality.io"
    });

    // const requester = "5F4eWAFjLKSpyPccSwvY55KdhT2bWwqwMHbbzHD462hkvN1t";
    // worker account on the blockchain
    // const worker = "5EAZDPmWiPK25YiDU3UXbBWqCJfnYUFfMi1wJa7WHGjXJtbw";

    // worker account private key, must copy when account is first created
    const workerPrivateKey = hexToU8a(
      "0x6c05bb15a5cc326b5ae202dbdf6481e2bc0352fd221306a0da07af53b1d95406"
    );

    const contractAddr = "5CZrg3CWQVF9gySvt3UHVN4HXSFEpsaj6i71fB2vYUDx4EfS";

    // const keyring = new Keyring({ type: "ed25519" });
    // const keypair = keyring.addFromSeed(workerPrivateKey);

    const keyring = new SimpleKeyring();
    let kp;
    if (workerPrivateKey) {
      const seed = workerPrivateKey;
      kp = keyring.addFromSeed(seed);
    } else {
      kp = keyring.addFromUri(`//${workerPrivateKey}`);
    }
    // await wallet.addKeyring(keyring);

    const abi = new ContractAbi(jobPostJson);

    const data = abi.messages.started();
    const tx = api.tx.contract.call(contractAddr, 0, 20000, data);

    const result = await tx.signAndSend(kp);
    console.log(result.toHex());
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
            <h1>Project Status {this.state.project_id}</h1>
            <p className="subtitle is-5">Lorem ipsum dolor sit amet</p>
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
                <button
                  onClick={this.onClickHandle}
                  className="button is-large"
                >
                  Click
                </button>
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
