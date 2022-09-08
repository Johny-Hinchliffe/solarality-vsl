import React from 'react';

const ButtonSplit = ({option1, option2, click1, click2}) => {
  return (
    <div className="ui buttons fields">
    <button onClick={() => click1()} className="ui button field eight wide column">{option1}</button>
    <div className="or"></div>
    <button onClick={() => click2()} className="ui blue button field eight wide column">{option2}</button>
</div>
    )
};

export default ButtonSplit;
