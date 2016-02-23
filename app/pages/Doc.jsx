import React, { PropTypes } from 'react'
import { createContainer } from 'amelisa/react'
import { Layout, Content } from 'react-mdl'
import { Header } from '../components/layout'

class Doc extends React.Component {

  static contextTypes = {
    model: React.PropTypes.object
  };

  static propTypes = {
    doc: PropTypes.object,
    params: PropTypes.object,
    user: PropTypes.object
  };

  getQueries () {
    let { collectionName, docId } = this.props.params

    return {
      doc: [collectionName, docId]
    }
  }

  set (event) {
    let value = event.nativeEvent.target.value
    let { collectionName, docId } = this.props.params
    console.log('set', collectionName, docId, value)
    this.context.model.set([collectionName, docId, 'name'], value)
  }

  render () {
    let { doc } = this.props
    let name = doc ? doc.name : 'no name'

    return (
      <Layout fixedHeader={true}>
        <Header />
        <Content>
          Doc {name}
          <input onChange={this.set.bind(this)} value={name} />
        </Content>
      </Layout>
    )
  }
}

export default createContainer(Doc, React)
