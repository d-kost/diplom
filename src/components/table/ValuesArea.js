import React, { PureComponent } from "react";
import ValuesAreaCell from "./ValuesAreaCell";
import '../../sass/ValuesArea.sass';
import PropTypes from 'prop-types';
import sassVars from '../../sass/_vars.scss';

class ValuesArea extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      maxTableHeight: parseInt(sassVars.maxTableHeight, 10),
      maxTableWidth: parseInt(sassVars.maxTableWidth, 10),
      cellWidth: parseInt(sassVars.cellWidth, 10),
      cellHeight: parseInt(sassVars.cellHeight, 10)
    }
  }



  render() {
    const top = this.props.scrollData.scrollTop;
    const bottom = this.state.maxTableHeight + top;

    const left = this.props.scrollData.scrollLeft;
    const right = this.state.maxTableWidth + left;


    return (
      <div className="field">
        {/* {console.log('ValuesArea begin render')} */}

        {this.props.leftHeaderKeys.map((keyLeftList, i) => {
          // console.log('height * i, bottom', height * i + ' ' + bottom)
          return (


            (this.state.cellHeight * i + this.state.cellHeight <= bottom) &&
            <div className="field__row" key={keyLeftList + ' ' + i}>
              {this.props.topHeaderKeys.map((keyTopList, j) => {

                let key = `${keyLeftList.join(' ')} ${keyTopList.join(' ')}`;
                // console.log('values area key', key);

                let cellKey = `${key} ${i + j}`;
                let value = this.props.hashTable.get(key);
                // console.log('values area value', value);  : <div className="field__cell cell-width cell-height">qwe</div>
                return (

                  (this.state.cellWidth * j + this.state.cellWidth <= right) &&
                  <ValuesAreaCell key={cellKey} value={value} />

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
  hashTable: PropTypes.instanceOf(Map),
  topHeaderKeys: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  leftHeaderKeys: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  scrollData: PropTypes.objectOf(PropTypes.number, PropTypes.number)
}

export default ValuesArea;