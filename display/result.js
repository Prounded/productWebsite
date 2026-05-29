
if (localStorage.getItem('currentDisplay') === 'result' && localStorage.getItem('reportType') === 'report') {

	function combinePurchaseHistory() { 
		const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || {};
		let purchaseHistoryCombined = {};

		for (let i = 0; i < Object.keys(purchaseHistory).length; i++) {
			const currentItem = purchaseHistory[Object.keys(purchaseHistory)[i]];
			const currentProduct = currentItem.product;
			const currentPrice = currentItem.price;
			const currentPayment = currentItem.payment;
			const currentInitialPrice = currentItem.initialPrice || 0;

			if (!purchaseHistoryCombined[currentProduct]) {
				purchaseHistoryCombined[currentProduct] = {
					product: currentProduct,
					price: currentPrice,
					amount: currentItem.amount,
					payment: currentPayment,
				};
			} else {
				purchaseHistoryCombined[currentProduct].amount += currentItem.amount;
			}
		}

		return purchaseHistoryCombined;
	}

	function load() {
		let totalPrice = 0;
		let totalQuantity = 0;
		document.title = 'Laporan Penjualan - Dunia Jajanku';
		app.innerHTML = resultDisplay;

		const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || {};
		const purchaseHistoryCombined = combinePurchaseHistory();

		for (let i = 0; i < Object.keys(purchaseHistoryCombined).length; i++) {
			const currentItem = purchaseHistoryCombined[Object.keys(purchaseHistoryCombined)[i]];
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

		document.querySelector('.reportTitleDisplay').addEventListener('click', changeReportType);
	}

	function changeReportType() {
		localStorage.setItem('reportType', 'netProfit');
		window.location.reload();
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
			scrollbarPadding: false,
			heightAuto: false,
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Data Laporan Penjualan Dihapus!',
					text: 'Anda akan diarahkan kembali ke dashboard',
					showConfirmButton: false,
					timer: TIMER_ANIMATION_DURATION,
					scrollbarPadding: false,
					heightAuto: false,
				});

				setTimeout(() => {
					localStorage.removeItem('purchaseHistory');
					returnDashboard();
				}, TIMER_ANIMATION_DURATION);
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
		itemPriceInvoice.textContent = price.toLocaleString('id-ID');
		itemDetailsInvoice.appendChild(itemPriceInvoice);
		const itemSubtotalInvoice = document.createElement('div');
		itemSubtotalInvoice.classList.add('itemSubtotalInvoice');
		itemSubtotalInvoice.textContent = (price * amount).toLocaleString('id-ID');
		itemDetailsInvoice.appendChild(itemSubtotalInvoice);
	}

	async function uploadReport() { 
		const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || {};
		Swal.fire({
			title: 'Upload Laporan Penjualan?',
			text: 'Aksi ini akan menghilangkan data yang ada di Google Sheets sebelumnya',
			icon: 'info',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			confirmButtonColor: '#1f8437',
			confirmButtonText: 'Ya, Lanjutkan!',
			reverseButtons: true,
			scrollbarPadding: false,
			heightAuto: false,
		}).then(async (result) => {
			if (result.isConfirmed) {
				const fetching = await fetch(GOOGLE_SCRIPT_URL, {
					method: 'POST',
					mode: 'no-cors',
					cache: 'no-cache',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						type: "report",
						items: Object.keys(purchaseHistory).map((key) => ({
							id: purchaseHistory[key].id,
							product: purchaseHistory[key].product.replaceAll('_', ' '),
							price: purchaseHistory[key].price,
							amount: purchaseHistory[key].amount,
							payment: purchaseHistory[key].payment,
						})),
					}),
				});

				if (fetching) { 
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Upload Berhasil!',
						text: 'Cek Google Sheets untuk melihat laporan penjualan terbaru.',
						showConfirmButton: false,
						timer: TIMER_ANIMATION_DURATION,
						scrollbarPadding: false,
						heightAuto: false,
					});
				}
				else {
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: 'Upload Gagal!',
						text: 'Terjadi kesalahan saat mengunggah laporan penjualan. Coba lagi nanti.',
						showConfirmButton: false,
						timer: TIMER_ANIMATION_DURATION,
						scrollbarPadding: false,
						heightAuto: false,
					});
					return;
				}
			}
		});

	}

	load();
}

if (localStorage.getItem('currentDisplay') === 'result' && localStorage.getItem('reportType') === 'report') {

	function combinePurchaseHistory() { 
		const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || {};
		let purchaseHistoryCombined = {};

		for (let i = 0; i < Object.keys(purchaseHistory).length; i++) {
			const currentItem = purchaseHistory[Object.keys(purchaseHistory)[i]];
			const currentProduct = currentItem.product;
			const currentPrice = currentItem.price;
			const currentPayment = currentItem.payment;
			const currentInitialPrice = currentItem.initialPrice || 0;

			if (!purchaseHistoryCombined[currentProduct]) {
				purchaseHistoryCombined[currentProduct] = {
					product: currentProduct,
					price: currentPrice,
					amount: currentItem.amount,
					payment: currentPayment,
				};
			} else {
				purchaseHistoryCombined[currentProduct].amount += currentItem.amount;
			}
		}

		return purchaseHistoryCombined;
	}

	function load() {
		let totalPrice = 0;
		let totalQuantity = 0;
		document.title = 'Laporan Penjualan - Dunia Jajanku';
		app.innerHTML = resultDisplay;

		const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || {};
		const purchaseHistoryCombined = combinePurchaseHistory();

		for (let i = 0; i < Object.keys(purchaseHistoryCombined).length; i++) {
			const currentItem = purchaseHistoryCombined[Object.keys(purchaseHistoryCombined)[i]];
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

		document.querySelector('.reportTitleDisplay').addEventListener('click', changeReportType);
	}

	function changeReportType() {
		localStorage.setItem('reportType', 'netProfit');
		window.location.reload();
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
			scrollbarPadding: false,
			heightAuto: false,
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Data Laporan Penjualan Dihapus!',
					text: 'Anda akan diarahkan kembali ke dashboard',
					showConfirmButton: false,
					timer: TIMER_ANIMATION_DURATION,
					scrollbarPadding: false,
					heightAuto: false,
				});

				setTimeout(() => {
					localStorage.removeItem('purchaseHistory');
					returnDashboard();
				}, TIMER_ANIMATION_DURATION);
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
		const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || {};
		Swal.fire({
			title: 'Upload Laporan Penjualan?',
			text: 'Aksi ini akan menghilangkan data yang ada di Google Sheets sebelumnya',
			icon: 'info',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			confirmButtonColor: '#1f8437',
			confirmButtonText: 'Ya, Lanjutkan!',
			reverseButtons: true,
			scrollbarPadding: false,
			heightAuto: false,
		}).then(async (result) => {
			if (result.isConfirmed) {
				const fetching = await fetch(GOOGLE_SCRIPT_URL, {
					method: 'POST',
					mode: 'no-cors',
					cache: 'no-cache',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						type: "report",
						items: Object.keys(purchaseHistory).map((key) => ({
							id: purchaseHistory[key].id,
							product: purchaseHistory[key].product.replaceAll('_', ' '),
							price: purchaseHistory[key].price,
							amount: purchaseHistory[key].amount,
							payment: purchaseHistory[key].payment,
						})),
					}),
				});

				if (fetching) { 
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Upload Berhasil!',
						text: 'Cek Google Sheets untuk melihat laporan penjualan terbaru.',
						showConfirmButton: false,
						timer: TIMER_ANIMATION_DURATION,
						scrollbarPadding: false,
						heightAuto: false,
					});
				}
				else {
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: 'Upload Gagal!',
						text: 'Terjadi kesalahan saat mengunggah laporan penjualan. Coba lagi nanti.',
						showConfirmButton: false,
						timer: TIMER_ANIMATION_DURATION,
						scrollbarPadding: false,
						heightAuto: false,
					});
					return;
				}
			}
		});

	}

	load();
}
