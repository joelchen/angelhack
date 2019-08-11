import React, { Component, Fragment } from "react";
import Project from "./Project";

// import axios from "axios";

export default class Projects extends Component {
  state = {
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

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Projects Available</h1>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-12 is-parent  is-vertical">
                    {this.state.projects && this.state.projects.length > 0 ? (
                      this.state.projects.map(project => (
                        <Project
                          name={project.projectname}
                          client={project.client}
                          id={project.id}
                          key={project.id}
                          description={project.description}
                          price={project.price}
                          displaybutton="true"
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
