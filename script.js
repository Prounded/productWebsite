const app = document.querySelector('.allDisplay');

const TIMER_ANIMATION_DURATION = 1500;
const NO_RESULT_TEXT = 'Tidak ada hasil yang ditemukan';
const GOOGLE_SCRIPT_URL =		//Script API upload data to Google Sheets
	'https://script.google.com/macros/s/AKfycbwwzA96nkfTP-xNpbi2SH0pARF84TZeL2yzgvXZVXhNxtm5EWk67j5TSaYp-xym_XLB/exec';

const GOOGLE_SHEET_URL =		//Google Sheets link to see the uploaded data
	'https://docs.google.com/spreadsheets/d/1PVUILPGWNI-kZuBQXAlo7bV0xt_sqp6I1dr3aNGD3c0/edit?usp=sharing';
const NO_IMAGE_SOURCE = './image/noImageDefault.jpg';
const ITEMS_LIST = {
	Kuotie_Kuantung: [1, 25000, './image/kuotieSantungImg.jpeg', 'Kuotie'],
	Kuotie_Ayam: [2, 15000, './image/kuotieAyam.jpg', 'Kuotie'],
	Mie_Ayam: [3, 25000, './image/mieAyam.jpg', 'Mie'],
	Siomay_Bandung_Babi: [4, 27000, './image/siomayBandungBabi.png', 'Siomay'],
	Siomay_Bandung_Ayam: [5, 20000, './image/siomayBandungAyam.png', 'Siomay'],
	Siomay_Wortel_Babi: [6, 22000, './image/siomayWortelBabi.jpg', 'Siomay'],
	Siomay_Wortel_Ayam: [7, 15000, './image/siomayWortelAyam.jpg', 'Siomay'],
	Nasi_Tim: [8, 27000, './image/nasiTim.png', 'Nasi'],
	Nasi_Kuning: [9, 15000, './image/nasiKuning.png', 'Nasi'],
	Nasi_Bakar: [10, 15000, './image/nasiBakar.jpeg', 'Nasi'],
	Bacang_Babi: [11, 25000, './image/bacangBabi.jpg', 'Nasi'],
	Lemper_Ayam: [12, 7000, './image/lemperAyam.jpg', 'Nasi'],
	Bakso_Goreng: [13, 12000, './image/baksoGoreng.png', 'Gorengan'],
	Mohyang_Ayam: [14, 23000, './image/mohyangAyam.jpg', 'Gorengan'],
	Getuk_original: [15, 5000, './image/getukOriginal.jpg', 'Kue'],
	Getuk_Cokelat: [16, 6000, './image/getukCokelat.jpg', 'Kue'],
	Singkong_Thailand: [17, 8000, './image/singkongThailand.jpg', 'Kue'],
	Bola_Ubi: [18, 10000, './image/bolaUbi.jpg', 'Kue'],
	Talam_Ubi: [19, 5000, './image/talamUbi.jpg', 'Kue'],
	Pastel: [20, 6000, './image/pastel.jpg', 'Gorengan'],
	Asinan: [21, 25000, './image/asinan.jpg', 'Asinan'],
	Risol_Mayonaise: [22, 10000, './image/risolMayonaise.jpg', 'Gorengan'],
	Lumpia_Goreng: [23, 12000, './image/lumpiaGoreng.jpeg', 'Gorengan'],
	Susu_Kedelai: [24, 12000, './image/susuKedelai.jpg', 'Minuman'],
	Bakpia_Kacang_Hijau: [25, 20000, './image/bakpiaKacangHijau.png', 'Kue'],
	Mie_Goreng: [26, 10000, './image/mieGoreng.jpg', 'Mie'],
};

const dashboardDisplay = `
<div class="headerDisplay">
	<div class="seeTotalReport">
		<img src="./image/reportDataImg.png" class="reportImg" title="Lihat Laporan Penjualan">
	</div>
	<div class="titleDisplayContainer">
		<img class="titleLogo" src="./image/temporaryLogo.png"></img>
		<div class="titleDisplay">Dunia Jajanku</div>
	</div>
</div>

<div class="searchBarContainer">
	<div class="searchBarDiv">
		<img class="searchIcon" src="./image/searchIcon.png"></img>
		<input type="text" class="searchBar" placeholder="Search..."></input>
		<img class="clearSearchIcon" src="./image/clearSearchIcon.png"></img>
	</div>
	
	<div class="filterCategoryDiv">
	</div>
</div>

<div class="itemList">
</div>

<div class="checkoutDetail">
<img class="shoppingImg" src="./image/shoppingIcon.png"></img>
<div class="totalItemsAmount"></div>
<div class="checkoutTitle">Total : </div>
<div class="totalPrice"></div>
<button class="proceedCheckout">Checkout</button>
</div>
`;

const receiptDisplay = `
<div class="mainInvoiceDisplay">
<div class="invoiceContent">
	<div class="invoiceTitle">
		<img src="./image/temporaryLogo.png" alt="Logo" class="invoiceLogo">
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
