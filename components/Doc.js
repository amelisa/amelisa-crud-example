import React from 'react';
import { createContainer } from 'engine';

class Doc extends React.Component {

  getQueries() {
    let { collectionName, docId } = this.props.params;
    let { userId } = this.context.model.get('_auth', 'session');
    return {
      doc: [collectionName, docId],
      user: ['users', userId]
    };
  }

  set(event) {
    let value = event.nativeEvent.target.value;
    let { collectionName, docId } = this.props.params;
    console.log('set', collectionName, docId, value);
    this.context.model.set(collectionName, docId, 'name', value);
  }

  render() {
    let { doc, user } = this.props;
    console.log('render', doc, user);
    let name = 'no name';
    if (doc) name = doc.name;

    return (
      <div>
        Doc {name}
        <input onChange={this.set.bind(this)} value={doc.name} />
      </div>
    );
  }
}

Doc.contextTypes = {
  model: React.PropTypes.object
};

export default createContainer(Doc, React);
