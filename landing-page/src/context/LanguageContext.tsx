import { Component, createContext, ReactNode } from 'react';
import { Language, translations, Translations } from '../locales/translations';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'vi',
  setLanguage: () => {},
  t: translations.vi,
});

interface LanguageProviderProps {
  children: ReactNode;
}

interface LanguageProviderState {
  language: Language;
}

export class LanguageProvider extends Component<LanguageProviderProps, LanguageProviderState> {
  constructor(props: LanguageProviderProps) {
    super(props);
    const saved = typeof window !== 'undefined' ? localStorage.getItem('skipli_landing_lang') : null;
    const initialLang: Language = saved === 'vi' || saved === 'en' ? saved : 'vi';

    this.state = {
      language: initialLang,
    };
  }

  componentDidMount(): void {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.state.language;
    }
  }

  setLanguage = (lang: Language): void => {
    this.setState({ language: lang }, () => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('skipli_landing_lang', lang);
      }
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    });
  };

  render(): ReactNode {
    const { language } = this.state;
    const contextValue: LanguageContextType = {
      language,
      setLanguage: this.setLanguage,
      t: translations[language],
    };

    return (
      <LanguageContext.Provider value={contextValue}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
