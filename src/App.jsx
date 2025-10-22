import React, { useState } from "react";

const PrintReceipt = () => {
  const [status, setStatus] = useState("Idle");

  const handlePrint = () => {
    try {
      setStatus("Menyiapkan struk...");

      // Buat konten struk
      const printContent = `
        <div style="font-family: monospace; padding: 20px;">
          <h2 style="text-align: center;">=== STRUK PEMBAYARAN ===</h2>
          <p>Tanggal: ${new Date().toLocaleString()}</p>
          <hr/>
          <pre>
Item          Qty   Harga
Kopi Hitam     1    Rp10.000
Roti Bakar     2    Rp24.000
          </pre>
          <hr/>
          <p><b>Total: Rp34.000</b></p>
          <div style="text-align:center; margin-top:20px;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?data=https://sunmi.com&size=100x100" alt="QR Code"/>
          </div>
          <p style="text-align:center; margin-top:10px;">Terima kasih!</p>
        </div>
      `;

      // Buka jendela baru untuk print
      const printWindow = window.open("", "_blank");
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();

      // Panggil fungsi print
      printWindow.print();
      printWindow.close();

      setStatus("Selesai mencetak ✅");
    } catch (error) {
      console.error(error);
      setStatus("Gagal mencetak ❌ " + error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-4">
      <h2 className="text-lg font-semibold">Web Print Demo</h2>
      <button
        onClick={handlePrint}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Print Receipt
      </button>
      <p className="text-sm text-gray-600">{status}</p>
    </div>
  );
};

export default PrintReceipt;
