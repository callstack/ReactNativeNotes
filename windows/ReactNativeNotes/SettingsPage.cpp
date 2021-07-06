#include "pch.h"
#include "SettingsPage.h"
#if __has_include("SettingsPage.g.cpp")
#include "SettingsPage.g.cpp"
#endif
#include "App.h"

using namespace winrt;
using namespace Windows::UI::Xaml;

namespace winrt::ReactNativeNotes::implementation
{
    SettingsPage::SettingsPage()
    {
        InitializeComponent();
        auto app = Windows::UI::Xaml::Application::Current().as<App>();
        ReactRootView().ReactNativeHost( app->Host() );
    }
}
