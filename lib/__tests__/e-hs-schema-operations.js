"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var HealthStorageODM = require('../healthStorage'); // import currently not working with jest config, need to be implemented later


test('Create a schema',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var Test;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return HealthStorageODM.createSchema({
            title: 'SomeTestSchema',
            properties: {
              title: {
                type: HealthStorageODM.STRING
              },
              views: {
                type: HealthStorageODM.INTEGER
              },
              active: {
                type: HealthStorageODM.BOOLEAN
              }
            },
            options: {
              id: '82897c48-92f8-4a7f-8360-929e8b88765c',
              oId: '82897c48-92f8-4a7f-4550-929e8b89076c',
              r: 1
            }
          });

        case 2:
          Test = _context.sent;
          expect(Test).toBeDefined();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test('Get a schema of current revision',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  var Test;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return HealthStorageODM.getSchema({
            id: '82897c48-92f8-4a7f-8360-929e8b88765c'
          });

        case 2:
          Test = _context2.sent;
          expect(Test).toBeDefined();

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
test('Get a schema revision',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee3() {
  var Test;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return HealthStorageODM.getSchema({
            id: '82897c48-92f8-4a7f-8360-929e8b88765c',
            r: 1
          });

        case 2:
          Test = _context3.sent;
          expect(Test).toBeDefined();

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));
test('Delete a schema ',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee4() {
  var isDeleted;
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return HealthStorageODM.deleteSchema('82897c48-92f8-4a7f-8360-929e8b88765c');

        case 2:
          isDeleted = _context4.sent;
          expect(isDeleted).toBe(true);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
})));