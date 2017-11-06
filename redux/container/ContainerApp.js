import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RootNavigation from '../../navigation/RootNavigation';
import * as SaveActions from '../actions';

class ContainerApp extends Component {
  render() {
    const { results, actions } = this.props !== undefined ? this.props : {};

    return (
      <RootNavigation results={results} actions={actions} />
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.results,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SaveActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerApp);
