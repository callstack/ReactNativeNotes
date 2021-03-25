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
        Navigate( L"NotesPage" );
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
        auto pageToNavigateTo = Windows::UI::Xaml::Interop::TypeName
        {
            to_hstring( L"ReactNativeNotes." + pageName ),
            Windows::UI::Xaml::Interop::TypeKind::Custom
        };
        auto navigationAnimation = Windows::UI::Xaml::Media::Animation::SlideNavigationTransitionInfo();
        navigationAnimation.Effect( Windows::UI::Xaml::Media::Animation::SlideNavigationTransitionEffect::FromLeft );
        ApplicationContentFrame().Navigate( pageToNavigateTo, nullptr, navigationAnimation );
    }
} 



