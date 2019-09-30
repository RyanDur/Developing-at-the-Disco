interface Deferred<T = any> {
  promise?: Promise<T>;
  resolve?: any;
  reject?: any;
}

const deferred: Deferred = {};

/* global Promise */
deferred.promise = new Promise((resolve, reject) => {
  deferred.resolve = resolve;
  deferred.reject = reject;
});

export default deferred;
