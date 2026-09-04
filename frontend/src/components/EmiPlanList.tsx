import type { EmiPlan } from '../types/product';
import { formatInr } from '../utils/currency';

type EmiPlanListProps = {
  plans: EmiPlan[];
  selectedPlanId: string;
  onChange: (planId: string) => void;
};

function EmiPlanList({ plans, selectedPlanId, onChange }: EmiPlanListProps) {
  return (
    <div className="rounded-3xl border border-slate-200 p-4">
      <h2 className="text-lg font-semibold text-slate-900">Select EMI plan</h2>
      <div className="mt-4 space-y-3">
        {plans.length === 0 ? (
          <p className="text-sm text-slate-500">No EMI plans are available for this variant.</p>
        ) : (
          plans.map((plan) => {
            const isSelected = plan.id === selectedPlanId;
            return (
              <label
                key={plan.id}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${
                  isSelected ? 'border-brand-600 bg-brand-50 ring-2 ring-brand-100' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="emi-plan"
                    checked={isSelected}
                    onChange={() => onChange(plan.id)}
                    className="h-4 w-4 accent-brand-600"
                    aria-label={`Select EMI plan for ${plan.tenureMonths} months`}
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{formatInr(plan.monthlyPayment)} x {plan.tenureMonths} months</div>
                    <div className="text-sm text-slate-600">{plan.interestRate}% interest</div>
                    {plan.cashback ? <div className="mt-1 text-sm text-emerald-700">Additional cashback {formatInr(plan.cashback)}</div> : null}
                  </div>
                </div>
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{plan.tenureMonths} mo</span>
              </label>
            );
          })
        )}
      </div>
    </div>
  );
}

export default EmiPlanList;
