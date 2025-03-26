'use client';

import '@arcgis/core/assets/esri/themes/light/main.css';
import '@arcgis/map-components/dist/components/arcgis-zoom';
import '@arcgis/map-components/components/arcgis-track';

import IdentityManager from '@arcgis/core/identity/IdentityManager';
import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import { StrictMode, useEffect } from 'react';

export default function ArcGISMap() {
  useEffect(() => {
    // 設置OAuth身份驗證
    const info = new OAuthInfo({
      appId: 'vjGbzBWoyDYzEeGj', // 你的應用ID
      popup: false,
      flowType: 'auto',
    });

    IdentityManager.registerOAuthInfos([info]);

    // 檢查登錄狀態
    IdentityManager.checkSignInStatus(info.portalUrl + '/sharing')
      .then(() => {
        console.log('User is signed in');
        // 如果需要，可以在這裡執行額外的邏輯，例如檢查地圖是否載入
      })
      .catch(() => {
        // 如果未登錄，獲取憑證（可能會觸發登錄彈窗）
        IdentityManager.getCredential(info.portalUrl + '/sharing')
          .then(() => {
            console.log('Successfully signed in');
          })
          .catch((error: Error) => {
            console.error('Sign-in failed:', error);
          });
      });
  }, []); // 只需要在組件掛載時執行一次

  return (
    <>
      <h2 className="text-xl font-bold text-center mb-4">Canada Agriculture Map</h2>
      <StrictMode>
        <arcgis-map
          item-id="cb01c55697d94abca1e8f04ec294f984"
          style={{ height: '600px', width: '100%' }}
          center={[-106.3468, 56.1304]}
          zoom={3}
        >
          <arcgis-zoom position="top-left"></arcgis-zoom>
          <arcgis-track position="top-left"></arcgis-track>
        </arcgis-map>
      </StrictMode>
    </>
  );
}
