import React, { useState } from 'react';
import IndicatorsTreeNode from './IndicatorsTreeNode';


const IndicatorsTree = (props) => {

  const [isOpened, setIsOpened] = useState(false);

  const onSwitchClick = () => {
    setIsOpened(!isOpened);
  }

  return (
    <div>
      {/* {console.log('indicator tree render')} */}
      <IndicatorsTreeNode
        node={props.node}
        onSwitchClick={onSwitchClick}
        isOpened={isOpened}
        onNodeDownClick={props.onNodeDownClick}
      />

      <div className='modal-tree__children'>
        {isOpened && props.node.Children &&
          props.node.Children.map(subnode => {
            return (<IndicatorsTree
              key={subnode.ID}
              node={subnode}
              onNodeDownClick={props.onNodeDownClick}
            />)
          })
        }

      </div>

    </div>
  )
}


export default React.memo(IndicatorsTree);