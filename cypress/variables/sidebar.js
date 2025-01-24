// Selector untuk menu
export const menu = "span[role='menuitem']";

// Fungsi untuk mendapatkan elemen menu berdasarkan indeks
export const menu_dashboard = `${menu}:nth-of-type(1)`; // Menu pertama
export const menu_assets = `${menu}:nth-of-type(2)`; // Menu kedua
export const menu_workOrder = `${menu}:nth-of-type(3)`; // Menu ketiga
export const menu_organization = `${menu}:nth-of-type(4)`; // Menu keempat
export const menu_security = `${menu}:nth-of-type(5)`; // Menu kelima

// Submenu
export const submenu_meters_groups = "p:contains('Meters & Groups')";