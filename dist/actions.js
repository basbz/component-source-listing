define([
  'app-core/dispatch',
  'source-listing/constants'
], function (Dispatch, Constants) {

  return {
    divideListing: function (division) {
      Dispatch.viewAction(Constants.DIVIDE_LISTING, {division: division});
    }
  };
});
