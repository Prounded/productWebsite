if (localStorage.getItem('currentDisplay') === 'dashboard' || !localStorage.getItem('currentDisplay')) {
	localStorage.setItem('currentDisplay', 'dashboard');

	function addItemList(itemID, index) {
		if (!Object.keys(ITEMS_LIST)[index]) {
			return undefined;
		}
		const itemDiv = document.createElement('div');
		itemDiv.classList.add('itemDiv');
		itemDiv.id = `item${itemID}`;

		const imageDiv = document.createElement('div');
		imageDiv.classList.add('imageDiv');

		const imageItem = document.createElement('img');
		imageItem.classList.add('imageItem');

		if (Object.values(ITEMS_LIST)[index].IMAGE) {
			imageItem.src = Object.values(ITEMS_LIST)[index].IMAGE;
		} else {
			imageItem.src = NO_IMAGE_SOURCE;
		}

		imageDiv.appendChild(imageItem);
		itemDiv.appendChild(imageDiv);

		const detailsItem = document.createElement('div');
		detailsItem.classList.add('detailsItem');

		const itemName = document.createElement('div');
		itemName.classList.add('itemName');
		itemName.textContent = Object.keys(ITEMS_LIST)[index].replaceAll('_', ' ');

		const itemDescription = document.createElement('div');
		itemDescription.classList.add('itemDescription');
		if(Object.values(ITEMS_LIST)[index].DESCRIPTION) {
			itemDescription.textContent = Object.values(ITEMS_LIST)[index].DESCRIPTION;
		}
		else {
			itemDescription.textContent = NO_DESCRIPTION_TEXT;
			itemDescription.style.fontStyle = 'italic';
		}

		const itemPrice = document.createElement('div');
		itemPrice.classList.add('itemPrice');
		itemPrice.textContent = `Rp ${Object.values(ITEMS_LIST)[index].PRICE.toLocaleString('id-ID')}`;

		detailsItem.appendChild(itemName);
		detailsItem.appendChild(itemDescription);
		detailsItem.appendChild(itemPrice);

		itemDiv.appendChild(detailsItem);

		let currentItemData = JSON.parse(localStorage.getItem('dataItem'));
		if (!currentItemData) {
			localStorage.setItem('dataItem', JSON.stringify({}));
			currentItemData = JSON.parse(localStorage.getItem('dataItem'));
		}

		if (currentItemData[Object.values(ITEMS_LIST)[index].ID] === undefined) { 
			currentItemData[Object.values(ITEMS_LIST)[index].ID] = {
				product: Object.keys(ITEMS_LIST)[index],
				price: Object.values(ITEMS_LIST)[index].PRICE,
				amount: 0,
				initialPrice: Object.values(ITEMS_LIST)[index].INITIAL_PRICE || 0,
			};
			localStorage.setItem('dataItem', JSON.stringify(currentItemData));
		}

		if (currentItemData[Object.values(ITEMS_LIST)[index].ID] !== Object.values(ITEMS_LIST)[index].PRICE) {
			currentItemData[Object.values(ITEMS_LIST)[index].ID].price = Object.values(ITEMS_LIST)[index].PRICE;
			localStorage.setItem('dataItem', JSON.stringify(currentItemData));
		}

		if (currentItemData[Object.values(ITEMS_LIST)[index].ID] !== Object.values(ITEMS_LIST)[index].INITIAL_PRICE) {
			currentItemData[Object.values(ITEMS_LIST)[index].ID].initialPrice = Object.values(ITEMS_LIST)[index].INITIAL_PRICE;
			localStorage.setItem('dataItem', JSON.stringify(currentItemData));
		}

		let currentItemAmount = Number(currentItemData[Object.values(ITEMS_LIST)[index].ID].amount);

		const categoryItem = document.createElement('div');
		categoryItem.classList.add('categoryItem');
		categoryItem.textContent = Object.values(ITEMS_LIST)[index].CATEGORY;
		itemDiv.appendChild(categoryItem);

		const itemPurchase = document.createElement('div');
		itemPurchase.classList.add('itemPurchase');
		itemPurchase.setAttribute('data-amount', currentItemAmount);

		if (currentItemAmount === 0) {
			const addCartButton = document.createElement('button');
			addCartButton.classList.add('addCartButton');
			addCartButton.textContent = 'Tambah';
			addCartButton.addEventListener('click', () => {
				increaseTotalAmount(itemID);
			});
			itemPurchase.appendChild(addCartButton);
		}
		else {
			const increaseAmount = document.createElement('button');
			increaseAmount.classList.add('increaseAmount');

			const amountButtonImgUp = document.createElement('img');
			amountButtonImgUp.classList.add('amountButtonImg');
			amountButtonImgUp.src = './image/changeAmountUp.png';

			increaseAmount.addEventListener('click', () => {
				increaseTotalAmount(itemID);
			});
			increaseAmount.appendChild(amountButtonImgUp);

			const itemAmount = document.createElement('div');
			itemAmount.classList.add('itemAmount');
			itemAmount.textContent = currentItemAmount;

			const decreaseAmount = document.createElement('button');
			decreaseAmount.classList.add('decreaseAmount');

			const amountButtonImgDown = document.createElement('img');
			amountButtonImgDown.classList.add('amountButtonImg');
			amountButtonImgDown.src = './image/changeAmountDown.png';
			decreaseAmount.addEventListener('click', () => {
				decereaseTotalAmount(itemID);
			});
			decreaseAmount.appendChild(amountButtonImgDown);

			itemPurchase.appendChild(decreaseAmount);
			itemPurchase.appendChild(itemAmount);
			itemPurchase.appendChild(increaseAmount);
		}

		itemDiv.appendChild(itemPurchase);

		let totalPrices = Number(localStorage.getItem('totalPrice'));
		let totalItem = Number(localStorage.getItem('totalItem'));

		if (!totalPrices) {
			localStorage.setItem('totalPrice', '0');
			totalPrices = 0;
		}

		if (!totalItem) {
			localStorage.setItem('totalItem', '0');
			totalItem = 0;
		}

		if (totalItem > 1) {
			document.querySelector('.totalItemsAmount').textContent = `${totalItem} items`;
		} else {
			document.querySelector('.totalItemsAmount').textContent = `${totalItem} item`;
		}

		document.querySelector('.totalPrice').textContent = `Rp ${totalPrices.toLocaleString()}`;

		return itemDiv;
	}

	function increaseTotalAmount(id) {
		const currentItemData = JSON.parse(localStorage.getItem('dataItem'));
		const currentItem = document.querySelector(`#item${id}.itemDiv`);
		const currentData = currentItem.querySelector('.itemPurchase');
		const amountItemAdded = Number(currentItemData[id].amount) + 1;

		if (amountItemAdded === 1) {
			const addCartButton = currentData.querySelector('.addCartButton');
			currentData.removeChild(addCartButton);
			const increaseAmount = document.createElement('button');
			increaseAmount.classList.add('increaseAmount');

			const amountButtonImgUp = document.createElement('img');
			amountButtonImgUp.classList.add('amountButtonImg');
			amountButtonImgUp.src = './image/changeAmountUp.png';
			increaseAmount.addEventListener('click', () => {
				increaseTotalAmount(id);
			});

			increaseAmount.appendChild(amountButtonImgUp);
			const decreaseAmount = document.createElement('button');
			decreaseAmount.classList.add('decreaseAmount');
			const amountButtonImgDown = document.createElement('img');
			amountButtonImgDown.classList.add('amountButtonImg');
			amountButtonImgDown.src = './image/changeAmountDown.png';
			decreaseAmount.addEventListener('click', () => {
				decereaseTotalAmount(id);
			});

			decreaseAmount.appendChild(amountButtonImgDown);
			const itemAmount = document.createElement('div');
			itemAmount.classList.add('itemAmount');
			itemAmount.textContent = amountItemAdded;
			currentData.appendChild(decreaseAmount);
			currentData.appendChild(itemAmount);
			currentData.appendChild(increaseAmount);
		}

		currentItem.querySelector('.itemAmount').textContent = amountItemAdded;
		currentData.setAttribute('data-amount', amountItemAdded);
		calculateTotalPrice(id, amountItemAdded, 'increase');
	}

	function decereaseTotalAmount(id) {
		const currentItemData = JSON.parse(localStorage.getItem('dataItem'));
		const currentItem = document.querySelector(`#item${id}.itemDiv`);
		const currentData = currentItem.querySelector('.itemPurchase');
		const amountItemAdded = Number(currentItemData[id].amount) - 1;

		if (amountItemAdded < 0) {
			return;
		}
		else if (amountItemAdded === 0) {
			const decreaseAmount = currentData.querySelector('.decreaseAmount');
			const increaseAmount = currentData.querySelector('.increaseAmount');
			const itemAmount = currentData.querySelector('.itemAmount');

			currentData.removeChild(decreaseAmount);
			currentData.removeChild(itemAmount);
			currentData.removeChild(increaseAmount);
			const addCartButton = document.createElement('button');
			addCartButton.classList.add('addCartButton');
			addCartButton.textContent = 'Tambah';
			addCartButton.addEventListener('click', () => {
				increaseTotalAmount(id);
			});
			currentData.appendChild(addCartButton);
		}
		else {
			currentItem.querySelector('.itemAmount').textContent = amountItemAdded;
		}

		currentData.setAttribute('data-amount', amountItemAdded);
		calculateTotalPrice(id, amountItemAdded, 'decrease');
	}

	function calculateTotalPrice(id, amount, action) {
		if (id) {
			let totalPrice = Number(localStorage.getItem('totalPrice'));
			let totalItem = Number(localStorage.getItem('totalItem'));

			const itemPrices = Object.values(ITEMS_LIST).find((item) => item.ID === id).PRICE;

			if (!totalPrice) {
				localStorage.setItem('totalPrice', '0');
				totalPrice = 0;
			}

			if (!totalItem) {
				localStorage.setItem('totalItem', '0');
				totalItem = 0;
			}

			if (action === 'decrease') {
				totalItem--;
				totalPrice -= itemPrices;
			}

			if (action === 'increase') {
				totalItem++;
				totalPrice += itemPrices;
			}

			localStorage.setItem('totalPrice', totalPrice);
			localStorage.setItem('totalItem', totalItem);

			const currentItemData = JSON.parse(localStorage.getItem('dataItem'));
			currentItemData[id].amount = amount;
			localStorage.setItem('dataItem', JSON.stringify(currentItemData));

			if (totalItem > 1) {
				document.querySelector('.totalItemsAmount').textContent = `${totalItem} items`;
			} else {
				document.querySelector('.totalItemsAmount').textContent = `${totalItem} item`;
			}

			
			if (totalItem > 0) {
				document.querySelector('.checkoutDetail').style.display = 'flex';
				document.querySelector('.itemList').style.height = '75.5dvh';
			} else {
				document.querySelector('.checkoutDetail').style.display = 'none';
				document.querySelector('.itemList').style.height = '87.5dvh';
			}


			document.querySelector('.totalPrice').textContent = `Rp ${totalPrice.toLocaleString()}`;
		} else {
			const allItems = document.querySelectorAll('.itemDiv');
			let totalAmount = 0;
			let totalPrice = 0;
			for (let i = 0; i < allItems.length; i++) {
				const currentItems = allItems[i];
				const currentID = currentItems.getAttribute('id').replace('item', '');

				const dataItem = JSON.parse(localStorage.getItem('dataItem'));

				if(dataItem[currentID]) {
					const currentAmount = Number(dataItem[currentID].amount);
					const itemPrices = dataItem[currentID].price;
					totalPrice += itemPrices * currentAmount;
					totalAmount += currentAmount;
				}
			}

			if (totalAmount > 1) {
				document.querySelector('.totalItemsAmount').textContent = `${totalAmount} items`;
			} else {
				document.querySelector('.totalItemsAmount').textContent = `${totalAmount} item`;
			}
			
			if (totalAmount > 0) {
				document.querySelector('.checkoutDetail').style.display = 'flex';
				document.querySelector('.itemList').style.height = '75.5dvh';
			}
			else {
				document.querySelector('.checkoutDetail').style.display = 'none';
				document.querySelector('.itemList').style.height = '87.5dvh';
			}

			document.querySelector('.totalPrice').textContent = `Rp ${totalPrice.toLocaleString()}`;
		}
	}

	function searchItem(value) { 
		const itemList = document.querySelector('.itemList');
		document.querySelectorAll('.itemDiv').forEach((item) => {
			itemList.removeChild(item);
		});
		
		value = value.replaceAll(' ', '_');
		let currentFilter = JSON.parse(localStorage.getItem('filterSettings'));

		if (!value) {
			currentFilter.value = undefined;
			localStorage.setItem('filterSettings', JSON.stringify(currentFilter));

			document.querySelector('.clearSearchIcon').style.display = 'none';
		} else {
			currentFilter.value = value;
			localStorage.setItem('filterSettings', JSON.stringify(currentFilter));

			document.querySelector('.clearSearchIcon').style.display = 'block';
		}

		filterProduct();
	}
	
	function sortByCategory(category) {
		const filterCategoryDiv = document.querySelector('.filterCategoryDiv');
		const selectedCategory = filterCategoryDiv.querySelector('.selectedCategory');

		if (selectedCategory && category !== selectedCategory.getAttribute('data-category')) {
			selectedCategory.classList.remove('selectedCategory');
		}

		event.target.classList.toggle('selectedCategory');

		const currentCategory = filterCategoryDiv.querySelector('.selectedCategory');

		const itemList = document.querySelector('.itemList');
		document.querySelectorAll('.itemDiv').forEach((item) => {
			itemList.removeChild(item);
		}); 

		let currentFilter = JSON.parse(localStorage.getItem('filterSettings'));

		if (currentCategory) {
			currentFilter.category = currentCategory.getAttribute('data-category');
			localStorage.setItem('filterSettings', JSON.stringify(currentFilter));
		}
		else {
			currentFilter.category = undefined;
			localStorage.setItem('filterSettings', JSON.stringify(currentFilter));
		}

		filterProduct();
	}

	function clearSearch() {
		document.querySelector('.searchBar').value = '';
		document.querySelector('.clearSearchIcon').style.display = 'none';

		searchItem('');
	}

	function filterProduct() {
		let productFiltered = [];
		const filterValue = JSON.parse(localStorage.getItem('filterSettings') || {});
		const value = filterValue.value;
		const category = filterValue.category;

		const itemList = document.querySelector('.itemList');
		document.querySelectorAll('.itemDiv').forEach((item) => {
			itemList.removeChild(item);
		});

		if (value) {
			for (let i = 0; i < Object.keys(ITEMS_LIST).length; i++) {
				if (!Object.keys(ITEMS_LIST)[i].toLowerCase().includes(value.toLowerCase())) {
					productFiltered.push(Object.keys(ITEMS_LIST)[i]);
				}
			}
		}

		if (category) {
			for (let i = 0; i < Object.keys(ITEMS_LIST).length; i++) {
				if (
					Object.values(ITEMS_LIST)[i].CATEGORY.toLowerCase() !== category.toLowerCase() && !productFiltered.includes(Object.values(ITEMS_LIST)[i])
				) {
					productFiltered.push(Object.keys(ITEMS_LIST)[i]);
				}
			}
			
		}

		for (let i = 0; i < Object.keys(ITEMS_LIST).length; i++) {
			if (!productFiltered.includes(Object.keys(ITEMS_LIST)[i])) {
				const addItems = addItemList(Object.values(ITEMS_LIST)[i].ID, i);
				if (addItems) {
					document.querySelector('.itemList').appendChild(addItems);
				}
			}
		}

		itemList.scrollTop = 0;

		noResultCheck()
	}

	function load() {
		app.innerHTML = dashboardDisplay;

		document.title = 'Dashboard - Dunia Jajanku';

		document.querySelector('.checkoutDisplay').addEventListener('click', checkoutAlert);
		document.querySelector('.seeTotalReport').addEventListener('click', seeReport);
		document.querySelector('.searchIcon').addEventListener('click', () => {
			document.querySelector('.searchBar').focus();
		});
		document.querySelector('.searchBar').addEventListener('input', (value) => {
			searchItem(value.target.value);
		});
		document.querySelector('.clearSearchIcon').addEventListener('click', clearSearch);
		document.querySelector('.clearItems').addEventListener('click', clearItems);

		const filterCategoryDiv = document.querySelector('.filterCategoryDiv');

		document.querySelector('.filterCategoryDiv').addEventListener('wheel', (value) => {
			value.preventDefault();
			filterCategoryDiv.scrollLeft += value.deltaY;
		});

		function filterCategory(category) {
			const allCategory = document.querySelectorAll('.categoryTitle');

			for (let j = 0; j < allCategory.length; j++) {
				if (allCategory[j].textContent === category) {
					return false;
				}
			}

			return true;
		}
		for (let i = 0; i < Object.keys(ITEMS_LIST).length; i++) {
			const addItems = addItemList(Object.values(ITEMS_LIST)[i].ID, i);
			const currentCategory = Object.values(ITEMS_LIST)[i].CATEGORY;
			if (filterCategory(currentCategory)) {
				const categoryTitle = document.createElement('div');
				categoryTitle.classList.add('categoryTitle');
				categoryTitle.textContent = currentCategory;
				categoryTitle.setAttribute('data-category', currentCategory);
				categoryTitle.addEventListener('click', () => sortByCategory(currentCategory));
				filterCategoryDiv.appendChild(categoryTitle);
			}

			if (addItems) {
				document.querySelector('.itemList').appendChild(addItems);
			}
		}

		localStorage.setItem(
			'filterSettings',
			JSON.stringify({
				value: undefined,
				category: undefined,
			}),
		);

		if (!localStorage.getItem('reportType')) {
			localStorage.setItem('reportType', 'report');
		}

		if (localStorage.getItem('totalItem') !== '0') {
			document.querySelector('.checkoutDetail').style.display = 'flex';
			document.querySelector('.itemList').style.height = '75.5dvh';
		}
		else {
			document.querySelector('.checkoutDetail').style.display = 'none';
			document.querySelector('.itemList').style.height = '87.5dvh';
		}
		noResultCheck();
		calculateTotalPrice();
	}

	function checkoutAlert() {
		if (Number(localStorage.getItem('totalItem') < 1)) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Tidak ada barang yang dipilih',
				showConfirmButton: false,
				timer: TIMER_ANIMATION_DURATION,
				scrollbarPadding: false,
				heightAuto: false,
			});
		} else {
			seeReceipt();
		}
	}

	function seeReceipt() {
		localStorage.setItem('currentDisplay', 'receipt');
		window.location.reload();
	}

	function seeReport() {
		localStorage.setItem('currentDisplay', 'result');
		window.location.reload();
	}

	function noResultCheck() {
		const itemList = document.querySelector('.itemList');

		for (let i = 0; i < itemList.querySelectorAll('.noResult').length; i++) {
			itemList.removeChild(itemList.querySelectorAll('.noResult')[i]);
		}

		if (document.querySelectorAll('.itemDiv').length < 1) {
			const noResult = document.createElement('div');
			noResult.classList.add('noResult');
			noResult.textContent = NO_RESULT_TEXT;
			document.querySelector('.itemList').appendChild(noResult);
		}
	}

	function clearItems() {
		Swal.fire({
			title: 'Batalkan semua item yang dipilih?',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			confirmButtonColor: '#1f8437',
			confirmButtonText: 'Ya, Batalkan!',
			reverseButtons: true,
			scrollbarPadding: false,
			heightAuto: false,
		}).then((result) => {
			if (result.isConfirmed) {
				const dataItem = JSON.parse(localStorage.getItem('dataItem'));
				document.querySelector('.checkoutDetail').style.display = 'none';
				document.querySelector('.itemList').style.height = '87.5dvh';

				for (let i = 0; i < Object.keys(dataItem).length; i++) {
					const currentID = Object.keys(dataItem)[i];
					dataItem[currentID].amount = 0;
				}
				localStorage.setItem('dataItem', JSON.stringify(dataItem));
				localStorage.setItem('totalItem', 0);
				localStorage.setItem('totalPrice', 0);
				calculateTotalPrice();
				document.querySelectorAll('.itemPurchase').forEach((item) => {
					if (item.getAttribute('data-amount') !== '0') {
						const decreaseAmount = item.querySelector('.decreaseAmount');
						const increaseAmount = item.querySelector('.increaseAmount');
						const itemAmount = item.querySelector('.itemAmount');
						item.removeChild(decreaseAmount);
						item.removeChild(itemAmount);
						item.removeChild(increaseAmount);
						const addCartButton = document.createElement('button');
						addCartButton.classList.add('addCartButton');
						addCartButton.textContent = 'Tambah';
						addCartButton.addEventListener('click', () => {
							increaseTotalAmount(Number(item.parentElement.getAttribute('id').replace('item', '')));
						});
						item.appendChild(addCartButton);
						item.setAttribute('data-amount', 0);
					}
				});
				Swal.fire({
					position: 'center',
					icon: 'success',	
					title: 'Semua item dibatalkan!',
					showConfirmButton: false,
					timer: TIMER_ANIMATION_DURATION,
					scrollbarPadding: false,
					heightAuto: false,
				});
			}
		});
	}

	load();
}
