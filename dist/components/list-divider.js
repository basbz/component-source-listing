/** @jsx React.DOM */
define(['react'], function (React) {
  var Divider = React.createClass({displayName: 'Divider',
    render: function () {
      return (
        React.DOM.div({className: "source_list_divider"}, 
          React.DOM.img({src: "modules/left/images/splitter.png", unselectable: "on"})
        )
      );
    }
  });

  return {
    mount: function (el) {
      React.renderComponent(Divider(null), el);
    }
  };
});
