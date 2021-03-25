#include "pch.h"
#include "ApplicationSettingsPage.h"
#include "ApplicationSettingsPage.g.cpp"

#include "App.h"


namespace winrt::ReactNativeNotes::implementation
{
    ApplicationSettingsPage::ApplicationSettingsPage()
    {
        InitializeComponent();
        auto app = Windows::UI::Xaml::Application::Current().as<App>();
        ReactRootView().ReactNativeHost( app->Host() );
    }
}
