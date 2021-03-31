#include "pch.h"
#include "CreateNotePage.h"
#include "CreateNotePage.g.cpp"

#include "App.h"


namespace winrt::ReactNativeNotes::implementation
{
    CreateNotePage::CreateNotePage()
    {
        InitializeComponent();
        auto app = Windows::UI::Xaml::Application::Current().as<App>();
        ReactRootView().ReactNativeHost( app->Host() );
    }
}
