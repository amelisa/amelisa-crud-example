import React, { Component, PropTypes } from 'react'
import { createContainer, Input } from 'amelisa/react'
import { Layout, Content } from 'react-mdl'
import { Header } from '../components/layout'
// import DraftEditor from '../components/editor/DraftEditor'

class DocPage extends Component {

  static contextTypes = {
    model: PropTypes.object
  };

  static propTypes = {
    doc: PropTypes.object,
    params: PropTypes.object,
    user: PropTypes.object
  };

  subscribe () {
    let { collectionName, docId } = this.props.params

    return {
      doc: [collectionName, docId]
    }
  }

  render () {
    let { collectionName, docId } = this.props.params
    let { doc } = this.props
    let name = doc ? doc.name : 'no name'

    return (
      <Layout fixedHeader={true}>
        <Header />
        <Content>
          <p>
            {name}
          </p>
          <p>
            <input onChange={this.onInputChange} value={name} />
          </p>
          <p>
            {/* Input component handles cursor selection while colloborative editing */}
            <Input className='input' collectionName={collectionName} docId={docId} field='description' />
          </p>
          {/* <DraftEditor value={doc.longDescription} onChange={this.onRichChange} />*/}
        </Content>
      </Layout>
    )
  }

  onInputChange = (event) => {
    let { collectionName, docId } = this.props.params
    let { model } = this.context
    let { value } = event.nativeEvent.target

    model.set([collectionName, docId, 'name'], value)
  };

  onRichChange = (value) => {
    let { collectionName, docId } = this.props.params
    let { model } = this.context

    model.richDiff([collectionName, docId, 'longDescription'], value)
  };
}

export default createContainer(DocPage)
