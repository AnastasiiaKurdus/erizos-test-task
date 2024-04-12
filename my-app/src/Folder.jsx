import React, { PureComponent } from 'react';
import cx from 'classnames';
import File from './File';

export class Folder extends PureComponent{
  state = {
    showChildren: this.props.showChildren
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.showChildren!==this.props.showChildren){
      this.setState({showChildren: this.props.showChildren})
    }
  };
  handleClick = () => {
    this.setState({showChildren: !this.state.showChildren})
  };
  render () {
    const {name, children, isVisible} = this.props;
    const {showChildren} = this.state;
    const childrenList = 
      <ul>
        {children.map((child, index) => { 
        if(child.type === 'FOLDER') return <Folder key={index} {...child}/>
        else if(child.type === 'FILE') return <File key={index} {...child}/>
        return null
        })}
      </ul>      
    return name ?
           isVisible && 
            <li className={cx('folder-name', showChildren && 'expanded')}>
              <span onClick={this.handleClick}>{name}</span>
              {showChildren && childrenList}
            </li> :
            childrenList
  }
}