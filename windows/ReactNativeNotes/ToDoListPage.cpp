#include "pch.h"
#include "ToDoListPage.h"
#include "ToDoListPage.g.cpp"

#include "App.h"


namespace winrt::ReactNativeNotes::implementation
{
    ToDoListPage::ToDoListPage()
    {
        InitializeComponent();
        auto app = Windows::UI::Xaml::Application::Current().as<App>();
        ReactRootView().ReactNativeHost( app->Host() );
    }
}
