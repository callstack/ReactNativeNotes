#include "pch.h"
#include "MainPage.h"
#if __has_include("MainPage.g.cpp")
#include "MainPage.g.cpp"
#endif

#include "App.h"

using namespace winrt;
using namespace Windows::UI::Xaml;

namespace winrt::ReactNativeNotes::implementation
{
    MainPage::MainPage()
    {
        InitializeComponent();
        auto app = Application::Current().as<App>();
    }

    void MainPage::TopNavigationPanel_ItemInvoked( Windows::UI::Xaml::Controls::NavigationView const& sender, Windows::UI::Xaml::Controls::NavigationViewItemInvokedEventArgs const& args )
    {
        if( args.IsSettingsInvoked() == true )
        {
            Navigate( L"ApplicationSettingsPage" );
        }
        else if( args.InvokedItemContainer() != nullptr )
        {
            auto selectedPageTag = unbox_value_or<hstring>( args.InvokedItemContainer().Tag(), L"" );
            Navigate( selectedPageTag );
        }
    }

    void MainPage::TopNavigationPanel_BackRequested( Windows::UI::Xaml::Controls::NavigationView const& sender, Windows::UI::Xaml::Controls::NavigationViewBackRequestedEventArgs const& args )
    {

    }

    void MainPage::Navigate( winrt::hstring pageName ) noexcept
    {
        ApplicationContentFrame().Navigate( Windows::UI::Xaml::Interop::TypeName
            {
                to_hstring( L"ReactNativeNotes." + pageName ),
                Windows::UI::Xaml::Interop::TypeKind::Custom
            } );
    }
} 



