#include "pch.h"
#include "NotesPage.h"
#include "NotesPage.g.cpp"

#include "App.h"


namespace winrt::ReactNativeNotes::implementation
{
    NotesPage::NotesPage()
    {
        InitializeComponent();
        auto app = Windows::UI::Xaml::Application::Current().as<App>();
        ReactRootView().ReactNativeHost( app->Host() );
    }
}
