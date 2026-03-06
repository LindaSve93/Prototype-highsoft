import { useState } from 'react'
import './App.css'

function App() {
  const [selectedPlan, setSelectedPlan] = useState('subscription')
  const [premiumSupport, setPremiumSupport] = useState(false)


  const topPlans = [
    {
      id: 'annual-adv',
      title: 'Support',
      description: '10 hours support per year',
      price: '+ $0'
    },
    {
      id: 'annual-advplus',
      title: 'Premium Support',
      description: '20 hours support per year',
      price: '+ $487'
    },
    {
      id: 'perpetual-advplus',
      title: 'Premium Support incl.',
      description: '20 hours support per year',
      price: '+ $839'
    }
  ]

  const bottomPlans = [
    {
      id: 'subscription',
      title: 'Yearly Subscription',
      description: 'Access to support and updates for a yearly payment. Your right to use the software requires an active subscription.',
      basePrice: '$0',
      premiumPrice: '$121',
      hasPremiumOption: true,
      badge: 'Rented'
    },
    {
      id: 'perpetual-advplus',
      title: 'Lifetime License',
      description: 'Own it outright. Get 1 year of updates included, then keep using it forever with no recurring costs.',
      price: '+ $473',
      badge: 'Owned'
    }
  ]

  return (
    <div className="App">
      <h1 className="main-heading">License configuration</h1>
      
      <div className="license-groups">
        {/* Subscription Group */}
        <div className="license-group">
          <div className="group-label">Subscription-based access</div>          <p className="group-description">
            You can use our software with the newest version as long as you subscribe.
          </p>          <div className="group-plans">
            {topPlans.filter(p => p.id.startsWith('annual')).map((plan) => (
              <div
                key={plan.id}
                className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="plan-header">
                  <div className="plan-title-section">
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={selectedPlan === plan.id}
                      onChange={() => setSelectedPlan(plan.id)}
                      className="plan-radio"
                    />
                    <h2 className="plan-title">{plan.title}</h2>
                  </div>
                </div>
                
                <p className="plan-description">{plan.description}</p>
                
                <div className="plan-price">{plan.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Perpetual Group */}
        <div className="license-group">
          <div className="group-label">Forever access</div>          <p className="group-description">
            You can use our software forever, but only update to newest versions as long as you subscribe to support. First year is free!
          </p>          <div className="group-plans">
            {topPlans.filter(p => p.id.startsWith('perpetual')).map((plan) => (
              <div
                key={plan.id}
                className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="plan-header">
                  <div className="plan-title-section">
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={selectedPlan === plan.id}
                      onChange={() => setSelectedPlan(plan.id)}
                      className="plan-radio"
                    />
                    <h2 className="plan-title">{plan.title}</h2>
                  </div>
                </div>
                
                <p className="plan-description">{plan.description}</p>
                
                <div className="plan-price">{plan.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="compact-plans-section">
        <h2 className="section-heading">Rent or own?</h2>
        <div className="compact-plans-list">
          {bottomPlans.map((plan) => {
            const isSelected = selectedPlan === plan.id
            const displayPrice = plan.hasPremiumOption
              ? `+ ${plan.basePrice}`
              : plan.price

            return (
              <div
                key={`compact-${plan.id}-${selectedPlan}`}
                className={`compact-plan-item ${isSelected ? 'selected' : ''}`}
              >
                <div
                  className="compact-plan-main"
                >
                  <input
                    type="radio"
                    name="plan"
                    value={plan.id}
                    checked={isSelected}
                    onChange={(e) => {
                      setSelectedPlan(e.target.value)
                      if (!plan.hasPremiumOption) {
                        setPremiumSupport(false)
                      }
                    }}
                    className="compact-plan-radio"
                  />
                  <div className="compact-plan-content">
                    <div className="plan-header-with-badge">
                      <h3 className="compact-plan-title">{plan.title}</h3>
                      {plan.badge && <span className={`plan-badge badge-${plan.badge.toLowerCase()}`}>{plan.badge}</span>}
                    </div>
                    <p className="compact-plan-description">{plan.description}</p>
                  </div>
                  <div className="compact-plan-price">{displayPrice}</div>
                </div>

                {plan.hasPremiumOption && (
                  <label className="premium-support-option" style={{ opacity: selectedPlan === plan.id ? 1 : 0.5, pointerEvents: selectedPlan === plan.id ? 'auto' : 'none' }}>
                    <input
                      type="checkbox"
                      checked={premiumSupport}
                      onChange={(e) => {
                        e.stopPropagation()
                        setPremiumSupport(e.target.checked)
                      }}
                      disabled={selectedPlan !== plan.id}
                      className="premium-support-input"
                    />
                    <span className="checkbox-label">
                      <span className="checkbox-title">Advantage+</span>
                      <span className="checkbox-description">20 hours support per year</span>
                    </span>
                    <span className="checkbox-price">+ {plan.premiumPrice}</span>
                  </label>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
