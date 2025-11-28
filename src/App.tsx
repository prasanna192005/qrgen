import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Upload, X } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('https://example.com');
  const [logo, setLogo] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState(256);
  const [logoSize, setLogoSize] = useState(50);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogo(null);
  };

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    const finalCanvas = document.createElement('canvas');
    const ctx = finalCanvas.getContext('2d');
    if (!ctx) return;

    finalCanvas.width = qrSize;
    finalCanvas.height = qrSize;

    ctx.drawImage(canvas, 0, 0);

    if (logo) {
      const logoImg = new Image();
      logoImg.onload = () => {
        const logoSizePixels = (logoSize / 100) * qrSize;
        const x = (qrSize - logoSizePixels) / 2;
        const y = (qrSize - logoSizePixels) / 2;

        ctx.fillStyle = 'white';
        ctx.fillRect(x - 10, y - 10, logoSizePixels + 20, logoSizePixels + 20);

        ctx.drawImage(logoImg, x, y, logoSizePixels, logoSizePixels);

        finalCanvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'qrcode.png';
            link.click();
            URL.revokeObjectURL(url);
          }
        });
      };
      logoImg.src = logo;
    } else {
      finalCanvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'qrcode.png';
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-3">
              QR Code Generator
            </h1>
            <p className="text-slate-600">
              Create custom QR codes with optional logo overlay
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    URL or Text
                  </label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL or text"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    QR Code Size: {qrSize}px
                  </label>
                  <input
                    type="range"
                    min="128"
                    max="512"
                    step="32"
                    value={qrSize}
                    onChange={(e) => setQrSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Logo
                  </label>
                  {!logo ? (
                    <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                      <Upload className="w-5 h-5 text-slate-400 mr-2" />
                      <span className="text-sm text-slate-600">
                        Upload Logo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center">
                          <img
                            src={logo}
                            alt="Logo preview"
                            className="w-10 h-10 object-contain rounded"
                          />
                          <span className="ml-3 text-sm text-slate-600">
                            Logo added
                          </span>
                        </div>
                        <button
                          onClick={removeLogo}
                          className="p-1 hover:bg-slate-200 rounded transition"
                        >
                          <X className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Logo Size: {logoSize}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="30"
                          step="5"
                          value={logoSize}
                          onChange={(e) => setLogoSize(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={downloadQR}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition shadow-sm"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PNG
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Preview
              </h2>

              <div className="flex items-center justify-center p-8 bg-slate-50 rounded-lg">
                <div className="relative" ref={qrRef}>
                  <QRCodeCanvas
                    value={url}
                    size={qrSize}
                    level="H"
                    includeMargin={true}
                  />
                  {logo && (
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        width: `${(logoSize / 100) * qrSize}px`,
                        height: `${(logoSize / 100) * qrSize}px`,
                      }}
                    >
                      <div className="absolute inset-0 bg-white rounded-sm -m-2"></div>
                      <img
                        src={logo}
                        alt="Logo overlay"
                        className="relative z-10 w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 text-sm text-slate-500 text-center">
                Scan with your phone camera to test
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
