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
      function toggleDarkMode() {
        const root = document.getElementById('root');
        root.classList.toggle('dark');
      }

      document.body.addEventListener('htmx:afterOnLoad', function (event) {
        if (event.detail.xhr.status === 502) {
          setTimeout(function () {
            htmx.trigger(event.detail.elt, 'load');
          }, 1000);
        }
      });
    </script>
  </html>
`
}
