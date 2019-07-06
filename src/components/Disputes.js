import React, { Component, Fragment } from "react";
import Dispute from "./Dispute";
// import axios from "axios";

export default class Disputes extends Component {
  state = {
    disputes: [
      {
        id: 1,
        disputename: "Dispute 1234",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        register: false
      },
      {
        id: 2,
        disputename: "Dispute 1235",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
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
            <p className="subtitle is-5">Lorem ipsum dolor sit amet</p>
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
