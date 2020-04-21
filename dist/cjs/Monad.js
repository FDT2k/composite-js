'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Task = function Task(fork) {
  return {
    map: function map(f) {
      return Task(function (reject, resolve) {
        return fork(reject, function (a) {
          return resolve(f(a));
        });
      });
    },
    chain: function chain(f) {
      return Task(function (reject, resolve) {
        return fork(reject, function (a) {
          return f(a).fork(reject, resolve);
        });
      });
    },
    fork: fork
  };
};

Task.of = function (a) {
  return Task(function (_, res) {
    return res(a);
  });
};

Task.rejected = function (a) {
  return Task(function (rej, _) {
    return rej(a);
  });
};

var TaskFromPromiseThunk = function TaskFromPromiseThunk(promise) {
  return Task(function (reject, resolve) {
    return promise().then(resolve)["catch"](reject);
  });
};

var TaskFromPromise = function TaskFromPromise(promise) {
  return TaskFromPromiseThunk(function (_) {
    return promise;
  });
};

exports.Task = Task;
exports.TaskFromPromise = TaskFromPromise;
exports.TaskFromPromiseThunk = TaskFromPromiseThunk;
