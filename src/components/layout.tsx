import elements from 'typed-html'

export const Layout = ({ children }: elements.Children) => {
  return ` 
  <!DOCTYPE html>
  <html id="root" class="dark">
    <head>
      <title>craite</title>
      <link rel="icon" type="image/x-icon" href="/public/favicon.ico">
      <link rel="stylesheet" href="/public/styles.css">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
      <script src="https://unpkg.com/htmx.org@1.9.4"></script>
    </head>
      ${children}
    <script>
      htmx.logAll();

      function toggleDarkMode() {
        const root = document.getElementById('root');
        root.classList.toggle('dark');
      }

      document.body.addEventListener('htmx:configRequest', function(evt) {
        let retryCount = parseInt(evt.detail.headers['X-Retry-Count']) || 0;
        evt.detail.headers['X-Retry-Count'] = retryCount;
      });

      document.body.addEventListener('htmx:beforeSwap', function(evt) {
        if (evt.detail.xhr.status === 502) {
          let retryCount = parseInt(evt.detail.xhr.getResponseHeader('X-Retry-Count'));
          if (retryCount < 3) {
            evt.detail.headers['X-Retry-Count'] = ++retryCount;
            evt.detail.shouldSwap = false;
            setTimeout(function () {
              htmx.trigger(evt.detail.elt, 'htmx:send');
            }, 1000);
          }
        }
      });
    </script>
  </html>
`
}
