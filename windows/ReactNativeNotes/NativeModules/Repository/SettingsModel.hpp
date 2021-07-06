#pragma once

namespace winrt::ReactNativeNotes::implementation
{
    enum class LanguageValue : int
    {
        English = 0,
        Polish = 1
    };

    class SettingsModel
    {
    public:
        const LanguageValue Language();
        void Language( const LanguageValue& lang );

    private:
        LanguageValue lang = LanguageValue::English;
    };
}
