export const GlobalStyles = () => {
  return (
    <>
      <style global jsx>{`
        #__next {
          width: 100%;
          height: 100%;
        }

        html {
          box-sizing: border-box;
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(
            to bottom,
            hsl(197, 84%, 70%),
            hsl(197, 64%, 78%) 25%,
            hsl(197, 64%, 88%) 80%
          );
          font-size: 16px;
          overflow: hidden;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
          border-width: 0;
          border-style: solid;
        }

        body {
          margin: 0;
          padding: 0;
          height: 100%;
        }
      `}</style>
    </>
  )
}
