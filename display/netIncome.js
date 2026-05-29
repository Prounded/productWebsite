if (localStorage.getItem('currentDisplay') === 'result' && localStorage.getItem('reportType') === 'netProfit') {
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
                    id: currentItem.id,
					product: currentProduct,
					price: currentPrice,
					amount: currentItem.amount,
					payment: currentPayment,
					initialPrice: currentItem.initialPrice || 0,
				};
			} else {
				purchaseHistoryCombined[currentProduct].amount += currentItem.amount;
			}
		}

		return purchaseHistoryCombined;
	}
    
	function load() {
		document.title = 'Laporan Laba Bersih - Dunia Jajanku';
		app.innerHTML = netIncomeDisplay;
		document.querySelector('.incomeTitleDisplay').addEventListener('click', changeReportType);
		document.querySelector('.cancelReport').addEventListener('click', returnDashboard);
		document.querySelector('.uploadReport').addEventListener('click', uploadReport);
        document.querySelector('.sheetsOpen').addEventListener('click', openGoogleSheet);
        
        
		let purchaseHistoryCombined = combinePurchaseHistory();
		let totalPrice = 0;
        let totalQuantity = 0;
        let totalProfit = 0;

		for (let i = 0; i < Object.keys(purchaseHistoryCombined).length; i++) {
			const currentItem = purchaseHistoryCombined[Object.keys(purchaseHistoryCombined)[i]];
			const amount = currentItem.amount;

			totalQuantity += amount;
            totalPrice += currentItem.price * amount;
            totalProfit += (currentItem.price - currentItem.initialPrice) * amount

			addItem(currentItem.product.replaceAll('_', ' '), currentItem.price, amount, currentItem.initialPrice);
		}
        
		document.querySelector('.quantityNumber').textContent = totalQuantity;
		document.querySelector('.totalPriceNumber').textContent = `Rp ${totalProfit.toLocaleString('id-ID')}`;

	}

	function openGoogleSheet() {
		window.open(GOOGLE_SHEET_URL);
	}

	function uploadReport() {
		Swal.fire({
			title: 'Unggah Laporan Laba Bersih ke Google Sheets?',
			text: 'Aksi ini akan menghilangkan data yang ada di Google Sheets sebelumnya',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#1f8437',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya, Unggah!',
			reverseButtons: true,
			scrollbarPadding: false,
			heightAuto: false,
		}).then(async (result) => {
            const purchaseHistory = combinePurchaseHistory();

			const fetching = await fetch(GOOGLE_SCRIPT_URL, {
				method: 'POST',
				mode: 'no-cors',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					type: 'income',
					items: Object.keys(purchaseHistory).map((key) => ({
						id: purchaseHistory[key].id,
						product: purchaseHistory[key].product.replaceAll('_', ' '),
						price: purchaseHistory[key].price,
						amount: purchaseHistory[key].amount,
						initialPrice: purchaseHistory[key].initialPrice || 0,
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
			} else {
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
		});
	}

	function returnDashboard() {
		localStorage.setItem('currentDisplay', 'dashboard');
		window.location.reload();
	}

	function changeReportType() {
		localStorage.setItem('reportType', 'report');
		window.location.reload();
	}

    function addItem(product, price, amount, initialPrice) {
		const itemDetailsInvoice = document.createElement('div');
		itemDetailsInvoice.classList.add('itemDetailsInvoice');

		const itemNumberProfit = document.createElement('div');
		itemNumberProfit.classList.add('itemNumberProfit');
		itemNumberProfit.textContent = `${document.querySelectorAll('.itemDetailsInvoice').length + 1}.`;

		itemDetailsInvoice.appendChild(itemNumberProfit);
		const itemNameProfit = document.createElement('div');
		itemNameProfit.classList.add('itemNameProfit');
		itemNameProfit.textContent = product;
		itemDetailsInvoice.appendChild(itemNameProfit);

		document.querySelector('.invoiceItems').appendChild(itemDetailsInvoice);
		const itemQuantityProfit = document.createElement('div');
		itemQuantityProfit.classList.add('itemQuantityProfit');
		itemQuantityProfit.textContent = amount;
		itemDetailsInvoice.appendChild(itemQuantityProfit);
		const itemPriceProfit = document.createElement('div');
		itemPriceProfit.classList.add('itemPriceProfit');
		itemPriceProfit.textContent = price.toLocaleString('id-ID');
        itemDetailsInvoice.appendChild(itemPriceProfit);
        const itemInitialPriceProfit = document.createElement('div');
        itemInitialPriceProfit.classList.add('itemInitialPriceProfit');
        itemInitialPriceProfit.textContent = initialPrice ? initialPrice.toLocaleString('id-ID') : '0';
        itemDetailsInvoice.appendChild(itemInitialPriceProfit);
		const itemSubtotalProfit = document.createElement('div');
		itemSubtotalProfit.classList.add('itemSubtotalProfit');
		itemSubtotalProfit.textContent = ((price * amount) - (initialPrice * amount)).toLocaleString('id-ID');
		itemDetailsInvoice.appendChild(itemSubtotalProfit);
    }
    
	load();

}if (localStorage.getItem('currentDisplay') === 'result' && localStorage.getItem('reportType') === 'netProfit') {
    function combinePurchaseHistory() {
        const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || {};
		let purchaseHistoryCombined = {};

		for (let i = 0; i < Object.keys(purchaseHistory).length; i++) {
			const currentItem = purchaseHistory[Object.keys(purchaseHistory)[i]];
			const currentProduct = currentItem.product;
			const currentPrice = currentItem.price;
			const currentPayment = currentItem.payment;
			const currentInitialPrice = currentItem.initialPrice || 0;

            console.log(currentItem)
			if (!purchaseHistoryCombined[currentProduct]) {
                purchaseHistoryCombined[currentProduct] = {
                    id: currentItem.id,
					product: currentProduct,
					price: currentPrice,
					amount: currentItem.amount,
					payment: currentPayment,
					initialPrice: currentItem.initialPrice || 0,
				};
			} else {
				purchaseHistoryCombined[currentProduct].amount += currentItem.amount;
			}
		}

		return purchaseHistoryCombined;
	}
    
	function load() {
		document.title = 'Laporan Laba Bersih - Dunia Jajanku';
		app.innerHTML = netIncomeDisplay;
		document.querySelector('.incomeTitleDisplay').addEventListener('click', changeReportType);
		document.querySelector('.cancelReport').addEventListener('click', returnDashboard);
		document.querySelector('.uploadReport').addEventListener('click', uploadReport);
        document.querySelector('.sheetsOpen').addEventListener('click', openGoogleSheet);
        
        
		let purchaseHistoryCombined = combinePurchaseHistory();
		let totalPrice = 0;
        let totalQuantity = 0;
        let totalProfit = 0;

		for (let i = 0; i < Object.keys(purchaseHistoryCombined).length; i++) {
			const currentItem = purchaseHistoryCombined[Object.keys(purchaseHistoryCombined)[i]];
			const amount = currentItem.amount;

			totalQuantity += amount;
            totalPrice += currentItem.price * amount;
            totalProfit += (currentItem.price - currentItem.initialPrice) * amount

            console.log(currentItem);
			addItem(currentItem.product.replaceAll('_', ' '), currentItem.price, amount, currentItem.initialPrice);
		}
        
		document.querySelector('.quantityNumber').textContent = totalQuantity;
		document.querySelector('.totalPriceNumber').textContent = `Rp ${totalProfit.toLocaleString('id-ID')}`;

	}

	function openGoogleSheet() {
		window.open(GOOGLE_SHEET_URL);
	}

	function uploadReport() {
		Swal.fire({
			title: 'Unggah Laporan Laba Bersih ke Google Sheets?',
			text: 'Aksi ini akan menghilangkan data yang ada di Google Sheets sebelumnya',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#1f8437',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya, Unggah!',
			reverseButtons: true,
			scrollbarPadding: false,
			heightAuto: false,
		}).then(async (result) => {
            const purchaseHistory = combinePurchaseHistory();
            console.log(purchaseHistory);

			const fetching = await fetch(GOOGLE_SCRIPT_URL, {
				method: 'POST',
				mode: 'no-cors',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					type: 'income',
					items: Object.keys(purchaseHistory).map((key) => ({
						id: purchaseHistory[key].id,
						product: purchaseHistory[key].product.replaceAll('_', ' '),
						price: purchaseHistory[key].price,
						amount: purchaseHistory[key].amount,
						initialPrice: purchaseHistory[key].initialPrice || 0,
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
			} else {
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
		});
	}

	function returnDashboard() {
		localStorage.setItem('currentDisplay', 'dashboard');
		window.location.reload();
	}

	function changeReportType() {
		localStorage.setItem('reportType', 'report');
		window.location.reload();
	}

    function addItem(product, price, amount, initialPrice) {
		const itemDetailsInvoice = document.createElement('div');
		itemDetailsInvoice.classList.add('itemDetailsInvoice');

		const itemNumberProfit = document.createElement('div');
		itemNumberProfit.classList.add('itemNumberProfit');
		itemNumberProfit.textContent = `${document.querySelectorAll('.itemDetailsInvoice').length + 1}.`;

		itemDetailsInvoice.appendChild(itemNumberProfit);
		const itemNameProfit = document.createElement('div');
		itemNameProfit.classList.add('itemNameProfit');
		itemNameProfit.textContent = product;
		itemDetailsInvoice.appendChild(itemNameProfit);

		document.querySelector('.invoiceItems').appendChild(itemDetailsInvoice);
		const itemQuantityProfit = document.createElement('div');
		itemQuantityProfit.classList.add('itemQuantityProfit');
		itemQuantityProfit.textContent = amount;
		itemDetailsInvoice.appendChild(itemQuantityProfit);
		const itemPriceProfit = document.createElement('div');
		itemPriceProfit.classList.add('itemPriceProfit');
		itemPriceProfit.textContent = `Rp ${price.toLocaleString('id-ID')}`;
        itemDetailsInvoice.appendChild(itemPriceProfit);
        const itemInitialPriceProfit = document.createElement('div');
        itemInitialPriceProfit.classList.add('itemInitialPriceProfit');
        itemInitialPriceProfit.textContent = `Rp ${initialPrice ? initialPrice.toLocaleString('id-ID') : '0'}`;
        itemDetailsInvoice.appendChild(itemInitialPriceProfit);
		const itemSubtotalProfit = document.createElement('div');
		itemSubtotalProfit.classList.add('itemSubtotalProfit');
		itemSubtotalProfit.textContent = `Rp ${((price * amount) - (initialPrice * amount)).toLocaleString('id-ID')}`;
		itemDetailsInvoice.appendChild(itemSubtotalProfit);
    }
    
	load();

}
