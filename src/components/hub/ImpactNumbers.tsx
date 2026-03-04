import { AnimatedCounter } from '@/components/shared/AnimatedCounter'
import { IMPACT_STATS } from '@/lib/constants'

export function ImpactNumbers() {
  return (
    <section
      className="bg-cream py-24 px-6"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%231F365D' stroke-opacity='0.06' stroke-width='1'%3E%3Cpath d='M0 40L40 0M0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-body text-xs uppercase tracking-widest text-mustard font-semibold mb-4">
            Our Impact
          </p>
          <h2 className="font-display font-black text-navy text-3xl md:text-4xl">
            Numbers That Matter
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {IMPACT_STATS.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
