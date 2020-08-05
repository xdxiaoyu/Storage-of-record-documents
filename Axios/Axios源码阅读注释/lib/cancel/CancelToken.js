/*
 * @Descripttion: 
 * @version: 
 * @Author: dxiaoxing
 * @Date: 2020-08-03 18:35:15
 * @LastEditors: dxiaoxing
 * @LastEditTime: 2020-08-05 17:43:28
 */
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  // 为取消请求准备一个promise对象，并保存resolve函数到外部
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  // 保存当前CancelToken 到token对象中
  var token = this;
  // 执行器在是外部定义，内部调用。
  // 立即执行接收的执行器函数，并传入用于取消请求的cancel函数
  // cancel函数是内部定义，外部调用
  executor(function cancel(message) {
    // 如果token中有reason了，说明请求已取消
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    // 将token的reason指定为一个Canel对象
    token.reason = new Cancel(message);
    // 将取消请求的promise指定为成功，值为reason
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;
