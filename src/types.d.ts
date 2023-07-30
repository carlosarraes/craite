declare namespace JSX {
  interface HtmlTag {
    _?: string
  }
  interface IntrinsicElements {
    svg: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HtmlTag
    path: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HtmlTag
  }
}
