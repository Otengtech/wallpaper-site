import { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.innerHTML = `
      atOptions = {
        'key' : '6676d68ba7d23941b9617404b8afd159',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "//www.highperformanceformat.com/6676d68ba7d23941b9617404b8afd159/invoke.js";
    script2.type = "text/javascript";
    document.body.appendChild(script2);

    // Cleanup when leaving page
    return () => {
      script1.remove();
      script2.remove();
    };
  }, []);

  return (
    <div className="ad-container">
      <div id="ad-banner"></div>
    </div>
  );
};

export default AdBanner;
