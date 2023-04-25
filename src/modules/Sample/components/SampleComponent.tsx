import React from 'react';

interface SampleComponentProps{
  loadCount: number;
  onLoad: () => void;
  afterLoad: () => void;
}
const SampleComponent = (props: SampleComponentProps) => {
  return (
    <div>SampleComponent</div>
  );
};

export default SampleComponent;
