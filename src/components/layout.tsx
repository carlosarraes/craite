import elements from 'typed-html'

export const Layout = ({ children }: elements.Children) => {
  return ` 
  <!DOCTYPE html>
  <html>
    <head>
      <title>CreAItive</title>
      <link rel="icon" type="image/x-icon" href="/public/favicon.ico">
      <script src="https://unpkg.com/htmx.org@1.9.4"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
    </head>
      ${children}
  </html>
`
}
