(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};

},{}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
(function (process){(function (){
/* 
(The MIT License)
Copyright (c) 2014-2021 Halász Ádám <adam@aimform.com>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//  Unique Hexatridecimal ID Generator
// ================================================

//  Dependencies
// ================================================
var pid = typeof process !== 'undefined' && process.pid ? process.pid.toString(36) : '' ;
var address = '';
if(typeof __webpack_require__ !== 'function'){
    var mac = '', networkInterfaces = require('os').networkInterfaces();
    loop:
    for(let interface_key in networkInterfaces){
        const networkInterface = networkInterfaces[interface_key];
        const length = networkInterface.length;
        for(var i = 0; i < length; i++){
            if(networkInterface[i] !== undefined && networkInterface[i].mac && networkInterface[i].mac != '00:00:00:00:00:00'){
                mac = networkInterface[i].mac; break loop;
            }
        }
    }
    address = mac ? parseInt(mac.replace(/\:|\D+/gi, '')).toString(36) : '' ;
} 

//  Exports
// ================================================
module.exports = module.exports.default = function(prefix, suffix){ return (prefix ? prefix : '') + address + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.process = function(prefix, suffix){ return (prefix ? prefix : '') + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.time    = function(prefix, suffix){ return (prefix ? prefix : '') + now().toString(36) + (suffix ? suffix : ''); }

//  Helpers
// ================================================
function now(){
    var time = Date.now();
    var last = now.last || time;
    return now.last = time > last ? time : last + 1;
}

}).call(this)}).call(this,require('_process'))
},{"_process":2,"os":1}],4:[function(require,module,exports){
const uniqid = require('uniqid');

const uf = require('../../public/js/tools/genUtility');

const td = document.querySelector('.todo');

const clientData = {};

// Codes inside function for readability
function createToDoCard(id, subject, tagDescription, description, dueDate) {
  const {
    tdCard,
    tdSubj,
    tdTag,
    tdDesc,
    tdDueDate,
    tdBtn,
    tdBotRow,
    tdTagImg1,
    tdTagImg2,
    tdTagImg3Plus,
    tdCloseBtn,
  } = uf.createElems({
    div: {
      tdCard: 'todo__card',
      tdTag: `todo__tag`,
      tdBtn: 'todo__btn',
      tdBotRow: 'todo__bot-row',
      tdCloseBtn: 'todo__btn',
    },
    input: {
      tdSubj: 'todo__subject todo__subject--admin',
      tdDueDate: 'todo__due-date todo__due-date--admin',
    },
    textarea: {
      tdDesc: 'todo__description todo__description--admin',
    },
    img: {
      tdTagImg1: '',
      tdTagImg2: '',
      tdTagImg3Plus: '',
    },
  });
  // Code inside function for readability
  function selectTdTagImg3Plus() {
    tdTagImg1.src = '1.png';
    tdTagImg2.src = '2.png';
    tdTagImg3Plus.src = 'w-3+.png';
    tdTagImg3Plus.className = tdTagImg3Plus.className.replace(
      'todo__tag-img--admin--unselected',
      'todo__tag-img--admin--selected'
    );
    tdTagImg2.className =
      'todo__tag-img todo__tag-img--admin todo__tag-img--admin--unselected';
    tdTagImg1.className =
      'todo__tag-img todo__tag-img--admin todo__tag-img--admin--unselected';
    tdTag.className = 'todo__tag bg-3Plus';
  }
  function selectTdTagImg2() {
    tdTagImg1.src = '1.png';
    tdTagImg2.src = 'w-2.png';
    tdTagImg3Plus.src = '3+.png';
    tdTagImg2.className = tdTagImg2.className.replace(
      'todo__tag-img--admin--unselected',
      'todo__tag-img--admin--selected'
    );
    tdTagImg1.className =
      'todo__tag-img todo__tag-img--admin todo__tag-img--admin--unselected';
    tdTagImg3Plus.className =
      'todo__tag-img todo__tag-img--admin todo__tag-img--admin--unselected';
    tdTag.className = 'todo__tag bg-2';
  }
  function selectTdTagImg1() {
    tdTagImg1.src = 'w-1.png';
    tdTagImg2.src = '2.png';
    tdTagImg3Plus.src = '3+.png';

    tdTagImg1.className = tdTagImg1.className.replace(
      'todo__tag-img--admin--unselected',
      'todo__tag-img--admin--selected'
    );
    tdTagImg2.className =
      'todo__tag-img todo__tag-img--admin todo__tag-img--admin--unselected';
    tdTagImg3Plus.className =
      'todo__tag-img todo__tag-img--admin todo__tag-img--admin--unselected';
    tdTag.className = 'todo__tag bg-1';
  }
  function showTdDesc() {
    tdBtn.textContent = '∧';
    tdCard.className = 'todo__card';
    tdDesc.className = 'todo__description todo__description--admin';
  }
  function hideTdDesc() {
    tdBtn.textContent = '∨';
    tdCard.className += ' todo__card--shrink';
    tdDesc.className += ' todo__description--hide';
  }
  function setListeners() {
    let state = true;
    tdBtn.addEventListener('click', () => {
      if (state === true) {
        state = false;
        hideTdDesc();
      } else {
        state = true;
        showTdDesc();
      }
    });
    tdTagImg1.addEventListener('click', () => {
      selectTdTagImg1();
      clientData[`${id}`].tag = 'Individual';
    });
    tdTagImg2.addEventListener('click', () => {
      selectTdTagImg2();
      clientData[`${id}`].tag = 'Partner';
    });
    tdTagImg3Plus.addEventListener('click', () => {
      selectTdTagImg3Plus();
      clientData[`${id}`].tag = 'Group';
    });
    tdCloseBtn.addEventListener('click', () => {
      tdCard.style.opacity = 0;
      setTimeout(() => {
        tdCard.remove();
      }, 500);
      delete clientData[`${id}`];
    });
    tdDesc.addEventListener('change', () => {
      clientData[`${id}`].description = tdDesc.value;
    });
    tdSubj.addEventListener('change', () => {
      clientData[`${id}`].subject = tdSubj.value;
    });
    tdDueDate.addEventListener('change', () => {
      clientData[`${id}`].dueDate = tdDueDate.value;
    });
  }
  function assignBasicValues() {
    tdTagImg1.title = 'Individual';
    tdTagImg2.title = 'Partner';
    tdTagImg3Plus.title = 'Group';

    tdSubj.placeholder = 'Subject';
    tdDesc.placeholder = 'Description';
    tdDueDate.placeholder = 'Due date';

    tdCloseBtn.textContent = 'x';
    tdBtn.textContent = '∧';
  }
  function selectInitialTdTag(tag) {
    switch (tag) {
      case 'Individual':
        tdTagImg1.className =
          'todo__tag-img todo__tag-img--admin todo__tag-img--admin--selected ';
        tdTagImg1.src = 'w-1.png';

        tdTagImg2.src = '2.png';
        tdTagImg3Plus.src = '3+.png';

        tdTagImg2.className =
          'todo__tag-img todo__tag-img--admin todo__tag-img--admin--unselected';

        tdTagImg3Plus.className =
          'todo__tag-img todo__tag-img--admin todo__tag-img--admin--unselected';
        tdTag.className = 'todo__tag bg-1';
        break;
      case 'Partner':
        tdTagImg2.className =
          'todo__tag-img todo__tag-img--admin todo__tag-img--admin--selected';
        tdTagImg2.src = 'w-2.png';
        tdTagImg1.src = '1.png';
        tdTagImg2.src = '2.png';
        tdTagImg3Plus.src = '3+.png';
        tdTagImg1.className =
          'todo__tag-img todo__tag-img--admin todo__tag-img--admin--unselected';

        tdTagImg3Plus.className =
          'todo__tag-img todo__tag-img--admin todo__tag-img--admin--unselected';
        tdTag.className = 'todo__tag bg-2';
        break;
      case 'Group':
        tdTagImg3Plus.className =
          'todo__tag-img todo__tag-img--admin todo__tag-img--admin--selected';
        tdTagImg3Plus.src = 'w-3+.png';
        tdTagImg1.src = '1.png';
        tdTagImg2.src = '2.png';

        tdTagImg2.className =
          'todo__tag-img todo__tag-img--admin todo__tag-img--admin--unselected';

        tdTagImg1.className =
          'todo__tag-img todo__tag-img--admin todo__tag-img--admin--unselected';
        tdTag.className = 'todo__tag bg-3Plus';
        break;
      default:
        tdTagImg1.src = '1.png';
        tdTagImg2.src = '2.png';
        tdTagImg3Plus.src = '3+.png';
        tdTagImg1.className =
          'todo__tag-img todo__tag-img--admin todo__tag-img--admin--unselected';

        tdTagImg2.className =
          'todo__tag-img todo__tag-img--admin todo__tag-img--admin--unselected';

        tdTagImg3Plus.className =
          'todo__tag-img todo__tag-img--admin todo__tag-img--admin--unselected';
    }
  }

  selectInitialTdTag(tagDescription);
  assignBasicValues();
  tdSubj.value = subject || '';
  tdDesc.textContent = description || '';
  tdDueDate.value = `Due date is ${dueDate || 'unknown'}`;
  setListeners();
  uf.appendElems([
    { parent: tdTag, children: [tdTagImg1, tdTagImg2, tdTagImg3Plus] },
    { parent: tdCard, children: [tdSubj, tdTag, tdCloseBtn, tdDesc] },
    { parent: tdBotRow, children: [tdDueDate, tdBtn] },
    { parent: tdCard, children: [tdBotRow] },
  ]);
  td.appendChild(tdCard);

  clientData[`${id}`] = {
    subject: tdSubj.value,
    description: tdDesc.textContent,
    dueDate: tdDueDate.value,
  };
}
async function getData() {
  const response = await fetch('/data');
  const data = await response.json();

  return data;
}
async function displayToDoCards() {
  const data = await getData();
  const items = Object.keys(data);
  items.forEach(item => {
    createToDoCard(
      item,
      data[`${item}`].subject,
      data[`${item}`].tag,
      data[`${item}`].description,
      data[`${item}`].dueDate
    );
  });
}

displayToDoCards();

document.querySelector('#add-card').addEventListener('click', () => {
  createToDoCard(uniqid());
});
document.querySelector('#update').addEventListener('click', () => {
  fetch('/data', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientData),
  });
  console.log(JSON.stringify(clientData));
});

},{"../../public/js/tools/genUtility":5,"uniqid":3}],5:[function(require,module,exports){
function find(needle, haystack) {
  const results = [];
  let idx = haystack.indexOf(needle);
  while (idx !== -1) {
    results.push(idx);
    idx = haystack.indexOf(needle, idx + 1);
  }
  return results;
}
function selClass(className) {
  return document.querySelector(`.${className}`);
}
function selId(idName) {
  return document.querySelector(`#${idName}`);
}
function crElem(element) {
  return document.createElement(`${element}`);
}
function AllOccurIndex(string, char) {
  const indices = [];
  let idx = string.indexOf(char);
  while (idx !== -1) {
    indices.push(idx);
    idx = string.indexOf(char, idx + 1);
  }
  return indices;
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createElems(config) {
  const elems = config;
  const res = {};
  for (let i = 0; i < Object.keys(elems).length; i += 1) {
    for (
      let j = 0;
      j < Object.keys(elems[`${Object.keys(elems)[i]}`]).length;
      j += 1
    ) {
      res[`${Object.keys(elems[`${Object.keys(elems)[i]}`])[j]}`] = crElem(
        `${Object.keys(elems)[i]}`
      );
      res[
        `${Object.keys(elems[`${Object.keys(elems)[i]}`])[j]}`
      ].className = `${
        elems[`${Object.keys(elems)[i]}`][
          `${Object.keys(elems[`${Object.keys(elems)[i]}`])[j]}`
        ]
      }`;
    }
  }
  return res;
}
function appendElems(config) {
  config.forEach(item => {
    const { parent } = item;
    item.children.forEach(child => {
      parent.appendChild(child);
    });
  });
}
function selElems(config) {
  const elems = config;
  const res = {};
  for (let i = 0; i < Object.keys(elems).length; i += 1) {
    res[`${Object.keys(elems)[i]}`] = selClass(
      `${elems[`${Object.keys(elems)[i]}`]}`
    );
  }
  return res;
}
function setAnim(action, timeout) {
  setTimeout(() => {
    action();
  }, timeout);
}
function start(time, action) {
  let timeRemaining = time;
  function count() {
    setTimeout(() => {
      timeRemaining -= 1;
      if (timeRemaining === 0) {
        action();
      } else {
        count();
      }
    }, 1000);
  }
  count();
}
module.exports.find = find;
module.exports.selClass = selClass;
module.exports.crElem = crElem;
module.exports.AllOccurIndex = AllOccurIndex;
module.exports.random = random;
module.exports.createElems = createElems;
module.exports.appendElems = appendElems;
module.exports.selElems = selElems;
module.exports.setAnim = setAnim;
module.exports.start = start;
module.exports.selId = selId;

},{}]},{},[4]);
