import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script 
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
        </link>

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
