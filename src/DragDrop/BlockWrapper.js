import React from 'react'
import Container from './Container'

export default function BlockWrapper({ block, blockIndex, setBlocks, renderBlockWrapperStyle }) {
  if (!block) return null
  if (block.type === 'container') {
    return (
      <div style={renderBlockWrapperStyle}>
        container: {block.content}
        <Container
          renderBlockWrapperStyle={renderBlockWrapperStyle}
          block={block}
          setBlocks={setBlocks}
          blockIndex={blockIndex}
        />
      </div>
    )
  } else {
    return (
      <div style={renderBlockWrapperStyle}>
        text: {block.content}
      </div>
    )
  }
}
