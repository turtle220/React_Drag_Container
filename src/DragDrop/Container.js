import React from 'react'
import { ReactSortable } from 'react-sortablejs'
import BlockWrapper from './BlockWrapper'
import './index.css'

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost'
}

export default function Container({ block, blockIndex, setBlocks }) {
  return (
    <ReactSortable
      group={{
        name: 's',
        pull: true,
        put: true
      }}
      key={block.id}
      list={block.children}
      setList={(currentList) => {
        setBlocks((sourceList) => {
          const tempList = [...sourceList]
          const _blockIndex = [blockIndex]
          const lastIndex = _blockIndex.pop()
          const lastArr = _blockIndex.reduce(
            (arr, i) => arr[i]['children'],
            tempList
          )
          console.log(lastIndex)
          lastArr[lastIndex]['children'] = currentList
          return tempList
        })
      }}
      {...sortableOptions}>
      {block.children &&
        block.children.map((childBlock, index) => {
          return (
            <BlockWrapper
              key={childBlock.id}
              block={childBlock}
              blockIndex={[index]}
              setBlocks={setBlocks}
            />
          )
        })}
    </ReactSortable>
  )
}
