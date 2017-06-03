import React from 'react';

class PageTitle extends React.Component {
  render () {
    return (
      <h2 style={{margin: '30px 0'}}>{this.props.value}</h2>
    );
  }
}

export default PageTitle;
