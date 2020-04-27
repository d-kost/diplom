import React, { useState } from 'react';
import DimensionsTreeNode from './DimensionsTreeNode';


const DimensionsTree = (props) => {

  const [isOpened, setIsOpened] = useState(false);

  const onSwitchClick = () => {
    setIsOpened(!isOpened);
  }

  return (
    <div>
      {/* {console.log('dimension tree render')} */}
      <DimensionsTreeNode
        node={props.node}
        onSwitchClick={onSwitchClick}
        isOpened={isOpened}
      />

      <div className={isOpened ? 'modal-tree--opened' : 'modal-tree--closed'}>

        {props.node.Children &&
          props.node.Children.map(subnode => {
            return (<DimensionsTree
              key={subnode.ID}
              node={subnode}
            />)
          })
        }

      </div>

    </div>
  )
}

export default DimensionsTree;