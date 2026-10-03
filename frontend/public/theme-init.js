// Runs before first paint so there is no flash. Light is the default;
// dark is only used if the visitor explicitly switched to it before.
try {
  if (localStorage.getItem('theme') !== 'dark') document.documentElement.setAttribute('data-theme', 'light')
} catch (e) {
  document.documentElement.setAttribute('data-theme', 'light')
}
