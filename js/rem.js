const Rem = () => {
    const width = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = `${(width / 750) * 100}px`;
  };
  Rem();
  window.addEventListener('resize', Rem);