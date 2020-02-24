/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка 'добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const cookieName = document.querySelector('#add-name-input');

const cookieValue = document.querySelector('#add-value-input');

filterNameInput.addEventListener('keyup', function () {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
});

addButton.addEventListener('click', function () {
    document.cookie = `${cookieName.value}=${cookieValue.value}`;

    addCookieToTable();
    // здесь можно обработать нажатие на кнопку "добавить cookie"
});

function addCookieToTable() {
    if (document.cookie === '') {

    } else {
        listTable.innerHTML = '';
        let array = document.cookie.split('; ');

        for (let value of array) {
            let cookie = value.split('=');

            if (filterNameInput.value.length === 0 || isMatching(cookie[1], filterNameInput.value)
                || isMatching(cookie[0], filterNameInput.value)) {
                let tr;
                let td;

                listTable.appendChild(tr = document.createElement('tr'));

                tr.appendChild(td = document.createElement('td'));
                td.innerHTML = cookie[0];
                tr.appendChild(td = document.createElement('td'));
                td.innerHTML = cookie[1];
                tr.appendChild(td = document.createElement('td'));

                let btn = document.createElement('button');

                btn.innerText = 'Удалить';
                btn.onclick = function deleteTableRow() {
                    tr.remove();
                    document.cookie = cookie[0] + '=; max-age=0';
                };
                td.appendChild(btn);
            }
        }
    }
}

addCookieToTable();

function isMatching(full, chunk) {
    const reg = new RegExp(chunk, 'i');

    return (full.search(reg) !== -1)
}

filterNameInput.addEventListener('keyup', function() {
    addCookieToTable();
});

