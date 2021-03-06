import React, { Component } from "react";
import { observer } from "mobx-react";

import userStore from "../../stores/userStore";
import "./styles/Users.scss";

const componentsByMode = {};

@observer
class SocialContacts extends Component {
  state = {
    mode: Object.keys(componentsByMode)[0]
  };

  setMode = mode => {
    this.setState({ mode });
  };

  render() {
    if (!this.state.mode || !userStore.user) {
      return <span />;
    }

    const socialModes = Object.keys(componentsByMode);
    const isDropdownShown = socialModes && socialModes.length > 1;

    return (
      <div className="SocialContacts uk-position-right">
        <div className="uk-inline">
          <h4>
            {this.state.mode}
            {isDropdownShown && <span uk-icon="icon: triangle-down"> </span>}
          </h4>
          {isDropdownShown && (
            <div uk-dropdown="pos: bottom-justify">
              <ul className="uk-nav uk-dropdown-nav">
                {socialModes.map((mode, i) => {
                  return mode !== this.state.mode ? (
                    <li key={i}>
                      <EmptyLink mode={mode} setMode={this.setMode} />
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}
        </div>
        {componentsByMode[this.state.mode](this.props.history)}
      </div>
    );
  }
}

const EmptyLink = ({ mode, setMode }) => (
  // eslint-disable-next-line
  <a onClick={() => setMode(mode)}>{mode}</a>
);

export default SocialContacts;
