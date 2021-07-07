#pragma once

namespace winrt::ReactNativeNotes::implementation
{
    enum class LanguageValue : int
    {
        English = 0,
        Polish = 1
    };

    enum class ThemeValue : int
    {
        Default = 0,
        Dark = 1,
    };


    class SettingsModel
    {
    public:
        const LanguageValue Language();
        void Language( const LanguageValue& lang );

        const ThemeValue Theme();
        void Theme( const ThemeValue& theme );

    private:
        LanguageValue lang = LanguageValue::English;
        ThemeValue theme = ThemeValue::Default;
    };
}
