const app = document.querySelector('.allDisplay');

const GOOGLE_SCRIPT_URL =		//Script API upload data to Google Sheets
	'https://script.google.com/macros/s/AKfycbwwzA96nkfTP-xNpbi2SH0pARF84TZeL2yzgvXZVXhNxtm5EWk67j5TSaYp-xym_XLB/exec';

const GOOGLE_SHEET_URL =		//Google Sheets link to see the uploaded data
	'https://docs.google.com/spreadsheets/d/1PVUILPGWNI-kZuBQXAlo7bV0xt_sqp6I1dr3aNGD3c0/edit?usp=sharing';
const NO_IMAGE_SOURCE = './image/noImageDefault.jpg';
const ITEMS_LIST = {
	Kuotie_Kuantung: [1, 25000, './image/kuotieSantungImg.jpeg'],
	Kuotie_Ayam: [2, 15000, './image/kuotie.webp'],
	Mie_Ayam: [3, 25000, './image/mieAyam.jpg'],
	Siomay_Bandung_Babi: [4, 27000, './image/siomayBandung.jpg'],
	Siomay_Bandung_Ayam: [5, 20000, './image/siomayBandung.jpg'],
	Siomay_wortel_Babi: [6, 22000, './image/siomayWortel.jpg'],
	Siomay_wortel_Ayam: [7, 15000, './image/siomayWortel.jpg'],
	Nasi_Tim: [8, 27000, './image/nasiTim.png'],
	Nasi_Kuning: [9, 15000, './image/nasiKuning.jpg'],
	Nasi_Bakar: [10, 15000],
	Bacang_Babi: [11, 25000],
	Lemper_Ayam: [12, 7000],
	Bakso_Goreng: [13, 12000],
	Mohyang_Ayam: [14, 23000],
	Getuk_original: [15, 5000],
	Getuk_Cokelat: [16, 6000],
	Singkong_Thailand: [17, 8000],
	Bola_Ubi: [18, 10000],
	Talam_Ubi: [19, 5000],
	Pastel: [20, 6000],
	Asinan: [21, 25000],
	Risol_Mayonaise: [22, 10000],
	Lumpia_Goreng: [23, 12000],
	Susu_Kedelai: [24, 12000],
};

const TIMER_ADD_PURCHASE = 1500;
const dashboardDisplay = `
<div class="headerDisplay">
<img class="titleLogo" src="./image/temporaryLogo.png"></img>
<div class="titleDisplay">Dunia Jajanku</div>
<img class="titleLogo" src="./image/temporaryLogo.png"></img>

<div class="seeTotalReport">
	<img src="./image/reportDataImg.png" class="reportImg" title="Lihat Laporan Penjualan">
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