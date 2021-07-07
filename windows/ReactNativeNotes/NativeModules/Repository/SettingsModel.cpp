#include "pch.h"
#include "SettingsModel.hpp"


namespace winrt::ReactNativeNotes::implementation
{
    const LanguageValue SettingsModel::Language()
    {
        return lang;
    }

    void SettingsModel::Language( const LanguageValue& lang )
    {
        this->lang = lang;
    }

    const ThemeValue SettingsModel::Theme()
    {
        return this->theme;
    }

    void SettingsModel::Theme( const ThemeValue& theme )
    {
        this->theme = theme;
    }
}
