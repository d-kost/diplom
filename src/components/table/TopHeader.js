import React, { PureComponent } from 'react';
import HeadCell from './HeadCell';
import PropTypes from 'prop-types';

export default class TopHeader extends PureComponent {

  constructor(props) {
    super(props);

    this.headerList = [];

    this.pushNode = this.pushNode.bind(this);
    
  }

  componentDidMount() {
    this.props.setupTopHeaderList(this.headerList);
    
  }

  // shouldComponentUpdate(nextProps, nextState) {
    //т.к. this.state.headerList используется только после монтирования, дальше его отслеживать не надо
    //this.props.setupTopHeaderList используется тоже только после монтирования
    //(this.props.setupTopHeaderList !== nextProps.setupTopHeaderList)

    //update: this.state.headerList можно заменить
    //на this.headerList чтобы не обновлять. этот метод больше не нужен

    //update: метод нужен для setupTopHeaderList,
    //без метода вызывается дополнительная перерисовка всего TopHeader
    //исправляется PureComponent

  //   if ((this.props.tNodes !== nextProps.tNodes) ||
  //     (this.props.headerValues !== nextProps.headerValues)) {
  //       return true;
  //     }

  //   return false;
  // }

  pushNode(newElement) {
    this.headerList.push(newElement);
  }

  render() {

    return (
      <div className="head__horizontal">

        {/* {console.log('this.props.tNodes', this.props.tNodes)} */}

        {this.props.tNodes[0] &&
          this.props.headerValues[this.props.tNodes[0].Abbr].map(value =>

            <HeadCell
              key={value.ID}
              node={value}
              isSubnode={false}
              isOpened={true}
              isVertical={false}
              history={{
                nodePath: [value.ID],
                endNodes: []
              }}
              index={1}
              tNodes={this.props.tNodes}
              headerValues={this.props.headerValues}
              pushNode={this.pushNode}
            />

          )}
      </div>
    )
  }
}

TopHeader.propTypes = {
  tNodes: PropTypes.arrayOf(PropTypes.object),
  headerValues: PropTypes.object,
  setupTopHeaderList: PropTypes.func
};
