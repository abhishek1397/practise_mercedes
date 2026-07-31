import { describe, it, expect } from 'vitest';
import { 
  calculateTotalPrice, 
  calculateMonthlyPayment, 
  formatCurrency, 
  filterCars, 
  validateBookingForm 
} from './configurator.js';

describe('Mercedes Configurator & CI/CD Core Utility Tests', () => {
  const mockCar = {
    id: 'test-amg',
    name: 'Mercedes-AMG Test GT',
    series: 'AMG Performance',
    basePrice: 100000,
    colors: [
      { name: 'Standard Black', price: 0 },
      { name: 'Magno Grey', price: 2000 }
    ],
    wheels: [
      { name: 'Standard 20in', price: 0 },
      { name: 'Forged 21in', price: 3000 }
    ],
    packages: [
      { id: 'aero', name: 'Aero Pkg', price: 1500 },
      { id: 'sound', name: '3D Sound Pkg', price: 2500 }
    ]
  };

  it('should calculate base total price when no options selected', () => {
    const total = calculateTotalPrice(mockCar, 0, 0, []);
    expect(total).toBe(100000);
  });

  it('should correctly sum selected color, wheels, and package options', () => {
    const total = calculateTotalPrice(mockCar, 1, 1, ['aero', 'sound']);
    // 100,000 + 2,000 (color) + 3,000 (wheels) + 1,500 (aero) + 2,500 (sound) = 109,000
    expect(total).toBe(109000);
  });

  it('should return 0 total price for invalid car object', () => {
    expect(calculateTotalPrice(null)).toBe(0);
  });

  it('should calculate estimated monthly payment correctly', () => {
    const payment = calculateMonthlyPayment(120000, 10, 4.9, 48);
    // Principal = 108,000; payment should be around $2,483
    expect(payment).toBeGreaterThan(2000);
    expect(payment).toBeLessThan(3000);
  });

  it('should format currency accurately', () => {
    expect(formatCurrency(178000)).toBe('$178,000');
    expect(formatCurrency(0)).toBe('$0');
  });

  it('should filter cars list by search term and series', () => {
    const carsList = [
      mockCar,
      { id: 'eqs', name: 'Mercedes EQS 580', series: 'EQ Electric', tagline: 'Electric Luxury' }
    ];

    const amgResults = filterCars(carsList, 'AMG', 'all');
    expect(amgResults.length).toBe(1);
    expect(amgResults[0].id).toBe('test-amg');

    const electricResults = filterCars(carsList, '', 'EQ Electric');
    expect(electricResults.length).toBe(1);
    expect(electricResults[0].id).toBe('eqs');
  });

  it('should validate test drive booking form correctly', () => {
    const validData = {
      name: 'Michael Schumacher',
      email: 'm.schumacher@mercedes-amg.com',
      phone: '5551234567',
      date: '2026-08-15',
      modelId: 'amg-gt-63'
    };

    const validResult = validateBookingForm(validData);
    expect(validResult.isValid).toBe(true);
    expect(Object.keys(validResult.errors).length).toBe(0);

    const invalidData = {
      name: '',
      email: 'invalid-email',
      phone: '123',
      date: '',
      modelId: ''
    };

    const invalidResult = validateBookingForm(invalidData);
    expect(invalidResult.isValid).toBe(false);
    expect(invalidResult.errors.name).toBeDefined();
    expect(invalidResult.errors.email).toBeDefined();
    expect(invalidResult.errors.phone).toBeDefined();
    expect(invalidResult.errors.date).toBeDefined();
  });
});
