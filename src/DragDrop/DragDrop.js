import React, { useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import BlockWrapper from './BlockWrapper'

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost'
}

export default function DragDrop({
  containersArray,
  itemsArray,
  renderCardStyle1,
  renderCardStyle2,
  renderContainerStyle,
  renderBlockWrapperStyle,
  onChange
}) {
  const [blocks, setBlocks] = useState(containersArray)
  const [items, setItems] = useState(itemsArray)

  const handleListEnd = () => {
    onChange(blocks, items)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={renderCardStyle1}>
        <ReactSortable
          style={renderContainerStyle}
          list={blocks}
          delay={2}
          sort={true}
          setList={setBlocks}
          group={{
            name: 's',
            pull: false,
            put: false
          }}
          {...sortableOptions}>
          {blocks.map((block, index) => {
            return (
              <BlockWrapper
                renderBlockWrapperStyle={renderBlockWrapperStyle}
                key={block.id}
                block={block}
                onBlockEnd={handleListEnd}
                blockIndex={[index]}
                setBlocks={setBlocks}
              />
            )
          })}
        </ReactSortable>
      </div>
      <div style={renderCardStyle2}>
        {items &&
          items.map((item, index) => (
            <ReactSortable
              key={index}
              style={renderContainerStyle}
              group={{
                name: 's',
                pull: true,
                put: true
              }}
              sort={true}
              onEnd={handleListEnd}
              list={item.children}
              setList={(currentList) => {
                setItems((sourceList) => {
                  const tempList = [...sourceList]
                  const _blockIndex = [index]
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
              {item.children &&
                item.id &&
                item.children.length > 0 &&
                item.children.map((childBlock, index) => {
                  return (
                    <BlockWrapper
                      renderBlockWrapperStyle={renderBlockWrapperStyle}
                      key={index}
                      block={childBlock}
                      blockIndex={[index]}
                      setBlocks={setItems}
                    />
                  )
                })}
            </ReactSortable>
          ))}
      </div>
    </div>
  )
}
