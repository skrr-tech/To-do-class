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
  tdDueDate.value = dueDate || 'unknown';
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
    dueDate: `Due date is ${tdDueDate.value}`,
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
