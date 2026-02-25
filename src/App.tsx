import { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { Globe, User, MessageCircle, Mail, Send, Calendar } from 'lucide-react';
import { QRMode, VCardData, EmailData, EventData, QRType, QRFormat, DotStyle } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { TypeSelector } from './components/generator/TypeSelector';
import { ContentForm } from './components/generator/ContentForm';
import { StyleControls } from './components/generator/StyleControls';
import { QRPreview } from './components/generator/QRPreview';

const MODES: QRMode[] = [
  { id: 'url', label: 'Website', description: 'Link to any webpage', icon: Globe },
  { id: 'vcard', label: 'Contact', description: 'Share contact details', icon: User },
  { id: 'whatsapp', label: 'WhatsApp', description: 'Direct message link', icon: MessageCircle },
  { id: 'email', label: 'Email', description: 'Pre-filled email draft', icon: Mail },
  { id: 'sms', label: 'SMS', description: 'Pre-filled text message', icon: Send },
  { id: 'event', label: 'Event', description: 'Calendar appointment', icon: Calendar },
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [mode, setMode] = useState<QRType>('url');
  const [url, setUrl] = useState('https://example.com');
  const [vCard, setVCard] = useState<VCardData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    website: '',
  });
  const [whatsapp, setWhatsapp] = useState({
    phone: '',
    message: '',
  });
  const [email, setEmail] = useState<EmailData>({
    address: '',
    subject: '',
    body: '',
  });
  const [sms, setSms] = useState({
    phone: '',
    message: '',
  });
  const [calendar, setCalendar] = useState<EventData>({
    title: '',
    location: '',
    startDate: '',
    description: '',
  });

  const [logo, setLogo] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState(512);
  const [logoSize, setLogoSize] = useState(25);
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [dotStyle, setDotStyle] = useState<DotStyle>('square');
  const [exportFormat, setExportFormat] = useState<QRFormat>('png');
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsRegenerating(true);
    const timer = setTimeout(() => setIsRegenerating(false), 400);
    return () => clearTimeout(timer);
  }, [url, vCard, whatsapp, email, sms, calendar, mode, fgColor, bgColor, dotStyle, logo, logoSize]);

  const generateVCardString = () => {
    const { firstName, lastName, phone, email, company, website } = vCard;
    return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
ORG:${company}
TEL;TYPE=CELL:${phone}
EMAIL:${email}
URL:${website}
END:VCARD`;
  };

  const generateWhatsAppLink = () => {
    const { phone, message } = whatsapp;
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
  };

  const generateEmailString = () => {
    const { address, subject, body } = email;
    const params = new URLSearchParams();
    if (subject) params.append('subject', subject);
    if (body) params.append('body', body);
    const queryString = params.toString();
    return `mailto:${address}${queryString ? `?${queryString}` : ''}`;
  };

  const generateSMSString = () => {
    const { phone, message } = sms;
    const cleanPhone = phone.replace(/\D/g, '');
    return `sms:${cleanPhone}${message ? `?body=${encodeURIComponent(message)}` : ''}`;
  };

  const generateCalendarString = () => {
    const { title, location, startDate, description } = calendar;
    const formatDateTime = (dt: string) => dt.replace(/[-:]/g, '') + '00Z';

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      location ? `LOCATION:${location}` : '',
      `DTSTART:${formatDateTime(startDate)}`,
      description ? `DESCRIPTION:${description}` : '',
      'END:VEVENT',
      'END:VCALENDAR'
    ].filter(Boolean).join('\n');
  };

  const qrValue = mode === 'url'
    ? url
    : mode === 'vcard'
      ? generateVCardString()
      : mode === 'whatsapp'
        ? generateWhatsAppLink()
        : mode === 'email'
          ? generateEmailString()
          : mode === 'sms'
            ? generateSMSString()
            : generateCalendarString();

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

    if (exportFormat === 'png') {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `qr19-export.png`;
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    } else if (exportFormat === 'svg') {
      const svgElement = document.getElementById('qr-svg-hidden');
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = `qr19-export.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);
      }
    }
  };

  const copyToClipboard = async () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const data = [new ClipboardItem({ 'image/png': blob })];
        await navigator.clipboard.write(data);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }, 'image/png');
    } catch (err) {
      console.error('Failed to copy image: ', err);
    }
  };

  const handleStartOver = () => {
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen selection:bg-blue-600 selection:text-white pb-20">
      {/* Hidden SVG Renderer for Export */}
      <div className="fixed -left-[9999px] -top-[9999px]">
        <QRCodeSVG
          id="qr-svg-hidden"
          value={qrValue}
          size={1024}
          fgColor={fgColor}
          bgColor={bgColor}
          level="H"
          marginSize={0}
          imageSettings={logo ? {
            src: logo,
            height: (1024 * logoSize) / 200,
            width: (1024 * logoSize) / 200,
            excavate: true,
          } : undefined}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-10 py-16">
        <Header />

        <div className="max-w-xl mx-auto mb-20 px-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-900 transition-all duration-700 ease-out"
                style={{ width: `${((currentStep - 1) / 1) * 100}%` }}
              />
            </div>
            {[
              { step: 1, label: 'Choose Content' },
              { step: 2, label: 'Design & Export' }
            ].map((item) => (
              <button
                key={item.step}
                onClick={() => setCurrentStep(item.step)}
                className="relative z-10 flex flex-col items-center group"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${currentStep === item.step
                    ? 'bg-slate-900 text-white shadow-xl scale-110'
                    : currentStep > item.step
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border-2 border-slate-100 text-slate-300'
                  }`}>
                  {currentStep > item.step ? '✓' : item.step}
                </div>
                <span className={`absolute -bottom-8 whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-colors ${currentStep >= item.step ? 'text-slate-900' : 'text-slate-300'
                  }`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <main className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8 space-y-12">
            {currentStep === 1 && (
              <TypeSelector
                mode={mode}
                setMode={(m) => { setMode(m); setCurrentStep(2); }}
                modes={MODES}
              />
            )}

            {currentStep === 2 && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <ContentForm
                  mode={mode}
                  url={url} setUrl={setUrl}
                  vCard={vCard} setVCard={setVCard}
                  whatsapp={whatsapp} setWhatsapp={setWhatsapp}
                  email={email} setEmail={setEmail}
                  sms={sms} setSms={setSms}
                  calendar={calendar} setCalendar={setCalendar}
                />

                <StyleControls
                  fgColor={fgColor} setFgColor={setFgColor}
                  bgColor={bgColor} setBgColor={setBgColor}
                  qrSize={qrSize} setQrSize={setQrSize}
                  logo={logo} handleLogoUpload={handleLogoUpload} removeLogo={removeLogo}
                  logoSize={logoSize} setLogoSize={setLogoSize}
                  dotStyle={dotStyle} setDotStyle={setDotStyle}
                />

                <div className="pt-10 flex justify-end">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Auto-saving preferences
                  </p>
                </div>
              </div>
            )}
          </div>

          <QRPreview
            qrRef={qrRef}
            qrValue={qrValue}
            qrSize={qrSize}
            fgColor={fgColor}
            bgColor={bgColor}
            logo={logo}
            logoSize={logoSize}
            downloadQR={downloadQR}
            copyToClipboard={copyToClipboard}
            copied={copied}
            exportFormat={exportFormat}
            setExportFormat={setExportFormat}
            isRegenerating={isRegenerating}
            currentStep={currentStep}
            onStartOver={handleStartOver}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
