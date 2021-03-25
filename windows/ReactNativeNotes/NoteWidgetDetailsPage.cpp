#include "pch.h"
#include "NoteWidgetDetailsPage.h"
#include "NoteWidgetDetailsPage.g.cpp"

#include "App.h"


namespace winrt::ReactNativeNotes::implementation
{
    NoteWidgetDetailsPage::NoteWidgetDetailsPage()
    {
        InitializeComponent();
        auto app = Windows::UI::Xaml::Application::Current().as<App>();
        ReactRootView().ReactNativeHost( app->Host() );
    }
}
