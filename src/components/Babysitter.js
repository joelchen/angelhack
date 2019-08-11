import React, { Component, Fragment } from "react";
import Project from "./Project";

export default class Babysitter extends Component {
  state = {
    newproduct: null,
    products: [
      {
        id: 5,
        projectname: "Babysitter A",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        price: 5
      },
      {
        id: 6,
        projectname: "Babysitter B",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        price: 10
      }
    ]
  };

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Babysitters Available</h1>
            <p className="subtitle is-5"></p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-12 is-parent  is-vertical">
                    {this.state.products && this.state.products.length > 0 ? (
                      this.state.products.map(project => (
                        <Project
                          name={project.projectname}
                          id={project.id}
                          key={project.id}
                          description={project.description}
                          price={project.price}
                          buybutton="true"
                        />
                      ))
                    ) : (
                      <div className="tile notification is-warning">
                        No projects available
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
