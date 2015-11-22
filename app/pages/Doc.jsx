import React, { PropTypes } from 'react'
import { createContainer } from 'amelisa'
import { Layout, Content } from 'react-mdl'
import { Header } from '../components/layout'

class Doc extends React.Component {

  static contextTypes = {
    model: React.PropTypes.object
  }

  static propTypes = {
    doc: PropTypes.object,
    params: PropTypes.object,
    user: PropTypes.object
  }

  getQueries () {
    let { collectionName, docId } = this.props.params
    let { userId } = this.context.model.get('_session')

    return {
      doc: [collectionName, docId],
      user: ['users', userId]
    }
  }

  set (event) {
    let value = event.nativeEvent.target.value
    let { collectionName, docId } = this.props.params
    console.log('set', collectionName, docId, value)
    this.context.model.set([collectionName, docId, 'name'], value)
  }

  render () {
    let { doc, user } = this.props
    console.log('render', doc, user)
    let name = 'no name'
    if (doc) name = doc.name

    return (
      <Layout fixedHeader={true}>
        <Header />
        <Content>
          <div className='page-content'>
            Doc {name}
            <input onChange={this.set.bind(this)} value={doc.name} />
          </div>
        </Content>
      </Layout>
    )
  }
}

export default createContainer(Doc, React)
