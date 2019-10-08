export const classes = (...classList: string[]) =>
  classList.filter(className => !!className).join(' ');
