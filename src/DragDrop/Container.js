import React from 'react'
import { ReactSortable } from 'react-sortablejs'
import BlockWrapper from './BlockWrapper'

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost'
}

export default function Container({ block, blockIndex, setBlocks, renderBlockWrapperStyle, onBlockWrapper }) {
  const handleBlockEnd = () => {
    onBlockWrapper()
  }
  return (
    <ReactSortable
      group={{
        name: 's',
        pull: true,
        put: true
      }}
      key={block.id}
      list={block.children}
      onEnd={handleBlockEnd}
      setList={(currentList) => {
        setBlocks((sourceList) => {
          const tempList = [...sourceList]
          const _blockIndex = [blockIndex]
          const lastIndex = _blockIndex.pop()
          const lastArr = _blockIndex.reduce(
            (arr, i) => arr[i]['children'],
            tempList
          )
          lastArr[lastIndex]['children'] = currentList
          return tempList
        })
      }}
      {...sortableOptions}>
      { block.children &&
        block.children.map((childBlock, index) => {
          return (
            <BlockWrapper
              renderBlockWrapperStyle={renderBlockWrapperStyle}
              key={index}
              block={childBlock}
              blockIndex={[index]}
              setBlocks={setBlocks}
            />
          )
        })}
    </ReactSortable>
  )
}
