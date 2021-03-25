#pragma once

#include "ApplicationSettingsPage.g.h"

namespace winrt::ReactNativeNotes::implementation
{
    class ApplicationSettingsPage : public ApplicationSettingsPageT<ApplicationSettingsPage>
    {
    public:
        ApplicationSettingsPage();
    };
}

namespace winrt::ReactNativeNotes::factory_implementation
{
    class ApplicationSettingsPage : public ApplicationSettingsPageT<ApplicationSettingsPage, implementation::ApplicationSettingsPage>
    {
    };
}
