import React, { useState } from "react";
import Sunmi from "sunmi-js-sdk";

const PrintReceipt = () => {
  const [status, setStatus] = useState("Idle");

  const handlePrint = async () => {
    try {
      setStatus("Menghubungkan printer...");
      await Sunmi.launchPrinterService(); // Inisialisasi printer

      setStatus("Mencetak...");

      // Contoh struk sederhana
      await Sunmi.printText("=== STRUK PEMBAYARAN ===\n");
      await Sunmi.printText("Tanggal: " + new Date().toLocaleString() + "\n");
      await Sunmi.printText("-----------------------------\n");
      await Sunmi.printText("Item        Qty   Harga\n");
      await Sunmi.printText("Kopi Hitam   1   Rp10.000\n");
      await Sunmi.printText("Roti Bakar   2   Rp24.000\n");
      await Sunmi.printText("-----------------------------\n");
      await Sunmi.printText("Total: Rp34.000\n\n");

      // Print QR Code
      await Sunmi.printQr("https://sunmi.com", { align: "center" });
      await Sunmi.lineWrap(3);

      setStatus("Selesai mencetak ✅");
    } catch (error) {
      console.error(error);
      setStatus("Gagal mencetak ❌"+error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-4">
      <h2 className="text-lg font-semibold">Sunmi Printer Demo</h2>
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
