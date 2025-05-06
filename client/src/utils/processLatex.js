export const processLaTeX = (content) => {
    return content
      .replace(/\\\(/g, '$') // Replace \( with $
      .replace(/\\\)/g, '$'); // Replace \) with $
  };