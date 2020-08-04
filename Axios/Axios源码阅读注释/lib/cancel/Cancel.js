/*
 * @Descripttion: 
 * @version: 
 * @Author: dxiaoxing
 * @Date: 2020-08-03 18:35:15
 * @LastEditors: dxiaoxing
 * @LastEditTime: 2020-08-03 18:52:01
 */
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

// 用于标识一个取消的error
Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;
