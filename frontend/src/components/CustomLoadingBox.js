import React from 'react';

export default function CustomLoadingBox(props) {
  return (
    <div className="loading">
      <i className="fa fa-spinner fa-spin"></i> {props.children}
    </div>
  );
}