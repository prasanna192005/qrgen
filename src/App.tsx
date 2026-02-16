import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Upload, X, Globe, User, MessageSquare } from 'lucide-react';

function App() {
  const [mode, setMode] = useState<'url' | 'vcard' | 'whatsapp'>('url');
  const [url, setUrl] = useState('https://example.com');
  const [vCard, setVCard] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    jobTitle: '',
    website: '',
  });
  const [whatsapp, setWhatsapp] = useState({
    phone: '',
    message: '',
  });
  const [logo, setLogo] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState(256);
  const [logoSize, setLogoSize] = useState(50);
  const qrRef = useRef<HTMLDivElement>(null);

  const generateVCardString = () => {
    const { firstName, lastName, phone, email, company, jobTitle, website } = vCard;
    return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
ORG:${company}
TITLE:${jobTitle}
TEL;TYPE=CELL:${phone}
EMAIL:${email}
URL:${website}
END:VCARD`;
  };

  const generateWhatsAppLink = () => {
    const { phone, message } = whatsapp;
    // Remove any non-numeric characters from phone number
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
  };

  const qrValue = mode === 'url'
    ? url
    : mode === 'vcard'
      ? generateVCardString()
      : generateWhatsAppLink();

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

    canvas.toBlob((blob) => {
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

              <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
                <button
                  onClick={() => setMode('url')}
                  className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition ${mode === 'url'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  URL
                </button>
                <button
                  onClick={() => setMode('vcard')}
                  className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition ${mode === 'vcard'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  vCard
                </button>
                <button
                  onClick={() => setMode('whatsapp')}
                  className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition ${mode === 'whatsapp'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WhatsApp
                </button>
              </div>

              <div className="space-y-6">
                {mode === 'url' ? (
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
                ) : mode === 'whatsapp' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        WhatsApp Number (with country code)
                      </label>
                      <input
                        type="tel"
                        value={whatsapp.phone}
                        onChange={(e) => setWhatsapp({ ...whatsapp, phone: e.target.value })}
                        placeholder="e.g. 919876543210"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Pre-filled Message (optional)
                      </label>
                      <textarea
                        value={whatsapp.message}
                        onChange={(e) => setWhatsapp({ ...whatsapp, message: e.target.value })}
                        placeholder="Hello! I'm interested in..."
                        rows={3}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm resize-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={vCard.firstName}
                        onChange={(e) => setVCard({ ...vCard, firstName: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={vCard.lastName}
                        onChange={(e) => setVCard({ ...vCard, lastName: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={vCard.phone}
                        onChange={(e) => setVCard({ ...vCard, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={vCard.email}
                        onChange={(e) => setVCard({ ...vCard, email: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                      />
                    </div>
                  </div>
                )}

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
                    value={qrValue}
                    size={qrSize}
                    level="H"
                    includeMargin={true}
                    imageSettings={
                      logo
                        ? {
                          src: logo,
                          x: undefined,
                          y: undefined,
                          height: (logoSize / 100) * qrSize,
                          width: (logoSize / 100) * qrSize,
                          excavate: true,
                        }
                        : undefined
                    }
                  />
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
