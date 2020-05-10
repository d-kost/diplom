import React, { Component } from "react";
import ValuesAreaCell from "./ValuesAreaCell";
import '../../sass/ValuesArea.sass';
import PropTypes from 'prop-types';

class ValuesArea extends Component {

  render() {
    return (
      <div className="field">

        {this.props.leftHeaderKeys.map(keyLeftList => {
          return (
            <div className="field__row" key={keyLeftList}>
              {this.props.topHeaderKeys.map(keyTopList => {

                let key = `${keyLeftList.join(' ')} ${keyTopList.join(' ')}`;
                // console.log('values area key', key);
                

                let value = this.props.obtainedValues.get(key);
                // console.log('values area value', value);
                return (
                  <ValuesAreaCell
                    key={keyTopList}
                    value={value}
                  />
                )
              }

              )}
            </div>)
        })}

      </div>
    )
  }

}

ValuesArea.propTypes = {
  obtainedValues: PropTypes.instanceOf(Map),
  topHeaderKeys: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  leftHeaderKeys: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
}

export default ValuesArea;