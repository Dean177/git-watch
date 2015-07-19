import React, { Component, PropTypes } from 'react';
import '!style!css!less!./DirectoryPicker.less';


class DirectoryPicker extends Component {
  static propTypes: {
      label: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired
    };

  componentDidMount() {
      // React will ignore custom attributes which aren't in its whitelist: https://github.com/facebook/react/issues/140
      this.refs.fileInput.getDOMNode().setAttribute('webkitdirectory', "true");
    }

  render() {
    return (
      <button className="DirectoryPicker">
        <label className="label" style={{cursor: 'pointer'}}>{ this.props.label }</label>
        <input className="input" type="file" ref="fileInput" onChange={ this.props.onChange } />
      </button>
    );
  }
}

export default DirectoryPicker;