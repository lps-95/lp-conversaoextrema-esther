import { formContent } from '../../content/form'
import { useLeadForm } from '../../hooks/useLeadForm'
import CustomSelect from '../CustomSelect'
import { MSection } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'

/**
 * Seção de formulário de captura de lead.
 *
 * Toda a lógica (estado, validação, envio, redirecionamento) vive em
 * `hooks/useLeadForm.ts` — este componente só cuida de exibir os campos e
 * ligar cada um ao estado do hook. Os textos e as opções dos selects vêm
 * de `content/form.ts`.
 *
 * `selectPlanAndScrollToForm` é exposto pelo hook pra ser usado pela seção
 * de Pricing (botões "escolher plano"), então o `LandingPage.tsx` repassa
 * essa função pra lá — o estado do plano fica todo centralizado aqui.
 */
export default function LeadForm({
  form,
}: {
  form: ReturnType<typeof useLeadForm>
}) {
  const { fields, setters, handleWhatsAppChange, hiddenFields, status, errorMessage, handleSubmit } = form

  return (
    <section id="form" className="relative overflow-hidden py-20 bg-gradient-to-b from-black via-[#0d0c12] to-black">
      <ParallaxLayer speed={0.03} className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(232,220,200,0.08),transparent_50%)]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <MSection>
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-2 mb-6 bg-button-primary/10 border border-button-primary/20 rounded-full backdrop-blur-sm">
              <p className="text-button-primary text-xs font-bold uppercase tracking-widest">{formContent.sectionBadge}</p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-text-primary">{formContent.title}</h2>
            <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto">{formContent.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {fields.plan && (
              <div className="mb-6 p-3 bg-button-primary/10 border border-button-primary/20 rounded-lg text-center">
                <p className="text-xs text-text-secondary">
                  Plano selecionado: <span className="font-bold text-button-primary">{fields.plan}</span>
                </p>
              </div>
            )}

            <input type="hidden" name="plan" value={fields.plan} readOnly />
            <input type="hidden" name="utm_source" value={hiddenFields.utmSource} readOnly />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <TextField
                id="name"
                label="Nome Completo *"
                value={fields.name}
                onChange={(v) => setters.setName(v)}
                placeholder="Maria Silva"
              />
              <TextField
                id="email"
                label="Email *"
                type="email"
                value={fields.email}
                onChange={(v) => setters.setEmail(v)}
                placeholder="maria@exemplo.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <FieldLabel htmlFor="whatsapp">WhatsApp *</FieldLabel>
                <input
                  id="whatsapp"
                  type="tel"
                  name="whatsapp"
                  value={fields.whatsapp}
                  onChange={handleWhatsAppChange}
                  required
                  placeholder="(11) 99999-9999"
                  className={fieldClassName}
                />
              </div>
              <TextField
                id="niche"
                label="Nicho/Área *"
                value={fields.niche}
                onChange={(v) => setters.setNiche(v)}
                placeholder="Ex: Psicóloga, Coach..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <SelectField
                id="followers"
                label="Seguidores *"
                value={fields.followers}
                onChange={(v) => setters.setFollowers(v)}
                options={formContent.followersOptions}
              />
              <SelectField
                id="revenue"
                label="Faturamento Mensal *"
                value={fields.revenue}
                onChange={(v) => setters.setRevenue(v)}
                options={formContent.revenueOptions}
              />
            </div>

            <div className="mb-6">
              <SelectField
                id="mainGoal"
                label="Seu Principal Objetivo *"
                value={fields.mainGoal}
                onChange={(v) => setters.setMainGoal(v)}
                options={formContent.mainGoalOptions}
              />
            </div>

            <div className="mb-6">
              <FieldLabel htmlFor="bestTime">Melhor Horário para Contato *</FieldLabel>
              <CustomSelect
                value={fields.bestTime || ''}
                onChange={setters.setBestTime}
                placeholder="Selecione..."
                options={formContent.bestTimeOptions}
              />
            </div>

            {errorMessage && (
              <div className="mb-5 text-red-400 text-sm text-center p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                {errorMessage}
              </div>
            )}

            {status === 'success' && (
              <div className="mb-5 bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center p-3 rounded-lg">
                {formContent.successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full bg-gradient-to-r from-button-primary to-accent-gold hover:from-accent-gold hover:to-button-primary text-primary-dark font-bold text-base py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>{formContent.submitLoadingLabel}</span>
                </>
              ) : status === 'success' ? (
                <>
                  <span>✓</span>
                  <span>{formContent.submitSuccessLabel}</span>
                </>
              ) : (
                <>
                  <WhatsAppIcon />
                  <span>{formContent.submitLabel}</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-text-secondary/60 mt-4">{formContent.privacyNote}</p>

            <input type="hidden" name="utm_medium" value={hiddenFields.utmMedium} readOnly />
            <input type="hidden" name="utm_campaign" value={hiddenFields.utmCampaign} readOnly />
            <input type="hidden" name="origin" value={hiddenFields.origin} readOnly />
          </form>
        </MSection>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Pequenos subcomponentes de campo, pra não repetir as mesmas classes do
// Tailwind em cada input/select do formulário.
// ---------------------------------------------------------------------------

const fieldClassName =
  'w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-text-primary text-sm placeholder-text-secondary/40 focus:outline-none focus:border-button-primary/50 focus:bg-black/40 transition-all'

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">
      {children}
    </label>
  )
}

function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  type?: string
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        type={type}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        placeholder={placeholder}
        className={fieldClassName}
      />
    </div>
  )
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className={`${fieldClassName} cursor-pointer`}
      >
        <option value="" className="bg-primary-dark">
          Selecione...
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-primary-dark">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}
