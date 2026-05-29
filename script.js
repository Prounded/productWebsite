const app = document.querySelector('.allDisplay');

const TIMER_ANIMATION_DURATION = 1500;
const NO_RESULT_TEXT = 'Tidak ada hasil yang ditemukan';
const GOOGLE_SCRIPT_URL = //Script API upload data to Google Sheets
	'https://script.google.com/macros/s/AKfycbwf3No0F2D12VJm80Acqzhc-TsAsk3p-MeLaTnl9lWqAputTlZXukHZsZoKCSITfyfu/exec';

const GOOGLE_SHEET_URL = //Google Sheets link to see the uploaded data
	'https://docs.google.com/spreadsheets/d/1PPS_37ubelscTzGyPFyHl9U_QLXi2xkHl6nrtrSYWsc/edit?usp=sharing';
const NO_IMAGE_SOURCE = './image/noImageDefault.jpg';
const NO_DESCRIPTION_TEXT = 'Deskripsi tidak tersedia';
const PAYMENT_METHODS = ['QRIS', 'Cash', 'E-Wallet'];

const ITEMS_LIST = {
	Kuotie_Kuantung: {
        ID: 1001,
        PRICE: 25000,
        IMAGE: './image/kuotieSantungImg.jpeg',
        CATEGORY: 'Kuotie',
        DESCRIPTION: 'Kuotie pilihan dengan isian daging ayam yang lezat.',
        INITIAL_PRICE: 17000
    },

    Kuotie_Ayam: {
        ID: 1002,
        PRICE: 15000,
        IMAGE: './image/kuotieAyam.jpg',
        CATEGORY: 'Kuotie',
        DESCRIPTION: 'Kuotie pilihan dengan isian daging ayam yang lezat.',
        INITIAL_PRICE: 10500
    },

    Mie_Ayam: {
        ID: 1003,
        PRICE: 25000,
        IMAGE: './image/mieAyam.jpg',
        CATEGORY: 'Mie',
        DESCRIPTION: 'Mie pilihan dengan kuah yang lezat.',
        INITIAL_PRICE: 20500
    },

    Siomay_Bandung_Babi: {
        ID: 1004,
        PRICE: 28000,
        IMAGE: './image/siomayBandungBabi.png',
        CATEGORY: 'Siomay',
        DESCRIPTION: 'Siomay khas Bandung dengan isian daging babi.',
        INITIAL_PRICE: 22000
    },

    Siomay_Bandung_Ayam: {
        ID: 1005,
        PRICE: 20000,
        IMAGE: './image/siomayBandungAyam.png',
        CATEGORY: 'Siomay',
        DESCRIPTION: 'Siomay khas Bandung dengan isian daging ayam.',
        INITIAL_PRICE: 16000
    },

    Siomay_Wortel_Babi: {
        ID: 1006,
        PRICE: 22000,
        IMAGE: './image/siomayWortelBabi.jpg',
        CATEGORY: 'Siomay',
        DESCRIPTION: 'Siomay dengan isian wortel dan daging babi.',
        INITIAL_PRICE: 17000
    },

    Siomay_Wortel_Ayam: {
        ID: 1007,
        PRICE: 15000,
        IMAGE: './image/siomayWortelAyam.jpg',
        CATEGORY: 'Siomay',
        DESCRIPTION: 'Siomay dengan isian wortel dan daging ayam.',
        INITIAL_PRICE: 12000
    },

    Nasi_Tim: {
        ID: 1008,
        PRICE: 28000,
        IMAGE: './image/nasiTim.png',
        CATEGORY: 'Nasi',
        DESCRIPTION: 'Nasi tim yang lezat dan gurih.',
        INITIAL_PRICE: 22500
    },

    Nasi_Kuning: {
        ID: 1009,
        PRICE: 15000,
        IMAGE: './image/nasiKuning.png',
        CATEGORY: 'Nasi',
        DESCRIPTION: 'Nasi kuning yang lezat dan kaya rasa.',
        INITIAL_PRICE: 10000
    },

    Nasi_Bakar: {
        ID: 1010,
        PRICE: 15000,
        IMAGE: './image/nasiBakar.jpeg',
        CATEGORY: 'Nasi',
        DESCRIPTION: 'Nasi bakar yang gurih dan lezat.',
        INITIAL_PRICE: 10000
    },

    Bacang_Babi: {
        ID: 1011,
        PRICE: 26000,
        IMAGE: './image/bacangBabi.jpg',
        CATEGORY: 'Nasi',
        DESCRIPTION: 'Bacang dengan isian daging babi.',
        INITIAL_PRICE: 19000
    },

    Lemper_Ayam: {
        ID: 1012,
        PRICE: 7000,
        IMAGE: './image/lemperAyam.jpg',
        CATEGORY: 'Nasi',
        DESCRIPTION: 'Lemper dengan isian daging ayam.',
        INITIAL_PRICE: 5000
    },

    Bakso_Goreng: {
        ID: 1013,
        PRICE: 12000,
        IMAGE: './image/baksoGoreng.png',
        CATEGORY: 'Gorengan',
        DESCRIPTION: 'Bakso goreng yang lezat.',
        INITIAL_PRICE: 8000
    },

    Mohyang_Ayam: {
        ID: 1014,
        PRICE: 23000,
        IMAGE: './image/mohyangAyam.jpg',
        CATEGORY: 'Gorengan',
        DESCRIPTION: 'Mohyang dengan isian daging ayam.',
        INITIAL_PRICE: 18000
    },

    Getuk_Original: {
        ID: 1015,
        PRICE: 5000,
        IMAGE: './image/getukOriginal.jpg',
        CATEGORY: 'Kue',
        DESCRIPTION: 'Getuk original yang lezat.',
        INITIAL_PRICE: 3000
    },

    Getuk_Cokelat: {
        ID: 1016,
        PRICE: 6000,
        IMAGE: './image/getukCokelat.jpg',
        CATEGORY: 'Kue',
        DESCRIPTION: 'Getuk dengan rasa cokelat.',
        INITIAL_PRICE: 3500
    },

    Singkong_Thailand: {
        ID: 1017,
        PRICE: 8000,
        IMAGE: './image/singkongThailand.jpg',
        CATEGORY: 'Kue',
        DESCRIPTION: 'Singkong khas Thailand.',
        INITIAL_PRICE: 5000
    },

    Bola_Ubi: {
        ID: 1018,
        PRICE: 10000,
        IMAGE: './image/bolaUbi.jpg',
        CATEGORY: 'Kue',
        DESCRIPTION: 'Bola ubi yang lezat.',
        INITIAL_PRICE: 3000
    },

    Talam_Ubi: {
        ID: 1019,
        PRICE: 5000,
        IMAGE: './image/talamUbi.jpg',
        CATEGORY: 'Kue',
        DESCRIPTION: 'Talam ubi yang lezat.',
        INITIAL_PRICE: 3000
    },

    Pastel: {
        ID: 1020,
        PRICE: 8000,
        IMAGE: './image/pastel.jpg',
        CATEGORY: 'Gorengan',
        DESCRIPTION: 'Pastel yang lezat.',
        INITIAL_PRICE: 5000
    },

    Asinan: {
        ID: 1021,
        PRICE: 25000,
        IMAGE: './image/asinan.jpg',
        CATEGORY: 'Asinan',
        DESCRIPTION: 'Asinan yang lezat.',
        INITIAL_PRICE: 18000
    },

    Risol_Mayonaise: {
        ID: 1022,
        PRICE: 10000,
        IMAGE: './image/risolMayonaise.jpg',
        CATEGORY: 'Gorengan',
        DESCRIPTION: 'Risol dengan mayonaise.',
        INITIAL_PRICE: 6000
    },

    Lumpia_Goreng: {
        ID: 1023,
        PRICE: 13000,
        IMAGE: './image/lumpiaGoreng.jpeg',
        CATEGORY: 'Lumpia',
        DESCRIPTION: 'Lumpia goreng yang lezat.',
        INITIAL_PRICE: 9000
    },

    Susu_Kedelai: {
        ID: 1024,
        PRICE: 13000,
        IMAGE: './image/susuKedelai.jpg',
        CATEGORY: 'Minuman',
        DESCRIPTION: 'Susu kedelai yang lezat.',
        INITIAL_PRICE: 10000
    },

    Bakpia_Kacang_Hijau: {
        ID: 1025,
        PRICE: 20000,
        IMAGE: './image/bakpiaKacangHijau.png',
        CATEGORY: 'Kue',
        DESCRIPTION: 'Bakpia dengan isian kacang hijau.',
        INITIAL_PRICE: 15000
    },

    Mie_Goreng: {
        ID: 1026,
        PRICE: 10000,
        IMAGE: './image/mieGoreng.jpg',
        CATEGORY: 'Mie',
        DESCRIPTION: 'Mie goreng yang lezat.',
        INITIAL_PRICE: 5000
    },

    Bakpao_Babi: {
        ID: 1027,
        PRICE: 15000,
        IMAGE: '',
        CATEGORY: 'Kue',
        DESCRIPTION: 'Bakpao dengan isian daging babi.',
        INITIAL_PRICE: 10000
    },

    Lumpia_Basah: {
        ID: 1028,
        PRICE: 14000,
        IMAGE: '',
        CATEGORY: 'Lumpia',
        DESCRIPTION: 'Lumpia basah yang lezat.',
        INITIAL_PRICE: 10000
    }
};

const dashboardDisplay = `
<div class="headerDisplay">
	<div class="titleDisplayContainer">
		<img class="titleLogo" src="./image/temporaryLogo.png"></img>
		<div class="titleDisplay">Dunia Jajanku</div>
	</div>

	<div class="sortingDisplay">
		<div class="searchBarDiv">
			<img class="searchIcon" src="./image/searchIcon.png"></img>
			<input CATEGORY="text" class="searchBar" placeholder="Search..."></input>
			<img class="clearSearchIcon" src="./image/clearSearchIcon.png"></img>
		</div>
		
		<div class="filterCategoryDiv">

		</div>
	</div>

	<div class="seeTotalReport">
		<img src="./image/reportDataImg.png" class="reportImg" title="Lihat Laporan Penjualan">
		<div class="reportTitle">Laporan Penjualan</div>
	</div>
</div>

<div class="itemList">
</div>

<div class="checkoutDetail">
	<div class="clearItems">
		<img src="./image/clearItemImg.png" class="clearItemsImg"></img>
	</div>

	<div class="checkoutDisplay">
		<div class="checkoutDiv">
			<img class="shoppingImg" src="./image/shoppingIcon.png"></img>
			<div class="totalItemsAmount"></div>
		</div>

		<div class="totalPrice"></div>

		<div class="proceedCheckout">
			<img class="proceedCheckoutImg" src="./image/checkoutImage.png"></img>
		</div>
	</div>
</div>
`;

const receiptDisplay = `
<div class="mainInvoiceDisplay">
<div class="invoiceContent">
	<div class="invoiceTitle">
		<img src="./image/temporaryLogo.png" alt="Logo" class="invoiceLogo">
        
        <div class="paymentMethodDisplay"></div>

		<div class="invoiceTitleDisplay">INVOICE</div>
	</div>

	<div class="invoiceDetailsTitle">
		<div class="itemNumberInvoice detailTitle">No.</div>
		<div class="itemNameInvoice detailTitle">Item</div>
		<div class="itemQuantityInvoice detailTitle">Qty</div>
		<div class="itemPriceInvoice detailTitle">Price</div>
		<div class="itemSubtotalInvoice detailTitle">Subtotal</div>
	</div>

	<div class="invoiceItems">

	</div>

	<div class="invoiceTotals">
		<div class="totalQuantityInvoice">
			<div class="totalsTitle">Total Quantity </div>
			:
			<div class="quantityNumber"></div>
		</div>

		<div class="totalPriceInvoice">
			<div class="totalsTitle">Total Price </div>
			:
			<div class="totalPriceNumber"></div>
		</div>
	</div>

</div>

<div class="buttonContent">
	<button class="cancelInvoice">Batal</button>
	<button class="saveInvoice">Simpan</button>
</div>
</div>
`;

const resultDisplay = `
<div class="mainInvoiceDisplay">
<div class="invoiceContent">
	<div class="invoiceTitle">
		<img src="./image/temporaryLogo.png" alt="Logo" class="invoiceLogo">
		<div class="sheetsOpen" title="Buka Google Sheets">
			<img src="./image/googleSheetImg.png" alt="Google Sheet Image" class="sheetImg">
			<div class="googleSheetOpenTitle">Google Sheets</div>
		</div>

		<div class="reportTitleDisplay">REPORT</div>
	</div>

	<div class="invoiceDetailsTitle">
		<div class="itemNumberInvoice detailTitle">No.</div>
		<div class="itemNameInvoice detailTitle">Item</div>
		<div class="itemQuantityInvoice detailTitle">Qty</div>
		<div class="itemPriceInvoice detailTitle">Price</div>
		<div class="itemSubtotalInvoice detailTitle">Subtotal</div>
	</div>

	<div class="invoiceItems">

	</div>

	<div class="invoiceFooter">
		<div class="invoiceTotalsReport">
			<div class="totalQuantityInvoice">
				<div class="totalsTitle">Total Quantity </div>
				:
				<div class="quantityNumber"></div>
			</div>

			<div class="totalPriceInvoice">
				<div class="totalsTitle">Total Price </div>
				:
				<div class="totalPriceNumber"></div>
			</div>
		</div>

		<div class="buttonFooter">
			<button class="cancelReport">Kembali</button>
			<button class="uploadReport">Upload</button>
		</div>
	</div>

</div>

<div class="buttonContent">
	<button class="deleteReport">Hapus</button>
</div>
</div>
`;

const netIncomeDisplay = `
<div class="mainInvoiceDisplay">
<div class="invoiceContent">
	<div class="invoiceTitle">
		<img src="./image/temporaryLogo.png" alt="Logo" class="invoiceLogo">

		<div class="sheetsOpen" title="Buka Google Sheets">
			<img src="./image/googleSheetImg.png" alt="Google Sheet Image" class="sheetImg">
			<div class="googleSheetOpenTitle">Google Sheets</div>
		</div>

		<div class="incomeTitleDisplay">INCOME</div>
	</div>

	<div class="invoiceDetailsTitle">
		<div class="itemNumberProfit detailTitle">No.</div>
		<div class="itemNameProfit detailTitle">Item</div>
		<div class="itemQuantityProfit detailTitle">Qty</div>
		<div class="itemPriceProfit detailTitle">Price</div>
		<div class="itemInitialPriceProfit detailTitle">Initial Price</div>
		<div class="itemSubtotalProfit detailTitle">Total Profit</div>
	</div>

	<div class="invoiceItems">
	</div>

	<div class="invoiceFooter">
		<div class="invoiceTotalsReport">
			<div class="totalQuantityInvoice">
				<div class="totalsTitle">Total Quantity </div>
				:
				<div class="quantityNumber"></div>
			</div>

			<div class="totalPriceInvoice">
				<div class="totalsTitle">Total Profit </div>
				:
				<div class="totalPriceNumber"></div>
			</div>
		</div>

		<div class="buttonFooter">
			<button class="cancelReport">Kembali</button>
			<button class="uploadReport">Upload</button>
		</div>
	</div>

</div>
</div>
`;