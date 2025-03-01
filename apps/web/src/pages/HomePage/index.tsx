import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  return (
    <div className="text-3xl font-bold">
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={() => i18n.changeLanguage('fr')}
        >
          fr
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={() => i18n.changeLanguage('en')}
        >
          en
        </button>
      </div>
      <h1>{import.meta.env.VITE_APP_NAME}</h1>
      <h2>{t('title')}</h2>
    </div>
  );
}
