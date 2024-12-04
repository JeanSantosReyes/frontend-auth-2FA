import { useState } from "react";
import { setupApi, verifyApi } from "./services";

const App = () => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [token, setToken] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const handleSetup2FA = async () => {
    try {
      const response = await setupApi(username);
      setQrCodeDataUrl(response.data.qrCodeDataUrl);
    } catch (error) {
      console.error('Error setting up 2FA', error);
    }
  };

  const handleVerify2FA = async () => {
    try {
      const response = await verifyApi(username, token);
      if (response.data === '2FA verified successfully') {
        // Redirigir al usuario a la página principal
        console.log('OK')
      } else {
        alert('Invalid token');
      }
    } catch (error) {
      console.error('Error verifying 2FA', error);
    }
  };

  return (
    <>
      <div>
        <h1>Set up 2FA</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSetup2FA}>Generate QR Code</button>
        {qrCodeDataUrl && (
          <div>
            <img src={qrCodeDataUrl} alt="QR Code" />
            <input
              type="text"
              placeholder="Enter 2FA code"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <button onClick={handleVerify2FA}>Verify</button>
          </div>
        )}
      </div>
    </>
  )
}
export default App