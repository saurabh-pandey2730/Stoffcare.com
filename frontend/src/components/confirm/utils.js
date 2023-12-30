export const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject(new Error('Failed to load script'));
      };
      document.head.appendChild(script);
    });
  };
  