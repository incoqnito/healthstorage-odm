"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
test('Create todo via instance',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var todo1;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo1 - Create Test',
            'isCompleted': 0
          });

        case 2:
          todo1 = _context.sent;
          expect(todo1.constructor.name).toBe('HsModel');

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test('Edit todo by id via instance',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  var todo2, editData, todo2Edited;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo2',
            'isCompleted': 0
          });

        case 2:
          todo2 = _context2.sent;
          editData = {
            'title': 'Todo2 - Edit Test',
            'isCompleted': 0,
            'md': todo2.md
          };
          _context2.next = 6;
          return HS_INSTANCE.updateById(editData);

        case 6:
          todo2Edited = _context2.sent;
          expect(todo2Edited.title).toBe('Todo2 - Edit Test');

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
test('Find all todos via instance',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee3() {
  var todos;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return HS_INSTANCE.findAll();

        case 2:
          todos = _context3.sent;
          expect(_typeof(todos.list)).toBe('object');

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));
test('Find todo by id via instance',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee4() {
  var todo3, foundTodo;
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo3 - Find this one by Id',
            'isCompleted': 0
          });

        case 2:
          todo3 = _context4.sent;
          _context4.next = 5;
          return HS_INSTANCE.findById(todo3.md.id);

        case 5:
          foundTodo = _context4.sent;
          expect(foundTodo.md.id).toBe(todo3.md.id);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
})));
test('Check sdo changed sinced specified via instance',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee5() {
  var todo4, changedSince;
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo4',
            'isCompleted': 0
          });

        case 2:
          todo4 = _context5.sent;
          _context5.next = 5;
          return HS_INSTANCE.changedSince(todo4.md.id, todo4.md.r);

        case 5:
          changedSince = _context5.sent;
          expect(changedSince).toBeDefined();

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5, this);
})));
test('Lock item via instance',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee6() {
  var todo5, lockValue;
  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo5 - Lock item',
            'isCompleted': 0
          });

        case 2:
          todo5 = _context6.sent;
          _context6.next = 5;
          return HS_INSTANCE.lockById(todo5.md.id);

        case 5:
          lockValue = _context6.sent;
          expect(lockValue).toBeDefined();

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6, this);
})));
test('Unlock item via instance',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee7() {
  var todo6, lockValue, unlockedTodo;
  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo6 - Unlock Item',
            'isCompleted': 0
          });

        case 2:
          todo6 = _context7.sent;
          _context7.next = 5;
          return HS_INSTANCE.lockById(todo6.md.id);

        case 5:
          lockValue = _context7.sent;
          _context7.next = 8;
          return HS_INSTANCE.unlockById(todo6.md.id, lockValue.value);

        case 8:
          unlockedTodo = _context7.sent;
          expect(unlockedTodo).toBeDefined();

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7, this);
})));
test('Get lock data from item via instance',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee8() {
  var todo7, lockValue, lockData;
  return regeneratorRuntime.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo7 - Get lock data',
            'isCompleted': 0
          });

        case 2:
          todo7 = _context8.sent;
          _context8.next = 5;
          return HS_INSTANCE.lockById(todo7.md.id);

        case 5:
          lockValue = _context8.sent;
          _context8.next = 8;
          return HS_INSTANCE.getLockDataById(todo7.md.id, lockValue.value);

        case 8:
          lockData = _context8.sent;
          expect(lockData).toBeDefined();

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8, this);
})));
test('Check is locked item via instance',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee9() {
  var todo8, lockValueTodo8, isLockedTodo8;
  return regeneratorRuntime.wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo7 - Is locked true',
            'isCompleted': 0
          });

        case 2:
          todo8 = _context9.sent;
          _context9.next = 5;
          return HS_INSTANCE.lockById(todo8.md.id);

        case 5:
          lockValueTodo8 = _context9.sent;
          _context9.next = 8;
          return HS_INSTANCE.isLockedById(todo8.md.id, lockValueTodo8.value);

        case 8:
          isLockedTodo8 = _context9.sent;
          expect(isLockedTodo8).toBe(true);

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  }, _callee9, this);
})));
test('Check item not exists in lock state via instance',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee10() {
  var todo9, existsNotInLockState;
  return regeneratorRuntime.wrap(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo9 - Exists in lock state',
            'isCompleted': 0
          });

        case 2:
          todo9 = _context10.sent;
          _context10.next = 5;
          return HS_INSTANCE.isLockedById(todo9.md.id, '');

        case 5:
          existsNotInLockState = _context10.sent;
          expect(existsNotInLockState).toBe(false);

        case 7:
        case "end":
          return _context10.stop();
      }
    }
  }, _callee10, this);
})));
test('Get full sdo revisions via instance',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee11() {
  var todo10, editData, sdoRevisons;
  return regeneratorRuntime.wrap(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo10 - Test edit',
            'isCompleted': 0
          });

        case 2:
          todo10 = _context11.sent;
          editData = {
            'title': 'Todo10 - Test edited',
            'isCompleted': 0,
            'md': todo10.md
          };
          _context11.next = 6;
          return HS_INSTANCE.updateById(editData);

        case 6:
          _context11.next = 8;
          return HS_INSTANCE.getArchiveBySdoId(todo10.md.id);

        case 8:
          sdoRevisons = _context11.sent;
          expect(sdoRevisons).toBeDefined();

        case 10:
        case "end":
          return _context11.stop();
      }
    }
  }, _callee11, this);
})));
test('Get sdo revision numbers via instance',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee12() {
  var todo11, editData, sdoRevisonNumbers;
  return regeneratorRuntime.wrap(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return HS_INSTANCE.create({
            'title': 'Todo10 - Test edit',
            'isCompleted': 0
          });

        case 2:
          todo11 = _context12.sent;
          editData = {
            'title': 'Todo11 - Test edited',
            'isCompleted': 0,
            'md': todo11.md
          };
          _context12.next = 6;
          return HS_INSTANCE.updateById(editData);

        case 6:
          _context12.next = 8;
          return HS_INSTANCE.getRevisionsArchiveBySdoId(todo11.md.id);

        case 8:
          sdoRevisonNumbers = _context12.sent;
          expect(sdoRevisonNumbers.length).toBe(1);

        case 10:
        case "end":
          return _context12.stop();
      }
    }
  }, _callee12, this);
})));
test('Delete sdo by id via instance',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee13() {
  var todos, todo, deletedId;
  return regeneratorRuntime.wrap(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return HS_INSTANCE.findAll();

        case 2:
          todos = _context13.sent;
          _context13.t0 = regeneratorRuntime.keys(todos.list);

        case 4:
          if ((_context13.t1 = _context13.t0()).done) {
            _context13.next = 12;
            break;
          }

          todo = _context13.t1.value;
          _context13.next = 8;
          return HS_INSTANCE.deleteById(todos.list[todo].md.id);

        case 8:
          deletedId = _context13.sent;
          expect(deletedId).toBe(todos.list[todo].md.id);
          _context13.next = 4;
          break;

        case 12:
        case "end":
          return _context13.stop();
      }
    }
  }, _callee13, this);
})));