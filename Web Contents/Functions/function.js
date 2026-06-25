const toggleButton = document.getElementById('theme-toggle');

// 1. Check for saved theme preference, otherwise check system settings
const currentTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// 2. Apply the initial theme on page load
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

// 3. Toggle theme function
toggleButton.addEventListener('click', () => {
    let theme = 'light';
    
    // If it's currently light, make it dark
    if (document.documentElement.getAttribute('data-theme') !== 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        theme = 'dark';
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    
    // Save the choice to local storage
    localStorage.setItem('theme', theme);
});