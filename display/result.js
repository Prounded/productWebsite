
if (localStorage.getItem('currentDisplay') === 'result') {

	function load() {
		let totalPrice = 0;
		let totalQuantity = 0;
		document.title = 'Laporan Penjualan - Dunia Jajanku';
		app.innerHTML = resultDisplay;

		const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || {};

		for (let i = 0; i < Object.keys(purchaseHistory).length; i++) {
			const currentItem = purchaseHistory[Object.keys(purchaseHistory)[i]];
			const amount = currentItem.amount;

			totalQuantity += amount;
			totalPrice += currentItem.price * amount;

			addItem(currentItem.product.replaceAll('_', ' '), currentItem.price, amount);
		}

		document.querySelector('.quantityNumber').textContent = totalQuantity;
		document.querySelector('.totalPriceNumber').textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;

		document.querySelector('.cancelReport').addEventListener('click', returnDashboard);
		document.querySelector('.uploadReport').addEventListener('click', uploadReport);
		document.querySelector('.deleteReport').addEventListener('click', deleteReport);
		document.querySelector('.sheetsOpen').addEventListener('click', openGoogleSheet);
	}

	function openGoogleSheet() {
		window.open(GOOGLE_SHEET_URL);
	}

	function deleteReport() {
		Swal.fire({
			title: 'Hapus Laporan Penjualan?',
			text: 'Aksi ini akan menghapus semua data laporan penjualan sekarang tanpa mengubah data di Google Sheets',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#1f8437',
			confirmButtonText: 'Ya, Hapus!',
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				localStorage.removeItem('purchaseHistory');
				returnDashboard();
			}
		});
	}

	function returnDashboard() {
		localStorage.setItem('currentDisplay', 'dashboard');
		window.location.reload();
	}

	function addItem(product, price, amount) {
		const itemDetailsInvoice = document.createElement('div');
		itemDetailsInvoice.classList.add('itemDetailsInvoice');

		const itemNumberInvoice = document.createElement('div');
		itemNumberInvoice.classList.add('itemNumberInvoice');
		itemNumberInvoice.textContent = `${document.querySelectorAll('.itemDetailsInvoice').length + 1}.`;

		itemDetailsInvoice.appendChild(itemNumberInvoice);
		const itemNameInvoice = document.createElement('div');
		itemNameInvoice.classList.add('itemNameInvoice');
		itemNameInvoice.textContent = product;
		itemDetailsInvoice.appendChild(itemNameInvoice);

		document.querySelector('.invoiceItems').appendChild(itemDetailsInvoice);
		const itemQuantityInvoice = document.createElement('div');
		itemQuantityInvoice.classList.add('itemQuantityInvoice');
		itemQuantityInvoice.textContent = amount;
		itemDetailsInvoice.appendChild(itemQuantityInvoice);
		const itemPriceInvoice = document.createElement('div');
		itemPriceInvoice.classList.add('itemPriceInvoice');
		itemPriceInvoice.textContent = `Rp ${price.toLocaleString('id-ID')}`;
		itemDetailsInvoice.appendChild(itemPriceInvoice);
		const itemSubtotalInvoice = document.createElement('div');
		itemSubtotalInvoice.classList.add('itemSubtotalInvoice');
		itemSubtotalInvoice.textContent = `Rp ${(price * amount).toLocaleString('id-ID')}`;
		itemDetailsInvoice.appendChild(itemSubtotalInvoice);
	}

	async function uploadReport() { 
		Swal.fire({
			title: 'Upload Laporan Penjualan?',
			text: 'Aksi ini akan menghilangkan data yang ada di Google Sheets sebelumnya',
			icon: 'info',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			confirmButtonColor: '#1f8437',
			confirmButtonText: 'Ya, Lanjutkan!',
			reverseButtons: true,
		}).then(async (result) => {
			if (result.isConfirmed) {
				const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || {};
				await fetch(GOOGLE_SCRIPT_URL, {
					method: 'POST',
					body: JSON.stringify({
						items: [
							...Object.keys(purchaseHistory).map((key) => {
								return {
									id: key,
									product: purchaseHistory[key].product.replaceAll('_', ' '),
									price: purchaseHistory[key].price,
									amount: purchaseHistory[key].amount,
								};
							})
						],
					}),
				});
			}
		});

	}

	load();
}
