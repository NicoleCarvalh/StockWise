

function Logo({ type, className }) {
  switch (type) {
    case ("long-black"):
      return <img className={className} src="/logo-long-black.svg" alt="" />;

    case ("long-green"):
      return <img className={className} src="/logo-long-green.svg" alt="" />;

    case ("long-white"):
      return <img className={className} src="/logo-long-white.svg" alt="" />;

    case ("short-black"):
      return <img className={className} src="/logo-short-black.svg" alt="" />;

    case ("short-green"):
      return <img className={className} src="/logo-short-green.svg" alt="" />;

    case ("short-white"):
      return <img className={className} src="/logo-short-white.svg" alt="" />;

    default:
      return <img className={className} src="/logo-short-green.svg" alt="" />;
  }
}

export { Logo };
