define(function () {
  var $ = jQuery, $overlay, $body = $('body', parent.document), store = [];

  $overlay = $('<div style="position:absolute; left:0; top:0; width:100%; height:100%; z-index:1; background:#000; opacity:0;"/>');

  function fn () {}

  function observe (mousemove) {
    $body.bind('mousemove', mousemove);

    return function () {
      $body.unbind('mousemove', mousemove);
    };
  }

  function cancel_all (e) {
    remove_overlay();

    store.forEach(function (drag) {
      drag.cancel(e);
    });
  }

  function add_overlay() {
    $body.append($overlay);
  }

  function remove_overlay() {
    $overlay.remove();
  }

  $body.bind('mouseup', cancel_all);

  function watch (drag, point, e) {
    var release;

    if(Math.abs(e.pageX - point.x) > drag.delta || Math.abs(e.pageY - point.y) > drag.delta) {
      add_overlay();
      drag.cancel();
      drag.onStart(point, e);
      release = observe(follow.bind(null, drag));
      drag.cancel = function (e) {
        release();
        drag.onEnd(e);
      };
    }
  }

  function follow (drag, e) {
    drag.onDrag(e);
  }


  function onMouseDown(drag, e) {
    cancel_all();

    if(e.button !== 0)
      return;

    e.stopPropagation();
    e.preventDefault();
    drag.cancel = observe(watch.bind(null, drag, {x: e.pageX, y: e.pageY}));
  }

  return function create (options) {
    options = options || {};

    var drag = {
      cancel: fn,
      delta: options.delta || 3,
      onStart: options.onStart || fn,
      onDrag: options.onDrag || fn,
      onEnd: options.onEnd || fn
    };

    store.push(drag);

    return {
      onMouseDown: onMouseDown.bind(null, drag)
    };
  };
});
