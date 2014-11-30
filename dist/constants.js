define(function () {
  return [
    'ALBUM_INDEX_LOADED',
    'DIVIDE_LISTING',
  ].reduce(function (acc, key) {
    acc[key] = key;

    return acc;
  }, {});
});
