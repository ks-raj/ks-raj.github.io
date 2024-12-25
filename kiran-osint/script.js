
// Fetch data from the provided GitHub JSON URL
function _0x16df(){const _0x1caa7d=['9825976hVZzZC','10003PoJmhr','1288976DHyCYM','4411165dmRaGo','9OVRZvp','218vYlaNI','10378xWmUUw','430Iwdnii','757130mxqtqm','https://raw.githubusercontent.com/ks-raj/ks-raj.github.io/refs/heads/main/Projects/arf.json','6240AaMufy','4932McesSA','json'];_0x16df=function(){return _0x1caa7d;};return _0x16df();}function _0x22d4(_0x3e6aba,_0x323ce6){const _0x16df34=_0x16df();return _0x22d4=function(_0x22d435,_0x3b05d2){_0x22d435=_0x22d435-0x1c1;let _0x453dce=_0x16df34[_0x22d435];return _0x453dce;},_0x22d4(_0x3e6aba,_0x323ce6);}(function(_0x5a395c,_0x122c41){const _0x27ca6c=_0x22d4,_0x207722=_0x5a395c();while(!![]){try{const _0x2ad312=parseInt(_0x27ca6c(0x1c2))/0x1*(-parseInt(_0x27ca6c(0x1c1))/0x2)+parseInt(_0x27ca6c(0x1c6))/0x3+-parseInt(_0x27ca6c(0x1cb))/0x4+-parseInt(_0x27ca6c(0x1cc))/0x5+-parseInt(_0x27ca6c(0x1c7))/0x6*(parseInt(_0x27ca6c(0x1ca))/0x7)+-parseInt(_0x27ca6c(0x1c9))/0x8*(-parseInt(_0x27ca6c(0x1cd))/0x9)+-parseInt(_0x27ca6c(0x1c3))/0xa*(-parseInt(_0x27ca6c(0x1c4))/0xb);if(_0x2ad312===_0x122c41)break;else _0x207722['push'](_0x207722['shift']());}catch(_0xeeb9d){_0x207722['push'](_0x207722['shift']());}}}(_0x16df,0xa5f14));async function fetchData(){const _0x3d823d=_0x22d4,_0x3bad73=await fetch(_0x3d823d(0x1c5)),_0x43d4e9=await _0x3bad73[_0x3d823d(0x1c8)]();renderContent(_0x43d4e9);}
// Function to render the content
function renderContent(data) {
    const container = document.getElementById('content');
    container.innerHTML = ''; // Clear previous content

    data.children.forEach(category => {
        const categoryCard = createCategoryCard(category);
        container.appendChild(categoryCard);
    });
}

// Function to create a category card
function createCategoryCard(category) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('category-card');

    const categoryTitle = document.createElement('div');
    categoryTitle.classList.add('card-title');
    categoryTitle.innerHTML = `${category.name} <span>▼</span>`;
    categoryTitle.onclick = () => toggleDropdown(cardDiv);

    cardDiv.appendChild(categoryTitle);

    // Create nested cards
    const nestedCards = document.createElement('div');
    nestedCards.classList.add('nested-cards');
    if (category.children) {
        category.children.forEach(child => {
            if (child.type === 'folder') {
                const folderCard = createCategoryCard(child);
                nestedCards.appendChild(folderCard);
            } else if (child.type === 'url') {
                const urlCard = createURLCard(child);
                nestedCards.appendChild(urlCard);
            }
        });
    }
    cardDiv.appendChild(nestedCards);

    return cardDiv;
}

// Function to create a URL card
function createURLCard(item) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const cardTitle = document.createElement('div');
    cardTitle.textContent = item.name;

    const link = document.createElement('a');
    link.href = item.url;
    link.target = '_blank';
    link.textContent = 'Visit';

    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(link);

    return cardDiv;
}

// Toggle the dropdown visibility
function toggleDropdown(cardDiv) {
    const nestedCards = cardDiv.querySelector('.nested-cards');
    nestedCards.classList.toggle('show');
}

// Tab switching functionality
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tabs button');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    fetchData(); 
}

// Initial load
fetchData();
