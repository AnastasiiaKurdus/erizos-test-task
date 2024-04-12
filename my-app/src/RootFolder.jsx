import React, {Fragment, PureComponent } from 'react';
import {Folder} from './Folder';
import { hasIn, update } from 'lodash';


const getPredefinedPredicate = (expandedFolders) => {
  const predefinedProps = {}
  for (const path of expandedFolders) {
     update(predefinedProps, path.split('/').filter((name) => name.length > 0), (v) => v || {})
    }
    return (path) => hasIn(predefinedProps, path)
  }

const rewriteTree = (children, mapFn, parentPath=[]) => {
  return children.map(child => {
    const path = [...parentPath, child.name]
    if (child.type === "FILE") {
      return mapFn(child, path)
    } 
    else if (child.type === "FOLDER") {
      const newChildren = rewriteTree(child.children, mapFn, path)
      return mapFn({...child, children: newChildren}, path)
    } 
    else { return mapFn(child, path) }
  })
}

const initTree = (children, predefinedPred) => {
  return rewriteTree(children, (child, path) => {
    if (child.type === "FILE") {
      return {...child, isVisible: true}
    } else {
      return {
        ...child, 
        showChildren: predefinedPred(path),
        isVisible: true}
    }
  })
}

const matchSearchValue = (children, searchValue) => {
  return rewriteTree(children, (child, path) => {
    if (child.type === "FILE") {
      return {...child, isVisible: child.name.toLowerCase().includes(searchValue)}
    } else {
      const visibleChild = child.children.some(c => c.isVisible)
      return {...child, showChildren: visibleChild, isVisible: visibleChild}
    }
  })
}

class RootFolder extends PureComponent {
  state = {
    searchValue: ''
  };
  initChildren = initTree(this.props.data, getPredefinedPredicate(this.props.expandedFolders || []))
  currChildren = this.initChildren

  handleChange=(event)=>{
    const newSearchValue = event.target.value.toLowerCase();
    this.setState({searchValue: newSearchValue})
    this.currChildren = newSearchValue ? matchSearchValue(this.props.data, newSearchValue) : this.initChildren;
  };

  render() {
    return(
      <Fragment>
        <input value={this.state.searchValue} autoFocus onChange={this.handleChange} />
        <Folder 
          children = {this.currChildren}
          isVisible={true}
          showChildren={true}
        />
      </Fragment>)
  }
}

export default RootFolder;
