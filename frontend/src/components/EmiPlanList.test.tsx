import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import EmiPlanList from './EmiPlanList';

const plans = [
  { id: 'plan-3', variantId: 'variant-1', tenureMonths: 3, interestRate: '0.00', monthlyPayment: '44967', cashback: '7500' },
  { id: 'plan-6', variantId: 'variant-1', tenureMonths: 6, interestRate: '8.50', monthlyPayment: '22483', cashback: null },
];

describe('EmiPlanList', () => {
  it('emits the selected plan id', () => {
    const onChange = vi.fn();
    render(<EmiPlanList plans={plans} selectedPlanId="plan-3" onChange={onChange} />);

    fireEvent.click(screen.getByRole('radio', { name: /6 months/i }));

    expect(onChange).toHaveBeenCalledWith('plan-6');
  });
});
