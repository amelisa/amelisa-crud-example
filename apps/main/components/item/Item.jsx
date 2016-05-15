import React, { Component, PropTypes } from 'react'
import { Input } from 'react-amelisa'
import { Button, Card, CardTitle, CardText, CardActions, Textfield } from 'react-mdl'
// import DraftEditor from '../draft/DraftEditor'
import QuillEditor from '../quill/QuillEditor'

class Item extends Component {

  static contextTypes = {
    model: PropTypes.object,
    router: PropTypes.any
  }

  static propTypes = {
    item: PropTypes.object,
    edit: PropTypes.bool
  }

  static defaultProps = {
    edit: false
  }

  render () {
    let { item, edit } = this.props

    return (
      <Card key={item.id} style={styles.container} shadow={1}>
        <CardTitle style={styles.title}>{item.name}</CardTitle>
        <CardText>{item.description}</CardText>
        {edit && (
          <CardText>
            <Textfield
              floatingLabel
              label='Name'
              value={item.name}
              onChange={this.onNameChange}
            />
            {/* Input component handles cursor selection while colloborative editing */}
            <Input collectionName='items' docId={item.id} field='description'>
              <Textfield floatingLabel label='description' rows={5} />
            </Input>
            {/* <DraftEditor value={doc.longDescription} onChange={this.onDraftChange} />*/}
            <QuillEditor value={item.richDescription} onChange={this.onRichChange} />
          </CardText>
        )}
        <CardActions border>
          {!edit && <Button style={styles.showButton} onClick={this.onEdit}>Edit</Button>}
          <Button style={styles.deleteButton} onClick={this.onDelete}>Delete</Button>
        </CardActions>
      </Card>
    )
  }

  onNameChange = (event) => {
    let { item } = this.props
    let { model } = this.context
    let value = event.nativeEvent.target.value

    model.set(['items', item.id, 'name'], value)
  }

  onDraftChange = (value) => {
    let { item } = this.props
    let { model } = this.context

    model.draftDiff(['items', item.id, 'longDescription'], value)
  }

  onRichChange = (value) => {
    let { item } = this.props
    let { model } = this.context

    model.rich(['items', item.id, 'richDescription'], value)
  }

  onEdit = () => {
    let { item } = this.props
    let { router } = this.context

    router.push(`/items/${item.id}`)
  }

  onDelete = () => {
    let { item, edit } = this.props
    let { model, router } = this.context

    model.del('items', item.id)
    if (edit) router.push('/')
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'space-around',
    minHeight: 150,
    marginBottom: 20
  },
  title: {
    color: '#fff',
    background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'
  },
  deleteButton: {
    color: 'red'
  }
}

export default Item
