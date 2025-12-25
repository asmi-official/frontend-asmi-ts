export const printQr = (orderNumber: string) => {
  const canvas = document.getElementById(`qr-canvas-${orderNumber}`) as HTMLCanvasElement | null;

  if (!canvas) {
    alert('QR Code tidak ditemukan');
    return;
  }

  const img = canvas.toDataURL('image/png');
  const win = window.open('', '_blank');
  if (!win) return;

  win.document.write(`
    <html>
      <head>
        <title>Print QR - ${orderNumber}</title>
        <style>
          body {
            margin:0;
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            font-family:Segoe UI, sans-serif;
          }
          .box {
            text-align:center;
            padding:40px;
            border-radius:20px;
            border:1px solid #eee;
          }
          img { width:250px; height:250px; }
          .id { font-size:24px; font-weight:700; color:#7C2D3E; }
        </style>
      </head>
      <body>
        <div class="box">
          <img src="${img}" />
          <p class="id">${orderNumber}</p>
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
