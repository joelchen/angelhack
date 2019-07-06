import React, { Component, Fragment } from "react";
import Auth from "@aws-amplify/auth";
import { Link, NavLink } from "react-router-dom";

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <h1>A</h1>
            <h2>ngel</h2>
            <h1>H</h1>
            <h2>ack</h2>
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-item">
            <div className="navbar-item has-dropdown is-hoverable">
              <span className="navbar-link">Services</span>
              <div className="navbar-dropdown">
                <div className="dropdown-content">
                  <span className="dropdown-item">
                    <b>Buyer</b>
                  </span>
                  <NavLink to="/household-chores" className="navbar-item">
                    Household Chores
                  </NavLink>
                  <NavLink to="/babysitter" className="navbar-item">
                    Babysitter
                  </NavLink>
                  <NavLink to="/tuition" className="navbar-item">
                    Tuition
                  </NavLink>
                  <span className="dropdown-item">
                    <b>Seller</b>
                  </span>
                  <NavLink to="/groceries" className="navbar-item">
                    Groceries
                  </NavLink>
                  <NavLink to="/food" className="navbar-item">
                    Food
                  </NavLink>
                  <NavLink to="/package-delivery" className="navbar-item">
                    Package Delivery
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <NavLink to="/projects" className="navbar-item">
            Projects
          </NavLink>
          <NavLink to="/" className="navbar-item" />
          {this.props.auth.isAuthenticated && this.props.auth.user && (
            <Fragment>
              <NavLink to="/postjob" className="navbar-item">
                Post a job
              </NavLink>
              <NavLink to="/disputes" className="navbar-item">
                Disputes
              </NavLink>
            </Fragment>
          )}

          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p style={{ paddingTop: "5px" }}>
                  Hello {this.props.auth.user.username}
                </p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <Link to="/register" className="button is-dark">
                      <strong>Register</strong>
                    </Link>
                    <Link to="/login" className="button is-light">
                      Log in
                    </Link>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <Link
                    to="/"
                    onClick={this.handleLogOut}
                    className="button is-light"
                  >
                    Log out
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
