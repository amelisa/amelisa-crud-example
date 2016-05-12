import React, { Component, PropTypes } from 'react'
import { CharacterMetadata, ContentBlock, ContentState, Editor, EditorState, RichUtils, SelectionState } from 'draft-js'
import Immutable from 'immutable'
import InlineStyleControls from './InlineStyleControls'

class DraftEditor extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  static propTypes = {
    collectionName: PropTypes.string,
    docId: PropTypes.string,
    field: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
  }

  state = {}

  render () {
    let editorState = this.getEditorState()

    return (
      <div>
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <Editor editorState={editorState} onChange={this.onChange} />
      </div>
    )
  }

  getEditorState () {
    let { value } = this.props
    let { editorState } = this.state

    if (!value) return EditorState.createEmpty()

    let blocks = value.map((block) => {
      let characterList = block.characterList.map((char) => {
        let entity = null
        if (char.entity && Object.keys(char.entity).length > 0) {
          entity = char.entity
        }
        let style = Immutable.OrderedSet(char.style)
        return CharacterMetadata.create({entity, style})
      })
      characterList = Immutable.List(characterList)
      return new ContentBlock(Object.assign({}, block, {characterList}))
    })

    let contentState = ContentState.createFromBlockArray(blocks)

    if (editorState) {
      EditorState.push(editorState, contentState, 'insert-characters')
    } else {
      let firstKey = contentState.getBlockMap().first().getKey()
      let selection = SelectionState.createEmpty(firstKey)

      editorState = EditorState.create({
        currentContent: contentState,
        undoStack: Immutable.Stack(),
        redoStack: Immutable.Stack(),
        decorator: null,
        selection
      })
    }

    return editorState
  }

  onChange = (editorState) => {
    let { onChange } = this.props
    let blocks = editorState.getCurrentContent().getBlocksAsArray()
    blocks = blocks.map((block) => block.toJS())

    this.setState({
      editorState
    })

    if (onChange) onChange(blocks)
  }

  toggleInlineStyle = (inlineStyle) => {
    let editorState = this.getEditorState()
    editorState = RichUtils.toggleInlineStyle(editorState, inlineStyle)
    this.onChange(editorState)
  }
}

export default DraftEditor
