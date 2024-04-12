import React, { PureComponent } from 'react';

class File extends PureComponent {
  render() {
    const { name, isVisible} = this.props;
    return isVisible && <li className='file-name'>{name}</li>;
  }
};

export default File;
