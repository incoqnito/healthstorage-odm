"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var HSODM = require('../healthStorage'); // import currently not working with jest config, need to be implemented later


var CLIENT = new HSODM({
  serverUrl: 'http://localhost:8080',
  adapter: 'healthStorageApi'
});
var HS_INSTANCE = CLIENT.define({
  'title': 'TodoSchema',
  'properties': {
    'title': {
      'type': HSODM.STRING
    },
    'isCompleted': {
      'type': HSODM.INTEGER
    }
  },
  'options': {
    required: ['md'],
    id: '82897c48-92f8-4a7f-8360-929e8b12356c',
    oId: '82897c48-92f8-4a7f-4550-929e8b12356c',
    r: 1
  }
});
test('Edit sdo via model',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var todo1, todo1Edited;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo1 - Created',
            'isCompleted': 0
          });

        case 2:
          todo1 = _context.sent;
          todo1.title = 'Todo1 - Edited by model';
          _context.next = 6;
          return todo1.update();

        case 6:
          todo1Edited = _context.sent;
          expect(todo1Edited.title).toBe('Todo1 - Edited by model');

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test('Check sdo changed sinced sepcified via model',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  var todo2, changedSince;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo2 - Sdo changed',
            'isCompleted': 0
          });

        case 2:
          todo2 = _context2.sent;
          _context2.next = 5;
          return todo2.changedSince();

        case 5:
          changedSince = _context2.sent;
          expect(changedSince).toBe(false);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
test('Lock item via model',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee3() {
  var todo3;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo3 - Lock sdo',
            'isCompleted': 0
          });

        case 2:
          todo3 = _context3.sent;
          _context3.next = 5;
          return todo3.lock();

        case 5:
          expect(todo3.lockValue).toBeDefined();

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));
test('Unlock item via model',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee4() {
  var todo4;
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo4 - Unlock sdo',
            'isCompleted': 0
          });

        case 2:
          todo4 = _context4.sent;
          _context4.next = 5;
          return todo4.lock();

        case 5:
          _context4.next = 7;
          return todo4.unlock();

        case 7:
          expect(todo4.lockValue).toBe(null);

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
})));
test('Check is locked item via model',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee5() {
  var todo6, isLocked;
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo6 - Is locked',
            'isCompleted': 0
          });

        case 2:
          todo6 = _context5.sent;
          _context5.next = 5;
          return todo6.isLocked();

        case 5:
          isLocked = _context5.sent;
          expect(isLocked).toBe(false);

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5, this);
})));
test('Exists not in lock state via model',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee6() {
  var todo7, lockState;
  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo6 - Exists in lock state',
            'isCompleted': 0
          });

        case 2:
          todo7 = _context6.sent;
          _context6.next = 5;
          return todo7.existInLockState();

        case 5:
          lockState = _context6.sent;
          expect(lockState).toBe(false);

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6, this);
})));
test('Get archive via model',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee7() {
  var todo8, archive;
  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo8 - Get Archive',
            'isCompleted': 0
          });

        case 2:
          todo8 = _context7.sent;
          todo8.title = 'Todo8 - Edited for revision';
          _context7.next = 6;
          return todo8.update();

        case 6:
          archive = todo8.getArchive();
          expect(archive).toBeDefined();

        case 8:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7, this);
})));
test('Get archive revision numbers via model',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee8() {
  var todo9, editedTodo9, archiveRevNumbers;
  return regeneratorRuntime.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo9 - Get Archive',
            'isCompleted': 0
          });

        case 2:
          todo9 = _context8.sent;
          todo9.title = 'Todo9 - Edited for revision';
          _context8.next = 6;
          return todo9.update();

        case 6:
          editedTodo9 = _context8.sent;
          _context8.next = 9;
          return editedTodo9.getArchiveRevisionNumbers();

        case 9:
          archiveRevNumbers = _context8.sent;
          expect(archiveRevNumbers.length).toBe(1);

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8, this);
})));
test('Delete sdo by id via model',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee9() {
  var todos, todo, deletedId;
  return regeneratorRuntime.wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return HS_INSTANCE.findAll();

        case 2:
          todos = _context9.sent;
          _context9.t0 = regeneratorRuntime.keys(todos.list);

        case 4:
          if ((_context9.t1 = _context9.t0()).done) {
            _context9.next = 12;
            break;
          }

          todo = _context9.t1.value;
          _context9.next = 8;
          return todos.list[todo].destroy();

        case 8:
          deletedId = _context9.sent;
          expect(deletedId).toBe(todos.list[todo].md.id);
          _context9.next = 4;
          break;

        case 12:
        case "end":
          return _context9.stop();
      }
    }
  }, _callee9, this);
})));