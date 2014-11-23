define(['react'], function (React) {
  var Divider = React.createClass({
    render: function () {
      return (
        <div className='source_list_divider'>
          <img src='modules/left/images/splitter.png' unselectable='on'/>
        </div>
      );
    }
  });

  return {
    mount: function (el) {
      React.renderComponent(<Divider/>, el);
    }
  };
});
