import React, { PureComponent } from "react";
import ValuesAreaCell from "./ValuesAreaCell";
import '../../sass/ValuesArea.sass';
import PropTypes from 'prop-types';

class ValuesArea extends PureComponent {

  render() {
    return (
      <div className="field">
        {console.log('ValuesArea begin render')}
        {this.props.leftHeaderKeys.map((keyLeftList, i) => {
          return (
            <div className="field__row" key={keyLeftList + ' ' + i}>
              {this.props.topHeaderKeys.map((keyTopList, j) => {

                let key = `${keyLeftList.join(' ')} ${keyTopList.join(' ')}`;
                // console.log('values area key', key);

                let cellKey = `${key} ${i} ${j}`;
                let value = this.props.obtainedValues.get(key);
                // console.log('values area value', value);
                return (
                  <ValuesAreaCell
                    key={cellKey}
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