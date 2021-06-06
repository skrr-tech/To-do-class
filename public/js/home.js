(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const uf = require('./tools/genUtility');

const td = document.querySelector('.todo');
function tagIcon(inputTag) {
  console.log(inputTag);
  switch (inputTag) {
    case 'Individual':
      return 'w-1.png';

    case 'Partner':
      return 'w-2.png';

    case 'Group':
      return 'w-3+.png';

    default:
      return 'e.png';
  }
}
function tagBg(inputTag) {
  switch (inputTag) {
    case 'Individual':
      return 'bg-1';

    case 'Partner':
      return 'bg-2';

    case 'Group':
      return 'bg-3Plus';

    default:
      return 'e.png';
  }
}
function createToDoCard(subject, description, dueDate, tag) {
  const {
    tdCard,
    tdSubj,
    tdTag,
    tdDesc,
    tdDueDate,
    tdBtn,
    tdBotRow,
    tdTagImg,
  } = uf.createElems({
    div: {
      tdCard: 'todo__card',
      tdSubj: 'todo__subject',
      tdTag: `todo__tag ${tagBg(tag)}`,
      tdDesc: 'todo__description',
      tdDueDate: 'todo__due-date',
      tdBtn: 'todo__btn',
      tdBotRow: 'todo__bot-row',
    },
    img: {
      tdTagImg: 'todo__tag-img',
    },
  });

  tdTagImg.src = tagIcon(tag);
  tdBtn.textContent = '∧';
  tdSubj.textContent = subject;
  tdTagImg.title = tag;
  tdDesc.textContent = description;
  tdDueDate.textContent = dueDate;
  uf.appendElems([
    { parent: tdTag, children: [tdTagImg] },
    { parent: tdCard, children: [tdSubj, tdTag, tdDesc] },
    { parent: tdBotRow, children: [tdDueDate, tdBtn] },
    { parent: tdCard, children: [tdBotRow] },
  ]);
  let state = true;
  function showTdDesc() {
    tdBtn.textContent = '∧';
    tdCard.className = 'todo__card';
    tdDesc.className = 'todo__description';
  }
  function hideTdDesc() {
    tdBtn.textContent = '∨';
    tdCard.className += ' todo__card--shrink';
    tdDesc.className += ' todo__description--hide';
  }
  tdBtn.addEventListener('click', () => {
    if (state) {
      state = false;
      return hideTdDesc();
    }
    state = true;
    return showTdDesc();
  });
  td.appendChild(tdCard);
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
      data[`${item}`].subject,
      data[`${item}`].description,
      data[`${item}`].dueDate,
      data[`${item}`].tag
    );
  });
}

displayToDoCards();

},{"./tools/genUtility":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
