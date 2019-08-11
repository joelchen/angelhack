import React, { Component, Fragment } from "react";
import Project from "./Project";

export default class HouseholdChores extends Component {
  state = {
    newproduct: null,
    products: [
      {
        id: 3,
        projectname: "Household Chores 1",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        price: 5
      },
      {
        id: 4,
        projectname: "Household Chores 2",
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
            <h1>Household Chores Available</h1>
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
