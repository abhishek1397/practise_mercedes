/**
  Calculates total price for a car configuration based on base price, chosen color, wheels, and packages.
 */
export function calculateTotalPrice(car, selectedColorIndex = 0, selectedWheelIndex = 0, selectedPackageIds = []) {
  if (!car) return 0;
  
  const base = car.basePrice || 0;
  const colorPrice = car.colors?.[selectedColorIndex]?.price || 0;
  const wheelPrice = car.wheels?.[selectedWheelIndex]?.price || 0;
  
  const packagesPrice = (selectedPackageIds || []).reduce((acc, pkgId) => {
    const pkg = car.packages?.find(p => p.id === pkgId);
    return acc + (pkg ? pkg.price : 0);
  }, 0);

  return base + colorPrice + wheelPrice + packagesPrice;
}

/**
  Calculates estimated monthly lease financing payment over term months.
 */
export function calculateMonthlyPayment(totalPrice, downPaymentPercent = 10, APR = 4.9, termMonths = 48) {
  if (!totalPrice || totalPrice <= 0) return 0;
  
  const downPayment = totalPrice * (downPaymentPercent / 100);
  const principal = totalPrice - downPayment;
  const monthlyRate = APR / 100 / 12;
  
  if (monthlyRate === 0) return Math.round(principal / termMonths);
  
  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
                         (Math.pow(1 + monthlyRate, termMonths) - 1);
                         
  return Math.round(monthlyPayment);
}

/**
  Formats USD currency numbers cleanly.
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount || 0);
}

/**
  Filters car list by search query and series.
 */
export function filterCars(carsList, searchQuery = '', seriesFilter = 'all') {
  if (!Array.isArray(carsList)) return [];
  
  return carsList.filter(car => {
    const matchesSearch = searchQuery === '' || 
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesSeries = seriesFilter === 'all' || car.series === seriesFilter;
    
    return matchesSearch && matchesSeries;
  });
}

/**
  Validates test drive booking form inputs.
 */
export function validateBookingForm({ name, email, phone, date, modelId }) {
  const errors = {};
  
  if (!name || name.trim().length < 2) {
    errors.name = 'Full name is required (min 2 characters).';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!phone || phone.trim().replace(/\D/g, '').length < 10) {
    errors.phone = 'Valid 10-digit phone number is required.';
  }

  if (!date) {
    errors.date = 'Preferred test drive date is required.';
  }

  if (!modelId) {
    errors.modelId = 'Please select a Mercedes vehicle model.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
