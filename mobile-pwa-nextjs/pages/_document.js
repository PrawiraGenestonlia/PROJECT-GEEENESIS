import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple/icons/icon_180x180.png" />
          <meta name="description" content="NTU EEE APP" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="apple-touch-fullscreen" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="apple-touch-startup-image"
            media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            href="/apple/splash/icon_1125x2436.png" />
          <link rel="apple-touch-startup-image"
            media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            href="/apple/splash/icon_1136x640.png" />
          <link rel="apple-touch-startup-image"
            media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            href="/apple/splash/icon_1242x2208.png" />
          <link rel="apple-touch-startup-image"
            media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            href="/apple/splash/icon_1242x2688.png" />
          <link rel="apple-touch-startup-image"
            media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            href="/apple/splash/icon_1334x750.png" />
          <link rel="apple-touch-startup-image"
            media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            href="/apple/splash/icon_1792x828.png" />
          <link rel="apple-touch-startup-image"
            media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            href="/apple/splash/icon_2208x1242.png" />
          <link rel="apple-touch-startup-image"
            media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            href="/apple/splash/icon_2436x1125.png" />
          <link rel="apple-touch-startup-image"
            media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            href="/apple/splash/icon_2688x1242.png" />
          <link rel="apple-touch-startup-image"
            media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            href="/apple/splash/icon_640x1136.png" />
          <link rel="apple-touch-startup-image"
            media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            href="/apple/splash/icon_750x1334.png" />
          <link rel="apple-touch-startup-image"
            media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            href="/apple/splash/icon_828x1792.png" />
          <style global jsx>{`
          html {
            overflow: hidden;
            height: 100%;
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
          }
            html,
            body {
              font-family: 'Helvetica Neue', 'Hiragino Sans GB', Helvetica,
                'Microsoft YaHei', Arial;
              margin: 0;
            }
            body {
              height:100%;
              overscroll-behavior-y: none;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              -ms-overflow-style: scrollbar;
            }
          `}</style>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument