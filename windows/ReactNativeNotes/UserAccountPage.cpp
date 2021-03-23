#include "pch.h"
#include "UserAccountPage.h"
#include "UserAccountPage.g.cpp"

#include "App.h"


namespace winrt::ReactNativeNotes::implementation
{
    UserAccountPage::UserAccountPage()
    {
        InitializeComponent();
        auto app = Windows::UI::Xaml::Application::Current().as<App>();
        ReactRootView().ReactNativeHost( app->Host() );
    }
}
