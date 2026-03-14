
if (localStorage.getItem('currentDisplay') === 'receipt') {
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

    function load() {
        app.innerHTML = receiptDisplay;
        document.title = 'Invoice - Dunia Jajanku';

        const dataItem = JSON.parse(localStorage.getItem('dataItem'));

        document.querySelector('.cancelInvoice').addEventListener('click', cancelInvoice);
        document.querySelector('.saveInvoice').addEventListener('click', saveInvoice);
        document.querySelector('.quantityNumber').textContent = localStorage.getItem('totalItem');
        document.querySelector('.totalPriceNumber').textContent = `Rp ${Number(localStorage.getItem('totalPrice')).toLocaleString('id-ID')}`;
        for(let i = 0; i < Object.keys(dataItem).length; i++) {
            const currentItem = dataItem[Object.keys(dataItem)[i]];
            const amount = currentItem.amount;

            if (amount > 0) {
                addItem(currentItem.product.replaceAll('_', ' '), currentItem.price, amount);
            }
        }
    }

    function cancelInvoice() {
        Swal.fire({
			title: 'Kembali ke Dashboard?',
			text: 'Anda akan kembali ke halaman dashboard',
			icon: 'info',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			confirmButtonColor: '#1f8437',
			confirmButtonText: 'Ya, Kembali!',
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
                localStorage.setItem('currentDisplay', 'dashboard');
                window.location.reload();
			}
		});
    }

    function saveInvoice() { 
        Swal.fire({
			title: 'Simpan Invoice?',
			text: 'Data yang sudah disimpan tidak dapat diubah!',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			confirmButtonColor: '#1f8437',
			confirmButtonText: 'Ya, Simpan!',
			reverseButtons: true,
		}).then((result) => {
            if (result.isConfirmed) {
                const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || {};
                const dataItem = JSON.parse(localStorage.getItem('dataItem'));

                for (let i = 0; i < Object.keys(dataItem).length; i++) {
                    const currentID = Object.keys(dataItem)[i];
                    const currentItem = dataItem[currentID];
                    let currentAddAmount = currentItem.amount;

                    if (currentItem.amount > 0) {
                        let purchaseID = Object.keys(purchaseHistory).length + 1;
                        
                        for (let j = 1; j <= Object.keys(purchaseHistory).length; j++) {
                            if (purchaseHistory[j].product === currentItem.product && purchaseHistory[j].price === currentItem.price) {
                                const lastAmount = purchaseHistory[j].amount;
                                currentAddAmount += lastAmount;
                                purchaseID = j;
                                break;
                            }


                        }

                        purchaseHistory[purchaseID] = {
							product: currentItem.product,
							price: currentItem.price,
							amount: currentAddAmount,
						};
                        localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

                    }
                }

                Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Pembelian Disimpan!',
                    text: 'Anda akan diarahkan kembali ke halaman dashboard',
					showConfirmButton: false,
					timer: TIMER_ADD_PURCHASE,
				});
                
                setTimeout(() => {
					localStorage.setItem('dataItem', JSON.stringify({}));
					localStorage.setItem('totalItem', 0);
					localStorage.setItem('totalPrice', 0);
					localStorage.setItem('currentDisplay', 'dashboard');
					window.location.reload();
				}, TIMER_ADD_PURCHASE);
			}
		});
    }

    load();
}
