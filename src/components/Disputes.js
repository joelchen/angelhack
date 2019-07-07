import React, { Component, Fragment } from "react";
import Dispute from "./Dispute";
// import axios from "axios";

export default class Disputes extends Component {
  state = {
    disputes: [
      {
        id: 1,
        disputename: "Project A Dispute",
        description:
          "An hourly contract was entered into to complete the job and ABC proceeded to poorly manage timelines. Subsequently, other contractors confirmed aspects of OHF’s work were done to a less than professional standard. As an example, OHF claimed 67 hours of labor for completing a portion of work, where other subsequent quotes came back between 20-25 hours. This poor management of timelines appears to have gone on throughout the project as evidenced by the huge discrepancy between ABC's initial and final timelines.",
        register: false
      },
      {
        id: 2,
        disputename: "Project B Dispute",
        description:
          "It is most disgusting to have to deal with such obnoxious behaviour especially since 2016 I have been purchasing XYZ's services and now when I need to touch up or need additional product I am unable to get this after sale support. Very horrible of XYZ. You have me use your paint in my home and now you are not willing to provide after sale support by providing the necessary services.",
        register: true
      }
    ]
  };

  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    // try {
    //   const res = await axios.get(`${config.api.invokeUrl}/products`);
    //   const products = res.data;
    //   this.setState({ products: products });
    // } catch (err) {
    //   console.log(`An error has occurred: ${err}`);
    // }
  };

  componentDidMount = () => {
    this.fetchProducts();
  };

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Disputes</h1>
            <p className="subtitle is-5"></p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-12 is-parent  is-vertical">
                    {this.state.disputes && this.state.disputes.length > 0 ? (
                      this.state.disputes.map(dispute => (
                        <Dispute
                          name={dispute.disputename}
                          id={dispute.id}
                          key={dispute.id}
                          description={dispute.description}
                          register={dispute.register}
                        />
                      ))
                    ) : (
                      <div className="tile notification is-warning">
                        No disputes available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
