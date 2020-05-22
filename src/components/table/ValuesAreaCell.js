import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

export default class ValuesAreaCell extends PureComponent {

  render() {
    return (
      <div className="field__cell cell-width cell-height">
        {console.log('ValuesAreaCell render')}
        {this.props.value}
      </div>
    )
  }
}

ValuesAreaCell.propTypes = {
  vNode: PropTypes.string,
  hNode: PropTypes.string
}
