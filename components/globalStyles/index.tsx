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
          height: 100%;
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
