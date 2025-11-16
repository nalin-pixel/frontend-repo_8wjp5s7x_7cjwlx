import { useState } from 'react'

function App() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitResult(null)
    try {
      const res = await fetch(`${backend}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'website' })
      })
      if (!res.ok) throw new Error('Failed to submit')
      const data = await res.json()
      setSubmitResult({ ok: true, id: data.id })
      setForm({ name: '', email: '', company: '', message: '' })
    } catch (err) {
      setSubmitResult({ ok: false, error: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold">E</div>
            <span className="font-semibold text-lg">Elevanza Technologies</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <a href="#services" className="hover:text-gray-900">Services</a>
            <a href="#about" className="hover:text-gray-900">About</a>
            <a href="#contact" className="hover:text-gray-900">Contact</a>
            <a href="/test" className="px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-black">System Check</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-white" />
        <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                Building reliable digital systems for modern businesses
              </h1>
              <p className="mt-5 text-lg text-gray-600">
                We design, build, and scale cloud-native applications, data platforms, and AI-powered products that help you move faster with confidence.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm">Start a project</a>
                <a href="#services" className="px-5 py-3 rounded-lg border border-gray-300 hover:border-gray-400">Explore services</a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-blue-200 border-2 border-white" />
                  <div className="h-8 w-8 rounded-full bg-indigo-200 border-2 border-white" />
                  <div className="h-8 w-8 rounded-full bg-sky-200 border-2 border-white" />
                </div>
                <span>Trusted by startups and enterprises</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-tr from-blue-600/10 to-indigo-500/10 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl border border-gray-100 bg-white shadow-xl p-6">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100 flex items-center justify-center text-gray-500">
                  Product snapshots & dashboards
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-gray-600">
                  <div className="rounded-lg p-3 border border-gray-100 bg-white">Cloud-native</div>
                  <div className="rounded-lg p-3 border border-gray-100 bg-white">Data & AI</div>
                  <div className="rounded-lg p-3 border border-gray-100 bg-white">DevOps</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold">What we do</h2>
          <p className="mt-3 text-gray-600">End-to-end engineering services tailored to your goals.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Custom Software Development',
              desc: 'Design and delivery of web and mobile applications with robust backend architectures.',
              items: ['React & TypeScript', 'FastAPI & Node', 'Monorepos']
            },
            {
              title: 'Cloud & DevOps',
              desc: 'Modernize infrastructure with CI/CD, observability, and cost-efficient cloud architectures.',
              items: ['Kubernetes', 'CI/CD pipelines', 'Monitoring']
            },
            {
              title: 'Data & AI',
              desc: 'Build data platforms and intelligent features powered by ML and LLMs.',
              items: ['ETL & Warehouses', 'Feature stores', 'LLM apps']
            },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow bg-white">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold">{i+1}</div>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-gray-600">{s.desc}</p>
              <ul className="mt-4 space-y-1 text-sm text-gray-600 list-disc list-inside">
                {s.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold">Our approach</h2>
            <p className="mt-4 text-gray-600">We partner closely with your teams, ship in small increments, and measure what matters. Quality, maintainability, and developer experience are non-negotiable.</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-white border border-gray-100">Discovery & roadmapping</div>
              <div className="p-4 rounded-xl bg-white border border-gray-100">Iterative delivery</div>
              <div className="p-4 rounded-xl bg-white border border-gray-100">Security by design</div>
              <div className="p-4 rounded-xl bg-white border border-gray-100">Knowledge transfer</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-blue-600/10 to-indigo-500/10 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl border border-gray-100 bg-white shadow-xl p-6">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl p-4 bg-gray-50 border border-gray-100">
                  <div className="text-3xl font-extrabold">50+</div>
                  <div className="text-gray-600">Projects shipped</div>
                </div>
                <div className="rounded-xl p-4 bg-gray-50 border border-gray-100">
                  <div className="text-3xl font-extrabold">99.9%</div>
                  <div className="text-gray-600">Uptime targets</div>
                </div>
                <div className="rounded-xl p-4 bg-gray-50 border border-gray-100">
                  <div className="text-3xl font-extrabold"><1wk</div>
                  <div className="text-gray-600">Kickoff to code</div>
                </div>
                <div className="rounded-xl p-4 bg-gray-50 border border-gray-100">
                  <div className="text-3xl font-extrabold">24/7</div>
                  <div className="text-gray-600">Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold">Tell us about your project</h2>
            <p className="mt-3 text-gray-600">Share a few details and we9ll get back to you within one business day.</p>
            <div className="mt-8 rounded-2xl border border-gray-100 p-6 bg-white">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="jane@company.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company (optional)</label>
                  <input name="company" value={form.company} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your company" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="What would you like to build?" />
                </div>
                <button disabled={submitting} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
                  {submitting ? 'Sending...' : 'Send message'}
                </button>
                {submitResult && (
                  <p className={`text-sm mt-2 ${submitResult.ok ? 'text-green-700' : 'text-red-700'}`}>
                    {submitResult.ok ? 'Thanks! We\'ll be in touch shortly.' : `Something went wrong: ${submitResult.error}`}
                  </p>
                )}
                <p className="text-xs text-gray-500">Backend: {backend}</p>
              </form>
            </div>
          </div>
          <div className="lg:pl-8">
            <div className="rounded-2xl border border-gray-100 p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
              <h3 className="text-xl font-semibold">Why partner with Elevanza</h3>
              <ul className="mt-4 space-y-3 text-gray-700 list-disc list-inside">
                <li>Senior engineers with product mindset</li>
                <li>Transparent process and clear communication</li>
                <li>Security, performance, and reliability by default</li>
                <li>Flexible engagement models</li>
              </ul>
              <div className="mt-6 text-sm text-gray-600">
                <p>Email: hello@elevanza.tech</p>
                <p>Locations: Remote-first, global</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Elevanza Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#services" className="hover:text-gray-900">Services</a>
            <a href="#about" className="hover:text-gray-900">About</a>
            <a href="#contact" className="hover:text-gray-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
