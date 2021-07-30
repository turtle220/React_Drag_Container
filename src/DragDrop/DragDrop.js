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
  renderCardStyle,
  renderContainerStyle,
  onChange
}) {
  const [blocks, setBlocks] = useState(containersArray)
  const [items, setItems] = useState(itemsArray)
  useEffect(()=>{
    onChange(blocks, items)
  }, [blocks])
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={renderCardStyle}>
        <ReactSortable
          style={renderContainerStyle}
          list={blocks}
          // delay={2}
          sort={true}
          setList={setBlocks}
          // onChange={()=>{console.log('hererere-------')}}
          group={{
            name: 's',
            pull: false,
            put: false
          }}
          {...sortableOptions}>
          {blocks.map((block, index) => {
            return (
              <BlockWrapper
                key={block.id}
                block={block}
                blockIndex={[index]}
                setBlocks={setBlocks}
              />
            )
          })}
        </ReactSortable>
      </div>
      <div style={renderCardStyle}>
        <ReactSortable
          style={renderContainerStyle}
          list={items}
          setList={setItems}
          animation={300}
          delay={0}
          group={{
            name: 's',
            pull: true,
            put: true
          }}>
          {items.map((item, index) => (
            <ReactSortable
              style={renderContainerStyle}
              group={{
                name: 's',
                pull: true,
                put: true
              }}
              key={item.id}
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
                item.children.map((childBlock, index) => {
                  return (
                    <BlockWrapper
                      key={childBlock.id}
                      block={childBlock}
                      blockIndex={[index]}
                      setBlocks={setItems}
                    />
                  )
                })}
            </ReactSortable>
          ))}
        </ReactSortable>
      </div>
    </div>
  )
}
