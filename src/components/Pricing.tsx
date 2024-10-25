import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$9",
      features: ["5 AI generations/day", "Basic templates", "Export to PDF", "Email support"],
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      features: ["Unlimited generations", "Premium templates", "All export formats", "Priority support", "API access"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Custom solutions", "Dedicated manager", "SLA guarantee", "Custom integrations", "Training sessions"],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-gray-400">Choose the plan that&apos;s right for you</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl border hover:scale-105 transition-all ease-in-out cursor-pointer ${
                plan.popular ? 'border-white bg-white/10' : 'border-white/10 bg-white/5'
              } backdrop-blur-sm`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-sm rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="text-xl font-semibold mb-2">{plan.name}</div>
              <div className="text-4xl font-bold mb-6">{plan.price}</div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 mr-3 text-white" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full rounded-full ${
                  plan.popular ? 'bg-white text-black hover:bg-gray-200' : ''
                }`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}