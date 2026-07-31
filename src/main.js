import { MERCEDES_MODELS } from './data/cars.js';
import { 
  calculateTotalPrice, 
  calculateMonthlyPayment, 
  formatCurrency, 
  filterCars, 
  validateBookingForm 
} from './utils/configurator.js';

// Application State
let state = {
  cars: MERCEDES_MODELS,
  searchQuery: '',
  seriesFilter: 'all',
  selectedCar: MERCEDES_MODELS[0],
  selectedColorIndex: 0,
  selectedWheelIndex: 0,
  selectedPackageIds: []
};

// DOM Elements
const carsGrid = document.getElementById('cars-grid');
const searchInput = document.getElementById('search-input');
const seriesSelect = document.getElementById('series-select');

// Modal Elements
const configuratorModal = document.getElementById('configurator-modal');
const closeConfigModalBtn = document.getElementById('close-config-modal');
const bookingModal = document.getElementById('booking-modal');
const closeBookingModalBtn = document.getElementById('close-booking-modal');
const btnOpenBookModal = document.getElementById('btn-open-book-modal');
const testDriveForm = document.getElementById('test-drive-form');
const bookingModelSelect = document.getElementById('booking-model');

// Configurator DOM Elements
const modalCarName = document.getElementById('modal-car-name');
const modalCarSeries = document.getElementById('modal-car-series');
const modalCarImage = document.getElementById('modal-car-image');
const modalSpecsSummary = document.getElementById('modal-specs-summary');
const colorSwatchesContainer = document.getElementById('color-swatches');
const wheelsOptionsContainer = document.getElementById('wheels-options');
const packagesOptionsContainer = document.getElementById('packages-options');
const summaryBasePrice = document.getElementById('summary-base-price');
const summaryOptionsPrice = document.getElementById('summary-options-price');
const summaryTotalPrice = document.getElementById('summary-total-price');
const summaryMonthlyPrice = document.getElementById('summary-monthly-price');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  renderCarsGrid();
  populateBookingModels();

  // Search & Filter Listeners
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderCarsGrid();
  });

  seriesSelect.addEventListener('change', (e) => {
    state.seriesFilter = e.target.value;
    renderCarsGrid();
  });

  // Modal Open & Close Listeners
  closeConfigModalBtn.addEventListener('click', closeConfiguratorModal);
  closeBookingModalBtn.addEventListener('click', closeBookingModal);
  
  btnOpenBookModal.addEventListener('click', () => openBookingModal());
  document.getElementById('hero-configure-btn')?.addEventListener('click', () => openConfiguratorModal(MERCEDES_MODELS[0]));
  document.getElementById('hero-test-btn')?.addEventListener('click', () => openBookingModal(MERCEDES_MODELS[0].id));
  document.getElementById('btn-modal-test-drive')?.addEventListener('click', () => {
    closeConfiguratorModal();
    openBookingModal(state.selectedCar.id);
  });
  document.getElementById('btn-save-config')?.addEventListener('click', () => {
    alert(`Configuration saved for ${state.selectedCar.name}! Total: ${formatCurrency(calculateTotalPrice(state.selectedCar, state.selectedColorIndex, state.selectedWheelIndex, state.selectedPackageIds))}`);
    closeConfiguratorModal();
  });

  // Form Submit Listener
  testDriveForm.addEventListener('submit', handleFormSubmit);
});

// Render Vehicle Catalog Grid
function renderCarsGrid() {
  const filtered = filterCars(state.cars, state.searchQuery, state.seriesFilter);
  carsGrid.innerHTML = '';

  if (filtered.length === 0) {
    carsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <h3>No Mercedes vehicles match your filter criteria.</h3>
        <p>Try searching for "AMG", "EQS", or "Maybach".</p>
      </div>
    `;
    return;
  }

  filtered.forEach(car => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${car.image}" alt="${car.name}">
        <span class="series-badge">${car.series}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${car.name}</h3>
        <p class="card-tagline">${car.tagline}</p>
        
        <div class="card-specs">
          <div><strong style="color:var(--accent-cyan);">${car.acceleration}</strong><br><span style="color:var(--text-muted);">0-60 MPH</span></div>
          <div><strong style="color:var(--accent-cyan);">${car.power}</strong><br><span style="color:var(--text-muted);">Power</span></div>
        </div>

        <div class="card-price-row">
          <div>
            <span style="font-size:0.75rem; color:var(--text-muted); display:block;">Starting MSRP</span>
            <span class="price-val">${formatCurrency(car.basePrice)}</span>
          </div>
          <button class="btn-outline btn-configure-car" data-car-id="${car.id}">Configure</button>
        </div>
      </div>
    `;
    carsGrid.appendChild(card);
  });

  // Attach Configure Buttons
  document.querySelectorAll('.btn-configure-car').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const carId = e.currentTarget.getAttribute('data-car-id');
      const car = state.cars.find(c => c.id === carId);
      if (car) openConfiguratorModal(car);
    });
  });
}

// Open Configurator Modal & Reset Selection
function openConfiguratorModal(car) {
  state.selectedCar = car;
  state.selectedColorIndex = 0;
  state.selectedWheelIndex = 0;
  state.selectedPackageIds = [];

  modalCarName.textContent = car.name;
  modalCarSeries.textContent = car.series.toUpperCase();
  modalCarImage.src = car.image;

  modalSpecsSummary.innerHTML = `
    <div><div style="font-weight:700; color:var(--accent-cyan);">${car.acceleration}</div><div style="font-size:0.75rem; color:var(--text-muted);">0-60 MPH</div></div>
    <div><div style="font-weight:700; color:var(--accent-cyan);">${car.power}</div><div style="font-size:0.75rem; color:var(--text-muted);">HORSEPOWER</div></div>
    <div><div style="font-weight:700; color:var(--accent-cyan);">${car.topSpeed || car.range}</div><div style="font-size:0.75rem; color:var(--text-muted);">${car.topSpeed ? 'TOP SPEED' : 'RANGE'}</div></div>
  `;

  renderColorSwatches();
  renderWheelOptions();
  renderPackageOptions();
  updatePriceSummary();

  configuratorModal.classList.add('active');
}

function closeConfiguratorModal() {
  configuratorModal.classList.remove('active');
}

// Render Swatches & Options
function renderColorSwatches() {
  colorSwatchesContainer.innerHTML = '';
  state.selectedCar.colors.forEach((color, idx) => {
    const swatch = document.createElement('div');
    swatch.className = `color-swatch ${idx === state.selectedColorIndex ? 'active' : ''}`;
    swatch.style.backgroundColor = color.hex;
    swatch.title = `${color.name} (${color.price > 0 ? '+' + formatCurrency(color.price) : 'Included'})`;
    swatch.addEventListener('click', () => {
      state.selectedColorIndex = idx;
      renderColorSwatches();
      updatePriceSummary();
    });
    colorSwatchesContainer.appendChild(swatch);
  });
}

function renderWheelOptions() {
  wheelsOptionsContainer.innerHTML = '';
  state.selectedCar.wheels.forEach((wheel, idx) => {
    const opt = document.createElement('div');
    opt.className = `option-card ${idx === state.selectedWheelIndex ? 'selected' : ''}`;
    opt.innerHTML = `
      <span>${wheel.name}</span>
      <span style="font-weight:600; color:var(--accent-cyan);">${wheel.price > 0 ? '+' + formatCurrency(wheel.price) : 'Included'}</span>
    `;
    opt.addEventListener('click', () => {
      state.selectedWheelIndex = idx;
      renderWheelOptions();
      updatePriceSummary();
    });
    wheelsOptionsContainer.appendChild(opt);
  });
}

function renderPackageOptions() {
  packagesOptionsContainer.innerHTML = '';
  state.selectedCar.packages.forEach((pkg) => {
    const isSelected = state.selectedPackageIds.includes(pkg.id);
    const opt = document.createElement('div');
    opt.className = `option-card ${isSelected ? 'selected' : ''}`;
    opt.innerHTML = `
      <span>${pkg.name}</span>
      <span style="font-weight:600; color:var(--accent-cyan);">${'+' + formatCurrency(pkg.price)}</span>
    `;
    opt.addEventListener('click', () => {
      if (isSelected) {
        state.selectedPackageIds = state.selectedPackageIds.filter(id => id !== pkg.id);
      } else {
        state.selectedPackageIds.push(pkg.id);
      }
      renderPackageOptions();
      updatePriceSummary();
    });
    packagesOptionsContainer.appendChild(opt);
  });
}

function updatePriceSummary() {
  const car = state.selectedCar;
  const totalPrice = calculateTotalPrice(car, state.selectedColorIndex, state.selectedWheelIndex, state.selectedPackageIds);
  const optionsPrice = totalPrice - car.basePrice;
  const monthly = calculateMonthlyPayment(totalPrice);

  summaryBasePrice.textContent = formatCurrency(car.basePrice);
  summaryOptionsPrice.textContent = formatCurrency(optionsPrice);
  summaryTotalPrice.textContent = formatCurrency(totalPrice);
  summaryMonthlyPrice.textContent = `${formatCurrency(monthly)} / mo`;
}

// Booking Modal Logic
function populateBookingModels() {
  bookingModelSelect.innerHTML = '<option value="">Select a Mercedes model...</option>';
  MERCEDES_MODELS.forEach(car => {
    const opt = document.createElement('option');
    opt.value = car.id;
    opt.textContent = car.name;
    bookingModelSelect.appendChild(opt);
  });
}

function openBookingModal(preselectedModelId = '') {
  if (preselectedModelId) {
    bookingModelSelect.value = preselectedModelId;
  }
  clearFormErrors();
  bookingModal.classList.add('active');
}

function closeBookingModal() {
  bookingModal.classList.remove('active');
}

function clearFormErrors() {
  document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
}

function handleFormSubmit(e) {
  e.preventDefault();
  clearFormErrors();

  const formData = {
    name: document.getElementById('booking-name').value,
    email: document.getElementById('booking-email').value,
    phone: document.getElementById('booking-phone').value,
    modelId: document.getElementById('booking-model').value,
    date: document.getElementById('booking-date').value
  };

  const validation = validateBookingForm(formData);

  if (!validation.isValid) {
    Object.keys(validation.errors).forEach(field => {
      const errEl = document.getElementById(`err-${field}`);
      if (errEl) errEl.textContent = validation.errors[field];
    });
    return;
  }

  const selectedCar = MERCEDES_MODELS.find(c => c.id === formData.modelId);
  alert(`Test drive request submitted successfully for ${formData.name}!\nVehicle: ${selectedCar?.name || 'Mercedes'}\nDate: ${formData.date}`);
  closeBookingModal();
  testDriveForm.reset();
}
