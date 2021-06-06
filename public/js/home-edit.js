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
