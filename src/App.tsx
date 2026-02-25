import { useState, useRef } from 'react';
import { QRMode, VCardData, WhatsAppData, EmailData, SMSData, CalendarData } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { TypeSelector } from './components/generator/TypeSelector';
import { ContentForm } from './components/generator/ContentForm';
import { StyleControls } from './components/generator/StyleControls';
import { QRPreview } from './components/generator/QRPreview';

function App() {
  const [mode, setMode] = useState<QRMode>('url');
  const [url, setUrl] = useState('https://example.com');
  const [vCard, setVCard] = useState<VCardData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    jobTitle: '',
    website: '',
  });
  const [whatsapp, setWhatsapp] = useState<WhatsAppData>({
    phone: '',
    message: '',
  });
  const [email, setEmail] = useState<EmailData>({
    address: '',
    subject: '',
    body: '',
  });
  const [sms, setSms] = useState<SMSData>({
    phone: '',
    message: '',
  });
  const [calendar, setCalendar] = useState<CalendarData>({
    title: '',
    location: '',
    startTime: '',
    endTime: '',
    description: '',
  });
  const [logo, setLogo] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState(256);
  const [logoSize, setLogoSize] = useState(50);
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [copied, setCopied] = useState(false);
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
    const { title, location, startTime, endTime, description } = calendar;
    const formatDateTime = (dt: string) => dt.replace(/[-:]/g, '') + '00Z';

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      location ? `LOCATION:${location}` : '',
      `DTSTART:${formatDateTime(startTime)}`,
      `DTEND:${formatDateTime(endTime)}`,
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

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-[1280px] mx-auto px-6 py-12 lg:py-20">
        <Header />

        <main className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-10">
            <TypeSelector mode={mode} setMode={setMode} />

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
            />
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
          />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
