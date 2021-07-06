#pragma once

#include "SettingsPage.g.h"

namespace winrt::ReactNativeNotes::implementation
{
    class SettingsPage : public SettingsPageT<SettingsPage>
    {
    public:
        SettingsPage();
    };
}

namespace winrt::ReactNativeNotes::factory_implementation
{
    class SettingsPage : public SettingsPageT<SettingsPage, implementation::SettingsPage>
    {
    };
}
