/** @jsx React.DOM */
define([
  'react',
  'source-listing/draggable'
], function (React, Draggable) {
  var Divider = React.createClass({displayName: 'Divider',
    render: function () {
      return (
        React.DOM.div({style: {top: this.props.pos + '%'}, onMouseDown: this.props.onMouseDown, className: "source_list_divider"}, 
          React.DOM.img({src: "modules/left/images/splitter.png", unselectable: "on"})
        )
      );
    }
  });

  return {
    mount: function (el, getArea) {
      var props, draggable, area;

      props = {
        pos: 50,

        drag: {
          onStart: function () {
            area = getArea();
          },

          onDrag: function (e) {
            props.pos = ((e.clientY - area.top) / area.height) * 100;
            render();
          }
        }
      };


      draggable = Draggable(props.drag);
      props.onMouseDown = draggable.onMouseDown;

      function render () {
        return React.renderComponent(Divider(props), el);
      }

      return render();
    }
  };
});
