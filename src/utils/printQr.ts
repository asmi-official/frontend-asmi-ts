export const printQr = (orderNumber: string) => {
  const canvas = document.getElementById(`qr-canvas-${orderNumber}`) as HTMLCanvasElement | null;

  if (!canvas) {
    alert('QR Code tidak ditemukan');
    return;
  }

  // Buat canvas baru dengan resolusi sangat tinggi untuk print HD
  const scale = 8; // 8x resolusi untuk kualitas super HD
  const tempCanvas = document.createElement('canvas');
  const ctx = tempCanvas.getContext('2d');

  if (!ctx) return;

  // Set dimensi canvas dengan scale tinggi
  tempCanvas.width = canvas.width * scale;
  tempCanvas.height = canvas.height * scale;

  // Disable semua smoothing untuk pixel-perfect
  ctx.imageSmoothingEnabled = false;
  ctx.imageSmoothingQuality = 'high';

  // Scale dan draw dengan nearest-neighbor
  ctx.scale(scale, scale);
  ctx.drawImage(canvas, 0, 0);

  // Convert ke PNG dengan kualitas maksimal (1.0)
  const img = tempCanvas.toDataURL('image/png', 1.0);

  const win = window.open('', '_blank');
  if (!win) return;

  win.document.write(`
    <html>
      <head>
        <title>Print QR - ${orderNumber}</title>
        <style>
          @media print {
            @page { margin: 0; }
            body { margin: 0.5cm; }
          }
          body {
            margin:0;
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            font-family:Segoe UI, sans-serif;
            background:#fff;
          }
          .box {
            text-align:center;
            padding:20px;
          }
          img {
            width:300px;
            height:300px;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            display:block;
            margin:0 auto;
          }
          .order {
            font-size:11px;
            color:#666;
            margin:10px 0 0 0;
            letter-spacing:0.5px;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <img src="${img}" alt="QR Code" />
          <p class="order">${orderNumber}</p>
        </div>
        <script>
          window.onload = () => {
            window.print();
            window.onafterprint = () => window.close();
          }
        </script>
      </body>
    </html>
  `);

  win.document.close();
};
