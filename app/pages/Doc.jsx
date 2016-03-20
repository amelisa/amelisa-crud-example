import React, { PropTypes } from 'react'
import { createContainer, Input } from 'amelisa/react'
import { Layout, Content } from 'react-mdl'
import { Header } from '../components/layout'
import DraftEditor from '../components/editor/DraftEditor'

class Doc extends React.Component {
  static contextTypes = {
    model: React.PropTypes.object
  };

  static propTypes = {
    doc: PropTypes.object,
    params: PropTypes.object,
    user: PropTypes.object
  };

  // shouldComponentUpdate (nextProps) {
  //   return nextProps.doc.name !== this.props.doc.name
  // }

  getQueries () {
    let { collectionName, docId } = this.props.params

    return {
      doc: [collectionName, docId]
    }
  }

  set (event) {
    let { collectionName, docId } = this.props.params
    let { value } = event.nativeEvent.target
    console.log('set', collectionName, docId, value)
    this.context.model.set([collectionName, docId, 'name'], value)
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
            <input onChange={this.set.bind(this)} value={name} />
          </p>
          <p>
            <Input className='input' collectionName={collectionName} docId={docId} field='description' />
          </p>
          {/* <DraftEditor value={doc.longDescription} onChange={this.onChange} />*/}
        </Content>
      </Layout>
    )
  }

  onChange = (value) => {
    let { collectionName, docId } = this.props.params
    console.log('onChange', value, value.map((block) => {
      return block.key + ' - ' + block.text
    }))
    this.context.model.richDiff([collectionName, docId, 'longDescription'], value)
  };
}

export default createContainer(Doc, React)
