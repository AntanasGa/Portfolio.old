import { createI18n } from 'vue-i18n'
import messages from './localization'
import locales from './locales'

const i18n = createI18n({
  locale: locales[0],
  messages,
})
i18n.global.locale = locales[0]

export default i18n
